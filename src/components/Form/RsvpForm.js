import React, { useState } from 'react'
import FormInput from './FormInput'
import LivingArrangementButtons from './LivingArrangementButtons'
import FormButton from './FormButton'
import { PersonAdd } from '@material-ui/icons'
import { withStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import { observer } from 'mobx-react'

const styles = {
  root: {
    display: props => (props.active ? 'flex' : 'none'),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '75%',
    '@media(max-height: 812px)': {
      height: '90%',
    },
  },
  addAttendee: {
    color: '#000000',
    fontSize: '36px',
    cursor: 'pointer',
  },
  headline: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '70%',
    alignItems: 'center',
    '@media(max-width: 1000px)': {
      width: '90%',
      flexDirection: 'column',
    },
  },
  error: {
    color: 'red',
  },
  iconButton: {
    '@media(max-width: 1000px)': {
      order: -1,
    },
  },
}

const RsvpForm = ({
  classes,
  attendee,
  userStore: {
    updateUser,
    addUser,
    sendForm,
    amountOfPlacesLeft,
    error,
    users,
  },
  index,
  setToggle,
}) => {
  const [errors, setErrors] = useState({})

  const sendFormAndToggle = () => {
    sendForm().then(shouldToggle => {
      if (shouldToggle) {
        setToggle()
      }
    })
  }

  const addUserAndVerify = () => {
    let err = addUser(index)
    if (err) {
      setErrors(err)
    } else {
      setErrors({})
    }
  }

  const updateInput = name => event =>
    updateUser(index, name, event.target.value)

  return (
    <div className={classes.root}>
      {error.message && <span className={classes.error}>{error.message}</span>}
      <FormInput
        label="Namn"
        onChange={updateInput('name')}
        name="name"
        value={attendee}
      />
      <FormInput
        label="Nummer"
        name="number"
        value={attendee}
        onChange={updateInput('number')}
      />
      <FormInput
        label="Mail"
        name="mail"
        onChange={updateInput('mail')}
        value={attendee}
      />
      <FormInput
        label="Matpreferenser"
        name="foodPreferences"
        onChange={updateInput('foodPreferences')}
        value={attendee}
      />
      <LivingArrangementButtons
        disabled={
          amountOfPlacesLeft.amount < 1 ||
          users.length > amountOfPlacesLeft.amount
        }
        onChange={updateInput('livingArrangement')}
        name="livingArrangement"
        label={
          'Önskar du boende till reducerat pris (ordnar du/ni boende själv behövs inget svar på denna fråga)'
        }
        buttonText={`Ja, vi önskar boende till reducerat pris! (Platser kvar ${amountOfPlacesLeft.amount})`}
        value={attendee}
      />
      {attendee.livingArrangement && (
        <FormInput
          label="Antal nätter (0-2)"
          name="noOfNights"
          onChange={updateInput('noOfNights')}
          value={attendee}
        />
      )}
      <LivingArrangementButtons
        onChange={updateInput('fridayDinner')}
        name="fridayDinner"
        label={'Önskar du delta under fredagskvällen?'}
        buttonText={'Jag kommer att delta!'}
        value={attendee}
      />
      <FormInput
        label="Kommentar"
        onChange={updateInput('comment')}
        value={attendee}
        name="comment"
      />
      <div className={classes.headline}>
        <FormButton onClick={sendFormAndToggle} buttonText="RSVP" />
        <IconButton onClick={addUserAndVerify} className={classes.iconButton}>
          <PersonAdd className={classes.addAttendee} />
          <span
            style={{
              fontFamily: 'BrandonText',
              fontSize: '14px',
              marginLeft: '2px',
            }}
          >
            Psst. Är ni flera? lägg till deltagare här.
          </span>
        </IconButton>
      </div>
    </div>
  )
}
export default withStyles(styles)(observer(RsvpForm))
