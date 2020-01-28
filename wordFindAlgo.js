var fs = require('fs');

size = 0;
curr = "";
currPos = 0;
arrCombo = [];


function readInData(l1, l2, l3, l4, l5, l6, l7, pos1, pos2, pos3, pos4, pos5, pos6, pos7){
    
    var letters = [];
    letters.push([]); letters.push([]);
    
    if (l1 != "NA"){
        letters[0].push(l1);
        letters[1].push(parseInt(pos1, 10));
    }
    if (l2 != "NA"){
        letters[0].push(l2);
        letters[1].push(parseInt(pos2, 10));
    }
    if (l3 != "NA"){
        letters[0].push(l3);
        letters[1].push(parseInt(pos3, 10));
    }
    if (l4 != "NA"){
        letters[0].push(l4);
        letters[1].push(parseInt(pos4, 10));
    }
    if (l5 != "NA"){
        letters[0].push(l5);
        letters[1].push(parseInt(pos5, 10));
    }
    if (l6 != "NA"){
        if (l6 == undefined){
            letters[0].push("*");
            letters[1].push(parseInt(pos6, 10));
        }
        else
        {
            letters[0].push(l6);
            letters[1].push(parseInt(pos6, 10));
        }
    }
    if (l7 != "NA"){
        if (l7 == undefined){
            letters[0].push("*");
            letters[1].push(parseInt(pos7, 10));
        }
        else
        {
            letters[0].push(l7);
            letters[1].push(parseInt(pos7, 10));
        }
    }
    
    
    return letters;
}

function trimLen (len, arr){
    
    size = len;
    var newWords = arr.filter(cutWords);
    
    return newWords;
}

function cutWords (elem){
    return elem.length == size+1;
}


function trimCombo (combo, arr){
    
    arrCombo = combo;
    
    var update = arr.filter(cutCombo);
    
    return update;
}


function cutCombo (elem){
    var e = elem.split("");
    var arr = arrCombo.slice(0);
    
    for (var i=0; i<e.length; i++){
        if (arr.includes(e[i])){
            delete arr[arr.indexOf(e[i])];
        }
        else if (arr.includes("*")){
            delete arr[arr.indexOf("*")];
        }
        else if (e[i] == '\r'){}
        else{
            return false;
        }
    }
    return true;
    
}

function cutLetter (elem){
    return elem.includes(curr);
}

function cutPos (elem){
    return elem[currPos] == curr;
}

function trimPos (combo, arr){
    
    var update = arr;
    
    for (var i=0; i<combo[0].length; i++){
        curr = combo[0][i];
        currPos = combo[1][i];
        if (curr!="*" && !isNaN(currPos)){
            currPos--;
            var temp = update.filter(cutPos);
            update = temp;
        }
    }
    
    return update;
}


module.exports.readInData=readInData;
module.exports.trimLen=trimLen;
module.exports.trimCombo=trimCombo;
module.exports.trimPos=trimPos;


