//
//        html.js
//




let VersionHtmlJs = "1.0";




//
// Called by init() in main.js
//
function htmlInit( page) {
  let menuElement = document.querySelector( "menu" );
  let titleElement = document.querySelector( ".Title" );
  let htmlsElement = document.querySelector( ".Htmls" );

  titleElement.innerText = capitalize( page );

  fileFileOfTextFiles( page+".txt", {basePath: `../${page}`,
    callback: data => {
      if( data.text ) {
        let id;
        let name = filename( data.fileName );
        // We now have filename with NO dir path, so remove the extension
        name = name.slice( 0, name.lastIndexOf('.') );

        id = makeDOMId( name );

//        menuElement.innerHTML += `<li>${name.split("_").join(" ")}</li>`;
        menuElement.innerHTML += `<li><a href="#${id}">${name.split("_").join(" ")}</a></li>`;

        htmlsElement.innerHTML += `<section class="Html BoxShadow">
          <!-- <h1>${name}</h1> -->
          <div id="${id}"> ${data.text}</div>
        </section>`;
      }
    }
  } );
}









//
