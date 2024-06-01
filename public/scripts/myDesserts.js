import abstractView from "./abstractView.js";

export default class extends abstractView{
    constructor(){
        super();
        this.setTitle("My Desserts");
    }
    
    // returns displayed HTML content when view is rendered
    async getHtml(){

        // Fetch data from localStorage
        const storedData = localStorage.getItem("desserts");

        
        if(storedData){
            const desserts = JSON.parse(storedData);
            let dessertsHTML = ""; // Process Data into Displayable HTML 

            // Iterate over array of dessert objects 
            desserts.forEach((dessert, index) => { 

                // Append HTML to dessertsHTML string 
                dessertsHTML += `
                  <div class="dessert-entry"> 
                    <p> Dessert Name: ${dessert.dessertName || ""} </p>
                    <p> Price: ${dessert.price || ""} </p>
                    <p> Accompaniments: ${dessert.accompaniments || ""} </p>
                    ${dessert.image ? `<img src="${dessert.image}" alt="Dessert Image" width="150" />` : ""}
                    <button class="remove-button" data-index="${index}">Remove</button> 
                  </div>
                `;
              });

            return `
            <main>
                <h1> My Desserts </h1>
                <div id="dessertEntries">
                    ${dessertsHTML}
                </div>
            </main>
            `
        }else{
            return `
            <h1> My Desserts </h1>
            <p> No data entries available! </p>
            `
        } 
    }

    // Function to handle removal of dessert entries 
    async postRender(){
        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button =>{
            button.addEventListener('click', () =>{
                const indexToRemove = button.dataset.index;

                // Update localStorage
                const storedData = localStorage.getItem("desserts");
                const desserts = JSON.parse(storedData);
                desserts.splice(indexToRemove, 1);
                localStorage.setItem("desserts", JSON.stringify(desserts));

                // Update the displayed entries 
                this.getHtml().then(html =>{
                    document.querySelector('main').innerHTML = html;
                    this.posstRender();
                });
            });
        });
    }
}
