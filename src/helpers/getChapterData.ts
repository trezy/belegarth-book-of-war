// Local imports
import { type ChapterData } from '@/typedefs/ChapterData'
import { getChapterNavigationData } from '@/helpers/getChapterNavigationData'
import { getPublicURL } from '@/helpers/getPublicURL'





export async function getChapterData(chapter: string): Promise<ChapterData> {
	const chapterDataResponse = await fetch(`${getPublicURL()}/data/chapter${chapter}.json`)

	if (!chapterDataResponse.ok) {
		throw new Error('Failed to fetch data')
	}

	const chapterDataJSON = await chapterDataResponse.json()

	const chapterNavigation = await getChapterNavigationData()

	const previousChapterIndex = Number(chapter) - 2
	const nextChapterIndex = Number(chapter)
	const previousChapter = chapterNavigation[previousChapterIndex]
	const nextChapter = chapterNavigation[nextChapterIndex]

	if (previousChapter) {
		chapterDataJSON.previousChapter = {
			name: previousChapter.body,
			number: Number(chapter) - 1,
		}
	}

	if (nextChapter) {
		chapterDataJSON.nextChapter = {
			name: nextChapter.body,
			number: Number(chapter) + 1,
		}
	}

	return chapterDataJSON
}
