// Dependencies
var React = require('react');

var MenuItem = require('./topmenuitem.component.jsx');

// Top Menu Component
module.exports = React.createClass({
    getInitialState: function() {
        return {
            visible: false
        };
    },
    toggleTopMenu: function(){

         $( "#top-menu-items-container" ).toggleClass( "visible" );

    },
    render: function(){
        return (

        <div className="top-menu-container">
            <div className="logo-container">
                <a href="/">
                    <img src="./app/images/logo-tb.png" alt="Syne-U Logo"/>
                </a>
            </div>

            <div className="top-menu-slogan">
                Be Awesome
            </div>

            <div className="toggle-menu-icon" onClick={this.toggleTopMenu}>
                <i className="fa fa-bars"></i>
            </div>

            <div id="top-menu-items-container" className={this.state.visible ? "visible " : ""}>
                {this.props.topMenuItems.map(function(item, index){
                    return(
                        <MenuItem item={item} key={"item" + index}/>
                    )
                })}
            </div>
        </div>

        )
    }
})
