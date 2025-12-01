<template>
	<v-container>
		<v-row>
			<v-col cols="12" class="text-center">
				<h1 class="text-h3 mt-4">⭐ Favorite Rockets</h1>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12" md="8" offset-md="2">
				<div v-if="favorites.length === 0" class="empty-state">
					<v-card class="pa-6">
						<p class="text-medium-emphasis text-center">No favorites added yet.</p>
					</v-card>
				</div>

				<div v-for="rocket in favorites" :key="rocket.slug" class="mb-4">
					<v-card class="fav-card" hover>
						<v-card-text>
							<v-row>
								<v-col cols="8">
									<div class="fav-info">
										<h2 class="text-h6 font-weight-bold mb-2">{{ rocket.name }}</h2>
										<NuxtLink
											:to="`/rockets/${rocket.slug}`"
											class="view-btn text-decoration-none text-primary font-weight-medium"
										>
											View Details
										</NuxtLink>
									</div>
								</v-col>
								<v-col cols="4" class="d-flex justify-end mt-4">
									<v-btn
										color="error"
										variant="flat"
										size="small"
										rounded="xl"
										@click="remove(rocket.slug)"
									>
										Remove
									</v-btn>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</div>

				<div v-if="favorites.length > 0" class="mt-6">
					<v-btn color="error" variant="flat" block size="large" rounded="xl" @click="clear">
						Clear Favorites
					</v-btn>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFavoritesStore } from '~/stores/useFavoritesStore'

const favoritesStore = useFavoritesStore()

// Initialize favorites from localStorage when component mounts
onMounted(() => {
	favoritesStore.initializeFromStorage()
})

// reactive favorites list
const favorites = computed(() => favoritesStore.getFavorites)

const remove = (slug: string) => favoritesStore.removeFavorite(slug)
const clear = () => favoritesStore.clearFavorites()
</script>
<style scoped>
.fav-card {
	border-radius: 8px;
	transition: all 0.3s ease;
}

.fav-card:hover {
	transform: translateY(-2px);
}

.fav-info {
	display: flex;
	flex-direction: column;
}

.view-btn {
	transition: color 0.2s ease;
}

.view-btn:hover {
	color: #0d47a1;
}

.empty-state {
	margin-top: 30px;
}
</style>
