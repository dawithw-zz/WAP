'use strict';

$(function() {
    let ballVelocity = 0;
    let ball = $("#ball");
    ball.css({
        'position':"fixed",
        'left':(($(window).width()/2)-(ball.width()/2)) + "px"
    });

    setInterval(update,1000/60);

    function update() {
        ballVelocity += 1;
        if (parseInt(ball.css('top')) > $(window).height()) {
            $("#ball").css('top',$(window).height()+"px");
            ballVelocity *= -.9;
        }
        ball.css('top', function(idx, old) {
            return parseInt(old) + ballVelocity + 'px';
        });
        ball.css('left',(($(window).width()/2)-(ball.width()/2)) + "px");
        console.log(ball.css('top'));
    }
})