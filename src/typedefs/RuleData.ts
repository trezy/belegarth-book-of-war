// Local imports
import { Tag } from '@/typedefs/Tag'





export interface RuleData {
	body?: string,
	history?: RuleData[],
	href: string,
	index: number,
	number: string,
	rules?: RuleData[],
	tags: Tag[],
	title?: string,
}
