$('document').ready(function() {

    // Find app directory for setting images later.
    var directory = window.location.pathname;
    directory = directory.substring(0, directory.lastIndexOf('/')) + "/";

    // Select players.
    var students = ["alon", "andrew", "avi", "carlos", "colin", "dan", "devan", "hershel", "james", "jeff", "jong", "jonk", "jordan", "lauren", "margaret", "matt", "mike", "patrick", "rex", "rob", "ryan", "scott", "steph", "tyler", "zain"];
    var players = ["matt", "tyler", "ryan", "lauren", "devan", "dan", "margaret", "hershel", "avi"];

    //Constants
    var body = document.getElementsByTagName("body")[0];
    var texts = document.getElementsByClassName("text");
    var winCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    var deciding = false;

    //Sounds
    var ding = document.createElement('audio');
    ding.setAttribute('src', 'sounds/ding.mp3');

    var win = document.createElement('audio');
    win.setAttribute('src', 'sounds/win.mp3');

    var questionAppear = document.createElement('audio');
    questionAppear.setAttribute('src', 'sounds/questionappear.mp3');

    var question = document.createElement('audio');
    question.setAttribute('src', 'sounds/question.mp3');

    var noPoint = document.createElement('audio');
    noPoint.setAttribute('src', 'sounds/nopoint.mp3');

    // // Animate Background. HOLY FUCKING CPU

    // $("body").animate({backgroundPositionX: "-=500"}, 30000, "linear");
    // $("body").animate({backgroundPositionX: "+=500"}, 30000, "linear");
    // setInterval((function(){
    //     $("body").animate({backgroundPositionX: "-=500"}, 30000, "linear");
    //     $("body").animate({backgroundPositionX: "+=500"}, 30000, "linear");
    // }), 60000);

    //Set up new game.
    function reset() {
        for ( i = 0; i < texts.length; i++ ) {
        texts[i].innerHTML = "";
        }
        document.getElementById("1").src = "images/default/" + players[0] + ".png";
        document.getElementById("2").src = "images/default/" + players[1] + ".png";
        document.getElementById("3").src = "images/default/" + players[2] + ".png";
        document.getElementById("4").src = "images/default/" + players[3] + ".png";
        document.getElementById("5").src = "images/default/" + players[4] + ".png";
        document.getElementById("6").src = "images/default/" + players[5] + ".png";
        document.getElementById("7").src = "images/default/" + players[6] + ".png";
        document.getElementById("8").src = "images/default/" + players[7] + ".png";
        document.getElementById("9").src = "images/default/" + players[8] + ".png";

        xPositions = [];
        oPositions = [];
        deciding = false;
    }

    //Check if there is a winner.
    function isWinner(array) {
        for ( var i = 0; i < winCombos.length; i++ ) {
            var item = winCombos[i];
            if ( array.indexOf(item[0]) != -1 && array.indexOf(item[1]) != -1 && array.indexOf(item[2]) != -1 ) {
                xPositions = [item[0], item[1], item[2]];
                return true;
            }
        }
        if ( array.length == 5 ) {
            return true;
        }
        return false;
    }

    //Check if the move is a block. (Checks opponent's array.) DOESN'T WORK YET.
    function isBlock(array) {
        for ( var i = 0; i < winCombos.length; i++ ) {
            var item = winCombos[i];
            if ( array.indexOf(item[0]) != -1 && array.indexOf(item[1]) != -1 && array.indexOf(item[2]) == -1 ) {
                return true;
            } else if ( array.indexOf(item[0]) != -1 && array.indexOf(item[1]) == -1 && array.indexOf(item[2]) != -1 ) {
                return true;
            } else if ( array.indexOf(item[0]) == -1 && array.indexOf(item[1]) != -1 && array.indexOf(item[2]) != -1 ) {
                return true;
            } else {
                return false;
            }
        }
    }

    //Win animation.
    function winFlash(array) {
        var flashing = setInterval(function(){
            for ( i = 0; i < array.length; i++ ) {
                if ( $( "#" + array[i] )[0].src === "http://devanhurst.github.io/" + directory + "images/default/" + players[array[i]-1] + ".png" ) {
                    console.log(true);
                    $( "#" + array[i] )[0].src = "http://devanhurst.github.io/" + directory + "images/select/" + players[array[i]-1] + ".png";
                } else {
                    console.log(false);
                    $( "#" + array[i] )[0].src = "http://devanhurst.github.io/" + directory + "images/default/" + players[array[i]-1] + ".png";
                }
            }
        }, 200);
        setTimeout((function(){
            clearInterval(flashing);
        }), 5000);
    }

    //Main
    reset();

    $( ".box").click(function() {
        //If a box is selected, accept no clicks.
        if ( deciding == true ){
            return false;
        } else {
            index = this.id - 1;
            if ( texts[index].innerHTML == "" ) {
                deciding = true;
                idName = "#" + this.id
                var flashing = setInterval(function(){
                    if ( $(idName)[0].src === "http://devanhurst.github.io/" + directory + "images/default/" + players[index] + ".png" ) {
                        console.log(true);
                        $(idName)[0].src = "http://devanhurst.github.io/" + directory + "images/select/" + players[index] + ".png";
                    } else {
                        console.log(false);
                        $(idName)[0].src = "http://devanhurst.github.io/" + directory + "images/default/" + players[index] + ".png";
                    }
                }, 300)

                var x = document.createElement("button");
                var o = document.createElement("button");
                var cancel = document.createElement("button");
                x.innerHTML = "X";
                x.id = "xButton"
                body.appendChild(x);
                o.innerHTML = "O";
                o.id = "oButton"
                body.appendChild(o);
                cancel.innerHTML = "CANCEL";
                cancel.id = "cancelButton"
                body.appendChild(cancel);
                question.load();
                question.play();
                questionAppear.load();
                questionAppear.play();

                $("#xButton").click(function() {
                    question.pause();
                    console.log("X");
                    clearInterval(flashing);
                    texts[index].innerHTML = "X";
                    deciding = false;
                    xPositions.push(index + 1);
                    console.log(xPositions);
                    $("#xButton").remove();
                    $("#oButton").remove();
                    $("#cancelButton").remove();
                    $(idName)[0].src = "http://devanhurst.github.io/" + directory + "images/confirm/" + players[index] + ".png";
                    if ( isWinner(xPositions) ) {
                        win.play();
                        deciding = true; //to prevent another click
                        winFlash(xPositions);
                        setTimeout(reset, 5000);
                    } else {
                        ding.load();
                        ding.play();
                    }
                });

                $("#oButton").click(function() {
                    question.pause();
                    console.log("O");
                    clearInterval(flashing);
                    texts[index].innerHTML = "O";
                    deciding = false;
                    oPositions.push(index + 1);
                    console.log(oPositions);
                    $("#xButton").remove();
                    $("#oButton").remove();
                    $("#cancelButton").remove();
                    $(idName)[0].src = "http://devanhurst.github.io/" + directory + "images/confirm/" + players[index] + ".png";
                    if ( isWinner(oPositions) ) {
                        win.play();
                        deciding = true; //to prevent another click
                        winFlash(oPositions);
                        setTimeout(reset, 5000);
                    } else {
                        ding.load();
                        ding.play();
                    }
                });

                $("#cancelButton").click(function() {
                    question.pause();
                    noPoint.play();
                    console.log("cancel");
                    clearInterval(flashing);
                    deciding = false;
                    $("#xButton").remove();
                    $("#oButton").remove();
                    $("#cancelButton").remove();
                    $(idName)[0].src = "http://devanhurst.github.io/" + directory + "images/default/" + players[index] + ".png";
                });
            }
        }
    });
});