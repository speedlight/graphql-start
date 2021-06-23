const express = require('express')
const app = express()
const port = 3030
const mongoUrl = "mongodb://localhost:27017"
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const mongoose = require('mongoose');
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
!db ? console.log("Error connecting db") : console.log("Db connected successfully");

const Student = require("./model")

const getStudent = (query) => {
  return Student.findOne({name: query.user}, function (err, reponse) {
   if(err) return err
    return response;
  })
}

const root = {
  student: getStudent
}

const schema = buildSchema(`
  type Query {
    student(name: String!): Student
  }
  type Student {
    name: String!
  }
`)

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true
}))

//app.get('/', (req, res) => res.send('Hello Word!'))
app.listen(port, () => console.log(`App de ejemplo escuchando el puerto ${port}!`))
