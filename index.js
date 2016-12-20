const Redis = require('ioredis')
const ora = require('ora')

module.exports = function (src, trgt, opts) {
  const source = new Redis(src)
  const target = new Redis(trgt)

  let keyCount = 0

  const spinner = ora('Processing...').start()

  const scanOpts = {}
  if (opts.m){ scanOpts.match = opts.m }
  if (opts.c){ scanOpts.count = opts.c }

  const stream = source.scanStream(scanOpts)

  stream.on('data', (keys) => {
    const sourceTx = source.multi()
    keys.forEach((key) => sourceTx.dump(key))

    return sourceTx.exec()
    .map((resp) => resp[1]) // Strip all redis error replys
    .then((resps) => {
      const targetTx = target.multi()
      keys.forEach((key, index) => targetTx.restore(key, 0, resps[index]))

      return targetTx.exec()
    })
    .then((resps) => {
      keyCount = keyCount + keys.length
      spinner.text = `Processed ${keyCount} keys`
    })
  })

  stream.on('end', () => {
    spinner.succeed()
    process.exit()
  })
};
