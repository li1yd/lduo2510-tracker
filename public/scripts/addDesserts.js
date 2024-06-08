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
                        <form id="dessertForm">${this.getPage1Html()}</form>
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
            </header>`;
        }

        getPage1Html(){
            // Return Page 1 HTML
            return `
            <!-- PAGE 1 DATA ENTRY -->
            <div class="row">
                <div class="col-sm-7 d-flex flex-column justify-content-center align-items-center">
                    <label for="dessertName"> Dessert Name: </label>
                    <input type="text" class="input-group mb-3" id="dessertName" placeholder="chocolate ice cream">
                    <input type="number" class="input-group input-group-sm mb-3" id="price" placeholder="Price">
                    <img src="${display}" id="display" alt="Display Case">
                </div>

                <div class="col-sm-5 d-flex flex-column justify-content-center align-items-center">
                    <label for="dessertImage"> Upload Dessert Image</label>
                    <input type="file" accept="image/*" id="dessertImage" class="form-control mb-2" required>
                    <label for="accompaniments">Recommended Accompaniments</label>
                    <img src="${table}" id="table" alt="Table">
                    <input type="text" class="input-group" id="accompaniments" placeholder="tea with a dash of honey">
                </div>
            </div>`;
          }
            
        getPage2Html(){
            // Return Page 2 HTML
            return `
            <!-- PAGE 2 DATA ENTRY -->
            <div class="row">

                <!-- COL 1: DATE PURCHASED-->
                <div class="col-sm-3 d-flex flex-column justify-content-center align-items-center">
                    <label for="datePurchased">Date Purchased</label>
                    <img src="${calendar}" id="calendar" class="img-fluid" alt="calendar">
                    <input type="text" class="form-control datepicker" id="datePurchased" placeholder="[Date]">
                </div>

                <!-- COL 2: DESSERT TYPE-->
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

                <!-- COL 3: FLAVOUR-->
                <div class="col-sm-3 d-flex flex-column justify-content-center align-items-center">
                    <label for="flavour">Flavour:</label>
                    <input type="text" id="flavour" placeholder="Strawberry">
                </div>

                <!-- COL 4: ACQUISTION METHOD-->
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
            // REFERNCE Countries API: https://canvas.sydney.edu.au/courses/56508/pages/week-5-content?module_item_id=2244487
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
                            ${createCountryList()} 
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
        $('.datepicker').datepicker({ format: 'yyyy-mm-dd', autoclose: true, orientation: "bottom" });

        // Image Cycling Logic 
        const dessertImages = document.querySelectorAll("#dessertTypeImages img");
        let currentImageIndex = 0; 
        dessertImages[currentImageIndex].style.display = "block";
        setInterval(() => {
            dessertImages[currentImageIndex].style.display = "none";
            currentImageIndex = (currentImageIndex + 1) % dessertImages.length;
            dessertImages[currentImageIndex].style.display = "block";
        }, 3000);


        // Next/ Previous Button Functionality     
        document.getElementById("prevButton").addEventListener("click", () => {
            this.currentPage--;
            this.updatePageDisplay();
        });
        document.getElementById("nextButton").addEventListener("click", () => {
            this.currentPage++;
            this.updatePageDisplay();
        });

        // Submit Button Functionality 
        document.getElementById("submitButton").addEventListener("click", (event) => {
            event.preventDefault();
            this.saveDessertData();
        });

        // Rating Stars (Handle the Visual Update of the stars)
        const stars = document.querySelectorAll(".stars i");
        stars.forEach((star, index1)=>{
            star.addEventListener("click", () =>{
                stars.forEach((star,index2) =>{
                    index1 >= index2 ? star.classList.add("active") : star.classList.remove("active")
                })
            })
        });
    }

    // Update the Data Entry Page when user clicks 'Next'
    updatePageDisplay() {
        // Update Respective Pages
        const pages = document.querySelectorAll("#dessertFormContainer .page");
        pages.forEach((page, index) => {
            page.classList.toggle("active", index + 1 === this.currentPage);
        });

        // Change Page Numbers 
        document.getElementById("pageNumber").textContent = `${this.currentPage}/3`;
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
            const inputFields = document.querySelectorAll(`#page${i} input`);
            inputFields.forEach(field => {
                newDessert[field.id] = field.value;
            });
        }
      
        newDessert.dessertType = document.getElementById("dessertType").value; // Get selected dessert type
        newDessert.acquisition = document.querySelector('input[name="acquisition"]:checked')?.value || ""; // Get acquisition method
        newDessert.country = document.getElementById("country").value;   // Get selected country
        newDessert.rating = calculateStarRating(); // Get star rating
      
        // Validate image field
        const uploadFile = document.getElementById("dessertImage");
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

        // Handle confirmation submit
        function handleConfirmSubmit() {
            // Handle uploaded image using getBase64
            getBase64(uploadFile.files[0], (base64Image) => {
            newDessert.image = base64Image;
            desserts.push(newDessert); // Add new dessert to the array
            localStorage.setItem("desserts", JSON.stringify(desserts)); // Save updated array to localStorage

            // Trigger transition (opacity and transform)
            confirmModal.style.opacity = 0;
            confirmModal.style.transform = 'translateY(-50px)'; 

            // Hide after transition
            setTimeout(() => {
                modal.hide();
                confirmSubmitButton.removeEventListener('click', handleConfirmSubmit);
                confirmModal.remove();
            }, 200); 
            });
        }

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

// Create a list of countries (API was not working :()
function createCountryList() {
    const countryOptions = [
        { value: "Afghanistan", label: "Afghanistan" },
        { value: "Åland Islands", label: "Åland Islands" },
        { value: "Albania", label: "Albania" },
        { value: "Algeria", label: "Algeria" },
        { value: "American Samoa", label: "American Samoa" },
        { value: "Andorra", label: "Andorra" },
        { value: "Angola", label: "Angola" },
        { value: "Anguilla", label: "Anguilla" },
        { value: "Antarctica", label: "Antarctica" },
        { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
        { value: "Argentina", label: "Argentina" },
        { value: "Armenia", label: "Armenia" },
        { value: "Aruba", label: "Aruba" },
        { value: "Australia", label: "Australia" },
        { value: "Austria", label: "Austria" },
        { value: "Azerbaijan", label: "Azerbaijan" },
        { value: "Bahamas", label: "Bahamas" },
        { value: "Bahrain", label: "Bahrain" },
        { value: "Bangladesh", label: "Bangladesh" },
        { value: "Barbados", label: "Barbados" },
        { value: "Belarus", label: "Belarus" },
        { value: "Belgium", label: "Belgium" },
        { value: "Belize", label: "Belize" },
        { value: "Benin", label: "Benin" },
        { value: "Bermuda", label: "Bermuda" },
        { value: "Bhutan", label: "Bhutan" },
        { value: "Bolivia", label: "Bolivia" },
        { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
        { value: "Botswana", label: "Botswana" },
        { value: "Bouvet Island", label: "Bouvet Island" },
        { value: "Brazil", label: "Brazil" },
        { value: "British Indian Ocean Territory", label: "British Indian Ocean Territory" },
        { value: "Brunei Darussalam", label: "Brunei Darussalam" },
        { value: "Bulgaria", label: "Bulgaria" },
        { value: "Burkina Faso", label: "Burkina Faso" },
        { value: "Burundi", label: "Burundi" },
        { value: "Cambodia", label: "Cambodia" },
        { value: "Cameroon", label: "Cameroon" },
        { value: "Canada", label: "Canada" },
        { value: "Cape Verde", label: "Cape Verde" },
        { value: "Cayman Islands", label: "Cayman Islands" },
        { value: "Central African Republic", label: "Central African Republic" },
        { value: "Chad", label: "Chad" },
        { value: "Chile", label: "Chile" },
        { value: "China", label: "China" },
        { value: "Christmas Island", label: "Christmas Island" },
        { value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands" },
        { value: "Colombia", label: "Colombia" },
        { value: "Comoros", label: "Comoros" },
        { value: "Congo", label: "Congo" },
        { value: "Congo, The Democratic Republic of The", label: "Congo, The Democratic Republic of The" },
        { value: "Cook Islands", label: "Cook Islands" },
        { value: "Costa Rica", label: "Costa Rica" },
        { value: "Cote D'ivoire", label: "Cote D'ivoire" },
        { value: "Croatia", label: "Croatia" },
        { value: "Cuba", label: "Cuba" },
        { value: "Curaçao", label: "Curaçao" },
        { value: "Cyprus", label: "Cyprus" },
        { value: "Czech Republic", label: "Czech Republic" },
        { value: "Denmark", label: "Denmark" },
        { value: "Djibouti", label: "Djibouti" },
        { value: "Dominica", label: "Dominica" },
        { value: "Dominican Republic", label: "Dominican Republic" },
        { value: "Ecuador", label: "Ecuador" },
        { value: "Egypt", label: "Egypt" },
        { value: "El Salvador", label: "El Salvador" },
        { value: "Equatorial Guinea", label: "Equatorial Guinea" },
        { value: "Eritrea", label: "Eritrea" },
        { value: "Estonia", label: "Estonia" },
        { value: "Ethiopia", label: "Ethiopia" },
        { value: "Falkland Islands (Malvinas)", label: "Falkland Islands (Malvinas)" },
        { value: "Faroe Islands", label: "Faroe Islands" },
        { value: "Fiji", label: "Fiji" },
        { value: "Finland", label: "Finland" },
        { value: "France", label: "France" },
        { value: "French Guiana", label: "French Guiana" },
        { value: "French Polynesia", label: "French Polynesia" },
        { value: "French Southern Territories", label: "French Southern Territories" },
        { value: "Gabon", label: "Gabon" },
        { value: "Gambia", label: "Gambia" },
        { value: "Georgia", label: "Georgia" },
        { value: "Germany", label: "Germany" },
        { value: "Ghana", label: "Ghana" },
        { value: "Gibraltar", label: "Gibraltar" },
        { value: "Greece", label: "Greece" },
        { value: "Greenland", label: "Greenland" },
        { value: "Grenada", label: "Grenada" },
        { value: "Guadeloupe", label: "Guadeloupe" },
        { value: "Guam", label: "Guam" },
        { value: "Guatemala", label: "Guatemala" },
        { value: "Guernsey", label: "Guernsey" },
        { value: "Guinea", label: "Guinea" },
        { value: "Guinea-bissau", label: "Guinea-bissau" },
        { value: "Guyana", label: "Guyana" },
        { value: "Haiti", label: "Haiti" },
        { value: "Heard Island and Mcdonald Islands", label: "Heard Island and Mcdonald Islands" },
        { value: "Holy See (Vatican City State)", label: "Holy See (Vatican City State)" },
        { value: "Honduras", label: "Honduras" },
        { value: "Hong Kong", label: "Hong Kong" },
        { value: "Hungary", label: "Hungary" },
        { value: "Iceland", label: "Iceland" },
        { value: "India", label: "India" },
        { value: "Indonesia", label: "Indonesia" },
        { value: "Iran, Islamic Republic of", label: "Iran, Islamic Republic of" },
        { value: "Iraq", label: "Iraq" },
        { value: "Ireland", label: "Ireland" },
        { value: "Isle of Man", label: "Isle of Man" },
        { value: "Israel", label: "Israel" },
        { value: "Italy", label: "Italy" },
        { value: "Jamaica", label: "Jamaica" },
        { value: "Japan", label: "Japan" },
        { value: "Jersey", label: "Jersey" },
        { value: "Jordan", label: "Jordan" },
        { value: "Kazakhstan", label: "Kazakhstan" },
        { value: "Kenya", label: "Kenya" },
        { value: "Kiribati", label: "Kiribati" },
        { value: "Korea, Democratic People's Republic of", label: "Korea, Democratic People's Republic of" },
        { value: "Korea, Republic of", label: "Korea, Republic of" },
        { value: "Kuwait", label: "Kuwait" },
        { value: "Kyrgyzstan", label: "Kyrgyzstan" },
        { value: "Lao People's Democratic Republic", label: "Lao People's Democratic Republic" },
        { value: "Latvia", label: "Latvia" },
        { value: "Lebanon", label: "Lebanon" },
        { value: "Lesotho", label: "Lesotho" },
        { value: "Liberia", label: "Liberia" },
        { value: "Libyan Arab Jamahiriya", label: "Libyan Arab Jamahiriya" },
        { value: "Liechtenstein", label: "Liechtenstein" },
        { value: "Lithuania", label: "Lithuania" },
        { value: "Luxembourg", label: "Luxembourg" },
        { value: "Macao", label: "Macao" },
        { value: "Macedonia, The Former Yugoslav Republic of", label: "Macedonia, The Former Yugoslav Republic of" },
        { value: "Madagascar", label: "Madagascar" },
        { value: "Malawi", label: "Malawi" },
        { value: "Malaysia", label: "Malaysia" },
        { value: "Maldives", label: "Maldives" },
        { value: "Mali", label: "Mali" },
        { value: "Malta", label: "Malta" },
        { value: "Marshall Islands", label: "Marshall Islands" },
        { value: "Martinique", label: "Martinique" },
        { value: "Mauritania", label: "Mauritania" },
        { value: "Mauritius", label: "Mauritius" },
        { value: "Mayotte", label: "Mayotte" },
        { value: "Mexico", label: "Mexico" },
        { value: "Micronesia, Federated States of", label: "Micronesia, Federated States of" },
        { value: "Moldova, Republic of", label: "Moldova, Republic of" },
        { value: "Monaco", label: "Monaco" },
        { value: "Mongolia", label: "Mongolia" },
        { value: "Montenegro", label: "Montenegro" },
        { value: "Montserrat", label: "Montserrat" },
        { value: "Morocco", label: "Morocco" },
        { value: "Mozambique", label: "Mozambique" },
        { value: "Myanmar", label: "Myanmar" },
        { value: "Namibia", label: "Namibia" },
        { value: "Nauru", label: "Nauru" },
        { value: "Nepal", label: "Nepal" },
        { value: "Netherlands", label: "Netherlands" },
        { value: "New Caledonia", label: "New Caledonia" },
        { value: "New Zealand", label: "New Zealand" },
        { value: "Nicaragua", label: "Nicaragua" },
        { value: "Niger", label: "Niger" },
        { value: "Nigeria", label: "Nigeria" },
        { value: "Niue", label: "Niue" },
        { value: "Norfolk Island", label: "Norfolk Island" },
        { value: "Northern Mariana Islands", label: "Northern Mariana Islands" },
        { value: "Norway", label: "Norway" },
        { value: "Oman", label: "Oman" },
        { value: "Pakistan", label: "Pakistan" },
        { value: "Palau", label: "Palau" },
        { value: "Palestinian Territory, Occupied", label: "Palestinian Territory, Occupied" },
        { value: "Panama", label: "Panama" },
        { value: "Papua New Guinea", label: "Papua New Guinea" },
        { value: "Paraguay", label: "Paraguay" },
        { value: "Peru", label: "Peru" },
        { value: "Philippines", label: "Philippines" },
        { value: "Pitcairn", label: "Pitcairn" },
        { value: "Poland", label: "Poland" },
        { value: "Portugal", label: "Portugal" },
        { value: "Puerto Rico", label: "Puerto Rico" },
        { value: "Qatar", label: "Qatar" },
        { value: "Reunion", label: "Reunion" },
        { value: "Romania", label: "Romania" },
        { value: "Russia", label: "Russia" },
        { value: "Rwanda", label: "Rwanda" },
        { value: "Saint Helena", label: "Saint Helena" },
        { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
        { value: "Saint Lucia", label: "Saint Lucia" },
        { value: "Saint Pierre and Miquelon", label: "Saint Pierre and Miquelon" },
        { value: "Saint Vincent and The Grenadines", label: "Saint Vincent and The Grenadines" },
        { value: "Samoa", label: "Samoa" },
        { value: "San Marino", label: "San Marino" },
        { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
        { value: "Saudi Arabia", label: "Saudi Arabia" },
        { value: "Senegal", label: "Senegal" },
        { value: "Serbia", label: "Serbia" },
        { value: "Seychelles", label: "Seychelles" },
        { value: "Sierra Leone", label: "Sierra Leone" },
        { value: "Singapore", label: "Singapore" },
        { value: "Slovakia", label: "Slovakia" },
        { value: "Slovenia", label: "Slovenia" },
        { value: "Solomon Islands", label: "Solomon Islands" },
        { value: "Somalia", label: "Somalia" },
        { value: "South Africa", label: "South Africa" },
        { value: "South Georgia and The South Sandwich Islands", label: "South Georgia and The South Sandwich Islands" },
        { value: "Spain", label: "Spain" },
        { value: "Sri Lanka", label: "Sri Lanka" },
        { value: "Sudan", label: "Sudan" },
        { value: "Suriname", label: "Suriname" },
        { value: "Svalbard and Jan Mayen", label: "Svalbard and Jan Mayen" },
        { value: "Eswatini", label: "Eswatini" },
        { value: "Sweden", label: "Sweden" },
        { value: "Switzerland", label: "Switzerland" },
        { value: "Syrian Arab Republic", label: "Syrian Arab Republic" },
        { value: "Taiwan (ROC)", label: "Taiwan (ROC)" },
        { value: "Tajikistan", label: "Tajikistan" },
        { value: "Tanzania, United Republic of", label: "Tanzania, United Republic of" },
        { value: "Thailand", label: "Thailand" },
        { value: "Timor-leste", label: "Timor-leste" },
        { value: "Togo", label: "Togo" },
        { value: "Tokelau", label: "Tokelau" },
        { value: "Tonga", label: "Tonga" },
        { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
        { value: "Tunisia", label: "Tunisia" },
        { value: "Turkey", label: "Turkey" },
        { value: "Turkmenistan", label: "Turkmenistan" },
        { value: "Turks and Caicos Islands", label: "Turks and Caicos Islands" },
        { value: "Tuvalu", label: "Tuvalu" },
        { value: "Uganda", label: "Uganda" },
        { value: "Ukraine", label: "Ukraine" },
        { value: "United Arab Emirates", label: "United Arab Emirates" },
        { value: "United Kingdom", label: "United Kingdom" },
        { value: "United States", label: "United States" },
        { value: "United States Minor Outlying Islands", label: "United States Minor Outlying Islands" },
        { value: "Uruguay", label: "Uruguay" },
        { value: "Uzbekistan", label: "Uzbekistan" },
        { value: "Vanuatu", label: "Vanuatu" },
        { value: "Venezuela", label: "Venezuela" },
        { value: "Vietnam", label: "Vietnam" },
        { value: "Virgin Islands, British", label: "Virgin Islands, British" },
        { value: "Virgin Islands, U.S.", label: "Virgin Islands, U.S." },
        { value: "Wallis and Futuna", label: "Wallis and Futuna" },
        { value: "Western Sahara", label: "Western Sahara" },
        { value: "Yemen", label: "Yemen" },
        { value: "Zambia", label: "Zambia" },
        { value: "Zimbabwe", label: "Zimbabwe" }
        ];
        countryOptions.sort((a, b) => a.label.localeCompare(b.label)); // Sort by label

        return countryOptions.map(country => `<option value="${country.value}">${country.label}</option>`).join('');
}