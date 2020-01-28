//Start, Pause, Show Results Multi-purpose button
function stopORstart()
{
    if (!results)
    {
        if (countD != -1){
        
            if (clicked%2 === 0){
                document.getElementById('buttonTime').innerHTML = "Pause";
                timeStart();
            }
            else
            {
                document.getElementById('buttonTime').innerHTML = "Start";
                timeStop(); 
            }
        
            clicked++;
        }
    
        else
        {
            document.getElementById('buttonTime').innerHTML = "Show Results"; 
        }
    }
    else{
        
        scoring();
        
    }
    
    
}


//restart everything
function restart()
{
    clear();
}

//format time into "normal" layout
function getTimeLayout(time){
    var sec = time%60;
    var min = Math.floor(time/60);
    
    var out = "";
    if (sec<10)
    {
        out = "0"+min+":"+"0"+sec;
    }
    else
    {
        out = "0"+min+":"+sec;
    }
    return out;
}

clicked = 0;
animBool = false;
timeBool = false;

//US Animation --> additional componenet
//rotatate through US colors
//choose whether to color the states that have been clicked or those that have not
function timeAnim ()
{
    captAfter = Object.keys(capital);
    animBool = true;
    
    
    if (answered.length < 25)
    {
        animate();
        anim = setInterval(animate, 1500);
    }
    else{
        animateComplete();
        anim = setInterval(animateComplete, 1500);
    }
    
}

//stop US animation
function animStop()
{
    clearInterval(anim);
    animBool = false;
}

//start timer
function timeStart()
{
  display();
  timer = setInterval(display, 1000);
  displayCap();
  timeBool = true;
}

//stop timer
function timeStop()
{
    clearInterval(timer);
    document.getElementById('whatCapital').innerHTML = "Pause";
    currState = "";
    timeBool = false;
}

//Timer display, Connect Capital Display to Timer
function display()
{
    
    if (countD == -1) {
    clearInterval (timer);
    
    if (!finished){
        document.getElementById('whatCapital').innerHTML = "Game Over";
        results = true;
    }
    
    document.getElementById('buttonTime').innerHTML = "Show Results"; 
    currState = "";
    
    timeAnim();

    return;
  }
  
    DisplayBox.innerHTML = getTimeLayout(countD); 
    
    countD--;
    timeElapse++;
    
    
}


var DisplayBox = document.getElementById('myTimer');
countD = 179;
timeElapse = 0;





