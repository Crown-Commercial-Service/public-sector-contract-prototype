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
  credits: '/progress',
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

exports.setPath = function(page, review, additional_policy) {
  if (review || additional_policy) {
    if (page === 'environmental' && additional_policy) {
      sub_path = '/add/policy'
    } else {
      sub_path = '/review'
    }

    params = `?review=${review}`
    path = `${sub_path}${params}`
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

exports.added = function(data) {
  return [
    data.authorised_name,
    data.authorised_role,
    data.authorised_email,
    data.authorised_phone,
    data.authorised_address
  ].filter(Boolean).length > 0
}

exports.additionReturnPath = function(type) {
  if (type.includes('buyer')) {
    path = 'buyer'
  } else if (type.includes('representative')) {
    path = 'supplier'
  } else if (type.includes('add')) {
    path = 'supplier_staff'
  } else if (type == 'policy') {
    path = 'environmental'
  }

  return path
}

exports.findRepIndex = function(data, type, id) {
  return data[type].findIndex(rep => rep.id == id )
}

exports.addItem = function(data) {
  ['files', 'links'].forEach(item_type => {
    if (data[item_type] === undefined) {
      data[item_type] = {}
    }

    Object.keys(data).forEach(field => {
      if (field.includes(`_${item_type}`)) {
        if (data[item_type][field] === undefined) {
          data[item_type][field] = []
        }

        if (data[field] !== '' && !data[item_type][field].includes(data[field])) {
          data[item_type][field].push(data[field])
        }
      }
    })
  })
}
