const SementicRegex = require('.');

test('ipv4', () => {
	expect(/[=ipv4=]/.test('127.0.0.1')).toBe(true);
	expect(/[=ipv4=]/.test('127.0.999.1')).toBe(false);
	expect(/[=ipv4=]/g[Symbol.match]('999.0.0.999')?.[0]).toBe('99.0.0.99');
	expect(/\b[=ipv4=]\b/g[Symbol.match]('999.0.0.999')).toBeFalsy();
});

test('custom', () => {
	SementicRegex.register({
		'echo': /echo/
	});

	expect(/[=echo=]/.test('echo')).toBe(true);
	expect(/[=ECHO=]/.test('echo')).toBe(false);
	expect(/[=echo=]/i.test('EcHo')).toBe(true);
	expect(/[=echo=]\s[=email=]/i.test('EcHo abc@gmail.com')).toBe(true);
});