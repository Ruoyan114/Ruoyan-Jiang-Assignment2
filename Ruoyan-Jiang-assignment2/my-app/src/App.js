import React, { Component } from 'react';
import './App.css';
import Game from './page/Game/Game';
import Page1 from './page/page1/page'
import Page2 from './page/page2/page2'

import { Route, Routes, Link, } from 'react-router-dom'
class App extends Component {

    render() {

        return (
            <div className="App">
                <h1>Conway's Game of Life</h1>
                <div className='link_box'>
                    <Link className='link' to={'/Game'}>Game</Link>
                    <Link className='link' to={'/Page1'}>Home Page</Link>
                    <Link className='link' to={'/Page2'}>Credits Page</Link>
                </div>
                {/* <Game /> */}
                <Routes>
                    <Route path='/Game' element={<Game />}></Route>

                    <Route path='/Page1' element={<Page1 />}></Route>
                    <Route path='/Page2' element={<Page2 />}></Route>
                </Routes>



            </div>
        );
    }
}

export default App;
