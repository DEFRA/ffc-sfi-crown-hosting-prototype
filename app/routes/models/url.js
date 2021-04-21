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

  if (error) {
    this.model.url.errorMessage = {
      text: error.message
    }
  }
}

module.exports = ViewModel
