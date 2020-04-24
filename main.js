$( document ).ready(function() {
  var lingue = ["en","it","es","fr","pt","ja"];
// handlebars--------------
  var source = document.getElementById("template-lista").innerHTML;
  var template = Handlebars.compile(source);

 $("#button-cerca").click(function () {

    generaChiamata("https://api.themoviedb.org/3/search/movie/","2d88d072c44aeaea767ce1752df8aebd","film");
    generaChiamata("https://api.themoviedb.org/3/search/tv/","2d88d072c44aeaea767ce1752df8aebd","serie");

   }
 )



 function generaOutput(array,test) {

   for (var i = 0; i < array.length; i++) {
     if (test == "film") {
       var nome = array[i].title;
       var nomeOrig = array[i].original_title;

     }else if (test == "serie") {
       var nome = array[i].name;
       var nomeOrig = array[i].original_name;

     }
     var voto = Math.ceil(array[i].vote_average / 2);
     var linguaOriginale = array[i].original_language;

     // aggiunta delle bandiere--------------
       for (var k = 0; k < lingue.length; k++) {
         if (lingue[k]==linguaOriginale) {
           linguaOriginale = "<img src=immagini/" + lingue[k]  + ".png class='bandiere' alt='img'>"
         }
       }

     // handlebars---------------
     var context = {
       immagine: locandina(array[i].poster_path),
       titolo: nome,
       titoloOriginale: nomeOrig,
       linguaOriginale: linguaOriginale,
       voto: stelle(voto),
       tipo: test,
       overview: array[i].overview
     };


     var html = template(context);
     $("ul").append(html);
   }
 }



// funzione per mettere le stelline del voto
 function stelle(voto) {
  var stelline = "";
  for (var j = 0; j < voto; j++) {
   stelline +="&starf;";
  }
  if (voto<5) {
    var numStelleVuote = 5 - voto;
    for (var z = 0; z < numStelleVuote; z++) {
     stelline += "&star;";
    }
 }
 return stelline
}
// funzione per limmagine del poster
function locandina(posterpath) {
  var poster = "";
  if (posterpath===null) {
    poster = '<img src="immagini/altimg.jpg"  class="posterimg" alt="img">';
  }else {

    poster = '<img src="https://image.tmdb.org/t/p/w342' + posterpath + ' " class="posterimg"  alt="img">';
  }
  return poster
}

function generaChiamata(url,key,test) {
  var input = $("#search").val();
  // ad ogni ricerca svuoto ul per non accumulare i risultati
  $("ul").html("");
  if (input != "") {
    // chiamata per i film-------------------
    $.ajax({
     url: url,
     method: "GET",
     data: {
      api_key: key,
      language: "it",
      query: input
     },
     success: function (data,stato) {

      var arrayFilm = data.results;
      generaOutput(arrayFilm,test);
    },
    error: function (richiesta,stato,errore) {
     alert("Si è verificato un errore", errore);
    }
   })

}}




})
