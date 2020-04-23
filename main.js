$( document ).ready(function() {
  var lingue = ["en","it","es","fr","pt","ja"];
// handlebars--------------
  var source = document.getElementById("template-lista").innerHTML;
  var template = Handlebars.compile(source);

 $("#button-cerca").click(function () {
   // salvo il valore del campo di ricerca
   var input = $("#search").val();
   // ad ogni ricerca svuoto ul per non accumulare i risultati
   $("ul").html("");
   if (input != "") {
     // chiamata per i film-------------------
     $.ajax({
      url: "https://api.themoviedb.org/3/search/movie/",
      method: "GET",
      data: {
       api_key: "2d88d072c44aeaea767ce1752df8aebd",
       language: "it",
       query: input
      },
      success: function (data,stato) {
       var test = "film";
       var arrayFilm = data.results;
       generaOutput(arrayFilm,test);
     },
     error: function (richiesta,stato,errore) {
      alert("Si è verificato un errore", errore);
     }
    })
    // chiamate per le serie tv---------------------
    $.ajax({
     url: "https://api.themoviedb.org/3/search/tv/",
     method: "GET",
     data: {
      api_key: "2d88d072c44aeaea767ce1752df8aebd",
      language: "it",
      query: input
     },
     success: function (data,stato) {
      console.log(data);
      var test = "serie";
      var arraySerie = data.results;
      generaOutput(arraySerie,test);

    },
    error: function (richiesta,stato,errore) {
     alert("Si è verificato un errore", errore);
    }
   })
   }
 })



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
       tipo: test
     };


     var html = template(context);
     $("ul").append(html);

     // aggiunta delle stelline modo piu grezzo-----------------------------
      // $(".li-voto").each(function () {
      //  if (!$(this).hasClass("active")) {
      //    for (var j = 0; j < voto; j++) {
      //     $(this).append("&starf;");
      //    }
      //    if (voto<5) {
      //      var numStelleVuote = 5 - voto;
      //      for (var z = 0; z < numStelleVuote; z++) {
      //       $(this).append("&star;");
      //      }
      //    }
      //    $(this).addClass("active");
      //  }
      // })

     }

   }

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

function locandina(posterpath) {
  var poster = "";
  if (posterpath==null) {
    poster = '<img src="immagini/altimg.jpg"  class="posterimg" alt="img">';
  }else {

    poster = '<img src="https://image.tmdb.org/t/p/w342' + posterpath + ' " class="posterimg"  alt="img">';
  }
  return poster
}






})
