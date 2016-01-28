// Dependencies
var React = require('react');

// Grocery Item Component
module.exports = React.createClass({
    render: function(){
        
        return (
            <div className="container-list-item">
                {this.props.item.name}
            </div>
        )
        
    }
})

