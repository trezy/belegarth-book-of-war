// Module imports
import { type ReactNode } from 'react'





// Local imports
import styles from './RuleList.module.scss'





export function RuleList({ children }: { children: ReactNode }) {
	return (
		<dl className={styles['rule-list']}>
			{children}
		</dl>
	)
}
