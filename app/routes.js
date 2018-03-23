var express = require('express')
var router = express.Router()

schedules = [
	{
		"name": 'Core terms',
		"optional": false,
		"context": "Standard CCS terms for common goods and services bought using a framework agreement."
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
	    "context": "How the supplier will deliver the goods or services."
	},
	{
	    "name": "Framework schedule 3: Framework prices",
	    "optional": false,
	    "context": "What the supplier can charge."
	},
	{
	    "name": "Framework schedule 4: Framework management",
	    "optional": false,
	    "context": "How the framework contract will be managed."
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
	    "context": "A certificate that confirms how suppliers should behave."
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
	    "context": "Restrictions about when subcontractors can be changed."
	},
	{
	    "name": "Joint schedule 7: Financial difficulties",
	    "optional": false,
	    "context": "What happens if a supplier gets into financial trouble."
	},
	{
	    "name": "Joint schedule 8: Guarantee",
	    "optional": false,
	    "context": "A third-party must provide an assurance that a supplier can fulfill the contract."
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
	    "context": "Details how suppliers must always improve performance."
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
	    "context": "The cyber security standards the supplier must meet are in this schedule.",
	    "decision_text": "We suggest you include this schedule if suppliers will be handling sensitive or personal information, for example addresses or bank details",

	},
	{
		"id": 27,
		"name": "Call-off schedule 4: Call-off tender",
		"optional": true,
	    "context": "How suppliers will meet the buyers' demands.",
	    "decision_text": "We suggest you include this schedule if suppliers will tender for the work."
	},
	{
		"id": 28,
		"name": "Call-off schedule 6: ICT services",
		"optional": true,
	    "context": "Additional responsibilities for ICT contracts.",
	    "decision_text": "We suggest you include this schedule if software, hardware or ICT support will be bought.",

	},
	{
		"id": 29,
		"name": "Call-off schedule 10: Exit management",
		"optional": true,
	    "context": "What happens when the contract ends.",
	    "decision_text": "We suggest you include this schedule if buyers will want to specify how contract handover works.",
	},
	{
		"id": 30,
		"name": "Call-off schedule 11: Installation works",
		"optional": true,
	    "context": "What the supplier has to do when installing goods.",
	    "decision_text": "We suggest you include this schedule if suppliers will be installing any goods.",
	},
	{
		"id": 31,
		"name": "Call-off schedule 12: Background checks",
		"optional": true,
		"context": "Security checks on supplier staff.",
		"decision_text": "We suggest you include this schedule if buyers will need to vet staff before work starts.",
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
  if (req.session.data['optionalIncluded'] == undefined) {
  	req.session.data['optionalIncluded'] = []
  }

  res.render(
  	'v2/contract',
  	{
  	  schedules: schedules,
  	  optionalIncluded: req.session.data['optionalIncluded']
  	}
  )
})

router.post('/v2/team-members', function (req, res) {
  email = req.session.data['email']
  role = req.session.data['role']

  if (req.session.data['teammembers'] == undefined) {
  	req.session.data['teammembers'] = []
  }

  req.session.data['teammembers'].push({
  	email: email,
  	role: role
  })

  res.redirect('/v2/contract')
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

router.post('/v2/schedule/:scheduleId/:addOrRemove', function (req, res) {
  scheduleId = Number(req.params["scheduleId"])
  addOrRemove = req.params["addOrRemove"]

  if (req.session.data['optionalIncluded'] == undefined) {
  	req.session.data['optionalIncluded'] = []
  }

  if (addOrRemove == "add") {
  	req.session.data['optionalIncluded'].push(scheduleId)
  }

  if (addOrRemove == "remove") {
  	for(var i = req.session.data['optionalIncluded'].length - 1; i >= 0; i--) {
	    if(req.session.data['optionalIncluded'][i] === scheduleId) {
	       req.session.data['optionalIncluded'].splice(i, 1);
	    }
	}
  }

  console.log(req.session.data['optionalIncluded'])
  res.redirect('/v2/contract')
})

module.exports = router
