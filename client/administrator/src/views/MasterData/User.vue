<template>
	<div id="masterUser">
		<div class="section-header">
			<h1>{{ lang.lblmenu_user }}</h1>
			<div class="section-header-breadcrumb">
				<div class="breadcrumb-item active">
					<a href="#">{{ lang.lblmenu_master }}</a>
				</div>
				<div class="breadcrumb-item">{{ lang.lblmenu_user }}</div>
			</div>
		</div>
		<div>
			<div class="row mt-4" v-if="showForm">
				<form id="menuForm" autocomplete="off" style="width: 100%;" v-on:submit.prevent="onSubmit">
					<div class="col-12">
						<div class="card">
							<div class="card-header">
								<h4>
									{{
										formType === 0
											? `${lang.action_add} ${lang.lblmenu_user}`
											: formType === 1
											? `${lang.action_update} ${lang.lblmenu_user}`
											: `${lang.action_view} ${lang.lblmenu_user}`
									}}
								</h4>
							</div>
							<div class="card-body">
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_username }}</label>
									<div class="col-sm-12 col-md-4">
										<input
											type="text"
											v-model="form.credential.username"
											class="form-control"
											v-bind:class="{
												'is-invalid': !$v.form.credential.username.required
											}"
										/>
										<div class="invalid-feedback" v-if="!$v.form.credential.username.required">
											{{ lang.form_required }}
										</div>
									</div>
								</div>
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_email }}</label>
									<div class="col-sm-12 col-md-4">
										<input
											type="email"
											v-model="form.credential.email"
											class="form-control"
											v-bind:class="{
												'is-invalid': !$v.form.credential.email.required || !$v.form.credential.email.email
											}"
										/>
										<div class="invalid-feedback" v-if="!$v.form.credential.email.required">
											{{ lang.form_required }}
										</div>
										<div class="invalid-feedback" v-if="!$v.form.credential.email.email">
											{{ lang.form_email_format }}
										</div>
									</div>
								</div>
								<div class="form-group row mb-4" v-if="formType === 0">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_password }}</label>
									<div class="col-sm-12 col-md-4">
										<input
											type="password"
											v-model="form.credential.password"
											class="form-control"
											v-bind:class="{
												'is-invalid': !$v.form.credential.password.required || !$v.form.credential.password.minLength
											}"
										/>
										<div class="invalid-feedback" v-if="!$v.form.credential.password.required">
											{{ lang.form_required }}
										</div>
										<div class="invalid-feedback" v-if="!$v.form.credential.password.minLength">
											{{ lang.form_password_length }}
										</div>
									</div>
								</div>
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_firstname }}</label>
									<div class="col-sm-12 col-md-4">
										<input
											type="text"
											v-model="form.firstname"
											class="form-control"
											v-bind:class="{
												'is-invalid': !$v.form.firstname.required
											}"
										/>
										<div class="invalid-feedback" v-if="!$v.form.firstname.required">
											{{ lang.form_required }}
										</div>
									</div>
								</div>
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_lastname }}</label>
									<div class="col-sm-12 col-md-4">
										<input type="text" v-model="form.lastname" class="form-control" />
									</div>
								</div>
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_phone }}</label>
									<div class="col-sm-12 col-md-4">
										<input type="text" v-model="form.phone" class="form-control" />
									</div>
								</div>
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_status }}</label>
									<div class="col-sm-12 col-md-2">
										<select class="form-control selectric" v-model="form.cbStatus">
											<option v-bind:value="0">{{ lang.status_inactive }}</option>
											<option v-bind:value="1">{{ lang.status_active }}</option>
										</select>
									</div>
								</div>
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
									<div class="col-sm-12 col-md-7" style="text-align: right;">
										<button class="btn btn-danger" v-on:click="formCancel">
											{{ lang.action_cancel }}
										</button>
										<button class="btn btn-primary" v-if="formType === 0 || formType === 1" v-bind:disabled="submitDisabled">
											{{ lang.action_save }}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="row mt-4">
				<div class="col-12">
					<div class="card">
						<div class="card-body">
							<div class="float-left">
								<select class="form-control selectric">
									<option>{{ lang.action_select_action }}</option>
									<option>{{ lang.action_delete_all }}</option>
								</select>
							</div>
							<div class="float-left">
								<button class="btn btn-lg btn-success btn-create" style="margin-left: 10px;" v-on:click="createClick">
									<i class="far fa-edit"></i>
									{{ `${lang.action_add} ${lang.lblmenu_user}` }}
								</button>
							</div>
							<div class="float-right">
								<form>
									<div class="input-group">
										<input type="text" class="form-control" v-bind:placeholder="lang.placeholder_search" v-model="searchTerm" />
										<div class="input-group-append">
											<button class="btn btn-primary" v-on:click="searchMenu">
												<i class="fas fa-search"></i>
											</button>
										</div>
									</div>
								</form>
							</div>

							<div class="clearfix mb-3"></div>

							<div class="table-responsive">
								<table class="table table-striped">
									<thead>
										<tr>
											<th class="text-center pt-2">
												<div class="custom-checkbox custom-checkbox-table custom-control">
													<input
														type="checkbox"
														data-checkboxes="mygroup"
														data-checkbox-role="dad"
														class="custom-control-input"
														id="checkbox-all"
													/>
													<label for="checkbox-all" class="custom-control-label">&nbsp;</label>
												</div>
											</th>
											<th>{{ lang.label_username }}</th>
											<th>{{ lang.label_email }}</th>
											<th>{{ lang.label_firstname }}</th>
											<th>{{ lang.label_lastname }}</th>
											<th>{{ lang.label_status }}</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) in list" :key="index">
											<td>
												<div class="custom-checkbox custom-control">
													<input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="checkbox-2" />
													<label for="checkbox-2" class="custom-control-label">&nbsp;</label>
												</div>
											</td>
											<td>
												{{ item.username }}
												<div class="table-links">
													<a href="#" v-on:click.prevent="viewClick(item)">{{ lang.action_view }}</a>
													<div class="bullet"></div>
													<a href="#" v-on:click.prevent="editClick(item)">{{ lang.action_update }}</a>
													<div class="bullet"></div>
													<a href="#" class="text-danger" v-on:click.prevent="deleteClick(item)">{{ lang.action_delete }}</a>
												</div>
											</td>
											<td>{{ item.email }}</td>
											<td>{{ item.user.first_name }}</td>
											<td>{{ item.user.last_name }}</td>
											<td>
												<div
													class="badge"
													v-bind:class="{
														'badge-primary': item.status,
														'badge-danger': !item.status
													}"
												>
													{{ item.status === true ? lang.status_active : lang.status_inactive }}
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="float-right">
								<nav>
									<paginate
										v-model="paging.number"
										:page-count="paging.page"
										:click-handler="pagingClick"
										:prev-text="'&laquo;'"
										:next-text="'&raquo;'"
										:container-class="'pagination'"
										:page-class="'page-item'"
										:page-link-class="'page-link'"
									>
									</paginate>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Paginate from "vuejs-paginate"
import constant from "../../assets/js/constants.js"
import { required, email, minLength } from "vuelidate/lib/validators"
import axios from "axios"

export default {
	name: "User",
	components: {
		paginate: Paginate
	},
	data: function() {
		return {
			lang: {},
			formType: 0,
			form: {
				credential: {
					username: null,
					password: null,
					email: null,
					id: 0,
					publicUser: false
				},
				firstname: null,
				lastname: null,
				phone: null,
				status: false,
				id: 0,
				cbStatus: "0"
			},
			list: {},
			cbMenuList: {},
			showForm: false,
			btnShowModal: null,
			formTitle: null,
			formValid: false,
			searchTerm: null,
			paging: {
				page: 0,
				number: 0
			}
		}
	},
	validations: {
		form: {
			firstname: {
				required
			},
			credential: {
				username: { required },
				email: {
					required,
					email
				},
				password: { required, minLength: minLength(constant.password_length) }
			}
		}
	},
	mounted() {
		axios.all([this.getAll()])
	},
	created() {
		let self = this
		this.$lang.then(result => {
			self.lang = result
			document.title = self.lang.lblmenu_user
		})
	},
	computed: {
		// eslint-disable-next-line vue/return-in-computed-property
		submitDisabled: function() {
			let disabled = false
			if (this.formType === constant.form_add) {
				return this.$v.$invalid
			} else if (this.formType === constant.form_view) {
				if (
					!this.$v.form.firstname.required ||
					!this.$v.form.credential.username.required ||
					!this.$v.form.credential.email.email ||
					!this.$v.form.credential.email.required
				)
					disabled = true

				return disabled
			}
		}
	},
	methods: {
		createClick: function() {
			this.formType = constant.form_add
			this.showForm = true
			this.formReset()
		},
		editClick: function(item) {
			this.formType = constant.form_edit
			this.showForm = true
			this.setForm(item)
			this.form.cbStatus = item.credential.status === false ? 0 : 1
		},
		viewClick: function(item) {
			this.formType = constant.form_view
			this.showForm = true
			this.setForm(item)
			this.form.cbStatus = item.credential.status === false ? 0 : 1
		},
		deleteClick({ id }) {
			let _this = this
			let url = `/user/${this.form.credential.id}`
			let param = {
				id: id
			}
			const callback = function() {
				_this.getAll()
			}

			this.$confirmDelete(url, param, callback)
		},
		onSubmit: function() {
			this.form.credential.status = this.form.cbStatus === 0 ? false : true

			if (this.formType === 0) {
				axios({
					method: "post",
					url: "/user",
					data: this.form
				})
					.then(({ data }) => {
						let status = data.status ? 1 : 0
						this.$alertMessage(data.message, status, this.formCloseCallback(status))
					})
					.catch(({ response }) => {
						this.$alertMessage(response.data.message, 0, this.formCloseCallback(0))
					})
			} else {
				axios({
					method: "put",
					url: `/user/${this.form.credential.id}`,
					data: this.form
				})
					.then(({ data }) => {
						let status = data.status ? 1 : 0
						this.$alertMessage(data.message, status, this.formCloseCallback(status))
					})
					.catch(() => {
						this.$alertMessage(this.lang.ERROR0000, 0, this.formCloseCallback(0))
					})
			}
		},
		getAll: function(page) {
			let param = {
				index: page
			}
			if (page === null || page === undefined) param = {}

			axios
				.get("/user", {
					params: param
				})
				.then(({ data }) => {
					this.list = data.list.items
					this.paging.page = data.list.pages
				})
		},
		formCloseCallback: function(type) {
			if (type !== constant.form_add) {
				this.formCancel()
				this.formReset()
			}

			this.getAll()
		},
		formCancel: function() {
			this.showForm = false
		},
		formReset: function() {
			this.form.credential.username = ""
			this.form.credential.password = ""
			this.form.credential.status = false
			this.form.credential.email = ""
			this.form.firstname = ""
			this.form.lastname = ""
			this.form.phone = ""
			this.form.cbStatus = "0"
		},
		searchMenu: function() {
			axios
				.get("/role", {
					params: {
						title: this.searchTerm
					}
				})
				.then(({ data }) => {
					this.list = data.list.items
				})
		},
		setForm: function(item) {
			const { user, username, email, id, status } = item

			this.form.credential.username = username
			this.form.credential.email = email
			this.form.credential.id = id
			this.form.id = user.id
			this.form.firstname = user.first_name
			this.form.lastname = user.last_name
			this.form.phone = user.phone
			this.form.cbStatus = status ? "1" : "0"
		},
		pagingClick: function(pageNumber) {
			this.getAll(pageNumber)
		}
	}
}
</script>
