var helpers = require('./helpers');
var express = require('express');
var router  = express.Router();
var yaml    = require('js-yaml');
var fs      = require('fs-extra');

schedules = {
  'v2': yaml.safeLoad(fs.readFileSync('./app/views/v2/schedules.yml', 'utf8')),
  'v3': yaml.safeLoad(fs.readFileSync('./app/views/v3/schedules.yml', 'utf8')),
}

content = yaml.safeLoad(fs.readFileSync('./app/views/v4/content.yml', 'utf8'))

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

// v4 routes

router.get('/v4', function (req, res) {
  res.render('v4/overview', {
    order_form: req.session.data,
    content: content.overview,
    supplier_edit: req.query.supplier_edit,
    supplier_signatory_invited: req.query.supplier_signatory_invited
  })
})

router.get('/v4/:page', function (req, res) {
  res.render('v4/base', {
    header: req.params.page,
    page: req.params.page,
    order_form: req.session.data,
    content: content
  })
})

router.post('/v4/:page', function (req, res) {
  page = req.params.page
  req.session.data[`${page}_complete`] = true

  console.log(`*********\n`)
  console.log(req.session.data)
  console.log(`*********\n`)

  let query = ''
  if (page === 'supplier_edit') {
    query = '?supplier_edit=true'
  } else if (page === 'invite_supplier_signatory') {
    query = '?supplier_signatory_invited=true'
  }

  res.redirect(`/v4${query}`)
})

router.get('/v4/add/:type', function (req, res) {
  res.render('v4/base', {
    header: req.params.type,
    page: 'representatives',
    type: req.params.type,
    content: content
  })
})

router.post('/v4/add/:type', function (req, res) {
  let type = req.params.type
  if (req.session.data[type] == undefined) {
    req.session.data[type] = []
  }

  data = req.session.data
  req.session.data[type].push({
    name: data.authorised_name,
    role: data.authorised_role,
    email: data.authorised_email,
    address: data.authorised_address
  })

  console.log(req.session.data)

  if (type.includes('buyer')) {
    path = 'buyer'
  } else if (type.includes('supplier')) {
    path = 'supplier'
  }

  res.redirect(`/v4/${path}`)
})

// v2 and v3 routes

router.get('/:version(v2|v3)/what-is-the-public-sector-contract', function (req, res) {
  res.render(
    `${req.params.version}/what-is-the-public-sector-contract`,
    { schedules: schedules[req.params.version] }
  )
})

router.get('/:version(v2|v3)/contract', function (req, res) {
  if (req.session.data['optionalIncluded'] == undefined) {
    req.session.data['optionalIncluded'] = []
  }

  res.render(
    `${req.params.version}/contract`,
    {
      schedules: schedules[req.params.version],
      optionalIncluded: req.session.data['optionalIncluded'],
      updated: req.query.updated,
      invited: req.query.invited
    }
  )
})

router.post('/:version(v2|v3)/team-members', function (req, res) {
  email = req.session.data['email']
  role = req.session.data['role']

  if (req.session.data['teammembers'] == undefined) {
    req.session.data['teammembers'] = []
  }

  req.session.data['teammembers'].push({
    email: email,
    role: role
  })

  res.redirect(`/${req.params.version}/contract?invited=true`)
})

router.get('/:version(v2|v3)/schedule/:scheduleId', function (req, res) {
  res.render(`${req.params.version}/schedule`, {
    schedule: helpers.findScheduleById(req.params['scheduleId'], req.params.version),
    preview: req.query.preview
  })
})

router.get('/:version(v2|v3)/schedule/:scheduleId/:addOrRemove', function (req, res) {
  res.render(`${req.params.version}/add-remove-schedule`, {
    schedule: helpers.findScheduleById(req.params['scheduleId'], req.params.version),
    addOrRemove: req.params['addOrRemove']
  })
})

router.post('/:version(v2|v3)/schedule/:scheduleId/:addOrRemove', function (req, res) {
  scheduleId = Number(req.params['scheduleId'])
  addOrRemove = req.params['addOrRemove']

  if (req.session.data['optionalIncluded'] == undefined) {
    req.session.data['optionalIncluded'] = []
  }

  if (addOrRemove == 'add') {
    req.session.data['optionalIncluded'].push(scheduleId)
  }

  if (addOrRemove == 'remove') {
    req.session.data['optionalIncluded'].splice(
      req.session.data['optionalIncluded'].indexOf(scheduleId, 1)
    )
  }

  console.log(req.session.data['optionalIncluded'])
  res.redirect(`/${req.params.version}/contract?updated=true`)
})

module.exports = router
