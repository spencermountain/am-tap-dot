#!/usr/bin/env node
'use strict'
const tapIn = require('tap-in')
const c = require('colorette')
const fns = require('./fns')
const dot = c.green('•')
// set configs
let cfg = {
  nofail: false,
  noreport: false,
}
process.argv.forEach(arg => {
  if (arg === '-nofail') {
    cfg.nofail = true
  }
  if (arg === '-noreport') {
    cfg.noreport = true
  }
})

let failures = []
let passed = 0
const start = Date.now()
//start us off
console.log('\n')

const shortList = function () {
  failures.forEach((obj, i) => {
    console.log('')
    console.log(c.red(`   #${i} ${c.red('- ' + obj.name + ' -')}`))
  })
}

const longList = function () {
  failures.forEach((obj, i) => {
    console.log('')
    console.log(c.red(`   #${i} ${c.red('- ' + obj.name + ' -')}`))
    let msg = ''
    msg += c.cyan(`             ${"'" + obj.error.actual + "'"}`)
    msg += '\n'
    msg += c.gray(`       want: `) + c.magenta(`${"'" + obj.error.expected + "'"}`)
    console.log(msg)
  })
}

const listFailures = function () {
  console.log('\n')
  if (failures.length > 10) {
    shortList()
  } else {
    longList()
  }
}

//callback
const done = function () {
  if (failures.length === 0) {
    const time = fns.duration(start)
    console.log('')
    console.log('   ' + c.grey(time + 's'))
    console.log(c.green('   ' + fns.niceNumber(passed) + '  ✔️'))
    process.exit(0)
  } else {
    let noun = failures.length === 1 ? 'failure' : 'failures'
    // should we list the failures?
    if (cfg.noreport !== true) {
      listFailures()
    }
    console.log('\n')
    console.log('           ' + c.gray(fns.niceNumber(passed) + ' passed'))
    console.log(c.red(`  ◠◡◜◠◡-◡    ${fns.niceNumber(failures.length)} ${noun}   `))
    console.log('')
    // we should show the errors, but return a success
    if (cfg.nofail) {
      process.exit(0)
    }
    process.exit(1)
  }
}

const t = tapIn(done)

t.on('assert', function (assert) {
  if (assert.ok === true) {
    process.stdout.write(dot)
    passed += 1
  } else {
    //failures
    process.stdout.write(c.red(`✗`))
    failures.push(assert)
  }
})

//support console.logs
t.on('comment', function (comment) {
  console.log(comment.raw)
})

process.stdin.pipe(t)
