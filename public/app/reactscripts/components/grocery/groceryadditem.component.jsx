// Dependencies
var React = require('react');

// Grocery Item Component
module.exports = React.createClass({
    getInitialState: function(){
        return {
            input:""
        };
        
    },
    handleInputName: function(e){
        
        //To update the state of an object ALWAYS use this.setState()
        this.setState({
            input: e.target.value
        });

    },
    addItem: function(e){
        
        e.preventDefault();
        console.log('Adding Item: ', this.state.input)

    },
    render: function(){
        
        return (

            <form className="container-form grocery-addItem" onSubmit={this.addItem}>

                <div className="input-container">
                    <label>Item Name</label>
                    <input value={this.state.input} placeholder="Add an item" onChange={this.handleInputName}/>
                </div>

                <div className="input-container">
                <input className="submit" type="submit" value="Add"/>
                </div>

            </form>
               

        )
        
    }
})

