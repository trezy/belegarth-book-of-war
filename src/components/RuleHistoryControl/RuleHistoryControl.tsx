'use client';

// Module imports
import {
	useCallback,
	useState,
} from 'react'





// Local imports
import styles from './RuleDetails.module.scss'

import { type RuleData } from '@/typedefs/RuleData'
import { RuleDetails } from '@/components/RuleDetails/RuleDetails'





// Types
type Props = {
	rule: RuleData,
	history: RuleData[],
	parent: string,
}





export function RuleHistoryControl(props: Props) {
	const {
		rule,
		history,
		parent,
	} = props

	const [isActive, setIsActive] = useState(false)

	const handleClick = useCallback(() => setIsActive(previousState => !previousState), [])

	return (
		<>
			<button
				type={'button'}
				onClick={handleClick}>
				{'History'}
			</button>

			{isActive && (
				<RuleDetails
					rule={rule}
					history={history}
					parent={parent} />
			)}
		</>
	)
}
