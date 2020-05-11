import React from 'react';
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, Switch } from 'react-router'
import { Redirect} from 'react-router-dom'
import LoginPage from './containers/LoginPage.js';
import HomePage from './containers/HomePage.js';
import SignUpPage from './containers/SignUpPage.js';
import NavBar from './containers/NavBar.js';
import CarouselPage from './components/Carousel';


// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

const ConnectedSwitch = connect(state => ({
  location: state.router.location
}))(Switch)

const App = (props) => {
  return(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <NavBar/>
        <ConnectedSwitch>
          <Route exact path = '/' component = {props.loggedIn?
            CarouselPage : HomePage
          }/>
          <Route path = '/signup' component = {SignUpPage}/>
          <Route path = '/checkMeOut' component = {LoginPage}/>
          <Route path = '/login' component = {LoginPage}/>
          <Route path="/logout"  render={() => (<Redirect to="/"/>)}/>
        </ConnectedSwitch>
      </div>
    </MuiThemeProvider>
  )
}
function mapStateToProps(state) {
  return {
    loggedIn: state.authentication.loggedIn,
    location: state.router.location
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
