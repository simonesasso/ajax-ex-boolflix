$( document ).ready(function() {

  var source = document.getElementById("template-lista").innerHTML;
  var template = Handlebars.compile(source);

 $("#button-cerca").click(function () {
   // salvo il valore del campo di ricerca
   var input = $("#search").val();
   // ad ogni ricerca svuoto ul per non accumulare i risultati
   $("ul").html("");
   $.ajax({
  url: "https://api.themoviedb.org/3/search/movie",
  method: "GET",
  data: {
    api_key: "2d88d072c44aeaea767ce1752df8aebd",
    language: "it",
    query: input
  },
  success: function (data,stato) {
    console.log(data);
    var arrayrFilm = data.results;
    for (var i = 0; i < arrayrFilm.length; i++) {

      var context = {
        titolo: arrayrFilm[i].title,
        titoloOriginale: arrayrFilm[i].original_title,
        linguaOriginale: arrayrFilm[i].original_language,
        voto: arrayrFilm[i].vote_average
      };
      var html = template(context);
      $("ul").append(html);
      
    }
  },
  error: function (richiesta,stato,errore) {
    alert("Si è verificato un errore", errore);
  }
  })
 })
})
