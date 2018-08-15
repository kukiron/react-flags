# REST API Server for React-Flags

API server providing the endpoints for user authorization/authentication of **React-Flags**, an application rendering the flags of approx. 250 countries.

## Set MongoDB

You need to install & configure [MongoDB](https://docs.mongodb.com/manual/installation/) before running the API server from local machine. After installing MongoDB, run `mongod` from terminal & edit the `index.js` file in the `server` folder:

```javascript
// change the following line
mongoose.connect(process.env.MONGODB_URI)

// to the following
mongoose.connect("mongodb://localhost:27017/db-name")
```

Now you are good to go!

## Usage

To start the server, from root directory, navigate to `server` folder, install the dependencies & then start the server:

```shell
> cd server
> npm install
> npm run dev:server
```

The server will be started on `localhost:3090`
