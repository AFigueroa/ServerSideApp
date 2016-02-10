// Dependencies
var React = require('react');
var action = require('./actions/groceryitem.actions.jsx');

// Grocery Item Component
module.exports = React.createClass({

    // Defines the our View Model
    getInitialState: function () {
        'use strict';

        return {
            input: ""
        };
        
    },

    // This methods updates the state of our input variable as the user types
    handleInputName: function (e) {
        'use strict';
        
        //To update the state of an object ALWAYS use this.setState()
        this.setState({
            input: e.target.value
        });

    },

    // On submit event, this method uses the action to call on the dispatcher and send the value to the server
    addItem: function (e) {
        'use strict';
        
        // Prevent the default behaviour on submit event
        e.preventDefault();

        // Call on the add action and pass it the value of input
        action.add({
            name: this.state.input
        });

        // Reset the input's value to a empty string
        this.setState({
            input: ''
        });

    },
    render: function () {
        'use strict';
        
        return (

            <form className="container-form grocery-addItem" onSubmit={this.addItem}>

                <div className="input-container">
                    <label>Item Name</label>
                    <input value={this.state.input} placeholder="Add an item" onChange={this.handleInputName}/>
                </div>

                <div className="input-container">
                <input className="submit" type="submit" value="Add"/>
                </div>

            </form>

        )
        
    }
})

