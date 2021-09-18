
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

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
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

                //Muestro las imagenes en forma de galería
                showImagesGallery(producto.images);
            }
        });
    });
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