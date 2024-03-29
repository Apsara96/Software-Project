const express = require("express")
const rating = express.Router()
const cors = require("cors")
const con_rating = require('../controllers/rating');

rating.post('/rating/rateUser',con_rating.rateUser)

rating.post('/rating/cligiveFeedback', con_rating.sendFeedback)

rating.get('/rating/devgetFeedback', con_rating.getFeedback)

rating.post('/rating/devgiveFeedback', con_rating.devsendFeedback)

rating.get('/rating/cligetFeedback', con_rating.cligetFeedback)


rating.use(cors())
module.exports = rating

