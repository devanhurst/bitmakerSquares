$('document').ready(function(){

    directory = window.location.pathname;
    directory = directory.substring(0, directory.lastIndexOf('/')) + "/";
    var students = ["alon", "andrew", "avi", "carlos", "colin", "dan", "devan", "hershel", "james", "jeff", "jong", "jonk", "jordan", "lauren", "margaret", "matt", "mike", "patrick", "rex", "rob", "ryan", "scott", "steph", "tyler", "zain"];


    players = ["devan", "alon", "avi", "ryan", "lauren", "tyler", "matt", "margaret", "mike"];

    document.getElementById("1").src = "images/default/" + players[0] + ".png";
    document.getElementById("2").src = "images/default/" + players[1] + ".png";
    document.getElementById("3").src = "images/default/" + players[2] + ".png";
    document.getElementById("4").src = "images/default/" + players[3] + ".png";
    document.getElementById("5").src = "images/default/" + players[4] + ".png";
    document.getElementById("6").src = "images/default/" + players[5] + ".png";
    document.getElementById("7").src = "images/default/" + players[6] + ".png";
    document.getElementById("8").src = "images/default/" + players[7] + ".png";
    document.getElementById("9").src = "images/default/" + players[8] + ".png";

    var body = document.getElementsByTagName("body")[0];
    var texts = document.getElementsByClassName("text");
    var deciding = false;

    var ding = document.createElement('audio');
    ding.setAttribute('src', 'ding.mp3');

    var win = document.createElement('audio');
    win.setAttribute('src', 'win.mp3');

    function isWinner(array) {
        if ( array.length == 5 ) {
            return true;
        }
        var winCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
        for ( i = 0; i < winCombos.length; i++ ) {
            item = winCombos[i];
            if ( array.indexOf(item[0]) != -1 && array.indexOf(item[1]) != -1 && array.indexOf(item[2]) != -1 ) {
                return true;
            }
        }
        return false;
    }

    var xPositions = [];
    var oPositions = [];

    function winFlash(array) {
        var flashing = setInterval(function(){
            for ( i = 0; i < array.length; i++ ) {
                if ( $( "#" + array[i] )[0].src === "file://" + directory + "images/default/" + players[array[i]-1] + ".png" ) {
                    console.log(true);
                    $( "#" + array[i] )[0].src = "file://" + directory + "images/select/" + players[array[i]-1] + ".png";
                } else {
                    console.log(false);
                    $( "#" + array[i] )[0].src = "file://" + directory + "images/default/" + players[array[i]-1] + ".png";
                }
            }
        }, 200);
    }

    $( ".box").click(function() {
        console.log(this);
        index = this.id - 1;
        if ( texts[index].innerHTML == "" ) {
            if ( deciding == false ){
                deciding = true;
                idName = "#" + this.id
                var flashing = setInterval(function(){
                    d = new Date();
                    if ( $(idName)[0].src === "file://" + directory + "images/default/" + players[index] + ".png" ) {
                        console.log(true);
                        $(idName)[0].src = "file://" + directory + "images/select/" + players[index] + ".png";
                    } else {
                        console.log(false);
                        $(idName)[0].src = "file://" + directory + "images/default/" + players[index] + ".png";
                    }
                }, 300)

                var x = document.createElement("button");
                var o = document.createElement("button");
                x.innerHTML = "X";
                x.id = "xButton"
                body.appendChild(x);
                o.innerHTML = "O";
                o.id = "oButton"
                body.appendChild(o);

                $("#xButton").click(function() {
                    ding.play();
                    console.log("X");
                    clearInterval(flashing);
                    texts[index].innerHTML = "X";
                    deciding = false;
                    xPositions.push(index + 1);
                    console.log(xPositions);
                    $("#xButton").remove();
                    $("#oButton").remove();
                    $(idName)[0].src = "file://" + directory + "images/select/" + players[index] + ".png";
                    if ( isWinner(xPositions) ) {
                        win.play();
                        deciding = true; //to prevent another click
                        winFlash(xPositions);
                    }
                });

                $("#oButton").click(function() {
                    ding.play();
                    console.log("O");
                    clearInterval(flashing);
                    texts[index].innerHTML = "O";
                    deciding = false;
                    oPositions.push(index + 1);
                    console.log(oPositions);
                    $("#xButton").remove();
                    $("#oButton").remove();
                    $(idName)[0].src = "file://" + directory + "images/select/" + players[index] + ".png";
                    if ( isWinner(oPositions) ) {
                        win.play();
                        deciding = true; //to prevent another click
                        winFlash(oPositions);
                    }
                });
            }
        }
    });
});