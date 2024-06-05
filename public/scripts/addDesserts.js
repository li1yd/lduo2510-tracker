import abstractView from "./abstractView.js";
import display from '../src/images/display.png';
import table from '../src/images/table.png';

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
                <h1> New Entry </h1>
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
                    <input type="file" accept="image/*" id="dessertImage" class="form-control mb-2">

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
                    
                    
                        <label for="store">Store:</label>
                        <input type="text" id="store" placeholder="Store Name">
                    

                    <label for="datePurchased">Date Purchased:</label>
                    <input type="text" class="form-control datepicker" id="datePurchased" placeholder="[Date]">

                </div>

                <div class="col-sm-3 d-flex flex-column justify-content-center align-items-center">
                    <label for="dessertType">Dessert Type:</label>

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
                    <input type="text" id="flavour" placeholder="Flavour">
                </div>


                <div class="col-sm-3 d-flex flex-column justify-content-center align-items-center"> 

                    <fieldset aria-labelledby="acquisitionLabel">
                        <legend id="acquisitionLabel">Acquisition Method:</legend>
                    
                        <div class="form-check">
                            <input type="radio" id="storeBought" name="acquisition" value="Store-bought" class="form-check-input">
                            <label for="storeBought" class="form-check-label">Store-bought</label> 
                        </div>

                        <div class="form-check">
                            <input type="radio" id="delivery" name="acquisition" value="Delivery" class="form-check-input">
                            <label for="delivery" class="form-check-label">Delivery</label>
                        </div>

                        <div class="form-check">
                            <input type="radio" id="homemade" name="acquisition" value="Home-made" class="form-check-input">
                            <label for="homemade" class="form-check-label">Home-made</label>
                        </div>
                    </fieldset>

                </div>
            </div>
            `
        }


        async getPage3Html(){
            //REFERNCE Countries API: https://canvas.sydney.edu.au/courses/56508/pages/week-5-content?module_item_id=2244487

            // PREVIOUS IMPLEMENTATION Many issues :(
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
          
            // } catch (error) {
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
                                    <option value="">Select Contry</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Åland Islands">Åland Islands</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="American Samoa">American Samoa</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antarctica">Antarctica</option>
                                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bermuda">Bermuda</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Bouvet Island">Bouvet Island</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Cape Verde">Cape Verde</option>
                                    <option value="Cayman Islands">Cayman Islands</option>
                                    <option value="Central African Republic">Central African Republic</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Christmas Island">Christmas Island</option>
                                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                    <option value="Cook Islands">Cook Islands</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Cote D'ivoire">Cote D'ivoire</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic">Czech Republic</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">Dominican Republic</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                    <option value="Faroe Islands">Faroe Islands</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="French Guiana">French Guiana</option>
                                    <option value="French Polynesia">French Polynesia</option>
                                    <option value="French Southern Territories">French Southern Territories</option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Gibraltar">Gibraltar</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Greenland">Greenland</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guadeloupe">Guadeloupe</option>
                                    <option value="Guam">Guam</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guernsey">Guernsey</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea-bissau">Guinea-bissau</option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Isle of Man">Isle of Man</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jersey">Jersey</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                    <option value="Korea, Republic of">Korea, Republic of</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Macao">Macao</option>
                                    <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                    <option value="Madagascar">Madagascar</option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">Marshall Islands</option>
                                    <option value="Martinique">Martinique</option>
                                    <option value="Mauritania">Mauritania</option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                    <option value="Moldova, Republic of">Moldova, Republic of</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montenegro">Montenegro</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                                    <option value="New Caledonia">New Caledonia</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Niue">Niue</option>
                                    <option value="Norfolk Island">Norfolk Island</option>
                                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palau">Palau</option>
                                    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">Philippines</option>
                                    <option value="Pitcairn">Pitcairn</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Puerto Rico">Puerto Rico</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russian Federation">Russian Federation</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Saint Helena">Saint Helena</option>
                                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                    <option value="Saint Lucia">Saint Lucia</option>
                                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                    <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">San Marino</option>
                                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Seychelles">Seychelles</option>
                                    <option value="Sierra Leone">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">Solomon Islands</option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                    <option value="Swaziland">Swaziland</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                    <option value="Taiwan">Taiwan</option>
                                    <option value="Tajikistan">Tajikistan</option>
                                    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Timor-leste">Timor-leste</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tokelau">Tokelau</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">Turkmenistan</option>
                                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States">United States</option>
                                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistan">Uzbekistan</option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Viet Nam">Viet Nam</option>
                                    <option value="Virgin Islands, British">Virgin Islands, British</option>
                                    <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                                    <option value="Western Sahara">Western Sahara</option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
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

            // Display a confirmation message
            alert("Dessert Data Saved Succesfully!")
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

        // Get selected dessert type and acquisition method
        newDessert.dessertType = document.getElementById("dessertType").value;
        newDessert.acquisition = document.querySelector('input[name="acquisition"]:checked')?.value || "";

        // Get selected country
        newDessert.country = document.getElementById("country").value; 

        // Get star rating
        newDessert.rating = calculateStarRating();

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