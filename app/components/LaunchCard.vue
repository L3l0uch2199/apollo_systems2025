<template>
	<v-card
		class="launch-card"
		elevation="2"
		hover
		:class="{ 'launch-card-hovered': isHovered }"
		@mouseover="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<v-card-title class="text-h5 font-weight-bold primary--text">
			{{ launch.mission_name }}
		</v-card-title>

		<v-card-text>
			<div class="launch-details">
				<!-- Launch Date -->
				<div class="detail-item mb-4">
					<span class="detail-label font-weight-medium">Launch Date:</span>
					<span class="detail-value">{{ formatDate(launch.launch_date_utc) }}</span>
				</div>

				<!-- Launch Site -->
				<div class="detail-item mb-4">
					<span class="detail-label font-weight-medium">Launch Site:</span>
					<span class="detail-value">
						{{ launch.launch_site?.site_name_long || 'N/A' }}
					</span>
				</div>

				<!-- Rocket -->
				<div class="detail-item mb-4">
					<span class="detail-label font-weight-medium">Rocket:</span>
					<span class="detail-value">
						<template v-if="launch.rocket?.rocket_name">
							<NuxtLink
								:to="`/rockets/${toSlug(launch.rocket.rocket_name)}`"
								class="rocket-link text-decoration-none"
								:class="{ 'rocket-link-hovered': isLinkHovered }"
								@mouseover="isLinkHovered = true"
								@mouseleave="isLinkHovered = false"
							>
								{{ launch.rocket.rocket_name }}
							</NuxtLink>
						</template>
						<template v-else>N/A</template>
					</span>
				</div>

				<!-- Details -->
				<div class="detail-item">
					<span class="detail-label font-weight-medium">Details:</span>
					<span class="detail-value">
						<template v-if="launch.details">
							{{ launch.details }}
						</template>
						<template v-else>
							<span class="text-caption text-medium-emphasis">No details available.</span>
						</template>
					</span>
				</div>
			</div>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
	launch: any
	formatDate: (d: string) => string
	toSlug: (name?: string) => string
}>()

const isHovered = ref(false)
const isLinkHovered = ref(false)
</script>

<style scoped>
.launch-card {
	border-radius: 8px;
	border: 2px solid transparent;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
}

.launch-card.launch-card-hovered {
	border-color: #1e88e5;
	box-shadow:
		0 8px 24px rgba(0, 0, 0, 0.3),
		0 0 15px rgba(30, 136, 229, 0.4),
		0 0 30px rgba(30, 136, 229, 0.2);
}

.launch-details {
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
	font-size: 1.2rem;
	font-weight: 500;
}

.detail-value {
	color: rgba(0, 0, 0, 0.95);
	line-height: 1.5;
}

.rocket-link {
	color: #1e88e5;
	font-weight: 500;
	text-decoration: none;
	position: relative;
	transition: color 0.2s ease;
}

.rocket-link::after {
	content: '';
	position: absolute;
	bottom: -2px;
	left: 0;
	width: 0;
	height: 2px;
	background-color: #1e88e5;
	transition: width 0.3s ease;
}

.rocket-link.rocket-link-hovered {
	color: #1565c0;
}

.rocket-link.rocket-link-hovered::after {
	width: 100%;
}

.text-h5 {
	font-size: 1.5rem !important;
	line-height: 1.4 !important;
	padding-bottom: 16px;
}

.text-caption {
	font-size: 0.8125rem !important;
}

.v-card-title {
	padding-bottom: 16px;
}

.v-card-text {
	padding-top: 0;
}

.mb-4 {
	margin-bottom: 1rem !important;
}
</style>
