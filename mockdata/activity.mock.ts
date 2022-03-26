export const MOCK_ACTIVITY_SELECT_TEXT = {
  id: '9e26ab71-a2d0-43b5-b0fa-38910b7ebe1b',
  timestamps: {
    created: new Date('2020-04-01T00:00:00.000Z'),
    modified: new Date('2020-04-01T00:00:00.000Z'),
  },
  author: 'ef4f0e28-86f8-4d2d-a56a-8b24d3286867',
  type: 'select_text',
  score: {
    maxPossibleScore: 0,
    currentScore: 0,
    lastScore: 0,
    bestScore: 0,
    averageScore: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    unansweredAnswers: 0,
    questions: 2,
    scorePerQuestion: 5,
    timeToComplete: 0,
    timesPlayed: 0,
  },
  language: 'ca',
  title: `Ho veus clar?`,
  task: `Selecciona totes les paradoxes del text`,
  text: `És quan dormo que hi veig clar
Foll d'una dolça metzina,
Amb perles a cada mà
Visc al cor d'una petxina,
Só la font del comellar
I el jaç de la salvatgina,
-O la lluna que s'afina
En morir carena enllà.
És quan dormo que hi veig clar
Foll d'una dolça metzina.`,
  positions: [
    { start: 0, end: 30 },
    { start: 219, end: 249 },
  ],
  font: {
    display: true,
    author: 'Joan Vicenç Foix',
    year: 1953,
    work: 'Poemes',
    reference: 'https://ca.wikipedia.org/wiki/Josep_Vicen%C3%A7_Foix_i_Mas',
  },
};

export const MOCK_ACTIVITY_BEST_OPTION = {
  id: '120460f9-5a23-4050-95a9-4f9d1de87672',
  timestamps: {
    created: new Date('2020-04-01T00:00:00.000Z'),
    modified: new Date('2020-04-01T00:00:00.000Z'),
  },
  author: '47d8ddb3-b36e-4e72-912c-425ef31bd951',
  type: 'best_option',
  score: {
    maxPossibleScore: 0,
    currentScore: 0,
    lastScore: 0,
    bestScore: 0,
    averageScore: 0,
    correctAnswers: 0,
    inunansweredAnswers: 0,
    questions: 0,
    scorePerQuestion: 0,
    timeToComplete: 0,
    timesPlayed: 0,
  },
  language: 'ca',
  title: `Qui l'encerta l'endevina`,
  task: `Tria l'expressió correcta`,
  text: `1. Duia pantalons curts, és a dir, que no encara els dotze anys.
2. S'han suspès tots els vols la boira.
3. Proposem un enfocament les polítiques de mercat.
4. A la nit podríem fer peix de carn.
5. plovia, vam jugar el partit.
6. estaliat, ara no té més diners que el sou.`,
  questions: [
    {
      position: 41,
      options: [
        { text: 'hauria fet', correct: false, index: 1 },
        { text: 'devia haver fet', correct: true, index: 2 },
      ],
    },
    {
      position: 94,
      options: [
        { text: 'degut a', correct: false, index: 1 },
        { text: 'a causa de', correct: true, index: 2 },
      ],
    },
    {
      position: 130,
      options: [
        { text: 'en base a', correct: false, index: 1 },
        { text: 'a partir de', correct: true, index: 2 },
      ],
    },
    {
      position: 185,
      options: [
        { text: 'enlloc', correct: false, index: 1 },
        { text: 'en lloc de', correct: true, index: 2 },
      ],
    },
    {
      position: 197,
      options: [
        { text: 'Malgrat', correct: false, index: 1 },
        { text: 'Malgrat que', correct: true, index: 2 },
      ],
    },
    {
      position: 229,
      options: [
        { text: 'Al no haver', correct: false, index: 1 },
        { text: 'Com que no ha', correct: true, index: 2 },
      ],
    },
  ],
  font: {
    display: true,
    author: 'Francesc Esteve i Gómez',
    year: 2011,
    work: 'Gramàtica zero',
    reference: 'https://www.uv.es/llengues/gramaticazero',
  },
};

export const MOCK_ACTIVITY_TRANSFORM_ASPECT = {
  id: 'ae40070d-6edd-4e95-aab7-8ad5a02ebc8a',
  timestamps: {
    created: new Date('2020-04-01T00:00:00.000Z'),
    modified: new Date('2020-04-01T00:00:00.000Z'),
  },
  author: 'ef4f0e28-86f8-4d2d-a56a-8b24d3286867',
  type: 'transform_aspect',
  score: {
    maxPossibleScore: 0,
    currentScore: 0,
    lastScore: 0,
    bestScore: 0,
    averageScore: 0,
    correctAnswers: 0,
    inunansweredAnswers: 0,
    questions: 0,
    scorePerQuestion: 0,
    timeToComplete: 0,
    timesPlayed: 0,
  },
  language: 'ca',
  title: `La veu passiva`,
  task: `Transforma la oració següent a veu passiva`,
  text: `1. Quan escoltava la ràdio va sentir una forta explosió.
  2. Els dos germans van votar a favor d'aprovar la llei.`,
  questions: [
    {
      start: 3,
      end: 56,
      providedText: 'Quan escoltava la ràdio, va sentir una forta explosió.',
      validSolutions: [
        'Quam hom escoltava la ràdio, es va sentir una forta explosió.',
      ],
    },
    {
      start: 63,
      end: 115,
      providedText: `Els dos germans van votar a favor d'aprovar la llei.`,
      validSolutions: [
        `La llei va ser votada favorablement per els dos germans.`,
      ],
    },
  ],
  font: {
    display: false,
    author: '',
    year: 0,
    work: '',
    reference: '',
  },
};
