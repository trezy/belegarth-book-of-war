// Module imports
import { MouseEventHandler, PropsWithChildren } from 'react'





// Types
type Props = PropsWithChildren<{
	className?: string,
	href: string,
	onClick?: MouseEventHandler<HTMLAnchorElement>,
	rel?: string,
}>





export function ExternalLink(props: Props) {
	const {
		children,
		className = '',
		href,
		onClick,
		rel = '',
	} = props

	return (
		<a
			{...props}
			className={className}
			href={href}
			onClick={onClick}
			rel={`noopener noreferrer ${rel}`}
			target={'_blank'}>
			{children}
		</a>
	)
}
