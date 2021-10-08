import React, { Component } from 'react';

class Color extends Component {

    state = {

    };
    handleChange = (event) => {

        const reader = new FileReader();

        reader.addEventListener('load', function(){
            console.log(this.result)
        });

    };

    render(){

        return (
            <div className='bg-gray-200 h-screen flex bg-gray-bg1'>
                <input type="file" onChange={this.handleChange} />
            </div>
        );
    }
    
};

export default Color;