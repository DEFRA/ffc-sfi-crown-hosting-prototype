const isJson = require('../../utils/isJson')

function ViewModel (value, error) {
  this.model = {}
  this.model.url = {
    label: {
      text: 'Which API would you like to test?',
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
        text: 'Which Http method does this API use?'
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

  this.model.relay = {
    classes: 'govuk-radios--inline',
    idPrefix: 'relay',
    name: 'relay',
    fieldset: {
      legend: {
        text: 'Does the API use a relay?'
      }
    },
    items: [
      {
        value: true,
        text: 'Yes',
        checked: value.relay === true
      },
      {
        value: false,
        text: 'No',
        checked: value.relay === false
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
      text: 'If this API requires a token, enter it here'
    },
    id: 'token',
    name: 'token',
    value: value.token
  }

  this.model.relayNamespace = {
    label: {
      text: 'If the Relay requires authentication, enter the namespace'
    },
    hint: {
      text: 'The namespace must be in the format <namespace>.servicebus.windows.net'
    },
    id: 'relayNamespace',
    name: 'relayNamespace',
    value: value.relayNamespace
  }

  this.model.relayKeyName = {
    label: {
      text: 'If the Relay requires authentication, enter the SAS key name'
    },
    id: 'relayKeyName',
    name: 'relayKeyName',
    value: value.relayKeyName
  }

  this.model.relayKey = {
    label: {
      text: 'If the Relay requires authentication, enter the SAS key'
    },
    id: 'relayKey',
    name: 'relayKey',
    value: value.relayKey
  }

  if (error) {
    this.model.error = [{
      text: error.message,
      href: '#'
    }]
  }
}

module.exports = ViewModel
