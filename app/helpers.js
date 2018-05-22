var exports = module.exports = {};

// v2 and v3
exports.findScheduleById = function(scheduleId, version) {
  return schedules[version].find(function(sch) { return sch.id == scheduleId })
}

// v4
flow = {
  contract_details: '/progress',
  progress: '/what',
  what: '/charges',
  charges: '/terms',
  terms: '/guarantee',
  guarantee: '/expenses',
  expenses: '/credits',
  credits: '/payment',
  buyer: '/environmental',
  environmental: '/security',
  supplier: '/contract_manager',
  contract_manager: '/supplier_numbers',
  supplier_numbers: '/key_staff',
  key_staff: '/sensitive',
}

exports.nextPage = function(current_page) {
  return flow[current_page] || ''
}

exports.sectionComplete = function(last_page_in_section, session_data) {
  return session_data[`${last_page_in_section}_complete`] != undefined
}