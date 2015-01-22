var 	logoUrl = chrome.extension.getURL('logo_vidal.png'),
    	search = function() {
		alert('Calling APIs');
	};
document.querySelector('body').insertAdjacentHTML(
	'beforeend', 
	'<input id="vidal-search" type="image" src="' + logoUrl + '" alt="Vidal Search"  />'
);

document.querySelector('#vidal-search')
	.addEventListener('click', search);
