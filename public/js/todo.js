$(document).ready(function(){setInterval(leer_json_facebook,2e3)});var almacenID=[];function leer_json_facebook(){jQuery.ajax({url:"https://graph.facebook.com/v2.12/Javier.Aliaga.Rodriguez?fields=feed{id,message,description,picture,permalink_url,full_picture,comments.limit(2)}&access_token=EAACEdEose0cBAP2fBPvZCglljZAHBmf6HoWKETZCVZC6KXIiFKFXXnQZCOZAIF7b6S8XsVrEzgk3Gk50jN2RXxoh3vmCHRJjO2mveSsJItxDw9ZArccHDYjFfAvBVYv2NRKpogT5HI8IdFRYojaEe7tZBPXZBOhxMgjp1CiQ0tfZCTXHiVzb6yGBcJLoDva2AXxaYZD",jsonp:"callback",dataType:"jsonp",success:function(e){e.feed.data.length;var a=[],t=[];if(almacenID.length<1)for(var o=0;o<e.feed.data.length;o++)almacenID.push(e.feed.data[o].id);else{var s=!1;for(o=0;o<e.feed.data.length;o++)t.push(e.feed.data[o].id);for(x=0;x<almacenID.length;x++){for(s=!1,y=0;y<t.length;y++){if(almacenID[x].c==t[y]){s=!0;break}console.log("distintos debemos añadir")}if(!s){alert("los arreglos no son iguales");break}}s&&alert("si son iguales")}var d=0;for(o=0;o<a.length;o++)console.log("array=>"+a[o]),d++;for(var o in console.log("contador => "+d),console.log(a),console.log(e.feed.data),e.feed.data){if(e.feed.data[o].id){"<div class='"+e.feed.data[o].id+"'>"}if(e.feed.data[o].full_picture&&"<img class='img-fluid' src="+e.feed.data[o].full_picture+">",e.feed.data[o].message&&"<p>"+e.feed.data[o].message+"</p>",e.feed.data[o].description&&"<h3>"+e.feed.data[o].description+"</h3>",e.feed.data[o].comments){comentarios=e.feed.data[o].comments.data.length;for(var r="",n=0;n<comentarios;n++){var i=e.feed.data[o].comments.data[n].created_time,l=new Date(i);l.getDate(),parseInt(l.getMonth()),l.getFullYear(),l.getHours(),l.getMinutes();r+='<div class="indivualComentario"><p class="fecha">'+l.toLocaleString("es-ES",{hour:"numeric",minute:"numeric",hour12:!0})+'</p><p class="comentarios">'+e.feed.data[o].comments.data[n].message+"</p></div>"}r}"<hr>"}}})}var restar=function(e,a){return e-a};