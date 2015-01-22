var 	logoUrl = chrome.extension.getURL('logo_vidal.png'),
    	search = function() {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'http://api.vidal.fr/rest/api/molecules?startwith=a&page-size=1000', true);
			xhr.onreadystatechange = function() {
	  			if (xhr.readyState == 4) {
					var results = [];
	  				var $xml = $($.parseXML(xhr.responseText));
	    				var all = $xml.find('entry id, entry title');
					$.each(all, function(i,el) {
						var $el = $(el);
						if (i % 2 == 0) {
							results.push({'title': $el.text()});
						}
						else {
							var prev = results[Math.floor(i/2)]['id'] = replaceVidalId($el.text());
						}
						if (i == all.length - 1) {
							highlight(results);
						}
					});
	 			}
			}
			xhr.send();
		},
	replaceVidalId = function(text) { // terrible hack :)
		return text.match(/\d+/)[0];
	},
	highlight = function(results) {
		var titles = $.map(results, function(res) {
			return res.title;
		});
		$("body *").highlight(titles, {
			element: 'a', 
			className:'vidal-result',
			wordsOnly: true
		});
		$(".vidal-result").each(function(unused, el) {
			for (var i = 0; i < results.length; i++) {
				var res = results[i];
				if (res.title.toLowerCase() == $(el).text()) {
					el.href = "http://www.vidal.fr/substances/"+ res.id +"/"+ encodeURIComponent(res.title) +"/";
					el.target = '_blank';
				}
			}
		});
	};

document.querySelector('body').insertAdjacentHTML(
	'beforeend', 
	'<img id="vidal-search" src="' + logoUrl + '" alt="Vidal Search"  />'
);

search();
