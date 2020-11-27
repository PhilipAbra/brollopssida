export const verifyInput = person => {
  let inError = {}
  Object.keys(person).map(key => {
    if (
      key === 'comment' ||
      key === 'livingArrangement' ||
      key === 'noOfNights' ||
      key === 'foodPreferences' ||
      key === 'fridayDinner'
    ) {
      return
    }

    if (!person[key]) {
      inError = { ...inError, [key]: 'Fyll i fältet' }
    }
  })
  return inError
}

export const hasError = err => Object.keys(err).length !== 0
