(function(){
                    
    let downloadButton  = document.getElementById('download');
    let inputElement    = document.getElementById('download_url');
    let errorElement    = document.getElementById('errorMessage'); 
    let fileNameElement = document.getElementById('fileName');
    let saveOptionsElem = document.getElementById('saveOptions');
    let tooltip         = document.getElementById('tooltip');
    let isDownloadButtonDisabed = true;

    // on download button click
    async function  onDownload(){
        let fileName          =     fileNameElement.value;
        let fileFormat        =     saveOptionsElem.value;
        let downloadFileUrl   =     inputElement.value; 
        let currentPageUrl    =     new URL(window.location.href).origin;
        let serverRoute       =     '/download';
        let url               =     `${currentPageUrl}${serverRoute}?URL=${downloadFileUrl}&fileName=${fileName}&fileFormat=${fileFormat}`;
        
        if(fileName && downloadFileUrl && downloadFileUrl &&
                (event.type === 'click' || (event.type === 'keydown' && event.keycode === 13))
        ){
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
    function enableDownloadButton(){
            isDownloadButtonDisabed = true;
            downloadButton.classList.remove('downloadFileEnabled');
            downloadButton.removeEventListener('click',onDownload);
            downloadButton.removeEventListener('keydown',onDownload);

        if(fileNameElement.value && inputElement.value){
                downloadButton.classList.add('downloadFileEnabled');
                downloadButton.addEventListener('click',onDownload);
                downloadButton.addEventListener('keydown',onDownload);
                isDownloadButtonDisabed = false;
        } 
    }

    function checkAndDisplayErrorMessage(){
    if(errorElement){
        let url                       =   window.location.href;
        let splitedUrl                =   url.split('=');
        let errorMsg                  =   decodeURIComponent(splitedUrl[1]);
        let errorMsgFromServer        =   document.createElement('div');
        errorMsgFromServer.innerText  =    `Error Message from server is :-"${errorMsg}"`
        errorElement.appendChild(errorMsgFromServer);
    } 
    }

    function displayToolTipOnMouseOver(element, tooltipText){
       

        let elementCordinate = element.getBoundingClientRect();
        let tollTipTop       = elementCordinate.y -50 +"px";
        let tollTipLeft      = elementCordinate.x +"px";

        if( tooltipText.length > 100){
            tollTipTop       = elementCordinate.y -100 +"px";
        }
        tooltip.style.top       = tollTipTop;
        tooltip.style.left      = tollTipLeft;
        tooltip.innerText       = tooltipText
        tooltip.style.visibility= 'visible';
        if(!isDownloadButtonDisabed && element === downloadButton ){
            tooltip.style.visibility= 'hidden';
        }

    }

    function hideToolTipOnMouseOut(){
        tooltip.style.visibility = 'hidden';
    }
    // event listeners
            // 1. adding focus event to reload page if error is there
    fileNameElement.addEventListener('focus',onInputBarFocus);
    inputElement.addEventListener('focus', onInputBarFocus);
            //2. keyup event , for enabling download button
    fileNameElement.addEventListener('keyup',enableDownloadButton);
    inputElement.addEventListener('keyup',enableDownloadButton);
           // 3.adding tolltip on mouseOver
    fileNameElement.addEventListener('mouseover',  ()=>displayToolTipOnMouseOver(fileNameElement,"Please enter file name to download"));
    saveOptionsElem.addEventListener('mouseover',  ()=>displayToolTipOnMouseOver(saveOptionsElem,"please select video qualit, if selected quality is not available then higgest available quality vedio will be downloaded"));
    inputElement.addEventListener('mouseover',     ()=>displayToolTipOnMouseOver(inputElement,"please enter vedio url "))
    downloadButton.addEventListener('mouseover',   ()=>displayToolTipOnMouseOver(downloadButton,"Enter above detail"))
             // removing tooltip on mouse out
    fileNameElement.addEventListener('mouseout',  ()=>hideToolTipOnMouseOut());
    saveOptionsElem.addEventListener('mouseout',  ()=>hideToolTipOnMouseOut());
    inputElement.addEventListener('mouseout',     ()=>hideToolTipOnMouseOut());
    downloadButton.addEventListener('mouseout',   ()=>hideToolTipOnMouseOut());

// onLoad
checkAndDisplayErrorMessage();
})();
