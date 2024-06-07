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

// ...other parts of the code

async getHtml() {
  return `
  <main>
      <h1>My Desserts</h1>

      <div id="dessertEntryContainer" class="container mb-5">
        <div class="row"> 
          <div class="col-sm-12 mb-4">
            <h2> 🥞 🍰 🍦 </h2>
            <h2 class="p-2"> Your Menu </h2>
              <h3> - Desserts - </h3>
              <p id="myDessertsParagraph">  Review all the delicious desserts you've logged, and indulged in previously! </p>
          </div>


          <!-- ACCORDION ITEMS --> 
          <div class="col-sm-12">
            <h4 id="dessertEntriesTitle"> Your Dessert Entries </h4>

            <div class="button-container"> 
              <a href="/myDesserts/overviewDesserts" id="overviewButton" class="nav__link" data-link> Dessert Dashboard 📝</a> 
            </div>
            
            <div class="accordion" id="dessertAccordion">
              ${this.generateDessertsHTML()}
            </div>

          </div>
        </div>
      </div>
  </main>
  `;
}

generateDessertsHTML() {
  if (this.desserts.length === 0) {
      return `
      <div class="row d-flex flex-column justify-content-center align-items-center">
          <p>Hmm, looks like your dessert log is a little hungry.  Time to feed it some sweet memories!</p>
      </div>
      `;
  } else {
      return this.desserts.map((dessert, index) => `
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-heading${index}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">
            <span class="priceDisplay">$${dessert.price}</span>
            ${dessert.image ? `<img src="${dessert.image}" alt="Dessert Image" width="150" />` : ""}
            Dessert Name: ${dessert.dessertName}   
          </button>
        </h2>

        <div id="collapse${index}" class="accordion-collapse collapse">
            <div class="accordion-body">
              <p> Accompaniments: ${dessert.accompaniments || ""} </p>
              <p> Store: ${dessert.store ||""}</p>
              <p> Date Purchased: ${dessert.datePurchased ||""}</p>
              <p> Dessert Type: ${dessert.dessertType ||""}</p>
              <p> Flavour: ${dessert.flavour ||""}</p>
              <p> Acquisition Method: ${dessert.acquisition ||""}</p>
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
              accordion.innerHTML = "<p>No data entries available! </p>";
            }
      
            // Update the desserts array and local storage
            this.desserts.splice(indexToRemove, 1);
            console.log(this.desserts)
            localStorage.setItem("desserts", JSON.stringify(this.desserts));
          });
        });
        
    }
}

