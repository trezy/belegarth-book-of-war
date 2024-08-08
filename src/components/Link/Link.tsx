// Module imports
import { MouseEventHandler, type PropsWithChildren } from 'react'
import classnames from 'classnames'
import NextLink from 'next/link'
import PropTypes from 'prop-types'





// Local imports
import styles from './Link.module.scss'

import { ExternalLink } from '../ExternalLink/ExternalLink'




// Types
type Props = PropsWithChildren<{
	className?: string,
	href: string,
	noStyle?: boolean,
	onClick?: MouseEventHandler<HTMLAnchorElement>,
}>





export function Link(props: Props) {
	const {
		children,
		className = '',
		href,
		noStyle,
		onClick,
	} = props

	const compiledClassName = classnames(styles['link'], className, {
		[styles['no-style']]: noStyle,
	})

	if ((href.startsWith('/')) || (href.startsWith('#'))) {
		return (
			<NextLink
				className={compiledClassName}
				href={href}
				onClick={onClick}>
				{children}
			</NextLink>
		)
	}

	return (
		<ExternalLink
			className={compiledClassName}
			href={href}
			onClick={onClick}>
			{children}
		</ExternalLink>
	)
}

Link.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	href: PropTypes.string.isRequired,
}
