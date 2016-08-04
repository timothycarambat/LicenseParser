regex = new RegExp("(DCA|DCB|DCD|DBA|DCS|DAC|DAD|DBD|DBB|DBC|DAY|DAU|DAG|DAI|DAJ|DAK|DAQ|DCF|DCG|DDE|DDF|DDG|DAH|DAR|DAS|DAT|DCS)");

$(document).ready(function(){
	$('#submit').click(function(){
			$('#raw').text($('#data').val());

			GetCompliance();
			GetIINtoSubType();
			GetSubfileType();
			GetNumericData('DAQ','#ID'); //get ID 
			GetNumericData('DAW','#weight'); //get Weight
			GetNumericData('DAU','#height'); //get height
			GetNumericData('DBB','#DOB'); //get DOB
			GetNumericData('DBA','#expire'); //get DOB
			GetNumericData('DBD','#issue'); //get DOB
			GetTextData('DAA','#name');
			GetTextData('DAG','#address');
			GetTextData('DAK','#zip');
			GetTextData('DAI','#city');
	})
});//end of Doc.ready

function GetCompliance(){
	  var str      = $('#raw').text();
	  var index 	  = str.match(/[0-9]/).index; //looking for first number and its position in string
	  var comp     = str.slice(0,index);

	  str = str.slice(index,str.length);       	  //pops the finding off the string

	$('#compliance').text(comp);
	$('#raw').text(str);

	//Result should be @ANSI or @AAMVA
}

function GetIINtoSubType(){						 //This is a root function-meaning that it will start a chain of sibling functions to get IIN,AAMVA,and JDV
	 var str      = $('#raw').text();
	 var index 	  = str.match(/[a-zA-Z]/).index; //looking for the first letter eg."DL"
	 var data     = str.slice(0,index);

	 str 		  = str.slice(index,str.length); //pops the finding off the main string and passes it as data into subs
	$('#raw').text(str);

	GetIIN(data);
}

function GetIIN(data){
	 var str      = data;
		 $('#IIN').text(str.slice(0,6));
		 str 	   = str.slice(6,str.length);   //pops the findings off the substring

		 GetAAMVAnum(str)

}
function GetAAMVAnum(data){
	 var str      = data;
		 $('#AAMVA').text(str.slice(0,2));
		 str 	   = str.slice(2,str.length);  //pops the findings off the substring

		 GetJDV(str);

}

function GetJDV(data){
	 var str      = data;
		 $('#JDV').text(str.slice(0,2));
		 str 	   = str.slice(2,str.length);  //pops the findings off the substring
		 if(str.length !== 0){
		 	GetNumOfEntries(str);
		 }else{
		 	$('#NOE').text('No Data');
		 }
}

function GetNumOfEntries(data){
	 $('#NOE').text(data);
}

function GetSubfileType(){
	var str      	 = $('#raw').text();
	var splitData    = str.substr(0,2);

	$('#subType').text(splitData);
	var len = splitData.length;
	str = str.substr(str.indexOf(splitData)+len);
	$('#raw').text(str);

	lookFor(str,splitData);
}

function lookFor(inStr,term){
	var str 	  = inStr;
	var index 	  = str.search(term);

		if( index != -1){
			str 	  = str.slice(index+term.length,str.length);
			$('#raw').text(str);
		}else{
			 var index 	  = str.match(/[a-zA-Z]/).index; //looking for the first letter eg."DL"
			 var data     = str.slice(0,index);
			 str 		  = str.slice(index,str.length);
			$('#raw').text(str);
		}
}

function GetNumericData(search_term,HTML_ID){    //use for Weight,Height,and DOB
	var str  = $('#raw').text();
	var term = search_term;				//declare search term

	var index = str.search(term);	//look in origin string for it
	var pre = str.substr(0,index+term.length);	//split all data before its term + term
	var post = str.substr(index+term.length,str.length); //split all data after term

	var index2 = post.search(/[a-zA-Z]/); //license is always numeric so just search until next code
	var val = post.slice(0,index2);	  //take post string and go to where new code starts, this is our number

	var rData = term + val; 			  //Data to be removed from string

	str = str.replace(rData,"");		  //remove data from string(even if only code is there)

		if(val.length > 0){
			$(HTML_ID).text(val);
			$('#raw').text(str);
		}else{
			$(HTML_ID).text('Not Found');
			$('#raw').text(str);
		}
}


function GetTextData(search_term,HTML_ID){
	 var str  = $('#raw').text();
	 var term = search_term;									

	 var index = str.search(term);						  //declare search term
	 var pre = str.substr(0,index+term.length);			  //look in origin string for it
	 var post = str.substr(index+term.length,str.length); //split all data after term

	 var index2 = post.search(regex); 				
	 var val = post.slice(0,index2);

	var rData = term + val; 		

	str = str.replace(rData,"");		  
	
		if(val.length > 0){
			$(HTML_ID).text(val);
			$('#raw').text(str);
		}else{
			$(HTML_ID).text('Not Found');
			$('#raw').text(str);
		}
}
