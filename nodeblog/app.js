
const path = require(`path`)
const express = require('express')
const app = express()
const exphbs = require(`express-handlebars`)
const port = 3000
const hostname = `127.0.0.1`
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate
const expressSession = require('express-session')
//const connectMongo=require('connect-mongo')
const MongoStore = require('connect-mongo');
const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
const admin=require('./routes/admin/index')
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1/nodeblog_db', {


})

/* const MongoStore = require('connect-mongo').default;
 app.use(expressSession({
    secret:'testotesto',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({clientPromise})
}))
 */

const mongostoreObj = MongoStore(expressSession)

app.use(expressSession({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  //store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/nodeblog_db'})
  store: new mongostoreObj({ mongooseConnection: mongoose.connection })
}))
//flash message midddleware



app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})

app.use(fileUpload())
app.use(express.static(`public`))
//app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('_method'))




app.engine(`handlebars`, exphbs.engine({ helpers: { generateDate: generateDate } }))
app.set(`view engine`, `handlebars`)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//display middleware,
app.use((req, res, next) => {
  const { userId } = req.session
  if (userId) {
    res.locals = {
      displayLink: true
    }
  }
  else {
    res.locals = {
      displayLink: false
    }

  }
  next()
})

app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/admin',admin)




app.listen(port, hostname, () => {
  console.log(`server calisiyor,http://${hostname}:${port}/`)
})

