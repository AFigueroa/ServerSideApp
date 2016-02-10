// Dependencies
var React = require('react'),
    GroceryItem = require('./groceryitem.component.jsx'),
    GroceryAddItem = require('./groceryadditem.component.jsx'),
    port = '8080',
    socket = io('ws://localhost:' + port);

// Grocery List Component
module.exports = React.createClass({

    // Runs on before the template is render
    componentDidMount( ) {

        // Activate socket listener for new items
        socket.on('new-grocery-item', this._pushGroceryItem);

    },

    // Updates the state of our items on a socket new-grocery-item event
    _pushGroceryItem: function (item) {

        // Dependencies
        var items = this.props.items,
            itemsLength = items.length,
            index=0;

        // Check if this receptor is the sender of the new item, in which case do not update the state
        for(index; index < itemsLength; index++){

            // Do id's match?
            if(items[index].id == item.id){

                // Do not insert
                return;
            }
        };

        // No Duplicates...

        // Push the item to the representative array
        items.push(item);

        // Update the state of items to be our representative array
        this.setState({
            items: items
        });

    },

    // Render the template
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
