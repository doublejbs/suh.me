

window.onload = function() {
    var canvas = document.getElementById("mycanvas");
    var context = canvas.getContext("2d");
    
    var content = document.querySelector('#content');
    var conRect = content.getBoundingClientRect();
    
    canvas.width = window.innerWidth*0.6;
    canvas.height = window.innerHeight*0.92;
    /*
    //fill background
    context.fillStyle = '#8F4497';
    context.fillRect(0,0,canvas.width,canvas.height);
    */
    

    
    
    //draw rectangle
    var rect = new Rectangle();
    rect.context = context;
    
    var ball = new Ball();
    ball.context = context;
    ball.draw();
    var changeX = ball.vx;
    var changeY = ball.vy;
    var up = true;
    var down = true;
    var left = true;
    var right = true;
    var check = 0;

    
    
    function animationLoop(){
        
        
        context.clearRect(0,0,canvas.width,canvas.height);
        
        // Update
        
        if(check != 1 && ball.y + ball.r > canvas.height){ // bottom edge
            check = 1;
            changeY *= -1;
        }

        if(check != 2 && ball.x + ball.r > canvas.width){ // right edge
            check = 2;
            changeX *= -1;
        }

        if(check != 3 && ball.y - ball.r < 0){ // top edge
            check = 3;
            changeY *= -1;
        }

        if(check != 4 && ball.x - ball.r < 0){ // left edge
            check = 4;
            changeX *= -1;
        }
        
        //사각형에 닿을 때
        if(check != 5 && ball.y + ball.r >= rect.y && ball.x >= rect.x && ball.x <= rect.x + rect.w && ball.y <= rect.y){ // bottom edge 윗면
            changeY *= -1;
            check = 5;
            console.log('윗면');
        }
        
        
        if(check != 6 && ball.x + ball.r >= rect.x && ball.y >= rect.y && ball.y <= rect.y + rect.h && ball.x <= rect.x){ // 왼면
            changeX *= -1;
            check = 6;
            console.log('왼면');
        }
        
        if(check != 7 && ball.y - ball.r <= rect.y + rect.h && ball.x >= rect.x && ball.x <= rect.x + rect.w && ball.y >= rect.y + rect.h){ // 아랫면
            changeY *= -1;
            check = 7;
            console.log('아랫면');
        }
        
        
        if(check != 8 && ball.x - ball.r <= rect.x + rect.w && ball.y >= rect.y && ball.y <= rect.y + rect.h && ball.x >= rect.x + rect.w){ // 오른면
            changeX *= -1;
            check = 8;
            console.log('오른면');
        }
    
        ball.x += changeX;
        ball.y += changeY;
        // Draw
        ball.draw(ball.x, ball.y);
        rect.draw();
        up = true;
        down = true;
        right = true;
        left = true;
        console.log(check);

        // Animate
        window.requestAnimationFrame(animationLoop);    
    }
    
    
    var move = false;
    rect.draw();

    var distX = 0;
    var distY = 0;
    var resize = false;
    
    canvas.addEventListener('mousedown', function(event){
        console.log('mousedown');
        var mx = event.clientX-conRect.left;
        var my = event.clientY-conRect.top;
        distX = mx - rect.x;
        distY = my - rect.y;
        
        
        if(rect.x < mx && mx < (rect.x + rect.w) && rect.y < my && my < (rect.y + rect.h)){
            move = true;
        }
        
        if(rect.x+rect.w-10<=mx && mx<=rect.x+rect.w && rect.y+rect.h-10<my && my<rect.y+rect.h){
            resize = true;
            move = false;
        }
        
    });
        
        
        
    canvas.addEventListener('mousemove', function(event){
       console.log('mousemomve');
        var pastX = rect.x;
        var pastY = rect.y;
            
        if(move){
            rect.x = event.clientX-conRect.left - distX;
            rect.y = event.clientY-conRect.top - distY;   
        }
        context.clearRect(0,0,canvas.width,canvas.height);
        rect.draw();
        
        if(resize){
            rect.w = event.clientX-conRect.left - pastX;
            rect.h = event.clientY-conRect.top - pastY;
            
        }
        
        
        
    });
    
    
    
    canvas.addEventListener('mouseup', function(event){
       move = false; 
       resize = false;
    });
    
    window.requestAnimationFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.msRequestAnimationFrame     ||
                function(callback){
                  window.setTimeout(callback, 1000 / 60);
                };
      })();
    
    window.requestAnimationFrame(animationLoop);
                            
    
                            
                            
                        
    
  }
  

function Rectangle() {
        // Base
      var rect = this;

      // Specifications
      rect.w = 400;  
      rect.h = 300;                 // ball radius
      rect.c = 'white';       // ball color
      rect.x = 30;                    // center x
      rect.y = 30;                    // center y
      rect.m = 0;                    // mass
      rect.vx = 0;                   // velocity of x direction of ball
      rect.vy = 0;                   // velocity of y direction of ball
      rect.context = null            // the drawing context of ball
    }

    Rectangle.prototype.draw = function () {
      
      // Base
      var rect = this;
      
      // Check Context
      if(!rect.context){return}
    
      // Draw Ball
      
      rect.context.beginPath();
      rect.context.fillStyle = rect.c;
      rect.context.shadowBlur = 100;
      rect.context.shadowColor = 'grey';
      rect.context.fillRect(rect.x, rect.y, rect.w, rect.h);
      rect.context.stroke();
      rect.context.fillStyle = 'black';
      rect.context.fillRect(rect.x+rect.w-5, rect.y+rect.h-5,5,5);
      rect.context.stroke();
      rect.context.closePath();
    };


function Ball() {
        // Base
      var ball = this;

      // Specifications
      ball.r = 70;               // ball radius
      ball.c = '#FCB354';       // ball color
      ball.x = 500;                    // center x
      ball.y = 500;                    // center y
      ball.m = 0;                    // mass
      ball.vx = 15;                   // velocity of x direction of ball
      ball.vy = 15;                   // velocity of y direction of ball
      ball.context = null            // the drawing context of ball
    }

    Ball.prototype.draw = function (ballX, ballY) {
      
      // Base
      var ball = this;
      
      // Check Context
      if(!ball.context){return}
    
      // Draw Ball
      
      ball.context.beginPath();
      ball.context.shadowBlur = 0;
      ball.context.fillStyle = ball.c;
      ball.context.strokeStyle = ball.c;
      ball.context.lineWidth = 0.5;
      ball.context.arc(ballX, ballY, ball.r, 0, 2*Math.PI);
      ball.context.fill();
      ball.context.stroke();
    };



