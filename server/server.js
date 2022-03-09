// server.js file

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});
// var bodyParser = require('body-parser')
// var timeout = require('connect-timeout')

// // var app = express()
// app.post('/save', timeout('5s'), bodyParser.json(), haltOnTimedout, function (req, res, next) {
//   savePost(req.body, function (err, id) {
//     if (err) return next(err)
//     if (req.timedout) return
//     res.send('saved as id ' + id)
//   })
// })

// function haltOnTimedout (req, res, next) {
//   if (!req.timedout) next()
// }

// function savePost (post, cb) {
//   setTimeout(function () {
//     cb(null, ((Math.random() * 40000) >>> 0))
//   }, (Math.random() * 7000) >>> 0)
// }

// app.listen(3000)

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

 //if in production, serve client/build as static assets
 if (process.env.NODE_ENV === 'production') {
     app.use(express.static(path.join(__dirname, '../client/build')));
 };

 app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
 });

db.once('open',  () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    console.log(`GraphQL server readt at http://localhost:${PORT}${server.graphqlPath}`);
});