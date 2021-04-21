const isJson = require('../../utils/isJson')

function ViewModel (value, error) {
  this.model = {}
  this.model.url = {
    label: {
      text: 'Which Url would you like to test?',
      isPageHeading: true,
      classes: 'govuk-label--l'
    },
    id: 'url',
    name: 'url',
    value: value.url
  }

  this.model.method = {
    classes: 'govuk-radios--inline',
    idPrefix: 'method',
    name: 'method',
    fieldset: {
      legend: {
        text: 'Which Http method does this Url use?'
      }
    },
    items: [
      {
        value: 'get',
        text: 'Get',
        checked: value.method === 'get'
      },
      {
        value: 'post',
        text: 'Post',
        checked: value.method === 'post'
      }
    ]
  }

  this.model.data = {
    name: 'data',
    id: 'data',
    label: {
      text: 'For post requests, provide any payload data'
    },
    hint: {
      text: 'The data must be in Json format'
    },
    value: isJson(value.data) ? JSON.stringify(value.data) : value.data
  }

  this.model.token = {
    label: {
      text: 'If this Url requires a token, enter it here'
    },
    id: 'token',
    name: 'token',
    value: value.token
  }

  if (error) {
    this.model.error = [{
      text: error.message,
      href: '#'
    }]
  }
}

module.exports = ViewModel
