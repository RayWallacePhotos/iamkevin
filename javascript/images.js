//
//        images.js
//




let VersionImagesJs = "1.0";




//
// Called by init() in main.js
//
function imagesInit( page, title ) {
  let basePath = `images/${page}/`;
  let imagesElement = document.querySelector( ".Images" );

  // document.querySelector( ".Title" ).innerText = capitalize( page );
  document.querySelector( ".Title" ).innerText = title;

  fileReadText( page+".txt",
    data => {
      if( data.text ) {
        for( let fileName of data.text.trim().split("\n") ) {
          imagesElement.innerHTML += `
          <span" class="Container">
            <img src=${basePath+fileName}>
          </span>
          `;
        }
      }
  } );

}








//
