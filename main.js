var express = require('express')
var path = require('path')
const { Datastore } = require('@google-cloud/datastore')

const datastore = new Datastore({
  projectId: 'ageless-domain-135823',
})

var app = express()
let users = []

app.use('/static', express.static(path.resolve(__dirname, 'dist')))
app.use(express.json())

app.post('/api/send-form', (req, res) => {
  let usersWithId = addIdTousers(req.body)

  users = [...users, usersWithId]

  let key = createDatastoreEntry(usersWithId)

  if (!checkLivingArrangements(usersWithId)) {
    res.status(400)
    res.send({ message: 'Tyvärr är alla platser bokade' })
    return
  }

  Promise.all(
    usersWithId.map(user =>
      datastore.save({
        key,
        data: user,
      })
    )
  )
    .then(saved => res.send({ status: 'ok' }))
    .catch(err => {
      console.log(err, ' could not save ', users)
      res.status(500)
      res.send({ message: 'Något gick snett!' })
    })
})

const addIdTousers = data => {
  let id = data[0].number
  return data.map(user => ({ ...user, id }))
}

const checkLivingArrangements = async users => {
  let usersWantingLivingArrangements = users
    .map(user => user.livingArrangement)
    .filter(livingArrangement => livingArrangement).length

  let [amountEntity] = await getAmount()
  let remaining = amountEntity[0].amount - usersWantingLivingArrangements
  if (remaining && remaining > 0) {
    await datastore
      .update({ ...amountEntity[0], amount: remaining })
      .then(_ => _)
      .catch(err => console.log('Unable to update amount of places: ', err))
    return true
  }
  return false
}

const getAmount = async () => {
  let query = datastore.createQuery('maisey', 'Livingarrangement')
  let res = datastore.runQuery(query)
  return await res
}

const createDatastoreEntry = data =>
  datastore.key({ namespace: 'maisey', path: ['Users', data.id] })

app.get('/api/amount', async (req, res) => {
  let [amount] = await getAmount()
  res.send({ amount: amount[0].amount })
})

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen('80')
