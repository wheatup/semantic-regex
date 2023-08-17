# Reg-Ext

> A semantic regex compiler for javascript

## Basic Syntax

```
[=sementic_key=]
```

## How to Use

You may use the sementic regex to match a specific pattern, such as:

```javascript
import * from 'reg-ext';

console.log(/[=ipv4=]/.test('127.0.0.1'));               // true
console.log(/[=ipv4=]/.test('127.0.999.1'));             // false
console.log('hello 127.0.0.1 1992'.match(/[=ipv4=]/g));   // ['127.0.0.1']
```

In this example, `[=ipv4=]` is equivolent to `(?:(?:(?:2(?:5[0-5]|[1-4]\d)|1?[1-9]?\d))(?:\.(?:(?:2(?:5[0-5]|[1-4]\d)|1?[1-9]?\d))){3})` (ipv4 regex)


You may also register your own aliases for your regex (make sure to wrap them in non-capturing group `(?:)` to make your pattern quantifiable): 

```javascript
import { register } from 'reg-ext';

register({
	'year': /(?:[12]\d\d\d)/
});

console.log(/[=year=]/.test('1995'));                     // true
console.log(/[=year=]/.test('3995'));                     // false
console.log('hello 127.0.0.1 1992'.match(/[=year=]/g));   // ['1992']
```

## To-do

> Add more built-in common used patterns