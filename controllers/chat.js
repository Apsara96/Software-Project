const chat = require('../models/chat')
const chatList = require("../models/chat_list")
const Sequelize = require('sequelize')
const Op = Sequelize.Op;



exports.loadMsgHis = (req,res) =>{
  chat.findAll({
     
    where: {
        [Op.or]:[{[Op.and]:[{from_id :req.body.sendId},{to_id :req.body.recId}]},
                 {[Op.and]:[{from_id :req.body.recId},{to_id :req.body.sendId}]}]
       
    }   
     
   }).then(result=>{
        res.json(result)
        
    })

    chatList.update({
        count : 0
       },{where:{
         u_id :   req.body.recId,
         friend_id:  req.body.sendId
       }})


       chat.update({
        isViewed : true
    },{
        where : {
            from_id : req.body.sendId,
            to_id :  req.body.recId,
            isViewed : false
        }
    }
    )
}

exports.deleteMsgs = (req,res) =>{
    chat.destroy({
        where :{
            id : req.body.id,          
        } 
    }).then(result=>{
        console.log(result)
        res.send('1')
    }).catch(err=>{
        console.log(err)
        res.send('0');
    })

  

}

exports.countMsgs = (req,res) =>{
    chat.count({
        where :{
            from_id : req.body.userId,
            to_id : req.body.listId,
            isViewed : 0
        } 
    }).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.send('Error:'+err);
    })

  

}
exports.countNoti = (req,res)=>{
    chat.count({
        where:{
            to_id: req.body.id,
            isViewed: false
        }
    }).then(result=>{
        res.json(result)
        console.log(req.body.id+':count:'+result)
    }).catch(err=>{
        console.log("error:"+err)
    })
}

exports.updateIsViewed = (req,res) =>{
    
    chat.findOne({
        limit : 1,
        where:{
            from_id : req.body.from,
            to_id : req.body.to
        },order : [['id','DESC']]
    }).then(result=>{
         chat.update({
             isViewed:0
         },{
             where :{
                 id : result.id
             }
            }).catch(err=>{
        console.log(err);
         })
    })

    chat.count({
        where :{
            from_id :req.body.from ,
            to_id :  req.body.to,
            isViewed : 0
        } 
    }).then(result=>{
       chatList.update({
        count : result+1
       },{where:{
         u_id : req.body.to,
         friend_id:  req.body.from
       }})
    }).catch(err=>{
        console.log(err);
    })
}