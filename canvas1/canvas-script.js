

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
    
    
    var move = false;
    
    //gradient endpoint
    var endX1 = canvas.width/2 - rect.w/2;
    var endY1 = canvas.height;
    var endX2 = canvas.width/2 + rect.w/2;
    var endY2 = canvas.height;
    
    var grd=context.createLinearGradient(rect.x+rect.w/2, rect.y+rect.h/2, endX1+rect.w/2, endY1+rect.w/2);
    grd.addColorStop(0,"#DF5964");
    grd.addColorStop(1,"#8F4497");
    
    //gradient line
    context.beginPath();
    context.strokeStyle = grd;
    context.fillStyle = grd;
    context.lineWidth = 1;
    context.moveTo(rect.x, rect.y+rect.h);//시작 왼쪽 아래
    context.lineTo(endX1, endY1);
    context.lineTo(endX2, endY2); 
    context.lineTo(rect.x+rect.w, rect.y);
    context.lineTo
    context.stroke();
    context.fill();
    rect.draw();

    var distX = 0;
    var distY = 0;
    
    canvas.addEventListener('mousedown', function(event){
        console.log('mousedown');
        var mx = event.clientX-conRect.left;
        var my = event.clientY-conRect.top;
        distX = mx - rect.x;
        distY = my - rect.y;
        
        console.log(mx, rect.x);
        
        if(rect.x < mx && mx < (rect.x + rect.w) && rect.y < my && my < (rect.y + rect.h)){
            move = true;
            
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
        var grd=context.createLinearGradient(rect.x+rect.w/2, rect.y+rect.h/2, endX1+rect.w/2, endY1+rect.w/2);
        context.clearRect(0,0,canvas.width,canvas.height);
        
        //왼쪽일때
        
        if(rect.x+rect.w/2 < canvas.width/2){
            grd.addColorStop(0,"#DF5964");
            grd.addColorStop(1,"#8F4497");
            context.beginPath();
            context.strokeStyle = grd;
            context.fillStyle = grd;
            context.lineWidth = 1;
            context.moveTo(rect.x, rect.y+rect.h);//시작 왼쪽 아래
            context.lineTo(endX1, endY1);
            context.lineTo(endX2, endY2); 
            context.lineTo(rect.x+rect.w, rect.y);
            context.lineTo
            context.stroke();
            context.stroke();
            context.fill();
            rect.draw();
        }
        grd.addColorStop(0,"#DF5964");
        grd.addColorStop(1,"#8F4497");
        context.beginPath();
        context.strokeStyle = grd;
        context.fillStyle = grd;
        context.lineWidth = 1;
        context.moveTo(rect.x, rect.y);//시작 왼쪽 아래
        context.lineTo(endX1, endY1);
        context.lineTo(endX2, endY2); 
        context.lineTo(rect.x+rect.w, rect.y+rect.h);
        context.lineTo
        context.stroke();
        context.stroke();
        context.fill();
        rect.draw();
    });
    
    canvas.addEventListener('mouseup', function(event){
       move = false; 
    });
    
    
                            
    
                            
                            
                        
    
  }

function Rectangle() {
        // Base
      var rect = this;

      // Specifications
      rect.w = 200;  
      rect.h = 200;                 // ball radius
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
      rect.context.fillRect(rect.x, rect.y, rect.w, rect.h);
      rect.context.stroke();
    };