var arr_last_item = require("./common.cjs").arr_last_item;
var formidable = require("formidable");
var fs = require("fs");
function custom_upload({
	req,
	files_names, // array with struc like this : ["file1","file2"]
	uploadDir = "./",
	onSuccess = () => {},
	onReject = () => {},
}) {
	var form = formidable({ uploadDir });
	form.parse(req, (err, fields, files) => {
		//todo catch errors
		Object.keys(files).forEach((file, index) => {
			var to;
			if (!uploadDir.endsWith("/")) {
				uploadDir += "/";
			}
			to =
				uploadDir +
				files_names[index] +
				"." +
				arr_last_item(files[file]["originalFilename"].split("."));
			var from = files[file]["filepath"];
			try {
				fs.renameSync(from, to);
			} catch (e) {
				onReject(e);
			}
		});
	});
	onSuccess();
}
module.exports = {
	custom_upload,
};
