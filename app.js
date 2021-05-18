const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchema = require("./backend/schema")
const graphQlResolvers = require("./backend/resolvers");
const isAuthorizedMiddleware = require("./backend/middlewares/isAuthorized")

const app = express();

// middlewares
app.use(bodyParser.json())
//setting up headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }
  next();
})

app.use(isAuthorizedMiddleware)

// routes
app.get("/", (req, res) => { res.send("Hello World") })

app.use("/graphql", graphqlHTTP({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}))

// db connection
mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0.bwfcm.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    // port setup
    app.listen(8080, () => {
      console.log("app is running on port 8080")
    })
  })
  .catch((error) => {
    console.log(`ERROR: ${error}`)
  })

