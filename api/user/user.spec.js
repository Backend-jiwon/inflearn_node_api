//테스트 코드

const app=require('../../index');
const request = require('supertest');
const should=require('should');
const models = require('../../models');



describe('GET /users는', ()=> {
    const users=[
        {name:'aa'},
        {name:'bb'},
        {name:'cc'}
    ];

    //먼저 디비 동기화하고 그 상태에서 api 테스트
    before(()=>models.sequelize.sync({force:true}));
    
    //셈플 데이터를 넣어줌
    before(()=>models.User.bulkCreate(users));

    describe('성공시',()=>{

        

        it('유저 담은 배열로 응답한다',(done)=>{
            request(app).get('/users').end((err,res)=>{
                res.body.should.be.instanceOf(Array);
                done();
            })
        })
        it('최대 limit 객수만큼 응답한다',(done)=>{
            request(app).get('/users?limit=2').end((err,res)=>{
                res.body.should.have.lengthOf(2);
                done();
            });
        });
    });
    
    describe('실패시',()=>{
        it('limit이 숫자형이 아니면 400을 응답한다',(done)=>{
            request(app).get('/users?limit=two').expect(400).end(done);
        })
    })
});

describe('GET /users/:id는', ()=>{
    const users=[
        {name:'aa'},
        {name:'bb'},
        {name:'cc'}
    ];
    before(()=>models.sequelize.sync({force:true}));
    before(()=>models.User.bulkCreate(users));

    describe('성공시', ()=>{
        it('id가 1 인 유저 객체를 반환한다',(done)=>{
            request(app).get('/users/1').end((err,res)=>{
                res.body.should.have.property('id',1);
                done();
            });
        });
    });
    describe('실패시', ()=>{
        it('id가 숫자 아닌경우 400',(done)=>{
            request(app).get('/users/qwer').expect(400).end(done);
        })
        
        it('id가 없으면 404',(done)=>{
            request(app).get('/users/1234').expect(404).end(done);
        })
    })
});

describe('DELETE /users/id는', ()=>{
    const users=[
        {name:'aa'},
        {name:'bb'},
        {name:'cc'}
    ];
    before(()=>models.sequelize.sync({force:true}));
    before(()=>models.User.bulkCreate(users));

    describe('성공시',()=>{
        it('204',(done)=>{
            request(app).delete('/users/1').expect(204).end(done);
        })
    })
    describe('숫자아님',()=>{
        it('400',(done)=>{
            request(app).delete('/users/qqq').expect(400).end(done);
        })
    })
})

describe('POST /users',()=>{
    const users=[
        {name:'aa'},
        {name:'bb'},
        {name:'cc'}
        //{name:'bb'}
    ];
    before(()=>models.sequelize.sync({force:true}));
    before(()=>models.User.bulkCreate(users));

    describe('성공시', ()=>{
        let name ='daniel',body;
        //여러번 써서 body에 저장함. 먼저해야되니까 before 사용
        before(done=>{
            request(app).post('/users').send({name}).expect(201).end((err,res)=>{
                body=res.body;
                done();
            })
        })
        //비동기이 아니라 done 안씀
        it('생성된 유저 객체를 반환한다', ()=>{
            body.should.have.property('id');
        })
        it('입력한 name을 반환한다', ()=>{
            body.should.have.property('name',name)
        })
    })
    describe('실패시',()=>{
        it('name 누락 400',(done)=>{
            request(app).post('/users').send({}).expect(400).end(done);
        })
        it('name 중복시 409',(done)=>{
            request(app).post('/users').send({name:'daniel'}).expect(409).end(done);
        })
    })
})
/*
describe('PUT /users/:id',()=>{
    const users=[
        {name:'aa'},
        {name:'bb'},
        {name:'cc'}
    ];
    before(()=>models.sequelize.sync({force:true}));
    before(()=>models.User.bulkCreate(users));

    describe('성공시',()=>{
        it('변경된 name',(done)=>{
            let name='aaa';
            request(app).put('/users/3').send({name}).end((err,res)=>{
                res.body.should.have.property('name',name);
            })
            done();
        })
    })
    describe('실패시',()=>{
        it('id 정수 아님 400',(done)=>{
            request(app).put('/users/qq').expect(400).end(done);
        })
        it('이름 없음 400',(done)=>{
            request(app).put('/users/1').send({}).expect(400).end(done);
        })
        it('없는 유저면 404',(done)=>{
            request(app).put('/users/5/?newname=bbb').send({name:'foo'}).expect(404).end(done);
        })
        it('이름 중복 409',(done)=>{
            request(app).put('/users/2/?newname=bb').send({name:'bek'}).expect(409).end(done);
        })
    })
})
*/

describe('PUT /users/:id', ()=>{
    const users=[
        {name:'aa'},
        {name:'bb'},
        {name:'cc'}
    ];
    //const users = [{name: 'alice'}, {name: 'bek'}, {name: 'chris'}];
    before(()=>models.sequelize.sync({force:true}));
    before(()=>models.User.bulkCreate(users));
  
    describe('성공시',()=>{
        it('변경된 name',(done)=>{
            let name='aaa';
            request(app).put('/users/3').send({name}).end((err,res)=>{
                res.body.should.have.property('name',name);
            })
            done();
        })
    })
    describe('실패시',()=>{
        it('id 정수 아님 400',(done)=>{
            request(app).put('/users/qq').expect(400).end(done);
        })
        it('이름 없음 400',(done)=>{
            request(app).put('/users/1').send({}).expect(400).end(done);
        })
        it('없는 유저면 404',(done)=>{
            request(app).put('/users/5').send({name:'foo'}).expect(404).end(done);
        })
        /*it('이름이 중복일 경우 409을 응답한다', done=>{
            request(app)
                .put('/users/3')
                .send({name: 'bb'})
                .expect(409)
                .end(done);
          })*/
        it('이름 중복 409',(done)=>{
            request(app).put('/users/3').send({name:'bb'}).expect(409).end(done);
        })
    })
})

