timer = setInterval(timeDisplay, 1000);
$('#autoBuyInfo').html((autoAmount+2)+" cookies/sec");
$('#cookieAuto').html("$"+thresholdA)
display();

function cookieClick(){
    document.getElementById("save").disabled = false;
    money+=amount;
    display();
}

function display(){
    $('#cookieVal').html(money);
   
   if (money >= thresholdB){
       document.getElementById("cookieBoost").disabled = false;
   }
   
   if (money >= thresholdA){
       document.getElementById("cookieAuto").disabled = false;
   }
   else {
       document.getElementById("cookieAuto").disabled = true;
   }
}

function cookieBoost (){
    document.getElementById("save").disabled = false;
    amount++;
    
    money-=thresholdB;
    
    thresholdB*=10;
    
    if (money < thresholdB){
       document.getElementById("cookieBoost").disabled = true;
   }
   
   $('#boostBuyInfo').html((amount+1)+" cookies/click");
   $('#boostDipl').html(amount);
   $('#cookieBoost').html("$"+thresholdB)
   display();
    
}

$('#boostBuyInfo').html((amount+1)+" cookies/click");

document.getElementById("cookieBoost").disabled = true;

function saveValid(){
    document.getElementById("save").disabled = true;
    
    document.getElementById("scoreMoney").value = money;
    document.getElementById("boostNum").value = amount;
    document.getElementById("autoNum").value = autoAmount;
    
    saveGame();
    
}

function cookieAuto(){
    document.getElementById("save").disabled = false;
    autoAmount+=2;
    
    money-=thresholdA;
    
    thresholdA*=15;
    
    if (money < thresholdA){
       document.getElementById("cookieAuto").disabled = true;
   }
   
   $('#autoBuyInfo').html((autoAmount+2)+" cookies/sec");
   $('#autotDipl').html(autoAmount);
   $('#cookieAuto').html("$"+thresholdA)
   display();
    
}


function timeDisplay(){
    money += autoAmount;
    if (autoAmount > 0){
        document.getElementById("save").disabled = false;
    }
    display();
}

function saveGame(){
    $.get({
		url: 'cclick_saveEnd', 
		data: $('#submInfo').serialize(),
		success: function(data){
			n=data;
			
		},
		error: function(data){

		}
    });
}

function displayRank(){
    $.get({
		url: 'cclick_rankEnd', 
		data: $('#submInfo').serialize(),
		success: function(data){
			n=data;
			
			var dict = (data["rankInfo"]);
			
			for (var i=0; i<dict.length; i++){
			    var curr = dict[i];
			    $('#i'+(i+1)).html(i+1);
			    $('#p'+(i+1)).html(curr.id);
			    $('#s'+(i+1)).html(curr.score);
			}
			
			document.getElementById("rankings").style.visibility = "visible";
			
		},
		error: function(data){

		}
    });
}
