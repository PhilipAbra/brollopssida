import React from 'react'
import { withStyles } from '@material-ui/styles'
import { observer } from 'mobx-react'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    '@media(max-width: 700px)': {
      width: '90%',
    },
  },
  label: {
    color: '#000000',
    fontFamily: 'BrandonTextBold',
    fontSize: '20px',
  },
  input: {
    border: 'none',
    borderBottom: '2px solid #000000',
    fontSize: '20px',
    padding: '6px 0',
    fontFamily: 'BrandonText',
    '&:focus': {
      outline: 'none',
      fontFamily: 'BrandonText',
    },
    '-webkit-border-radius': 0,
  },
  inputError: {
    '&::placeholder': {
      color: 'red',
      fontFamily: 'BrandonTextBold',
    },
  },
  error: {
    color: 'red',
  },
})

const FormInput = ({ classes, label, onChange, value, name }) => (
  <div className={classes.root}>
    <input
      type="text"
      placeholder={label}
      className={
        value.error[name]
          ? `${classes.input} ${classes.inputError}`
          : classes.input
      }
      onChange={onChange}
      value={value[name]}
    />
  </div>
)

export default withStyles(styles)(observer(FormInput))
