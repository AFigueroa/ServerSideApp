// Dependencies
var React = require('react'),
    GroceryItem = require('./groceryitem.component.jsx'),
    GroceryAddItem = require('./groceryadditem.component.jsx'),
    groceryItemStore = require('./../../stores/groceryitem.store.jsx');

// Grocery List Component
module.exports = React.createClass({

    render: function(){
        return (
        <div className="row">

            <div className="three columns">
            
                <div className="container">

                    <div className="container-header">Grocery List</div>

                    <div className="container-body">

                        <div className = "container-list">
                            {this.props.items.map(function(item, index){
                                return(
                                    <GroceryItem item={item} key={"item" + index} />
                                )
                            })}
                        </div>

                        <GroceryAddItem />
                    </div>

                </div>

            </div>

        </div>

        )
    }
})
