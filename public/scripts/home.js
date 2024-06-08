import abstractView from "./abstractView.js";
import logo from '../src/images/logo.png';

export default class extends abstractView{
    constructor(){
        super();
        this.setTitle("Home");
    }

    // returns displayed HTML content when view is rendered
    async getHtml(){
        return `
        <div id="homeContainer" class="container">
            <div class="row">
                <img src="${logo}" alt="Logo" id="logo">
                <body>
                    <p> A web application to track your sweet palate! Begin by clicking ‘+’ 
                    to add a new Dessert Entry. Then, view them in My Desserts! </p>
                </body>
            </div>
        </div>
        `;
    }
}