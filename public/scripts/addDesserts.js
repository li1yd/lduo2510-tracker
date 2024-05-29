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
                        <form>
                            <div class="row">
                                <div class="col-sm-7 d-flex flex-column justify-content-center align-items-center">

                                    <!-- DESSERT NAME -->
                                    <label for="dessertName"> Dessert Name: </label>
                                    <input type="text" class="input-group mb-3" id="dessertName" name="dessertName" placeholder="chocolate ice cream">

                                    <!-- DESSERT PRICE -->
                                    <input type="number" class="input-group input-group-sm mb-3" id="price" name="price" placeholder="Price">

                                    <!-- DESSERT IMAGE -->
                                    <img src="${display}" id="display" alt="Display Case">

                                </div>

                                <div class="col-sm-5 d-flex flex-column justify-content-center align-items-center">
                                    <label for="dessertImage"> Upload Dessert Image</label>
                                    <input type="file" id="upload-file" class="form-control mb-2">
                                    <label for="recommended">Recommended Accompaniments</label>
                                    <img src="${table}" id="table" alt="Table">
                                    <input type="text" class="input-group" id="accopmaniments" name="accompaniments" placeholder="tea with a dash of honey">
                                </div>
                            </div>
                        </form>
                    </div>


                    <!-- PAGE 2 DATA ENTRY -->
                    <div id="page2" class="page">
                        <input type="text" id="storeName" name="storeName" placeholder="McDonald's">
                        <input type="text" id="datePurchased" name="datePurchased" placeholder="Date Purchased">
                        <input type="text" id="dessertType" name="dessertType" placeholder="Dessert Type">
                        <input type="text" id="flavour" name="flavour" placeholder="Flavour">
                        <input type="text" id="acquisition" name="acquisition" placeholder="Acquisition Method">
                    </div>


                    <!-- PAGE 3 DATA ENTRY -->
                    <div id="page3" class="page">
                        <input type="text" id="country" name="country" placeholder="Country of Origin">
                        <input type="text" id="rating" name="rating" placeholder="Rating">
                    </div>                
                </div>        

            <button id="nextButton">></button>
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
                // Add logic to save data from the current page (optional)
        });
    
        nextButton.addEventListener("click", () => {
                this.currentPage++;
                this.updatePageDisplay();
                // Add logic to save data from the current page (optional)
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
    }
}



