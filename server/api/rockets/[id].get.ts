import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client/core'
import { createError, defineEventHandler } from 'h3'

interface Rocket {
	id: string
	name: string
	description: string
	first_flight: string
	height: { meters: number }
	diameter: { meters: number }
	mass: { kg: number }
	stages: number
}

const client = new ApolloClient({
	link: createHttpLink({
		uri: 'https://spacex-production.up.railway.app/graphql',
		fetch,
	}),
	cache: new InMemoryCache(),
})

const GET_ROCKETS = gql`
	query GetRockets {
		rockets {
			id
			name
			description
			first_flight
			height {
				meters
			}
			diameter {
				meters
			}
			mass {
				kg
			}
			stages
		}
	}
`

export default defineEventHandler(async (event) => {
	const slug = event.context.params?.id as string

	if (!slug) {
		throw createError({ statusCode: 400, statusMessage: 'Missing rocket slug' })
	}

	const { data } = await client.query<{ rockets: Rocket[] }>({ query: GET_ROCKETS })

	const rocket = data.rockets.find((r) => r.name.toLowerCase().replace(/\s+/g, '-') === slug)

	if (!rocket) {
		throw createError({ statusCode: 404, statusMessage: 'Rocket not found' })
	}

	return rocket
})
