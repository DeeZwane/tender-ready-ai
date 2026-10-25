export type Item = {
  id: number;
  text: string;
  page: string;
};

export const example = {
  title: 'Sample Facilities Maintenance RFQ',
  reference: 'DEMO-RFQ-2026-014',
  closing: '30 October 2026, 12:00 SAST',
  briefing: 'Example only: 27 October 2026, 10:00',
  duration: '12 months',
  summary:
    'This illustrative request for quotation seeks facilities maintenance services. Review the mandatory submission documents, briefing requirements and pricing instructions in the original tender before preparing a response.',

  items: [
    {
      id: 1,
      text: 'Complete and sign the RFQ response form',
      page: 'p. 2'
    },
    {
      id: 2,
      text: 'Include company registration documentation',
      page: 'p. 3'
    },
    {
      id: 3,
      text: 'Provide the requested tax compliance information',
      page: 'p. 3'
    },
    {
      id: 4,
      text: 'Complete the pricing schedule',
      page: 'p. 5'
    },
    {
      id: 5,
      text: 'Include relevant project references',
      page: 'p. 6'
    },
    {
      id: 6,
      text: 'Sign the declaration of interest',
      page: 'p. 7'
    }
  ] as Item[]
};

export const answers = [
  [
    'What is the closing date?',
    `The illustrative closing date is ${example.closing}.`
  ],

  [
    'Which documents are required?',
    'The sample checklist includes a signed RFQ form, company registration, tax information, pricing schedule, references and a signed declaration.'
  ],

  [
    'Is the briefing compulsory?',
    'This sample mentions a briefing, but compulsory attendance has not been established. Check the original document.'
  ],

  [
    'How long is the contract?',
    `The illustrative contract duration is ${example.duration}.`
  ]
];