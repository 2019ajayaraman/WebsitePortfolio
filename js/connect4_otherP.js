function computerPlayer(){
    
    if (noMatch){
        var random = Math.floor(Math.random() * 6 )+ 1;
        var tempArr = window['row'+random+'arr'];
        
        while (tempArr.length >= 6){
            random = Math.floor(Math.random() * 6 )+ 1;
            tempArr = window['row'+random+'arr'];
        }
        
        addCoin(random, tempArr);
        
    }
}

function reset() {
    timeColorStop();
    active = true;

    noMatch = true;
    
    row1arr = [];
    row2arr = [];
    row3arr = [];
    row4arr = [];
    row5arr = [];
    row6arr = [];
    row7arr = [];
    
    color = "red";
    currColorVal = 1;
    
    con4arrColor = [];
    
    endColorCon4 = 0;
    
    $("#winMessage").html("");
    
    clearBoard();
}

function clearBoard(){
    for (var r=1; r<=7; r++)
    {
        for (var c=1; c<=6; c++){
            document.getElementById('r'+r+'c'+c).style['fill'] = "white";
        }
    }
}