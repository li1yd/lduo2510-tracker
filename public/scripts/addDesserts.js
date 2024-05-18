import abstractView from "./abstractView.js";

export default class extends abstractView{
    constructor(){
        super();
        this.setTitle("Add Desserts");
    }

    async getHtml(){
        return `
            <h1> Add Desserts</h1>
            <p> This is where you add desserts! </p>
        `;
    }
}