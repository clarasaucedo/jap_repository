var category = {};
let product = [];
let productList = [];


//
function showImagesGallery(imagesList){

    let htmlContentToAppend = "";

    for(let i = 0; i < imagesList.length; i++){
        let imageSrc = imagesList[i];

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
//Función para ver los productos relacionados
function showProductsRelated(relatedProductList, completeProductList){ //Le paso la lista completa de producto y 
                                                                     //la lista completa de producto de relacionado
   
    let htmlContentToAppend = "";
    
         for(let product of relatedProductList){
            let productsRelatedToShow = completeProductList[product];   
              htmlContentToAppend += ` 
                 <div class="list-group-item list-group-item-action">
                     <div class="row">
                         <div class="col-3">
                          
                          <img src="` +productsRelatedToShow.imgSrc + `" alt="` + productsRelatedToShow.description + `" class="img-thumbnail">
                          
                         </div>
                         <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">`+ productsRelatedToShow.name +`</h4>
                                    <small class="text-muted">` + productsRelatedToShow.soldCount + ` vendidos </small>
                                </div>
                             <p class="mb-1">` + productsRelatedToShow.description +   `</p>
                             <p class="mb-1">`+ productsRelatedToShow.currency + " " + productsRelatedToShow.cost + `</p>
                         </div>
                     </div>
                 </div>
                 `   
            }       
         document.getElementById("productRelated").innerHTML=htmlContentToAppend;
    // }
 }


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productCostHTML = document.getElementById("productCost");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCategoryHTML = document.getElementById("productCategory");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            
        
            productNameHTML.innerHTML = product.name;
            productCostHTML.innerHTML = `USD` + " " + product.cost;
            productDescriptionHTML.innerHTML = product.description;
            productCategoryHTML.innerHTML = product.category;
            productSoldCountHTML.innerHTML = product.soldCount;
            
    
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            
            
        }
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                productList = resultObj.data;
                
            }
            showProductsRelated(product.relatedProducts, productList);
        });
    });
   

});





//Función para ver los comentarios

function showProductsComents(comentListToShow){

    let mostrarComentarios = "";

    for(let i = 0; i < comentListToShow.length; i++){
    
        mostrarComentarios += `
        <div class="list-group-item list-group-item-action"" >
        <div class="row">
            <div class="col-0">
             
             <img src="img/user.png">
             
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                 <h6 class="mb-1"> <strong>`+ comentListToShow[i].user +`</strong></h6>
                    <small class="text-muted">` + comentListToShow[i].dateTime + `</small>
                </div>
                <p class="mb-1">` + comentListToShow[i].description +   `</p>
                <p class="mb-1">`+ scoreStar(comentListToShow[i].score) +  `</p>
            </div>
        </div>
    </div>
        `

        document.getElementById("productComents").innerHTML = mostrarComentarios;
    }
}

function scoreStar(score){
    let scoreStar= "";
    for(let i=1; i<=5; i++){
        if(i<=score){
            scoreStar +=  `<i class="fas fa-star"></i>` ;
        }else{
            scoreStar +=  `<i class="far fa-star"></i>`;
        }
    }
    return scoreStar;
}




document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(comentsProduct){
        if (comentsProduct.status === "ok")
        {
            comentsList = comentsProduct.data;
            
        }
        showProductsComents(comentsList);
    });
    
});


