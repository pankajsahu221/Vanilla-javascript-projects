window.addEventListener("load",function(){
    const date = document.querySelector(".date");
    const nasaImg = document.querySelector(".nasa-img");
    const nasaVid = document.querySelector(".nasa-vid");
    const imgTitle = document.querySelector(".img-title");
    const imgDesc = document.querySelector(".img-desc");
 
    
 const api= "your API key here" ; 

 fetch(api)
    .then(function(response){
       return response.json();
    })
    .then(function(data){
        console.log(data);

        date.textContent = data.date;
        
        imgTitle.textContent = data.title;
        imgDesc.textContent = data.explanation;

        if(data.media_type == "video"){
            nasaVid.src = data.url ;
            nasaImg.style.display = 'none';
        }
        else{
            nasaImg.src = data.url ;
            nasaVid.style.display = 'none';
        }
    });

});
