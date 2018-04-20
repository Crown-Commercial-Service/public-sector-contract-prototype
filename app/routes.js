var express = require('express')
var router = express.Router()

schedules = [
	{
		"name": 'Core terms',
		"optional": false,
		"context": "Standard CCS terms for common goods and services. These cannot be changed."
	},
	{
		"name": 'Call-off order form',
		"optional": false,
		"context": "Details the goods or service being bought, what they’ll cost and how they’ll be delivered."
	},
	{
	    "name": "Call-off schedule 1: Transparency reports",
	    "optional": false,
	    "context": "Information the buyer needs from the supplier to meet transparency requirements."
	},
	{
	    "name": "Call-off schedule 2: Staff transfer",
	    "optional": false,
	    "context": "Employee protection rights if staff are transferred to a new company."
	},
	{
	    "name": "Call-off schedule 3: Continuous improvement",
	    "optional": false,
	    "context": "Details how suppliers must improve their performance throughout the contract."
	},
	{
	    "name": "Call-off schedule 5: Pricing details",
	    "optional": false,
	    "context": "What the supplier can charge."
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
		"id": 28,
		"name": "Call-off schedule 7: Key supplier staff",
		"optional": true,
	    "context": "Restrictions on a supplier changing staff that are crucial to deliver the contract.",
	    "decision_text": "We suggest you include this schedule if you may want to restrict the supplier from changing specific, essential staff members without approval.",

	},
	{
		"id": 28,
		"name": "Call-off schedule 8: Business continuity and disaster recovery",
		"optional": true,
	    "context": "What the supplier must do to make sure the contract can still be delivered even if there’s an unexpected event.",
	    "decision_text": "We suggest you include this schedule if the supplier can't be easily replaced and failure of the contract would have serious consequences for your organisation.",

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
		"id": 30,
		"name": "Call-off schedule 12: Clustering",
		"optional": true,
	    "context": "Enables multiple Buyers to join together to buy more efficiently.",
	    "decision_text": "We suggest you include this schedule if you are also buying for others under a single call-off contract.",
	},
	{
		"id": 30,
		"name": "Call-off schedule 15: Call-off contract management",
		"optional": true,
	    "context": "How the supplier and the buyer should work together on the call-off contract.",
	    "decision_text": "We suggest you include this schedule if you need a process to collaborate with the supplier and monitor and manage the call-off contract.",
	},
	{
		"id": 30,
		"name": "Call-off schedule 16: Benchmarking",
		"optional": true,
	    "context": "A process for comparing the value offered by the supplier against other providers in the market.",
	    "decision_text": "We suggest you include this schedule if you need to be able to monitor pricing to ensure it always provides good value.",
	},
	{
		"id": 31,
		"name": "Call-off schedule 18: Background checks",
		"optional": true,
		"context": "Security checks on supplier staff.",
		"decision_text": "We suggest you include this schedule if buyers will need to vet staff before work starts.",
	},
	{	
	    "id": 32,
	    "name": "Joint schedule 7: Financial difficulties",
	    "optional": false,
	    "context": "What happens if a supplier gets into financial trouble.",
	    "decision_text": "We suggest you include this schedule if you want to regularly monitor the supplier's financial stability.",
	},
	{	
	    "id": 33,
	    "name": "Joint schedule 8: Guarantee",
	    "optional": false,
	    "context": "A third-party must provide an assurance that a supplier can fulfill the contract.",
	    "decision_text": "We suggest you include this schedule if there's no framework guarantee and you want a third party guarantee in case the supplier doesn't deliver the contract.",
	},
	{
	    "id": 34,
	    "name": "Joint schedule 9: Minimum standards of reliability",
	    "optional": false,
	    "context": "A requirement that call-off contracts must meet the standards in the OJEU notice.",
	    "decision_text": "We suggest you include this schedule if this call-off contract is worth more than £10 million",
	},
]

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

router.get('/:version(v2|v3)/what-is-the-public-sector-contract', function (req, res) {
  res.render(`${req.params.version}/what-is-the-public-sector-contract`, {schedules: schedules})
})

router.get('/:version(v2|v3)/contract', function (req, res) {
  if (req.session.data['optionalIncluded'] == undefined) {
  	req.session.data['optionalIncluded'] = []
  }

  res.render(
	`${req.params.version}/contract`,
  	{
  	  schedules: schedules,
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

  res.redirect(`${req.params.version}/contract?invited=true`)
})

router.get('/:version(v2|v3)/schedule/:scheduleId', function (req, res) {
  scheduleId = req.params["scheduleId"] - 1
  res.render(`${req.params.version}/schedule`, {
  	schedule: schedules[scheduleId],
  	preview: req.query.preview
  })
})

router.get('/:version(v2|v3)/schedule/:scheduleId/:addOrRemove', function (req, res) {
  scheduleId = req.params["scheduleId"] - 1
  addOrRemove = req.params["addOrRemove"]
  res.render(`${req.params.version}/add-remove-schedule`, {schedule: schedules[scheduleId], addOrRemove: addOrRemove})
})

router.post('/:version(v2|v3)/schedule/:scheduleId/:addOrRemove', function (req, res) {
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
  res.redirect(`/${req.params.version}/contract?updated=true`)
})

module.exports = router
