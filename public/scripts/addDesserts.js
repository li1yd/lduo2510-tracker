import abstractView from "./abstractView.js";
import display from '../src/images/display.png';
import table from '../src/images/table.png';

export default class extends abstractView{
    constructor(){
        super();
        this.setTitle("Add Desserts");
        this.currentPage = 2;
    }

    // returns displayed HTML content when view is rendered
    async getHtml(){ 
        return ` 
        <main>

        ${this.getHeaderHtml()}
            <div class="d-flex justify-content-between align-items-center">

                <button id="prevButton"><</button>
                <div id="dessertFormContainer" class="container">
                    <div id="page1" class="page active">
                        <form id="dessertForm">
                            ${this.getPage1Html()}
                        </form>
                    </div>

                    <div id="page2" class="page">${this.getPage2Html()}</div> 
                    <div id="page3" class="page">${this.getPage3Html()}</div> 
                </div>

                <button id="nextButton">></button>
            </div>
            ${this.getSubmitButtonHtml()}

        </main>`;
        }

        getHeaderHtml(){
            return `
            <!-- Title/ Page Numbers --> 
            <header class="d-flex justify-content-between align-items-center"> 
                <h1> New Entry </h1>
                <h2 class="text-end"id="pageNumber">${this.currentPage}/3</h2>
            </header>
            `
        }

        getPage1Html(){
            return `
            <!-- PAGE 1 DATA ENTRY -->

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
                    <input type="file" accept="image/*" id="dessertImage" class="form-control mb-2">

                    <label for="accompaniments">Recommended Accompaniments</label>
                    <img src="${table}" id="table" alt="Table">
                    <input type="text" class="input-group" id="accompaniments" placeholder="tea with a dash of honey">
                </div>
            </div>
            `
          }
            
        getPage2Html(){
            return `
            <!-- PAGE 2 DATA ENTRY -->

            <div class="row">
                <div class="col-sm-4 d-flex flex-column justify-content-center align-items-center">
                    
                    
                        <label for="store">Store:</label>
                        <input type="text" id="store" placeholder="Store Name">
                    

                    <label for="datePurchased">Date Purchased:</label>
                    <input type="text" class="form-control datepicker" id="datePurchased" placeholder="[Date]">

                </div>

                <div class="col-sm-3 d-flex flex-column justify-content-center align-items-center">
                    <label for="dessertType">Dessert Type:</label>

                    <select id="dessertType">
                        <option value="candies">Candies</option>
                        <option value="confections">Confections</option>
                        <option value="baked">Baked Dessert</option>
                        <option value="frozen">Frozen Dessert</option>
                        <option value="drink">Dessert Drink</option>
                        <option value="fried">Fried Dessert</option>
                        <option value="pudding">Pudding & Custards</option>
                    </select>

                </div>

                <div class="col-sm-3 d-flex flex-column justify-content-center align-items-center">
                    <label for="flavour">Flavour:</label>
                    <input type="text" id="flavour" placeholder="Flavour">
                </div>


                <div class="col-sm-2 d-flex flex-column justify-content-center align-items-center">
                    <label for="acquisition">Acquisition Method:</label>

                    <div class="radio-option">
                        <label for="storeBought">Store Bought</label>
                        <input type="radio" id="storeBought" name="acquisition" value="storeBought">
                    </div>

                    <div class="radio-option">
                        <label for="delivery">delivery</label>
                        <input type="radio" id="delivery" name="acquisition" value="delivery">
                    </div>

                    <div class="radio-option">
                        <label for="homemade">homemade</label>
                        <input type="radio" id="homemade" name="acquisition" value="homemade">
                    </div>

                    <input type="text" id="acquisition">
                </div>

            </div>
            `
        }


        getPage3Html(){
            return `
            <!-- PAGE 3 DATA ENTRY -->

            <input type="text" id="country" name="country" placeholder="Country of Origin">
            <input type="text" id="rating" name="rating" placeholder="Rating">        
            `
        }


        getSubmitButtonHtml(){
            return `
            <div class="d-flex justify-content-center align-items-center">
                <button id="submitButton"> Submit!</button>  
            </div>
            `
        }


    async postRender(){
        this.updatePageDisplay();

        // Initialize Bootstrap Datepicker
        $('.datepicker').datepicker({
            format: 'yyyy-mm-dd', // Set your desired date format
            autoclose: true, // Close the datepicker after selection
            orientation: "bottom"
        });

        const prevButton = document.getElementById("prevButton");
        const nextButton = document.getElementById("nextButton");
    
        
        prevButton.addEventListener("click", () => {
                this.currentPage--;
                this.updatePageDisplay();
        });
    
        nextButton.addEventListener("click", () => {
                this.currentPage++;
                this.updatePageDisplay();
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
        const uploadFile = document.getElementById("dessertImage");
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