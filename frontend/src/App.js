import React from 'react';
import {HashRouter as Switch,Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { toggleDarkMode } from './store/actions/appSettingsActions'



import { routes } from './routes'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'

import '../src/assets/styles/styles.scss'



export class _App extends React.Component {
  render(){
    return (
      <main className={`main-app ${this.props.isDarkMode ? 'dark-mode-main-app' : ''}`} >
          <AppHeader />
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </Switch>
          <AppFooter />

          
        </main>
    );
  }
}



const mapStateToProps = state => {
  return {
    isDarkMode: state.appSettingsModule.isDarkMode

  }
}
const mapDispatchToProps = {
  toggleDarkMode
}



export const App = connect(mapStateToProps, mapDispatchToProps)(_App)

// export default App;
