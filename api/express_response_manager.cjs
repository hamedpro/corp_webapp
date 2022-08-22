module.exports = class response_manager {
	// i have code it like this to have a standard about what server will send in diffrent siturations
	// todo : i have to also handle response in front-end in same way
	response;
	errors = [];
	result;
	mysql_connection;
	constructor(response) {
		this.response = response;
	}
	append = (data) => {
		this.response.write(data);
	};
	add_error = (error) => {
		this.errors.push(error);
	};
	set_result = (result) => (this.result = result);
	send = () => {
		// write all data to response and with send it ends the connection
		this.response.send(
			JSON.stringify({
				errors: this.errors,
				result: this.result,
			})
		);
		this.mysql_connection.end();
	};
	send_error = (error) => {
		this.add_error(error);
		this.send();
	};
	send_result = (result) => {
		this.set_result(result);
		this.send();
	};
	add_mysql_con = (con) => {
		this.mysql_connection = con;
	};
};