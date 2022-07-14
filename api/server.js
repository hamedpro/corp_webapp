var express = require("express")
var cors = require('cors')
var response_manager = require('../common-codes/custom_api_system/dev/express_response_manager')
var mysql = require('mysql')
var multiparty = require('multiparty');
var app = express()
app.use(cors())

//configuring mysql databases and tables =>
app.all('/',(req,res)=>{
	var rm = new response_manager(res)

	var connection = mysql.createConnection({
		user : 'root',
		password:"mysqlpassword",
		port:"3306",
		host:"localhost"
	})
	connection.query('create database if not exists corp_webapp;',error=>{
		if(error){
			rm.add_error(error)
			rm.send()
		}
	})
	connection.end()

	connection = mysql.createConnection({
		user : "root",
		password : "mysqlpassword",
		port : 3306,
		host : "localhost",
		database : "corp_webapp",
		multipleStatements : true
	})
	connection.query(`
		create table if not exists users(
			id int primary key auto_increment,
			username varchar(50) ,
			password varchar(50) , 
			is_admin varchar(20) default "false"
		);
		create table if not exists products(
			id int primary key auto_increment,
			name varchar(200) , 
			description text(1000),
			product_specs text(1000),
			price int(15)
		);
		create table if not exists reviews(
			id int primary key auto_increment,
			username varchar(50),
			rating_from_five int(3),
			pros text(200),
			cons text(200),
			text text(200),
			time varchar(50),
			is_user_a_customer varchar(10)
		);
		create table if not exists supprot_tickets(
			id int primary key auto_increment,
			username varchar(50),
			text text,
			is_proceed varchar(20),
			proceeded_by varchar(50)
		);
	`)
	//product_specs inside products table should contain ->
	// -> a json stringified array of key values -- also for ex pros and cons fields
	//todo take care about length of texts and max length of cells
	var params = req.query;

	switch(req.task_name){
		case "new_user":
			connection.query(`select * from users where username = '${params.username}'`,(error,results)=>{
				if(error){
					rm.add_error(error)
					rm.send()
				}else{
					if(results.length == 0){
						connection.query(`insert into users (username,password) values ('${params.username}','${params.password}');`,(error)=>{
							if(error){
								rm.add_error(error)
								rm.send()
							}else{
								rm.set_result(true)
								rm.send()
							}
						})
					}else {
						rm.add_error('username is taken by another user')
						rm.send()
					}
				}
			})
			
			break;
		case "get_users" : 
			connection.query(`select * from users`,(error,results)=>{
				rm.set_result(results)
				rm.send()
			})
			break;
		case "toggle_user_admin_state" : 
			connection.query(`select is_admin from users where username = "${params.username}"`,(error,results)=>{
				var new_is_admin_string  = results[0].is_admin == "true" ? "false" : "true";
				connection.query(`upadte users set is_admin = "${new_is_admin_string}" where username = "${params.username}"`,error=>{
					if(error){
						rm.add_error(error),
						rm.send()
					}else{
						rm.set_result(true)
						em.send()
					}
				})

			})
			break;
		case "update_user_data" :
			break;
		case "verify_user_password" : 
			connection.query(`select password from users where username = "${params.username}"`,(error,results)=>{
				if(error){
					rm.add_error(error)
					rm.send()
				}else{
					rm.set_result(results[0].password ==  params.password)
					rm.send()
				}
			})
			break;
		case "is_username_available":
			connection.query(`select * from users where username = '${params.username}'`,(error,results)=>{
				rm.set_result(results.length == 0)
				rm.send()
			})
			break;
		case "new_product" :
			connection.query(`insert into products (name,description,product_specs,price) values ('${params.name}','${params.description}','${params.product_specs}','${params.price}')`,(error)=>{
				if(error){
					rm.add_error(error)
					rm.send()
				}
				rm.set_result(true)
				rm.send()
			})
			break;
		case "new_product_photo":
			//must be fixed
			var form = new multiparty.Form();
			form.parse(req, function(err, fields, files){
				var dir = __dirname + "/products_files/"
				if(!fs.existsSync(dir)){
					fs.mkdirSync(dir)
				}
				// todo add ability to save multiple files at once
				res.write(JSON.stringify(files))
				//fs.copyFileSync(files.file[0]["path"], dir + params.product_id + ".jpg")
				//above line's paths are relative to path of stating server so take care 
				res.end();
			});
			break;
		case "update_product_data" : 
			var old_data;
			connection.query(`select * from products where id = ${params.product_id}`,(error,results)=>{
				old_data = results[0]
			})
			var new_data = {
				name : "name" in params ? params["name"] : old_data['name'],
				name : "description" in params ? params["description"] : old_data['description'],
				name : "product_specs" in params ? params["product_specs"] : old_data['product_specs'],
				name : "price" in params ? params["price"] : old_data['price'],

			}
			connection.query(`
			update products 
			set name="${new_data.name}",
			description="${new_data.description}",
			product_specs="${new_data.product_specs}",
			price="${new_data.price}" 
			where id= ${params.product_id}`,err=>{
				if(err){
					rm.add_error(err)
					rm.send()
				}else{
					rm.set_result(true)
					rm.send()
				}
			})
			break;
		case "new_product_user_review":
			connection.query(`
				insert into reviews
				(username,rating_from_five,pros,cons,text,time,is_user_a_customer)
				values
				("${params.username}",
				${params.rating_from_five},"${pros}","${$cons}","${text}","${time}","${is_user_a_customer}");
			`,err=>{
				if(err){
					rm.add_error(err)
					rm.send()
				}
				rm.set_result(true)
				rm.send()
			})
			break;
		case "change_product_user_review":
			break;
		case "sub_to_sms":
			
			break;
		case "sub_to_email":
			break;
		case "send_sms":
			break;
		case "send_email":
			break;
		case "send_sms_to_all":
			break;
		case "send_email_to_all":
			break;
		case "new_support_ticket":
			break;
		case "delete_support_ticket":
			break;
		case "toggle_support_ticket":
			break;
		case "comment_support_ticket":
			break;
		case "update_support_ticket_comment":
			break;
		case "delete_support_ticket_comment":
			break;
		case "get_support_tickets":
			break;
		case "set_company_data":
			break;
		case "new_blog_post":
			break;
		case "modify_blog_post":
			break;
		case "get_blog_posts_ids":
			break;
		case "get_blog_posts":
			break;
		case "get_blog_post":
			break;
		case "share_blog_post":
			break;


	}
})
app.listen(4000,()=>{
	console.log('server is listening on port 4000')
})
