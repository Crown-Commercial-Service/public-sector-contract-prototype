var express = require('express')
var router = express.Router()

schedules = [
	{
		"name": 'Core terms',
		"optional": false
	},
	{
		"name": 'Framework award form',
		"optional": false
	},
	{
		"name": 'Call-off order form',
		"optional": false
	},
	{
		"name": 'Framework schedule 1: Specification',
		"optional": false
	},
	{
		"name": 'Framework schedule 2: Framework tender',
		"optional": false
	},
	{
		"name": 'Framework schedule 3: Framework prices',
		"optional": false
	},
	{
		"name": 'Framework schedule 4: Framework management',
		"optional": false
	},
	{
		"name": 'Framework schedule 5: Management charges and information',
		"optional": false
	},
	{
		"name": 'Framework schedule 6: Call-off award procedure',
		"optional": false
	},
	{
		"name": 'Framework schedule 7: Self audit certificate',
		"optional": false
	},
	{
		"name": 'Joint schedule 1: Definitions',
		"optional": false
	},
	{
		"name": 'Joint schedule 2: Variation form',
		"optional": false
	},
	{
		"name": 'Joint schedule 3: Insurance requirements',
		"optional": false
	},
	{
		"name": 'Joint schedule 4: Commercially sensitive information',
		"optional": false
	},
	{
		"name": 'Joint schedule 5: Corporate social responsibility',
		"optional": false
	},
	{
		"name": 'Joint schedule 6: Rectification plan',
		"optional": false
	},
	{
		"name": 'Joint schedule 7: Processing data',
		"optional": false
	},
	{
		"name": 'Joint schedule 8: Definitions',
		"optional": false
	},
	{
		"name": 'Call-off schedule 1: Transparency reports',
		"optional": false
	},
	{
		"name": 'Call-off schedule 2: Staff transfer',
		"optional": false
	},
	{
		"name": 'Call-off schedule 3: Continuous improvement',
		"optional": false
	},
	{
		"name": 'Call-off schedule 4: Exit management',
		"optional": false
	},
	{
		"name": "Framework schedule 9: Cyber essentials scheme",
		"optional": true
	},
	{
		"name": "Call-off schedule 4: Call-off tender",
		"optional": true
	},
	{
		"name": "Call-off schedule 6: ICT services",
		"optional": true
	},
	{
		"name": "Call-off schedule 10: Exit management",
		"optional": true
	},
	{
		"name": "Call-off schedule 11: Installation works",
		"optional": true
	},
	{
		"name": "Call-off schedule 12: Background checks",
		"optional": true,
		"context": "this is context about this schedule",
		"decision-text": "This text will help them to decide if they should use this or not"
	}
]

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

router.get('/v2/contract', function (req, res) {
  res.render('v2/contract', {schedules: schedules})
})

router.get('/v2/schedule/:scheduleId', function (req, res) {
scheduleId = req.params["scheduleId"] - 1
  res.render('v2/schedule', {schedule: schedules[scheduleId]})
})

router.get('/v2/add-remove-schedule/:scheduleId', function (req, res) {
scheduleId = req.params["scheduleId"] - 1
  res.render('v2/add-remove-schedule', {schedule: schedules[scheduleId]})
})

module.exports = router
