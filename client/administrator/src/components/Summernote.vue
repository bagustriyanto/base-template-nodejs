<template>
	<div>
		<textarea :id="id" :value="value"></textarea>
	</div>
</template>
<script>
import axios from "axios"
import constant from "../assets/js/constants.js"

export default {
	name: "Summernote",
	props: ["id", "value"],
	created() {
		let vm = this
		vm.$nextTick(() => {
			window.$(`#${vm.id}`).summernote({
				height: 300, // set editor height
				minHeight: null, // set minimum height of editor
				maxHeight: null, // set maximum height of editor
				dialogsInBody: true,
				callbacks: {
					onChange: function(contents) {
						console.log(contents)
						vm.$emit("input", contents)
					},
					onImageUpload: function(file) {
						vm.uploadImage(file[0], constant.fileType.image)
					},
					onMediaDelete: function(target) {
						console.log(target)
						// alert(target[0].src)
						// deleteFile(target[0].src)
					}
				}
			})
		})
	},
	methods: {
		uploadImage: function(file, fileType) {
			let vm = this
			let formData = new FormData()
			formData.append("file", file)
			formData.append("type", fileType)

			axios.post("/shared/uploadFile", formData).then(({ data }) => {
				window.$(`#${vm.id}`).summernote("insertImage", `${constant.apiEndPoint}${data.data}`)
			})
		}
	},
	removeImage: function(sourceFile) {
		console.log(sourceFile)
	}
}
</script>
