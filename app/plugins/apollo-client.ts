import { defineNuxtPlugin } from '#app'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

export default defineNuxtPlugin((nuxtApp) => {
	const client = new ApolloClient({
		link: createHttpLink({
			uri: 'https://spacex-production.up.railway.app/graphql', // Your GraphQL endpoint
			fetch, // Use Node 22 built-in fetch
		}),
		cache: new InMemoryCache(),
	})

	nuxtApp.provide('apolloClient', client)
})
