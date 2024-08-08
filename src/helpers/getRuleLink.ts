export function getRuleLink(rule: string): string {
	const [
		chapter,
		...section
	] = rule.split('.')

	return `/chapter/${chapter}#${chapter}.${section.join('.')}`
}
