<template>
	<div>
		<div class="section-header">
			<h1>{{ lang.lblmenu_userrolemap }}</h1>
			<div class="section-header-breadcrumb">
				<div class="breadcrumb-item active">
					<a href="#">{{ lang.lblmenu_master }}</a>
				</div>
				<div class="breadcrumb-item">{{ lang.lblmenu_userrolemap }}</div>
			</div>
		</div>
		<div>
			<div class="row mt-4" v-if="showForm">
				<form id="menuForm" autocomplete="off" style="width: 100%;" v-on:submit.prevent="submit">
					<div class="col-12">
						<div class="card">
							<div class="card-header">
								<h4>
									{{
										formType === 0
											? `${lang.action_add} ${lang.lblmenu_userrolemap}`
											: formType === 1
											? `${lang.action_update} ${lang.lblmenu_userrolemap}`
											: `${lang.action_view} ${lang.lblmenu_userrolemap}`
									}}
								</h4>
							</div>
							<div class="card-body">
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_username }}</label>
									<div class="col-md-3">
										<selectric :list="userList" v-model="form.credential_id"></selectric>
										<div class="invalid-feedback" v-if="!$v.form.credential_id.required">
											{{ lang.form_required }}
										</div>
									</div>
								</div>
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_role }}</label>
									<div class="col-md-3">
										<selectric :list="roleList" v-model="form.role_id"></selectric>
										<div class="invalid-feedback" v-if="!$v.form.role_id.required">
											{{ lang.form_required }}
										</div>
									</div>
								</div>
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
									<div class="col-sm-12 col-md-7" style="text-align: right;">
										<button class="btn btn-danger" v-on:click="formCancel">
											{{ lang.action_cancel }}
										</button>
										<button class="btn btn-primary" v-bind:disabled="$v.$invalid" v-if="formType === 0 || formType === 1">
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
								<select class="form-control js-selectric">
									<option>{{ lang.action_select_action }}</option>
									<option>{{ lang.action_delete_all }}</option>
								</select>
							</div>
							<div class="float-left">
								<button class="btn btn-lg btn-success btn-create" style="margin-left: 10px;" v-on:click="createClick">
									<i class="far fa-edit"></i>
									{{ `${lang.action_add} ${lang.lblmenu_userrolemap}` }}
								</button>
							</div>
							<div class="float-right">
								<form>
									<div class="input-group">
										<input type="text" class="form-control" v-bind:placeholder="lang.placeholder_search" v-model="searchTerm" />
										<div class="input-group-append">
											<button class="btn btn-primary" v-on:click.prevent="searchMenu">
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
											<th>{{ lang.label_role }}</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) in userRoleList" :key="index">
											<td>
												<div class="custom-checkbox custom-control">
													<input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" :id="'checkbox-' + index" />
													<label :for="'checkbox-' + index" class="custom-control-label">&nbsp;</label>
												</div>
											</td>
											<td>
												{{ item.credential.username }}
												<div class="table-links">
													<a href="#" v-on:click.prevent="viewClick(item)">{{ lang.action_view }}</a>
													<div class="bullet"></div>
													<a href="#" v-on:click.prevent="editClick(item)">{{ lang.action_update }}</a>
													<div class="bullet"></div>
													<a href="#" v-on:click.prevent="deleteClick(item)" class="text-danger">{{ lang.action_delete }}</a>
												</div>
											</td>
											<td>{{ item.role.name }}</td>
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
import axios from "axios"
import { required } from "vuelidate/lib/validators"
import constant from "../../assets/js/constants.js"
import Selectric from "../../components/Selectric"

export default {
	name: "UserRoleMap",
	components: {
		paginate: Paginate,
		selectric: Selectric
	},
	data: function() {
		return {
			lang: {},
			form: {
				id: 0,
				role_id: null,
				credential_id: null
			},
			formType: constant.form_add,
			userList: {},
			roleList: {},
			userRoleList: {},
			showForm: false,
			searchTerm: null,
			paging: {
				page: 0,
				number: 0
			}
		}
	},
	mounted() {
		axios.all([this.getUser(), this.getRole(), this.getUserRole()])
	},
	created() {
		let self = this
		this.$lang.then(result => {
			self.lang = result
			document.title = `${this.lang.lblmenu_userrolemap}`
		})
	},
	validations: {
		form: {
			role_id: { required },
			credential_id: { required }
		}
	},
	methods: {
		getUser() {
			axios
				.get("/user", {
					params: {
						limit: 50
					}
				})
				.then(({ data }) => {
					this.userList = data.list.items
					this.userList.map(item => {
						item.value = item.username
					})
				})
		},
		getRole() {
			axios
				.get("/role", {
					params: {
						limit: 50
					}
				})
				.then(({ data }) => {
					this.roleList = data.list.items
					this.roleList.map(item => {
						item.value = item.name
					})
				})
		},
		getUserRole(page) {
			let param = {
				index: page
			}
			if (page === null || page === undefined) param = {}

			axios
				.get("/user-role", {
					params: param
				})
				.then(({ data }) => {
					this.userRoleList = data.list.items
					this.paging.page = data.list.pages
				})
		},
		formCancel() {
			this.showForm = false
		},
		setForm(item) {
			const { credential_id, role_id, id } = item

			this.form.id = id
			this.form.credential_id = credential_id
			this.form.role_id = role_id
		},
		createClick() {
			this.formType = constant.form_add
			this.formReset()
			this.showForm = true
		},
		editClick(item) {
			this.formType = constant.form_edit
			this.setForm(item)
			this.showForm = true
		},
		viewClick(item) {
			this.formType = constant.form_view
			this.setForm(item)
			this.showForm = true
		},
		deleteClick({ id }) {
			let _this = this
			let url = "/user-role"
			let param = {
				id: id
			}
			const callback = function() {
				_this.getUserRole()
			}

			this.$confirmDelete(url, param, callback)
		},
		searchMenu() {
			axios
				.get("/user-role", {
					params: {
						term: this.searchTerm
					}
				})
				.then(({ data }) => {
					this.userRoleList = data.list.items
				})
		},
		submit() {
			if (this.formType === constant.form_add) {
				axios({
					method: "post",
					url: "/user-role",
					data: this.form
				})
					.then(({ data }) => {
						let status = data.status ? 1 : 0
						this.$alertMessage(data.message, status, this.formCloseCallback(status))
						if (status) this.getUserRole()
					})
					.catch(() => {
						this.$alertMessage(this.lang.ERROR0000, 0, this.formCloseCallback(0))
					})
			} else {
				axios({
					method: "put",
					url: `/user-role/${this.form.id}`,
					data: this.form
				})
					.then(({ data }) => {
						let status = data.status ? 1 : 0
						this.$alertMessage(data.message, status, this.formCloseCallback(status))
						if (status) this.getUserRole()
					})
					.catch(() => {
						this.$alertMessage(this.lang.ERROR0000, 0, this.formCloseCallback(0))
					})
			}
		},
		formReset() {
			this.form.credential_id = null
			this.form.role_id = null
		},
		formCloseCallback: function(type) {
			if (type !== constant.form_add) {
				this.formCancel()
				this.formReset()
			}
		},
		pagingClick: function(pageNumber) {
			this.getUserRole(pageNumber)
		}
	}
}
</script>
