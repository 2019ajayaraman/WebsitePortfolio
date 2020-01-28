
capital={
    'AL': 'Montgomery',
    'AK': 'Juneau',
    'AZ':'Phoenix',
    'AR':'Little Rock',
    'CA': 'Sacramento',
    'CO':'Denver',
    'CT':'Hartford',
    'DE':'Dover',
    'FL': 'Tallahassee',
    'GA': 'Atlanta',
    'HI': 'Honolulu',
    'ID': 'Boise',
    'IL': 'Springfield',
    'IN': 'Indianapolis',
    'IA': 'Des Monies',
    'KS': 'Topeka',
    'KY': 'Frankfort',
    'LA': 'Baton Rouge',
    'ME': 'Augusta',
    'MD': 'Annapolis',
    'MA': 'Boston',
    'MI': 'Lansing',
    'MN': 'St. Paul',
    'MO': 'Jackson',
    'MS': 'Jefferson City',
    'MT': 'Helena',
    'NE': 'Lincoln',
    'ND': 'Carson City',
    'NH': 'Concord',
    'NJ': 'Trenton',
    'NM': 'Santa Fe',
    'NV': 'Carson City',
    'NY': 'Albany',
    'NC': 'Raleigh',
    'ND': 'Bismarck',
    'OH': 'Columbus',
    'OK': 'Oklahoma City',
    'OR': 'Salem',
    'PA': 'Harrisburg',
    'RI': 'Providence',
    'SC': 'Columbia',
    'SD': 'Pierre',
    'TN': 'Nashville',
    'TX': 'Austin',
    'UT': 'Salt Lake City',
    'VT': 'Montpelier',
    'VA': 'Richmond',
    'WA': 'Olympia',
    'WV': 'Charleston',
    'WI': 'Madison',
    'WY': 'Cheyenne'  
}

west1 = ['WA', 'OR', 'CA', 'AK', 'NV','ID'];
west2 = ['HI', 'UT', 'AZ', 'MT', 'WY', 'CO', 'NM'];
mid1 = ['ND', 'SD', 'NE', 'KS', 'OK', 'TX'];
mid2 = ['MN', 'IA', 'MO', 'AR', 'LA', 'WI', 'IL'];
east1 = ['MI', 'IN', 'OH', 'KY', 'TN', 'MS', 'AL'];
east2 = ['ME', 'VT', 'NH', 'MA', 'CT', 'RI', 'NY', 'PA', 'NJ', 'DE', 'MD', 'WV', 'VA', 'NC', 'SC', 'GA', 'FL'];

capt = Object.keys(capital);

captSize = capt.length;

currState = ""

count = 0;
finished = false;
results = false;

stateVal = 0;

answered = [];

//display the capital
function displayCap() {
    
    if (captSize == count)
    {
        document.getElementById('whatCapital').innerHTML = "Congratulations, You Finished!";
        finished = true;
        results = true;
        currState = "";
        clearInterval(timer);
        document.getElementById('buttonTime').innerHTML = "Show Results"; 
        timeAnim();
    }
    else
    {
        ind = Math.floor(Math.random() * capt.length);
        while (capital[capt[ind]]== undefined)
        {
            ind = Math.floor(Math.random() * capt.length);
        }

        state = capt[ind];
        sCap = capital[state];
    
        currState = state;
        
        document.getElementById('whatCapital').innerHTML = sCap;
    }
}


function getColor(){
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var col = "rgb(" + r + "," + g + "," + b + ")";
    return col;
}

//US Animation Coloring
colorCount = 0;

function animate(){
    if (colorCount%3 == 0){
        red(captAfter, west1);
        white(captAfter, west2);
        blue(captAfter, mid1);
        red(captAfter, mid2);
        white(captAfter, east1);
        blue(captAfter, east2);
    }
    else if (colorCount%3 == 1){
        blue(captAfter, west1);
        red(captAfter, west2);
        white(captAfter, mid1);
        blue(captAfter, mid2);
        red(captAfter, east1);
        white(captAfter, east2);
        
    }
    else {
        white(captAfter, west1);
        blue(captAfter, west2);
        red(captAfter, mid1);
        white(captAfter, mid2);
        blue(captAfter, east1);
        red(captAfter, east2);
        
    }
    
    colorCount++;
    
}

function animateComplete(){
    
    if (colorCount%3 == 0){
        red(answered, west1);
        white(answered, west2);
        blue(answered, mid1);
        red(answered, mid2);
        white(answered, east1);
        blue(answered, east2);
    }
    else if (colorCount%3 == 1){
        blue(answered, west1);
        red(answered, west2);
        white(answered, mid1);
        blue(answered, mid2);
        red(answered, east1);
        white(answered, east2);
        
    }
    else {
        white(answered, west1);
        blue(answered, west2);
        red(answered, mid1);
        white(answered, mid2);
        blue(answered, east1);
        red(answered, east2);
        
    }
    
    colorCount++;
    
}

function red(arr, colList){
    for (var i=0; i<arr.length; i++){
        if (colList.includes(arr[i]))
        {
            document.getElementById(arr[i]).style['fill'] = "rgb(191, 10, 48)";
        }
    }
}

function blue(arr, colList){
    for (var i=0; i<arr.length; i++){
        if (colList.includes(arr[i]))
        {
             document.getElementById(arr[i]).style['fill'] = "rgb(0, 40, 104)";
        }
       
    }
}

function white(arr, colList){
    for (var i=0; i<arr.length; i++){
        if (colList.includes(arr[i]))
        {
            document.getElementById(arr[i]).style['fill'] = "rgb(174, 168, 211)";
        }
    }
    
}

//reset all variables for restarting
function clear()
{

    capital={
    'AL': 'Montgomery',
    'AK': 'Juneau',
    'AZ':'Phoenix',
    'AR':'Little Rock',
    'CA': 'Sacramento',
    'CO':'Denver',
    'CT':'Hartford',
    'DE':'Dover',
    'FL': 'Tallahassee',
    'GA': 'Atlanta',
    'HI': 'Honolulu',
    'ID': 'Boise',
    'IL': 'Springfield',
    'IN': 'Indianapolis',
    'IA': 'Des Monies',
    'KS': 'Topeka',
    'KY': 'Frankfort',
    'LA': 'Baton Rouge',
    'ME': 'Augusta',
    'MD': 'Annapolis',
    'MA': 'Boston',
    'MI': 'Lansing',
    'MN': 'St. Paul',
    'MO': 'Jackson',
    'MS': 'Jefferson City',
    'MT': 'Helena',
    'NE': 'Lincoln',
    'ND': 'Carson City',
    'NH': 'Concord',
    'NJ': 'Trenton',
    'NM': 'Santa Fe',
    'NV': 'Carson City',
    'NY': 'Albany',
    'NC': 'Raleigh',
    'ND': 'Bismarck',
    'OH': 'Columbus',
    'OK': 'Oklahoma City',
    'OR': 'Salem',
    'PA': 'Harrisburg',
    'RI': 'Providence',
    'SC': 'Columbia',
    'SD': 'Pierre',
    'TN': 'Nashville',
    'TX': 'Austin',
    'UT': 'Salt Lake City',
    'VT': 'Montpelier',
    'VA': 'Richmond',
    'WA': 'Olympia',
    'WV': 'Charleston',
    'WI': 'Madison',
    'WY': 'Cheyenne'  
    }

    capt = Object.keys(capital);

    captSize = capt.length;

    currState = ""

    count = 0;
    finished = false;
    results = false;

    stateVal = 0;
    scoredBool = false;

    answered = [];

    if (timeBool)
    {
        timeStop();
    }
    if (animBool)
    {
        animStop();
    }
    
    clicked = 0;
    
    var DisplayBox = document.getElementById('myTimer');
    countD = 179;
    timeElapse = 0;
    
    document.getElementById('buttonTime').innerHTML = "Start";
    document.getElementById('whatCapital').innerHTML = "Capital";
    
    for (var i=0; i<capt.length; i++){

        document.getElementById(capt[i]).style['fill'] = "rgb(170,170,170)";
        
    }
    
    DisplayBox.innerHTML = getTimeLayout(countD);
}





