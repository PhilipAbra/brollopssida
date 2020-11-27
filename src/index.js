import React from 'react'
import ReactDOM from 'react-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { createBrowserHistory } from 'history'
import App from './App'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Router } from 'react-router-dom'
import './styles/fonts.css'
import { palette } from './constants/theme'

const history = createBrowserHistory()

const muiTheme = createMuiTheme({
  palette: palette,
})

ReactDOM.render(
  <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    <Router history={history}>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('app')
)
