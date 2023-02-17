//서버를 실행!
const app =require('../index');
const port = 3000;


/*
//서버를 킨다.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
*/



//디비 동기화하고 서버를 킨다
const syncDb =require('./sync-db');
syncDb().then(_=>{
  console.log('Sync database!');
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})



