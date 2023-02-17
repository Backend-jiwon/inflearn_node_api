//디비는 (sql 등)쿼리로 데이터 변경 조회 삭제 등등함.
//orm: 디비를 객체로 만듬. 직접 쿼리 던지는 대신 orm의 메소드 사용.
//시퀄라이저: 노드의 sql orm.
//모델: 디비 테이블을 orm으로 추상화한것.
//여기서는 User 모델 만들고 거기 메소드들로 데이터 관리


//시퀼라이저 가져옴
const Sequelize = require('sequelize');

//시퀼라이저 db와 연동
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    //테스트할때 로그가 안뜨게함
    logging:false
});

//User 테이블 만들고 속성 정의
const User = sequelize.define('User',{
    //자동 생성이라 id는 안만들어도 됨.
    //id:0,
    name:{
        type:Sequelize.STRING,
        unique:true
        //name 유일하지 않으면 에러 주게됨
        
    }
});

module.exports={Sequelize, sequelize, User};