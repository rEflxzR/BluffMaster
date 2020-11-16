const express = require('express')
const app = express()
const port2 = process.env.PORT || 8000
const cors = require('cors')
const questions = require('./questions')
const bodyParser = require('body-parser');
const uuid = require('uuid');


// GAME PARAMETERS
const maxplayers = 6
let currentplayers = 0
let PlayersId = {}
let blacklistPlayesId = {}
let currentQuestionNumber = 0
let gamepin = null
let adminId = uuid.v4()
let teamNamesInUse = []
let pollActive = false

// CURRENT PLAYER PARAMETERS
let playerScores = {}
let playerVotes = {}
let playersVoted = {}
let currentImposter = null

// CURRENT QUESTION PARAMETERS
let currentQuestionReponse = []


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


/*------------------------------- ADMIN ROUTES ---------------------------------------*/

// ADMIN LOGIN POST ROUTE
app.post('/adminlogin', function(req, res) {
  if(req.body.username=='qlimaxz' && req.body.password=='skip2020') {
    resetBackendData()
    res.send({authenticated: true, id: adminId})
  }
  else {
    res.send({authenticated: false})
  }
})


// ADMIN NEW GAMEPIN SET POST ROUTE
app.post('/newgamepin', function(req, res) {
  if(req.body.adminId==adminId) {
    gamepin = req.body.newgamepin
  }
})

// ADMIN GAME STARTING BUTTON ROUTE
app.get('/startgame', function(req, res) {
  if(req.headers.id==adminId) {
    if(currentplayers!=maxplayers) {
      res.status(200).send({ playersJoined: currentplayers.toString() })
    }
    else {
      currentImposter = assignImposter()
      res.status(200).send(true)
    }
  }
})


// ADMIN NEXT QUESTION POST ROUTE
app.post('/nextquestion', function(req, res) {
  if(req.body.adminId==adminId) {
    if(currentQuestionNumber<10) {
      currentQuestionNumber++
      for(let id of Object.keys(playerScores)) {
        playerScores[id][0] = true
      }
      currentQuestionReponse = []
      res.send(questions.questions_db[currentQuestionNumber-1])
    }
    else if(currentQuestionNumber==10) {
      res.status(200).send(topThreeTeams())
    }
  }
  else {
    res.status(406).send("TRESSPASSERS ARE NOT WELCOME!!!")
  }
})


// ADMIN PLAYER REPONSE DISPLAY ROUTE
app.get('/getresponse', function(req, res) {
  res.send(currentQuestionReponse[currentQuestionReponse.length-1])
})


// ADMIN SCOREBOARD DISPLAY ROUTE
app.get('/scoreboard', function(req, res) {
  if(req.headers.id===adminId) {
    res.send(playerScores)
  }
})

// ADMIN TOGGLE POLL ON/OFF ROUTE
app.post('/togglepolls', function(req, res){
  if(req.body.adminId==adminId) {
    for(let id of Object.keys(PlayersId)) {
      playerVotes[id] = [PlayersId[id], 0]
    }
    pollActive = true
  }
})

// ADMIN POLL RESULTS FETCH ROUTE
app.get('/pollresults', function(req, res) {
  if(req.headers.id===adminId) {
    res.status(200).send(playerVotes)
  }
  else {
    res.status(406).send("UNAUTHORIZED ACCESS IS NOT ALLOWED")
  }
})

// ADMIN POLL RESET COMMAND ROUTE
app.post('/pollreset', function(req, res) {
  if(req.body.adminId===adminId) {
    playerVotes = {}
    for(let id of Object.keys(PlayersId)) {
      playerVotes[id] = [PlayersId[id], 0]
    }
    playersVoted = {}
    res.status(200).send(playerVotes)
  }
})

// ADMIN POLL ACCEPTION ROUTE
app.post('/pollsubmit', function(req, res){
  if(req.body.adminId===adminId) {
    const kickedTeamId = maxVotedPlayerId()
    const kickedTeamname = PlayersId[kickedTeamId]
    blacklistPlayesId[kickedTeamId] = true
    delete PlayersId[kickedTeamId]
    if(currentImposter==kickedTeamId) {
      currentImposter = assignImposter()
    }
    res.status(200).send(kickedTeamname)
  }
})




/*------------------------------- PLAYER ROUTES ---------------------------------------*/

// PLAYER LOGIN POST ROUTE
app.post('/playerlogin', function(req, res) {
  if(Number(req.body.gamepin)==gamepin 
    && teamNamesInUse.indexOf(req.body.teamname)==-1 
    && currentplayers<maxplayers) {
    currentplayers++
    let pId = uuid.v4()
    PlayersId[pId] = req.body.teamname
    playerScores[pId] = [false, 0, req.body.teamname]
    teamNamesInUse.push(req.body.teamname)
    res.send({authenticated: true, playerId: pId})
  }
  else {
    res.status(406).send(false)
  }
})


// PLAYER NEXT QUESTION GET ROUTE
app.get('/questions', function(req, res) {
  if(req.headers.authorization=='dGFza2ZvcmNlMTQx' 
    && playerScores[req.headers.id][0] && blacklistPlayesId[req.headers.id]==undefined ) {
    if(req.headers.id===currentImposter) {
      res.status(200).send({qdata: questions.questions_db[currentQuestionNumber-1], doShuffle: false})
    }
    else {
      res.status(200).send({qdata: questions.questions_db[currentQuestionNumber-1], doShuffle: true})
    }
  }
  else if(blacklistPlayesId[req.headers.id]) {
    res.status(401).send("UNAUTHORIZED ACCESS NOT ALLOWED!!!")
  }
  else {
    res.status(204).send("NO DATA CAN BE SENT YET")
  }
})


// PLAYER RESPONSE SUBMIT POST ROUTE
app.post('/playerresponse', function(req, res) {
  if(currentQuestionReponse.indexOf(req.body.answer.value)==-1) {
    playerScores[req.body.playerId][1] += Number(req.body.answer.points)
    currentQuestionReponse.push(req.body.answer.value)
    playerScores[req.body.playerId][0] = false
    res.status(200).send("OPTION REGISTERED SUCCESSFULLY")
  }
  else {
    res.status(406).send("OPTION ALREADY SELECTED")
  }
})

// PLAYER POLL DISPLAY ROUTE
app.get('/playerpoll', function(req, res) {
  if(blacklistPlayesId[req.headers.id]==undefined && pollActive && playersVoted[req.headers.id]==undefined) {
    res.status(200).send(PlayersId)
  }
  else if(blacklistPlayesId[req.headers.id]!=undefined) {
    res.status(401).send("UNAUTHORIZED ACCESS NOT ALLOWED!!!")
  }
  else {
    res.status(206).send("NOT YET")
  }
})

// PLAYER POLL RESPONSE SUBMISSION ROUTE
app.post('/pollresponse', function(req, res){
  if(blacklistPlayesId[req.body.playerId]==undefined && playersVoted[req.body.playerId]==undefined) {
    playerVotes[req.body.response][1] += 1
    playersVoted[req.body.playerId] = true
    res.status(200).send("OK")
  }
})

app.listen(port2, () => {
  console.log("API Server Up and Running")
})




/*------------------------------- AUXILARY FUNCTION(S) ---------------------------------------*/

function assignImposter() {
  return Object.keys(PlayersId)[Math.floor(Math.random()*Object.keys(PlayersId).length)]
}


function maxVotedPlayerId() {
  let maxVotesId = null
  let maxVotes = 0
  for(let id of Object.keys(playerVotes)) {
    if(Number(playerVotes[id][1]) > maxVotes) {
      maxVotesId = id
      maxVotes = Number(playerVotes[id][1])
    }
  }

  return maxVotesId
}


function resetBackendData() {
    currentplayers = 0
    PlayersId = {}
    blacklistPlayesId = {}
    currentQuestionNumber = 0
    gamepin = null
    adminId = uuid.v4()
    teamNamesInUse = []
    pollActive = false
    playerScores = {}
    playerVotes = {}
    playersVoted = {}
    currentImposter = null
    currentQuestionReponse = []
}


function topThreeTeams() {
  let arr = []
  for(let team of Object.keys(playerScores)) {
    arr.push([...playerScores[team]])
  }
  arr.sort((a, b) => {
    return b[1]-a[1]
  })

  return [arr[0], arr[1], arr[2]]
}