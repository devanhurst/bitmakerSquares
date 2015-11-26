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

    var texts = document.getElementsByClassName("text");

    $( ".box").click(function() {
        var index = this.id - 1;
        console.log(index);
        texts[index].innerHTML = "X";
    });
});