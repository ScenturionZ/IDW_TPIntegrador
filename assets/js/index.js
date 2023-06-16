document.addEventListener("DOMContentLoaded", function(){
	const API_URL = "https://newsapi.org/v2/top-headlines?country=ar&category=business&pageSize=12&apiKey=";
    const API_KEY = "41c0ed79d3ef46d69feb8b3bd014e551";
    const url = API_URL + API_KEY;
	let html = '';
	let titleNovedad = '';
	let dateNovedad;
	getData(url).then(function(results){
		for(let art of results.articles){
			titleNovedad = art.title.replace(" - " + art.author, "");
			let date = art.publishedAt.substring(0, art.publishedAt.indexOf("T")).split("-");
			if(titleNovedad.indexOf("?") != titleNovedad.length - 1){
				titleNovedad += ".";
			}
			dateNovedad = date[2] + "/" + date[1] + "/" + date[0];
			html += '<a href="' + art.url + '" target="_blank" class="text-decoration-none">' + 
						'<div class="card mx-auto" height="12rem">' + 
							'<h3 class="card-header fw-bold">Autor: ' + art.author + '</h3>' +
							'<div class="card-body">'+
								'<h5 class="card-title">'+ titleNovedad + '</h5>' +
								'<p class="card-text position-absolute bottom-0 end-0 me-3 mb-3">Fecha: ' + dateNovedad + '</p>' +
							'</div>' +
						'</div>' +
					'</a>';
		}
		document.getElementById("novedadesBody").innerHTML = html;
	});
});

async function getData(url) {
	let response = await fetch(url);
	let data = await response.json();
	return data;
}