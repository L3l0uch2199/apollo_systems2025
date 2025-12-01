import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client/core'
import { defineEventHandler } from 'h3'

const client = new ApolloClient({
	link: createHttpLink({
		uri: 'https://spacex-production.up.railway.app/graphql',
		fetch,
	}),
	cache: new InMemoryCache(),
})

const GET_LAUNCHES = gql`
	query GetLaunches {
		launchesPast(limit: 100) {
			id
			mission_name
			launch_date_utc
			launch_site {
				site_name_long
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`

export default defineEventHandler(async () => {
	try {
		const { data } = await client.query({ query: GET_LAUNCHES })
		return data.launchesPast
	} catch (err) {
		console.error('Apollo fetch error:', err)
		throw new Error('Failed to fetch launches')
	}
})
