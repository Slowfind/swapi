import React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
    Home,
    Films,
    People,
    Planets,
    Vehicles,
    Starships,
    Species,
} from './pages/index'

function App() {
    return (
        <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route exact path="/films/" component={() => <Films />} />
            <Route exact path="/people/" component={() => <People />} />
            <Route exact path="/planets/" component={() => <Planets />} />
            <Route exact path="/vehicles/" component={() => <Vehicles />} />
            <Route exact path="/starships/" component={() => <Starships />} />
            <Route exact path="/species/" component={() => <Species />} />
        </Switch>
    )
}

export default App
