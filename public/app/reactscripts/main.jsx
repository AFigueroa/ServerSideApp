var React = require('react');
var ReactDOM = require('react-dom');

var GroceryItemList = require('./components/grocery/grocerylist.component.jsx');
var groceryItemStore = require('./stores/groceryitem.store.jsx');
var TopMenu = require('./components/topmenu/topmenu.component.jsx');

var DEV_BASE_URL = 'http://localhost:3000/';

var topMenuItems = [
    {
        label: 'Login',
        url:  DEV_BASE_URL + 'Login'
    },
    {
        label: 'Signup',
        url:  DEV_BASE_URL + 'Register'
    }

];

// Get the grocery list items
var groceryItems = groceryItemStore.getItems();

// This function is used to re-render the grocery list after a state change
function renderGroceryList(){

    // Render the app's main view
    ReactDOM.render(<GroceryItemList items={groceryItems}/>, app)

}

// Listener for state change on Grocery List
groceryItemStore.onChange(function(items){

    groceryItems = items;
    renderGroceryList();

});

// Render the page
ReactDOM.render(<TopMenu topMenuItems={topMenuItems} />, topmenu)

renderGroceryList();
