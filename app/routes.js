var express = require('express')
var router = express.Router()

schedules = [
	{
		"name": 'Core terms',
		"optional": false,
		"context": "Standards CCS terms for common goods and services bought using a framework agreement."
	},
	{
		"name": 'Framework award form',
		"optional": false,
		"context": "Where CCS and suppliers sign the contract and the place that tells you what you need to know to form the contract."
	},
	{
		"name": 'Call-off order form',
		"optional": false,
		"context": "Details the goods or service being bought, what they’ll cost and how they’ll be delivered."
	},
	{
	    "name": "Framework schedule 1: Specification",
	    "optional": false,
	    "context": "What the supplier is selling."
	},
	{
	    "name": "Framework schedule 2: Framework tender",
	    "optional": false,
	    "context": "How the supplier will deliver their goods or services."
	},
	{
	    "name": "Framework schedule 3: Framework prices",
	    "optional": false,
	    "context": "What the supplier can charge."
	},
	{
	    "name": "Framework schedule 4: Framework management",
	    "optional": false,
	    "context": "How the framework will be managed."
	},
	{
	    "name": "Framework schedule 5: Management charges and information",
	    "optional": false,
	    "context": "What suppliers have to tell CCS and the charges they must pay."
	},
	{
	    "name": "Framework schedule 6: Call-off award procedure",
	    "optional": false,
	    "context": "How a call-off contract should be awarded."
	},
	{
	    "name": "Framework schedule 7: Self audit certificate",
	    "optional": false,
	    "context": "A template letter that confirms suppliers have followed all necessary procedures."
	},
	{
	    "name": "Joint schedule 1: Definitions",
	    "optional": false,
	    "context": "What the capitalised terms in the contract mean."
	},
	{
	    "name": "Joint schedule 2: Variation form",
	    "optional": false,
	    "context": "How an existing contract can be changed."
	},
	{
	    "name": "Joint schedule 3: Insurance requirements",
	    "optional": false,
	    "context": "The insurance a supplier needs for the contract."
	},
	{
	    "name": "Joint schedule 4: Commercially sensitive information",
	    "optional": false,
	    "context": "The information about a supplier that can't be publicly disclosed."
	},
	{
	    "name": "Joint schedule 5: Corporate social responsibility",
	    "optional": false,
	    "context": "The suppliers' social responsibilities."
	},
	{
	    "name": "Joint schedule 6: Key subcontractors",
	    "optional": false,
	    "context": "Restrictions on when suppliers can change the subcontractors working on the contract."
	},
	{
	    "name": "Joint schedule 7: Financial difficulties",
	    "optional": false,
	    "context": "What happens if a supplier gets into financial trouble."
	},
	{
	    "name": "Joint schedule 8: Guarantee",
	    "optional": false,
	    "context": "A third-party must provide an assurance that a supplier can fulfill their obligations."
	},
	{
	    "name": "Joint schedule 9: Minimum standards of reliability",
	    "optional": false,
	    "context": "A requirement that call-off contracts must meet the standards outlined in the OJEU not}ce."
	},
	{
	    "name": "Joint schedule 10: Rectification plan",
	    "optional": false,
	    "context": "What to do if the supplier breaches the terms of the contract."
	},
	{
	    "name": "Joint schedule 11: Processing data",
	    "optional": false,
	    "context": "How suppliers should handle data."
	},
	{
	    "name": "Call-off schedule 1: Transparency reports",
	    "optional": false,
	    "context": "Information the buyer needs from the supplier to meet its transparency requirements."
	},
	{
	    "name": "Call-off schedule 2: Staff transfer",
	    "optional": false,
	    "context": "Employee protection if transferred to a new company."
	},
	{
	    "name": "Call-off schedule 3: Continuous improvement",
	    "optional": false,
	    "context": "Suppliers must always improve performance."
	},
	{
	    "name": "Call-off schedule 5: Pricing details",
	    "optional": false,
	    "context": "What the supplier can charge."
	},
	{
		"id": 26,
		"name": "Framework schedule 9: Cyber essentials scheme",
		"optional": true,
	    "context": "Cyber security standards the supplier must meet.",
	    "decision_text": "This text will help them to decide if they should use this or not"
	},
	{
		"id": 27,
		"name": "Call-off schedule 4: Call-off tender",
		"optional": true,
	    "context": "How the supplier will meet the buyer's demands.",
	    "decision_text": "This text will help them to decide if they should use this or not"
	},
	{
		"id": 28,
		"name": "Call-off schedule 6: ICT services",
		"optional": true,
	    "context": "Additional responsibilities for ICT contracts.",
	    "decision_text": "This text will help them to decide if they should use this or not"
	},
	{
		"id": 29,
		"name": "Call-off schedule 10: Exit management",
		"optional": true,
	    "context": "What happens when the contract ends.",
	    "decision_text": "This text will help them to decide if they should use this or not"
	},
	{
		"id": 26,
		"name": "Call-off schedule 11: Installation works",
		"optional": true,
	    "context": "What the supplier has to do when installing goods.",
	    "decision_text": "This text will help them to decide if they should use this or not"
	},
	{
		"id": 30,
		"name": "Call-off schedule 12: Background checks",
		"optional": true,
		"context": "Security checks on supplier staff.",
		"decision_text": "This text will help them to decide if they should use this or not"
	}
]

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

router.get('/v2/what-is-the-public-sector-contract', function (req, res) {
  res.render('v2/what-is-the-public-sector-contract', {schedules: schedules})
})

router.get('/v2/contract', function (req, res) {
  res.render('v2/contract', {schedules: schedules})
})

router.get('/v2/schedule/:scheduleId', function (req, res) {
  scheduleId = req.params["scheduleId"] - 1
  res.render('v2/schedule', {schedule: schedules[scheduleId]})
})

router.get('/v2/schedule/:scheduleId/:addOrRemove', function (req, res) {
  scheduleId = req.params["scheduleId"] - 1
  addOrRemove = req.params["addOrRemove"]
  res.render('v2/add-remove-schedule', {schedule: schedules[scheduleId], addOrRemove: addOrRemove})
})

module.exports = router
