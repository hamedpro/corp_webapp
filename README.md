# how to use

> ## note!
>
> #### explanations written in this README are only expected to work properly on linux-ubuntu and also most probably on other common linux distros and its not guranteed to work on other OSs
>
> <br>

## setup project:

step 1: after cloning this repository first make sure you have node js installed and use this script below to make sure you have these packages installed globally : http-server , nodemon

```
npm install -g http-server nodemon
```

step 2: then install all local deps using this script below

```
npm install
```

then make sure you have a mysql server installed on your machine and then create a configuration file for it using this script below to let the app know how to connect to your mysql server properly. it also generates some secret keys to be used in jwt system and for hashing passwords
<br>
\*\* your mysql server should allow connecting with the traditional authentication way (with just simple password -> using mysql_native_password)

```
node create_env_configurations.cjs host=your_host user=your_user port=the_port_you_are_using password=your_password production_frontend_port=a_number mysql_database=your_mysql_database_name
```

now your environment is ready to use and you can use one of the scripts below to either start the app in development mode or start the app in production mode

> #### note! when choosing frontend_port choose a port which is not blocked and is not labeled as unsafe by chrome (for ex 6000 is blocked) (may this issue also be true about api_port and other ports )

## starting developing mode:

run following command :

```
npm run dev
```

## starting custom production mode:

our current remote web server runs cent-OS as its OS. also we have not admin previleges when executing commands on its terminal and must follow a specific way to setup our app there; so i have written this script below to handle that : you have to fill out these values : frontend_port, api_endpoint, api_port

```
export api_port=a_number api_endpoint=a_full_url frontend_port=a_number ; npm run custom_start
```
