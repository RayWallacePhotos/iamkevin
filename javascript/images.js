//
//        images.js
//




let VersionImagesJs = "1.0";




//
// Called by init() in main.js
//
function imagesInit( page ) {
  let imagesElement = document.querySelector( ".Images" );

  imagesElement.innerHTML = `<h1>${page.toUpperCase()}</h1>`

  fileFileOfImageFiles( page+".txt", {basePath: `../images/${page}`,
    callback: data => {
      if( data.name ) {
        let name = data.name;
        let slashIndex = name.lastIndexOf('/');
        if( slashIndex == -1 ) slashIndex = name.lastIndexOf('\\');
        if( slashIndex != -1 ) name = name.slice( slashIndex + 1 );

        // We now have filename with NO dir path, so remove the extension
        name = name.slice( 0, name.lastIndexOf('.') );

        imagesElement.innerHTML += `
          <span class="Container">
            <img loading="lazy" src="${data.name}"img>
            <!-- <h2>${name}</h2> -->
          </span>
        `;
      }
    }
  } );
}









//
