import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles'
import Button from './Button'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    justifyContent: 'space-evenly',
    '@media(max-width: 700px)': {
      width: '90%',
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    color: '#757575',
    fontFamily: 'BrandonText',
    fontSize: '16px',
  },
}

const LivingArrangementButtons = ({
  classes,
  name,
  onChange,
  label,
  buttonText,
  error,
  disabled,
  value,
}) => {
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (value[name]) {
      setActive(0)
    }
  }, [])

  const activateButton = buttonNo => () => {
    if (buttonNo === active) {
      onChange({
        target: {
          value: '',
        },
      })
      setActive(-1)
      return
    }

    onChange({
      target: {
        value: 'Jag kommer',
      },
    })
    setActive(buttonNo)
  }
  return (
    <div className={classes.root}>
      <label className={classes.label}>{label}</label>
      <div className={classes.buttons}>
        <Button
          disabled={disabled}
          activateButton={activateButton}
          buttonNo={0}
          active={active === 0}
          label={buttonText}
          error={value.error[name]}
        />
      </div>
    </div>
  )
}

export default withStyles(styles)(LivingArrangementButtons)
