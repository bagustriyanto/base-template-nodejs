<template>
	<div class="main-wrapper main-wrapper-1">
		<Header />
		<Sidebar />
		<div class="main-content">
			<div id="loading" style="position: absolute; z-index: 879; width: 100%; height: 100%; left: 0px; background-color: rgba(0,0,0,0.2); display: none">
				<div style="width: 100%; margin:0 auto; position: absolute; left: 5%; top: 50%"><scale-loader :color="'#6777EF'"></scale-loader></div>
			</div>
			<section class="section"><router-view></router-view></section>
		</div>
		<Footer />
	</div>
</template>
<script>
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue"
import axios from "axios"

export default {
	name: "Container",
	components: {
		Header,
		Sidebar,
		Footer,
		ScaleLoader
	},
	created() {
		axios.defaults.headers.common["Authorization"] = `Bearer ${this.$cookies.get("token")}`
	}
}
</script>
