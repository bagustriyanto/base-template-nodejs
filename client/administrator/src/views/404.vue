<template>
	<div id="app">
		<section class="section">
			<div class="container mt-5">
				<div class="page-error">
					<div class="page-inner">
						<h1>404</h1>
						<div class="page-description">
							The page you were looking for could not be found.
						</div>
						<div class="page-search">
							<div class="mt-3">
								<router-link class="nav-link" to="/">{{ "Back to Home" }}</router-link>
							</div>
						</div>
					</div>
				</div>
				<div class="simple-footer mt-5">
					Copyright &copy; Stisla 2018
				</div>
			</div>
		</section>
	</div>
</template>
<script>
export default {
	name: "Page404",
	mounted() {
		document.title = "Page not found"
	}
}
</script>
