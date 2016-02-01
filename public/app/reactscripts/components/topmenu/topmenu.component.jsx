// Dependencies
var React = require('react');

var MenuItem = require('./topmenuitem.component.jsx');

// Top Menu Component
module.exports = React.createClass({
    render: function(){
        return (

        <div>
            <div className="logo-container">
            <a href="#">
                <img src="./app/images/logo.png" alt="Syne-U Logo" height="65" width="65"/>
            </a>
            </div>
            <MenuItem />
        </div>

        )
    }
})
