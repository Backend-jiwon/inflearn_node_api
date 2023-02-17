//디비를 싱크하는 역할

//모델 가져옴
const models = require('../models');



//기존 디비 있어도 날리고 새로 만듬
//models.sequelize.sync({force: true});

//외부에서 쓰면 디비 동기화 되게 모듈(www.js에서 서버 킬때 사용)
module.exports=() =>{ 

    //test모드면 기존 디비 날리고 새로 만듬
    const options = {
        force: process.env.NODE_ENV === 'test' ? true : false
      };
      return models.sequelize.sync(options);
}

