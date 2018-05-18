var express = require('express');
var router  = express.Router();
var yaml    = require('js-yaml');
var fs      = require('fs-extra');

schedules = {
  'v2': yaml.safeLoad(fs.readFileSync('./app/views/v2/schedules.yml', 'utf8')),
  'v3': yaml.safeLoad(fs.readFileSync('./app/views/v3/schedules.yml', 'utf8')),
}

content = yaml.safeLoad(fs.readFileSync('./app/views/v4/content.yml', 'utf8'))

function findScheduleById(scheduleId, version) {
  return schedules[version].find(function(sch) { return sch.id == scheduleId })
}

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

// v4 routes

router.get('/v4', function (req, res) {
  if (req.session.data.order_form == undefined) {
    req.session.data.order_form = {}
  }

  res.render('v4/overview', {
    order_form: req.session.data.order_form,
    content: content.overview,
    supplier_edit: req.query.supplier_edit,
    supplier_signatory_invited: req.query.supplier_signatory_invited
  })
})

router.get('/v4/contract_details', function (req, res) {
  res.render('v4/contract_details', {
    order_form: req.session.data.order_form,
    content: content
  })
})

router.post('/v4/contract_details', function (req, res) {
  if (req.session.data.order_form == undefined) {
    req.session.data.order_form = {}
  }

  data = req.session.data
  req.session.data.order_form.contract_details = {
    reference_number: data.reference_number,
    start_date: data.start_date,
    end_date: data.end_date,
    progress_report: data.progress_report,
    progress_frequency: data.progress_frequency,
    what: data.what,
    call_off_charges: data.call_off_charges,
    liability: data.liability,
    special_terms: data.special_terms,
    guarantee: data.guarantee,
    expenses: data.expenses,
    services_credits: data.service_credits,
    payment: data.payment,
    complete: true
  }

  console.log(req.session.data.order_form)

  res.redirect('/v4')
})

router.get('/v4/buyer', function (req, res) {
  if (req.session.data.order_form == undefined) {
    req.session.data.order_form = {}
  }

  res.render('v4/buyer', {
    order_form: req.session.data.order_form,
    content: content
  })
})

router.post('/v4/buyer', function (req, res) {
  if (req.session.data.order_form == undefined) {
    req.session.data.order_form = {}
  }

  data = req.session.data
  req.session.data.order_form.buyer = {
    name: data.buyer_name,
    address: data.buyer_address,
    invoice_address: data.invoice_address,
    environmental_policy: data.environmental_policy,
    security_policy: data.security_policy,
    complete: true
  }

  console.log(req.session.data.order_form)

  res.redirect('/v4')
})

router.get('/v4/supplier', function (req, res) {
  if (req.session.data.order_form == undefined) {
    req.session.data.order_form = {}
  }

  res.render('v4/supplier', {
    order_form: req.session.data.order_form,
    content: content
  })
})

router.post('/v4/supplier', function (req, res) {
  if (req.session.data.order_form == undefined) {
    req.session.data.order_form = {}
  }

  data = req.session.data
  req.session.data.order_form.supplier = {
    name: data.supplier_name,
    address: data.supplier_address,
    contract_manager: data.contract_manager,
    registration_number: data.registration_number,
    duns: data.duns,
    sensitive_information: data.sensitive_information,
    complete: true
  }

  console.log(req.session.data.order_form)

  res.redirect('/v4')
})

router.post('/v4/buyer_signatory', function (req, res) {
  if (req.session.data.order_form == undefined) {
    req.session.data.order_form = {}
  }

  data = req.session.data
  req.session.data.order_form.buyer_signatory = {
    name: data.buyer_sign_name,
    role: data.buyer_sign_role,
    date: data.buyer_sign_date,
    signed: true
  }

  console.log(req.session.data.order_form)

  res.redirect('/v4')
})

router.post('/v4/supplier_edit', function (req, res) {
  if (req.session.data.order_form == undefined) {
    req.session.data.order_form = {}
  }

  data = req.session.data
  req.session.data.order_form.supplier_edit = {
    email: data.supplier_edit_email
  }

  console.log(req.session.data.order_form)

  res.redirect('/v4?supplier_edit=true')
})

router.post('/v4/invite_supplier_signatory', function (req, res) {
  if (req.session.data.order_form == undefined) {
    req.session.data.order_form = {}
  }

  data = req.session.data
  req.session.data.order_form.invited_supplier_signatory = {
    email: data.invited_supplier_signatory_email
  }

  console.log(req.session.data.order_form)

  res.redirect('/v4?supplier_signatory_invited=true')
})

router.get('/v4/:page', function (req, res) {
  page = req.params.page
  res.render('v4/base', {
    page: page,
    content: content[`${page}`]
  })
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
    schedule: findScheduleById(req.params['scheduleId'], req.params.version),
    preview: req.query.preview
  })
})

router.get('/:version(v2|v3)/schedule/:scheduleId/:addOrRemove', function (req, res) {
  res.render(`${req.params.version}/add-remove-schedule`, {
    schedule: findScheduleById(req.params['scheduleId'], req.params.version),
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
