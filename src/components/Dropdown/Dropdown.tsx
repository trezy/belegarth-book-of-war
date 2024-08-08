// Module imports
import {
	Children,
	type PropsWithChildren,
} from 'react'
import classnames from 'classnames'





// Local imports
import styles from './Dropdown.module.scss'





// Typedefs
type Props = PropsWithChildren<{
	label: string,
	labelClassName?: string,
}>





export function Dropdown(props: Props) {
	const {
		children,
		label,
		labelClassName,
	} = props

	return (
		<div className={styles['dropdown-container']}>
			<div className={classnames(styles['label'], labelClassName)}>
				{label}
			</div>

			<div className={styles['dropdown']}>
				{Children.map(children, child => (
					<div className={styles['dropdown-item']}>
						{child}
					</div>
				))}
			</div>
		</div>
	)
}
