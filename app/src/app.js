require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')

const app = express()

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const fs = require('fs')
const path = require('path')
const swaggerDocument = YAML.load(path.join(__dirname,'/swagger.yaml'))

const db = require('./db')
const port = process.env.PORT || 8080
const VERSION = process.env.VERSION || '1'

app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(`/v${VERSION}`, routes)

app.get('/', (req,res)=>{
    res.send("user service is running")
})

console.log("Hello")
let server = app.listen(port , () => {
    let port = server.address().port
    console.log(`user-service version : ${VERSION}`)
    console.log('running at http://' + 'localhost' + ':' + port)

})

module.exports = server