'use strict';

$(function(){
    prepopulate();
    $("#add").click(addPeople);
    $("#kill").click(kill);
    $("#cleanup").click(cleanUp);
    $("#stomp").click(stomp);
    $("#enrage").click(enrage);
    $("#patrol").click(patrol);
});

function prepopulate() {
    $("#people .person").addClass("boy");
}

function checkedGender() {
    return $("input[name=gender]:checked").val();
}

function addPeople() {
    let gender = checkedGender();
    for(let i = 0; i < 5; ++i) {
        let person = $("<div>");
        person.addClass("person " + gender);
        $("#people").append(person);
    }
}

function kill() {
    killGender(checkedGender());
}

function killGender(gender) {
    let people = $("#people ." + gender);
    let killCount = 0;

    // only do this for 20% of the population size
    while (killCount < people.length/5) {
        let index = Math.floor(Math.random()*people.length);
        let person = $(people[index]);
        if(notDead(person)) {
            person.removeClass(gender).addClass("splat");   // kill
            ++killCount;
        }
    }
}

function notDead(person) {
    return person.attr('class').split(" ")[1] != "splat";
}

function cleanUp() {
    $(".splat").remove();
}

function stomp() {
    let raptor = $("#raptor");
    if (raptor.css("top") == "85px") {
        raptor.css("top","10px");
    } else {
        raptor.css("top","85px");
    }
    killGender('boy');
    killGender('girl');
}

// toggle enrage
function enrage() {
    let raptor =  $("#raptor");
    if($(".enrage").length) {
        // remove enrage
        $(".enrage").removeClass("enrage");
        raptor.css("width",function(idx,old){return (parseInt(old)-50)+"px";});
    } else {
        // enrage
        raptor.addClass("enrage");
        $("h1").addClass("enrage");
        raptor.css("width",function(idx,old){return (parseInt(old)+50)+"px";});
    }

}

var timer;

// patrol
function patrol() {
    clearInterval(timer);
    timer = setInterval(move,20);
    let xPosition = parseInt($("#raptor").css('left'));
    let direction = "right";

    function setPosition(pos) {
        $("#raptor").css('left',pos+'px');
    }

    function move() {
        console.log("xPosition = " + xPosition);
        if(direction == "right") {
            setPosition(xPosition+=4);
            if (xPosition >= 300) {
                direction = "left";
            }
        } else {
            setPosition(xPosition-=4);
            if (xPosition <= 10) {
                clearInterval(timer);
            }
        }
    }
}
