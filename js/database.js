var id = "";

//Google "javascript modify select options"
var temp = document.getElementById("dropDown");


function validateSelect() {
    
    var temp = document.getElementById("dropDown");
    if (temp.options[temp.selectedIndex].value == undefined){
        document.getElementById("err2").style.visibility = "visible";
        document.getElementById("editInfo").style.visibility = "hidden";
    }
    else {
        document.getElementById("err2").style.visibility = "hidden";
        resultSelect();
    }
    
}

function resultSelect() {
    $.get({
		url: 'dataB_resultEnd',
		data: $('#formChoose').serialize(),
		success: function(data){
			n=data;
			
			id = data['id'];
			var name = data['name'];
			
			document.getElementById("editInfo").style.visibility = "visible";
			
			$('#idSelect').html("ID #"+id+" is "+name);
		},
		error: function(data){

		}
    });
}


function validateMod() {
    
    $.get({
		url: 'dataB_updateEnd',
		data: $('#formChoose').serialize(),
		success: function(data){
			n=data;
			
			var name = document.getElementById("modName").value;
		},
		error: function(data){

		}
    });
}


function validateAdd() {
    
    var good = true;
    var idAdd = document.getElementById("newID").value;
    var temp = document.getElementById("dropDown");
    
    
    if (isNaN(idAdd)){
        good = false;
    }
    
    for (var i = 0; i<temp.length; i++){
        if(temp.options[i].value == idAdd){
            good = false;
        }
    }
    
    var nameAdd = document.getElementById("newName").value;
    
    if (!good){
        document.getElementById("err").style.visibility = "visible";
        document.getElementById("go").style.visibility = "hidden";
    }
    else {
        document.getElementById("err").style.visibility = "hidden";
        //
        resultAdd();
    }
}

function resultAdd() {
    $.get({
		url: 'dataB_addEnd', 
		data: $('#formAdd').serialize(),
		success: function(data){
			n=data;
			
			var idAdd = document.getElementById("newID").value;
			var temp = document.getElementById("dropDown");
			
			var option = document.createElement("option");
            option.text = idAdd;
            option.value = idAdd;
            
            var isLast = true;
            
            

			for (var i = 0; i<temp.length; i++){
                if(temp.options[i].value > parseInt(idAdd)){
                    temp.add(option, i);
                    isLast = false;
                    break;
                }
            }
            
            if (isLast){
                temp.add(option);
            }

			document.getElementById("go").style.visibility = "visible";
		},
		error: function(data){

		}
    });
}