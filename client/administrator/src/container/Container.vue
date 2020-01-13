<template>
	<div class="main-wrapper main-wrapper-1">
		<Header />
		<Sidebar />
		<div class="main-content">
			<section class="section"><router-view></router-view></section>
		</div>
		<Footer />
	</div>
</template>
<script>
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

export default {
	name: "Container",
	// created() {
	// 	let scriptJs = document.createElement("script")
	// 	scriptJs.setAttribute("src", "assets/js/scripts.js")
	// 	document.head.appendChild(scriptJs)
	// },
	// beforeRouteUpdate(to, from, next) {
	// 	next()
	// 	let scriptJs = document.createElement("script")
	// 	scriptJs.setAttribute("src", "assets/js/scripts.js")
	// 	document.head.appendChild(scriptJs)
	// },
	components: {
		Header,
		Sidebar,
		Footer
	}
}
</script>
