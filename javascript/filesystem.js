//
//     filesystem.js
//


//
// NOTE: Only works in Chrome (as of Dec 2022)
//





function FileSystemTestOnClick( event ) {
  if( window.showOpenFilePicker ) {

    console.log( "NOTE: We may have to call requestPermission( fileSystemHandlePermissionDescriptor )" );


    readFile( fileHandle => {
      modifyOpenFile( fileHandle, "Add this.\r\n And this.\r\n To the file.\r\n" );
    } );


    // writeFile( "Just a test.\r\n Something to write.\r\n" );

    // openDir( dirHandle => {
    //   // console.log( `Selected directory: ${dirHandle.name} of kind: ${dirHandle.kind}` );
    //   // for( let handle of dirHandle.values() ) console.log(`.values(): ${handle}`);
    //   // for( let name of dirHandle.keys() ) console.log(`.kes(): ${name}`);
    // } );

    // asyncAwaitDir( );
  }
  else {
    console.error( "ONLY runs in Chrome. This browser does NOT support the Javascript FileSystem api." );
  }
}

async function asyncAwaitDir( ) {
  const dirHandle = await window.showDirectoryPicker()

  // key is the filename, value is the filehandle (i.e. FileSystemDirHandle or FileSystemFileHandle)
  for await (const [key, value] of dirHandle.entries()) {
      // console.log({ key, value });
      console.log( `${value.kind=="directory" ? "FOLDER" : "FILE"}  ===  ${key}  :::  `, value );
  }
}


async function openDir( callback ) {
  let startIn = "documents"; // Can also be a fileHandle, dirHandle, "desktop", "documents", "downloads", "music", "pictures", or "videos"
  let options = {id:"rememberDirLoc_forTest", mode:"read", startIn }; // mode can also be "readwrite"

  window.showDirectoryPicker() // options )
  .then( dirHandle => {
//    console.log( dirHandle );
    // key is the filename, value is the filehandle (i.e. FileSystemDirHandle or FileSystemFileHandle)
    for( const [key, value] of dirHandle.entries() ) {
        // console.log({ key, value });
        console.log( `${value.kind=="directory" ? "FOLDER" : "FILE"}  ===  ${key}  :::  `, value );
    }

    callback( dirHandle );
  });
}



function modifyOpenFile( fileHandle, text ) {
  let stream;

  // DEBUG Broken. keepExistingData:true does NOT work. We still OVERWRITE the file contents
  fileHandle.createWritable( {keepExistingData:true} )      // Convert the fileHandle for writing
  .then( strm => {
    stream = strm;  // Remeber it so we can close it once the .write() is finished

    fileHandle.getFile( )
    .then( file => {
      let position = file.size;

      // NOTE: If wanted just wanted to seek and NOT write, we could set type:"seek"
      return strm.write( {data:text, type:"write", position} );   // Write text to file at position (i.e. append)
    })
    .then( _ => {
      stream.close( );
      console.log( "File written and closed" );   // Display the data
    } );
  } );
}


function writeFile( text ) {
  let handle;
  let stream;
  let options = { suggestedName:"Test.txt", types:[{accept:{"text/plain":[".txt"], "text/*":[".txt",".doc",".docx",".pdf",".csv"]}}] };

  showSaveFilePicker(options)         // Display file open dialog and get a fileHandle for the selected file
    .then( fileHandle => {
      handle = fileHandle[0];
      console.log(`Writing file: ${fileHandle[0].name} of type: ${fileHandle[0].kind}` );

      return fileHandle[0].createWritable();      // Open the fileHandle for writing
    } )
    .then( strm => {
      stream = strm;
      strm.write( text );   // Write text to file
    } )
    .then( _ => {
      stream.close( );
      console.log( "File written and closed" );   // Display the data
    } );
}


function readFile( callback = null ) {
  let handle;
//  let options = { multiple:false, types:[{description:"Images", accept:{"image/*":[".png",".jpg",".gif",".tif",".jpeg"]}}] };
  let options = { multiple:false, types:[{description:"Text", accept:{"text/*":[".txt",".doc",".docx",".pdf",".csv"]}}] };

  showOpenFilePicker(options)         // Display file open dialog and get a fileHandle for the selected file
    .then( fileHandle => {
      handle = fileHandle[0];
      console.log(`Reading file: ${fileHandle[0].name} of kind: ${fileHandle[0].kind}` ); // kind is file vs dir

      return fileHandle[0].getFile();    // Open the fileHandle for reading
    } )
    .then( file => {
      // file is a standard html/javascript file blob, like you would get from an <input type="file">
      console.log(`Read file: ${file.name} of size: ${Math.ceil(file.size/1024)} kb, type: ${file.type}` );

      return file.text();          // Convert file data to text
    } )
    .then( text => {
      console.log(text);		 // Display the data
      if( callback ) callback( handle );
    } );

}






//
