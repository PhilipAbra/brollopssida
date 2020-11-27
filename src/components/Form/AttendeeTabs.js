import React from 'react'
import { withStyles } from '@material-ui/styles'
import { observer } from 'mobx-react'

const styles = {
  root: {
    display: 'flex',
    width: '70%',
    padding: '8px',
    color: '#000000',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '@media(max-width: 700px)': {
      width: '90%',
      height: 'auto',
    },
  },
  tab: {
    borderRight: props => props.amountOfAttendees > 1 && '2px solid #757575',
    marginTop: props => (props.amountOfAttendees > 4 ? '4px' : '0px'),
    '&:last-child': {
      borderRight: 'none',
    },
    textAlign: 'center',
    fontFamily: 'BrandonTextBold',
    fontSize: '16px',
    cursor: 'pointer',
    '@media(min-width: 1100px)': {
      width: props =>
        props.amountOfAttendees > 4
          ? '25%'
          : `${100 / props.amountOfAttendees}%`,
      '&:nth-child(4)': {
        borderRight: 'none',
      },
      '&:nth-child(8)': {
        borderRight: 'none',
      },
    },
    '@media(max-width: 1100px)': {
      '&:nth-child(3)': {
        borderRight: 'none',
      },
      '&:nth-child(6)': {
        borderRight: 'none',
      },
      '&:nth-child(9)': {
        borderRight: 'none',
      },
      width: '33% !important',
    },
  },
  active: {
    fontFamily: 'BrandonText',
  },
  removeAttendee: {
    fontFamily: 'BrandonText',
    fontSize: '12px',
    cursor: 'pointer',
    marginLeft: '12px',
  },
}

const AttendeeTabs = ({
  classes,
  userStore: { users, setActiveUser, activeUser },
}) => {
  return (
    <div className={classes.root}>
      {users.map((attendee, index) => (
        <div className={classes.tab} onClick={setActiveUser(index)}>
          <span
            className={index !== activeUser ? classes.active : ''}
            key={index}
          >
            {attendee.name ? attendee.name.split(' ')[0] : 'Namn'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default withStyles(styles)(observer(AttendeeTabs))
