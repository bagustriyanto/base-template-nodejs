const path = require("path")

module.exports = {
	entry: [
		"./public/assets/modules/jquery.min.js",
		"./public/assets/modules/popper.js",
		"./public/assets/modules/tooltip.js",
		"./public/assets/modules/bootstrap/js/bootstrap.min.js",
		"./public/assets/modules/nicescroll/jquery.nicescroll.min.js",
		"./public/assets/modules/moment.min.js",
		"./public/assets/js/stisla.js",
		"./public/assets/js/scripts.js",
		"./public/assets/modules/summernote/summernote-bs4.js",
		"./public/assets/modules/codemirror/lib/codemirror.js",
		"./public/assets/modules/codemirror/mode/javascript/javascript.js",
		"./public/assets/modules/jquery-selectric/jquery.selectric.min.js"
	],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "public")
	}
}
