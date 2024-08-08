// Local imports
import { RuleData } from '@/typedefs/RuleData'





export type RuleSearchData = Omit<RuleData, 'history' | 'index' | 'title' | 'rules'>
