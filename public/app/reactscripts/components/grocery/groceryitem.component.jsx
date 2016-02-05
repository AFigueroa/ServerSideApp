// Dependencies
var React = require('react');
var action = require('./actions/groceryitem.actions.jsx');

// Grocery Item Component
module.exports = React.createClass({
    delete: function(e){
        e.preventDefault();
        action.delete(this.props.item);
    },
    render: function(){
        
        return (
            <div className="container-list-item">
                <div className={this.props.item.purchased ? "strikethrough" : ""}>
                    {this.props.item.name}
                </div>
                <form className="container-list-item-delete" onSubmit={this.delete}>
                    <button>&times;</button>
                </form>
            </div>
        )
        
    }
})

