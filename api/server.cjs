require("dotenv").config();
var hash_sha_256_hex = require("./common.cjs").hash_sha_256_hex;
var express = require("express");
var cors = require("cors");
var response_manager = require("./express_response_manager.cjs");
var mysql = require("mysql");
var formidable = require("formidable");
var nodemailer = require("nodemailer");
var fs = require("fs");
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./uploaded/"));
var custom_upload = require("./nodejs_custom_upload.cjs").custom_upload;
var cq = require("./custom_query.cjs").custom_query; // cq stands for custom_query
app.all("/init", async (req, res) => {
	var rm = new response_manager(res);
	[
		"./uploaded",
		"./uploaded/profile_images",
		"./uploaded/product_images",
		"./uploaded/company_info",
	].forEach((path) => {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}
	});
	var dotenv_keys = ["mysql_host", "mysql_user", "mysql_password", "mysql_port"];
	//todo complete these dotenv keys
	for (var i = 0; i < dotenv_keys.length; i++) {
		if (!Object.keys(process.env).includes(dotenv_keys[i])) {
			rm.send_error(
				"tried to access one of mysql configurations from .env but it didn't exist"
			);
			return;
		}
	}
	var con = mysql.createConnection({
		user: process.env.mysql_user,
		password: process.env.mysql_password,
		port: Number(process.env.mysql_port),
		host: process.env.mysql_host,
		multipleStatements: true,
	});
	//add error handling for mysql createConnection
	rm.add_mysql_con(con);

	var output = await cq(
		con,
		`
			create database if not exists corp_webapp;
		use corp_webapp;
		create table if not exists users(
			id int primary key auto_increment,
			username varchar(50) ,
			hashed_password text , 
			is_admin varchar(20) default "false",
			is_subscribed_to_email varchar(20) default "false",
			is_subscribed_to_sms varchar(20) default "false",
			email varchar(100),
			phone_number varchar(15),
			time varchar(20)
		);
		create table if not exists products(
			id int primary key auto_increment,
			name varchar(200) , 
			description text(1000),
			product_specs text(1000),
			price int(15),
			discount_percent int(3) default 0,
			category varchar(100)
		);
		create table if not exists reviews(
			id int primary key auto_increment,
			product_id int(5),
			username varchar(50),
			rating_from_five int(3),
			pros text(400),
			cons text(400),
			text text(400),
			time varchar(50)
		);
		create table if not exists support_tickets(
			id int primary key auto_increment,
			username varchar(50),
			title varchar(200),
			type varchar(50),
			text text,
			is_proceed varchar(20) default "false",
			proceeded_by varchar(50)
		);
		
		create table if not exists support_tickets_comments(
			id int primary key auto_increment,
			support_ticket_id int(10),
			text text,
			username varchar(200)
		);
		create table if not exists paired_data(
			id int primary key auto_increment,
			pair_key varchar(50),
			pair_value text
		);
		create table if not exists blog_posts(
			id int primary key auto_increment,
			name varchar(200),
			text text,
			last_modification_time varchar(100)
		);
		create table if not exists orders (
			id int primary key auto_increment,
			username varchar(50),
			product_ids json,
			status varchar(40), # submited payed finished todo add deliver data here 
			time varchar(20),
			name varchar(20)
		);
		create table if not exists shopping_card_items(
			id int primary key auto_increment,
			username varchar(20),
			product_id int,
			count int(8),
			time varchar(20)
		);
		create table if not exists blog_comments(
			id int primary key auto_increment,
			username varchar(20),
			blog_id int(10),
			title varchar(100),
			text text,
			time varchar(20),
			verification_status varchar(20),
			verifier_username varchar(20)
		)
		`
	);
	//in blog comments -> verf_status : rejected , pending, accepted
	//todo add ability to reserve each product when adding to --
	//shopping card seperatly
	//todo also check for all comments for todo
	//todo also check inside the code for todos and make a  --
	//app for it
	if (output.error) {
		rm.send_error(output.error);
		return; // it terminates app.all function
	}
	output = await cq(con, "select * from users where username = 'root'");
	if (output.error) {
		rm.send_error(output.error);
		return;
	}
	if (output.result.length == 0) {
		var hashed_password = hash_sha_256_hex("root" + process.env.PASSWORD_HASHING_SECRET);
		output = await cq(
			con,
			`insert into users (username,hashed_password,is_admin) values ('root','${hashed_password}','true')`
		);
		if (output.error) {
			rm.send_error(output.error);
			return;
		}
	}
	//support_tickets->type can have these values : bug,suggestion,other
	//product_specs inside products table should contain ->
	// -> a json stringified array of key values -- also for ex pros and cons fields
	//todo take care about length of texts and max length of cells
	rm.send();
});
app.all("/", async (req, res) => {
	var rm = new response_manager(res);

	var con = mysql.createConnection({
		user: process.env.mysql_user,
		password: process.env.mysql_password,
		port: Number(process.env.mysql_port),
		host: process.env.mysql_host,
		multipleStatements: true,
		database: "corp_webapp",
	});
	//add error handling for mysql createConnection
	rm.add_mysql_con(con);

	var params = { ...req.body, ...req.query };
	if (!("task_name" in params)) {
		rm.send_error("there is no task_name field present in your request");
		return;
	}
	switch (params.task_name) {
		//todo : use custom_query in all app
		case "new_user":
			var output = await cq(con, `select * from users where username = '${params.username}'`);
			if (output.error) {
				rm.send_error(output.error);
				break;
			}
			if (output.result.length == 0) {
				var hashed_password = hash_sha_256_hex(
					params.password + process.env.PASSWORD_HASHING_SECRET
				);
				var output2 = await cq(
					con,
					`insert into users (username,hashed_password) values ('${params.username}','${hashed_password}');`
				);
				if (output2.error) {
					rm.send_error(output2.error);
					break;
				}
				rm.send_result(true);
			} else {
				rm.send_error("username is taken by another user");
			}

			break;
		case "get_users":
			//todo add his shopping card as a prop
			//todo add his orders here

			con.query(`select * from users`, (error, results) => {
				if (error) {
					rm.send_error(error);
					return;
				}
				var modified_results = results.map((user) => {
					var modified_user = user;
					delete modified_user.hashed_password;
					var profile_images = fs.readdirSync("./uploaded/profile_images/");
					//todo make sure paths and logics works also on windows and mac os
					modified_user.has_profile_image = false;
					modified_user.profile_image_file_name = null;
					profile_images.forEach((pi) => {
						if (
							pi.split("/")[pi.split("/").length - 1].split(".")[0] == user.username
						) {
							modified_user.has_profile_image = true;
							modified_user.profile_image_file_name =
								pi.split("/")[pi.split("/").length - 1];
						}
					});
					return modified_user;
				});
				rm.send_result(modified_results);
			});
			break;
		case "toggle_user_admin_state":
			con.query(
				`select is_admin from users where username = '${params.username}'`,
				(error, results) => {
					if (error) {
						rm.send_error(error);
					} else {
						var new_is_admin_string = results[0].is_admin == "true" ? "false" : "true";
						con.query(
							`update users set is_admin = "${new_is_admin_string}" where username = '${params.username}'`,
							(error) => {
								if (error) {
									rm.send_error(error);
								} else {
									rm.send_result(true);
								}
							}
						);
					}
				}
			);
			break;
		//todo add checks for types and forexample when accessing user -
		// check if the user even exists or not !
		//todo convert to typescript
		//todo : use ssr
		case "change_username":
			con.query(
				`update users set username = '${params.new_username}' where username = '${params.old_username}'`,
				(error) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send();
						/* todo show this error to user
						and suggest him/her to register */
					}
				}
			);
			break;
		case "verify_user_password":
			con.query(
				`select hashed_password from users where username = "${params.username}"`,
				(error, results) => {
					if (error) {
						rm.send_error(error);
					} else {
						if (results.length === 0) {
							rm.send_error("there is not any user with that username");
						} else {
							rm.send_result(
								results[0].hashed_password ==
									hash_sha_256_hex(
										params.password + process.env.PASSWORD_HASHING_SECRET
									)
							);
						}
					}
				}
			);
			break;
		case "change_password":
			con.query(
				`select * from users where username = "${params.username}"`,
				(error, result) => {
					if (error) {
						rm.send_error(error);
					} else {
						if (
							result[0].hashed_password ==
							hash_sha_256_hex(params.password + process.env.PASSWORD_HASHING_SECRET)
						) {
							var hashed_new_password = hash_sha_256_hex(
								params.new_password + process.env.PASSWORD_HASHING_SECRET
							);
							con.query(
								`update users set hashed_password = "${hashed_new_password}" where username= "${params.username}"`,
								(err) => {
									if (err) {
										rm.send_error(err);
									} else {
										rm.send_result(true);
									}
								}
							);
						} else {
							rm.send_error("the_old_pass_was_not_correct");
						}
					}
				}
			);
			break;
		case "is_username_available":
			con.query(
				`select * from users where username = '${params.username}'`,
				(error, results) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send_result(results.length == 0);
					}
				}
			);
			break;
		case "new_product":
			if (isNaN(params.price)) {
				rm.send_error('given "price" must be number');
				break;
			}
			con.query(
				`insert into products 
				(name,description,product_specs,price,category,discount_percent) 
				values
				('${params.name}','${params.description}','${params.product_specs}',${Number(params.price)},'${
					params.category
				}',${Number(params.discount_percent)})`,
				(error) => {
					if (error) {
						rm.send_error(error);
					} else {
						con.query(`select * from products`, (error, result) => {
							if (error) {
								rm.send_error(error);
							} else {
								if (result[result.length - 1].name == params.name) {
									rm.send_result(result[result.length - 1].id);
								} else {
									rm.send_error("error in getting id of inserted row");
								}
							}
						});
					}
				}
			);
			break;
		case "update_product_data":
			con.query(
				`select * from products where id = ${params.product_id}`,
				(error, results) => {
					if (error) {
						rm.send_error(error);
					} else {
						var old_data = results[0];
						var new_data = {
							name: "name" in params ? params["name"] : old_data["name"],
							description:
								"description" in params
									? params["description"]
									: old_data["description"],
							product_specs:
								"product_specs" in params
									? params["product_specs"]
									: old_data["product_specs"],
							price: "price" in params ? params["price"] : old_data["price"],
						};
						con.query(
							`
						update products 
						set name="${new_data.name}",
						description="${new_data.description}",
						product_specs="${new_data.product_specs}",
						price="${new_data.price}" 
						where id= ${params.product_id}`,
							(err) => {
								if (err) {
									rm.send_error(err);
								} else {
									rm.send_result(true);
								}
							}
						);
					}
				}
			);
			break;
		case "upload_product_images":
			var product_images_dir = "./uploaded/product_images";
			if (!fs.existsSync(product_images_dir)) {
				fs.mkdirSync(product_images_dir);
			}

			form = formidable({ uploadDir: "./uploaded/product_images" });
			form.parse(req, (err, fields, files) => {
				/* if (err) {
					next(err);
					return;
				} */
				Object.keys(files).forEach((file_name) => {
					var images_count_of_this_product = 0;
					var dir_files_names = fs.readdirSync("./uploaded/product_images/");
					dir_files_names.forEach((filenamei) => {
						if (
							filenamei.split("/")[filenamei.split("/").length - 1].split("-")[0] ==
							params.product_id
						) {
							images_count_of_this_product += 1;
						}
					});
					var filepath = files[file_name]["filepath"];
					var dest = filepath.split("/");
					dest.pop();
					var file_extension =
						files[file_name]["originalFilename"].split(".")[
							files[file_name]["originalFilename"].split(".").length - 1
						];
					dest.push(
						`${params.product_id}-${images_count_of_this_product + 1}.${file_extension}`
					);
					dest = dest.join("/");
					try {
						fs.renameSync(filepath, dest);
					} catch (e) {
						rm.add_error(e);
					}

					// todo : make sure to undo uncompleted task if its required when it is terminated during its work (in all application)
				});
				rm.send();
			});
			break;
		case "new_user_profile_image":
			var dir = "./uploaded/profile_images";
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			//deleting photo if it does exist
			var profile_images = fs.readdirSync(dir);
			profile_images.forEach((pi) => {
				if (pi.split(".")[0] == params.username) {
					fs.rmSync("./uploaded/profile_images/" + pi);
				}
			});
			custom_upload({
				req,
				files_names: [params.username],
				uploadDir: dir,
				onSuccess: () => {
					rm.send_result(true);
				},
				onReject: () => {
					rm.send_error("there was an error inside node js custom upload function");
				},
			});
			break;
		case "get_product_images_count":
			//todo take care to re assigning numbers when modifying photos
			var file_names = fs.readdirSync("./uploaded/product_images");
			var count = 0;
			file_names.forEach((file_name) => {
				if (file_name.split("-")[0] == params.product_id) {
					count += 1;
				}
			});
			rm.send_result(count);
			break;
		case "new_product_user_review":
			con.query(
				//todo : add type check for query params
				`
				insert into reviews
				(username,rating_from_five,pros,cons,text,time,product_id)
				values
				("${params.username}",
				${params.rating_from_five},'${params.pros}','${params.cons}',"${params.text}","${
					params.time
				}",${Number(params.product_id)});
			`,
				(err) => {
					if (err) {
						rm.send_error(err);
					} else {
						rm.send_result(true);
					}
				}
			);
			break;
		case "get_user_reviews":
			con.query(
				`select * from reviews where product_id = ${params.product_id}`,
				(error, result) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send_result(result);
					}
				}
			);
			break;
		case "change_product_user_review":
			break;
		case "get_products":
			con.query(`select * from products`, (error, result) => {
				if (error) {
					rm.send_error(error);
				} else {
					var modified_results = result;
					modified_results.map((o) => {
						var oo = o;

						var file_names = fs.readdirSync("./uploaded/product_images");
						var needed_file_names = [];
						file_names.forEach((file_name) => {
							if (file_name.split("-")[0] == o.id) {
								needed_file_names.push(file_name);
							} //todo we have a case "get image path names of a product" also so we are
							//breaking the single source of truth rule , also check all app for this rule
						});
						oo.images_path_names = needed_file_names;
						return oo;
					});
					rm.send_result(modified_results);
				}
			});
			break;
		case "sub_to_email":
			con.query(
				`update users set is_subscribed_to_email = "true" where username = "${params.username}"`,
				(error) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send();
					}
				}
			);
			break;
		case "sub_to_sms":
			//check if res.send and ... are async take care about their line orders
			con.query(
				`update users set is_subscribed_to_sms = "true" where username = "${params.username}"`,
				(error) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send();
					}
				}
			);
			break;
		case "send_sms":
			// params : text , phone_numbers_array
			var http = require("http");

			var options = {
				host: "localhost",
				port: 4000,
				path: "/",
				method: "GET",
			};

			http.request(options, (response) => {
				var str = "";

				response.on("data", function (chunk) {
					str += chunk;
				});

				response.on("end", function () {
					console.log(str);
				});
			}).end();
			break;
		case "send_email":
			// params : email_addresses , text
			var transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: "youremail@gmail.com",
					pass: "yourpassword",
				},
			});

			var mailOptions = {
				from: "youremail@gmail.com",
				to: "myfriend@yahoo.com",
				subject: "Sending Email using Node.js",
				text: "That was easy!",
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					rm.send_error(error);
				} else {
					rm.send_result(info.response);
				}
			});
			break;
		case "new_support_ticket":
			var query = `
				insert into support_tickets (username,text,title,type)
				values ('${params.username}','${params.text}','${params.title}','${params.type}')
			`;
			con.query(query, (error) => {
				if (error) {
					rm.send_error(error);
				} else {
					rm.send_result(true);
				}
			});
			break;
		case "delete_support_ticket":
			if (isNaN(params.id)) {
				rm.send_error("given 'id' must be a number");
				break;
			}
			con.query(`delete from support_tickets where id = ${params.id}`, (error) => {
				if (error) {
					rm.send_error(error);
				} else {
					rm.send_result(true);
				}
			});
			break;
		case "toggle_support_ticket":
			con.query(
				`select is_proceed from support_tickets where id=${params.id}`,
				(error, results) => {
					if (error) {
						rm.send_error(error);
					} else {
						var new_string = results[0].is_proceed == "true" ? "false" : "true";
						con.query(
							`update support_tickets set is_proceed = "${new_string}", proceeded_by = "${params.proceeded_by}"`,
							(error) => {
								if (error) {
									rm.send_error(error);
								} else {
									rm.send();
								}
							}
						);
					}
				}
			);
			break;
		case "comment_support_ticket":
			con.query(
				`insert into support_tickets_comments (support_ticket_id,text,username) values (${params.support_ticket_id},'${params.text}','${params.username}')`,
				(error) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send_result(true);
					}
				}
			);
			break;
		case "update_support_ticket_comment":
			con.query(
				`update support_tickets_comments set text = '${params.new_text}'`,
				(error) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send_result(true);
					}
				}
			);
			break;
		case "delete_support_ticket_comment":
			con.query(`delete from support_tickets_comments where id=${params.id}`, (error) => {
				if (error) {
					rm.send_error(error);
				} else {
					rm.send_result(true);
				}
			});
			break;
		case "get_support_ticket_comments":
			con.query(
				`select * from support_tickets_comments where support_ticket_id = ${params.support_ticket_id}`,
				(error, result) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send_result(result);
					}
				}
			);
			break;
		case "get_support_tickets":
			con.query(`select * from support_tickets`, (error, results) => {
				if (error) {
					rm.send_error(error);
				} else {
					rm.send_result(results);
				}
			});
			break;
		case "set_company_info":
			// params.company_info should be a stringified json
			con.query(
				`insert into paired_data (pair_key,pair_value) values ("company_info",'${params.company_info}')`,
				(error) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send_result(true);
					}
				}
			);
			break;
		case "upload_company_media":
			custom_upload({
				req,
				files_names: ["favicon", "rectangle", "square"],
				uploadDir: "./uploaded/company_info",
				onSuccess: () => {
					rm.send();
				},
				onReject: (e) => {
					rm.send_error(e);
				},
			});
			break;
		case "get_company_media":
			var company_media_icons = fs.readdirSync("./uploaded/company_info");
			rm.send_result(company_media_icons);
			break;
		case "get_company_info":
			con.query(
				`select * from paired_data where pair_key = "company_info"`,
				(error, result) => {
					if (error) {
						rm.send_error(error);
					} else {
						if (result.length === 0) {
							rm.send_error("there was not a row with pair_key = company_info");
						} else {
							rm.send_result(result[0].pair_value);
						}
					}
				}
			);
			break;
		case "new_blog_post":
			con.query(
				`insert into blogs (name,text,last_modification_time) 
			values ("${params.name}","${params.text}","${params.last_modification_time}")`,
				(error) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send_result(true);
					}
				}
			);
			break;
		case "modify_blog_post":
			con.query(`select * from blogs where id=${params.blog_post_id}`, (error, results) => {
				if (error) {
					rm.send_error(error);
				} else {
					var old_data = results[0];
					var new_data = {
						name: "name" in params ? params["name"] : old_data["name"],
						text: "text" in params ? params["text"] : old_data["text"],
						last_modification_time:
							"last_modification_time" in params
								? params["last_modification_time"]
								: old_data["last_modification_time"],
					};
					con.query(
						`
								insert into blog_posts
								(name,text,last_modification_time)
								values 
								("${new_data["name"]}","${new_data["text"]}","${new_data["last_modification_time"]}")
								`,
						(error) => {
							if (error) {
								rm.send_error(error);
							} else {
								rm.send_result(true);
							}
						}
					);
				}
			});
			break;
		case "get_blog_posts_ids":
			con.query(`select * from blog_posts`, (error, results) => {
				if (error) {
					rm.send_error(error);
				} else {
					var ids = [];
					results.forEach((result) => {
						ids.push(result.id);
					});
					rm.send_result(ids);
				}
			});
			break;
		case "get_blog_posts":
			con.query(`select * from blog_posts`, (error, results) => {
				if (error) {
					rm.send_error(error);
				} else {
					rm.send_result(results);
				}
			});
			break;
		case "get_blog_post":
			con.query(`select * from blog_posts where id=${params.id}`, (error, results) => {
				if (error) {
					rm.send_error(error);
				} else {
					rm.send_result(results);
				}
			});
			break;
		case "share_blog_post":
			break;
		case "get_paths_of_images_of_a_product":
			var file_names = fs.readdirSync("./uploaded/product_images");
			var needed_file_names = [];
			file_names.forEach((file_name) => {
				if (file_name.split("-")[0] == params.product_id) {
					needed_file_names.push(file_name);
				}
			});
			rm.send_result(needed_file_names);
			break;
		case "delete_product":
			var file_names = fs.readdirSync("./uploaded/product_images");
			file_names.forEach((file_name) => {
				if (file_name.split("-")[0] == params.product_id) {
					fs.unlinkSync("./uploaded/product_images/" + file_name);
				}
			});
			con.query(
				`delete from products where id = ${Number(params.product_id)}`,
				(error, result) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send_result(result);
					}
				}
			);
			break;
		case "change_product_name":
			con.query(
				`update products set name = '${params.new_name}' where id= ${params.product_id}`,
				(error) => {
					if (error) {
						rm.send_error();
					} else {
						rm.send();
					}
				}
			);
			break;
		case "change_product_description":
			con.query(
				`update products set description = '${params.new_description}' where id = ${params.product_id}`,
				(error) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send();
					}
				}
			);
			break;
		case "change_product_price":
			con.query(
				`update products set price = ${params.new_price} where id = ${Number(
					params.product_id
				)}`,
				(error) => {
					if (error) {
						rm.send_error(error);
					} else {
						rm.send();
					}
				}
			);
			break;
		case "add_new_spec":
			con.query(`select * from products`, (error, result) => {
				if (error) {
					rm.send_error(error);
				} else {
					var products = result.filter(
						(product) => product.id == Number(params.product_id)
					);
					var this_product = products[0];
					var specs = JSON.parse(this_product["product_specs"]);
					var new_spec_id = 0;
					specs.forEach((spec) => {
						if (spec.id > new_spec_id) {
							new_spec_id = spec.id;
						}
					});
					new_spec_id += 1;
					specs.push({
						id: new_spec_id,
						key: params.spec_key,
						value: params.spec_value,
					});
					con.query(
						`update products set product_specs = '${JSON.stringify(
							specs
						)}' where id= ${Number(params.product_id)}`,
						(error) => {
							if (error) {
								rm.send_error(error);
							} else {
								rm.send();
							}
						}
					);
				}
			});
			break;
		case "delete_spec":
			con.query(
				`select product_specs from products where id = ${Number(params.product_id)}`,
				(error, result) => {
					if (error) {
						rm.send_error(error);
					} else {
						var old_specs = JSON.parse(result[0]["product_specs"]);
						var new_specs = JSON.stringify(
							old_specs.filter((spec) => spec.id != Number(params.spec_id))
						);
						con.query(
							`update products set product_specs = '${new_specs}' where id = ${Number(
								params.product_id
							)}`,
							(error) => {
								if (error) {
									rm.send_error(error);
								} else {
									rm.send();
								}
							}
						);
					}
				}
			);
			break;
		case "change_spec_key":
			con.query(
				`select * from products where id = ${Number(params.product_id)}`,
				(error, result) => {
					if (error) {
						rm.send_error(error);
					} else {
						var specs = JSON.parse(result[0]["product_specs"]);
						var index = null;
						for (var i = 0; i < specs.length; i++) {
							if (specs[i].id == Number(params.spec_id)) {
								index = i;
							}
						}
						specs[index].key = params.new_spec_key;
						con.query(
							`update products set product_specs = '${JSON.stringify(
								specs
							)}' where id = ${Number(params.product_id)}`,
							(error) => {
								if (error) {
									rm.send_error(error);
								} else {
									rm.send();
								}
							}
						);
					}
				}
			);
			break;
		case "change_spec_value":
			con.query(
				`select * from products where id = ${Number(params.product_id)}`,
				(error, result) => {
					if (error) {
						rm.send_error(error);
					} else {
						var specs = JSON.parse(result[0]["product_specs"]);
						var index = null;
						for (var i = 0; i < specs.length; i++) {
							if (specs[i].id == Number(params.spec_id)) {
								index = i;
							}
						}
						specs[index].value = params.new_spec_value;
						con.query(
							`update products set product_specs = '${JSON.stringify(
								specs
							)}' where id = ${Number(params.product_id)}`,
							(error) => {
								if (error) {
									rm.send_error(error);
								} else {
									rm.send();
								}
							}
						);
					}
				}
			);
			break;
		case "pg":
			break;
		case "undo_all":
			//it returns the app to its first state
			//todo : may in addition to droping database it be required to do another stuff
			con.query(`drop database corp_webapp;`, (error) => {
				if (error) {
					rm.send_error(error);
				} else {
					fs.rmSync("./uploaded", { recursive: true, force: true });
					rm.send();
				}
			});
			break;
		case "drop_database":
			var o = await cq(con, "drop database corp_webapp");
			if (o.error) {
				rm.send_error(o.error);
			}
			rm.send();
		case "has_user_profile_image":
			// todo ./uploaded/profile_images/ does not exists
			var profile_images = fs.readdirSync("./uploaded/profile_images/");

			profile_images.filter((pi) => pi.split(".")[0] == params.username).length == 1;

			break;
		//add modify user case to modify subscribed email and ...
		//also add case to unsubscribe email and ...
		case "update_email":
			var output = await cq(
				con,
				`update users set email = "${params.new_email}" where username = "${params.username}"`
			);
			if (output.error) {
				rm.send_error(output.error);
				break;
			} else {
				rm.send();
			}
			break;
		case "update_phone_number":
			var output = await cq(
				con,
				`update users set phone_number = "${params.new_phone_number}" where username = "${params.username}"`
			);
			if (output.error) {
				rm.send_error(output.error);
			}
			rm.send();
			break;
		case "submit_new_shopping_card":
			//reserve all products for 5 hours if its not disabled by admin
			//add getTime of when you're submitting it
			break;
		case "delete_user":
			var r = await cq(con, `delete from users where username = '${params.username}'`);
			if (r.error) {
				rm.send_error(r.error);
			} else {
				rm.send();
			}
			break;
		case "submit_a_new_order":
			/*
				what it does ? 
				select all product ids from this user's shopping card items
				insert them as a order in a new order
				delete all selected shopping card items from shopping card items
			*/
			//todo check error handling of this
			var o = await cq(
				con,
				`select * from shopping_card_items where username = '${params.username}'`
			);
			if (o.error) {
				rm.send_error(error);
				break;
			}
			var product_ids = o.result.map((shopping_card_item) => {
				return Number(shopping_card_item.product_id);
			});
			console.log(product_ids);
			var output = await cq(
				con,
				`insert into orders (name,username,product_ids,status,time) values ('${
					params.name
				}','${params.username}','${JSON.stringify(
					product_ids
				)}','submited','${new Date().getTime()}')`
			);
			if (output.error) {
				rm.send_error(output.error);
				break;
			}
			output = await cq(
				con,
				`delete from shopping_card_items where username = '${params.username}'`
			);
			if (output.error) {
				rm.send_error(error);
				break;
			}
			output = await cq(con, `select * from orders where username = '${params.username}'`);
			if (output.error) {
				rm.send_error(output.error);
				break;
			}
			rm.send_result(output.result[output.result.length - 1]["id"]);
			break;
		case "remove_a_order":
			break;
		//todo add ability to another changes to the order and its products
		//todo complete these cases
		case "add_like_to_a_blog":
			break;
		case "remove_like_from_a_blog":
			break;
		case "new_blog_comment":
			break;
		case "delete_blog_comment":
			break;
		case "change_blog_comment":
			break;
		case "verify_blog_comment":
			/* admin checks the comment for illegal things
			before publishing it publicly */
			break;
		case "get_user_orders":
			var o = await cq(con, `select * from orders where username = '${params.username}'`);
			if (o.error) {
				rm.send_error(o.error);
				break;
			}
			rm.send_result(o.result);
			break;
		case "update_shopping_card_item":
			var o = cq(
				con,
				`delete from shopping_card_items where product_id = ${Number(params.product_id)}`
			);
			if (o.error) {
				rm.send_error(o.error);
				break;
			}
			if (Number(params.new_count) !== 0) {
				o = await cq(
					con,
					`insert into shopping_card_items (username ,product_id ,time,count) values ('${
						params.username
					}',${Number(params.product_id)},'${new Date().getTime()}',${Number(
						params.new_count
					)})`
				);
				if (o.error) {
					rm.send_error(o.output);
					break;
				}
			}
			rm.send();
			break;
		case "get_shopping_card_items":
			var o = await cq(
				con,
				`select * from shopping_card_items where username ='${params.username}'`
			);
			if (o.error) {
				rm.send_error(o.error);
				break;
			}
			rm.send_result(o.result);
			break;
		//todo check for duplicate cases
		//todo add con to cq itself and take just one arg
		case "is_first_setup_done":
			var o = await cq(con, 'select * from paired_data where pair_key = "company_info"');
			if (o.error) {
				rm.send_error(o.error);
				break;
			}
			if (o.result.length === 0) {
				rm.log(
					'there was not any row in table "paired_data" with pair_key = "company_info'
				);
				rm.send_result(false);
				break;
			}
			o = await cq(con, "select * from users");
			if (o.error) {
				rm.send_error(o.error);
				break;
			}
			if (
				o.result.length === 0 ||
				o.result.filter((user) => user.username === "root").length !== 0
			) {
				rm.log('a username with username = "root" was there or users count was 0');
				/* todo let the users use "root" as their usersname
				 it can happen by : dont create root user and delete it at first setup page 
				 you can let the app to add the first user without auth */
				rm.send_result(false);
				break;
			} //todo make sure this func considers all stuations
			var company_media_file_names = fs.readdirSync("./uploaded/company_info");
			if (
				company_media_file_names.filter((fn) => {
					var fnwe = fn.split(".")[0];
					return fnwe === "rectangle" || fnwe === "square" || fnwe === "favicon";
				}).length !== 3
			) {
				rm.log("missing icon");
				rm.send_result(false);
				break;
			}
			rm.send_result(true);
			break;
	}
});
var server = app.listen(4000, () => {
	console.log("server is listening on port 4000");
});
