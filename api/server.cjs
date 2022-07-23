var express = require("express");
var cors = require("cors");
var response_manager = require("../common-codes/custom_api_system/dev/express_response_manager.cjs");
var mysql = require("mysql");
var formidable = require("formidable");
var nodemailer = require("nodemailer");
var fs = require("fs");
var app = express();
app.use(cors());
app.use(express.static("./uploaded/"));
var custom_upload = require("./nodejs_custom_upload.cjs").custom_upload;

//configuring mysql databases and tables =>
app.all("/", (req, res) => {
  var rm = new response_manager(res);

  connection = mysql.createConnection({
    user: "root",
    password: "mysqlpassword",
    port: 3306,
    host: "localhost",
    multipleStatements: true,
  });
  connection.query(
    `
      create database if not exists corp_webapp;
    use corp_webapp;
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
    create table if not exists support_tickets(
      id int primary key auto_increment,
      username varchar(50),
      title varchar(200),
      type varchar(50),
      text text,
      is_proceed varchar(20) default "false",
      proceeded_by varchar(50)
    );
    create table if not exists subscribed_emails(
      id int primary key auto_increment,
      username varchar(50),
      email varchar(50)
    );
    create table if not exists subscribed_phone_numbers(
      id int primary key auto_increment,
      username varchar(50),
      phone_number int(15)
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
  `,
    (error) => {
      if (error) {
        rm.add_error(error);
        rm.send();
      }
    }
  );
  //paired_data is where we store key values
  //support_tickets.type can have these values : bug,suggestion,other
  //product_specs inside products table should contain ->
  // -> a json stringified array of key values -- also for ex pros and cons fields
  //todo take care about length of texts and max length of cells
  var params = req.query;
  if (!("task_name" in req.query)) {
    rm.add_error("there is no task_name field present in your request");
    rm.send();
  }

  switch (req.query.task_name) {
    case "new_user":
      connection.query(
        `select * from users where username = '${params.username}'`,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          } else {
            if (results.length == 0) {
              connection.query(
                `insert into users (username,password) values ('${params.username}','${params.password}');`,
                (error) => {
                  if (error) {
                    rm.add_error(error);
                    rm.send();
                  } else {
                    rm.set_result(true);
                    rm.send();
                  }
                }
              );
            } else {
              rm.add_error("username is taken by another user");
              rm.send();
            }
          }
        }
      );

      break;
    case "get_users":
      connection.query(`select * from users`, (error, results) => {
        rm.set_result(results);
        rm.send();
      });
      break;
    case "toggle_user_admin_state":
      connection.query(
        `select is_admin from users where id = ${Number(params.id)}`,
        (error, results) => {
          var new_is_admin_string =
            results[0].is_admin == "true" ? "false" : "true";
          connection.query(
            `update users set is_admin = "${new_is_admin_string}" where id = ${Number(
              params.id
            )}`,
            (error) => {
              if (error) {
                rm.add_error(error), rm.send();
              } else {
                rm.set_result(true);
                rm.send();
              }
            }
          );
        }
      );
      break;
    case "update_user_data":
      break;
    case "verify_user_password":
      connection.query(
        `select password from users where username = "${params.username}"`,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          } else {
            rm.set_result(results[0].password == params.password);
            rm.send();
          }
        }
      );
      break;
    case "change_password":
      connection.query(
        `select * from users where username = "${params.username}"`,
        (error, result) => {
          if (result[0].password == params.old_password) {
            connection.query(
              `update users set password = "${params.new_password}" where username= "${params.username}"`,
              (err) => {
                rm.set_result(true);
                rm.send();
              }
            );
          } else {
            rm.add_error("the_old_pass_was_not_correct");
          }
        }
      );
      break;
    case "is_username_available":
      connection.query(
        `select * from users where username = '${params.username}'`,
        (error, results) => {
          rm.set_result(results.length == 0);
          rm.send();
        }
      );
      break;
    case "new_product":
      connection.query(
        `insert into products (name,description,product_specs,price) values ('${
          params.name
        }','${params.description}','${params.product_specs}',${Number(
          params.price
        )})`,
        (error) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          } else {
            connection.query(`select * from products`, (error, result) => {
              if (error) {
                rm.add_error(error);
                rm.send();
              } else {
                if (result[result.length - 1].name == params.name) {
                  rm.set_result(result[result.length - 1].id);
                  rm.send();
                } else {
                  rm.add_error("error in getting id of inserted row");
                  rm.send();
                }
              }
            });
          }
        }
      );
      break;
    case "new_product_photo":
      //must be fixed
      var form = new multiparty.Form();
      form.parse(req, function (err, fields, files) {
        var dir = __dirname + "/products_files/";
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        // todo add ability to save multiple files at once
        res.write(JSON.stringify(files));
        //fs.copyFileSync(files.file[0]["path"], dir + params.product_id + ".jpg")
        //above line's paths are relative to path of stating server so take care
        res.end();
      });
      break;
    case "update_product_data":
      var old_data;
      connection.query(
        `select * from products where id = ${params.product_id}`,
        (error, results) => {
          old_data = results[0];
        }
      );
      var new_data = {
        name: "name" in params ? params["name"] : old_data["name"],
        name:
          "description" in params
            ? params["description"]
            : old_data["description"],
        name:
          "product_specs" in params
            ? params["product_specs"]
            : old_data["product_specs"],
        name: "price" in params ? params["price"] : old_data["price"],
      };
      connection.query(
        `
      update products 
      set name="${new_data.name}",
      description="${new_data.description}",
      product_specs="${new_data.product_specs}",
      price="${new_data.price}" 
      where id= ${params.product_id}`,
        (err) => {
          if (err) {
            rm.add_error(err);
            rm.send();
          } else {
            rm.set_result(true);
            rm.send();
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
              filenamei
                .split("/")
                [filenamei.split("/").length - 1].split("-")[0] ==
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
            `${params.product_id}-${
              images_count_of_this_product + 1
            }.${file_extension}`
          );
          dest = dest.join("/");
          console.log(`moving from ${filepath} to ${dest}`);
          fs.renameSync(filepath, dest);
        });
        rm.set_result(true);
        rm.send();
      });
      break;
    case "new_user_profile_image":
      var dir = "./uploaded/profile_images";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      custom_upload({
        req,
        files_names: [params.username],
        uploadDir: dir,
      });
      rm.set_result(true);
      rm.send();
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
      rm.set_result(count);
      rm.send();
      break;
    case "new_product_user_review":
      connection.query(
        `
        insert into reviews
        (username,rating_from_five,pros,cons,text,time,is_user_a_customer)
        values
        ("${params.username}",
        ${params.rating_from_five},"${pros}","${$cons}","${text}","${time}","${is_user_a_customer}");
      `,
        (err) => {
          if (err) {
            rm.add_error(err);
            rm.send();
          }
          rm.set_result(true);
          rm.send();
        }
      );
      break;
    case "change_product_user_review":
      break;
    case "get_products":
      connection.query(`select * from products`, (error, result) => {
        if (error) {
          rm.add_error(error);
          rm.send();
        } else {
          rm.set_result(result);
          rm.send();
        }
      });
      break;
    case "sub_to_sms":
      connection.query(
        `
        If Not Exists(select * from subscribed_emails where username="${params.username}")
        Begin
        insert into subscribed_emails (username,email) values ('${params.username}','${params.email}')
        End
      `,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          } else {
            rm.set_result(true);
            rm.send();
          }
        }
      );
      break;
    case "sub_to_email":
      connection.query(
        `
        If Not Exists(select * from subscribed_phone_numbers where username="${params.username}")
        Begin
        insert into subscribed_phone_numbers (username,phone_number) values ('${params.username}',${params.phone_number})
        End
      `,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          } else {
            rm.set_result(true);
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

      http
        .request(options, (response) => {
          var str = "";

          response.on("data", function (chunk) {
            str += chunk;
          });

          response.on("end", function () {
            console.log(str);
          });
        })
        .end();
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
          rm.add_error(error);
          rm.send();
        } else {
          rm.set_result(info.response);
          rm.send();
        }
      });
      break;
    case "new_support_ticket":
      connection.query(
        `
        insert into support_tickets (username,text,title,type)
        values ('${params.username}','${params.text}','${params.title}','${params.type}')
      `,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          } else {
            rm.set_result(true);
            rm.send();
          }
        }
      );
      break;
    case "delete_support_ticket":
      connection.query(
        `delete from support_tickets where id = ${params.id}`,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          } else {
            rm.set_result(true);
            rm.send();
          }
        }
      );
      break;
    case "toggle_support_ticket":
      connection.query(
        `select is_proceed from support_tickets where id=${params.id}`,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          }
          var new_string = results[0].is_proceed == "true" ? "false" : "true";
          connection.query(
            `update support_tickets set is_proceed = "${new_string}", proceeded_by = "${params.proceeded_by}"`,
            (error, results) => {
              if (error) {
                rm.add_error(error);
                rm.send();
              }
              rm.set_result(true);
              rm.send();
            }
          );
        }
      );
      break;
    case "comment_support_ticket":
      connection.query(
        `insert into support_tickets_comments (support_ticket_id,text,username) values (${params.support_ticket_id},'${params.text}','${params.username}')`,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          }
          rm.set_result(true);
          rm.send();
        }
      );
      break;
    case "update_support_ticket_comment":
      connection.query(
        `update support_tickets_comments set text = '${params.new_text}'`,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            em.send();
          }
          rm.set_result(true);
          rm.send();
        }
      );
      break;
    case "delete_support_ticket_comment":
      connection.query(
        `delete from support_tickets_comments where id=${params.id}`,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          }
          rm.set_result(true);
          rm.send();
        }
      );
      break;
    case "get_support_ticket_comments":
      connection.query(
        `select * from support_tickets_comments where support_ticket_id = ${params.support_ticket_id}`,
        (error, result) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          } else {
            rm.set_result(result);
            rm.send();
          }
        }
      );
      break;
    case "get_support_tickets":
      connection.query(`select * from support_tickets`, (error, results) => {
        if (error) {
          rm.add_error(error);
          rm.send();
        }
        rm.set_result(results);
        rm.send();
      });

      break;
    case "set_company_data":
      connection.query(
        `insert into paired_data (pair_key,pair_value) values ("company_data",'${params.company_data}')`,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          } else {
            rm.send();
          }
        }
      );
      break;
    case "get_company_data":
      connection.query(
        `select * from paired_data where pair_key = "company_data"`,
        (error, result) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          } else {
            rm.set_result(result);
            console.log("llll");
            rm.send();
          }
        }
      );
      break;
    case "new_blog_post":
      connection.query(
        `insert into blogs (name,text,last_modification_time) 
      values ("${params.name}","${params.text}","${params.last_modification_time}")`,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          }
          rm.set_result(true);
          rm.send();
        }
      );
      break;
    case "modify_blog_post":
      connection.query(
        `select * from blogs where id=${params.blog_post_id}`,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          }
          var old_data = results[0];
          var new_data = {
            name: "name" in params ? params["name"] : old_data["name"],
            text: "text" in params ? params["text"] : old_data["text"],
            last_modification_time:
              "last_modification_time" in params
                ? params["last_modification_time"]
                : old_data["last_modification_time"],
          };
          connection.query(
            `
        insert into blog_posts
        (name,text,last_modification_time)
        values 
        ("${new_data["name"]}","${new_data["text"]}","${new_data["last_modification_time"]}")
        `,
            (error, results) => {
              if (error) {
                rm.add_error(error);
                rm.send();
              }
              rm.set_result(true);
              rm.send();
            }
          );
        }
      );
      break;
    case "get_blog_posts_ids":
      connection.query(`select * from blog_posts`, (error, results) => {
        if (error) {
          rm.add_error(error);
          rm.send();
        }
        var ids = [];
        results.forEach((result) => {
          ids.push(result.id);
        });
        rm.set_result(ids);
        rm.send();
      });
      break;
    case "get_blog_posts":
      connection.query(`select * from blog_posts`, (error, results) => {
        if (error) {
          rm.add_error(error);
          rm.send();
        }
        rm.set_result(results);
        rm.send();
      });
      break;
    case "get_blog_post":
      connection.query(
        `select * from blog_posts where id=${params.id}`,
        (error, results) => {
          if (error) {
            rm.add_error(error);
            rm.send();
          }
          rm.set_result(results);
          rm.send();
        }
      );
      break;
    case "share_blog_post":
      break;
  }
});
app.listen(4000, () => {
  console.log("server is listening on port 4000");
});
