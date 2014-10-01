function htmlFile(src,fxn){
 	var func = fxn;
 	var http = new XMLHttpRequest();
 	var ret =0;
 	
 	function handleResponse() 
	{    
		if (http.readyState == 4){
			ret = http.responseXML;
			func(ret);
		}
	}
 	
 	http.open('get', src);
 	http.responseType = "document";
	http.onreadystatechange = handleResponse;
	http.send(null);
	
	return ret;
 }
 
 