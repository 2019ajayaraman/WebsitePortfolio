//Info: https://state.1keydata.com/bordering-states-list.php

function doStatesBorder (state1, state2){
  s1 = getState(state1);
  s2 = getState(state2);
  if (borders[s1] == undefined || borders[s2] == undefined)
  {
      return undefined;
  }
  return (borders[s1].includes(s2));
}

function getStateBorders (state1){
  s1 = getState(state1);
  
  if (borders[s1] == undefined)
  {
      return undefined;
  }
  
  return borders[s1];
}

function getCloseStates (state1){
  s1 = getState(state1);
  st1 = borders[s1];
  
  if (st1 == undefined)
  {
      return undefined;
  }
  

  close = [];

  st1.forEach (
    function (e){
      if (! close.includes(e) && !(e===s1)){
          close.push(e);
        }
      st2 = borders[e];
      st2.forEach( function(x){
        if (! close.includes(x) && !(x===s1)){
          close.push(x);
        }
      })
  })

  return close;

}

function statesWithBorders (num){

  bord = Object.keys(borders)
  lst = bord.reduce (function(out, state){
    if (borders[state].length == num)
    {
      out.push(state);
    }

    return out;
  }, []);


  return lst;

}


function getState (input){
  
  x = input.toLowerCase();
  y = x.split(" ");
    
  if ((y[0])==("washington") && y[1]==("dc"))
  {
    return "District of Columbia";
  }
  else if(y[0]==("district") && y[1]=="of" && y[2]=="columbia")
  {
    return "District of Columbia";
  }
  else if (input.length != 2)
  {
    name = y.map(function (elem){
      first = (elem.substring(0,1)).toUpperCase();

      return first+elem.substring(1);
    })

    return name.join(" ");
  }
    
  else
  {
    return abbrev[input];
  }
}


borders = {
  'Alabama': [	'Florida', 'Georgia', 'Mississippi', 'Tennessee'],
  'Alaska' : [],
'Arizona' : ['California', 'Colorado', 'Nevada', 'New Mexico', 'Utah'],
'Arkansas' : ['Louisiana', 'Mississippi', 'Missouri', 'Oklahoma', 'Tennessee', 'Texas'],
'California' : ['Oregon', 'Nevada', 'Arizona'],
'Colorado' : ['Arizona', 'Kansas', 'Nebraska', 'New Mexico', 'Oklahoma', 'Utah', 'Wyoming'],
'Connecticut' : ['Massachusetts', 'New York', 'Rhode Island'],
'Delaware' : ['Maryland', 'New Jersey', 'Pennsylvania'],
'Florida' : ['Alabama', 'Georgia'],
'Georgia' : ['Alabama', 'Florida', 'North Carolina', 'South Carolina', 'Tennessee'],
'Hawaii' : [],
'Idaho' : ['Montana', 'Nevada', 'Oregon', 'Utah', 'Washington', 'Wyoming'],
'Illinois' : ['Indiana', 'Iowa', 'Michigan', 'Kentucky', 'Missouri', 'Wisconsin'],
'Indiana' : ['Illinois', 'Kentucky', 'Michigan', 'Ohio'],
'Iowa' : ['Illinois', 'Minnesota', 'Missouri', 'Nebraska', 'South Dakota', 'Wisconsin'],
'Kansas' : ['Colorado', 'Missouri', 'Nebraska', 'Oklahoma'],
'Kentucky': [	'Illinois', 'Indiana', 'Missouri', 'Ohio', 'Tennessee', 'Virginia', 'West Virginia'],
'Louisiana': ['Arkansas', 'Mississippi', 'Texas'],
'Maine' : ['New Hampshire'],
'Maryland' : ['Delaware', 'Pennsylvania', 'Virginia', 'West Virginia', 'District of Columbia'],
'Massachusetts' : ['Connecticut', 'New Hampshire', 'New York', 'Rhode Island', 'Vermont'],
'Michigan' : [	'Illinois', 'Indiana', 'Minnesota' , 'Ohio', 'Wisconsin'],
'Minnesota' : ['Iowa', 'Michigan', 'North Dakota', 'South Dakota', 'Wisconsin'],
'Mississippi' : ['Alabama', 'Arkanssas', 'Louisiana', 'Tennessee'],
'Missouri' : [	'Arkansas', 'Illinois', 'Iowa', 'Kansas', 'Kentucky', 'Nebraska', 'Oklahoma', 'Tennessee'],
'Montanta' : ['Idaho', 'North Dakota', 'South Dakota', 'Wyoming'],
'Nebraska' : ['Colorado', 'Iowa', 'Kansas', 'Missouri', 'South Dakota', 'Wyoming'],
'Nevada' : ['Arizona', 'California', 'Idaho', 'Oregon', 'Utah'],
'New Hampshire' : ['Maine', 'Massachusetts', 'Vermont'],
'New Jersey' : ['Delaware', 'New York', 'Pennsylvania'],
'New Mexico' : [	'Arizona', 'Colorado', 'Oklahoma', 'Texas', 'Utah'],
'New York' : ['Connecticut', 'Massachusetts', 'New Jersey', 'Pennsylvania', 'Vermont'],
'North Carolina' : ['Georgia', 'South Carolina', 'Tennessee', 'Virginia'],
'North Dakota' : ['Minnesota', 'Montana', 'South Dakota'],
'Ohio' : ['Indiana', 'Kentucky', 'Michigan', 'Pennsylvania', 'West Virginia'],
'Oklahoma' : ['Arkansas', 'Colorado', 'Kansas', 'Missouri', 'New Mexico', 'Texas'],
'Oregon' : ['Washington', 'Idaho', 'California', 'Nevada'],
'Pennsylvania' : ['Arkansas', 'Colorado', 'Kansas', 'Missouri', 'New Mexico', 'Texas'],
'Rhode Island' : ['Connecticut', 'Massachusetts'],
'South Carolina' : ['Georgia', 'North Carolina'],
'South Dakota' : ['Iowa', 'Minnesota', 'Montana', 'Nebraska', 'North Dakota', 'Wyoming'],
'Tennessee' : ['Alabama', 'Arkansas', 'Georgia', 'Kentucky', 'Mississippi', 'Missouri', 'North Carolina', 'Virginia'],
'Texas' : ['Arkansas', 'Louisiana', 'New Mexico', 'Oklahoma'],
'Utah' : ['Arizona', 'Colorado', 'Idaho', 'Nevada', 'New Mexico', 'Wyoming'],
'Vermont' : ['Massachusetts', 'New Hampshire', 'New York'],
'Virginia' : ['Kentucky', 'Maryland', 'North Carolina', 'Tennessee', 'West Virginia', 'District of Columbia'],
'Washington' : ['Idaho', 'Oregon'],
'West Virginia' : ['Kentucky', 'Maryland', 'Ohio', 'Pennsylvania', 'Virginia'],
'Wisconsin' : ['Illinois', 'Iowa', 'Michigan', 'Minnesota'],
'Wyoming' : ['Colorado', 'Idaho', 'Montana', 'Nebraska', 'South Dakota', 'Utah'],
'District of Columbia' : ['Maryland', 'Virginia'],
'Other' : []
};

abbrev = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}


module.exports.doStatesBorder = doStatesBorder;
module.exports.getStateBorders = getStateBorders;
module.exports.getCloseStates = getCloseStates;
module.exports.statesWithBorders = statesWithBorders;
module.exports.getState = getState;
module.exports.bord = borders;