// Set up the vue instance
var app = new Vue({
  el: '#app',
  data () {
    return {
      title: 'Canasta Scorecard',
      player1GoOut: false,
      player2GoOut: false,
      player1NaturalCanastaCount: 0,
      player2NaturalCanastaCount: 0,
      player1MixedCanastaCount: 0,
      player2MixedCanastaCount: 0,
      player1RedThreeCount: 0,
      player2RedThreeCount: 0,
      player1CardHandValueIsDisabled: false,
      player2CardHandValueIsDisabled: false,
      player1CardHandValueHasError: false,
      player2CardHandValueHasError: false,
      player1CardHandValue: 0,
      player2CardHandValue: 0,
      player1CardValueHasError: false,
      player2CardValueHasError: false,
      player1CardValue: 0,
      player2CardValue: 0,
      player1Score: 0,
      player2Score: 0,
      player1TotalScore: 0,
      player2TotalScore: 0,
      player1: 'Player/Team 1',
      player1New: '',
      player2New: '',
      player1Win: false,
      player2Win: false,
      player2: 'Player/Team 2',
      scores: [],
      player1Scores: [],
      player2Scores: [],
      hasError: false,
      player1TotalGameScore: 0,
      player2TotalGameScore: 0,
      year: '',
      inputPlayer1Name: false,
      inputPlayer2Name: false,
      player1NameHasError: false,
      player2NameHasError: false,
      gameOver: false,
    }
  },
  
  mounted() {
      this.year = new Date().getFullYear();
      if ((this.player1TotalScore == 0) && (this.player2TotalScore == 0)) {
        this.hasError = true;
      }
  },
  
  methods: {
    editPlayerName: function (player) {
      //this.showBackdrop();
      if (player == 'Player1') {
        this.inputPlayer1Name = true;
      } else if (player == 'Player2') {
        this.inputPlayer2Name = true;
      }
    },
    savePlayerName: function (player, p1Name) {
     
      if (p1Name == '') {
        this.player1NameHasError = true;
      } else {
        if (player == 'Player1') {
          this.player1 = p1Name;
        } else if (player == 'Player2') {
          this.player2 = p1Name;
        }
      }
    
      this.inputPlayer1Name = false;
      this.inputPlayer2Name = false;
    },
    goOut: function(player) {
       
      if ((player == 'player1') && (this.player1GoOut != true)) {
        this.player1Score=this.player1Score+100; 
        this.player1CardHandValueIsDisabled = true;
        this.makeTotalScore('player1');
        if (this.player2GoOut == true) {
          this.player2GoOut = false;
          this.player2CardHandValueIsDisabled = false;
          this.player2Score=this.player2Score-100; 
          this.makeTotalScore('player1');
        }
      } else if (player == 'player1') {
        this.player1Score=this.player1Score-100; 
        this.player1CardHandValueIsDisabled = false;
        this.makeTotalScore('player1');
      }

      if ((player == 'player2') && (this.player2GoOut != true)) {
        this.player2Score=this.player2Score+100; 
        this.player2CardHandValueIsDisabled = true;
        this.makeTotalScore('player2');
        if (this.player1GoOut == true) {
          this.player1GoOut = false;
          this.player1CardHandValueIsDisabled = false;
          this.player1Score=this.player1Score-100; 
          this.makeTotalScore('player2');
        }
      } else if (player == 'player2') {
        this.makeTotalScore('player2');
        this.player2CardHandValueIsDisabled = false;
        this.player2Score=this.player2Score-100; 
      }
      
    },
    redThreeCount: function(player, direction) {
       
      if ((player == 'player1') && (direction == 'up')) {
        if (this.player1RedThreeCount < 3) {
          this.player1Score=this.player1Score+100; 
          this.player1RedThreeCount=this.player1RedThreeCount+1;
          this.makeTotalScore('player1');
        } else if (this.player1RedThreeCount == 3) {
          this.player1Score=this.player1Score+500; 
          this.player1RedThreeCount=this.player1RedThreeCount+1;
          this.makeTotalScore('player1');
        }
      } else if ((player == 'player1') && (this.player1RedThreeCount > 0)) {
        if (this.player1RedThreeCount < 4) {
          this.player1Score=this.player1Score-100; 
          this.player1RedThreeCount=this.player1RedThreeCount-1;
          this.makeTotalScore('player1');
        } else if (this.player1RedThreeCount == 4) {
          this.player1Score=this.player1Score-500; 
          this.player1RedThreeCount=this.player1RedThreeCount-1;
          this.makeTotalScore('player1');
        }
      }

      if ((player == 'player2') && (direction == 'up')) {
        if (this.player2RedThreeCount < 3) {
          this.player2Score=this.player2Score+100; 
          this.player2RedThreeCount=this.player2RedThreeCount+1;
          this.makeTotalScore('player2');
        } else if (this.player2RedThreeCount == 3) {
          this.player2Score=this.player2Score+500; 
          this.player2RedThreeCount=this.player2RedThreeCount+1;
          this.makeTotalScore('player2');
        }
      } else if ((player == 'player2') && (this.player2RedThreeCount > 0)) {
        if (this.player2RedThreeCount < 4) {
          this.player2Score=this.player2Score-100; 
          this.player2RedThreeCount=this.player2RedThreeCount-1;
          this.makeTotalScore('player2');
        } else if (this.player2RedThreeCount == 4) {
          this.player2Score=this.player2Score-500; 
          this.player2RedThreeCount=this.player2RedThreeCount-1;
          this.makeTotalScore('player2');
        }
      }
      
    },
    canastaCount: function(player, direction, type) {
       
      let pointValue = (type == 'natural') ? 500 : 300;

      if ((player == 'player1') && (direction == 'up') && (type == 'natural')) {
        this.player1Score=this.player1Score+pointValue; 
        this.player1NaturalCanastaCount=this.player1NaturalCanastaCount+1;
        this.makeTotalScore('player1');
      } else if ((player == 'player1') && (this.player1NaturalCanastaCount > 0) && (type == 'natural')) {
        this.player1Score=this.player1Score-pointValue; 
        this.player1NaturalCanastaCount=this.player1NaturalCanastaCount-1;
        this.makeTotalScore('player1');
      }

      if ((player == 'player2') && (direction == 'up') && (type == 'natural')) {
        this.player2Score=this.player2Score+pointValue; 
        this.player2NaturalCanastaCount=this.player2NaturalCanastaCount+1;
        this.makeTotalScore('player2');
      } else if ((player == 'player2') && (this.player2NaturalCanastaCount > 0) && (type == 'natural')) {
        this.player2Score=this.player2Score-pointValue; 
        this.player2NaturalCanastaCount=this.player2NaturalCanastaCount-1;
        this.makeTotalScore('player2');
      }

      if ((player == 'player1') && (direction == 'up') && (type == 'mixed')) {
        this.player1Score=this.player1Score+pointValue; 
        this.player1MixedCanastaCount=this.player1MixedCanastaCount+1;
        this.makeTotalScore('player1');
      } else if ((player == 'player1') && (this.player1MixedCanastaCount > 0) && (type == 'mixed')) {
        this.player1Score=this.player1Score-pointValue; 
        this.player1MixedCanastaCount=this.player1MixedCanastaCount-1;
        this.makeTotalScore('player1');
      }

      if ((player == 'player2') && (direction == 'up') && (type == 'mixed')) {
        this.player2Score=this.player2Score+pointValue; 
        this.player2MixedCanastaCount=this.player2MixedCanastaCount+1;
        this.makeTotalScore('player2');
      } else if ((player == 'player2') && (this.player2MixedCanastaCount > 0) && (type == 'mixed')) {
        this.player2Score=this.player2Score-pointValue; 
        this.player2MixedCanastaCount=this.player2MixedCanastaCount-1;
        this.makeTotalScore('player2');
      }
      
    },
    makeTotalScore: function(player) {
      
      let numbers = /^[0-9]+$/;
      
      //let frog = numbers.test(this.player1CardHandValue); 
      //console.log(frog);

      if ((this.player1TotalScore == 0) && (this.player2TotalScore == 0)) {
        this.hasError = true;
      }

      if (player == 'player1') {
        (numbers.test(this.player1CardHandValue)) ? this.player1CardHandValueHasError = false : this.player1CardHandValueHasError = true;
        (numbers.test(this.player1CardValue)) ? this.player1CardValueHasError = false : this.player1CardValueHasError = true;
        if ((!this.player1CardHandValueHasError) && (!this.player1CardValueHasError)) {
          this.player1TotalScore = (this.player1Score+(parseFloat(this.player1CardValue)-parseFloat(this.player1CardHandValue)));  
          this.hasError = false;
          
        } else {
          this.player1TotalScore = '';
          this.hasError = true;
        }
      }
      if (player == 'player2') {
        (numbers.test(this.player2CardHandValue)) ? this.player2CardHandValueHasError = false : this.player2CardHandValueHasError = true;
        (numbers.test(this.player2CardValue)) ? this.player2CardValueHasError = false : this.player2CardValueHasError = true;
        if ((!this.player2CardHandValueHasError) && (!this.player2CardValueHasError)) {
          this.player2TotalScore = (this.player2Score+(parseFloat(this.player2CardValue)-parseFloat(this.player2CardHandValue)));  
          this.hasError = false;
          
        } else {
          this.player1TotalScore = '';
          this.hasError = true;
        }
      }

      if ((this.player1TotalScore == 0) && (this.player2TotalScore == 0)) {
        this.hasError = true;
      }
      /*
      if ((player == 'player2') && (this.player2CardHandValue.match(numbers))) {
        this.player2TotalScore = (this.player2Score+(parseFloat(this.player2CardValue)-parseFloat(this.player2CardHandValue)));      
      }
      */
    },
    saveScores: function() {

      let round = [{'Player1': this.player1TotalScore, 'Player2': this.player2TotalScore}];

      this.player1Scores.push(this.player1TotalScore);
      this.player1TotalGameScore = 0;
      for (var i in this.player1Scores) {
        this.player1TotalGameScore += this.player1Scores[i];
      }
      

      this.player2Scores.push(this.player2TotalScore);
      this.player2TotalGameScore = 0;
      for (var i in this.player2Scores) {
        this.player2TotalGameScore += this.player2Scores[i];
      }
      
      if ((this.player1TotalGameScore >= 5000) || (this.player2TotalGameScore >= 5000)) {
        if (this.player1TotalGameScore > this.player2TotalGameScore) {
          this.player1Win = true;
          this.hasError = true;
          this.player2Win = false;
          this.gameOver = true;
          console.log('Player 1 Wins!');
        } else if (this.player2TotalGameScore > this.player1TotalGameScore) {
          this.player2Win = true;
          this.hasError = true;
          this.player1Win = false;
          this.gameOver = true;
          console.log('Player 2 Wins!');
        }
      }
      //console.log(JSON.stringify(total1));
      //console.log(JSON.stringify(this.player2Scores));
      
      //this.scores = [
        //[{'Player1': 470, 'Player2': 1025}],
        //[{'Player1': 350, 'Player2': 700}],
        //[{'Player1': 10, 'Player2': 3550}],
        //[{'Player1': 35, 'Player2': 50}],
       //];

    this.scores.push(round);

      this.player1GoOut = false;
      this.player2GoOut = false;
      this.player1NaturalCanastaCount = 0;
      this.player2NaturalCanastaCount = 0;
      this.player1MixedCanastaCount = 0;
      this.player2MixedCanastaCount = 0;
      this.player1RedThreeCount = 0;
      this.player2RedThreeCount = 0;
      
      this.player1Score = 0;
      this.player2Score = 0;
      this.player1TotalScore = 0;
      this.player2TotalScore = 0;

      this.player1CardHandValueIsDisabled = false;
      this.player2CardHandValueIsDisabled = false;
      this.player1CardHandValue = 0;
      this.player2CardHandValue = 0;
      this.player1CardHandValueHasError = false;
      this.player2CardHandValueHasError = false;
      this.player1CardValueHasError = false;
      this.player2CardValueHasError = false;
      this.player1CardValue = 0;
      this.player2CardValue = 0;
      //this.hasError = false;

      if ((this.player1TotalScore == 0) && (this.player2TotalScore == 0)) {
        this.hasError = true;
      }

    },
    removeRound: function(index, p1, p2) {
      //console.log(JSON.stringify(this.scores));
      console.log('Index '+index);
      console.log('Player 1 '+p1);
      console.log('Player 2 '+p2);
      this.scores.splice(index, 1);
      this.player1TotalGameScore -= p1;
      this.player2TotalGameScore -= p2;
      this.player1Scores.splice(index, 1);
      this.player2Scores.splice(index, 1);
      console.log('Player 1 Total Game '+this.player1TotalGameScore);
      console.log('Player 2 Total Game '+this.player1Tota2GameScore);
      console.log(JSON.stringify(this.player1Scores));
      console.log(JSON.stringify(this.player2Scores));
   
      if ((this.player1TotalScore == 0) && (this.player2TotalScore == 0)) {
        this.hasError = true;
      }
    },
    resetAll: function() {
      this.player1GoOut = false;
      this.player2GoOut = false;
      this.player1NaturalCanastaCount = 0;
      this.player2NaturalCanastaCount = 0;
      this.player1MixedCanastaCount = 0;
      this.player2MixedCanastaCount = 0;
      this.player1RedThreeCount = 0;
      this.player2RedThreeCount = 0;
      
      this.scores = [];
      this.player1Score = 0;
      this.player2Score = 0;
      this.player1Scores = [];
      this.player2Scores = [];
      this.player1TotalScore = 0;
      this.player2TotalScore = 0;
      this.player1TotalGameScore = 0;
      this.player2TotalGameScore = 0;
      this.player1Win = false;
      this.player2Win = false;

      this.player1CardHandValueIsDisabled = false;
      this.player2CardHandValueIsDisabled = false;
      this.player1CardHandValue = 0;
      this.player2CardHandValue = 0;
      this.player1CardHandValueHasError = false;
      this.player2CardHandValueHasError = false;
      this.player1CardValueHasError = false;
      this.player2CardValueHasError = false;
      this.player1CardValue = 0;
      this.player2CardValue = 0;
      this.hasError = false;

      this.inputPlayer1Name = false;
      this.inputPlayer2Name = false;
    },
    showBackdrop: function() {
      console.log('Backdrop triggered');

      const backdrop = document.createElement('div');
      //backdrop.classList.add('modal-backdrop', 'fade', 'show');
      backdrop.classList.add('modal-backdrop', 'fade', 'show');
      document.body.appendChild(backdrop);
    },
	}
})