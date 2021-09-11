var productoInfo = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
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

//funcion para mostrar la informacion


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            producto = resultObj.data;

            let productoNameHTML  = document.getElementById("productName");
            let productoDescriptionHTML = document.getElementById("productDescription");
            let productoCostHTML = document.getElementById("productCost");
            let productoCountHTML = document.getElementById("productCount");
            let productoCategoryHTML = document.getElementById("productCategory");
        
            productoNameHTML.innerHTML = producto.name;
            productoDescriptionHTML.innerHTML = producto.description;
            productoCostHTML.innerHTML = producto.cost + " " + producto.currency;
            productoCountHTML.innerHTML = producto.soldCount;
            productoCategoryHTML.innerHTML = producto.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(producto.images);
        }
    });
});