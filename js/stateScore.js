scoredBool = false;

//get+order score
function scoring() {
    if (!scoredBool)
    {
        person = prompt("Please enter your name", "Username");
    
    
        clearTable();
    
    
        document.getElementById('statesClicked').innerHTML = stateVal;
        document.getElementById('timeSpent').innerHTML = getTimeLayout(timeElapse);
    
        addPlayer([stateVal, timeElapse, person]);
    
        scoreDisplay();
        scoredBool = true;
    }
    
}

players = [];

//sort score into proper position
function addPlayer(elem){
    
    var last = -1;
    
    for (var i=players.length-1; i>=0; i--)
    {
        if (compare(elem, players[i])>= 0)
        {
            last=i;
        }
        if (compare(elem, players[i])>0)
        {
            players.splice( i, 0, elem);
            return;
        }
    }
    
    if (last!=-1)
    {
        players.splice(last, 0, elem);
    }
    
    players.push(elem);
}

//clear the table to not add duplicates
function clearTable()
{
    table = document.getElementById("rankings");
    
    var rowLen = table.getElementsByTagName("tr").length;
    
    for (var i = rowLen-1; i>=1; i--)
    {
        table.deleteRow(i);
    }
}

//compare function for sorting
function compare (e1, e2)
{
    if(e1[0]==e2[0]){
        return e2[1]-e1[1];
        
    }
    else{
        return e1[0]-e2[0];
    }
}

//display scores in table
function scoreDisplay() 
{
    var table = document.getElementById("rankings");
    
    
    for (var i=0; i<players.length; i++)
    {
        var row = table.insertRow(-1);
    
        row.insertCell(0).innerHTML = (i+1);
        row.insertCell(1).innerHTML = players[i][2];
        row.insertCell(2).innerHTML = players[i][0];
        row.insertCell(3).innerHTML = getTimeLayout(players[i][1]);
        
    }

    
}

