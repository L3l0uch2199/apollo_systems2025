<template>
	<v-container>
		<v-row>
			<v-col cols="12" md="8" offset-md="2">
				<!-- Loading State -->
				<div v-if="loading" class="text-center py-8">
					<v-progress-circular indeterminate color="primary"></v-progress-circular>
					<p class="mt-2">Loading rocket...</p>
				</div>

				<!-- Rocket Details -->
				<div v-else-if="rocket">
					<v-card
						class="rocket-card"
						elevation="4"
						hover
						@mouseover="cardHovered = true"
						@mouseleave="cardHovered = false"
					>
						<v-card-title class="text-h4 font-weight-bold pa-2 ml-4 mt-4">
							{{ rocket.name }}
						</v-card-title>

						<v-card-text class="pa-0 ma-2">
							<div class="rocket-details">
								<!-- Description -->
								<div class="detail-item pa-2 ma-2">
									<span class="detail-label font-weight-bold text-h6">Description:</span>
									<span class="detail-value text-body-1">{{ rocket.description }}</span>
								</div>

								<!-- First Flight -->
								<div class="detail-item pa-2 ma-2">
									<span class="detail-label font-weight-bold text-h6">First Flight:</span>
									<span class="detail-value text-body-1">{{ rocket.first_flight }}</span>
								</div>

								<!-- Height -->
								<div class="detail-item pa-2 ma-2">
									<span class="detail-label font-weight-bold text-h6">Height:</span>
									<span class="detail-value text-body-1">
										{{ rocket.height?.meters }} m
									</span>
								</div>

								<!-- Diameter -->
								<div class="detail-item pa-2 ma-2">
									<span class="detail-label font-weight-bold text-h6">Diameter:</span>
									<span class="detail-value text-body-1">
										{{ rocket.diameter?.meters }} m
									</span>
								</div>

								<!-- Mass -->
								<div class="detail-item pa-2 ma-2">
									<span class="detail-label font-weight-bold text-h6">Mass:</span>
									<span class="detail-value text-body-1">{{ rocket.mass?.kg }} kg</span>
								</div>

								<!-- Stages -->
								<div class="detail-item pa-2 ma-2">
									<span class="detail-label font-weight-bold text-h6">Stages:</span>
									<span class="detail-value text-body-1">{{ rocket.stages }}</span>
								</div>

								<!-- Favorite Button -->
								<div class="detail-item pa-4 mb-2">
									<v-btn
										color="primary"
										variant="flat"
										size="large"
										rounded="xl"
										class="favorite-btn"
										@click="toggleFavorite"
									>
										<v-icon class="mr-2">
											{{ _isFav ? 'mdi-star' : 'mdi-star-outline' }}
										</v-icon>
										{{ _isFav ? 'Remove from Favorites' : 'Add to Favorites' }}
									</v-btn>
								</div>
							</div>
						</v-card-text>
					</v-card>
				</div>

				<!-- Not Found State -->
				<div v-else class="text-center py-8">
					<v-alert type="error" prominent>Rocket not found.</v-alert>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFavoritesStore } from '~/stores/useFavoritesStore'

const route = useRoute()
const rocketSlug = route.params.id as string

const rocket = ref<any>(null)
const loading = ref(true)
const error = ref('')
const cardHovered = ref(false)

const favoritesStore = useFavoritesStore()
const _isFav = computed(() => favoritesStore.isFavorite(rocketSlug))

const toggleFavorite = () => {
	if (!rocket.value) return

	if (_isFav.value) {
		favoritesStore.removeFavorite(rocketSlug)
	} else {
		favoritesStore.addFavorite({
			rocket_id: rocketSlug,
			name: rocket.value.name,
			slug: rocketSlug,
		})
	}
}

// Fetch rocket via API
onMounted(async () => {
	try {
		const res = await fetch(`/api/rockets/${rocketSlug}`)
		if (!res.ok) throw new Error('Rocket not found')
		rocket.value = await res.json()
	} catch (e: any) {
		error.value = e.message
	} finally {
		loading.value = false
	}
})
</script>

<style scoped>
.rocket-card {
	border-radius: 8px;
	transition: all 0.3s ease;
	border-color: transparent;
}

.rocket-card:hover {
	border-color: #1e88e5;
	box-shadow:
		0 8px 24px rgba(0, 0, 0, 0.3),
		0 0 15px rgba(30, 136, 229, 0.4),
		0 0 30px rgba(30, 136, 229, 0.2);
}

.rocket-details {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.detail-item {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.detail-label {
	color: rgba(0, 0, 0, 0.75);
	font-size: 1.25rem !important;
	font-weight: 600;
	line-height: 1.3;
}

.detail-value {
	color: rgba(0, 0, 0, 0.95);
	line-height: 1.5;
	font-size: 1.125rem !important;
}

.favorite-btn {
	width: 100%;
	justify-content: center;
}

/* Typography adjustments */
.text-h4 {
	font-size: 1.75rem !important;
	line-height: 1.4 !important;
	padding-bottom: 16px;
}

.text-h6 {
	font-size: 1.25rem !important;
	font-weight: 600 !important;
}

.text-body-1 {
	font-size: 1rem !important;
}
</style>
