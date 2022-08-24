# how to use

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
node create_env_configurations.cjs host=your_host user=your_user port=the_port_you_are_using password=your_password
```

now your environment is ready to use and you can use one of the scripts below to either start the app in development mode or start the app in production mode

## starting developing mode:

run following command :

```
npm run dev
```

## starting production mode:

run this command:

```
npm run start_production
```
