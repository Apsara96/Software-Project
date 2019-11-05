const Request_developer = require("../models/Request_developer")
const Project = require("../models/Project")
const User = require("../models/User")
const Conirmed_project = require("../models/Confirmed_project")

exports.send_request = (req, res) => {
    const requestData = {
        client_ID: req.body.client_ID,
        project_ID: req.body.project_ID,
        developer_ID: req.body.developer_ID,
        isViewed: req.body.isViewed,
        isAccepted: req.body.isAccepted,
        isViewedByCli: false
    }

    Request_developer.create(requestData)
        .then(request => {
            res.json(request)
        })
        .catch(err => {
            res.send('error:' + err)
        })

}


exports.cancle_request = (req, res) => {

    Request_developer.destroy({
        where: {
            client_ID: req.body.client_ID,
            project_ID: req.body.project_ID,
            developer_ID: req.body.developer_ID
        }

    })
        .then(request => {
            if (request)
                res.json(request)
        })
        .catch(err => {
            res.send('error:' + err)
        })
}


exports.get_all_request = (req, res) => {

    Project.hasMany(Request_developer, { foreignKey: 'project_ID' })
    Request_developer.belongsTo(Project, { foreignKey: 'project_ID' })

    Request_developer.findAll({
        where: {
            client_ID: req.body.client_ID,
            developer_ID: req.body.developer_ID
        },
        include: [Project]
    })
        .then(request => {
            if (request)
                res.json(request)
        })
        .catch(err => {
            res.send('error:' + err)
        })

}


exports.count_request = (req, res) => {

    Request_developer.count({
        where: {
            isViewed: false,
            developer_ID: req.body.developer_ID
        }
    })
        .then(request => {
            res.json(request)
        })
        .catch(err => {
            res.send('error:' + err)
        })
}



exports.new_all_request = (req, res) => {

    User.hasMany(Request_developer, { foreignKey: 'client_ID' })
    Request_developer.belongsTo(User, { foreignKey: 'client_ID' })

    Project.hasMany(Request_developer, { foreignKey: 'project_ID' })
    Request_developer.belongsTo(Project, { foreignKey: 'project_ID' })

    Request_developer.findAll({
        where: {
            isViewed: false,
            developer_ID: req.body.developer_ID
        },
        include: [{
            model: User
        }, { model: Project }
        ]
    })
        .then(request => {
            res.json(request)
        })
        .catch(err => {
            res.send('error:' + err)
        })
}



exports.old_all_request = (req, res) => {

    User.hasMany(Request_developer, { foreignKey: 'client_ID' })
    Request_developer.belongsTo(User, { foreignKey: 'client_ID' })

    Project.hasMany(Request_developer, { foreignKey: 'project_ID' })
    Request_developer.belongsTo(Project, { foreignKey: 'project_ID' })

    Request_developer.findAll({
        where: {
            isViewed: true,
            developer_ID: req.body.developer_ID
        },
        include: [{
            model: User
        }, { model: Project }
        ]
    })
        .then(request => {
            res.json(request)
        })
        .catch(err => {
            res.send('error:' + err)
        })
}


exports.view_request = (req, res) => {

    User.hasMany(Request_developer, { foreignKey: 'client_ID' })
    Request_developer.belongsTo(User, { foreignKey: 'client_ID' })

    Project.hasMany(Request_developer, { foreignKey: 'project_ID' })
    Request_developer.belongsTo(Project, { foreignKey: 'project_ID' })

    Request_developer.findOne({
        where: {
            id: req.body.notification_ID,
            developer_ID: req.body.developer_ID
        },
        include: [{
            model: User
        }, { model: Project }
        ]
    })
        .then(request => {
            Request_developer.update({
                isViewed: true
            }, {
                where: {
                    id: req.body.notification_ID
                }
            })
            res.json(request)
        })
        .catch(err => {
            res.send('error:' + err)
        })

}



exports.accept_req_dev = (req, res) => {

    const confirm_details = {
        developer_ID: req.body.developer_ID,
        project_ID: '',
        category: 'dev',
        isCompleted: false
    }


    Request_developer.findOne({
        where: {
            id: req.body.notification_ID
        }
    })
        .then(result => {

            Project.findOne({
                where: {
                    id: result.project_ID
                }
            })
                .then(project => {
                    if (project.isShowed == true) {


                        confirm_details.project_ID = result.project_ID

                        Request_developer.update({
                            isAccepted: true,
                            isViewdByCli: false
                        }, {
                            where: {
                                id: req.body.notification_ID,
                                developer_ID: req.body.developer_ID
                            }
                        })

                        Conirmed_project.create(confirm_details)

                        Project.update({
                            isShowed: false
                        }, {
                            where: {
                                id: result.project_ID
                            }
                        })

                        res.json({success:1})

                    }else{
                        res.json({success:0})
                    }
                })
        })
        .catch(err => {
            res.send('error:' + err)
        })
}



exports.new_all_acception = (req, res) => {

    User.hasMany(Request_developer, { foreignKey: 'developer_ID' })
    Request_developer.belongsTo(User, { foreignKey: 'developer_ID' })

    Project.hasMany(Request_developer, { foreignKey: 'project_ID' })
    Request_developer.belongsTo(Project, { foreignKey: 'project_ID' })

    Request_developer.findAll({
        where: {
            isAccepted: true,
            isViewedByCli: false,
            client_ID: req.body.client_ID
        },
        include: [{
            model: User
        }, { model: Project }
        ]
    })
        .then(request => {
            res.json(request)
        })
        .catch(err => {
            res.send('error:' + err)
        })
}


exports.old_all_acception = (req, res) => {

    User.hasMany(Request_developer, { foreignKey: 'developer_ID' })
    Request_developer.belongsTo(User, { foreignKey: 'developer_ID' })

    Project.hasMany(Request_developer, { foreignKey: 'project_ID' })
    Request_developer.belongsTo(Project, { foreignKey: 'project_ID' })

    Request_developer.findAll({
        where: {
            isAccepted: true,
            isViewedByCli: true,
            client_ID: req.body.client_ID
        },
        include: [{
            model: User
        }, { model: Project }
        ]
    })
        .then(request => {
            res.json(request)
        })
        .catch(err => {
            res.send('error:' + err)
        })
}


exports.count_accept = (req, res) => {

    Request_developer.count({
        where: {
            isAccepted: true,
            isViewedByCli: false,
            client_ID: req.body.client_ID
        }
    })
        .then(request => {
            res.json(request)
        })
        .catch(err => {
            res.send('error:' + err)
        })
}


exports.view_dev_accept = (req, res) => {

    User.hasMany(Request_developer, { foreignKey: 'developer_ID' })
    Request_developer.belongsTo(User, { foreignKey: 'developer_ID' })

    Project.hasMany(Request_developer, { foreignKey: 'project_ID' })
    Request_developer.belongsTo(Project, { foreignKey: 'project_ID' })

    Request_developer.findOne({
        where: {
            id: req.body.notification_ID,
            client_ID: req.body.client_ID
        },
        include: [{
            model: User
        }, { model: Project }
        ]
    })
        .then(request => {
            Request_developer.update({
                isViewedByCli: true
            }, {
                where: {
                    id: req.body.notification_ID
                }
            })
            res.json(request)
        })
        .catch(err => {
            res.send('error:' + err)
        })

}



exports.view_developer_request = (req, res) => {

    User.hasMany(Request_developer, { foreignKey: 'developer_ID' })
    Request_developer.belongsTo(User, { foreignKey: 'developer_ID' })

    Request_developer.findAll({
        where: {
            project_ID: req.body.id
        },
        include: [User]
    })
        .then(result => {
            res.json(result)
        })

}


