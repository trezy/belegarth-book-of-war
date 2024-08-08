// Local imports
import styles from './Pagination.module.scss'

import { Link } from '../Link/Link'





// Types
type Props = {
	next?: {
		href: string,
		label: string,
	},
	previous?: {
		href: string,
		label: string,
	},
}





export function Pagination(props: Props) {
	const {
		next,
		previous,
	} = props

  return (
		<div className={styles['pagination']}>
			{previous && (
				<Link
					className={styles['previous']}
					href={previous.href}
					noStyle>
					<span className={styles['label']}>
						{'Previous'}
					</span>

					{previous.label}
				</Link>
			)}

			{next && (
				<Link
					className={styles['next']}
					href={next.href}
					noStyle>
					<span className={styles['label']}>
						{'Next'}
					</span>

					{next.label}
				</Link>
			)}
		</div>
	)
}
