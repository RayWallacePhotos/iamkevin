//
//        html.js
//




let VersionHtmlJs = "1.0";




//
// Called by init() in main.js
//
function htmlInit( page ) {
  let titleElement = document.querySelector( ".Title" );
  let htmlsElement = document.querySelector( ".Htmls" );

  page[0] = page[0].toUpperCase();
  titleElement.innerHTML = `<h1>${page.toUpperCase()}</h1>`

  fileFileOfTextFiles( page+".txt", {basePath: `../${page}`,
    callback: data => {
      if( data.text ) {
        let name = data.fileName;
        let slashIndex = name.lastIndexOf('/');
        if( slashIndex == -1 ) slashIndex = name.lastIndexOf('\\');
        if( slashIndex != -1 ) name = name.slice( slashIndex + 1 );

        // We now have filename with NO dir path, so remove the extension
        name = name.slice( 0, name.lastIndexOf('.') );

        htmlsElement.innerHTML += `<section class="Html BoxShadow">
          <!-- <h1>${name}</h1> -->
          ${data.text}
        </section>`;
      }
    }
  } );
}









//
