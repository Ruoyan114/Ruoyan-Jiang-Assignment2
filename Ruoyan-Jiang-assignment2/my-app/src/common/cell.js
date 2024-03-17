import React, { Component } from 'react'

export default class Cell extends React.Component {

    render() {
        const { x, y, color,CELL_SIZE } = this.props;
        // console.log(this.props);
    
        return (
            <div className="Cell" style={{
                left: `${CELL_SIZE * x + 1}px`,
                top: `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
                background:`${color}`
            }} ></div>
        );
    }
}

