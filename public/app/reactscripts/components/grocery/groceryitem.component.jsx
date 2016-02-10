// Dependencies
var React = require('react');
var action = require('./actions/groceryitem.actions.jsx');

// Grocery Item Component
module.exports = React.createClass({

    // Delete Grocery Item
    deleteGroceryItem: function (e) {
        'use strict';

        // Disable onSubmit default actions
        e.preventDefault();

        // Call on the actions and ask them to dispatch a delete event for this item
        action.del(this.props.item);

    },

    // Update Grocery Item
    togglePurchased: function (e) {
        'use strict';

        // Disable onSubmit default actions
        e.preventDefault();
        
        // Depending on the state of the item, dispatch an action to buy or unbuy the item
        if (this.props.item.purchased) {

            // Unbuy Event
            action.unbuy(this.props.item);

        } else {

            // Buy event
            action.buy(this.props.item);

        }
    },

    // Render the template
    render: function () {
        'use strict';
        
        return (
            <div className="container-list-item">
            
                <div className={this.props.item.purchased ? "strikethrough" : ""}>
                    {this.props.item.name}
                </div>
                
                <form className="container-list-item-form" onSubmit={this.togglePurchased}>
                    <button className={this.props.item.purchased ? "button-unbuy" : "button-buy"}>
                        {this.props.item.purchased ? "Unbuy" : "Buy"}
                    </button>
                </form>
                
                <form className="container-list-item-form" onSubmit={this.deleteGroceryItem}>
                    <button className="button-danger">&times;</button>
                </form>
                
            </div>
        )
        
    }
})

