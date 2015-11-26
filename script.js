$('document').ready(function(){
    var students = ["alon", "andrew", "avi", "carlos", "colin", "dan", "devan", "hershel", "james", "jeff", "jong", "jonk", "jordan", "lauren", "margaret", "matt", "mike", "patrick", "rex", "rob", "ryan", "scott", "steph", "tyler", "zain"];
    var players = ["devan", "alon", "andrew", "ryan", "lauren", "tyler", "matt", "margaret", "mike"];

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

    function isWinner(array) {
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

    $( ".box").click(function() {
        if ( deciding == false ){
            deciding = true;
            var index = this.id - 1;
            console.log(index);
            var flashing = setInterval(function(){
                if ( texts[index].innerHTML == "X" ) {
                    texts[index].innerHTML = "O";
                } else {
                    texts[index].innerHTML = "X";
                }
            }, 200)

            var x = document.createElement("button");
            var o = document.createElement("button");
            x.innerHTML = "X";
            x.id = "xButton"
            body.appendChild(x);
            o.innerHTML = "O";
            o.id = "oButton"
            body.appendChild(o);

            $("#xButton").click(function() {
                console.log("X");
                clearInterval(flashing);
                texts[index].innerHTML = "X";
                deciding = false;
                xPositions.push(index + 1);
                console.log(xPositions);
                $("#xButton").remove();
                $("#oButton").remove();
            });

            $("#oButton").click(function() {
                console.log("O");
                clearInterval(flashing);
                texts[index].innerHTML = "O";
                deciding = false;
                oPositions.push(index + 1);
                console.log(oPositions);
                $("#xButton").remove();
                $("#oButton").remove();
            });
        }
    });
});