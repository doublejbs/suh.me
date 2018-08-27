


$(document).ready(function(){
    $('.menu-title').click(function(){
        console.log('u');
        
        if($(this).next().css('display') == 'none'){
            console.log('none');
            $(this).next().css('display', 'block'); 
        }
        else{
            $(this).next().css('display', 'none');
        }
        

    });
    
    $('.hamburger').click(function(){
        console.log('hh');
        
        if($('.close').css('z-index') == '80'){
            $(this).css('transform', 'scale(100,100)');
            $('.close').css('z-index', '200');
            $('.menu').css('display', 'block');
        }
        
    });
    
    
    
    $('.close').click(function(){
        
        if($('.close').css('z-index') == '200'){
            $('.hamburger').css('transform', 'scale(1,1)');
            $('.close').css('z-index', '80');
            setTimeout(function(){
                $('.menu').css('display', 'none');
            }, 400);
            
        }
        
    });
    
    
});