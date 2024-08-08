// Module imports
import {
	Source_Code_Pro,
	Source_Sans_3,
} from 'next/font/google'
import classnames from 'classnames'
import { type Metadata } from 'next'
import { type PropsWithChildren } from 'react'





// Local imports
import '@/styles/app.scss'

import { Banner } from '@/components/Banner/Banner'





// Constants
const sourceCodePro = Source_Code_Pro({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-source-code-pro',
})
const sourceSans3 = Source_Sans_3({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-source-sans-3',
})





export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({ children }: PropsWithChildren) {
	const compiledClassName = classnames(
		sourceCodePro.variable,
		sourceSans3.variable,
		sourceSans3.className,
	)

	return (
		<html lang={'en'}>

			<body className={compiledClassName}>
				<Banner />

				{children}

				<div id={'modal-target'} />
			</body>
		</html>
	)
}
