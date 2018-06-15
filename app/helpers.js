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
  buyer: '/buyer_authorised_representative',
  buyer_authorised_representative: '/policies',
  policies: '/review?review=buyer_details',
  supplier: '/supplier_authorised_representative',
  supplier_authorised_representative: '/supplier_numbers',
  supplier_numbers: '/supplier_staff',
  supplier_staff: '/sensitive',
  sensitive: '/review?review=supplier_details',
  buyer_contract_manager: '/buyer',
  supplier_contract_manager: '/supplier'
}

exports.setPath = function(args) {
  if (args.type) {
    if (args.type.includes('buyer')) {
      path = '/buyer'
    } else if (args.type.includes('supplier')) {
      path = '/supplier'
    } else if (args.type.includes('add')) {
      path = '/supplier_staff'
    } else if (args.type === 'policy') {
      path = '/policies'
    }
  } else if (args.review) {
    path = '/review'
  } else if (args.additional_policy) {
    path = '/add/policy'
  } else {
    path = flow[args.page] || ''
  }

  return path
}

exports.setQuery = function(args) {
  query = ''
  if (args.page) {
    if (args.page.includes('contract_manager')) {
      query = args.edit ? '?edit=yes' : `?added=${args.page}`
    } else if (args.page === 'supplier_edit') {
      query = '?supplier_edit=true'
    } else if (args.page === 'invite_supplier_signatory') {
      query = '?supplier_signatory_invited=true'
    } else if (args.page === 'signatory') {
      query = `?signed=${args.role}`
    }
  } else if (args.added) {
    query = `?added=${args.added}`
  }

  if (args.review) {
    query += query ? '&' : '?'
    query += `review=${args.review}`
  }

  return query
}

exports.added = function(data, type) {
  return [
    (data.authorised_name || data[`${type}_name`]),
    (data.authorised_role || data[`${type}_role`]),
    (data.authorised_email || data[`${type}_email`]),
    (data.authorised_phone || data[`${type}_phone`]),
    (data.authorised_address || data[`${type}_address`])
  ].filter(Boolean).length > 0
}

exports.addStaffOrSubcontractors = function(data, type, id) {
  if (data[type] == undefined) {
    data[type] = []
  }

  data[type].push({
    id: id || data[type].length + 1,
    name: data.authorised_name,
    role: data.authorised_role,
    email: data.authorised_email,
    phone: data.authorised_phone,
    address: data.authorised_address
  })
}

exports.cleanKeys = function(data) {
  Object.keys(data).forEach(field => {
    if (field.includes('authorised')) {
      delete data[field]
    }
  })
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
