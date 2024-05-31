import abstractView from "./abstractView.js";

export default class extends abstractView{
    constructor(){
        super();
        this.setTitle("My Desserts");
    }
    
    // returns displayed HTML content when view is rendered
    async getHtml(){
    }
}
