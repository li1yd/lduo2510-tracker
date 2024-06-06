import home from "./scripts/home.js";
import addDesserts from "./scripts/adddesserts.js";
import myDesserts from "./scripts/mydesserts.js";
import overviewDesserts from "./scripts/overviewdesserts.js"

//REF: Setting up Single Page Architecture: https://www.youtube.com/watch?v=6BozpmSjk-Y
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}


// Client-side router 
const router = async () => {
    // Define each route
    const routes = [

        {path: "/home", view: home}, // home page
        {path: "/myDesserts", view: myDesserts},// my desserts page
        {path: "/myDesserts/overviewDesserts", view: overviewDesserts}, // overview desserts page 
        {path: "/addDesserts", view: addDesserts} // add desserts page
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return{
            route: route,
            isMatch: location.pathname === route.path
        }
    });;

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

    // If the path does not match, default to routes[0] (Home Page)
    if (!match){
        match = {
            route: routes[0],
            isMatch: true
        }
    };

    const view = new match.route.view(); // Creating new instance of view

    // Getting the html from getHTML -> Putting it inside of index.html's "app" element
    document.querySelector("#app").innerHTML = await view.getHtml();

    // Update Pages in Data Entries 
    // Check if the view has a postRender method before calling it
    if (view.postRender && typeof view.postRender === 'function') {
        view.postRender();
    }

    // Manage Link Visibility Based on Current Path
    const path = location.pathname;
    document.getElementById("homeLink").style.display = path === "/home" ? "none" : "block";
    document.getElementById("myDessertsLink").style.display = (path === "/home" ) ? "block" : "none";
    document.getElementById("addDessertsLink").style.display = path === "/home" ? "block" : "none";
    document.getElementById("overviewDessertsLink").style.display = path === "/myDesserts" ? "block" : "none";
};

// When navigating through history, rerun the router
window.addEventListener("popstate", router);

// Disables page-refresh
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {

        if (e.target.matches("[data-link]")){
            e.preventDefault();  // Prevent default link navigation
            navigateTo(e.target.href); // Update content of page dynamically, based on target URL
        }
    });

    if (location.pathname === "/") {
        navigateTo("/home"); // Redirect to the home page
    }
    
    router();
});