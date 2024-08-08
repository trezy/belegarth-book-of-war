// Module imports
import { PropsWithChildren } from 'react'





// Local imports
import styles from './Tag.module.scss'





// Types
type Props = PropsWithChildren





export function Tag(props: Props) {
	const { children } = props

	return (
		<div className={styles['tag']}>
			{children}
		</div>
	)
}
