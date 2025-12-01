import { defineStore } from 'pinia'

interface Rocket {
	rocket_id: string
	name: string
	slug: string
}

export const useFavoritesStore = defineStore('favorites', {
	state: () => ({
		// Initialize with empty array - will be populated in onMounted
		favorites: [] as Rocket[],
	}),
	getters: {
		getFavorites: (state) => state.favorites,
		isFavorite: (state) => (slug: string) =>
			state.favorites.some((rocket: Rocket) => rocket.slug === slug),
	},
	actions: {
		addFavorite(rocket: Rocket) {
			this.favorites.push(rocket)
			this.saveToLocalStorage()
		},
		removeFavorite(slug: string) {
			this.favorites = this.favorites.filter((rocket: Rocket) => rocket.slug !== slug)
			this.saveToLocalStorage()
		},
		clearFavorites() {
			this.favorites = []
			this.saveToLocalStorage()
		},
		saveToLocalStorage() {
			if (typeof window !== 'undefined') {
				localStorage.setItem('favorites', JSON.stringify(this.favorites))
			}
		},
		// New action to initialize from localStorage
		initializeFromStorage() {
			if (typeof window !== 'undefined') {
				const stored = localStorage.getItem('favorites')
				if (stored) {
					this.favorites = JSON.parse(stored)
				}
			}
		},
	},
})
