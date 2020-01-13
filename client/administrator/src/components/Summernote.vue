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
				callbacks: {
					onChange: function(contents) {
						vm.$emit("input", contents)
					}
				}
			})
		})
	}
}
</script>
