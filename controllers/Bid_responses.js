const Bid_response = require("../models/Bid_response")
const Project= require("../models/Project")
const User= require("../models/User")

exports.send_bid = (req,res)=>{
    const bidResponseData = {
        developer_ID:req.body.developer_ID,
        project_ID:req.body.project_ID,
        bid_value:req.body.bid_value,
        isViewed: req.body.isViewed,
        isAccepted: req.body.isAccepted
        
    }
    
     Bid_response.create(bidResponseData)

     .then(bid=>{
        res.json(bid)
    })
    .catch(err =>{
        res.send('error:'+err)
    })
}


exports.get_bid = (req,res)=>{
    
    Bid_response.findOne({
        where:{
            project_ID : req.body.project_ID,
            developer_ID: req.body.developer_ID
        }
    })
     .then(bid=>{
         if(bid.bid_value != null){
            res.json(bid)
         }
    })
    .catch(err =>{
        res.send('error:'+err)
    })
    
}


exports.edit_bid = (req,res)=>{
    
    Bid_response.update({
        bid_value : req.body.bid_value

    },{
        where:{
            project_ID : req.body.project_ID,
            developer_ID: req.body.developer_ID
        }
    })

    res.json({success:1})
}


exports.delete_bid = (req,res)=>{
    
    Bid_response.destroy({
        where:{
            project_ID : req.body.project_ID,
            developer_ID: req.body.developer_ID
        }

    })

    res.json({success:1})
}


exports.count_bid_response = (req,res)=>{

    Project.hasMany(Bid_response,{foreignKey: 'project_ID'})
    Bid_response.belongsTo(Project,{foreignKey: 'project_ID'})

    Bid_response.count({
      where:{
        isViewed: false,
      },
      include:[{
          model:Project,
        where:{
            client_ID:req.body.client_ID
        }
     }]
    })
    .then(request=>{
        res.json(request)
    })
    .catch(err =>{
        res.send('error:'+err)
    })
}


exports.new_bid_response = (req,res)=>{

    Project.hasMany(Bid_response,{foreignKey: 'project_ID'})
    Bid_response.belongsTo(Project,{foreignKey: 'project_ID'})

    User.hasMany(Bid_response,{foreignKey: 'developer_ID'})
    Bid_response.belongsTo(User,{foreignKey: 'developer_ID'})

    Bid_response.findAll({
      where:{
        isViewed: false,
      },
      include:[{
          model:Project,
        where:{
            client_ID:req.body.client_ID
        }
     },{model: User}
    ]
    })
    .then(request=>{
        res.json(request)
    })
    .catch(err =>{
        res.send('error:'+err)
    })
}



exports.old_bid_response = (req,res)=>{

    Project.hasMany(Bid_response,{foreignKey: 'project_ID'})
    Bid_response.belongsTo(Project,{foreignKey: 'project_ID'})

    User.hasMany(Bid_response,{foreignKey: 'developer_ID'})
    Bid_response.belongsTo(User,{foreignKey: 'developer_ID'})

    Bid_response.findAll({
      where:{
        isViewed: true,
      },
      include:[{
          model:Project,
        where:{
            client_ID:req.body.client_ID
        }
     },{model: User}
    ]
    })
    .then(request=>{
        res.json(request)
    })
    .catch(err =>{
        res.send('error:'+err)
    })
}


exports.view_bid_response = (req,res)=>{

    Project.hasMany(Bid_response,{foreignKey: 'project_ID'})
    Bid_response.belongsTo(Project,{foreignKey: 'project_ID'})

    User.hasMany(Bid_response,{foreignKey: 'developer_ID'})
    Bid_response.belongsTo(User,{foreignKey: 'developer_ID'})

    Bid_response.findOne({
      where:{
        id:req.body.notification_ID
      },
      include:[{
          model:Project,
        where:{
            client_ID:req.body.client_ID
        }
     },{model: User}
    ]
    })
    .then(request=>{
        Bid_response.update({
            isViewed:true
        },{
            where:{
              id: req.body.notification_ID
            }
        })
        res.json(request)
    })
    .catch(err =>{
        res.send('error:'+err)
    })
}


exports.view_bid_request=(req,res)=>{

    User.hasMany(Bid_response,{foreignKey: 'developer_ID'})
    Bid_response.belongsTo(User,{foreignKey: 'developer_ID'})

    Bid_response.findAll({
        where:{
            project_ID: req.body.id
        },
        include:[User]
    })
    .then(result=>{
        res.json(result)
    })
}


exports.count_accept_bid_req = (req,res)=>{

    Project.hasMany(Bid_response,{foreignKey: 'project_ID'})
    Bid_response.belongsTo(Project,{foreignKey: 'project_ID'})

    Bid_response.count({
      where:{
        isViewedAccept: false,
        isAccepted: true,
        developer_ID: req.body.developer_ID
      }
    })
    .then(_count=>{
        res.json(_count)
    })
    .catch(err =>{
        res.send('error:'+err)
    })
}


exports.new_all_acc_bid_req = (req,res)=>{

    Project.hasMany(Bid_response,{foreignKey: 'project_ID'})
    Bid_response.belongsTo(Project,{foreignKey: 'project_ID'})

    User.hasMany(Project,{foreignKey: 'client_ID'})
    Project.belongsTo(User,{foreignKey: 'client_ID'})

    Bid_response.findAll({
        where:{
            developer_ID: req.body.developer_ID,
            isAccepted: true,
            isViewedAccept: false
        },
        include:{
            model:Project, 
            include:{
                model:User
            }
        }
    })
    .then(result=>{
        res.json(result)
    })
}


exports.old_all_acc_bid_req = (req,res)=>{

    Project.hasMany(Bid_response,{foreignKey: 'project_ID'})
    Bid_response.belongsTo(Project,{foreignKey: 'project_ID'})

    User.hasMany(Project,{foreignKey: 'client_ID'})
    Project.belongsTo(User,{foreignKey: 'client_ID'})

    Bid_response.findAll({
        where:{
            developer_ID: req.body.developer_ID,
            isAccepted: true,
            isViewedAccept: true
        },
        include:{
            model:Project,
            include:{
                model:User
            }
        }
    })
    .then(result=>{
        res.json(result)
    })
}


exports.view_acc_bid_req = (req,res)=>{

    Project.hasMany(Bid_response,{foreignKey: 'project_ID'})
    Bid_response.belongsTo(Project,{foreignKey: 'project_ID'})

    User.hasMany(Project,{foreignKey: 'client_ID'})
    Project.belongsTo(User,{foreignKey: 'client_ID'})


    Bid_response.findOne({
        where:{
            id: req.body.notification_ID
        },
        include:{
            model:Project, 
            include:{
                model:User
            }
        }
    })
    .then(result=>{

        Bid_response.update({
            isViewedAccept: true
        },{
            where:{
                id: req.body.notification_ID
            }
        })
        res.json(result)
    })
}



