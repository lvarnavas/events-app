First step for a successfull installation after you download or fork the files of this specific repo:

Navigate to the root directory and run `npm install`. This will install the project's dependencies and node modules.  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Before you run the app in development mode you should include a .env file in the root directory and specify the following:

1. REACT_APP_GOOGLE_API_KEY=
2. REACT_APP_BACKEND_URL=http://localhost:5000/api
3. REACT_APP_ASSET_URL=http://localhost:5000
4. PORT=3000

This will allow you to set the environmental variables for the app.
Notice: The Google Maps API key should be included in order to use the map inside the app.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Before you build the app for production mode you should include a .env.production file in the root directory and specify the following:

1. REACT_APP_GOOGLE_API_KEY=
2. REACT_APP_BACKEND_URL=http://localhost:5000/api
3. REACT_APP_ASSET_URL=http://localhost:5000
4. PORT=80

Notice: Instead of localhost you should include the server's IP.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
