<template>
	<div id="masterRole">
		<div class="section-header">
			<h1>{{ lang.lblmenu_role }}</h1>
			<div class="section-header-breadcrumb">
				<div class="breadcrumb-item active">
					<a href="#">{{ lang.lblmenu_master }}</a>
				</div>
				<div class="breadcrumb-item">{{ lang.lblmenu_role }}</div>
			</div>
		</div>
		<div id="masterRole">
			<button hidden id="btnModalAdd" type="button"></button>
			<button hidden id="btnModalEdit" type="button"></button>
			<button hidden id="btnModalView" type="button"></button>
			<div class="row mt-4" v-if="showForm">
				<form id="menuForm" autocomplete="off" style="width: 100%;" v-on:submit.prevent="onSubmit">
					<div class="col-12">
						<div class="card">
							<div class="card-header">
								<h4>
									{{
										formType === 0
											? `${lang.action_add} ${lang.lblmenu_role}`
											: formType === 1
											? `${lang.action_update} ${lang.lblmenu_role}`
											: `${lang.action_view} ${lang.lblmenu_role}`
									}}
								</h4>
							</div>
							<div class="card-body">
								<div class="form-group row mb-4">
									<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_name }}</label>
									<div class="col-sm-12 col-md-4">
										<input type="text" v-model="form.name" class="form-control" v-bind:class="{ 'is-invalid': nameValidation }" />
										<div class="invalid-feedback" v-if="nameValidation">
											{{ lang.form_required }}
										</div>
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
								<select class="form-control selectric">
									<option>{{ lang.action_select_action }}</option>
									<option>{{ lang.action_delete_all }}</option>
								</select>
							</div>
							<div class="float-left">
								<button class="btn btn-lg btn-success btn-create" style="margin-left: 10px;" v-on:click="createClick">
									<i class="far fa-edit"></i>
									{{ `${lang.action_add} ${lang.lblmenu_role}` }}
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
											<th>{{ lang.label_name }}</th>
											<th>{{ lang.label_status }}</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) in list" :key="index">
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
												{{ item.name }}
												<div class="table-links">
													<a href="#" v-on:click="viewClick(item)">{{ lang.action_view }}</a>
													<div class="bullet"></div>
													<a href="#" v-on:click="editClick(item)">{{ lang.action_update }}</a>
													<div class="bullet"></div>
													<a href="#" v-on:click="deleteClick(item)" class="text-danger">{{ lang.action_delete }}</a>
												</div>
											</td>
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
	</div>
</template>
<script>
import Paginate from "vuejs-paginate"
import constant from "../../assets/js/constants.js"
import axios from "axios"
import Vue from "vue"

export default {
	components: {
		paginate: Paginate
	},
	data: function() {
		return {
			lang: {},
			formType: 0,
			form: {
				name: null,
				status: false,
				id: 0,
				cbStatus: "0"
			},
			list: {},
			cbMenuList: {},
			showForm: false,
			btnShowModal: null,
			formTitle: null,
			searchTerm: null,
			paging: {
				page: 0,
				number: 0
			},
			selectAll: false,
			checkedList: []
		}
	},
	mounted() {
		axios.all([this.getAll()])
	},
	created() {
		let self = this
		this.$lang.then(result => {
			self.lang = result
			document.title = self.lang.lblmenu_role
		})
	},
	computed: {
		nameValidation: function() {
			if (this.form.title === null || this.form.title === "") return true

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
		onSubmit: function() {
			this.form.status = this.form.cbStatus === "0" ? false : true

			if (this.formType === 0) {
				axios
					.post("/role", this.form)
					.then(({ data }) => {
						let status = data.status ? 1 : 0
						Vue.$alertMessage(data.message, status, this.formCloseCallback(status))
						this.getAll()
					})
					.catch(() => {
						Vue.$alertMessage(this.lang.ERROR0000, 0, this.formCloseCallback(0))
					})
			} else {
				axios
					.put(`/role/${this.form.id}`, this.form)
					.then(({ data }) => {
						let status = data.status ? 1 : 0
						Vue.$alertMessage(data.message, status, this.formCloseCallback(status))
						this.getAll()
					})
					.catch(() => {
						Vue.$alertMessage(this.lang.ERROR0000, 0, this.formCloseCallback(0))
					})
			}
		},
		getAll: function(page) {
			let param = {
				index: page
			}
			if (page === null || page === undefined) param = {}

			axios
				.get("/role", {
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
		},
		formCancel: function() {
			this.showForm = false
		},
		formReset: function() {
			this.form.title = ""
			this.form.url = ""
			this.form.parent = ""
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
		setForm: function({ id, name, status }) {
			this.form.id = id
			this.form.name = name
			this.form.cbStatus = status ? "1" : "0"
		},
		pagingClick: function(pageNumber) {
			this.getAll(pageNumber)
		},
		checkboxAllChange: function() {
			let self = this
			self.list.forEach(function(value) {
				if (self.selectAll) self.checkedList.push(value.id)
			})
			if (!self.selectAll) self.checkedList = []
		},
		checkboxChange: function() {
			let self = this
			if (self.list.length === self.checkedList.length) self.selectAll = true
			else self.selectAll = false
		},
		selectAction: function(event) {
			let self = this

			if (parseInt(event.target.value) === constant.form_delete) self.deleteAllAction()
		}
	}
}
</script>
