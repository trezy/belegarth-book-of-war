// Module imports
import classnames from 'classnames'
import { PropsWithChildren } from 'react'





// Local imports
import styles from './Layout.module.scss'





// Types
type Props = PropsWithChildren<{
	className?: string,
}>





export function Layout(props: Props) {
	const {
		children,
		className,
	} = props

	const compiledClassName = classnames(styles['layout'], className)

  return (
		<main className={compiledClassName}>
			{children}
		</main>
	)
}
