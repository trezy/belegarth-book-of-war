// Module imports
import React from 'react'





// Local imports
import styles from './Banner.module.scss'

import { Search } from '../Search/Search'





export async function Banner() {
	return (
		<nav
			className={styles['banner']}
			role={'banner'}>
			<Search />
		</nav>
	)
}
