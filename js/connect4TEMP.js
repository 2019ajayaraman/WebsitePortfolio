//https://rossta.net/blog/connect-four-with-svg-pattern-masking.html --> droping the coin 
/*
Graphics - SVG :
https://www.w3schools.com/html/html5_svg.asp
*/



var timer; 

var currR;
var currC;
var stopC;
var currSize;

var active = true;


function timeStart(){
    
    timer = setInterval(fall, 100);
    
}

function timeStop(){
    clearInterval(timer);
    vertCheck();
    horizCheck();
    diagCheck();
}

function fall(){
    if (currC > stopC){
        if (currC!=6){
            document.getElementById('r'+currR+'c'+(currC+1)).style['fill'] = "white";
        }
        document.getElementById('r'+currR+'c'+currC).style['fill'] = color;
        currC--;
    }
    else {
        if (currC!=6){
            document.getElementById('r'+currR+'c'+(currC+1)).style['fill'] = "white";
        }
        document.getElementById('r'+currR+'c'+currC).style['fill'] = color;
        currC--;
        timeStop();
        active = true;
    }
    
}

var row1arr = [];
var row2arr = [];
var row3arr = [];
var row4arr = [];
var row5arr = [];
var row6arr = [];
var row7arr = [];

var color = "red";
var currColorVal = 1;

function changeCol(){
    currColorVal++;
    if(currColorVal%2 == 0){
        color = "yellow";
    }
    else {
        color = "red";
    }
}

function addCoin (row, rowArr){
    console.log(rowArr.length)
    if (rowArr.length < 6){
        rowArr.push(currColorVal);
        stopC = rowArr.length;
        currR = row;
        currC = 6;

        timeStart();        
        changeCol();
    }
    else {
        active = true;
    }

}


var r1 = document.getElementById('r1');
r1.onclick = function (elem){
    if (active){
        active = false;
        addCoin(1, row1arr);
    }
    
};


var r2 = document.getElementById('r2');
r2.onclick = function(elem){
    if (active){
        active = false;
        addCoin(2, row2arr);
        
    }
};


var r3 = document.getElementById('r3');
r3.onclick = function(elem){
    if (active){
        active = false;
        addCoin(3, row3arr);
    }
};

var r4 = document.getElementById('r4');
r4.onclick = function(elem){
    if (active){
        active = false;
        addCoin(4, row4arr);
    }
};

var r5 = document.getElementById('r5');
r5.onclick = function(elem){
    if (active){
        active = false;
        addCoin(5, row5arr);
    }
};

var r6 = document.getElementById('r6');
r6.onclick = function(elem){
    if (active){
        active = false;
        addCoin(6, row6arr);
    }
};

var r7 = document.getElementById('r7');
r7.onclick = function(elem){
    if (active){
        active = false;
        addCoin(7, row7arr);
    }
};

//checker

function vertCheck(){
    for (var i=1; i<=7; i++){
        var tempArr = window['row'+i+'arr'];
        
        if(tempArr.length>=4){
            
            var con4 = [];
            var currInd = 0;

            for (var z=0; z<tempArr.length; z++){
                if(con4.length == 4){
                    console.log("MATCHV");
                    break;
                }
                else if (con4.length == 0){
                    con4.push(tempArr[z]);
                    currInd++;
                }
                else{
                    if (tempArr[z]%2 == con4[currInd-1]%2){
                        con4.push(tempArr[z]);
                        currInd++;
                    }
                    else{
                        con4 = [];
                        con4.push(tempArr[z]);
                        currInd = 1;
                    }
                }
            }
            
            if(con4.length == 4){
                colorCon4(con4);
                console.log("MATCHV");
                break;
            }
            else{
                con4 = [];
            }
        }
    }
}

function horizCheck(){
    for (var i=1; i<=7; i++){
        var con4 = [];
        var currInd = 0;
        for (var z=1; z<=7; z++){
            var tempArr = window['row'+z+'arr'];
            if(con4.length == 4){
                    console.log("MATCHH");
                    break;
            }
            else if (con4.length == 0){
                con4.push(tempArr[i-1]);
                currInd++;
            }
            else{
                if (tempArr[i-1]%2 == con4[currInd-1]%2){
                    con4.push(tempArr[i-1]);
                    currInd++;
                }
                else{
                    con4 = [];
                    con4.push(tempArr[i-1]);
                    currInd = 1;
                }
            }
        }
        if(con4.length == 4){
            colorCon4(con4);
            console.log("MATCHH");
            break;
        }
        else{
            con4 = [];
        }
    }
}


var diagonals = [[[1,4],[2,3],[3,2],[4,1]],

[[1,5],[2,4],[3,3],[4,2],[5,1]],

[[1,6],[2,5],[3,4],[4,3],[5,2],[6,1]],

[[2,6],[3,5],[4,4],[5,3],[6,2],[7,1]],

[[3,6],[4,5],[5,4],[6,3],[7,2]],

[[4,6],[5,5],[6,4],[7,2]],
[[1,3],[2,4],[3,5],[4,6]],
[[1,2],[2,3],[3,4],[4,5],[5,6]],
[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]],
[[2,1],[3,2],[4,3],[5,4],[6,5],[7,6]],
[[3,1],[4,2],[5,3],[6,4],[7,5]],
[[4,1],[5,2],[6,3],[7,4]]

];

//^ [r,c]


function diagCheck(){
    //create a list of all diagonals and check w/ them
    
    for (var i=0; i<diagonals.length; i++){
        
        var con4 = [];
        var currInd = 0;
        
        for (var z=0; z<diagonals[i].length; z++){
            var rDiag = diagonals[i][z][0];
            var cDiag = diagonals[i][z][1];
            
            var tempArr = window['row'+rDiag+'arr'];
            
            if (tempArr.length >= cDiag){
                if(con4.length == 4){
                    console.log("MATCHD");
                    break;
                }
                else if (con4.length == 0){
                    con4.push(tempArr[cDiag-1]);
                    currInd++;
                }
                else{
                    if (tempArr[cDiag-1]%2 == con4[currInd-1]%2){
                        con4.push(tempArr[cDiag-1]);
                        currInd++;
                    }
                    else{
                        con4 = [];
                        con4.push(tempArr[cDiag-1]);
                        currInd = 1;
                    }
                }
            }
            else if(con4.length == 4){
                console.log("MATCHD");
                break;
            }
            else {
                con4 = [];
                currInd = 0;
            }
        }
        
        if(con4.length == 4){
            colorCon4(con4);
            console.log("MATCHD");
            break;
        }
        else{
            con4 = [];
        }
    }    
}


function colorCon4(con4Arr){
    for (var i = 1; i<=7; i++){
        var tempArr = window['row'+i+'arr'];
        for (var z = 0; z<con4Arr.length; z++){
            if(tempArr.includes(con4Arr[z])){
                var temp = con4Arr[z];
                var c = tempArr.indexOf(temp);
                
                document.getElementById('r'+i+'c'+(c+1)).style['fill'] = "#FF9F00";
                
            }
        }
    }
}

function timeColorStart(){
    
    timer = setInterval(fall, 100);
    
}

function timeColorStop(){
    clearInterval(timer);
    vertCheck();
    //horizCheck();
    //diagCheck();
}


