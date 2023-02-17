const express = require('express');
const app = express();
const morgan=require('morgan');
const bodyParser = require('body-parser');
const port = 3000;
const user = require('./api/user');


if(process.env.NODE_ENV !=='test')
{
    app.use(morgan('dev'));
}

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use('/users',user);


/*
테스트할때는 서버를 2번 돌리게 된다 -> 낭비라서 지움
그런데 node index.js는 서버 구동을 안해서 아무것도 안하게 됨.
대신 bin/www.js 사용.(서버 실행 환경 별도로 나눔)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
*/

module.exports=app;