import type { Ref } from 'vue'
import { computed, ref } from 'vue'

export function useLaunchSort(launches: Ref<any[]>) {
	const sortOrder = ref<'asc' | 'desc'>('asc') // default ascending

	const sortedLaunches = computed(() => {
		return [...launches.value].sort((a, b) => {
			const dateA = new Date(a.launch_date_utc).getTime()
			const dateB = new Date(b.launch_date_utc).getTime()

			return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
		})
	})

	return { sortOrder, sortedLaunches }
}
