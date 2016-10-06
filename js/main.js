$(document).ready(function() {
    var seconds = 09;
    var minutes = 01;
    var timer;
    var game = 0;
    var difficulty;
    var menuPath = "images/";
    var events = [];
    var board = document.querySelector("table.main");
    var gameSquares = {
      all : [],
      shuffled : [],
      defaultSquare : "images/rc-crown02-01.png"
    } ;

    var soundBank = ["audio/correct.mp3", "audio/buzz.mp3", "audio/flip.mp3"];

    var images = ["images/canin/rotated-EXI-SAV-FHN-PACKSHOT.jpg","images/canin/rotated-GER-AD-BHN-PACKSHOT[1].jpg", "images/canin/rotated-GI-AD-SHN-PACKSHOT.jpg", "images/canin/rotated-GI-JU-SHN-PACKSHOT.jpg", "images/canin/rotated-KIT-FHN-PACKSHOT.jpg", "images/canin/rotated-MA-AD5-SHN-PACKSHOT.jpg", "images/canin/rotated-MA-AD-SHN-PACKSHOT.jpg", "images/canin/rotated-MA-JU-SHN-PACKSHOT.jpg", "images/canin/rotated-MA-LIGHT-SHN-PACKSHOT.jpg", "images/canin/rotated-MED-AD7-SHN-PACKSHOT.jpg", "images/canin/rotated-MED-AD-SHN-PACKSHOT.jpg", "images/canin/rotated-MED-JU-SHN-PACKSHOT.jpg", "images/canin/rotated-MI-AD8-SHN-PACKSHOT.jpg", "images/canin/rotated-MI-ADULT-PACKSHOT.jpg", "images/canin/rotated-MI-JUNIOR-PACKSHOT.jpg", "images/canin/rotated-PERS-AD_PACKSHOT-INT.jpg", "images/canin/rotated-POOD-AD_PACKSHOT.jpg", "images/canin/rotated-SENS-FHN-PACKSHOT.jpg","images/canin/rotated-SIAM-AD_PACKSHOT-INT.jpg", "images/canin/rotated-YORK-AD_PACKSHOT.jpg" ];//"http://i.imgur.com/KhO2nKe.png", "http://i.imgur.com/pO3SzMI.png", "http://i.imgur.com/4C09MgI.png", "http://i.imgur.com/6SmEKyE.png", "http://i.imgur.com/PDiJ1bI.png", "http://i.imgur.com/kiGZUg9.png", "http://i.imgur.com/iulLxpL.png", "http://i.imgur.com/qx1iJGX.png", "http://i.imgur.com/6ZyLN4N.png", "http://i.imgur.com/rcQdCMB.png", "http://i.imgur.com/8UPS2ND.png", "http://i.imgur.com/kWTskjm.png", "http://i.imgur.com/Zh5aOVc.png", "http://i.imgur.com/TXlGnXu.png", "http://i.imgur.com/eP8jwB7.png", "http://i.imgur.com/Bhdhiwo.png", "http://i.imgur.com/uhhC62q.png", "http://i.imgur.com/efWUnPg.png"];

    document.PlayerName = 'Anónimo';
    document.gameover = 0;
    document.corona = 0;
    var level = [{
      row: 2, // test grid
      col: 2,
      grid: 4
    },{
      row: 4,
      col: 4,
      grid: 16
    }, {
      row: 4,
      col: 5,
      grid: 20
    },{
      row: 5,
      col: 6,
      grid: 30
    },{
      row: 6,
      col: 6,
      grid: 36
    }
  ];

  $("#download a").on("click", function(){
    $(".left").empty();
    $(".left").append('<h2 class="msg">Play Again Tomorrow for a chance to win another coupon.</h2>');
  });

  // play again button
  $(".again").on("click", function(){
    showResults();
  });

  // Show hide game rules
  $(".new").on("click", function(){
    //$(".menu").fadeIn(1500);
    //$(".scoreBoard").fadeIn(1500);
    $(".menu").fadeOut('slow');
    $(".scoreBoard").fadeOut('slow');
    gameRules();
    showResults();
    $("table.main tr").remove().fadeOut('slow');
  });

    $(".start").on("click", function(){
    if( $('#name').val().length>=1 ){
      document.PlayerName = document.getElementById("name").value;
    }
    $(".menu").fadeIn('slow');
    $(".scoreBoard").fadeIn('slow');
  });

    $(".alt-button").on("click", function(){
      $('input:text').val('');
    });


  // gets difficulty level
  $(".menu .button").on("click", function(){
    var remove = true;
    if ($(".intro").css('display', 'block')){gameRules(remove);}
    showResults();
    newGame();
  });

  function showResults(){
    $(".results").fadeOut('fast');
  }

  function gameRules(val){
    if (val == null) {
      $(".intro").fadeToggle('fast');
    }else {
      $(".intro").hide();
    }
  }

  function results(time){
    $(".stat-time").text(time);
    $(".results").fadeIn('slow');
  }

  // sets a new game
  function newGame(){
    $("table.main tr").remove().fadeOut('slow');
    gameSquares.all = [];
    gameSquares.shuffled = [];
    setTimer();
    difficulty = $(event.target).attr("id");
    makeBoard(level[difficulty]);
  }

  // check to see if value has already been pulled form array
  function compare(num, array){
    if(array.all.indexOf(num) > -1) {
      var num2 = images[Math.floor(Math.random() * images.length)];
      compare(num2, array);
    } else {
      array.all.push(num);
      array.shuffled.push(num);
    }
  }

  function setImages(num){
    var i = 0;
    while(i < num.grid/2){
      var rand = images[Math.floor(Math.random() * images.length)];
      compare(rand, gameSquares);
      i++;
    }
  }

  //create gameboard
  function makeBoard(size){
    cellID = 1;
    for (var i = 0; i < size.row; i++) {
      $("table.main").append('<tr id="row' + (i+1) + '"></tr>');
      for (var j = 0; j < size.col; j++) {
        $("#row" + (i+1)).append('<td id="' + cellID + '"></td>');
        cellID++;
      }
    }
    // scale grind smaller to keep in view
    if (size.grid === 30){
      $("table.main td").css({
        "height": "130px",
        "width" : "130px"
      });
    } else if (size.grid === 36) {
      $("table.main td").css({
        "height": "110px",
        "width" : "110px"
      });
    }
    setImages(size);
    gameSquares.shuffled = shuffle(gameSquares.shuffled);
  }

  //perform action on clicked square
  board.addEventListener("click", timerClickEvent);
  board.addEventListener("click", gameClickEventHandler);

  function gameClickEventHandler(){
    var target = $(event.target);
    if (target.attr("class") != "main"){
      target.addClass('flipped picked').css('background-image', "url(" + checkSquareID(target) + ")");
      var flipSnd = new Audio(soundBank[2]);
      flipSnd.play();
      events.push(target);
      checkSquareID(target);
      if (events.length === 1){
        if($("table.main td").hasClass("picked")){
          
        }
      }

      if (events.length === 2){
        board.removeEventListener("click", gameClickEventHandler);
        setTimeout(function(){ // delay to show flip actions
          var set = checkForMatch(events);
          if (set === true){
            events = [];
            if($("table.main td").not(".flipped").length >= 1) {
              var correctSnd = new Audio(soundBank[0]);
              correctSnd.play();
            }
            board.addEventListener("click", gameClickEventHandler);
          } else {
              var buzzSnd = new Audio(soundBank[1]);
              buzzSnd.play();
              events[0].removeClass('flipped picked').css("background-image", "url(" + gameSquares.defaultSquare + ")");
              events[1].removeClass('flipped picked').css("background-image", "url(" + gameSquares.defaultSquare + ")");
              events = [];

            board.addEventListener("click", gameClickEventHandler);
          }
        }, 700);
      }
      if ( (document.gameover === 1) || (!$("table.main td").not(".flipped").length) ) {
        endGame();
      }
    }
  }

  // updates game timer
  var updateTimer = function () {
    $("h1").text('Tiempo: ' + toTwoDigit(minutes) + ":" + toTwoDigit(seconds));
    seconds--;
    if ( minutes == 0 && seconds <= 0 ) {
      document.gameover = 1;
      endGame();
    }
    if ( seconds < 0 ){
       minutes--;
       seconds = 59;
    }
  };

  function toTwoDigit(num){
    if(num<10){
        return "0"+num;
    }
    return new String(num);
    }

  function timerClickEvent(){
    timer = setInterval(updateTimer, 1000);
    board.removeEventListener("click", timerClickEvent);
  }

  // Determines when the game is over and resets the board
  function endGame(){
    var allCells = $("table.main td");
    if((!$("table.main td").not(".flipped").length) || (document.gameover === 1)) {
      var loveSnd = new Audio(soundBank[0]);
      loveSnd.play();
      reset(allCells);
    }
  }

  function reset(cells){
    scoreBoard();
    cells.removeClass('flipped').css("background-image", "url(" + gameSquares.defaultSquare + ")");
    $("table.main tr").remove().fadeOut('fast');
    gameSquares.all = [];
    gameSquares.shuffled = [];
    document.gameover = 0;
    document.crowns = 0;
    setTimer();
    $(".menu").fadeOut('slow');
    $(".scoreBoard").fadeOut('slow');
  }

  function setTimer(){
    clearInterval(timer);
    seconds = 09;
    minutes = 01;
    $("h1").text("Tiempo: 01:10");
    board.addEventListener("click", timerClickEvent);
  }

  function scoreBoard(){
    document.crowns = (($(".flipped").length)/2);
    var crown = '<img id="crown" src="images/rc-crown-84x43.png" alt="">';
    var timeTable = $(".slot");
    var endTime = toTwoDigit(minutes) + ":" + toTwoDigit(seconds-1);
    var Result = document.crowns + ' ';
    var ScoreResult = document.PlayerName + ':  ' + Result;
    timeTable.eq(game).html(ScoreResult + '<img id="crowni" src="images/crownI.svg" alt="">');
    results(Result) ;
    $(".stat-time").append(crown);
    game++;
    if (game === 4) {game = 0;}

  }
  // gets the id of the click square and sets it bg image
  function checkSquareID(eventObject){
    var id = $(eventObject).attr('id') - 1;
    if (id < level[difficulty].grid/2){
      return gameSquares.all[id];
    }else{
      return gameSquares.shuffled[id-level[difficulty].grid/2];
    }
  }

  // checks bg-image for a match
  function checkForMatch(eventsArray){
    if (eventsArray[0].css("background-image") === eventsArray[1].css("background-image") && (($(".flipped").length)%2 == 0)){
      return true;
    } else {
      return false;
    }
  }

  //shuffles second image array
  function shuffle(array) {
   var j, k;
   var temp;
   for (j = 0; j < array.length; j++) {
     k = Math.floor(Math.random() * array.length);
     temp = array[j];
     array[j] = array[k];
     array[k] = temp;
   }
   return array;
}


});
