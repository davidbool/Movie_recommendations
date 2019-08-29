const express = require( 'express' )
const app = express()
const path = require( 'path' )
const bodyParser = require( 'body-parser' )
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( express.static( path.join( __dirname, 'dist' ) ) )
const api = require( './api' )
const User = require('./modules/User')
app.use( '/', api )




const PORT=3000
app.listen( process.env.PORT || PORT, () => console.log( `Running server on port ${ PORT }` ) )