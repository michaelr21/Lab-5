//Global variables
var DIRECTION = {
    IDLE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
};

var rounds = [5, 5, 3, 3, 2];
var colors = ['#1abc9c', '#2ecc71', '#3498db', '#8c52ff', '#9b59b6'];

//The ball
var Ball = {
    new: function(incrementSpeed) {
        return {
            width: 18,
            height: 18,
            x: (this.canvas.wdith / 2) - 9,
            y: (this.canvas.height / 2) - 9,
            moveX: DIRECTION.IDLE,
            moveY: DIRECTION.IDLE,
            speed: incrementSpeed || 7
        };
    }
};

// the computer you play against
var Ai = {
    new: function (side) {
        return {
            width: 18,
            height: 180,
            x: side === 'left' ? 150 : this.canvas.width - 150,
            y: (this.canvas.height / 2) - 35,
            score: 0,
            move: DIRECTION.IDLE,
            speed: 8
        };
    }
};

var Game = {
    initiazlize: function() {
            this.canvas = document.querySelector('canvas');
            this.context = this.canvas.getContext('2d');
    
            this.canvas.width = 1400;
            this.canvas.height = 1000;
    
            this.canvas.style.width = (this.canvas.width / 2) + 'px';
            this.canvas.style.height = (this.canvas.height / 2) + 'px';
    
            this.player = Ai.new.call(this, 'left');
            this.comp = Ai.new.call(this, 'right');
            this.ball = Ball.new.call(this);
    
            this.comp.speed = 5;
            this.running = this.over = false;
            this.turn = this.ai;
            this.timer = this.round = 0;
            this.color = '#8c52ff';
    
            Pong.menu();
            Pong.listen();
        },
    
        endGameMenu: function(text) {
            //this changes the games font size
            Pong.context.font = '45px Courier New';
            Pong.context.fillStyle = this.color;
    
            //give the text at the bottom a background
            Pong.context.fillRect(
                Pong.canvas.width / 2 - 350,
                Pong.canvas.height / 2 - 48,
                700,
                100
            );
    
            //change the board color
            Pong.context.fillStyle = '#ffffff';
    
            //End game menu
            Pong.context.fillText(text,
                Pong.canvas.width / 2,
                Pong.canvas.height / 2 + 15
            );
    
            setTimeout(function () {
                Pong = Object.assign({}, Game);
                Pong.initialize();
            },  3000);
        },
        
        menu: function() {
        //This draws all the pong objects in its current state
        Pong.draw()

        //this changes the boards font size and color
        this.context.font = '50px Courier New';
  
                        
