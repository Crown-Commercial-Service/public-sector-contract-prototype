var exports = module.exports = {};

// v2 and v3
exports.findScheduleById = function(scheduleId, version) {
  return schedules[version].find(function(sch) { return sch.id == scheduleId })
}

// v4
flow = {
  contract_details: '/what',
  what: '/charges',
  charges: '/expenses',
  expenses: '/payment',
  payment: '/credits',
  credits: '/guarantee',
  guarantee: '/progress',
  progress: '/terms',
  terms: '/review?review=contract_details',
  buyer: '/environmental',
  environmental: '/review?review=buyer_details',
  supplier: '/contract_manager',
  contract_manager: '/supplier_numbers',
  supplier_numbers: '/supplier_staff',
  supplier_staff: '/sensitive',
  sensitive: '/review?review=supplier_details'
}

exports.nextPage = function(current_page) {
  return flow[current_page] || ''
}

exports.additionReturnPath = function(type) {
  if (type.includes('buyer')) {
    path = 'buyer'
  } else if (type.includes('representative')) {
    path = 'supplier'
  } else if (type.includes('add')) {
    path = 'supplier_staff'
  }

  return path
}

exports.findRepIndex = function(data, type, id) {
  return data[type].findIndex(rep => rep.id == id )
}
