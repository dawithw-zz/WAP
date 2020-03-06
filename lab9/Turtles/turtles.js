$(function(){

    addTurtle();
    $(document).scroll(addTurtle);

    function addTurtle() {
        while($(window).scrollTop() + $(window).height() >= $(document).height())
            $(document.body).append($("<div>").addClass('turtle'));
    }

});