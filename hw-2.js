//with native includes
Array.prototype.includesCI = function (target) {
	return this.map((i) => i.toLowerCase()).includes(target) ? true : false;
};

//without native includes method
Array.prototype.includesCaseInsensitive = function (target) {
	return this.some((word) => {
		if (word.length !== target.length) {
			return false;
		} else {
			return word
				.split('')
				.every((l, i) => l.toLowerCase() === target[i].toLowerCase());
		}
	});
};

console.log(['Mercedes'].includesCaseInsensitive('mErcedes'));
