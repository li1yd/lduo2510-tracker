// abstractView provides common functionality for all views in the application 

export default class{
    constructor(){

    }

    // Updates page title 
    setTitle(title){
        document.title = title;
    }

    async getHtml(){
        return "";
    }
}