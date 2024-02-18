import {useState} from 'react'
import classes from './App.module.scss'
import {Link, Outlet} from "react-router-dom";
import shrek from '@/asset/shrek.jpg'
import reset from '@/asset/reset.png'
import Loader from '@/asset/Loader.svg'
export const App = () => {
    const [counter, setCounter] = useState(0)

    // if(__PLATFROM__ === 'desktop'){
    //     return <div>ISDESKTOP</div>
    // }
    //
    // if(__PLATFROM__ === 'mobile'){
    //     return <div>ISMOBILE</div>
    // }

    const increment = () => setCounter(prev => prev + 1)
    return(
        <div>
            <h1 data-testid="App.testid-h1">PLATFORM={__PLATFROM__}</h1>
            <div>
                <img style={{width: 20, height: 20}} src={shrek} alt=''/>
                <img style={{width: 20, height: 20}} src={reset} alt=''/>
            </div>
            <div>
                <Loader />
            </div>
            <div style={{display: 'flex', gap: 5}}>
                <Link to='/'>main</Link>
                <Link to='/about'>about</Link>
                <Link to='/shop'>shop</Link>
            </div>
            Hello world!
            <div>{counter}</div>
            <button className={classes.button} onClick={increment}>+</button>
            <Outlet />
        </div>
    )
}
