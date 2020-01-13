<template>
	<div>
		<section class="section">
			<div class="section-header">
				<h1>Blog</h1>
				<div class="section-header-breadcrumb">
					<div class="breadcrumb-item active"><a href="#">Blog</a></div>
				</div>
			</div>

			<transition name="fade">
				<div class="section-body" v-if="showForm">
					<div class="row">
						<div class="col-12">
							<div class="card">
								<div class="card-header">
									<h4>Add Blog | Edit Blog | Lihat Blog</h4>
								</div>
								<div class="card-body">
									<div class="form-group row mb-4">
										<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Title</label>
										<div class="col-sm-12 col-md-7">
											<input type="text" class="form-control" />
										</div>
									</div>
									<div class="form-group row mb-4">
										<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Content</label>
										<div class="col-sm-12 col-md-7">
											<summernote id="editor-1" v-model="form.contents"></summernote>
										</div>
									</div>
									<div class="form-group row mb-4">
										<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Tags</label>
										<div class="col-sm-12 col-md-7">
											<tags id="tags-1" v-model="form.tags"></tags>
										</div>
									</div>
									<div class="form-group row mb-4">
										<label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Status</label>
										<div class="col-sm-12 col-md-7">
											<selectric id="select-1" :list="status"></selectric>
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
					</div>
				</div>
			</transition>

			<div class="section-body">
				<div class="row">
					<div class="col-12">
						<div class="card">
							<div class="card-header">
								<h4>Blog List</h4>
							</div>
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
											<input type="text" class="form-control" placeholder="Search" />
											<div class="input-group-append">
												<button class="btn btn-primary"><i class="fas fa-search"></i></button>
											</div>
										</div>
									</form>
								</div>
								<div class="clearfix mb-3"></div>
								<div class="table-responsive">
									<table class="table table-striped">
										<tbody>
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
												<th>Title</th>
												<th>Category</th>
												<th>Author</th>
												<th>Created At</th>
												<th>Status</th>
											</tr>
											<tr>
												<td>
													<div class="custom-checkbox custom-control">
														<input type="checkbox" data-checkboxes="mygroup" class="custom-control-input" id="checkbox-2" />
														<label for="checkbox-2" class="custom-control-label">&nbsp;</label>
													</div>
												</td>
												<td>
													Laravel 5 Tutorial: Introduction
													<div class="table-links">
														<a href="#" v-on:click.prevent="viewClick(item)">{{ lang.action_view }}</a>
														<div class="bullet"></div>
														<a href="#" v-on:click.prevent="editClick(item)">{{ lang.action_update }}</a>
														<div class="bullet"></div>
														<a href="#" v-on:click.prevent="deleteClick(item)" class="text-danger">{{ lang.action_delete }}</a>
													</div>
												</td>
												<td>
													<a href="#">Web Developer</a>,
													<a href="#">Tutorial</a>
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
														<div class="d-inline-block ml-1">Rizal Fakhri</div>
													</a>
												</td>
												<td>2018-01-20</td>
												<td><div class="badge badge-primary">Published</div></td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="float-right">
									<nav>
										<ul class="pagination">
											<li class="page-item disabled">
												<a class="page-link" href="#" aria-label="Previous">
													<span aria-hidden="true">«</span>
													<span class="sr-only">Previous</span>
												</a>
											</li>
											<li class="page-item active">
												<a class="page-link" href="#">1</a>
											</li>
											<li class="page-item">
												<a class="page-link" href="#">2</a>
											</li>
											<li class="page-item">
												<a class="page-link" href="#">3</a>
											</li>
											<li class="page-item">
												<a class="page-link" href="#" aria-label="Next">
													<span aria-hidden="true">»</span>
													<span class="sr-only">Next</span>
												</a>
											</li>
										</ul>
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
import constant from "../assets/js/constants.js"
import { required } from "vuelidate/lib/validators"

export default {
	name: "Blog",
	components: {
		summernote: Summernote,
		tags: Tagsinput,
		selectric: Selectric
	},
	data() {
		return {
			form: {
				title: null,
				contents: null,
				tags: null
			},
			showForm: false,
			formType: constant.form_add,
			lang: {},
			status: [
				{ id: 0, value: "Draft" },
				{ id: 1, value: "Publish" }
			]
		}
	},
	validations: {
		form: {
			title: { required },
			contents: { required },
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
		})
	},
	methods: {
		createClick: function() {
			let vm = this
			vm.showForm = true
		},
		viewClick: function() {
			let vm = this
			vm.showForm = true
			vm.formType = constant.form_view
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
		}
	}
}
</script>
