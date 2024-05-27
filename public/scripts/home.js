import abstractView from "./abstractView.js";

export default class extends abstractView{
    constructor(){
        super();
        this.setTitle("Home");
    }

    // returns displayed HTML content when view is rendered
    async getHtml(){
        return `
            <h1> Welcome back </h1>
            <p> A web application to track your sweet palate - documented with desserts from around the world!  </p>
        `;
    }
}