// layouts/default.vue
<template>
	<v-app>
		<v-app-bar color="primary" dark flat app>
			<v-app-bar-title>
				<NuxtLink to="/" class="text-decoration-none text-white">🚀 Space X Launches</NuxtLink>
			</v-app-bar-title>

			<!-- Desktop navigation -->
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn text to="/">Home</v-btn>
				<v-btn text to="/spacexlaunches">Launches</v-btn>
				<v-btn text to="/favorites">Favorites</v-btn>
			</v-toolbar-items>

			<!-- Mobile menu button -->
			<v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleMobileMenu"></v-app-bar-nav-icon>
		</v-app-bar>

		<v-navigation-drawer v-model="isMobileMenuOpen" app temporary right width="300">
			<v-list>
				<v-list-item to="/" @click="closeMobileMenu">
					<v-list-item-title>Home</v-list-item-title>
				</v-list-item>
				<v-list-item to="/spacexlaunches" @click="closeMobileMenu">
					<v-list-item-title>Launches</v-list-item-title>
				</v-list-item>
				<v-list-item to="/favorites" @click="closeMobileMenu">
					<v-list-item-title>Favorites</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<slot />
			<FooterBar />
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
	isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
	isMobileMenuOpen.value = false
}
</script>
