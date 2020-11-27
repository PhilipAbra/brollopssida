import React, { useState } from 'react'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  root: {
    color: '#000000',
    fontFamily: 'BrandonTextBold',
    border: '2px solid #000000',
    cursor: 'pointer',
    padding: '8px',
    fontSize: '14px',
    background: '#ffffff',
    borderRadius: '8px',
    marginBottom: '4px',
    '&:focus': {
      outline: 'none',
    },
  },
  active: {
    background: '#000000',
    color: '#ffffff',
  },
  error: {
    color: 'red',
  },
})

const Button = ({
  label,
  buttonNo,
  activateButton,
  active,
  classes,
  error,
  disabled,
}) => {
  return (
    <React.Fragment>
      <button
        disabled={disabled}
        onClick={activateButton(buttonNo)}
        className={active ? `${classes.root} ${classes.active}` : classes.root}
      >
        {disabled ? 'Tyvärr är alla platser fyllda' : label}
      </button>
      <span className={classes.error}>{error}</span>
    </React.Fragment>
  )
}

export default withStyles(styles)(Button)
