// Module imports
import { useRemarkSync } from 'react-remark'





// Local imports
import styles from './Rule.module.scss'

import { type RuleData } from '@/typedefs/RuleData'
import { getRuleLink } from '@/helpers/getRuleLink'
import { Link } from '@/components/Link/Link'
import { RuleHistoryControl } from '@/components/RuleHistoryControl/RuleHistoryControl'
import { RuleList } from '@/components/RuleList/RuleList'





export function Rule({
	data,
	parent,
}: {
	data: RuleData,
	parent: string,
}) {
	const {
		body,
		history,
		index,
		rules,
		title,
	} = data

	const fullRuleNumber = `${parent}.${index}`

	return (
		<>
			<dt id={fullRuleNumber}>
				<Link href={getRuleLink(fullRuleNumber)}>
					{fullRuleNumber}
				</Link>

				<div className={styles['rule-meta']}>
					{history?.length && (
						<RuleHistoryControl
							rule={data}
							history={history}
							parent={fullRuleNumber} />
					)}
				</div>
			</dt>

			<dd>
				<div className={styles['rule-content']}>
					{Boolean(title) && (
						<strong>{`${title}: `}</strong>
					)}

					{Boolean(body) && useRemarkSync(String(body))}
				</div>

				{Boolean(rules?.length) && (
					<RuleList>
						{rules?.map((rule: RuleData, index: number) => (
							<Rule
								key={fullRuleNumber}
								data={rule}
								parent={fullRuleNumber} />
						))}
					</RuleList>
				)}
			</dd>
		</>
	)
}
