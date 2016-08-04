regex = new RegExp("(DCA|DCB|DCD|DBA|DCS|DAC|DAD|DBD|DBB|DBC|DAY|DAU|DAG|DAI|DAJ|DAK|DAQ|DCF|DCG|DDE|DDF|DDG|DAH|DAR|DAS|DAT)");

$(document).ready(function(){
	$('#submit').click(function(){
			$('#raw').text($('#data').val());

			GetCompliance();
			GetIINtoSubType();
			GetSubfileType();
			GetIdNum();
			GetWeight();
			GetHeight();
			GetDOB();
			GetFullName();
			GetAddress();
			GetZipcode();
			GetCity();
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

function GetIdNum(){
	var str  = $('#raw').text();
	var term ='DAQ';				//declare search term

	var index = str.search(term);	//look in origin string for it
	var pre = str.substr(0,index+term.length);	//split all data before its term + term
	var post = str.substr(index+term.length,str.length); //split all data after term

	var index2 = post.search(/[a-zA-Z]/); //license is always numeric so just search until next code
	var IDnum = post.slice(0,index2);	  //take post string and go to where new code starts, this is our number

	var rData = term + IDnum; 			  //Data to be removed from string

	str = str.replace(rData,"");		  //remove data from string(even if only code is there)

		if(IDnum.length > 0){
			$('#ID').text(IDnum);
			$('#raw').text(str);
		}else{
			$('#ID').text('Not Found');
			$('#raw').text(str);
		}
}

function GetWeight(){
	var str  = $('#raw').text();
	var term ='DAW';									//declare search term

	var index = str.search(term);						//look in origin string for it
	var pre = str.substr(0,index+term.length);			//split all data before its term + term
	var post = str.substr(index+term.length,str.length); //split all data after term

	var index2 = post.search(/[a-zA-Z]/); 				
	var weight = post.slice(0,index2);

	var rData = term + weight; 			  //Data to be removed from string

	str = str.replace(rData,"");		  //remove data from string(even if only code is there)
	
		if(weight.length > 0){
			$('#weight').text(weight);
			$('#raw').text(str);
		}else{
			$('#weight').text('Not Found');
			$('#raw').text(str);
		}
}

function GetHeight(){
	var str  = $('#raw').text();
	var term ='DAU';									//declare search term

	var index = str.search(term);						//look in origin string for it
	var pre = str.substr(0,index+term.length);			//split all data before its term + term
	var post = str.substr(index+term.length,str.length); //split all data after term

	var index2 = post.search(/[a-zA-Z]/); 				
	var height = post.slice(0,index2);

	var rData = term + height; 			  //Data to be removed from string

	str = str.replace(rData,"");		  //remove data from string(even if only code is there)
	
		if(height.length > 0){
			$('#height').text(height);
			$('#raw').text(str);
		}else{
			$('#height').text('Not Found');
			$('#raw').text(str);
		}
}

function GetDOB(){
	var str  = $('#raw').text();
	var term ='DBB';									//declare search term

	var index = str.search(term);						//look in origin string for it
	var pre = str.substr(0,index+term.length);			//split all data before its term + term
	var post = str.substr(index+term.length,str.length); //split all data after term

	var index2 = post.search(/[a-zA-Z]/); 				
	var DOB = post.slice(0,index2);

	var rData = term + DOB; 			  //Data to be removed from string

	str = str.replace(rData,"");		  //remove data from string(even if only code is there)
	
		if(DOB.length > 0){
			$('#DOB').text(DOB);
			$('#raw').text(str);
		}else{
			$('#DOB').text('Not Found');
			$('#raw').text(str);
		}
}

function GetFullName(){
	 var str  = $('#raw').text();
	 var term ='DAA';									

	 var index = str.search(term);						  //declare search term
	 var pre = str.substr(0,index+term.length);			  //look in origin string for it
	 var post = str.substr(index+term.length,str.length); //split all data after term

	 var index2 = post.search(regex); 				
	 var NOM = post.slice(0,index2);

	var rData = term + NOM; 		

	str = str.replace(rData,"");		  
	
		if(NOM.length > 0){
			$('#name').text(NOM);
			$('#raw').text(str);
		}else{
			$('#name').text('Not Found');
			$('#raw').text(str);
		}
}

function GetAddress(){
	 var str  = $('#raw').text();
	 var term ='DAG';									

	 var index = str.search(term);						  //declare search term
	 var pre = str.substr(0,index+term.length);			  //look in origin string for it
	 var post = str.substr(index+term.length,str.length); //split all data after term

	 var index2 = post.search(regex); 							
	 var address = post.slice(0,index2);

	var rData = term + address; 		

	str = str.replace(rData,"");		  
	
		if(address.length > 0){
			$('#address').text(address);
			$('#raw').text(str);
		}else{
			$('#address').text('Not Found');
			$('#raw').text(str);
		}
}

function GetZipcode(){
	 var str  = $('#raw').text();
	 var term ='DAK';									

	 var index = str.search(term);						  //declare search term
	 var pre = str.substr(0,index+term.length);			  //look in origin string for it
	 var post = str.substr(index+term.length,str.length); //split all data after term

	 var index2 = post.search(regex); 							
	 var zip = post.slice(0,index2);

	var rData = term + zip; 		

	str = str.replace(rData,"");		  
	
		if(zip.length > 0){
			$('#zip').text(zip);
			$('#raw').text(str);
		}else{
			$('#zip').text('Not Found');
			$('#raw').text(str);
		}
}

function GetCity(){
	 var str  = $('#raw').text();
	 var term ='DAI';									

	 var index = str.search(term);						  //declare search term
	 var pre = str.substr(0,index+term.length);			  //look in origin string for it
	 var post = str.substr(index+term.length,str.length); //split all data after term

	 var index2 = post.search(regex); 							
	 var city = post.slice(0,index2);

	var rData = term + city; 		

	str = str.replace(rData,"");		  
	
		if(city.length > 0){
			$('#city').text(city);
			$('#raw').text(str);
		}else{
			$('#city').text('Not Found');
			$('#raw').text(str);
		}
}


// Ecetera ecetera you should be able to handle it from here.
//TODO: Make a generic function for text handling and one for numeric handling(youll just have to pass data to it!)
