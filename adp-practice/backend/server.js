const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const request = require('request');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Access');

  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  next();
});

app.use(cors());

const port = process.env.PORT || 3000;

app.set('port', port);

app.get('/getTasks', (req,res,next)=>{
  request('https://interview.adpeai.com/api/v1/get-task', (err, res, body) => {
    console.log(res.body);
    let response = JSON.parse(res.body);
    console.log(response);
    const id = response.id;
    const operation = response.operation;
    const left = response.left;
    const right = response.right;
    let result;
    if(operation == 'subtraction') {result = left - right;}
    if(operation == 'addition') {result = left + right;}
    if(operation == 'division') {result = left / right;}
    if(operation == 'multiplication') {result = left * right;}
    if(operation == 'remainder') {result = left % right;}
    console.log('The result is: ' + result);
    request.post({url:'https://interview.adpeai.com/api/v1/submit-task', json: {"id":id, "result":result}}, (err, res, body) => {
      console.log(res.statusCode);
      if(res.statusCode == 200) {
        console.log('Successfully uploaded id and result!');
      }
      if(res.statusCode == 400) {
        console.log('Incorrect value in result; no ID specified; value is invalid');
      }
      if(res.statusCode == 500) {
        console.log('ID cannot be found');
      }
    });
  });
  return res.status(200).json({message: 'done'});
});

const server = http.createServer(app);

server.listen(port);

console.log('Server is up and running!');
