// ******SELECT ITEMS******
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

// ***** FUCNTIONS *****
function addItem(e){
    e.preventDefault();

    // we can use this to make a unique id for every element 
    const id = new Date().getTime().toString();

    const value = grocery.value;

    if( value && !editFlag ){
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

        displayAlert("item added successfully!","success");
        container.classList.add("show-container");
    
        // set back to default
        setBackToDefault();
    }
    else if( value && editFlag ){
        editElement.innerHTML = value;
        
        displayAlert("Edited succussfully!","success");
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
    setTimeout(function(){      // setTimeout will remove the class after 1300ms
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
}

// delete item
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    list.removeChild(element);

    if(list.children.length === 0 ){
        container.classList.remove("show-container");
    }
    setBackToDefault();
    displayAlert("item removed","danger");
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