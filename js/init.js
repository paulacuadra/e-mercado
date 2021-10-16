const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART2_INFO_URL = " https://japdevdep.github.io/ecommerce-api/cart/654.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function menuPerfil(usuario){
  let htmlContentToAppend = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    ${usuario}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="my-profile.html">Mi Perfil</a>
    <a class="dropdown-item" href="cart.html">Mi carrito</a>
    <a class="dropdown-item" id="salir">Cerrar sesion</a>
  </div>
</div>`
document.getElementById("infoUser").innerHTML = htmlContentToAppend;
}
document.addEventListener("DOMContentLoaded", function(e){
  let userLogged = localStorage.getItem('User-Logged');

 
  if(userLogged){
    userLogged = JSON.parse(userLogged);
    
    infoUser.style = "display: inline-block;";

    menuPerfil(userLogged.usuario);
  


  }
  if(document.getElementById("salir")){
    document.getElementById("salir").addEventListener("click",function(){
    localStorage.removeItem('User-Logged');
    window.location = 'index.html';

    })      
  }
});