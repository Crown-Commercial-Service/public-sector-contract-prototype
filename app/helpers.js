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
  buyer: '/buyer_contract_manager',
  buyer_contract_manager: '/environmental',
  environmental: '/review?review=buyer_details',
  supplier: '/supplier_contract_manager',
  supplier_contract_manager: '/supplier_numbers',
  supplier_numbers: '/supplier_staff',
  supplier_staff: '/sensitive',
  sensitive: '/review?review=supplier_details'
}

exports.setPath = function(page, review) {
  if (review) {
    params = ''
    if (review != "all") {
      params = `?review=${review}`
    }
    path = `/review${params}`
  } else {
    path = flow[page] || ''
  }

  return path
}

exports.setQuery = function(page, role) {
  query = ''
  if (page === 'supplier_edit') {
    query = '?supplier_edit=true'
  } else if (page === 'invite_supplier_signatory') {
    query = '?supplier_signatory_invited=true'
  } else if (page === 'signatory') {
    query = `?signed=${role}`
  }

  return query
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

exports.addFile = function(data, page) {
  if (data.files === undefined) {
    data.files = {}
  }

  Object.keys(data).forEach(field => {
    if (field.includes('_files')) {
      if (data.files[field] === undefined) {
        data.files[field] = []
      }

      if (!data[field] == "" && !data.files[field].includes(data[field])) {
        data.files[field].push(data[field])
      }
    }
  })
}
