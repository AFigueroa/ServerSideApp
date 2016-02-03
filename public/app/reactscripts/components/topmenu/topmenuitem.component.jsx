// Dependencies
var React = require('react');

// Top Menu Item Component
module.exports = React.createClass({

    render: function(){

        return (
        <a href={this.props.item.url}>
            <div className="top-menu-item">


                    {this.props.item.label}


            </div>
        </a>
        )

    }
})
