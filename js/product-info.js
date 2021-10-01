
function showComents(listaComent) {
    let comentario = "";
    for (let i = 0; i < listaComent.length; i++) {
        let coment = listaComent[i];
        let star = "";
        comentario +=
            ` <div class="list-group-item" >
                <strong>` + coment.user + ` dice: </strong><br>
                <p class="d-flex w-100 justify-content-between">` + coment.description + `</p>
                <p><small>` + coment.dateTime + `</small></p>`
        for (let i = 1; i <= coment.score; i++) {
            star += `<span class="fa fa-star checked"></span>`;
        }
        for (let i = coment.score + 1; i <= 5; i++) {
            star += `<span class="fa fa-star"></span>`;

        }
        comentario += star + `</div>`;


        document.getElementById("comentarios").innerHTML = comentario;
    }

}

function showInfo(producto) {
    let productoNameHTML = document.getElementById("productName");
    let productoDescriptionHTML = document.getElementById("productDescription");
    let productoCostHTML = document.getElementById("productCost");
    let productoCountHTML = document.getElementById("productCount");
    let productoCategoryHTML = document.getElementById("productCategory");

    productoNameHTML.innerHTML = producto.name;
    productoDescriptionHTML.innerHTML = producto.description;
    productoCostHTML.innerHTML = producto.cost + " " + producto.currency;
    productoCountHTML.innerHTML = producto.soldCount;
    productoCategoryHTML.innerHTML = producto.category;
}
function showImagesGallery(array) {

    let htmlContentToAppend = "";

        htmlContentToAppend += `
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src="${array[0]}" alt="First slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="${array[1]}" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="${array[2]}" alt="Third slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="${array[3]}" alt="four slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="${array[4]}" alt="five slide">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    
}
function showProductsRelated(array1, array2) {
    let related = "";
    for (i = 0; i < array2.length; i++) {
        related += `<div class="col-md-4">
    <a href="products.html" class="card mb-4 shadow-sm custom-card">
      <img class="bd-placeholder-img card-img-top" src="${array1[array2[i]].imgSrc}">
      <h3 class="m-3">${array1[array2[i]].name}</h3>
      <div class="card-body">
        <p class="card-text">${array1[array2[i]].description}</p>
      </div>
    </a>
  </div>`

   document.getElementById("relProducts").innerHTML = related;
    }

};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            productosRelated = resultado.data;
        }
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                comentariosArray = resultObj.data;
            }
            let comentario = document.getElementById("newComentario");


            let userLogged = localStorage.getItem('User-Logged');
            if (userLogged) {
                comentario.style = "display: inline-block;";
            };


            getJSONData(PRODUCT_INFO_URL).then(function (result) {
                if (result.status === "ok") {
                    producto = result.data;

                    showInfo(producto);
                    showComents(comentariosArray);
                    showProductsRelated(productosRelated, producto.relatedProducts);
                    //Muestro las imagenes en forma de galería
                    showImagesGallery(producto.images);
                }
            });
        });
    })

});

document.getElementById("enviarComent").addEventListener("click", function () {
    let fecha = new Date();


    let nuevoComentario = {
        score: getScore(),
        description: document.getElementById("newComent").value,
        user: JSON.parse(localStorage.getItem('User-Logged')).usuario,
        dateTime: fecha
    }


    comentariosArray.push(nuevoComentario);

    showComents(comentariosArray);
});