import React, { useState } from 'react'
import { withStyles } from '@material-ui/styles'
import Background from '../images/vackra-personer.jpg'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import RsvpComponent from './Rsvp/RsvpComponent'
import MainLogo from '../images/h-v-date.png'
import { compose } from 'redux'
import { inject, observer } from 'mobx-react'
import Gif from '../images/weddin-party.gif'

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    background: `url(${Background}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    color: '#ffffff',
    '@media(max-width: 700px)': {
      background: `#D6bac2`,
    },
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))',
    '@media(max-width: 700px)': {
      background: 'none',
    },
  },
  rsvp: {
    fontSize: '21px',
    fontWeight: 200,
    letterSpacing: '6px',
    textAlign: 'center',
  },
  rsvpArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  hvDate: {
    height: '40%',
    width: '287px',
  },
  icon: {
    fontSize: '38px',
  },
  gif: {
    position: 'fixed',
    height: '45%',
    width: '40%',
    '@media(max-width: 1000px)': {
      width: '70%',
      height: '35%',
    },
  },
  mainLogo: {
    height: 440,
    width: 380,
    marginBottom: '40px',
    '@media(max-width: 380px)': {
      width: '100%',
      height: 'auto',
      marginBottom: '0px',
    },
  },
})

const MainPage = ({ classes, userStore }) => {
  const [toggleRsvp, setToggleRsvp] = useState(false)

  const toggle = () => {
    setToggleRsvp(!toggleRsvp)
  }

  return (
    <div className={classes.root}>
      <div className={classes.imageWrapper}>
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={MainLogo} className={classes.mainLogo} />
        </div>
        <div className={classes.rsvpArea} onClick={toggle}>
          <span className={classes.rsvp}>
            HANNA SA JA!
            <br />
            NU ÄR DET DIN TUR
          </span>
          <KeyboardArrowDown className={classes.icon} />
        </div>
      </div>
      {toggleRsvp && <RsvpComponent toggle={toggleRsvp} setToggle={toggle} />}
      {userStore.gifActive && (
        <div
          style={{
            position: 'fixed',
            top: '0%',
            left: '0%',
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={Gif} className={classes.gif} />
        </div>
      )}
    </div>
  )
}

export default compose(
  inject('userStore'),
  withStyles(styles)
)(observer(MainPage))
