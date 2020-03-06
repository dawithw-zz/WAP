(function() {
    'use strict';

    var done = true;

    $(function() {
        $("#start").click(init);
    });

    function changeColor() {
        $(".boundary").addClass("youlose");
    }

    function init() {
        if(done) {
            $(".boundary").mouseover(changeColor);
            $("#maze").mouseleave(changeColor);
            $("#end").mouseover(gameOver);
            done = false;
        }
        reset();
    }

    function destroy() {
        $(".boundary").unbind('mouseover',changeColor);
        $("#maze").unbind('mouseleave',changeColor);
        $("#end").unbind('mouseover',gameOver);
        done = true;
    }

    function gameOver() {
        if($(".youlose").length) {
            $("h2").text("Sorry, you lost. :[");
        } else {
            $("h2").text("You win! :]");
        }
        destroy();
    }

    function reset() {
        $(".youlose").removeClass("youlose");
        $("#status").text("Click the \"S\" to begin.");
    }

})();
