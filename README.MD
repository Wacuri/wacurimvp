# Wacuri MVP


# Installation

Node Version: v8.3.0

Just clone this repo or download the zip file. `cd` into the directory and run.

    yarn install --ignore-engines

The reason we are using yarn is historic and a bit obscure.

## Developing App with [Hot Reload]

    npm run dev

Now you can access your react application on http://localhost:8080

## Production build and Deploy
To make a production build of your project, run the following commands

    npm run build

This will create create two files: `index.js` in `server/public/js` and `server.js` in `server/bin`.

`server.js` will be used for serving the application on port 3000 and `index.js` is the actual react app itself.

Finally run

    npm start

The you will be able to access this app from http://localhost:3000.

To get a distributable tarball of your application, run this command

    npm pack

Remember that you have to run `npm run build` before doing this. This will create a tar.gz file in your root folder. The contents in this file is deployable. All you need to do is copy the contents inside package folder inside this tar.gz file to your server and run the app with something like [pm2].

# Deployment Using Heroku

Currently the deployment mechanism to Heroku is to build the site:

    npm run build:server
    npm run build:client

And then copy all relevant files to the Heroku CLI directory, with sonething like:

    cp -r ../wacurimvp/webpack .
    cp -r ../wacurimvp/client .
    cp -r ../wacurimvp/server .        
    cp ../wacurimvp/.isomorphic-loader-config.json .

And then use a standard Heroku push:

    git commit -am “deploy"
    git push heroku head:master 

# Using Ngrok locally

At present, Ngrok is used to create a local tunnel for reporting the number of participants in a room, a cricial piece of functionality. 
It is begun with:

  ngrok http 5000

And configured as the local session monitoring seeting at TokBox. Which will look something like:  http://9cd44610.ngrok.io/api/event

