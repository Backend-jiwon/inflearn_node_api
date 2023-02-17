//api 로직
//cashwalk 서버로 치면 서비스단 쯤?

/*
여기 있으면 서버 구동때마다 이렇게 초기화 된다.
->db로 옮긴다
var users=[
    {id:1,name:'aa'},
    {id:2,name:'bb'},
    {id:3,name:'cc'}
];
*/
const models= require('../../models');


const  index = (req, res)=> {
    req.query.limit=req.query.limit||10;
    const limit=parseInt(req.query.limit,10);
    //숫자 아니면 NaN됨
    
    if(Number.isNaN(limit))
    {
        return res.status(400).end();
    }

    
    //디비 분리 안했을때
    //res.json(users.slice(0,limit));

    
    models.User.findAll({limit: limit}).then(users=>{res.json(users);});
};

const show = (req,res)=>{

    const id=parseInt(req.params.id,10);

    if(Number.isNaN(id))
    {


        return res.status(400).end();
    }
    /* 디비 분리 안했을때
    for(var i=0,len=users.length;i<len;i++)
    {
        if(users[i].id==id) return res.json(users[i]);
    }
    return res.status(404).end();
    */
    
    models.User.findOne({
        where:{
            id
        }
    }).then(user=>{
        if(!user) return res.status(404).end();
        return res.json(user);
    })

    
};

const destroy=(req,res)=>{
    const id=parseInt(req.params.id,10);

    if(Number.isNaN(id))
    {
        return res.status(400).end();
    }
    /*디비 분리전
    for(var i=0,len=users.length;i<len;i++)
    {
        if(users[i].id==id)
        {
            users.slice(i,1);
            
        }
    }*/
    models.User.destroy({
        where:{id}
    }).then(()=> {res.status(204).end();});


    //res.status(204).end();
};

const create= (req,res)=>{
    const name=req.body.name;

    if(!name) return res.status(400).end();

    


    /*디비 분리전
    const id=Date.now();
    const user={id,name};
    for(var i=0,len=users.length;i<len;i++)
    {
        if(users[i].name===name)
        {
            return res.status(409).end();
        }
    }
    users.push(user);
    res.status(201).json(user);
    */

    
    models.User.create({name}) 
        .then(user=>{
            
            //console.log(name);
            res.status(201).json(user);
        })
            
        .catch(
            err =>{

            //console.log(err.message);
            //res.json('errrrrr');
            if (err.name === 'SequelizeUniqueConstraintError')  {
                return res.status(409).end();
              };
              res.status(500).end();
        })
    
    
};

const update = (req,res)=>{
    const id=parseInt(req.params.id,10);//,newname=req.query.newname;

    console.log(req.params.id);
    if(Number.isNaN(id))
    {
        return res.status(400).end();
    }
    const name =req.body.name;
    if(!name) return res.status(400).end();

    /*
    디비 안뺄때
    for(var i=0,len=users.length;i<len;i++)
    {
        if(id===users[i].id)
        {
            for(var j=0;j<len;j++)
            {
                if(users[j].name===newname)
                {  
                    return res.status(409).end();
                }
            }
            
            users[i].name=newname;
            return res.json(users[i]);
        }
    }
    */
    
    
    models.User.findOne({where:{id}}).then(user=>{
        if(!user) return res.status(404).end();

        user.name=name;
        user.save().then(_=>{
            res.json(user);
        })
        .catch(err=>{
            if (err.name === 'SequelizeUniqueConstraintError')  {
                return res.status(409).end();
              }
              res.status(500).end();
        })
    })
}

module.exports={
    index:index,
    show:show,
    destroy:destroy,
    create:create,
    update:update
};