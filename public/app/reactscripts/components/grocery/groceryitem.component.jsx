// Dependencies
var React = require('react');
var action = require('./actions/groceryitem.actions.jsx');

// Grocery Item Component
module.exports = React.createClass({
    delete: function(e){
        e.preventDefault();
        action.delete(this.props.item);
    },
    togglePurchased: function(e){
        e.preventDefault();
        
        if(this.props.item.purchased){
            action.unbuy(this.props.item);
        }else{
            action.buy(this.props.item);
        }
    },
    render: function(){
        
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
                
                <form className="container-list-item-form" onSubmit={this.delete}>
                    <button className="button-danger">&times;</button>
                </form>
                
            </div>
        )
        
    }
})

