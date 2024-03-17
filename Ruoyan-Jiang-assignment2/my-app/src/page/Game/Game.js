import React from 'react';
import './Game.css';
import Cell from '../../common/cell';
let CELL_SIZE = 20;
let WIDTH = 400;
let HEIGHT = 400;
let NewCELL_SIZE = 20;




class Game extends React.Component {

    constructor() {
        super();
     

        this.board = this.makeEmptyBoard();
    }

    state = {
        cells: [],
        isRunning: false,
        interval: 1000,
        rowsList: 20,
        colsList:20,
        change: '1',
        isShow: false,
        iscolor: false,
        rows : HEIGHT / CELL_SIZE,
        cols : WIDTH / CELL_SIZE,

    }

    makeEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.state.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.state.cols; x++) {
                board[y][x] = false;
            }
        }

        return board;
    }

    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    makeCells() {
        let cells = [];
        for (let y = 0; y < this.state.rows; y++) {
            for (let x = 0; x < this.state.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }

        return cells;
    }

    handleClick = (event) => {
        
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);
        console.log(x, y);
        // console.log(offsetX, offsetY);
      
        if (x >= 0 && x <= this.state.cols && y >= 0 && y <= this.state.rows) {
            this.board[y][x] = !this.board[y][x];
        }
      
        this.setState({ cells: this.makeCells() });
          console.log(this.state);
    }

    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }

    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    runIteration() {
        let newBoard = this.makeEmptyBoard();

        for (let y = 0; y < this.state.rows; y++) {
            for (let x = 0; x < this.state.cols; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ cells: this.makeCells() });

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }

    /**
     * Calculate the number of neighbors at point (x, y)
     * @param {Array} board 
     * @param {int} x 
     * @param {int} y 
     */
    calculateNeighbors(board, x, y) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.state.cols && y1 >= 0 && y1 < this.state.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }

   

    handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells() });
    }


    handleRowsChange = (event) => {
        
        console.log(CELL_SIZE);
        let num = event.target.value
        if (num < 3 || num > 40) {
            this.setState({ isShow: true })
            setTimeout(() => {
              this.setState({ isShow: false })  
            },1500)
             return
        }
      
        this.setState({ rowsList: num });
        
    }
    handleColsChange=(event)=>{
         let num = event.target.value
        if (num < 3 || num > 40) {
            this.setState({ isShow: true })
            setTimeout(() => {
              this.setState({ isShow: false })  
            },1500)
             return
        }
    //    CELL_SIZE =NewCELL_SIZE
         this.setState({ colsList: num });
    }
    handleSubmit =  () => {
        const { rowsList, colsList } = this.state
        WIDTH = CELL_SIZE * rowsList
        HEIGHT = CELL_SIZE * colsList
        if (rowsList <= 5||colsList<=5) {
           CELL_SIZE=70
            WIDTH = CELL_SIZE * rowsList  
            HEIGHT = CELL_SIZE * colsList 
        } else if (rowsList < 10||colsList< 10) {
            CELL_SIZE=40
            WIDTH = CELL_SIZE * rowsList    
            HEIGHT = CELL_SIZE * colsList 
             
        }else if (rowsList > 20||colsList> 20) {
            CELL_SIZE=10
            WIDTH = CELL_SIZE * rowsList    
            HEIGHT = CELL_SIZE * colsList 
             
        }
        else {
            CELL_SIZE=NewCELL_SIZE
             WIDTH = CELL_SIZE * rowsList
        HEIGHT = CELL_SIZE * colsList
        }
      
      
        this.setState({ change: '1', rows: HEIGHT / CELL_SIZE, cols: WIDTH / CELL_SIZE }, () => {
            this.board = this.makeEmptyBoard();
              console.log(this.board);
        })
     
    }
    render() {
        const { cells, interval, isRunning ,rowsList,colsList,isShow,iscolor} = this.state;
        return (
            <div className='Game'>
                 rows: <input value={rowsList} type='number' onChange={this.handleRowsChange} /> &nbsp;
                    cols: <input value={colsList} type='number' onChange={this.handleColsChange} />
                <button className="button" onClick={this.handleSubmit}>Submit</button><br /><br />
                Count:{cells.length}
                <br /><br />
                <div className="Board"
                    style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}>

                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} color={iscolor?'linear-gradient(to right, red, yellow)':'#ccc'} CELL_SIZE ={CELL_SIZE}></Cell>
                    ))}
                </div>

                <div className="controls">
                     {iscolor ?
                        <button className="button" onClick={()=>this.setState({iscolor:!this.state.iscolor})}>normal</button> :
                        <button className="button" onClick={()=>this.setState({iscolor:!this.state.iscolor})}>Heatmap</button>
                    }
                   
                  
                    {isRunning ?
                        <button className="button" onClick={this.stopGame}>Stop</button> :
                        <button className="button" onClick={this.runGame}>Run</button>
                    }
                   
                    <button className="button" onClick={this.handleClear}>Clear</button>
                </div>
                {
                     isShow? <div className='module'>
The range of height and width should be 3-40, please re-enter
                </div>:''
              }
            </div>
        );
    }
}


export default Game;