console.log('JSX main app has loaded.')
var React = require('react');
var ReactDOM = require('react-dom');

var GroceryItemList = require('./components/grocery/grocerylist.component.jsx');
var TopMenu = require('./components/topmenu/topmenu.component.jsx');

var DEV_BASE_URL = 'http://localhost:3000/';

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

// Render the Top Menu
ReactDOM.render(<TopMenu topMenuItems={topMenuItems} />, topmenu)

// Render the app's main view
ReactDOM.render(<GroceryItemList items={temporaryArray}/>, app)
