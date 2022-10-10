# how to use

> ## note!
>
> #### explanations written in this README are only expected to work properly on linux-ubuntu and also most probably on other common linux distros and its not guranteed to work on other OSs
>
> <br />

## setup project:

step 1: first make sure you have node js and npm installed and use this script below to install required dependencies

```
npm install -g http-server nodemon && npm install
```

then make sure you have a mysql server installed on your machine and then create a configuration file for it using this script below to let the app know how to connect to your mysql server properly. it also generates some secret keys to be used in jwt system and for hashing passwords
<br />
> your mysql server should allow connecting with the traditional authentication way (with just simple password -> using mysql_native_password)

```
node create_env_configurations.cjs mysql_host=your_host mysql_user=your_user mysql_port=port_that_mysql_server_is_running_on mysql_password=your_password frontend_port=a_number mysql_database=your_mysql_database_name api_port=a_number api_endpoint=something
```

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