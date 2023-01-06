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
  let faceBookInitDiv = document.createElement( "div" );
  let faceBookInit = ` <div id="fb-root"></div>
      <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0" nonce="VjelsPwn"></script>
  `;
  faceBookInitDiv.innerHTML = faceBookInit;

  // Facebook api crap
  // document.body.innerHTML = faceBookInit + document.body.innerHTML;
  // document.body.prepend( faceBookInitDiv );

  // document.querySelector( ".Title" ).innerText = capitalize( page );
  document.querySelector( ".Title" ).innerText = title;

  fileReadText( page+".txt",
    data => {
      if( data.text ) {
        for( let fileName of data.text.trim().split("\n") ) {
          imagesElement.innerHTML += `
          <span" class="Container">
            <img src=${basePath+fileName}>

            ${facebookButton(location.hostname+"/"+basePath+fileName)}
          </span>
          `;
        }
      }
  } );

}


//
// url of image to post to Facebook
//   i.e.   http://ripspics.com/Images/Birds/21-03-27-094-AmericanBaldEagle.jpg
//
function facebookButton( url ) {
  let buttonHtml = `
    <!-- Facbook button to share one specific photo -->
    <div class="fb-share-button" data-layout="button" data-size="large"
        data-href="${url}" >
      <!-- <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fraywallacephotos.github.io%2Fiamkevin%2Fimages%2Fpaintings%2F20-05-03-002.jpg&amp;src=sdkpreparse"
        class="fb-xfbml-parse-ignore">
        Post Image on Facebook
      </a> -->
      <a target="_blank"
        class="fb-xfbml-parse-ignore">
      </a>
    </div>
  `;

  return buttonHtml;
}







//
