// TODO: make it so when player scores they gain a point and Ai scores substract a point, if you get to 10 points you win


//variables
var round = 0
var msg = ""
var playerLastMove = ""
var aiLastMove = ""
var playerScore = 0
var aiScore = 0
var moves = ["rock", "paper", "scissors"]
var playerRounds = []
var aiRounds = []
var messages = {
  tie: "Tie!",
  playerScores: "You scored!",
  aiScores: "Point for AI!",
  playerWin: "You won! grats!",
  aiWon: "Emm, maybe you'll do best next time?"
}

//UI
var loader = $(".spinner")

$(".play-button").on("click", function() {
  $(".intro").toggle()
  $(".board").fadeToggle()
})


$(document).on("click", ".gui-button.player-button:not(.disabled)", turn)

function turn() {
  firstRound = false
  console.clear()
  $(".message-board, .spinner").fadeIn(500,"linear")
  $(this).addClass("active");
  $(this).addClass("disabled")
  playerLastMove = $(this).attr("move");
  playerRounds.push(playerLastMove)
  aiMove();
  scoreRound()
  setTimeout( resetTurn, 2000);
}

function resetTurn() {
  $(".message-board, .spinner").fadeOut(500,"linear", function(){
    $(".message-board").text("")
    $(".gui-button.player-button.disabled").removeClass("disabled active");
  })

}

//intelligence
function randomize(sides) {
  die = Math.floor(Math.random() * sides);
  return die;
}

function think() {
  if (randomize(10)>1 && !firstRound) {
    console.log("thinking");
    aiLastMove = playerRounds[playerRounds.length-1]
    /*
    switch (playerLastMove) {
      case "rock":
        aiLastMove = "paper"
        break;
      case "paper":
        aiLastMove = "scissors"
        break;
      default:
        aiLastMove = "rock"
    */
  } else {
    console.log("random");
    aiLastMove = moves[randomize(3)]
  }
  return aiLastMove;
}

function aiMove() {
  aiLastMove = think()
  aiRounds.push(aiLastMove)
  $("#ai-play .gui-button").removeClass("rock scissors paper");
  $("#ai-play .gui-button").addClass(aiLastMove);
}

//scoring
function scoreRound() {
  if (playerLastMove == aiLastMove) {
    msg = messages.tie
  } else {
    round = playerLastMove + aiLastMove
    switch (round) {
      case "rockscissors":
      case "paperrock":
      case "scissorspaper":
        playerScore++
        msg = messages.playerScores
        break;
      case "paperscissors":
      case "rockpaper":
      case "scissorsrock":
        aiScore++
        msg = messages.aiScores
        break;
    }
  }
  $(".message-board").text(msg)
  $(".player-score.score span").text(playerScore)
  $(".ai-score.score span").text(aiScore)
}
