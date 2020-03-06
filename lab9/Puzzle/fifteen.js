const start = function () {
    "use strict";

    const empty = {};

    $(function () {
        init();
        update();
        $("#puzzlearea div").click(move);
        $("#shufflebutton").click(shuffle);
    });

    function init() {
        const divs = $("#puzzlearea div").addClass("puzzlepiece");
        divs.css("background-image", "url('background.jpg')");

        // initialize each piece
        for (let i = 0; i < divs.length; i++) {
            const div = $(divs[i]);

            // calculate x and y for this piece
            let x = ((i % 4) * 100);
            let y = (Math.floor(i / 4) * 100);

            // set positions
            div.css("left", x + "px");
            div.css("top", y + "px");
            div.css("backgroundPosition", -x + "px " + (-y) + "px");

            // store x and y for later
            div.x = x;
            div.y = y;
        }

        // set empty piece x and y values
        empty.x = 300;
        empty.y = 300;
    }

    function move() {
        if (isMovable(this)) {
            let tempX = empty.x;
            let tempY = empty.y;
            // swap
            empty.x = $(this).css("left");
            empty.y = $(this).css("top");
            $(this).css("left", tempX);
            $(this).css("top", tempY);
        }
        update();
    }

    function isMovable(element) {
        console.log("test");
        element = $(element);
        let pieceLeft = parseInt(element.css("left"));
        let pieceTop = parseInt(element.css("top"));
        let emptyLeft = parseInt(empty.x);
        let emptyTop = parseInt(empty.y);

        let dx = Math.abs(pieceLeft - emptyLeft);
        let dy = Math.abs(pieceTop - emptyTop);

        let verticalNeighbor = (pieceTop == emptyTop && dx == 100);
        let horizontalNeighbor = (pieceLeft == emptyLeft && dy == 100);

        return verticalNeighbor || horizontalNeighbor;
    }

    function shuffle() {
        let movable = [];
        for (let i = 0; i < 100; i++) {
            $("#puzzlearea div").each(function (idx, val) {
                if (isMovable(val)) {
                    movable.push(val);
                }
            });
            let index = Math.floor(Math.random() * movable.length);
            move.call(movable[index]);
            movable = [];
        }

    }

    function update() {
        $("#puzzlearea div").each(function (idx, val) {
            if (isMovable(val)) {
                $(val).addClass("movablepiece");
            } else {
                $(val).removeClass("movablepiece");
            }
        });
    }
}();
