import React, { useEffect, useState } from 'react'

import { withStyles } from '@material-ui/styles'

import MainPage from './components/MainPage'
import { Provider } from 'mobx-react'
import stores from './store'

const styles = theme => ({
  root: {
    width: '100vw',
  },
})

const App = ({ classes }) => {
  const [height, setHeight] = useState(window.innerHeight)

  const updateInnerHeight = () => setHeight(window.innerHeight)

  useEffect(() => {
    window.addEventListener('resize', updateInnerHeight)
    return () => {
      window.removeEventListener('resize', updateInnerHeight)
    }
  })
  return (
    <div className={classes.root} style={{ height: height }}>
      <Provider {...stores}>
        <MainPage />
      </Provider>
    </div>
  )
}

export default withStyles(styles)(App)
