// Local imports
import { type ChapterNavigationData } from '@/typedefs/ChapterNavigationData'





export async function getChapterNavigationData(): Promise<ChapterNavigationData> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/data/chapterNavigation.json`)

	if (!response.ok) {
		throw new Error('Failed to fetch data')
	}

	return response.json()
}
