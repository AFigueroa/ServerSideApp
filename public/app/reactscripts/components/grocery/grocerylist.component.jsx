// Dependencies
var React = require('react'),
    GroceryItem = require('./groceryitem.component.jsx'),
    GroceryAddItem = require('./groceryadditem.component.jsx'),
    port = '8080',
    socket = io('ws://localhost:' + port);

// Grocery List Component
module.exports = React.createClass({
    componentDidMount() {
        socket.on('new-grocery-item', this._pushGroceryItem);
    },
    _pushGroceryItem: function(item){
        console.log(item);
        var items = this.props.items;

        items.push(item);

        this.setState({
            items: items
        })
    },
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
