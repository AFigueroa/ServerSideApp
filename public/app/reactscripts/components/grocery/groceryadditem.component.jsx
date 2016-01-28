// Dependencies
var React = require('react');

// Grocery Item Component
module.exports = React.createClass({
    getInitialState: function(){
        return {
            input:""
        };
        
    },
    render: function(){
        
        return (

            <form className="container-form">

                <div className="input-container">
                    <label>Item Name</label>
                    <input value={this.state.input} placeholder="Add an item"/>
                </div>

                <div className="input-container">
                <input className="submit" type="submit" value="Add"/>
                </div>

            </form>
               

        )
        
    }
})

