var 	logoUrl = chrome.extension.getURL('logo_vidal.png'),
    	search = function() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://api.vidal.fr/rest/api/products?page-size=1000', true);
		xhr.onreadystatechange = function() {
  			if (xhr.readyState == 4) {
    				console.log(xhr.responseText);
 			}
		}
		xhr.send();
	};

document.querySelector('body').insertAdjacentHTML(
	'beforeend', 
	'<img id="vidal-search" src="' + logoUrl + '" alt="Vidal Search"  />'
);

search();
