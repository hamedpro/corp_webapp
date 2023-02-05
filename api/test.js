import axios from "axios";
var response = await axios({
	baseURL: "http://localhost:4000",
	url: "/users",
	method: "post",
	data: {},
});
