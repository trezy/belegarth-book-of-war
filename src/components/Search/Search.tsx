'use client'

// Module imports
import {
	ChangeEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import classnames from 'classnames'
import Fuse, { type FuseResult } from 'fuse.js'





// Local imports
import styles from './Search.module.scss'

import { Link } from '@/components/Link/Link'
import { RuleSearchData } from '@/typedefs/RuleSearchData'
import { Tag } from '@/components/Tag/Tag'





export function Search() {
	const [isLoading, setIsLoading] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<FuseResult<RuleSearchData>[]>([])

	const fuseRef = useRef(new Fuse([], {
		includeMatches: true,
		includeScore: true,
		keys: ['body'],
		minMatchCharLength: 3,
	}))

	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value), [])

	useEffect(() => {
		if (!isLoading && !isLoaded) {
			setIsLoading(true)
			fetch('/data/search.json')
				.then(result => result.json())
				.then(result => {
					fuseRef.current.setCollection(result)
					setIsLoaded(true)
				})
		}
	}, [
		isLoading,
		isLoaded,
	])

	useEffect(() => {
		setResults(fuseRef.current.search<RuleSearchData>(query))
	}, [query])

	return (
		<div className={styles['search-container']}>
			<input
				onChange={handleChange}
				placeholder={'Search'}
				type={'search'} />

			<ol className={styles['search-results']}>
				{results.map((result, index) => (
					<li
						key={index}
						className={styles['search-result']}>
						<Link
							href={result.item.href}
							noStyle>
							<span className={classnames({
								[styles['legacy-rule']]: result.item.tags.length,
							})}>
								{`${result.item.number}: ${result.item.body}`}
							</span>

							{Boolean(result.item.tags.length) && (
								<Tag>{'Legacy'}</Tag>
							)}
						</Link>
					</li>
				))}
			</ol>
		</div>
	)
}
