export function getPublicURL() {
	return (process.env.NEXT_PUBLIC_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL)?.replace(/^https?:/i, '')
}
