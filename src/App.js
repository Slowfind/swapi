import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Films from './pages/Films'
import People from './pages/People'
import Planets from './pages/Planets'

function App() {
    return (
        <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route exact path="/films/" component={() => <Films />} />
            <Route exact path="/people/" component={() => <People />} />
            <Route exact path="/planets/" component={() => <Planets />} />
        </Switch>
    )
}

export default App
