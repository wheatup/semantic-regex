# Semantic Regex

> A semantic regex compiler for javascript

## Install

```
npm i semantic-regex
```

## Basic Syntax

```
[=semantic_key=]
```

## How to Use

You may use the semantic regex to match a specific pattern, such as:

```javascript
import SementicRegex from 'semantic-regex';

// if you're using node.js
// const SementicRegex = require('semantic-regex');

console.log(/[=ipv4=]/.test('127.0.0.1'));               // true
console.log(/[=ipv4=]/.test('127.0.999.1'));             // false
console.log('hello 127.0.0.1 1992'.match(/[=ipv4=]/g));   // ['127.0.0.1']
```

In this example, `[=ipv4=]` is equivolent to `(?:(?:(?:2(?:5[0-5]|[1-4]\d)|1?[1-9]?\d))(?:\.(?:(?:2(?:5[0-5]|[1-4]\d)|1?[1-9]?\d))){3})` (ipv4 regex)


You may also register your own aliases for your regex (make sure to wrap them in non-capturing group `(?:)` to make your pattern quantifiable): 

```javascript
import { register } from 'semantic-regex';

register({
	'year': /(?:[12]\d\d\d)/
});

console.log(/[=year=]/.test('1995'));                      // true
console.log(/[=year=]/.test('3995'));                      // false
console.log('hello 127.0.0.1 1992'.match(/[=year=]/g));    // ['1992']

// you can use those aliases combined with normal regex
console.log(/[=year=]\s[=ipv4=]/.test('1992 127.0.0.1'));  // true
```

## Built-in Aliases

|alias|note|example|
| - | - | - |
|`ipv4`| Match IPv4 | `127.0.0.1`, `192.168.1.100`, `36.79.100.9` | 
|`email`| Match a common email address | `test@example.com`, `alice@test.co.jp` |
|`zh`| Match a chinese character | `你`, `好` |
|`url`| Match a url path | `https://example.com/test?foo=bar&a=b#123`, `youtube.com` |

## To-do

* Add more built-in commonly-used patterns
* Types?
* Add more test cases
