import abstractView from "./abstractView.js";

export default class extends abstractView{
    constructor(){
        super();
        this.setTitle("Overview Desserts");
    }

    async getHtml() {
        const storedDesserts = JSON.parse(localStorage.getItem("desserts")) || [];

        // Data Aggregations

        // 1. Total Desserts
        const totalDesserts = storedDesserts.length;

        // 2. Total Spending, REFERENCE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
        const totalSpending = storedDesserts.reduce((sum, dessert) => {
            const price = Number(dessert.price);
            return isNaN(price) ? sum : sum + price; // Skip if price is invalid
        }, 0);

        // 3. Average Price of Desserts 
        const averagePrice = storedDesserts.length === 0
        ? 0
        : (totalSpending/storedDesserts.length).toFixed(2);

        // 4. Unique Stores Visited - Set: Option of unique values, no duplicates
        const uniqueStores = new Set(storedDesserts.map(dessert => dessert.store)).size;

        // 5. Common Flavour Profile
        const flavourCounts = {}; // Object to store the count of each flavour
        storedDesserts.forEach(dessert =>{
            // If flavour exists +1 | if not, intiailise to 1
            flavourCounts[dessert.flavour] = (flavourCounts[dessert.flavour] || 0) + 1;
        });
        // Returns most common flavour
        const mostCommonFlavour = Object.keys(flavourCounts).reduce((a, b) => flavourCounts[a] > flavourCounts[b] ? a : b, "");

        // 6. Different Countires Sampled 
        const countriesSampled = new Set(
            storedDesserts
                .filter(dessert => dessert.country) // Keep only desserts with a country
                .map(dessert => dessert.country.toLowerCase()) // Normalise to lowercase
        ).size;

        // Display Results in HTML
        return `
            <h1>Overview Desserts</h1>
            <p>Total Number of Desserts Tracked: ${totalDesserts}</p>
            <p>Total Spending on Desserts: $${totalSpending}</p>
            <p>Average Price of Desserts: $${averagePrice}</p>
            <p>Unique Stores Visited: ${uniqueStores}</p>
            <p>Most Common Flavour:  ${mostCommonFlavour}</p>
            <p>Countries Sampled: ${countriesSampled}</p>

        `; 
    }
}