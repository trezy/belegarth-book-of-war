// Module imports
import classnames from 'classnames'





// Local imports
import styles from './TableOfContents.module.scss'

import { getChapterNavigationData } from '@/helpers/getChapterNavigationData'
import { Link } from '../Link/Link'





// Typedefs
type Props = {
	highlightChapter?: string | number,
}





export async function TableOfContents(props: Props) {
	const { highlightChapter } = props

	const chapterNavigation = await getChapterNavigationData()

	return (
		<nav className={styles['table-of-contents']}>
			<header>{'Table of Contents'}</header>

			<ol>
				{chapterNavigation.map(navItem => (
					<li key={navItem.href}>
						<Link
							className={classnames(styles['link'], {
								[styles['is-active']]: new RegExp(`/chapter/${highlightChapter}`).test(navItem.href),
							})}
							href={navItem.href}
							noStyle>
							{navItem.body}
						</Link>
					</li>
				))}
			</ol>
		</nav>
	)
}
