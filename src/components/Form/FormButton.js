import React from 'react'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  root: {
    width: '60%',
  },
  submitButton: {
    width: '100%',
    border: '2px solid #000000',
    background: '#ffffff',
    padding: '8px',
    color: '#000000',
    fontFamily: 'BrandonText',
    fontWeight: 'bold',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
  },
})

const FormButton = ({ classes, buttonText, onClick }) => (
  <div className={classes.root}>
    <button type="button" className={classes.submitButton} onClick={onClick}>
      {buttonText}
    </button>
  </div>
)

export default withStyles(styles)(FormButton)
