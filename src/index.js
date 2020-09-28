#!/usr/bin/env node
'use strict'
const tapOut = require('tap-out')
const chalk = require('chalk')
const fns = require('./fns')
const dot = chalk.green('•')
// set configs
let cfg = {
  nofail: false,
  noreport: false,
}
process.argv.forEach((arg) => {
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
    console.log(chalk.red(`   #${i} ${chalk.red('- ' + obj.name + ' -')}`))
  })
}

const longList = function () {
  failures.forEach((obj, i) => {
    console.log('')
    console.log(chalk.red(`   #${i} ${chalk.red('- ' + obj.name + ' -')}`))
    let msg = ''
    msg += chalk.cyan(`             ${"'" + obj.error.actual + "'"}`)
    msg += '\n'
    msg +=
      chalk.grey(`       want: `) +
      chalk.magenta(`${"'" + obj.error.expected + "'"}`)
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
    console.log('   ' + chalk.grey(time + 's'))
    console.log(chalk.green('   ' + fns.niceNumber(passed) + '  ✔️'))
    process.exit(0)
  } else {
    let noun = failures.length === 1 ? 'failure' : 'failures'
    // should we list the failures?
    if (cfg.noreport !== true) {
      listFailures()
    }
    console.log('\n')
    console.log('           ' + chalk.grey(fns.niceNumber(passed) + ' passed'))
    console.log(
      chalk.red(`  ◠◡◜◠◡-◡    ${fns.niceNumber(failures.length)} ${noun}   `)
    )
    console.log('')
    // we should show the errors, but return a success
    if (cfg.nofail) {
      process.exit(0)
    }
    process.exit(1)
  }
}

const t = tapOut(done)

t.on('assert', function (assert) {
  if (assert.ok === true) {
    process.stdout.write(dot)
    passed += 1
  } else {
    //failures
    process.stdout.write(chalk.red(`×`))
    failures.push(assert)
  }
})

//support console.logs
t.on('comment', function (comment) {
  console.log(comment.raw)
})

process.stdin.pipe(t)
