const SementicRegex = (() => {
	if (RegExp.__extended) return;

	const SYNTAX = /\[=([\w$-]+)=\]/g;

	const REG_MAP = {
		'ipv4': /(?:(?:(?:2(?:5[0-5]|[1-4]\d)|1?[1-9]?\d))(?:\.(?:(?:2(?:5[0-5]|[1-4]\d)|1?[1-9]?\d))){3})/
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

	return {
		register: map => {
			Object.assign(REG_MAP, map)
			init();
		}
	}
})();

if (typeof module !== 'undefined') {
	module.exports = SementicRegex;
}