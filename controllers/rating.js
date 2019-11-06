const rating = require('../models/rating')
const user = require('../models/User')
const cliFeedback = require('../models/cli_feedback')
const devFeedback = require('../models/dev_feedback')
const Project = require('../models/Project')
const Conf_pro = require('../models/Confirmed_project')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken")
//newRating
exports.rateUser = (req,res)=>{

    rating.findOne({

        where : {
            dev_Id : req.body.dev_Id
        }
    }).then(result =>{
         rating.update({
            total_rating : Number(result.total_rating)+Number(req.body.rating),
            rated_times : result.rated_times+1
         },{
             where :{
                 dev_id : req.body.dev_Id
             }
         }).then(res=>{
            console.log((Number(result.total_rating)+Number(req.body.rating))/(Number(result.rated_times)+1))
            user.update({
                rating : (Number(result.total_rating)+Number(req.body.rating))/(Number(result.rated_times)+1)
            },{
                where :{
                    id : req.body.dev_Id
                }
            })
         })
         
         res.send('1');
    }).catch(err=>{
        res.send(err);
    })


}


exports.sendFeedback = (req,res)=>{

    feedbackData = {
        project_ID: req.body.project_ID,
        client_ID: req.body.client_ID,
        developer_ID: req.body.developer_ID,
        feedback: req.body.editorData
    }

    cliFeedback.create(feedbackData)
    .then(feedback=>{

        Project.update({
            isCompleted: true
        },{
            where:{
                id:req.body.project_ID
            }
        })

        Conf_pro.update({
            isCompleted:true
        },{
            where:{
                project_ID:req.body.project_ID
            }
        })

        res.json({success:1})
    })
    .catch(err =>{
        res.send('error:'+err)
    })
}


exports.getFeedback = (req,res)=>{

    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    user.hasMany(cliFeedback,{ foreignKey: 'client_ID'})
    cliFeedback.belongsTo(user,{foreignKey:'client_ID'})

    cliFeedback.findAll({
        where:{
            developer_ID:decoded.id
        },include:[user]
    })
    .then(feedback=>{
        res.json(feedback)
    })
    .catch(err =>{
        res.send('error:'+err)
    })
}


exports.devsendFeedback = (req,res)=>{

    feedbackData = {
        project_ID: req.body.project_ID,
        client_ID: req.body.client_ID,
        developer_ID: req.body.developer_ID,
        feedback: req.body.editorData
    }

    devFeedback.create(feedbackData)
    .then(feedback=>{
        res.json({success:1})
    })
    .catch(err =>{
        res.send('error:'+err)
    })
}



exports.cligetFeedback = (req,res)=>{

    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    user.hasMany(devFeedback,{ foreignKey: 'developer_ID'})
    devFeedback.belongsTo(user,{foreignKey:'developer_ID'})

    devFeedback.findAll({
        where:{
            client_ID:decoded.id
        },include:[user]
    })
    .then(feedback=>{
        res.json(feedback)
    })
    .catch(err =>{
        res.send('error:'+err)
    })
}
