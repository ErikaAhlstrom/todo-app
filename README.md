# Todo app for a school project

The assignment was to build a MERN-stack todo/notes app similar to google notes. 

# Stack

- MongoDB (Atlas Cloud, Azure)
- Express
- React
- NodeJS

# Start the app
## Start client side

In the project directory run:
`npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## Start server side

In the backend directory run:
`npx nodemon start`
# Deployment
## Frontend deployed at

[https://mern-jwt-notes-app-client.herokuapp.com]

## Backend deployed at

[https://mern-jwt-notes-app.herokuapp.com/]

# Testing

## Run client side unit test on login form
`cd frontend`
`npm test LoginForm.test.js`

## Run server side unit test on user validation
`cd backend`
`npx jest`

## Run server side eslint
`cd backend`
`npx eslint .`
