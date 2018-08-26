


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
});