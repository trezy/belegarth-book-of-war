// Local imports
import styles from './page.module.css'

import { Layout } from '@/components/Layout/Layout'
import { Link } from '@/components/Link/Link'





export default function Home() {
	return (
		<Layout>
			<div className={styles['content']}>
				{'This application provides a searchable version of the '}<Link href={'https://www.belegarth.com/rules'}><em>{'Belegarth Book of War'}</em></Link>{', as well as a history of any rule changes the '}<em>{'BoW'}</em>{' has undergone.'}
			</div>
		</Layout>
	)
}
