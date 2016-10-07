const tap = require('tap')
const mona = require('mona')
const directiveParser = require('../parsers/directive')

tap.test('will parse a directive', (t) => {
  t.plan(1)
  t.deepEqual(mona.parse(directiveParser(), '.inesprg 1'), {
    args: [
      [
        'digit',
        '1'
      ]
    ],
    directive: '.inesprg'
  })
})

tap.test('will parse a directive with direct address', (t) => {
  t.plan(1)
  t.deepEqual(mona.parse(directiveParser(), '.inesprg $0000'), {
    args: [
      [
        'address',
        '0000'
      ]
    ],
    directive: '.inesprg'
  })
})

tap.test('will parse a directive with hex arg', (t) => {
  t.plan(1)
  t.deepEqual(mona.parse(directiveParser(), '.inesprg #$FE'), {
    args: [
      [
        'hex',
        'FE'
      ]
    ],
    directive: '.inesprg'
  })
})

tap.test('will parse a directive with binary arg', (t) => {
  t.plan(2)
  t.deepEqual(mona.parse(directiveParser(), '.db %00010001'), {
    args: [
      [
        'binary',
        '00010001'
      ]
    ],
    directive: '.db'
  })

  t.deepEqual(mona.parse(directiveParser(), '.db #%00010001'), {
    args: [
      [
        'binary',
        '00010001'
      ]
    ],
    directive: '.db'
  })
})

tap.test('will parse a directive with multiple args', (t) => {
  t.plan(1)
  t.deepEqual(mona.parse(directiveParser(), '.db %00010001,%00010001,%00010001'), {
    args: [
      [
        'binary',
        '00010001'
      ],
      [
        'binary',
        '00010001'
      ],
      [
        'binary',
        '00010001'
      ]
    ],
    directive: '.db'
  })
})

tap.test('will parse a directive with multiple args with spaces between them', (t) => {
  t.plan(1)
  t.deepEqual(mona.parse(directiveParser(), '.db %00010001, %00010001, %00010001'), {
    args: [
      [
        'binary',
        '00010001'
      ],
      [
        'binary',
        '00010001'
      ],
      [
        'binary',
        '00010001'
      ]

    ],
    directive: '.db'
  })
})

tap.test('will parse a directive with string arg', (t) => {
  t.plan(1)
  t.deepEqual(mona.parse(directiveParser(), '.incbin "mario.chr"'), {
    args: [
      [
        'string',
        'mario.chr'
      ]
    ],
    directive: '.incbin'
  })
})
