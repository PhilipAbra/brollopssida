import { action, observable } from 'mobx'
import { hasError, verifyInput } from '../util/util'

class UserStore {
  @observable users = [
    {
      name: '',
      mail: '',
      number: '',
      foodPreferences: '',
      livingArrangement: '',
      noOfNights: '',
      comment: '',
      fridayDinner: '',
      error: {},
    },
  ]
  @observable activeUser = 0
  @observable gifActive = false
  @observable amountOfPlacesLeft = 0
  @observable error = { inError: false, message: '' }

  constructor() {
    this.getAmountOfPlaces()
  }

  @action addUser = () => {
    this.users = this.verifyInput()
    if (this.anyUsersHasError()) {
      this.setActiveUser(this.users.findIndex(user => hasError(user.error)))()
      return
    }

    this.users = [
      ...this.users.map(user => this.filterEmptyValues({ ...user })),
      {
        name: '',
        mail: '',
        number: '',
        foodPreferences: '',
        livingArrangement: '',
        noOfNights: '',
        comment: '',
        fridayDinner: '',
        error: {},
      },
    ]

    this.activeUser = this.users.length - 1
  }

  verifyInput = () =>
    this.users.map(user => ({ ...user, error: verifyInput(user) }))

  @action setActiveUser = index => () => (this.activeUser = index)

  @action updateUser = (index, field, value) => {
    this.users[index][field] = value
  }

  @action sendForm = () => {
    this.users = this.verifyInput()

    if (this.anyUsersHasError()) {
      this.setActiveUser(this.users.findIndex(user => hasError(user.error)))()
      return new Promise((reject, resolve) => reject(false))
    }

    return fetch('/api/send-form', {
      method: 'POST',
      body: JSON.stringify(
        this.users.map(user =>
          this.filterEmptyValues({ ...user, error: undefined })
        )
      ),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        this.resetState()
        this.gifActive = true
        setTimeout(() => {
          this.gifActive = false
        }, 10000)
        return true
      })
      .catch(err => {
        this.error = {
          inError: true,
          message: err.message ? err.message : 'Något gick snett',
        }
        return false
      })
  }

  @action getAmountOfPlaces = () =>
    fetch('/api/amount')
      .then(res => res.json())
      .then(data => (this.amountOfPlacesLeft = data))

  @action resetState = () => {
    this.users = [
      {
        name: '',
        mail: '',
        number: '',
        foodPreferences: '',
        livingArrangement: '',
        noOfNights: '',
        comment: '',
        fridayDinner: '',
        error: {},
      },
    ]
    this.activeUser = 0
    this.error = { inError: false, message: '' }
    this.getAmountOfPlaces()
  }

  filterEmptyValues = user => {
    let obj = {}
    Object.keys(user)
      .filter(key => user[key])
      .map(key => {
        obj = {
          ...obj,
          [key]: user[key],
        }
      })
    return obj
  }

  anyUsersHasError = () => this.users.some(user => hasError(user.error))
}

export default new UserStore()
