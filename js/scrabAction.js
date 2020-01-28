wildNum = 0;
document.getElementById('w0').checked=true;



function wildC0 (){
    
    document.getElementById('wildC0').style.backgroundColor="purple";
    document.getElementById('wildC0').style.borderColor="purple";
    document.getElementById('wildC0').style.color="white";
    
    document.getElementById('wildC1').style.backgroundColor="#e6a8ff";
    document.getElementById('wildC1').style.borderColor="#e6a8ff";
    document.getElementById('wildC1').style.color="black";
    
    document.getElementById('wildC2').style.backgroundColor="#e6a8ff";
    document.getElementById('wildC2').style.borderColor="#e6a8ff";
    document.getElementById('wildC2').style.color="black";
    
    document.getElementById('w0').checked=true;
    
    undisable('letter7');
    undisable('letter6');
    
    wildNum = 0;
    
}
function wildC1 (){
    document.getElementById('wildC1').style.backgroundColor="purple";
    document.getElementById('wildC1').style.borderColor="purple";
    document.getElementById('wildC1').style.color="white";
    
    document.getElementById('wildC0').style.backgroundColor="#e6a8ff";
    document.getElementById('wildC0').style.borderColor="#e6a8ff";
    document.getElementById('wildC0').style.color="black";
    
    document.getElementById('wildC2').style.backgroundColor="#e6a8ff";
    document.getElementById('wildC2').style.borderColor="#e6a8ff";
    document.getElementById('wildC2').style.color="black";
    
    document.getElementById('w1').checked=true;
    
    disable('letter7');
    undisable('letter6');
    
    wildNum = 1;
}

function wildC2 (){
    
    document.getElementById('wildC2').style.backgroundColor="purple";
    document.getElementById('wildC2').style.borderColor="purple";
    document.getElementById('wildC2').style.color="white";
    
    document.getElementById('wildC0').style.backgroundColor="#e6a8ff";
    document.getElementById('wildC0').style.borderColor="#e6a8ff";
    document.getElementById('wildC0').style.color="black";
    
    document.getElementById('wildC1').style.backgroundColor="#e6a8ff";
    document.getElementById('wildC1').style.borderColor="#e6a8ff";
    document.getElementById('wildC1').style.color="black";
    
    document.getElementById('w2').checked=true;
    
    disable('letter7');
    disable('letter6');
    
    wildNum = 2;
}


function disable(id){
    x = document.getElementById(id);
    x.selectedIndex = "1";
    x.disabled = true;
}

function undisable(id){
    x = document.getElementById(id);
    x.selectedIndex = "0";
    x.disabled = false;
}


function validate() {
    
    var good = true;
    var lettersArr = [];
    var isLetter = 0;
    for (var i=1; i<=(7-wildNum); i++){
        var name = "letter"+i;
        var temp = document.getElementById(name);
        lettersArr.push(temp.options[temp.selectedIndex].value);
        if(temp.options[temp.selectedIndex].value != "NA"){
            isLetter++;
        }
    }
    
    for (i = 0; i<wildNum; i++){
        lettersArr.push("*");
    }
    
    
    isLetter += wildNum;
    
    var radio = document.getElementsByName('wild')
            
    var wild = "";
                
    for (var i = 0; i<radio.length; i++){
        if (radio[i].checked){
            wild = radio[i].value;
        }
    }
    
    
    var lenTemp = document.getElementById("wLen").value;
    var len = 0;
    
    if (isNaN(lenTemp)){
        good = false;
    }
    else if (lenTemp == ""){
        good = false;
    }
    else{
        len = parseInt(lenTemp, 10);
    }
    
    if (len <1 || len>7){
        good = false;
    }
    
    
    if (isLetter < (len)){
        good = false; 
    }
    
    
    posArr = [];
    
    for (var i=1; i<=7; i++){
        var name = "pos"+i;
        var temp = document.getElementById(name).value;
        
        if(posArr.includes(temp) && temp != ""){
            good = false;
        }
        posArr.push(temp);
        
    }
    
    for (var i=0; i<7; i++)
    {
        posTemp = parseInt(posArr[i], 10);
        letterTemp = lettersArr[i];
        if (!isNaN(posTemp)&&(letterTemp=="NA" || posTemp<1 || posTemp>len))
        {
            good = false;
        }
    }
    
    
    
    if (good){
        scrabbleResults();
    }
    else{
        alert("Please fix the invalid input in one or more of the fields.")
    }
}

function scrabbleResults() {

	$.get({
		url: 'scrabble_endpoint',
		data: $('#myForm').serialize(),
		success: function(data){
			n=data;
			
			var words = data['final'];
			
			document.getElementById("results").style.display = "inline";
			
			var len = words.length;
			
			var word1 = "";
			var word2 = "";
			var word3 = "";
			var word4 = "";
			
			if (len == 0){
			    word1 = "N/A";
			}
			
			else{

			    var numPcol = Math.ceil(len/4); 
			
			    
			
			    for (var i=0; i<len; i++){
			        if (i%4 == 0){
			            word1+=words[i]+"\n\n"
			        }
			        else if (i%4 == 1){
			            word2+=words[i]+"\n\n"
			        }
			        else if (i%4 == 2){
			            word3+=words[i]+"\n\n"
			        }
			        else{
			            word4+=words[i]+"\n\n"
			        }
			    }
			    
			}
			
			$('#r1R').html(word1);
			$('#r2R').html(word2);
			$('#r3R').html(word3);
			$('#r4R').html(word4);


		},
		error: function(data){

		}
    });
}



