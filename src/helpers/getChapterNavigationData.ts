// Local imports
import { type ChapterNavigationData } from '@/typedefs/ChapterNavigationData'
import { getPublicURL } from '@/helpers/getPublicURL'





export async function getChapterNavigationData(): Promise<ChapterNavigationData> {
	const response = await fetch(`${getPublicURL()}/data/chapterNavigation.json`)

	if (!response.ok) {
		throw new Error('Failed to fetch data')
	}

	return response.json()
}
