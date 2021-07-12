const express = require('express');
const process = require('process')
const bodyParser = require('body-parser')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path')

const db = require('./db')
const package = require('./package.json');
const env = require('../configs/server_conf.json')
const anash = require('./anash')
const families = require('./families')
const app = express();
const port = 8070 

// backup.backup()

const options = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
};

const sessionStore = new MySQLStore(options);

const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 hour
app.use(session({
  store: sessionStore,
  secret: '9SIxdzALZZSP7QeSUjWwWi9rDlcHzaxp',
  resave: true,
  saveUninitialized: true,
  cookie: {
      //secure: true,
      //httpOnly: true,
      expires: expiryDate      
  }
}));




const server = require('http').createServer(app);

let msg = `${package.description} listening at port ${port}`
server.listen(port, () => { console.log( msg ); })





const set_content_type = function (req, res, next) 
{
	if ( /^\/api\//.test( req.url))
		res.setHeader("Content-Type", "application/json; charset=utf-8");
	next()
}



app.use( set_content_type );

// Error-handling middleware
app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }
    res.status(500);
    res.send('500: Internal server error. ' + err);
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    // process.exit(1);
  });


// Support for POST 
app.use( bodyParser.json({limit: '5mb'}) );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
  limit: '5mb'
})); 


const api = express.Router()

api.get('/anash/list', (req, res) => { anash.getAnashList(req, res)})
api.get('/person/:id', (req, res) => { anash.getPersonData(req, res)})
api.get('/kvitle/person/:id', (req, res) => { anash.getkvitleData(req, res)})
api.post('/person/add', (req, res) => { anash.addPerson(req, res)})
api.post('/person/update', (req, res) => { anash.updatePerson(req, res)})


api.get('/families/list', (req, res) => { families.getFamiliesList(req, res)})
api.get('/family/:id', (req, res) => { families.getFamilyData(req, res)})
api.get('/familyChildren/:id', (req, res) => { families.getFamilyOffsprings(req, res)})
api.get('/family/phone/:phone', (req, res) => { families.getFamilyByPhone(req, res)})
api.get('/kvitle/family/:id', (req, res) => { families.getkvitleData(req, res)})
api.post('/family/add', (req, res) => { families.addFamily(req, res)})
api.post('/family/update', (req, res) => { families.updateFamily(req, res)})

app.use('/api', api);

app.use('/', express.static(path.join(__dirname, '../client/dist/client')));
app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../client/dist/client/index.html'));
});





