let downloadButton  = document.getElementById('download');
let inputElement    = document.getElementById('download_url');
let errorElement    = document.getElementById('errorMessage'); 


// on download button click
async function  onDownload(){
    let downloadFileUrl   =     inputElement.value; 
    let currentPageUrl    =     new URL(window.location.href).origin;
    let serverRoute       =     '/download';
    let url               =     `${currentPageUrl}${serverRoute}?URL=${downloadFileUrl}`;
    
    if(event.type === 'click' || (event.type === 'keydown' && event.keycode === 13) ){
         window.location.href = url;
        const response = await fetch(url);
        if(response.status === 400){
            const data     = await response.json();
            console.log('An error occured', data);
        }  
    }
}

// on focus of input bar
function onInputBarFocus(){
    //errorElement --> will be there when error is encountered
    if(errorElement){
        window.location.href =   new URL(window.location.href).origin+"/";
    }
}



function displayErrorMessage(){
   if(errorElement){
      let url                       =   window.location.href;
      let splitedUrl                =   url.split('=');
      let errorMsg                  =   decodeURIComponent(splitedUrl[1]);
      let errorMsgFromServer        =   document.createElement('div');
      errorMsgFromServer.innerText  =    `Error Message from server is :-"${errorMsg}"`
      errorElement.appendChild(errorMsgFromServer);
   } 
}


// event listeners
downloadButton.addEventListener('click',onDownload)
downloadButton.addEventListener('keydown',onDownload)
inputElement.addEventListener('focus', onInputBarFocus)

// onLoad
displayErrorMessage();