var express = require("express")
var cors = require('cors')

var app = express()
app.use(cors())

app.all('/',(req,res)=>{
	res.send('hello world')
})

app.listen(4000,()=>{
	console.log('server is listening on port 4000')
})
