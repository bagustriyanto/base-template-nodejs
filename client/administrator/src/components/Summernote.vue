<template>
	<div>
		<textarea :id="id" :value="value"></textarea>
	</div>
</template>
<script>
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
						vm.$emit("input", contents)
					},
					onImageUpload: function(file) {
						console.log(file)
						// editor.insertImage(welEditable, url);
					},
					onMediaDelete: function(target) {
						console.log(target)
						// alert(target[0].src)
						// deleteFile(target[0].src)
					}
				}
			})
		})
	}
}
</script>
