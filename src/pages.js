const pages = [
  {
    output: './index.html',
    content: {
      title: 'Auff Unna',
      description: 'Auff Unna bietet Ambulante Unterstützung für Familien'
    },
    template: './src/pages/home.hbs'
  },
  {
    output: './datenschutzerklaerung.html',
    content: {
      title: 'Auff Unna - impressum',
      description: 'Auff Unna bietet Ambulante Unterstützung für Familien'
    },
    template: './src/pages/privacy_policy.hbs'
  }
]

module.exports = pages



