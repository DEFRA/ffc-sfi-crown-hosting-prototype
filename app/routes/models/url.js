function ViewModel (value, error) {
  this.model = {
    label: {
      text: 'Which Url would you like to test?',
      isPageHeading: true,
      classes: 'govuk-label--l'
    },
    id: 'url',
    name: 'url',
    value
  }

  if (error) {
    this.model.errorMessage = {
      text: error.message
    }
  }
}

module.exports = ViewModel
