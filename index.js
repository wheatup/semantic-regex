(() => {
	if (RegExp.__extended) return;

	const SYNTAX = /\[=([\w$-]+)=\]/g;

	const REG_MAP = {
		'ipv4': /(?:(?:(?:2(?:5[0-5]|[1-4]\d)|1?[1-9]?\d))(?:\.(?:(?:2(?:5[0-5]|[1-4]\d)|1?[1-9]?\d))){3})/,
		// from https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
		'email': /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
		'zh': /[\u4e00-\u9fa5]/,
		// from https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
		'url': /(?:(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*))/
	};

	const REGEXP_INJECTIONS = ['exec', 'test', Symbol.match, Symbol.matchAll, Symbol.replace, Symbol.search, Symbol.split];

	const orgFuncMap = REGEXP_INJECTIONS.reduce((acc, cur) => {
		acc[cur] = RegExp.prototype[cur];
		return acc;
	}, {})

	const compileRegExp = regexp => {
		if (!(regexp instanceof RegExp) || regexp.__extended || regexp === SYNTAX || regexp.sticky) return regexp;
		const source = SYNTAX[Symbol.replace](regexp.source, (match, key) => REG_MAP[key]?.source ?? match);
		const flags = regexp.flags;
		const result = new RegExp(source, flags);
		result.lastIndex = regexp.lastIndex;
		result.__extended = true;
		return result;
	}

	const init = () => {
		REGEXP_INJECTIONS.forEach(key => {
			RegExp.prototype[key] = function (...args) {
				return orgFuncMap[key].apply(compileRegExp(this), args);
			}
		});
	}

	init();
	RegExp.__extended = true;

	if (typeof module !== 'undefined') {
		module.exports = {
			register: map => {
				Object.assign(REG_MAP, map)
				init();
			}
		};
	}
})();