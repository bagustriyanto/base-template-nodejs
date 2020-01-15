<template>
	<div>
		<section class="section">
			<div class="container mt-5">
				<div class="row">
					<div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
						<div class="login-brand">
							<img src="assets/img/stisla-fill.svg" alt="logo" width="100" class="shadow-light rounded-circle" />
						</div>

						<div class="card card-primary">
							<div class="card-header">
								<h4>{{ lang.label_login }}</h4>
							</div>

							<div class="card-body">
								<form class="needs-validation" novalidate="" v-on:submit.prevent="submit" autocomplete="off">
									<div class="form-group">
										<label for="username">{{ lang.label_username }}</label>
										<input
											id="username"
											type="text"
											class="form-control"
											name="username"
											v-model="form.username"
											tabindex="1"
											required
											autofocus
											v-on:blur="formTriggered = true"
											v-bind:class="{
												'is-invalid': !$v.form.username.required && formTriggered
											}"
										/>
										<div class="invalid-feedback" v-if="!$v.form.username.required">
											{{ lang.form_required }}
										</div>
									</div>

									<div class="form-group">
										<div class="d-block">
											<label for="password" class="control-label">{{ lang.label_password }}</label>
										</div>
										<input
											id="password"
											type="password"
											class="form-control"
											name="password"
											v-model="form.password"
											tabindex="2"
											required
											v-bind:class="{
												'is-invalid': !$v.form.password.required && formTriggered
											}"
										/>
										<div class="invalid-feedback" v-if="!$v.form.password.required">
											{{ lang.form_required }}
										</div>
									</div>

									<div class="form-group">
										<button type="submit" class="btn btn-primary btn-lg btn-block" tabindex="4">
											{{ lang.label_login }}
										</button>
									</div>
								</form>
							</div>
						</div>
						<div class="simple-footer">
							Copyright &copy; Stisla 2018
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators"
import constant from "../assets/js/constants.js"
import axios from "axios"

export default {
	name: "Login",
	data: function() {
		return {
			lang: {},
			form: {
				username: null,
				password: null
			},
			loginSuccess: false,
			formTriggered: false
		}
	},
	validations: {
		form: {
			username: { required },
			password: { required, minLength: minLength(constant.password_length) }
		}
	},
	created() {
		let vm = this
		this.$lang.then(result => {
			vm.lang = result
			document.title = vm.lang.label_login
		})
	},
	methods: {
		submit: function() {
			let vm = this
			axios({
				method: "post",
				url: "/login",
				data: vm.form
			}).then(({ data }) => {
				if (data.status) {
					vm.$cookies.set("token", data.token, "29min")
					vm.$cookies.set("username", vm.form.username, "29min")
					vm.$cookies.set("credential_id", data.data.id)
					vm.$cookies.set("lang", "id")
					this.$router.push({ path: "/administrator/dashboard" })
				}
			})
		}
	}
}
</script>
