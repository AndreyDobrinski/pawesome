import React from 'react';
import {HashRouter as Switch,Route} from 'react-router-dom'

import { routes } from './routes'
import { AppHeader } from './cmps/AppHeader'
import '../src/assets/styles/styles.scss'



export class App extends React.Component {
  render(){
    return (
      <main>
          <AppHeader />
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
        </main>
    );
  }
}

// export default App;
