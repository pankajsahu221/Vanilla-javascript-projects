const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear(); 

const toggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

// fixed navbar and back to top button 
const navbar = document.getElementById("navbar");
const btt = document.querySelector(".btt");

window.addEventListener("scroll",function(){
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;

    //fixing the postion for the navbar
    if(scrollHeight > navHeight){
         navbar.classList.add("fixed-navbar");
    }
    else{
         navbar.classList.remove("fixed-navbar");
    }
   // console.log(scrollHeight);

   //fixing the postion for back to top button
    if(scrollHeight > 500){
        btt.classList.add("show-btt");
    }
    else{
        btt.classList.remove("show-btt");
    }
});

//navbar toggle 
toggle.addEventListener("click",function(){
    
    /* we can not use this show-navbar function if we have more than 4 links or we want to add more 
       then it will not show bcoz the height in the show-navbar function is fixed */ 
    // linksContainer.classList.toggle("show-navbar");
    const linksContainerHeight = linksContainer.getBoundingClientRect().height;
    // console.log(linksContainerHeight);
     const linksHeight = links.getBoundingClientRect().height;
     
     if(linksContainerHeight==0){
           linksContainer.style.height=`${linksHeight}px`;
     }
     else{
           linksContainer.style.height=0;
     }
});

//fixing the postion of landing of navbar bar in scrolling down to current location
const scrollLink = document.querySelectorAll(".scroll-link");

scrollLink.forEach(function(link){
    link.addEventListener("click",function(e){
         
        //prevent the action to be performed
        e.preventDefault();

        const id = e.currentTarget.getAttribute("href").slice(1);
        //console.log(id)  prints '#tours','#serivces' etc and after doing slice(1) we get 'services','tours' etc
        const element = document.getElementById(id);
        
        const containerHeight = linksContainer.getBoundingClientRect().height;
        //console.log(position); it will show to postion height of perticular link
        // const navHeader = document.querySelector(".nav-header");
        const navHeight = navbar.getBoundingClientRect().height;
        let correctPosition = element.offsetTop - navHeight;
        
        // console.log(navHeight);
        if(navHeight >  71 ){       //71 is the size of the nav header
            correctPosition = correctPosition + containerHeight
        }
        //it gives the height of navbar header
        // console.log(navHeight - containerHeight);
        window.scrollTo({
            left:0,
            top:correctPosition,
        });

        //close the link container after clicking to the link
        linksContainer.style.height=0;
    })
})