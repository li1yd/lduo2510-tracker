import abstractView from "./abstractView.js";

export default class extends abstractView{
    constructor(){
        super();
        this.setTitle("My Desserts");
        this.desserts = this.loadDesserts();
    }
    
    loadDesserts(){
        const storedData = localStorage.getItem("desserts");
        try {
            return JSON.parse(storedData) || [];
        } catch (error) {
            console.error("Error loading desserts:", error);
            return [];
        }
    }

    async getHtml() {
        return `
          <main>
            <h1>My Desserts</h1>
            <div class="accordion" id="dessertAccordion">
              ${this.generateDessertsHTML()}
            </div>
          </main>
        `;
      }
    
      generateDessertsHTML() {
        if (this.desserts.length === 0) {
            console.log("No More")
          return "<p>No data entries available!</p>";
        }else{
            return this.desserts.map((dessert, index) => `
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">
                  Dessert Name: ${dessert.dessertName} why $${dessert.price}
                </button>
              </h2>
              
              <div id="collapse${index}" class="accordion-collapse collapse">
                <div class="accordion-body">

                  <!-- DATA ENTRY FROM PAGES 1 -->
                  <p> Dessert Name: ${dessert.dessertName || ""} </p>
                  <p> Price: ${dessert.price || ""} </p>
                  <p> Accompaniments: ${dessert.accompaniments || ""} </p>
                  ${dessert.image ? `<img src="${dessert.image}" alt="Dessert Image" width="150" />` : ""} 

                  <!-- DATA ENTRY FROM PAGES 2 -->
                  <p> Store: ${dessert.store ||""}</p>
                  <p> Date Purchased: ${dessert.datePurchased ||""}</p>
                  <p> Dessert Type: ${dessert.dessertType ||""}</p>
                  <p> Flavour: ${dessert.flavour ||""}</p>
                  <p> Acquisition Method: ${dessert.acquisition ||""}</p>

                  <!-- DATA ENTRY FROM PAGES 3 -->
                  <p> Country: ${dessert.country ||""}</p>
                  <p> Rating: ${dessert.rating ||""}</p>

                  <button class="remove-button" data-index="${index}">Remove</button> 
                </div>
              </div>
            </div>
          `).join('');
        }
      }

      async postRender() {
        const removeButtons = document.querySelectorAll('.remove-button');
        const accordion = document.querySelector('.accordion');
      
        removeButtons.forEach(button => {
          button.addEventListener('click', () => {
            const accordionItem = button.closest('.accordion-item');
            const indexToRemove = parseInt(accordionItem.dataset.index, 10);
      
            accordionItem.remove(); // Remove the item
      
            // Check if empty and update message
            if (accordion.children.length === 0) {
              accordion.innerHTML = "<p>No data entries available!</p>";
            }
      
            // Update the desserts array and local storage
            this.desserts.splice(indexToRemove, 1);
            console.log(this.desserts)
            localStorage.setItem("desserts", JSON.stringify(this.desserts));
          });
        });
    }
}

