import abstractView from "./abstractView.js";
import display from '../src/images/display.png';
import table from '../src/images/table.png';
import calendar from '../src/images/calendar.png';
import chocolate from '../src/images/chocolate.png';
import coffee from '../src/images/coffee.png';
import cupcake from '../src/images/cupcake.png';
import donut from '../src/images/donut.png';
import flan from '../src/images/flan.png';
import pie from '../src/images/pie.png';

export default class extends abstractView{
    constructor(){
        super();
        this.setTitle("Add Desserts");
        this.currentPage = 1;
    }

    // returns displayed HTML content when view is rendered
    async getHtml(){ 
        // Await the resolution of getPage3Html (countries API) before using its result
        const page3Html = await this.getPage3Html(); 

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
                    <div id="page3" class="page">${page3Html}</div> 
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
                <h1 id=newEntryTitle> New Entry </h1>
                <h2 class="text-end"id="pageNumber">${this.currentPage}/3</h2>
            </header>
            `
        }

        getPage1Html(){
            // Return Page 1 HTML
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
                    <input type="file" accept="image/*" id="dessertImage" class="form-control mb-2" required>

                    <label for="accompaniments">Recommended Accompaniments</label>
                    <img src="${table}" id="table" alt="Table">
                    <input type="text" class="input-group" id="accompaniments" placeholder="tea with a dash of honey">
                </div>
            </div>
            `
          }
            
        getPage2Html(){
            // Return Page 2 HTML
            return `
            <!-- PAGE 2 DATA ENTRY -->
            <div class="row">
                <div class="col-sm-3 d-flex flex-column justify-content-center align-items-center">
                    
                    <label for="datePurchased">Date Purchased</label>
                    <img src="${calendar}" id="calendar" class="img-fluid" alt="calendar">
                    <input type="text" class="form-control datepicker" id="datePurchased" placeholder="[Date]">

                </div>

                <div class="col-sm-3 d-flex flex-column justify-content-center align-items-center">
                    <label for="dessertType">Dessert Type:</label>

                    <div id="dessertTypeImages"> 
                        <img src="${cupcake}" id="cupcake" class="img-fluid" alt="cupcake">
                        <img src="${chocolate}" id="cupcake" class="img-fluid" alt="cupcake">
                        <img src="${coffee}" id="cupcake" class="img-fluid" alt="cupcake">
                        <img src="${donut}" id="cupcake" class="img-fluid" alt="cupcake">
                        <img src="${flan}" id="cupcake" class="img-fluid" alt="cupcake">
                        <img src="${pie}" id="cupcake" class="img-fluid" alt="cupcake">
                    </div>

                    <select id="dessertType">
                        <option value="">Select Type</option>
                        <option value="Candies">Candies</option>
                        <option value="Confections">Confections</option>
                        <option value="Baked">Baked Dessert</option>
                        <option value="Frozen">Frozen Dessert</option>
                        <option value="Drink">Dessert Drink</option>
                        <option value="Fried">Fried Dessert</option>
                        <option value="Pudding/Custards">Pudding & Custards</option>
                    </select>

                </div>
                

                <div class="col-sm-3 d-flex flex-column justify-content-center align-items-center">

                    <label for="flavour">Flavour:</label>
                    <input type="text" id="flavour" placeholder="Strawberry">
                </div>


                <div class="col-sm-3 d-flex flex-column justify-content-center align-items-center"> 

                    <fieldset id="acquisitionLabel">
                        <legend id="acquisitionLabel">Acquisition Method:</legend>
                    
                        <div class="form-check">
                            <input type="radio" id="storeBought" name="acquisition" value="Store-bought" class="form-check-input">
                            <label for="storeBought" class="form-check-label">Store-bought</label> 
                        </div>

                        <div class="form-check">
                            <input type="radio" id="delivery" name="acquisition" value="Delivery" class="form-check-input">
                            <label for="delivery" class="form-check-label">Delivery</label>
                        </div>                        
                    </fieldset>

                    <div id="storeContainer">
                        <label for="store">Store:</label>
                        <input type="text" id="store" placeholder="Store Name">
                    </div>

                </div>
            </div>
            `
        }


        async getPage3Html(){
            //REFERNCE Countries API: https://canvas.sydney.edu.au/courses/56508/pages/week-5-content?module_item_id=2244487
            // PREVIOUS IMPLEMENTATION USING API (Many issues documented in README) :(
            // const url = "https://restcountries.com/v3.1/all";
            // let countryOptions = '';
          
            // try {
            //     const response = await fetch(url);           
            //     const countriesData = await response.json();
            
            //     // Sort countries alphabetically
            //     countriesData.sort((a, b) => a.name.common.localeCompare(b.name.common));
            
            //     // Create dropdown options HTML (using the sorted data)
            //     countryOptions = countriesData.map(country => `
            //         <option value="${country.name.common}">${country.name.common}</option>
            //     `).join('');
          
            // }catch (error) {
            //   console.error("Error fetching countries:", error); 
            //   // Handle the error gracefully (e.g., display a message to the user)
            //   countryOptions = '<option value="">Error loading countries</option>';
            // }

            // Return Page 3 HTML
            return `
            <div class="row"> 
                <div class="col-sm-6 d-flex flex-column justify-content-center align-items-center">
                    <label for="country">Country of Origin:</label>     
                        <select id="country" name="country" autocomplete="country-name">
                            <option value="">Select Country</option>
                        </select>
                </div>

                <div class="col-sm-6 d-flex flex-column justify-content-center align-items-center" aria-label="Dessert Rating">
                    <!-- REFERENCE - How to Create Star Rating: 
                    https://www.youtube.com/watch?v=q1xhbc-oKnc -->

                    <h3> Rating: </h3>
                    <div class="stars" aria-label="Dessert Rating">
                        <i class="fa solid fa-star"></i>
                        <i class="fa solid fa-star"></i>
                        <i class="fa solid fa-star"></i>
                        <i class="fa solid fa-star"></i>
                        <i class="fa solid fa-star"></i>
                    </div>
                </div>
            </div>
            `;
        };

        getSubmitButtonHtml(){
            return `
            <div class="d-flex justify-content-center align-items-center" id="submitButtonContainer">
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

        // Image Cycling Logic 
        const dessertImages = document.querySelectorAll("#dessertTypeImages img");
        let currentImageIndex = 0; 

        function showNextImage() {
            dessertImages[currentImageIndex].style.display = "none";
            currentImageIndex = (currentImageIndex + 1) % dessertImages.length;
            dessertImages[currentImageIndex].style.display = "block";
        }

        // Show the first image initially
        dessertImages[currentImageIndex].style.display = "block";

        // Start automatic cycling
        setInterval(showNextImage, 3000); 

        // Next/ Previous Button Functionality 
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

        // Submit Button Functionality 
        const submitButton = document.getElementById("submitButton");
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default form submission
            this.saveDessertData(); 
        });

        // Rating Stars Functionality 
        const stars = document.querySelectorAll(".stars i");

        // Handle the Visual Update of the stars 
        stars.forEach((star, index1)=>{
            star.addEventListener("click", () =>{
                stars.forEach((star,index2) =>{
                    index1 >= index2 ? star.classList.add("active") : star.classList.remove("active")
                })
            })
        })

    }

    // Update the Data Entry Page when user clicks 'Next'
    updatePageDisplay() {
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

    saveDessertData() {
        // Retrieve existing desserts from localStorage, or initialize an empty array
        let desserts = JSON.parse(localStorage.getItem("desserts")) || [];
      
        // Collect data from ALL pages into a single object
        const newDessert = {};
        for (let i = 1; i <= 3; i++) {
          const pageId = `page${i}`;
          const pageData = {};
          const inputFields = document.querySelectorAll(`#${pageId} input`);
          inputFields.forEach((field) => {
            pageData[field.id] = field.value;
          });
          Object.assign(newDessert, pageData); // Merge page data into newDessert
        }
      
        // Get selected dessert type and acquisition method
        newDessert.dessertType = document.getElementById("dessertType").value;
        newDessert.acquisition = document.querySelector('input[name="acquisition"]:checked')?.value || "";
      
        // Get selected country
        newDessert.country = document.getElementById("country").value;
      
        // Get star rating
        newDessert.rating = calculateStarRating();
      
        const uploadFile = document.getElementById("dessertImage");
      
        // Validate image field
        if (!uploadFile.files || uploadFile.files.length === 0) {
          alert("Please select a dessert image.");
          return; // Stop submission if no image is selected
        }
      
        // Check if selected file is actually an image
        const fileType = uploadFile.files[0].type;
        if (!fileType.startsWith("image/")) {
          alert("Please select a valid image file.");
          return; // Stop submission if the selected file is not an image
        }
      
        // Display confirmation modal 
        let confirmModal = document.querySelector('.modal.fade');

        if (!confirmModal) {  // If modal doesn't exist, create it
          confirmModal = document.createElement('div');
          confirmModal.classList.add('modal', 'fade');

        // REFERENCE: https://getbootstrap.com/docs/4.0/components/modal/
        confirmModal.innerHTML = `
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Confirm Submission</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                Are you sure you want to submit this dessert?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="confirmSubmit">Submit</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(confirmModal);
        }

        const modal = new bootstrap.Modal(confirmModal);
        modal.show();

        // Handle confirmation submit (defined outside of the event listener)
        function handleConfirmSubmit() {
            // Handle uploaded image using getBase64
            getBase64(uploadFile.files[0], (base64Image) => {
            newDessert.image = base64Image;

            // Add new dessert to the array
            desserts.push(newDessert);

            // Save updated array to localStorage
            localStorage.setItem("desserts", JSON.stringify(desserts));

            // Trigger transition (opacity and transform)
            confirmModal.style.opacity = 0;
            confirmModal.style.transform = 'translateY(-20px)'; // Adjust the value as needed

            // Hide after transition
            setTimeout(() => {
                modal.hide();
                confirmSubmitButton.removeEventListener('click', handleConfirmSubmit);
                confirmModal.remove();
            }, 300); 
            });
        }

        // Remove existing event listener before adding a new one
        const confirmSubmitButton = document.getElementById("confirmSubmit");
        confirmSubmitButton.removeEventListener('click', handleConfirmSubmit);
        confirmSubmitButton.addEventListener("click", handleConfirmSubmit);
        }    
}


// ---------------------------------- helper functions ------------------------------------------------

// Translates image file into base 64 string 
function getBase64(file, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        callback(reader.result); 
    });
    reader.readAsDataURL(file);
}

// Calculate star rating
function calculateStarRating() {
    const stars = document.querySelectorAll(".stars i");
    let rating = 0;
    stars.forEach((star, index) => {
      if (star.classList.contains("active")) {
        rating = index + 1; 
      }
    });
    return rating;
  }