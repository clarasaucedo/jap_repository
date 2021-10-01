document.addEventListener("DOMContentLoaded", function(e){
    if(localStorage.getItem("usuario") == undefined && location.href !== "index.html"){
        location.href= "index.html";
    }else {
    document.getElementById("login").innerHTML=`Bienvenido:` + " " +localStorage.getItem("usuario")
    }
    
});


function cerrarSesion(){
    localStorage.clear();
}