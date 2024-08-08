// Local imports
import { RuleData } from '@/typedefs/RuleData'





export interface ChapterData extends RuleData {
	nextChapter?: {
		name: string,
		number: number,
	},
	previousChapter?: {
		name: string,
		number: number,
	},
}
