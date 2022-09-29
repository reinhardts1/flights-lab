import { Flight } from "../models/flight.js"
function index(req, res) {
  Flight.find({})
    .then(flights => {
      res.render('flights/index', {
        flights: flights,
        title: 'All Flights'
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
    })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req, res) {
  Flight.create(req.body)
    .then(flight => {
      res.redirect(`flights/${flight._id}`)
    })
    .catch(err => {
      res.redirect('/flights')
    })
}
function show(req, res) {
  Flight.findById(req.params.id)
    .populate('meals')
    .then(flight => {
      Meal.find({ _id: { $nin: flight.meals } })
        .then(meals => {
          res.render('flights/show', {
            title: 'Flight Detail',
            flight: flight,
            meals: meals
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
}
function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/flights")
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
}
function edit(req, res) {
  console.log("edits work")
  Flight.findById(req.params.id)
    .then(flight => {
      res.render('flights/edit', {
        flight: flight,
        title: "Edit Flight"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
}
function createTicket(req, res) {
  console.log("tickets work")
  Flight.findById(req.params.id)
    .then(flight => {
      flight.tickets.push(req.body)
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`)
        })
    })
}
function update(req, res) {
  console.log("works")
  Flight.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(flight => {
      res.redirect('/flights')
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
}
function deleteTicket(req, res) {
  console.log("delete ticket is working")
  Flight.findById(req.params.id)
    .then(flight => {
      flight.tickets.remove({ id: req.params.ticketId })
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`)
        })
    })
}
function newMeal(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      flight.meals.push(req.body.mealId)
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`)
        })
    })
}


export {
  newFlight as new,
  index,
  create,
  show,
  edit,
  deleteFlight as delete,
  update,
  createTicket,
  deleteTicket,
  newMeal
}