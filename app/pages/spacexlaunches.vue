<template>
	<v-container>
		<!-- Title Row -->
		<v-row>
			<v-col cols="12" class="text-center text-white">
				<h1 class="text-h3">Space X Launches</h1>
			</v-col>
		</v-row>

		<!-- Filter and Sort Row -->
		<v-row>
			<v-col cols="12" md="6">
				<v-select
					v-model="filterYear"
					:items="yearOptions"
					label="Filter by Year"
					variant="outlined"
					density="comfortable"
					class="mb-4"
					clearable
				></v-select>
			</v-col>
			<v-col cols="12" md="6">
				<v-select
					v-model="sortOrder"
					:items="sortOptions"
					label="Sort by Date"
					variant="outlined"
					density="comfortable"
				></v-select>
			</v-col>
		</v-row>

		<!-- Launch Cards Row -->
		<v-row>
			<v-col cols="12">
				<div v-if="loading" class="text-center py-8">
					<v-progress-circular indeterminate color="primary"></v-progress-circular>
					<p class="mt-2">Loading launches...</p>
				</div>

				<div v-if="error" class="text-center py-8">
					<v-alert type="error" prominent>{{ error }}</v-alert>
				</div>

				<div v-if="sortedLaunches.length">
					<v-row>
						<v-col
							v-for="launch in sortedLaunches"
							:key="launch.id"
							cols="12"
							class="d-flex justify-center mb-4"
						>
							<v-card width="800" max-width="100%" class="launch-card">
								<LaunchCard :launch="launch" :format-date="formatDate" :to-slug="toSlug" />
							</v-card>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useLaunchFilter } from '@/composables/useLaunchFilter'
import { useLaunchSort } from '@/composables/useLaunchSort'
import LaunchCard from '~/components/LaunchCard.vue'

interface Launch {
	id: string
	mission_name: string
	launch_date_utc: string
	launch_site: { site_name_long: string } | null
	rocket: { rocket_name: string; rocket_id: string } | null
	details?: string
}

const launches = ref<Launch[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
	try {
		const res = await fetch('/api/spacexlaunches')
		if (!res.ok) throw new Error('Failed to fetch launches')
		launches.value = await res.json()
	} catch (err: any) {
		error.value = err.message
	} finally {
		loading.value = false
	}
})

const { filterYear, filteredLaunches } = useLaunchFilter(launches)
const { sortOrder, sortedLaunches } = useLaunchSort(filteredLaunches)

const years = computed(() => {
	const uniqueYears = new Set(launches.value.map((l) => new Date(l.launch_date_utc).getFullYear()))
	return Array.from(uniqueYears).sort((a, b) => b - a)
})

const yearOptions = computed(() => [
	{ title: 'All Years', value: '' },
	...years.value.map((year) => ({ title: year.toString(), value: year.toString() })),
])

const sortOptions = [
	{ title: 'Oldest First', value: 'asc' },
	{ title: 'Newest First', value: 'desc' },
]

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString()

const toSlug = (name?: string) => (name ? name.toLowerCase().replace(/\s+/g, '-') : '')
</script>

<style scoped>
.launch-card {
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
