<template>
	<div class="main-sidebar sidebar-style-2">
		<aside id="sidebar-wrapper">
			<div class="sidebar-brand">
				<a href="index.html">Stisla</a>
			</div>
			<div class="sidebar-brand sidebar-brand-sm">
				<a href="index.html">St</a>
			</div>
			<ul class="sidebar-menu">
				<li
					v-for="(item, index) in menuList"
					:key="index"
					class="dropdown"
					:class="[
						$router.app.$route.path === item.menu.url
							? 'active'
							: $router.app.$route.meta.parent === item.menu.title.toLowerCase()
							? 'active'
							: null
					]"
				>
					<router-link
						:to="item.menu.child.length > 0 ? '' : item.menu.url"
						data-toggle="dropdown"
						class="nav-link"
						:class="{ 'has-dropdown': item.menu.child.length > 0 }"
						><i class="fas" :class="[item.menu.icon === null ? 'fa-fire' : item.menu.icon]"></i><span>{{ item.menu.title }}</span></router-link
					>
					<ul class="dropdown-menu">
						<li
							:class="{
								active: $router.app.$route.meta.childUrl === child.url
							}"
							v-for="(child, childIndex) in item.menu.child"
							:key="childIndex"
						>
							<router-link class="nav-link" v-bind:to="'/administrator' + child.url">
								{{ child.title }}
							</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</aside>
	</div>
</template>
<script>
import axios from "axios"
import constant from "../assets/js/constants.js"

export default {
	name: "Sidebar",
	data() {
		return {
			menuList: {}
		}
	},
	beforeCreate() {
		let vm = this
		axios
			.get(`${constant.apiEndPoint}/shared/menu`, {
				headers: {
					Authorization: `Bearer ${vm.$cookies.get("token")}`
				}
			})
			.then(({ data }) => {
				vm.menuList = data
			})
	}
}
</script>
