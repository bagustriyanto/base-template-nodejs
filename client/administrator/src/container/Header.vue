<template>
	<div>
		<div class="navbar-bg"></div>
		<nav class="navbar navbar-expand-lg main-navbar">
			<form class="form-inline mr-auto">
				<ul class="navbar-nav mr-3">
					<li>
						<a :href="'#' + $router.app.$route.path" data-toggle="sidebar" class="nav-link nav-link-lg"><i class="fas fa-bars"></i></a>
					</li>
					<li>
						<a href="#" data-toggle="search" class="nav-link nav-link-lg d-sm-none"><i class="fas fa-search"></i></a>
					</li>
				</ul>
				<div class="search-element">
					<input class="form-control" type="search" placeholder="Search" aria-label="Search" data-width="250" />
					<button class="btn" type="submit">
						<i class="fas fa-search"></i>
					</button>
					<div class="search-backdrop"></div>
				</div>
			</form>
			<ul class="navbar-nav navbar-right">
				<li class="dropdown">
					<a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg nav-link-user">
						<div class="d-sm-none d-lg-inline-block">
							{{ locale === "en" ? "English" : "Bahasa Indonesia" }}
						</div>
					</a>
					<div class="dropdown-menu dropdown-menu-right">
						<div class="dropdown-divider"></div>
						<a href="#" class="dropdown-item has-icon" v-on:click.prevent="changeLang('en')">
							English
						</a>
						<div class="dropdown-divider"></div>
						<a href="#" class="dropdown-item has-icon" v-on:click.prevent="changeLang('id')">
							Bahasa Indonesia
						</a>
					</div>
				</li>
			</ul>
			<ul class="navbar-nav navbar-right">
				<li class="dropdown">
					<a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg nav-link-user">
						<img alt="image" src="/assets/img/avatar/avatar-1.png" class="rounded-circle mr-1" />
						<div class="d-sm-none d-lg-inline-block">{{ username }}</div>
					</a>
					<div class="dropdown-menu dropdown-menu-right">
						<div class="dropdown-divider"></div>
						<a href="#" class="dropdown-item has-icon text-danger" v-on:click.prevent="logout">
							<i class="fas fa-sign-out-alt"></i> {{ "Logout" }}
						</a>
					</div>
				</li>
			</ul>
		</nav>
	</div>
</template>
<script>
export default {
	name: "Header",
	data: function() {
		return {
			lang: {},
			username: this.$cookies.get("username"),
			locale: this.$cookies.get("lang")
		}
	},
	mounted() {
		let self = this
		this.$lang.then(result => {
			self.lang = result
		})
	},
	methods: {
		logout: function() {
			this.$cookies.remove("token")
			this.$cookies.remove("username")

			window.location.replace("/#/login")
		},
		changeLang: function(lang) {
			this.$cookies.set("lang", lang)
			window.location.reload()
		}
	}
}
</script>
