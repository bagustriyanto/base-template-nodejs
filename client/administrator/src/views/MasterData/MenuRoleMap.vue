<template>
	<div id="masterMenuRoleMap">
		<div class="section-header">
			<h1>{{ lang.lblmenu_menurolemap }}</h1>
			<div class="section-header-breadcrumb">
				<div class="breadcrumb-item active">
					<a href="#">{{ lang.lblmenu_master }}</a>
				</div>
				<div class="breadcrumb-item">{{ lang.lblmenu_menurolemap }}</div>
			</div>
		</div>
		<div>
			<div class="row mt-4" v-show="showForm">
				<form id="menuForm" autocomplete="off" style="width: 100%;" v-on:submit.prevent="submit">
					<div class="col-12">
						<div class="card">
							<div class="card-header">
								<h4>
									{{
										formType === 0
											? `${lang.action_add} ${lang.lblmenu_menurolemap}`
											: formType === 1
											? `${lang.action_update} ${lang.lblmenu_menurolemap}`
											: `${lang.action_view} ${lang.lblmenu_menurolemap}`
									}}
								</h4>
							</div>
							<div class="card-body">
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_role }}</label>
									<div class="col-sm-12 col-md-2">
										<select class="form-control selectric" v-model="form.roleId">
											<option v-for="(item, index) in roleList" :key="index" v-bind:value="item.id"> {{ item.name }}</option>
										</select>
										<div class="invalid-feedback">
											{{ lang.form_required }}
										</div>
									</div>
								</div>
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_menu }}</label>
									<div class="form-group col-sm-12 col-md-2">
										<div class="form-check" v-for="(item, index) in menuList" :key="index">
											<input class="form-check-input" type="checkbox" v-bind:id="'checkbox-' + item.id" v-model="item.checked" />
											<label class="form-check-label" v-bind:for="'checkbox-' + item.id">
												{{ item.title }}
											</label>
										</div>
									</div>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
								<div class="col-sm-12 col-md-7" style="text-align: right;">
									<button class="btn btn-danger" v-on:click="formCancel">
										{{ lang.action_cancel }}
									</button>
									<button class="btn btn-primary" v-if="formType === 0 || formType === 1">
										{{ lang.action_save }}
									</button>
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
											<th>{{ lang.label_role }}</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) in menuRoleList" :key="index">
											<td>
												<div class="custom-checkbox custom-control">
													<input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="checkbox-2" />
													<label for="checkbox-2" class="custom-control-label">&nbsp;</label>
												</div>
											</td>
											<td>
												{{ item.name }}
												<div class="table-links">
													<a href="#" v-on:click.prevent="viewClick(item)">{{ lang.action_view }}</a>
													<div class="bullet"></div>
													<a href="#" v-on:click.prevent="editClick(item)">{{ lang.action_update }}</a>
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
import axios from "axios"
import Paginate from "vuejs-paginate"
import constant from "../../assets/js/constants.js"

export default {
	name: "MenuRoleMap",
	components: {
		paginate: Paginate
	},
	data: function() {
		return {
			form: {
				menuMapList: []
			},
			lang: {},
			showForm: false,
			formType: constant.form_add,
			menuRoleList: {},
			roleList: {},
			menuList: {},
			searchTerm: null,
			paging: {
				page: 0,
				number: 1
			}
		}
	},
	created() {
		let self = this
		this.$lang.then(result => {
			self.lang = result
			document.title = self.lang.lblmenu_menurolemap
		})
	},
	mounted() {
		axios.all([this.getRole(), this.getMenu(), this.getAll()])
	},
	methods: {
		getRole() {
			axios
				.get("/role", {
					params: {
						limit: 10
					}
				})
				.then(({ data }) => {
					var list = data.list.items.filter(function(value) {
						return value.status === true
					})
					this.roleList = list
				})
		},
		getAll(page = null) {
			let param = {
				index: page === null ? this.paging.number : page,
				term: this.searchTerm
			}

			axios
				.get("/role", {
					params: param
				})
				.then(({ data }) => {
					var list = data.list.items.filter(function(value) {
						return value.status === true
					})
					this.menuRoleList = list
					this.paging.page = data.list.pages
				})
		},
		getMenu() {
			axios
				.get("/menu", {
					params: {
						limit: 50
					}
				})
				.then(({ data }) => {
					this.menuList = data.list.items.filter(function(value) {
						return value.status === true
					})
				})
		},
		formCancel() {
			this.showForm = false
		},
		setForm(item) {
			const self = this
			const { id } = item

			self.form.roleId = id

			axios.get(`/menu-role/${id}`, { params: { index: self.paging.number } }).then(({ data }) => {
				self.menuList = self.menuList.map(function(menu) {
					let menuMap = data.list.items.filter(function(value) {
						return value.menu_id === menu.id
					})

					return {
						menu_id: menu.id,
						title: menu.title,
						checked: menuMap.length > 0 ? true : false,
						id: menuMap.length > 0 ? menuMap[0].id : 0
					}
				})
				self.showForm = true
			})
		},
		createClick() {
			this.formType = constant.form_add
			this.showForm = true
			this.formReset()
		},
		editClick(item) {
			this.formType = constant.form_edit
			this.setForm(item)
		},
		viewClick(item) {
			this.formType = constant.form_view
			this.setForm(item)
		},
		deleteClick({ id }) {
			let _this = this
			let url = "/menu-role"
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
				.get("/menu-role", {
					params: {
						term: this.searchTerm
					}
				})
				.then(({ data }) => {
					this.userRoleList = data.listData.items
				})
		},
		submit() {
			if (this.formType === constant.form_add || this.formType === constant.form_edit) {
				var self = this
				self.form.menuMapList = []
				Promise.all(
					window.$.each(self.menuList, function(index, { checked, id, menu_id }) {
						return self.form.menuMapList.push({
							checked: checked,
							menuRoleMap: { menuId: menu_id, roleId: self.form.roleId, id: id }
						})
					})
				).then(result => {
					return result
				})

				axios({
					method: "post",
					url: "/menu-role",
					data: self.form.menuMapList
				})
					.then(({ data }) => {
						let status = data.status ? 1 : 0
						this.$alertMessage(data.message, status, this.formCloseCallback(status))
					})
					.catch(({ response }) => {
						this.$alertMessage(response.data.message, 0, this.formCloseCallback(0))
					})
			}
		},
		formReset() {
			this.form.credentialId = null
			this.form.roleId = null
		},
		formCloseCallback: function(type) {
			if (type !== constant.form_add) {
				this.formCancel()
				this.formReset()
				axios.all([this.getRole(), this.getMenu()])
			}
		},
		pagingClick: function(pageNumber) {
			this.getAll(pageNumber)
		}
	}
}
</script>
