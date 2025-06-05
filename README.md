# Movie Explorer Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

This application consists of core functionalities:
* Search For Movies
* Display Search Results
* Authentication - Auth0 + MFA
* Infinite Scrolling

## Technologies Used

* React.js
* Auth0 (for authentication)
* Axios (for API calls)
* OMDb API
* lodash.throttle


## Setup and Installation

* Clone The Repository
    git clone [https://github.com/Ranvin36/movie-explorer]

* Install Dependencies:
    ### `npm install`

* Environment Variables
    1. Create a .env file in the root directory.
    2. Add your OMDb API key 
        - REACT_APP_OMDB_API_KEY=your_omdb_api_key 
    3. Add the auth0 configuration details:Domain,Client ID
        - REACT_APP_AUTH0_DOMAIN=your_auth0_domain
        - REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id


### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Usage
* How to login - The application uses Auth0 for authentication. You can log in using email-password authentication. After successful email-password login, Multi-Factor Authentication (MFA) is enforced, which can be completed via email verification or an authenticator app.

* How infinite scrolling works - The application implements infinite scrolling to display movie results. As the user scrolls near the end of the current results, a request for the next page of movies is automatically sent. This process is throttled to prevent excessive API calls, ensuring a 2-second delay between consecutive page requests, utilizing lodash.throttle.


### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
