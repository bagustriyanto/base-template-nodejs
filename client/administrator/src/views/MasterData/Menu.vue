<template>
	<div id="masterMenu">
		<div class="section-header">
			<h1>{{ lang.lblmenu_menu }}</h1>
			<div class="section-header-breadcrumb">
				<div class="breadcrumb-item active">
					<a href="#">{{ lang.lblmenu_master }}</a>
				</div>
				<div class="breadcrumb-item">{{ lang.lblmenu_menu }}</div>
			</div>
		</div>
		<div class="row mt-4" v-if="showForm">
			<form id="menuForm" autocomplete="off" style="width: 100%;" v-on:submit.prevent="onSubmit">
				<div class="col-12">
					<div class="card">
						<div class="card-header">
							<h4>
								{{
									formType === 0
										? `${lang.action_add} ${lang.lblmenu_menu}`
										: formType === 1
										? `${lang.action_update} ${lang.lblmenu_menu}`
										: `${lang.action_view} ${lang.lblmenu_menu}`
								}}
							</h4>
						</div>
						<div class="card-body">
							<div class="form-group row mb-4">
								<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_title }}</label>
								<div class="col-sm-12 col-md-4">
									<input type="text" v-model="form.title" class="form-control" :class="{ 'is-invalid': titleValidation }" />
									<div class="invalid-feedback" v-if="titleValidation">
										{{ lang.form_required }}
									</div>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_url }}</label>
								<div class="col-sm-12 col-md-4">
									<input type="text" v-model="form.url" class="form-control" :class="{ 'is-invalid': urlValidation }" />
									<div class="invalid-feedback" v-if="urlValidation">
										{{ lang.form_required }}
									</div>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_parent }}</label>
								<div class="col-sm-12 col-md-4">
									<select class="form-control selectric" v-model="form.parent">
										<option v-for="(item, index) in cbMenuList" :key="index" :value="item.id"> {{ item.title }}</option>
									</select>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_status }}</label>
								<div class="col-sm-12 col-md-2">
									<select class="form-control selectric" v-model="form.cbStatus">
										<option :value="0">{{ lang.status_inactive }}</option>
										<option :value="1">{{ lang.status_active }}</option>
									</select>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_icon }}</label>
								<div class="col-sm-12 col-md-2">
									<input type="text" v-model="form.icon" class="form-control" />
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
				</div>
			</form>
		</div>
		<div class="row mt-4">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="float-left">
							<select class="form-control selectric" v-on:change="selectAction($event)">
								<option>{{ lang.action_select_action }}</option>
								<option value="3">{{ lang.action_delete_all }}</option>
							</select>
						</div>
						<div class="float-left">
							<button class="btn btn-lg btn-success btn-create" style="margin-left: 10px;" v-on:click.prevent="createClick">
								<i class="far fa-edit"></i>
								{{ `${lang.action_add} ${lang.lblmenu_menu}` }}
							</button>
						</div>
						<div class="float-right">
							<form>
								<div class="input-group">
									<input type="text" class="form-control" :placeholder="lang.placeholder_title" v-model="searchTerm" />
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
													class="custom-control-input"
													id="checkbox-all"
													v-on:change="checkboxAllChange"
													v-model="selectAll"
												/>
												<label for="checkbox-all" class="custom-control-label">&nbsp;</label>
											</div>
										</th>
										<th>{{ lang.label_title }}</th>
										<th>{{ lang.label_url }}</th>
										<th>{{ lang.label_parent }}</th>
										<th>{{ lang.label_icon }}</th>
										<th>{{ lang.label_status }}</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in menuList" :key="index">
										<td>
											<div class="custom-checkbox custom-control">
												<input
													type="checkbox"
													class="custom-control-input"
													v-bind:id="'checkbox-' + index"
													v-model="checkedList"
													v-bind:value="item.id"
													v-on:change="checkboxChange"
												/>
												<label v-bind:for="'checkbox-' + index" class="custom-control-label">&nbsp;</label>
											</div>
										</td>
										<td>
											{{ item.title }}
											<div class="table-links">
												<a href="#" v-on:click.prevent="viewClick(item)">{{ lang.action_view }}</a>
												<div class="bullet"></div>
												<a href="#" v-on:click.prevent="editClick(item)">{{ lang.action_update }}</a>
												<div class="bullet"></div>
												<a href="#" v-on:click.prevent="deleteClick(item)" class="text-danger">{{ lang.action_delete }}</a>
											</div>
										</td>
										<td>
											<a href="#">{{ item.url }}</a>
										</td>
										<td>
											{{ item.parentDetail !== undefined ? item.parentDetail.title : "" }}
										</td>
										<td>{{ item.icon }}</td>
										<td>
											<div
												class="badge"
												:class="{
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
</template>
<script>
import Paginate from "vuejs-paginate"
import axios from "axios"
import constant from "../../assets/js/constants.js"

export default {
	name: "MasterMenu",
	components: {
		paginate: Paginate
	},
	data: function() {
		return {
			lang: {},
			formType: 0,
			form: {
				title: null,
				url: null,
				status: false,
				parent: null,
				id: 0,
				icon: null,
				cbStatus: "0"
			},
			menuList: [],
			validate: {
				title: false,
				url: false
			},
			cbMenuList: [],
			showForm: false,
			btnShowModal: null,
			formTitle: null,
			searchTerm: null,
			paging: {
				page: 0,
				number: 1
			},
			selectAll: false,
			checkedList: []
		}
	},
	mounted() {
		axios.all([this.getAll(), this.getCbMenu()])
	},
	created() {
		let self = this
		this.$lang.then(result => {
			self.lang = result
			document.title = self.lang.lblmenu_menu
		})
	},
	computed: {
		titleValidation: function() {
			if (this.form.title === null || this.form.title === "") return true

			return false
		},
		urlValidation: function() {
			if (this.form.url === null || this.form.url === "") return true

			return false
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
			this.form.cbStatus = item.status === false ? "0" : "1"
		},
		viewClick: function(item) {
			this.formType = constant.form_view
			this.showForm = true
			this.setForm(item)
			this.form.cbStatus = item.status === false ? "0" : "1"
		},
		deleteClick: function({ id }) {
			let self = this
			let url = `/menu/${id}`
			const callback = function() {
				self.getAll()
			}
			this.$confirmDelete(url, null, callback)
		},
		deleteAllAction: function() {
			let self = this
			let url = "/menu/delete-list"
			let param = {
				id: self.checkedList
			}
			const callback = function() {
				self.getAll()
			}

			self.$confirmDelete(url, param, callback, true)
		},
		onSubmit: function() {
			this.form.status = this.form.cbStatus === "0" ? false : true
			this.form.parent = this.form.parent === "" ? null : this.form.parent

			if (this.formType === 0) {
				axios
					.post("/menu", this.form)
					.then(response => {
						let status = response.data.status ? 1 : 0
						this.$alertMessage(response.data.message, status, this.formCloseCallback(status))
						if (response.data.status) this.getAll()
					})
					.catch(({ response }) => {
						this.$alertMessage(response.data.message, 0, this.formCloseCallback(0))
					})
			} else {
				axios
					.put(`/menu/${this.form.id}`, this.form)
					.then(({ data }) => {
						this.$alertMessage(data.message, 1, this.formCloseCallback(1))
						this.getAll()
					})
					.catch(({ response }) => {
						this.$alertMessage(response.data.message, 0, this.formCloseCallback(0))
					})
			}
		},
		getAll: function(page = null) {
			let param = {
				index: page === null ? this.paging.number : page,
				title: ""
			}

			axios
				.get("/menu", {
					params: param
				})
				.then(({ data }) => {
					this.menuList = data.list.items
					this.paging.page = data.list.pages
				})
		},
		getCbMenu: function() {
			axios
				.get("/menu", {
					params: {
						limit: 50
					}
				})
				.then(({ data }) => {
					this.cbMenuList = data.list.items
				})
		},
		formCloseCallback: function(type) {
			if (type !== 0) {
				this.formCancel()
				this.formReset()
			}
		},
		formCancel: function() {
			this.showForm = false
		},
		formReset: function() {
			this.form.title = ""
			this.form.url = ""
			this.form.parent = ""
			this.form.cbStatus = "0"
			this.form.icon = ""
		},
		searchMenu: function() {
			axios
				.get("/menu", {
					params: {
						title: this.searchTerm
					}
				})
				.then(({ data }) => {
					this.menuList = data.list.items
				})
		},
		setForm: function({ id, title, url, parent, status, icon }) {
			this.form.id = id
			this.form.title = title
			this.form.url = url
			this.form.parent = parent
			this.form.icon = icon
			this.form.cbStatus = status ? "1" : "0"
		},
		pagingClick: function(pageNumber) {
			this.getAll(pageNumber)
		},
		checkboxAllChange: function() {
			let self = this
			self.menuList.forEach(function(value) {
				if (self.selectAll) self.checkedList.push(value.id)
			})
			if (!self.selectAll) self.checkedList = []
		},
		checkboxChange: function() {
			let self = this
			if (self.menuList.length === self.checkedList.length) self.selectAll = true
			else self.selectAll = false
		},
		selectAction: function(event) {
			let self = this

			if (parseInt(event.target.value) === constant.form_delete) self.deleteAllAction()
		}
	}
}
</script>
