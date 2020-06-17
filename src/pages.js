const pages = [
  {
    output: './index.html',
    content: {
      title: 'Svenja Huebener - Therapie und Beratung',
      description: 'Für Menschen, die sich Veränderungen in ihrem Leben wünschen, zum Beispiel in Partnerschaft, Familie oder Beruf.'
    },
    template: './src/pages/index.hbs'
  },
  {
    output: './supervision.html',
    content: {
      title: 'Svenja Huebener - Supervision',
      description: 'Berufliches Handeln reflektieren und Ideen für die Zukunft entwickeln'
    },
    template: './src/pages/supervision.hbs'
  },
  {
    output: './therapie.html',
    content: {
      title: 'Svenja Huebener - Therapie',
      description: 'Einzeln oder gemeinsam, mit oder ohne Kind- im Rahmen von Familien- oder Elterngesprächen können Sie sich gemeinsam den Themen und Herausforderungen nähern'
    },
    template: './src/pages/therapie.hbs'
  },
  {
    output: './contact.html',
    content: {
      title: 'Svenja Huebener - Kontakt',
      description: 'Jetzt Kontakt aufnehmen'
    },
    template: './src/pages/contact.hbs'
  },
  {
    output: './datenschutzerklaerung.html',
    content: {
      title: 'Svenja Huebener - Datenschutzerklaerung',
      description: 'Datenschutzerklaerung'
    },
    template: './src/pages/datenschutzerklaerung.hbs'
  }
]

module.exports = pages



