Array.prototype.includesCI = function (target) {
	return this.some((word) => word.toLowerCase() === target.toLowerCase());
};

console.log(['abc', 'def', 'emre'].includesCI('emRe'));
console.log(['abc', 'def', 'emre'].includesCI('xyz'));
