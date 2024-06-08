import abstractView from "./abstractView.js";

export default class extends abstractView{
    constructor(){
        super();
        this.setTitle("Overview Desserts");
    }

    async getHtml() {
        const storedDesserts = JSON.parse(localStorage.getItem("desserts")) || [];

        // Data Aggregations
        const totalDesserts = this.calculateTotalDesserts(storedDesserts);
        const totalSpending = this.calculateTotalSpending(storedDesserts);
        const averagePrice = this.calculateAveragePrice(totalSpending, totalDesserts);
        const uniqueStores = this.calculateUniqueStores(storedDesserts);
        const mostCommonFlavour = this.calculateMostCommonFlavour(storedDesserts);
        const countriesSampled = this.calculateCountriesSampled(storedDesserts);
        // Display Results in HTML
        return `
        <nav>
            <a href="/myDesserts" class="nav__link" data-link id="backButton">< My Desserts</a> 
        </nav>

        <main>
            <h1>Dessert Dashboard</h1>
            <div class="notebook">
                <div class="spine">
                    <svg width="43" height="457" viewBox="0 0 43 457" fill="none">
                        <path d="M 0 53.5 H 43 M 0 103.5 H 43 M 0 153.5 H 43 M 0 203.5 H 43 M 0 
                        253.5 H 43 M 0 303.5 H 43 M 0 353.5 H 43 M 0 403.5 H 43" 
                        stroke="black" stroke-width="7"/>
                    </svg>
                </div>

                <div class="glide">
                    <div class="glide__track" data-glide-el="track">
                        <ul class="glide__slides">
                            <li class="glide__slide"> <span>${totalDesserts} 🍴</span> <p>Total Number of Desserts Tracked </p></li>
                            <li class="glide__slide"> <span>${totalSpending} 💰</span> <p>Total Spending on Desserts </p></li>
                            <li class="glide__slide"> <span> ${averagePrice} 💵</span> <p>Average Price of Desserts </p></li>
                            <li class="glide__slide"> <span> ${uniqueStores} 🛒</span> <p>Unique Stores Visited </p></li>
                            <li class="glide__slide"> <span id="flavourText"> ${mostCommonFlavour} 👅</span> <p> Most Common Flavour </p></li>
                            <li class="glide__slide"> <span> ${countriesSampled} 🌏</span> <p>Countries Sampled </p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
        `; 
    }
    async postRender() {
        const glideOptions = {
            type: 'carousel',
            perView: 4.5,
            gap: 20,
            breakpoints: {
                768: {
                    perView: 1.5 // Show one slide at a time on mobile
                }
            },
            autoplay: 3000
        };
        new Glide('.glide', glideOptions).mount();
    }

    // 1. Total Desserts - return length of array
    calculateTotalDesserts(desserts) {
        return desserts.length;
    }

    // 2. Total Spending REFERENCE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    calculateTotalSpending(desserts) {
        return desserts.reduce((sum, dessert) => {
            const price = Number(dessert.price);
            return isNaN(price) ? sum : sum + price;
        }, 0);
    }

    // 3. Average Price of Desserts 
    calculateAveragePrice(totalSpending, totalDesserts) {
        return totalDesserts === 0 ? 0 : (totalSpending / totalDesserts).toFixed(2);
    }

    // 4. Unique Stores Visited - Set: Option of unique values, no duplicates
    calculateUniqueStores(desserts) {
        const uniqueStores = new Set(
            desserts
                .filter(dessert => dessert.store && dessert.store.trim() !== "")
                .map(dessert => dessert.store)
        );
        return uniqueStores.size;
    }

    // 5. Common Flavour Profile
    calculateMostCommonFlavour(desserts) {
        const flavourCounts = {};
        desserts.forEach(dessert => {
            if (dessert.flavour) {
                flavourCounts[dessert.flavour] = (flavourCounts[dessert.flavour] || 0) + 1;
            }
        });

        return Object.keys(flavourCounts).length > 0
            ? Object.keys(flavourCounts).reduce((a, b) => flavourCounts[a] > flavourCounts[b] ? a : b)
            : "N/A";
    }

     // 6. Different Countires Sampled 
    calculateCountriesSampled(desserts) {
        const countriesSampled = new Set(
            desserts
                .filter(dessert => dessert.country)
                .map(dessert => dessert.country.toLowerCase())
        );
        return countriesSampled.size;
    }
}
