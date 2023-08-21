const SementicRegex = require('.');

test('ipv4', () => {
	expect(/[=ipv4=]/.test('127.0.0.1')).toBe(true);
	expect(/[=ipv4=]/.test('127.0.999.1')).toBe(false);
	expect(/[=ipv4=]/g[Symbol.match]('999.0.0.999')?.[0]).toBe('99.0.0.99');
	expect(/\b[=ipv4=]\b/g[Symbol.match]('999.0.0.999')).toBeFalsy();
});

test('email', () => {
	expect('124124test+abc@gmail.com+1234'.match(/[=email=]?/g)?.[0]).toBe('124124test+abc@gmail.com');
	expect(/[=email=]/.test('abc@gmail.com')).toBe(true);
	expect(/[=email=]/.test('abc @gmail.com')).toBe(false);
});

test('zh', () => {
	expect(/^[=zh=]+$/.test('你好')).toBe(true);
	expect(/^[=zh=]+$/.test('你8好')).toBe(false);
	expect('你8好吗'.match(/[=zh=]+/g)?.[1]).toBe('好吗');
});

test('url', () => {
	expect(/^[=url=]$/.test('https://example.com/234234?ab=c&de=f#123')).toBe(true);
	expect(/^[=url=]$/.test('youtube.com')).toBe(true);
	expect(/^[=url=]$/.test('http://www.example.com.cn/234234?ab=c&de=f#123')).toBe(true);
	expect(/^[=url=]$/.test('http://www.exa mple.com.cn/234234?ab=c&de=f#123')).toBe(false);
	expect(/[=url=]/g[Symbol.match]('asdhttp://www.example.com.cn/234234?ab=c&de=f****123')?.[0]).toBe('http://www.example.com.cn/234234?ab=c&de=f');
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


test('ipv6', () => {
  expect(/[=ipv6=]/.test('240e:96c:6400:603:3::3fd')).toBe(true); // 阿里云 支持 IPV6
  expect(/[=ipv6=]/.test('240e:97c:2f:2::4c')).toBe(true); // 腾讯网 支持 IPV6
});
