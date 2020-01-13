"use strict"

// ChartJS
if (window.Chart) {
	Chart.defaults.global.defaultFontFamily = "'Nunito', 'Segoe UI', 'Arial'"
	Chart.defaults.global.defaultFontSize = 11
	Chart.defaults.global.defaultFontStyle = 500
	Chart.defaults.global.defaultFontColor = "#999"
	Chart.defaults.global.tooltips.backgroundColor = "#000"
	Chart.defaults.global.tooltips.titleFontFamily = "'Nunito', 'Segoe UI', 'Arial'"
	Chart.defaults.global.tooltips.titleFontColor = "#fff"
	Chart.defaults.global.tooltips.titleFontSize = 20
	Chart.defaults.global.tooltips.xPadding = 10
	Chart.defaults.global.tooltips.yPadding = 10
	Chart.defaults.global.tooltips.cornerRadius = 3
}

// DropzoneJS
if (window.Dropzone) {
	Dropzone.autoDiscover = false
}

// Basic confirm box
window.$("[data-confirm]").each(function() {
	var me = window.$(this),
		me_data = me.data("confirm")

	me_data = me_data.split("|")
	me.fireModal({
		title: me_data[0],
		body: me_data[1],
		buttons: [
			{
				text: me.data("confirm-text-yes") || "Yes",
				class: "btn btn-danger btn-shadow",
				handler: function() {
					eval(me.data("confirm-yes"))
				}
			},
			{
				text: me.data("confirm-text-cancel") || "Cancel",
				class: "btn btn-secondary",
				handler: function(modal) {
					window.$.destroyModal(modal)
					eval(me.data("confirm-no"))
				}
			}
		]
	})
})

// Global
window.$(function() {
	let sidebar_nicescroll_opts = {
			cursoropacitymin: 0,
			cursoropacitymax: 0.8,
			zindex: 892,
			enablemousewheel: false
		},
		now_layout_class = null

	var sidebar_sticky = function() {
		if (window.$("body").hasClass("layout-2")) {
			window.$("body.layout-2 #sidebar-wrapper").stick_in_parent({
				parent: window.$("body")
			})
			window.$("body.layout-2 #sidebar-wrapper").stick_in_parent({ recalc_every: 1 })
		}
	}
	sidebar_sticky()

	var sidebar_nicescroll
	var update_sidebar_nicescroll = function() {
		let a = setInterval(function() {
			if (sidebar_nicescroll != null) sidebar_nicescroll.resize()
		}, 10)

		setTimeout(function() {
			clearInterval(a)
		}, 600)
	}

	var sidebar_dropdown = function() {
		if (window.$(".main-sidebar").length) {
			window.$(".main-sidebar").niceScroll(sidebar_nicescroll_opts)
			sidebar_nicescroll = window.$(".main-sidebar").getNiceScroll()

			window
				.$(".main-sidebar .sidebar-menu li a.has-dropdown")
				.off("click")
				.on("click", function() {
					var me = window.$(this)

					me.parent()
						.find("> .dropdown-menu")
						.slideToggle(500, function() {
							update_sidebar_nicescroll()
							return false
						})
					return false
				})
		}
	}
	sidebar_dropdown()

	if (window.$("#top-5-scroll").length) {
		window
			.$("#top-5-scroll")
			.css({
				height: 315
			})
			.niceScroll({ enablemousewheel: false })
	}

	window.$(".main-content").css({
		minHeight: window.$(window).outerHeight() - 95
	})

	window.$(".nav-collapse-toggle").click(function() {
		window
			.$(this)
			.parent()
			.find(".navbar-nav")
			.toggleClass("show")
		return false
	})

	window.$(document).on("click", function(e) {
		window.$(".nav-collapse .navbar-nav").removeClass("show")
	})

	var toggle_sidebar_mini = function(mini) {
		let body = window.$("body")

		if (!mini) {
			body.removeClass("sidebar-mini")
			window.$(".main-sidebar").css({
				overflow: "hidden"
			})
			// setTimeout(function () {
			window.$(".main-sidebar").niceScroll(sidebar_nicescroll_opts)
			sidebar_nicescroll = window.$(".main-sidebar").getNiceScroll()
			// }, 500);
			window.$(".main-sidebar .sidebar-menu > li > ul .dropdown-title").remove()
			window.$(".main-sidebar .sidebar-menu > li > a").removeAttr("data-original-title")
			window.$(".main-sidebar .sidebar-menu > li > a").removeAttr("title")
		} else {
			body.addClass("sidebar-mini")
			body.removeClass("sidebar-show")
			sidebar_nicescroll.remove()
			sidebar_nicescroll = null
			window.$(".main-sidebar .sidebar-menu > li").each(function() {
				let me = window.$(this)
				if (me.find("> .dropdown-menu").length) {
					me.find("> .dropdown-menu").hide()
					me.find("> .dropdown-menu").removeClass("show")
					me.find("> .dropdown-menu").prepend('<li class="dropdown-title pt-3">' + me.find("> a").text() + "</li>")
				} else {
					me.find("> a").attr("data-toggle", "tooltip")
					me.find("> a").attr("data-original-title", me.find("> a").text())
					window.$("[data-toggle='tooltip']").tooltip({
						placement: "right"
					})
				}
			})
		}
	}

	window.$("[data-toggle='sidebar']").click(function() {
		var body = window.$("body"),
			w = window.$(window)

		if (w.outerWidth() <= 1024) {
			body.removeClass("search-show search-gone")
			if (body.hasClass("sidebar-gone")) {
				body.removeClass("sidebar-gone")
				body.addClass("sidebar-show")
			} else {
				body.addClass("sidebar-gone")
				body.removeClass("sidebar-show")
			}

			update_sidebar_nicescroll()
		} else {
			body.removeClass("search-show search-gone")
			if (body.hasClass("sidebar-mini")) {
				toggle_sidebar_mini(false)
			} else {
				toggle_sidebar_mini(true)
			}
		}

		return false
	})

	var toggleLayout = function() {
		var w = window.$(window),
			layout_class = window.$("body").attr("class") || "",
			layout_classes = layout_class.trim().length > 0 ? layout_class.split(" ") : ""

		if (layout_classes.length > 0) {
			layout_classes.forEach(function(item) {
				if (item.indexOf("layout-") != -1) {
					now_layout_class = item
				}
			})
		}

		if (w.outerWidth() <= 1024) {
			if (window.$("body").hasClass("sidebar-mini")) {
				toggle_sidebar_mini(false)
				window.$(".main-sidebar").niceScroll(sidebar_nicescroll_opts)
				sidebar_nicescroll = window.$(".main-sidebar").getNiceScroll()
			}

			window.$("body").addClass("sidebar-gone")
			window.$("body").removeClass("layout-2 layout-3 sidebar-mini sidebar-show")
			window
				.$("body")
				.off("click")
				.on("click", function(e) {
					if (window.$(e.target).hasClass("sidebar-show") || window.$(e.target).hasClass("search-show")) {
						window.$("body").removeClass("sidebar-show")
						window.$("body").addClass("sidebar-gone")
						window.$("body").removeClass("search-show")

						update_sidebar_nicescroll()
					}
				})

			update_sidebar_nicescroll()

			if (now_layout_class == "layout-3") {
				let nav_second_classes = window.$(".navbar-secondary").attr("class"),
					nav_second = window.$(".navbar-secondary")

				nav_second.attr("data-nav-classes", nav_second_classes)
				nav_second.removeAttr("class")
				nav_second.addClass("main-sidebar")

				let main_sidebar = window.$(".main-sidebar")
				main_sidebar
					.find(".container")
					.addClass("sidebar-wrapper")
					.removeClass("container")
				main_sidebar
					.find(".navbar-nav")
					.addClass("sidebar-menu")
					.removeClass("navbar-nav")
				main_sidebar.find(".sidebar-menu .nav-item.dropdown.show a").click()
				main_sidebar.find(".sidebar-brand").remove()
				main_sidebar.find(".sidebar-menu").before(
					window
						.$("<div>", {
							class: "sidebar-brand"
						})
						.append(
							window
								.$("<a>", {
									href: window.$(".navbar-brand").attr("href")
								})
								.html(window.$(".navbar-brand").html())
						)
				)
				setTimeout(function() {
					sidebar_nicescroll = main_sidebar.niceScroll(sidebar_nicescroll_opts)
					sidebar_nicescroll = main_sidebar.getNiceScroll()
				}, 700)

				sidebar_dropdown()
				window.$(".main-wrapper").removeClass("container")
			}
		} else {
			window.$("body").removeClass("sidebar-gone sidebar-show")
			if (now_layout_class) window.$("body").addClass(now_layout_class)

			let nav_second_classes = window.$(".main-sidebar").attr("data-nav-classes"),
				nav_second = window.$(".main-sidebar")

			if (now_layout_class == "layout-3" && nav_second.hasClass("main-sidebar")) {
				nav_second.find(".sidebar-menu li a.has-dropdown").off("click")
				nav_second.find(".sidebar-brand").remove()
				nav_second.removeAttr("class")
				nav_second.addClass(nav_second_classes)

				let main_sidebar = window.$(".navbar-secondary")
				main_sidebar
					.find(".sidebar-wrapper")
					.addClass("container")
					.removeClass("sidebar-wrapper")
				main_sidebar
					.find(".sidebar-menu")
					.addClass("navbar-nav")
					.removeClass("sidebar-menu")
				main_sidebar.find(".dropdown-menu").hide()
				main_sidebar.removeAttr("style")
				main_sidebar.removeAttr("tabindex")
				main_sidebar.removeAttr("data-nav-classes")
				window.$(".main-wrapper").addClass("container")
				// if(sidebar_nicescroll != null)
				//   sidebar_nicescroll.remove();
			} else if (now_layout_class == "layout-2") {
				window.$("body").addClass("layout-2")
			} else {
				update_sidebar_nicescroll()
			}
		}
	}
	toggleLayout()
	window.$(window).resize(toggleLayout)

	window.$("[data-toggle='search']").click(function() {
		var body = window.$("body")

		if (body.hasClass("search-gone")) {
			body.addClass("search-gone")
			body.removeClass("search-show")
		} else {
			body.removeClass("search-gone")
			body.addClass("search-show")
		}
	})

	// tooltip
	window.$("[data-toggle='tooltip']").tooltip()

	// popover
	window.$('[data-toggle="popover"]').popover({
		container: "body"
	})

	// Select2
	if (jQuery().select2) {
		window.$(".select2").select2()
	}

	// Selectric
	if (jQuery().selectric) {
		window.$(".selectric").selectric({
			disableOnMobile: false,
			nativeOnMobile: false
		})
	}

	window.$(".notification-toggle").dropdown()
	window
		.$(".notification-toggle")
		.parent()
		.on("shown.bs.dropdown", function() {
			window.$(".dropdown-list-icons").niceScroll({
				cursoropacitymin: 0.3,
				cursoropacitymax: 0.8,
				cursorwidth: 7
			})
		})

	window.$(".message-toggle").dropdown()
	window
		.$(".message-toggle")
		.parent()
		.on("shown.bs.dropdown", function() {
			window.$(".dropdown-list-message").niceScroll({
				cursoropacitymin: 0.3,
				cursoropacitymax: 0.8,
				cursorwidth: 7
			})
		})

	if (window.$(".chat-content").length) {
		window.$(".chat-content").niceScroll({
			cursoropacitymin: 0.3,
			cursoropacitymax: 0.8
		})
		window
			.$(".chat-content")
			.getNiceScroll(0)
			.doScrollTop(window.$(".chat-content").height())
	}

	if (jQuery().summernote) {
		window.$(".summernote").summernote({
			dialogsInBody: true,
			minHeight: 250
		})
		window.$(".summernote-simple").summernote({
			dialogsInBody: true,
			minHeight: 150,
			toolbar: [
				["style", ["bold", "italic", "underline", "clear"]],
				["font", ["strikethrough"]],
				["para", ["paragraph"]]
			]
		})
	}

	if (window.CodeMirror) {
		window.$(".codeeditor").each(function() {
			let editor = CodeMirror.fromTextArea(this, {
				lineNumbers: true,
				theme: "duotone-dark",
				mode: "javascript",
				height: 200
			})
			editor.setSize("100%", 200)
		})
	}

	// Follow function
	window.$(".follow-btn, .following-btn").each(function() {
		var me = window.$(this),
			follow_text = "Follow",
			unfollow_text = "Following"

		me.click(function() {
			if (me.hasClass("following-btn")) {
				me.removeClass("btn-danger")
				me.removeClass("following-btn")
				me.addClass("btn-primary")
				me.html(follow_text)

				eval(me.data("unfollow-action"))
			} else {
				me.removeClass("btn-primary")
				me.addClass("btn-danger")
				me.addClass("following-btn")
				me.html(unfollow_text)

				eval(me.data("follow-action"))
			}
			return false
		})
	})

	// Dismiss function
	window.$("[data-dismiss]").each(function() {
		var me = window.$(this),
			target = me.data("dismiss")

		me.click(function() {
			window.$(target).fadeOut(function() {
				window.$(target).remove()
			})
			return false
		})
	})

	// Collapsable
	window.$("[data-collapse]").each(function() {
		var me = window.$(this),
			target = me.data("collapse")

		me.click(function() {
			window.$(target).collapse("toggle")
			window.$(target).on("shown.bs.collapse", function() {
				me.html('<i class="fas fa-minus"></i>')
			})
			window.$(target).on("hidden.bs.collapse", function() {
				me.html('<i class="fas fa-plus"></i>')
			})
			return false
		})
	})

	// Gallery
	window.$(".gallery .gallery-item").each(function() {
		var me = window.$(this)

		me.attr("href", me.data("image"))
		me.attr("title", me.data("title"))
		if (me.parent().hasClass("gallery-fw")) {
			me.css({
				height: me.parent().data("item-height")
			})
			me.find("div").css({
				lineHeight: me.parent().data("item-height") + "px"
			})
		}
		me.css({
			backgroundImage: 'url("' + me.data("image") + '")'
		})
	})
	if (jQuery().Chocolat) {
		window.$(".gallery").Chocolat({
			className: "gallery",
			imageSelector: ".gallery-item"
		})
	}

	// Background
	window.$("[data-background]").each(function() {
		var me = window.$(this)
		me.css({
			backgroundImage: "url(" + me.data("background") + ")"
		})
	})

	// Custom Tab
	window.$("[data-tab]").each(function() {
		var me = window.$(this)

		me.click(function() {
			if (!me.hasClass("active")) {
				var tab_group = window.$('[data-tab-group="' + me.data("tab") + '"]'),
					tab_group_active = window.$('[data-tab-group="' + me.data("tab") + '"].active'),
					target = window.$(me.attr("href")),
					links = window.$('[data-tab="' + me.data("tab") + '"]')

				links.removeClass("active")
				me.addClass("active")
				target.addClass("active")
				tab_group_active.removeClass("active")
			}
			return false
		})
	})

	// Bootstrap 4 Validation
	window.$(".needs-validation").submit(function() {
		var form = window.$(this)
		if (form[0].checkValidity() === false) {
			event.preventDefault()
			event.stopPropagation()
		}
		form.addClass("was-validated")
	})

	// alert dismissible
	window.$(".alert-dismissible").each(function() {
		var me = window.$(this)

		me.find(".close").click(function() {
			me.alert("close")
		})
	})

	if (window.$(".main-navbar").length) {
	}

	// Image cropper
	window.$("[data-crop-image]").each(function(e) {
		window.$(this).css({
			overflow: "hidden",
			position: "relative",
			height: window.$(this).data("crop-image")
		})
	})

	// Slide Toggle
	window.$("[data-toggle-slide]").click(function() {
		let target = window.$(this).data("toggle-slide")

		window.$(target).slideToggle()
		return false
	})

	// Dismiss modal
	window.$("[data-dismiss=modal]").click(function() {
		window
			.$(this)
			.closest(".modal")
			.modal("hide")

		return false
	})

	// Width attribute
	window.$("[data-width]").each(function() {
		window.$(this).css({
			width: window.$(this).data("width")
		})
	})

	// Height attribute
	window.$("[data-height]").each(function() {
		window.$(this).css({
			height: window.$(this).data("height")
		})
	})

	// Chocolat
	if (window.$(".chocolat-parent").length && jQuery().Chocolat) {
		window.$(".chocolat-parent").Chocolat()
	}

	// Sortable card
	if (window.$(".sortable-card").length && jQuery().sortable) {
		window.$(".sortable-card").sortable({
			handle: ".card-header",
			opacity: 0.8,
			tolerance: "pointer"
		})
	}

	// Daterangepicker
	if (jQuery().daterangepicker) {
		if (window.$(".datepicker").length) {
			window.$(".datepicker").daterangepicker({
				locale: { format: "YYYY-MM-DD" },
				singleDatePicker: true
			})
		}
		if (window.$(".datetimepicker").length) {
			window.$(".datetimepicker").daterangepicker({
				locale: { format: "YYYY-MM-DD hh:mm" },
				singleDatePicker: true,
				timePicker: true,
				timePicker24Hour: true
			})
		}
		if (window.$(".daterange").length) {
			window.$(".daterange").daterangepicker({
				locale: { format: "YYYY-MM-DD" },
				drops: "down",
				opens: "right"
			})
		}
	}

	// Timepicker
	if (jQuery().timepicker && window.$(".timepicker").length) {
		window.$(".timepicker").timepicker({
			icons: {
				up: "fas fa-chevron-up",
				down: "fas fa-chevron-down"
			}
		})
	}
})
