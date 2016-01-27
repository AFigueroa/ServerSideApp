// Dependencies
var React = require('react');
var GroceryItem = require('./groceryitem.component.jsx');
var GroceryAddItem = require('./groceryadditem.component.jsx');

// Grocery List Component
module.exports = React.createClass({
    render: function(){
        return (
            
            <div>
                <h1>Grocery List</h1>
                
                <div>
                    {this.props.items.map(function(item, index){
                        return(
                            <GroceryItem item={item} key={"item" + index} />
                        )  
                    })}
                </div>
                <GroceryAddItem />
            </div>
    
        )
    }
})