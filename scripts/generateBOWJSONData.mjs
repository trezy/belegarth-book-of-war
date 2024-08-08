// @ts-nocheck

// Module imports
import fs from 'node:fs/promises'
import path from 'node:path'





const publicDataPath = path.resolve(process.cwd(), 'public', 'data')
const markdownString = await fs.readFile(path.join(publicDataPath, 'book-of-war.md'), 'utf8')
const markdownLines = markdownString.split('\n')
const markdownLineObjects = markdownLines
	.map(line => {
		const isHeading = /^#+\s/.test(line)

		if (isHeading) {
			const regexResult = /^(?<octothorpes>#+)\s(?<body>.+)/.exec(line)

			return {
				body: regexResult.groups.body,
				depth: regexResult.groups.octothorpes.length,
				type: 'heading',
			}
		} else {
			const regexResult = /^(?<tabs>\t*)(?<body>.+)/.exec(line)

			if (!regexResult) {
				return null
			}

			return {
				body: regexResult.groups.body,
				depth: regexResult.groups.tabs.length + 1,
				type: 'rule',
			}
		}
	})
	.filter(Boolean)

const chapters = []
const chapterNavigation = []
const searchData = []

function getRuleLink(rule) {
	const [
		chapter,
		...section
	] = rule.split('.')

	return `/chapter/${chapter}#${chapter}.${section.join('.')}`
}

async function writeDataFile(filename, data) {
	return fs.writeFile(path.join(publicDataPath, filename), JSON.stringify(data, null, 2), 'utf8')
}

let lineIndex = 0
let currentRuleParent = [1]

while (lineIndex < markdownLineObjects.length) {
	const line = markdownLineObjects[lineIndex]

	if (line.type === 'heading') {
		if (line.depth > 1) {
			chapters.push({
				title: line.body,
				rules: [],
			})
			chapterNavigation.push({
				body: `Chapter ${chapters.length}: ${line.body}`,
				href: `/chapter/${chapters.length}`
			})

			currentRuleParent = [chapters.length]
		}
	} else if (line.type === 'rule') {
		const regexResult = /^(?<index>\d+)\.\s?(?<body>.+)/.exec(line.body)
		const ruleIndex = Number(regexResult.groups.index)

		if (currentRuleParent.length === line.depth) {
			currentRuleParent.push(ruleIndex)
		} else if (currentRuleParent.length === (line.depth + 1)) {
			currentRuleParent.splice(currentRuleParent.length - 1, 1, ruleIndex)
		} else if (currentRuleParent.length > line.depth) {
			currentRuleParent.splice(line.depth, currentRuleParent.length - line.depth, ruleIndex)
		}

		const rule = {
			body: regexResult.groups.body,
			href: getRuleLink(currentRuleParent.join('.')),
			index: ruleIndex,
			number: currentRuleParent.join('.'),
			tags: [],
		}

		for (const match of regexResult.groups.body.matchAll(/\[([\w\d]+)(?::([\w\d]+))?\]/g)) {
			const [
				tag,
				tagPrefix,
				tagSuffix,
			] = match
			const start = match.index
			const end = match.index + tag.length
			rule.body = rule.body
				.replace(tag, '')
				.trim()
			rule.tags.push({
				tag: tagPrefix,
				value: tagSuffix,
			})
		}

		let target = chapters

		let targetDepthIndex = 1

		while (targetDepthIndex < line.depth) {
			target = target.at(-1)
			if (!target.rules) {
				target.rules = []
			}
			target = target.rules
			targetDepthIndex += 1
		}

		if (!target.at(-1).rules) {
			target.at(-1).rules = []
		}

		const searchRule = { ...rule }
		delete searchRule.rules
		delete searchRule.index
		searchData.push(searchRule)

		const previousRule = target.at(-1).rules.at(-1)
		if (previousRule && (previousRule.index === rule.index)) {
			if (!previousRule.history) {
				previousRule.history = []
			}

			previousRule.history.push(rule)
		} else {
			target.at(-1).rules.push(rule)
		}
	}

	lineIndex += 1
}

let chapterIndex = 0

while (chapterIndex < chapters.length) {
	const chapter = chapters[chapterIndex]

	await writeDataFile(`chapter${chapterIndex + 1}.json`, chapter)

	chapterIndex += 1
}

await writeDataFile('chapterNavigation.json', chapterNavigation)
await writeDataFile('search.json', searchData)
