# redis-cp

Copying data to and from hosted redis instances can be challenging. Many common methods for this task are made unavailable by service providers such as AWS ElasticCache and Redis Labs. This tool uses `dump` and `restore` commands to copy data from once instance to another.

Inspired by https://github.com/stickermule/rump which is very similar but written in Go as not configurable.

## usage

```
Usage: redis-cp [options] <source> <target>

Options:
  -m, --match  A pattern to match when scanning keys                          [string]
  -c, --count  Approximate number of keys for redis to return per iteration   [number]
  --help       Show help                                                      [boolean]
```
