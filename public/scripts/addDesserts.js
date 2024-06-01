import abstractView from "./abstractView.js";
import display from '../src/images/display.png';
import table from '../src/images/table.png';

export default class extends abstractView{
    constructor(){
        super();
        this.setTitle("Add Desserts");
    }

    // returns displayed HTML content when view is rendered
    async getHtml(){
        this.currentPage = 1; 

        return ` 

        <main>
            <!-- Title/ Page Numbers --> 
            <header class="d-flex justify-content-between align-items-center"> 
                <h1> New Entry </h1>
                <h2 class="text-end"id="pageNumber">${this.currentPage}/3</h2>
            </header>

            <!-- NAVIGATION ARROWS -->
            <div class="d-flex justify-content-between align-items-center">
                <button id="prevButton"><</button>

                <div id="dessertFormContainer" class="container">
                    <!-- PAGE 1 DATA ENTRY -->
                    
                    <div id="page1" class="page active">
                        <form id="dessertForm">
                            <div class="row">
                                <div class="col-sm-7 d-flex flex-column justify-content-center align-items-center">

                                    <!-- DESSERT NAME -->
                                    <label for="dessertName"> Dessert Name: </label>
                                    <input type="text" class="input-group mb-3" id="dessertName" placeholder="chocolate ice cream">

                                    <!-- DESSERT PRICE -->
                                    <input type="number" class="input-group input-group-sm mb-3" id="price" placeholder="Price">

                                    <!-- DESSERT IMAGE -->
                                    <img src="${display}" id="display" alt="Display Case">

                                </div>

                                <div class="col-sm-5 d-flex flex-column justify-content-center align-items-center">
                                    <label for="dessertImage"> Upload Dessert Image</label>
                                    <input type="file" accept="image/*" id="image" class="form-control mb-2">
                                    <label for="recommended">Recommended Accompaniments</label>
                                    <img src="${table}" id="table" alt="Table">
                                    <input type="text" class="input-group" id="accompaniments" placeholder="tea with a dash of honey">
                                </div>
                            </div>
                        </form>
                    </div>


                    <!-- PAGE 2 DATA ENTRY -->
                    <div id="page2" class="page">
                        <input type="text" id="storeName" placeholder="McDonald's">
                        <input type="text" id="datePurchased" placeholder="Date Purchased">
                        <input type="text" id="dessertType" placeholder="Dessert Type">
                        <input type="text" id="flavour" placeholder="Flavour">
                        <input type="text" id="acquisition" placeholder="Acquisition Method">
                    </div>


                    <!-- PAGE 3 DATA ENTRY -->
                    <div id="page3" class="page">
                        <input type="text" id="country" name="country" placeholder="Country of Origin">
                        <input type="text" id="rating" name="rating" placeholder="Rating">
                    </div>          
                </div>        
            <button id="nextButton">></button>
            </div>

            <div class="d-flex justify-content-center align-items-center">
                <button id="submitButton"> Submit!</button>  
            </div>

            </main>

            
        `;
    }

    async postRender(){
        this.updatePageDisplay();

        const prevButton = document.getElementById("prevButton");
        const nextButton = document.getElementById("nextButton");
    
        
        prevButton.addEventListener("click", () => {
                this.currentPage--;
                this.updatePageDisplay();
                // this.loadDessertData(); //Load data for previous page 
        });
    
        nextButton.addEventListener("click", () => {
                this.currentPage++;
                this.updatePageDisplay();
                // this.loadDessertData(); //Load data for the next page 
        });

        const submitButton = document.getElementById("submitButton");
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default form submission
            this.saveDessertData(); 

            // Display a confirmation message
            alert("Dessert Data Saved Succesfully!")
        });
    }

    // Update the Data Entry Page when user clicks 'Next'
    updatePageDisplay() {
        // Debugging to ensure that it runs 
        console.log("updatePageDisplay called with currentPage:", this.currentPage);
        const pages = document.querySelectorAll("#dessertFormContainer .page");

        // Update Respective Pages
        pages.forEach((page, index) => {
            page.classList.toggle("active", index + 1 === this.currentPage);
        });

        // Change Page Numbers 
        document.getElementById("pageNumber").textContent = `${this.currentPage}/3`;

        // Disable User from accessing >3 or <1 Pages
        document.getElementById("prevButton").disabled = this.currentPage === 1;
        document.getElementById("nextButton").disabled = this.currentPage === 3;

        // Show submit button on Page 3
        const submitButton = document.getElementById("submitButton");
        if (submitButton) { // Check if the button exists 
            submitButton.style.display = this.currentPage === 3 ? "block" : "none";
        }

    }

    saveDessertData(){
        // Retrieve existing desserts from localStorage, or initialise an empty array
        let desserts = JSON.parse(localStorage.getItem("desserts")) || [];

        // Collect data from ALL pages into a single object 
        const newDessert = {};
        for(let i = 1; i <=3 ; i ++){
            const pageId = `page${i}`;
            const pageData = {};
            const inputFields = document.querySelectorAll(`#${pageId} input`);
            inputFields.forEach(field => {
                pageData[field.id] = field.value;
            });
            Object.assign(newDessert, pageData); // Merge page into newDessert
        }

        // Handle uploaded image using getBase64
        const uploadFile = document.getElementById("image");
        if(uploadFile.files.length > 0){
            getBase64(uploadFile.files[0], (base64Image) =>{
                newDessert.image = base64Image;
                // Add the new dessert to the array 
                desserts.push(newDessert);

                // Save the updated array to localStorage
                localStorage.setItem("desserts", JSON.stringify(desserts));
        });
        }else{
            // No Image Upload
            desserts.push(newDessert);
            localStorage.setItem("desserts", JSON.stringify(desserts));
        }
    }
}


// ---------------------------------- helper functions ------------------------------------------------

// Translates image file into base 64 string 
function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        callback(reader.result); 
        console.log(reader.result); // Debugging
    });
    reader.readAsDataURL(file);
}