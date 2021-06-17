const express = require('express')
const app = express()
const port = 3030
const mongoUrl = "mongodb://localhost:27017"

const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose');

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// Un mensaje que nos avise si se pudo conectar a la base da datos, o no. 
!db ? console.log("Error connecting db") : console.log("Db connected successfully");

let Schema = mongoose.Schema;

let demoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
});

let root = {
  estudent: getEstudent
};

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true
}))

//app.get('/', (req, res) => res.send('Hello Word!'))
app.listen(port, () => console.log(`App de ejemplo escuchando el puerto ${port}!`))
