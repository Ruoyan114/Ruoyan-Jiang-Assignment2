import React, { Component } from 'react'

export default class page extends Component {
    render() {
        return (
            <div>
                <p>Conway’s Game of Life is an intriguing simulation that takes place on a grid system,
                    where each spot on the grid represents a cell that can either be alive or dead.
                    The simulation unfolds over generations, with the fate of each cell at each generation
                    being determined by its neighboring cells.It's not a game you win or lose;
                    it's about watching a little world of squares change and grow!</p>
                <p>Here are the basic rules that guide the game:</p>

                <p><b>If a living cell is surrounded by fewer than two living neighbors, it dies as if by solitude.</b></p>
                <p><b>A living cell with two or three living neighbors continues to live into the next generation.</b></p>
                <p><b>If a living cell is surrounded by more than three living neighbors, it dies as if by overcrowding.</b></p>
                <p><b>A dead cell with exactly three living neighbors will come to life, as if by reproduction.</b></p>

                <p>As a player, you don’t actively control the cells; you set the initial configuration and then watch as the community evolves according to these rules.</p>
            </div>
        )
    }
}
