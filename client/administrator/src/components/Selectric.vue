<template>
	<div>
		<select class="form-control selectric" v-bind:value="value" :id="id">
			<option value="">{{ "=== Select data ===" }}</option>
			<option v-for="(item, index) in list" :key="index" :value="item.id">{{ item.value }}</option>
		</select>
	</div>
</template>
<script>
export default {
	name: "Selectric",
	inheritAttrs: false,
	props: ["list", "value", "id"],
	created() {
		let vm = this
		vm.$nextTick(() => {
			window.$(`#${vm.id}`).selectric()
			window.$(`#${vm.id}`).on("change", function(event) {
				vm.$emit("input", event.currentTarget.value)
			})
		})
	}
}
</script>
