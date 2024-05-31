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
            desserts.forEach(dessert => {
                // Append HTML to dessertsHTML string 
                dessertsHTML +=` 
                <div class"dessert-entry">
                    <p> Dessert Name: ${dessert.dessertName || ""} </p>
                    <p> Price: ${dessert.price || ""} </p>
                    <p> Accompaniments: ${dessert.accompaniments || ""} </p>
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
}
