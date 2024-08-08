// Module imports
import { PropsWithChildren } from 'react'





// Types
type Props = PropsWithChildren<{
	className?: string,
	href: string,
	rel?: string,
}>





export function ExternalLink(props: Props) {
	const {
		children,
		className = '',
		href,
		rel = '',
	} = props

	return (
		<a
			{...props}
			className={className}
			href={href}
			rel={`noopener noreferrer ${rel}`}
			target={'_blank'}>
			{children}
		</a>
	)
}
