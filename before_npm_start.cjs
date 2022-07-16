var fs = require("fs");
var dir = "./src/output.css";
if(!fs.existsSync(dir)){
	fs.writeFileSync(dir,"")
}

