#!/usr/bin/env node
'use strict'
const tapOut = require('tap-out')
const chalk = require('chalk')
const fns = require('./fns')

const dot = chalk.green('•')

const failures = []
let passed = 0
const start = Date.now()
//start us off
console.log('\n')

const listFailures = function() {
  failures.forEach((obj, i) => {
    console.log('')
    console.log(chalk.red(`   #${i} ${chalk.red('- ' + obj.name + ' -')}`))
    let msg = ''
    msg += chalk.cyan(`           ${"'" + obj.error.actual + "'"}`)
    msg += '\n'
    msg +=
      chalk.grey(`     want: `) +
      chalk.magenta(`${"'" + obj.error.expected + "'"}`)
    console.log(msg)
  })
}

//callback
const done = function() {
  if (failures.length === 0) {
    const time = fns.duration(start)
    console.log('')
    console.log('   ' + chalk.grey(time + 's'))
    console.log(chalk.green('   ' + fns.niceNumber(passed) + '  ✔️'))
    process.exit(0)
  } else {
    let noun = failures.length === 1 ? 'failure' : 'failures'
    listFailures()
    console.log('\n')
    console.log('           ' + chalk.grey(fns.niceNumber(passed) + ' passed'))
    console.log(
      chalk.red(`  ◠◡◜◠◡-◡    ${fns.niceNumber(failures.length)} ${noun}   `)
    )
    process.exit(1)
  }
}

const t = tapOut(done)

t.on('assert', function(assert) {
  if (assert.ok === true) {
    if (failures.length === 0) {
      process.stdout.write(dot)
    }
    passed += 1
  } else {
    //failures
    if (failures.length === 0) {
      //first failure
      process.stdout.write(chalk.red(` ✘  (${assert.name})`) + '\n')
      console.log(chalk.red('          . . .'))
    }
    failures.push(assert)
  }
})

//support console.logs
t.on('comment', function(comment) {
  console.log(comment.raw)
})

process.stdin.pipe(t)
