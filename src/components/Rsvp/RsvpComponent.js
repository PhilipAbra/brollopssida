import React, { useEffect, useRef } from 'react'
import { withStyles } from '@material-ui/styles'
import RsvpModal from './RsvpModal'

const styles = theme => ({
  root: {
    position: 'absolute',
    top: '0%',
    left: '0%',
    height: '100%',
    width: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'auto',
    minHeight: '700px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    height: '90%',
    width: '45%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media(max-width: 1200px)': {
      width: '65%',
    },
    '@media(max-width: 700px), (max-height: 700px)': {
      width: '100%',
      height: '100%',
    },
  },
})

const RsvpComponent = ({ classes, toggle, setToggle }) => {
  const content = useRef()
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  const handleClickOutside = event => {
    if (event.target === content.current) {
      setToggle()
    }
  }

  return (
    <div className={classes.root} ref={content}>
      <div className={classes.content}>
        <RsvpModal toggle={toggle} setToggle={setToggle} />
      </div>
    </div>
  )
}
export default withStyles(styles)(RsvpComponent)
