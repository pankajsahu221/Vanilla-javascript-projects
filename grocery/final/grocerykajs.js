// ******SELECT ITEMS******
// ************************
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");  //input
const submitBtn = document.querySelector(".submit-btn");   //submit btn
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;   //it will be true when we click edit btn
let editID = "";

// ***** EVENT LISTNER *****
// submit form
form.addEventListener("submit",addItem);
// clear items
clearBtn.addEventListener("click",clearItems);
// load items
window.addEventListener("DOMContentLoaded",setupItems);


// ***** FUCNTIONS *****
function addItem(e){
    e.preventDefault();

    // we can use this to make a unique id for every element 
    const id = new Date().getTime().toString();

    const value = grocery.value;

    if( value && !editFlag ){
        
        // creating or adding the item to the list
        createListItem(id ,value);

        displayAlert("item added successfully!","success");
        container.classList.add("show-container");
    
        // add to local storage
        addToLocalStorage(id,value);
        // set back to default
        setBackToDefault();
    }
    else if( value && editFlag ){
        editElement.innerHTML = value;
        
        displayAlert("Edited succussfully!","success");
        
        // edit local storage
        editLocalStorage( editID , value);
        setBackToDefault();
        
    }
    else{                //if input is empty
        displayAlert("Please enter value" ,"danger");   
    }
}

// display alert
function displayAlert(text , action){
    alert.textContent = text ;
    alert.classList.add(`alert-${action}`);

    // remove alert
    setTimeout(function(){      // setTimeout will remove the class after 1500ms
        // alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    },1500);
}

// set back to default
function setBackToDefault(){
    grocery.value = "";
    editID = "";
    editFlag = false;
    submitBtn.textContent = "submit";
}

// clear items
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("Empty list!","danger");
    setBackToDefault();
    // instead of applying this function( clearLocalStorage() ) we can use a one line code to clear the list
    localStorage.removeItem("list");
}

// delete item
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    list.removeChild(element);

    if(list.children.length === 0 ){
        container.classList.remove("show-container");
    }
    displayAlert("item removed","danger");
    setBackToDefault();
    
    // remove from local storage
    removeFromLocalStorage(id);
}
// edit item
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;

    // e.currentTarget.parentElement will refer to btn-container,applying previousElementSibling will
    // refer to the previous element of the target in the same tree
    editElement = e.currentTarget.parentElement.previousElementSibling;

    grocery.value = editElement.innerHTML;
    submitBtn.textContent = "edit";
    editFlag = true;
    editID = element.dataset.id;

}

//  ********************************
//  ******** LOCAL STORAGE ********
//  ********************************
function addToLocalStorage(id ,value){
    const grocery = { id ,value };
    
    // we check in the local storage, if there are items present then we will get it, if it's not there
    // then we will make an empty array. 
    let items = getLocalStorage();

    // adding the item into the array
    items.push(grocery);
    // console.log(items);

    // pushing the list of items to localstorage after converting into string. 
    localStorage.setItem("list",JSON.stringify(items));
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();

    // adding all the items except the item with the parameter id
    items = items.filter(function(item){
        if(item.id !== id) return item;
    });
    // pushing the new item list to localstorage
    localStorage.setItem("list",JSON.stringify(items));
}

function editLocalStorage(id ,value){
    let items = getLocalStorage();

    items = items.map(function(item){
        if(item.id === id){
            item.value = value;
        } 
        return item;
    });
    localStorage.setItem("list",JSON.stringify(items));
}

// function clearLocalStorage(){
//     let items = getLocalStorage();
//     items = [];
//     localStorage.setItem('list',JSON.stringify(items));
// }
// we check in the local storage, if there are items present then we will get it, if it's not there
// then we will make an empty array. 
function getLocalStorage(){
    return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}

// local storage API
// getitem
// setitem
// removeitem
// stringify
// parse

// **************************
// ******* SETUP ITEMS ******
// **************************
function setupItems(){
    let items = getLocalStorage();

    if( items.length > 0 ){

    items.forEach( function(item){
            createListItem(item.id,item.value);
       });
       container.classList.add("show-container");
    }
}

function createListItem(id,value){
    
            const element = document.createElement("article");
            // add class
            element.classList.add("grocery-item");

            const attr = document.createAttribute('data-id');
            // adding unique id to every element
            attr.value = id;  
            element.setAttributeNode(attr);
                                            
            element.innerHTML =`<p class="title">${value}</p> 

                            <!-- edit and delete btns -->
                            <div class="btn-container">

                                <button type="button" class="edit-btn">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button type="button" class="delete-btn">
                                    <i class="fas fa-trash"></i>
                                </button>
                                
                            </div>` ;
            
            // we can not use document.querySelecotor because it is not present in the html like clearBtn is present
            const deleteBtn = element.querySelector(".delete-btn");
            const editBtn = element.querySelector(".edit-btn");
                
            // to delete and edit item
            deleteBtn.addEventListener("click",deleteItem);
            editBtn.addEventListener("click",editItem);
            
            //  append child
            list.appendChild(element);

}