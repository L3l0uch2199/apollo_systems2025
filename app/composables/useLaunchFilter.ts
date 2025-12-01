import type { Ref } from 'vue'
import { computed, ref } from 'vue'

export function useLaunchFilter(launches: Ref<any[]>) {
	const filterYear = ref('')

	const filteredLaunches = computed(() => {
		if (!filterYear.value) return launches.value

		return launches.value.filter((launch) => {
			const year = new Date(launch.launch_date_utc).getFullYear().toString()
			return year === filterYear.value.toString()
		})
	})

	return { filterYear, filteredLaunches }
}
