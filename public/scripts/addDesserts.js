import abstractView from "./abstractView.js";

export default class extends abstractView{
    constructor(){
        super();
        this.setTitle("Add Desserts");
    }

    // returns displayed HTML content when view is rendered
    async getHtml(){
        this.currentPage = 1; 

        return `
            <h1> New Entry </h1>
            
            <div id="dessertFormContainer" class="container">

                <!-- PAGE 1 DATA ENTRY -->
                <div id="page1" class="page active">
                    <input type="text" id="dessertName" name="dessertName" placeholder="Dessert Name">
                    <input type="text" id="dessertPrice" name="dessertPrice" placeholder="Price">
                    <input type="text" id="recommended" name="recommended" placeholder="Recommended Accompaniments">
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

                <!-- NAVIGATION ARROWS -->
                <div class="navigation" mt-4>
                    <button id="prevButton"><</button>
                    <span id="pageNumber">${this.currentPage}/3</span>
                    <button id="nextButton">></button>
                </div>

            </div>
        `;
    }


    async postRender(){
        this.updatePageDisplay();

        const prevButton = document.getElementById("prevButton");
        const nextButton = document.getElementById("nextButton");
    
        
        prevButton.addEventListener("click", () => {
            if (this.currentPage > 1){
                this.currentPage--;
                this.updatePageDisplay();
                // Add logic to save data from the current page (optional)
            }
        });
    
        nextButton.addEventListener("click", () => {
            if (this.currentPage < 3){
                this.currentPage++;
                this.updatePageDisplay();
                // Add logic to save data from the current page (optional)
            }
        });
    }

    // Update the Data Entry Page when user clicks 'Next'
    updatePageDisplay() {
        // Debugging to ensure that it runs 
        console.log("updatePageDisplay called with currentPage:", this.currentPage);
        const pages = document.querySelectorAll("#dessertFormContainer .page");

        pages.forEach((page, index) => {
            page.classList.toggle("active", index + 1 === this.currentPage);
        });

        document.getElementById("pageNumber").textContent = `${this.currentPage}/3`;
        document.getElementById("prevButton").disabled = this.currentPage === 1;
        document.getElementById("nextButton").disabled = this.currentPage === 3;
    }
}



