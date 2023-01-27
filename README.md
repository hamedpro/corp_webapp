# how to use

## setup project:

step 1: first make sure you have node js and npm installed and use this script below to install required dependencies

```
npm install
```

then make sure you have a mysql server and a mongo db server installed on your machine. then create a file in project root and name it "env.json". then save a atringified object which contains all of these variables : property names are case sensitive 

* frontend_port -> number 
* api_endpoint -> string 
* mysql_user -> string 
* mysql_password -> any
* mysql_port -> number
* mysql_host -> string 
* mysql_database -> string 
* mongodb_url -> string
* mongodb_db_name -> string 
* PASSWORD_HASHING_SECRET -> any 
* api_port -> number 
now your environment is ready to use and you can use one of the scripts below to either start the app in development mode or start the app in production mode

> #### note! when choosing frontend_port choose a port which is not blocked and is not labeled as unsafe by chrome (for ex 6000 is blocked) (may this issue also be true about api_port and other ports )

## starting developing mode:

run following command :

```
npm run dev
```

## starting custom production mode:

run following command :

```
npm start
```