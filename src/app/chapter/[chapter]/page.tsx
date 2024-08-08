// Local imports
import styles from './page.module.scss'

import { type RuleData } from '@/typedefs/RuleData'
import { getChapterData } from '@/helpers/getChapterData'
import { Pagination } from '@/components/Pagination/Pagination'
import { Rule } from '@/components/Rule/Rule'
import { RuleList } from '@/components/RuleList/RuleList'
import { TableOfContents } from '@/components/TableOfContents/TableOfContents'





// Types
type Props = {
	params: {
		chapter: string
	}
}





export default async function ChapterPage({ params }: Props) {
	const {
		title,
		rules,
		previousChapter,
		nextChapter,
	} = await getChapterData(params.chapter)

  return (
		<div className={styles['layout']}>
			<TableOfContents highlightChapter={params.chapter} />

			<div className={styles['page-contents']}>
				<h2>{`Chapter ${params.chapter}: ${title}`}</h2>

				<RuleList>
					{rules?.map((rule: RuleData, index: number) => (
						<Rule
							data={rule}
							key={index}
							parent={params.chapter} />
					))}
				</RuleList>

				<Pagination
					next={nextChapter ? {
						href: `/chapter/${nextChapter.number}`,
						label: nextChapter.name,
					} : undefined}
					previous={previousChapter ? {
						href: `/chapter/${previousChapter.number}`,
						label: previousChapter.name,
					} : undefined} />
			</div>
		</div>
	)
}
