var express = require('express');
var router  = express.Router();
var yaml    = require('js-yaml');
var fs      = require('fs-extra');

schedules = {
  'v2': yaml.safeLoad(fs.readFileSync('./app/views/v2/schedules.yml', 'utf8')),
  'v3': yaml.safeLoad(fs.readFileSync('./app/views/v3/schedules.yml', 'utf8')),
}

function findScheduleById(scheduleId, version) {
  return schedules[version].find(function(sch) { return sch.id == scheduleId })
}

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

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
