import Vue from "vue"
import VueRouter from "vue-router"

import Dashboard from "../views/Dashboard.vue"
import MasterMenu from "../views/MasterData/Menu.vue"
import MasterRole from "../views/MasterData/Role.vue"
import MasterUser from "../views/MasterData/User.vue"
import MasterUserRoleMap from "../views/MasterData/UserRoleMap.vue"
import MasterMenuRoleMap from "../views/MasterData/MenuRoleMap.vue"

import Blog from "../views/Blog.vue"

import Login from "../views/Login.vue"
import Page404 from "../views/404.vue"

Vue.use(VueRouter)

const routes = [
	{
		path: "/administrator/",
		name: "administrator",
		meta: { requiresAuth: true },
		component: () => import("../container/Container.vue"),
		children: [
			{
				path: "dashboard",
				name: "Dashboard",
				meta: { requiresAuth: true },
				component: Dashboard
			},
			{
				path: "master/menu",
				name: "Master Menu",
				meta: {
					parent: "master data",
					requiresAuth: true,
					childUrl: "/master/menu"
				},
				component: MasterMenu
			},
			{
				path: "master/role",
				name: "Master Role",
				meta: {
					parent: "master data",
					requiresAuth: true,
					childUrl: "/master/role"
				},
				component: MasterRole
			},
			{
				path: "master/user",
				name: "Master User",
				meta: {
					parent: "master data",
					requiresAuth: true,
					childUrl: "/master/user"
				},
				component: MasterUser
			},
			{
				path: "master/user-role-map",
				name: "Master User Role",
				meta: {
					parent: "master data",
					requiresAuth: true,
					childUrl: "/master/user-role-map"
				},
				component: MasterUserRoleMap
			},
			{
				path: "master/menu-role-map",
				name: "Master Menu Role",
				meta: {
					parent: "master data",
					requiresAuth: true,
					childUrl: "/master/menu-role-map"
				},
				component: MasterMenuRoleMap
			}
		]
	},
	{
		path: "/",
		name: "root",
		meta: { requiresAuth: true },
		component: () => import("../container/Container.vue"),
		children: [
			{
				path: "blog",
				name: "blog",
				component: Blog,
				meta: { requiresAuth: true }
			},
			{
				path: "pages",
				name: "pages",
				meta: { requiresAuth: true }
			}
		]
	},
	{
		path: "/login",
		name: "login",
		meta: { requiresAuth: false },
		component: Login
	},
	{
		path: "/error-404",
		name: "error404",
		meta: { requiresAuth: false },
		component: Page404
	}
]

const router = new VueRouter({
	mode: "hash",
	scrollBehavior: () => ({ y: 0 }),
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (Vue.$cookies.get("token") === null) {
			next({
				path: "/login",
				params: { nextUrl: to.fullPath }
			})
		} else {
			next()
		}
	} else {
		if (to.matched.length > 0) {
			next()
		} else {
			next({ path: "/error-404" })
		}
	}
})

export default router
