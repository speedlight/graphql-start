const express = require('express')
const app = express()
const port = 3030
const mongoUrl = "mongodb://localhost:27017/colegios"
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const mongoose = require('mongoose');
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
!db ? console.log("Error connecting db") : console.log("Db connected successfully");

const Student = require("./model")

const getStudent = (query) => {
  return Student.findOne({citizenship: query.citizenship}, function (err, response) {
   if(err) return err
    return response;
  })
}

const getAllStudent = () => {
  return Student.find({}, function (err, response) {
   if(err) return err
    return response;
  })
}

const root = {
  student: getStudent,
  students: getAllStudent
}

const schema = buildSchema(`
  type Query {
    student(citizenship: String): Student
    students:[Student]
  }
  type Student {
    citizenship: String
    school: String
    relational_data: Relational_data
  }
  type Relational_data {
    all_data: String
    name: Name
    id_card: String
    email: String
    gender: String
    years: String
  }
  type Name {
    show: String
    order: String
  }
`)

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true
}))

//app.get('/', (req, res) => res.send('Hello Word!'))
app.listen(port, async() => {
  console.log('-------- Hola ');
  console.log(await getAllStudent());
})
