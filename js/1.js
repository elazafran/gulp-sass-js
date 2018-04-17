$( document ).ready(function() {
    
    setInterval(leer_json_facebook, 2000);
    
    

});

var almacenID=[];
//alert(almacenID);
function leer_json_facebook(){

      

            // recogemos el token del input oculto uqe usamos para traernos del backend los datos
            var tokenLimit = 2;
            var tokenPage = "Javier.Aliaga.Rodriguez";

            //var tokenPage = "boutiqueamiaire";
            var tokenfacebook="EAACEdEose0cBAEhekRHn24OsT9d4gUjZAwpZAe5oJ9fZBXOeYeYNV0srQGKFKZAExqXBubZADyHZC3OisQZBY884RLEg1TlZCiVGbcgERmje8PtDjZAZAG1DkuPPDgbaAMrmdhmLSH4zc7h8z9nBCqyQ7Yt1q5zZAUJkmGZBnl6B6iMiT8DjCH06PcERwEevmDHZCgJ4ZD";

            //alert(tokenfacebook);

              jQuery.ajax({

                url: "https://graph.facebook.com/v2.12/"+tokenPage+"?fields=feed{id,message,description,picture,permalink_url,full_picture,comments.limit("+tokenLimit+")}&access_token="+tokenfacebook,
                //https://graph.facebook.com/v2.12/Javier.Aliaga.Rodriguez?fields=feed{id,message,description,picture,permalink_url,full_picture,comments.limit(10)}&access_token=EAACEdEose0cBALFZAVfZBeZBbKmYH4zT1FZBQqCmo65SkD3mQ6EAAvNeNDnAl6oUv3N0hygiRYoFbslw8ZAKJZBfCxHu5Q9HEWM8BTze29ZBTpZCqDsVhxVUV39kkbFkDGZBjzp7ZAZCDxoNfAhk8Ef2WanxFTamkdXcVm3gopVA4NE5om59YYeuWJGfPRUtmyFTTgZD
                // The name of the callback parameter, as specified by the YQL service

                jsonp: "callback",

                // Tell jQuery we're expecting JSONP

                dataType: "jsonp",


                // Work with the response

                success: function( response ) {

                  // guardamos el tamaño del feed que nos llega
                    var tamnio = response['feed']['data'].length;
 
                    // creamos un array para guardar los objetos de cada feed
                    var arrayJS=[];
                    var nuevosID=[];
                    
                    // si no exite almacenID lo crea e insertamos id
                    if(almacenID.length <1){
                      for (var i = 0 ; i < response['feed']['data'].length; i++) {
            
                              almacenID.push(response['feed']['data'][i]['id']);
                              //console.log("rellenamos almacenID =>" +response['feed']['data'][i]['id'] );
                          }

             
            //alert('entramos');

                    }else {
                      var encuentra = false;
                      for (var i = 0 ; i < response['feed']['data'].length; i++) {
            
                              nuevosID.push(response['feed']['data'][i]['id']);
                              //console.log("recorremos de nuevo =>" +response['feed']['data'][i]['id'] );
            }
                      //alert('entramos');
                      //comparamos los dos arrays uno con los datos nuevos y los guardamos
                      
                      for (x=0;x<almacenID.length;x++) { 
                        //alert("iguales") ;
                        encuentra = false;
              for (y=0;y<nuevosID.length;y++) 
              { 
                if (almacenID[x].c == nuevosID[y]) 
                { 
                  encuentra = true;
                        break;
                  console.log(almacenID[x] + ' son iguales' +  nuevosID[y])

                } else {
                  console.log("distintos debemos añadir") ;
                }
              } 
              if(!encuentra){
                   alert("los arreglos no son iguales");
                   break;
                }
            } if(encuentra){
                  alert("si son iguales");
              }
                      
                    }
                    
                    function recorrerElementos (){
                      var resultado = []
                      for (var i = 0 ; i < response['feed']['data'].length; i++) {
            
                              resultado.push(response['feed']['data'][i]['id']);
                              console.log("rellenamos nuevo array=>" +response['feed']['data'][i]['id'] );
            }
                      return resultado;
                    }
                    
                    var contador = 0;
                    for (var i =0 ; i< arrayJS.length;  i++) {
                      console.log("array=>"+arrayJS[i]);
                      contador++;

                    }
                    console.log('contador => ' + contador );
                    console.log(arrayJS);
                    console.log( response['feed']['data']); // server response

                    //$('.facebookLista').append("<ul>");



                    // recogemos cada objeto del en total 25

                    for(var i in response['feed']['data']) {



                          //console.log("---------- a pertura ----------")



                          //console.log(response['feed']['data'][i]);  // (o el campo que necesites)



                          if (response['feed']['data'][i]['id'])

                          {

                            var ainsertar = '';

                            //$('.facebookLista').append("<div class='"+response['feed']['data'][i]['id']+"'>");

                            ainsertar+="<div class='"+response['feed']['data'][i]['id']+"'>";

                            //console.log('ID -> '+response['feed']['data'][i]['id']);

                            //$('.facebookLista').append("<ul><li class='elementoFeed'>"+response['feed']['data'][i]['id']+"</li>");



                          }



                          if (response['feed']['data'][i]['full_picture'])

                          {

                            //console.log('IMG -> '+response['feed']['data'][i]['full_picture']);

                            //$( "<p>Test</p>" ).appendTo('263647760354133_1881647758554117' );

                            //$('.facebookLista ').append("<img src="+response['feed']['data'][i]['full_picture']+">");

                            ainsertar+="<img class='img-fluid' src="+response['feed']['data'][i]['full_picture']+">";

                          }

                          if (response['feed']['data'][i]['message'])

                          {

                            //console.log('Descripcion -> '+response['feed']['data'][i]['description']);

                            //$('.facebookLista').append('<p>'+response['feed']['data'][i]['description']+'</p>');

                            ainsertar+='<p>'+response['feed']['data'][i]['message']+'</p>';

                          }

                          if (response['feed']['data'][i]['description'])

                          {

                            //console.log('Descripcion -> '+response['feed']['data'][i]['description']);

                            //$('.facebookLista').append('<p>'+response['feed']['data'][i]['description']+'</p>');

                            ainsertar+='<h3>'+response['feed']['data'][i]['description']+'</h3>';

                          }







                          if (response['feed']['data'][i]['comments'])

                          {

                            //console.log("hayyyyyyyyyyyyyyyy comentarios");

                            comentarios = response['feed']['data'][i]['comments']['data'].length;

                            //console.log("NUMERO DE COMENTARIOS => "+ comentarios);

                            var listarComentarios='';

                            for(var k=0;k<comentarios;k++){

                              //recogemos los comentarios que tenemos en cada publicacion



                              //listarComentarios+=response['feed']['data'][i]['comments']['data'][k]['message'];

                              //listarComentarios+='<small>'+Date.parse(response['feed']['data'][i]['comments']['data'][k]['created_time'])+'</small><p class="comentarios">'+response['feed']['data'][i]['comments']['data'][k]['message']+'</p>'

                              var fechaComentario = response['feed']['data'][i]['comments']['data'][k]['created_time'];

                              var dt = new Date(fechaComentario);



                              //extraemos el día mes y año

                              var dia = dt.getDate();

                              var mes = parseInt(dt.getMonth()) + 1;

                              var ano = dt.getFullYear();

                              var horas = dt.getHours();

                              var minutos = dt.getMinutes();



                              //escribimos la fecha en un formato legible

                              //console.log(dia + "/" + mes + "/" + ano);

                              //console.log ("HORAAAAAAAAAAAAAAAAAA ="+dt.toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', hour12: true }));



                              //listarComentarios+='<p class="fecha">'+dia + "/" + mes + "/" + ano+" <small >escrito a las : "+horas+":"+minutos+'</small><p class="comentarios">'+response['feed']['data'][i]['comments']['data'][k]['message']+'</p>'

                              listarComentarios+='<div class="indivualComentario"><p class="fecha">'+dt.toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric', hour12: true })+'</p><p class="comentarios">'+response['feed']['data'][i]['comments']['data'][k]['message']+'</p></div>';
                              



                          } 



 

                            ainsertar+=listarComentarios;




                          }else {

                            console.log("NOOOOOOOOOOOOOOO hay");


                          }

 
                          ainsertar+='<hr>';
                          jQuery('.facebookLista').append(ainsertar);


                    }



                }

              });

          }
