//
//     main.js
//
//  30 Dec 2022 RWWJ  Created
//



const Version = "V1.01";

const FirstYear = "2012";


var Houdini = false;

var CanvasObj = null;

let Paused = false; // Toggled by the pressing either the "p" or "P" keys

var StatusElement = document.getElementById( "StatusID" );

const MenuEntries = [
        {url:"index.html", menu:"Home", init:null},
        {url:"paintings.html", menu:"Paintings", init:imagesInit},
        {url:"crewel.html", menu:"Crewel", init:imagesInit},
        {url:"sculptures.html", menu:"Sculptures", init:imagesInit},
        {url:"photographs.html", menu:"Photographs", init:imagesInit},
        {url:"writings.html", menu:"Writings", init:htmlInit},
        {url:"dollhouse.html", menu:"Dollhouse", init:imagesInit},
        {url:"about.html", menu:"About", init:null},
        {url:"contact.html", menu:"Contact", init:null},
      ];


// Kick it off
init();

//
// Get it all started
//
function init( ) {
  let thisYear = new Date().getFullYear();

  document.querySelector( "footer .Version" ).innerText = Version;

  if( FirstYear == thisYear ) document.querySelector( "footer .Year" ).innerText = thisYear;
  else document.querySelector( "footer .Year" ).innerText = `${FirstYear} - ${thisYear}`;

  createMenus( );

  // Call the init() routine for the web page we are on
  for( let menu of MenuEntries ) {
    if( menu.url == pageName()+".html" && menu.init ) menu.init( pageName(), menu.menu );
  }

  if( document.getElementById("MovingBoxID") ) initDragAndDrop( );
}


function initDragAndDrop( ) {
  MovingBoxID.addEventListener( "dragstart", event => {
    MovingBoxID.classList.add( `Dragging` );
    console.log( `Dragging from x:${event.x}, layerX: ${event.layerX}, clientX: ${event.clientX}, offsetX: ${event.offsetX}` );
    console.log( `Dragging from y:${event.y}, layerY: ${event.layerY}, clientY: ${event.clientY}, offsetY: ${event.offsetY}` );
  });

  MovingBoxID.addEventListener( "dragend", event => {
    MovingBoxID.classList.remove( `Dragged` );
    console.log( `Dragged to x:${event.x}, layerX: ${event.layerX}, clientX: ${event.clientX}, offsetX: ${event.offsetX}` );
    console.log( `Dragged to y:${event.y}, layerY: ${event.layerY}, clientY: ${event.clientY}, offsetY: ${event.offsetY}` );

    console.log(event);
  });

  document.querySelector("main").addEventListener( "dragenter", event => {
    // DEBUG I still do NOT get a "drop" event
    event.preventDefault(); // Indicate this is a drop zone
  });

  document.querySelector("main").addEventListener( "dragover", event => {
    event.preventDefault(); // Indicate this is a drop zone
  });

  document.querySelector("main").addEventListener( "drop", event => {
    MovingBoxID.classList.remove( `Dropped` );
    console.log( `Dropped @ x:${event.x}, layerX: ${event.layerX}, clientX: ${event.clientX}, offsetX: ${event.offsetX}` );
    console.log( `Dropped @ y:${event.y}, layerY: ${event.layerY}, clientY: ${event.clientY}, offsetY: ${event.offsetY}` );

    MovingBoxID.style.left = event.x + "px";
    MovingBoxID.style.top = event.y + "px";

    console.log(event);
  });
}


function status( text ) {
  if( StatusElement ) {
    StatusElement.innerText += "\n" + text;

    StatusElement.scrollTop = StatusElement.scrollHeight;
  }
  else console.log( `Status: ${text}` );
}



//
// DEBUG FIX Menus visibly shift/bounce left/right when I change pages
//
function createMenus( ) {
  let menuElement = document.querySelector( "nav" );
  let pageUrl = pageName( ) + ".html";
  let menusHtml = "";

  for( let menu of MenuEntries ) {
    // <a href="index.html" target="_self">Home</a>
    if( menu.url == pageUrl ) {
      // Include CurrentMenu class
      menusHtml += `<a href="${menu.url}" target="_self" class="CurrentMenu">${menu.menu}</a>`;
    }
    else menusHtml += `<a href="${menu.url}" target="_self">${menu.menu}</a>`;
  }

  menuElement.innerHTML = menusHtml;
}



//
// Toggle Houdini when user Alt-clicks on my EMail address
//
// css can target .Houdini to markup the <a> email address element (highligt, add text :after, etc...)
//
function houdini( event ) {
  if( event.altKey ) {
    let houdiniOnlyTags = document.querySelectorAll( ".HoudiniOnly" );

    Houdini = !Houdini;

    if( Houdini ) {
      event.target.classList.add( "Houdini" );

      for( let tag of houdiniOnlyTags ) {
        tag.classList.remove( "Hidden" );
      }
    }
    else {
      event.target.classList.remove( "Houdini" );

      for( let tag of houdiniOnlyTags ) {
        tag.classList.add( "Hidden" );
      }
    }
  }
}







//
