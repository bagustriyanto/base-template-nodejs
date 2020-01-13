<template>
	<div>
		<input type="text" class="form-control" :id="id" :value="value" />
	</div>
</template>
<script>
export default {
	name: "Tagsinput",
	props: ["id", "value"],
	created() {
		document.title = "Blog"
		let vm = this
		vm.$nextTick(() => {
			window.$(`#${vm.id}`).tagsinput("items")
			window.$(`#${vm.id}`).on("itemAdded", function(event) {
				vm.$emit("input", event.target.value)
			})
			window.$(`#${vm.id}`).on("itemRemoved", function(event) {
				vm.$emit("input", event.target.value)
			})
		})
	}
}
</script>
