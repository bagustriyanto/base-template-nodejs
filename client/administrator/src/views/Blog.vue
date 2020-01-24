<template>
	<div>
		<section class="section">
			<div class="section-header">
				<h1>{{ lang.lblmenu_blog }}</h1>
				<div class="section-header-breadcrumb">
					<div class="breadcrumb-item active">
						<a href="#">{{ lang.lblmenu_blog }}</a>
					</div>
				</div>
			</div>

			<transition name="fade">
				<div class="section-body" v-if="showForm">
					<form class="row" autocomplete="off" style="width: 100%;" v-on:submit.prevent="submit">
						<div class="col-12">
							<div class="card">
								<div class="card-header">
									<h4>
										{{
											formType === 0
												? `${lang.action_add} ${lang.lblmenu_blog}`
												: formType === 1
												? `${lang.action_update} ${lang.lblmenu_blog}`
												: `${lang.action_view} ${lang.lblmenu_blog}`
										}}
									</h4>
								</div>
								<div class="card-body">
									<div class="form-group row mb-4">
										<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_title }}</label>
										<div class="col-sm-12 col-md-7">
											<input type="text" class="form-control" v-model="form.title" />
										</div>
									</div>
									<div class="form-group row mb-4">
										<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_content }}</label>
										<div class="col-sm-12 col-md-7">
											<summernote id="editor-1" v-model="form.content"></summernote>
										</div>
									</div>
									<div class="form-group row mb-4">
										<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_tags }}</label>
										<div class="col-sm-12 col-md-7">
											<tags id="tags-1" v-model="form.tags"></tags>
										</div>
									</div>
									<div class="form-group row mb-4">
										<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">{{ lang.label_status }}</label>
										<div class="col-sm-12 col-md-7">
											<selectric id="select-1" :list="status" v-model="form.status"></selectric>
										</div>
									</div>
									<div class="form-group row mb-4">
										<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3"></label>
										<div class="col-sm-12 col-md-7" style="text-align: right;">
											<button class="btn btn-danger" type="button" v-on:click.prevent="formCancel">
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
			</transition>

			<div class="section-body">
				<div class="row">
					<div class="col-12">
						<div class="card">
							<div class="card-body">
								<div class="float-left">
									<button class="btn btn-lg btn-success btn-create" style="margin-left: 10px;" v-on:click="createClick">
										<i class="far fa-edit"></i>
										{{ `${lang.action_add} ${lang.lblmenu_blog}` }}
									</button>
								</div>
								<div class="float-right">
									<form>
										<div class="input-group">
											<input type="text" class="form-control" :placeholder="lang.placeholder_search" />
											<div class="input-group-append">
												<button class="btn btn-primary"><i class="fas fa-search"></i></button>
											</div>
										</div>
									</form>
								</div>
								<div class="clearfix mb-3"></div>
								<div class="table-responsive">
									<table class="table table-striped">
										<thead>
											<tr>
												<!-- <th class="text-center pt-2">
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
												</th> -->
												<th>No.</th>
												<th>{{ lang.label_title }}</th>
												<th>{{ lang.label_author }}</th>
												<th>{{ lang.label_createdAt }}</th>
												<th>{{ lang.label_status }}</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(item, index) in blogList" :key="index">
												<!-- <td>
													<div class="custom-checkbox custom-control">
														<input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="checkbox-2" />
														<label for="checkbox-2" class="custom-control-label">&nbsp;</label>
													</div>
												</td> -->
												<td>{{ index + 1 }}</td>
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
													<a href="#">
														<img
															alt="image"
															src="assets/img/avatar/avatar-5.png"
															class="rounded-circle"
															width="35"
															data-toggle="title"
															title=""
														/>
														<div class="d-inline-block ml-1">{{ item.credential.username }}</div>
													</a>
												</td>
												<td>{{ item.created_at }}</td>
												<td>
													<div
														class="badge"
														:class="[item.status === '0' ? 'badge-danger' : item.status === '1' ? 'badge-primary' : 'badge-info']"
													>
														{{
															item.status === "0"
																? lang.status_inactive
																: item.status === "1"
																? lang.status_active
																: lang.status_draft
														}}
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
		</section>
	</div>
</template>
<script>
import Summernote from "../components/Summernote"
import Tagsinput from "../components/Tagsinput"
import Selectric from "../components/Selectric"
import Paginate from "vuejs-paginate"
import constant from "../assets/js/constants.js"
import { required } from "vuelidate/lib/validators"
import axios from "axios"

export default {
	name: "Blog",
	components: {
		summernote: Summernote,
		tags: Tagsinput,
		selectric: Selectric,
		paginate: Paginate
	},
	data() {
		return {
			form: {
				id: 0,
				title: null,
				content: null,
				tags: null,
				status: null
			},
			showForm: false,
			formType: constant.form_add,
			lang: {},
			status: [],
			blogList: {},
			paging: {
				page: 0,
				number: 1
			},
			loader: {
				height: 50,
				width: 50
			}
		}
	},
	validations: {
		form: {
			title: { required },
			content: { required },
			tags: { required }
		}
	},
	created() {
		let vm = this
		vm.$nextTick(() => {
			window.$(".inputtags").tagsinput("items")
		})
		vm.$lang.then(result => {
			vm.lang = result
			document.title = vm.lang.lblmenu_blog
			vm.status.push({ id: 0, value: vm.lang.status_inactive }, { id: 1, value: vm.lang.status_active }, { id: 2, value: vm.lang.status_draft })
		})
	},
	mounted() {
		let vm = this
		vm.getAll()
	},
	methods: {
		createClick: function() {
			let vm = this
			vm.showForm = true
			vm.formType = constant.form_add
		},
		viewClick: function(data) {
			let vm = this
			vm.showForm = true
			vm.formType = constant.form_view
			vm.setForm(data)
		},
		editClick: function() {
			let vm = this
			vm.showForm = true
			vm.formType = constant.form_edit
		},
		deleteClick: function() {
			let vm = this
			vm.showForm = true
			vm.formType = constant.form_delete
		},
		formCancel() {
			let vm = this
			vm.showForm = false
		},
		formReset() {
			let vm = this
			vm.form.status = 0
			vm.form.title = null
			vm.form.content = null
			vm.form.tags = null
			vm.form.id = 0
		},
		submit() {
			let vm = this
			vm.form.credential_id = vm.$cookies.get("credential_id")
			window.$("#loading").show()
			if (vm.formType === constant.form_add) {
				axios
					.post("/blog", vm.form)
					.then(({ data }) => {
						window.$("#loading").hide()
						vm.$alertMessage(data.message, Number(data.status), vm.formCloseCallback(data.status))
						if (data.status) vm.getAll()
					})
					.catch(({ response }) => {
						window.$("#loading").hide()
						vm.$alertMessage(response.data.message, 0, vm.formCloseCallback(0))
					})
			} else {
				axios
					.puth(`/blog/${vm.form.id}`, vm.form)
					.then(({ data }) => {
						window.$("#loading").hide()
						vm.$alertMessage(data.message, Number(data.status), vm.formCloseCallback(data.status))
						if (data.status) vm.getAll()
					})
					.catch(({ response }) => {
						window.$("#loading").hide()
						vm.$alertMessage(response.data.message, 0, vm.formCloseCallback(0))
					})
			}
		},
		getAll: function(page = null) {
			let vm = this
			let param = {
				index: page === null ? this.paging.number : page,
				searchTerm: ""
			}

			axios
				.get("/blog", {
					params: param
				})
				.then(({ data }) => {
					if (data.list !== undefined) {
						vm.blogList = data.list.items
						vm.paging.page = data.list.pages
					}
				})
		},
		formCloseCallback: function(status) {
			if (status) {
				this.formCancel()
				this.formReset()
			}
		},
		pagingClick: function(pageNumber) {
			this.getAll(pageNumber)
		},
		setForm: function({ title, content, status, tags, id }) {
			let vm = this
			vm.form.id = id
			vm.form.title = title
			vm.form.status = status
			vm.form.tags = tags
			vm.form.content = content
		}
	}
}
</script>
