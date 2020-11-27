import React from 'react'
import { withStyles } from '@material-ui/styles'
import RsvpForm from '../Form/RsvpForm'
import { inject, observer } from 'mobx-react'
import { compose } from 'redux'
import AttendeeTabs from '../Form/AttendeeTabs'
import Hv from '../../images/h-v.png'
import IconButton from '@material-ui/core/IconButton'
import { Clear } from '@material-ui/icons'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    boxShadow: '0 1px 6px 0 rgba(32,33,36,0.28)',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    '&:focus': {
      outline: 'none',
    },
  },
  returnButton: {
    display: 'none',
    '@media(max-width: 700px)': {
      display: 'block',
    },
  },
  image: {
    height: '80px',
    '@media(max-height: 812px)': {
      display: 'none',
    },
  },
  closeModal: {
    display: 'none',
    color: '#000000',
    fontSize: '20px',
    fontFamily: 'BrandonText',
    width: '90%',
    height: '5%',
    '@media(max-width: 700px)': {
      display: 'flex',
      flexDirection: 'column',
    },
    '@media(max-height: 700px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  closeModalButton: {
    alignSelf: 'flex-end',
  },
})

const RsvpModal = ({ classes, userStore, setToggle }) => {
  return (
    <div className={classes.root}>
      <img src={Hv} className={classes.image} />
      <div className={classes.closeModal}>
        <IconButton onClick={setToggle} className={classes.closeModalButton}>
          <Clear />
        </IconButton>
      </div>
      {userStore.users.length > 1 && (
        <AttendeeTabs
          userStore={userStore}
          amountOfAttendees={userStore.users.length}
        />
      )}
      {userStore.users.map((attendee, index) => (
        <RsvpForm
          setToggle={setToggle}
          userStore={userStore}
          key={index}
          index={index}
          attendee={attendee}
          active={index === userStore.activeUser}
        />
      ))}
    </div>
  )
}

export default compose(
  inject('userStore'),
  withStyles(styles)
)(observer(RsvpModal))
