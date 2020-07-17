const btns = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");
const about = document.querySelector(".about");

//we could have also done by btns event listner
about.addEventListener("click",function(e){
    const id = e.target.dataset.id;
    // console.log(id);

    if(id){    //checking if we have clicked the btn,if the btn then proceed
        
        // remove active status from all the buttons
        btns.forEach(function(btn){
           btn.classList.remove("active");
        });

        // adding active status to the clicked button
        e.target.classList.add("active");
    
        // hide other articles
        articles.forEach(function(article){
            article.classList.remove("active")
        });
        const element = document.getElementById(id);
        element.classList.add("active");
    }
});