console.log('JSX main app has loaded.')
var React = require('react');
var ReactDOM = require('react-dom');

var GroceryItemList = require('./components/grocery/grocerylist.component.jsx');
var TopMenu = require('./components/topmenu/topmenu.component.jsx');

var temporaryArray = [
    {
        name: 'Ice Cream'
    },
    {
        name: 'Waffles'
    },
    {
        name: 'Candy',
        purchased : true
    },
    {
        name: 'Snarks'
    }
    
];

// Render the Top Menu
ReactDOM.render(<TopMenu/>, topmenu)

// Render the app's main view
ReactDOM.render(<GroceryItemList items={temporaryArray}/>, app)
