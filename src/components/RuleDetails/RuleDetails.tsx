// Module imports
import { createPortal } from 'react-dom'





// Local imports
import styles from './RuleDetails.module.scss'

import { RuleData } from '@/typedefs/RuleData'
import { RuleList } from '../RuleList/RuleList'
import { Rule } from '../Rule/Rule'





// Types
type Props = {
	rule: RuleData,
	history: RuleData[],
	parent: string,
}





export function RuleDetails(props: Props) {
	const {
		rule,
		history,
		parent,
	} = props

	return createPortal(
		(
			<div className={styles['rule-details-wrapper']}>
				<div className={styles['rule-details']}>
					<blockquote>
						{/* {`${rule.}: ${rule.body}`} */}
					</blockquote>

					{history?.length && (
						<RuleList>
							{history.map((rule, index) => (
								<Rule
									key={index}
									data={rule}
									parent={parent} />
							))}
						</RuleList>
					)}
				</div>
			</div>
		),
		document.querySelector('#modal-target')!,
	)
}
