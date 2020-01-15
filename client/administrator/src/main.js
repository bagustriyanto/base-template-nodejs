import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import axios from "axios"
import Vuelidate from "vuelidate"
import VueCookies from "vue-cookies"
import VueSwal from "vue-swal"
import constant from "./assets/js/constants"

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueCookies)
Vue.use(VueSwal)
Vue.use((Vue.prototype.$menu = {}))
Vue.use(
	(Vue.prototype.$lang = axios
		.get(`${constant.apiEndPoint}/shared/language`, {
			headers: {
				Cookies: `lang = ${Vue.$cookies.get("lang")};`
			}
		})
		.then(result => {
			return result.data
		})),
	(Vue.prototype.$alertMessage = function(message, type, callback) {
		let title = null
		let icon = null
		if (callback === null || callback === undefined) callback = () => {}

		switch (type) {
			case 0:
				title = Vue.prototype.$lang.label_error
				icon = "error"
				break
			case 1:
				title = Vue.prototype.$lang.label_success
				icon = "success"
				break
			case 2:
				title = Vue.prototype.$lang.label_info
				icon = "info"
				break
		}

		Vue.$swal({
			title: title,
			text: message,
			icon: icon,
			buttons: false,
			dangerMode: false
		}).then(callback)
	}),
	(Vue.prototype.$confirmDelete = function(url, urlParams, responseCallback, isParamList = false) {
		Vue.prototype.$lang.then(lang => {
			let params = {}

			if (urlParams == null) {
				urlParams = {}
			}

			if (isParamList) {
				params.params = decodeURIComponent(window.$.param(urlParams, true))
			} else {
				params.params = urlParams
			}
			Vue.$swal(lang.dialog_delete, {
				buttons: {
					cancel: lang.action_cancel,
					catch: {
						text: lang.action_delete,
						value: "submit"
					}
				}
			}).then(value => {
				switch (value) {
					case "submit":
						axios
							.delete(url, params)
							.then(({ data }) => {
								let status = data.status ? 1 : 0
								Vue.prototype.$alertMessage(data.message, status, responseCallback)
							})
							.catch(() => {
								Vue.prototype.$alertMessage(lang.ERROR0000, 0, responseCallback)
							})
						break
				}
			})
		})
	})
)

axios.defaults.baseURL = "http://localhost:8000/api"
axios.defaults.headers.common["Cookies"] = `lang = ${Vue.$cookies.get("lang")};`

Vue.prototype.$owner = "bagus"

new Vue({
	router,
	render: h => h(App)
}).$mount("#app")
