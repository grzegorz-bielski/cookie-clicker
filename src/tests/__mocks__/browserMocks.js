
// requestAnimationFrame mock

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// ... and changed by me.
// MIT license
Object.defineProperty(window, 'requestAnimationFrame', {
	value: (function() {
		let lastTime = 0;
		return function(callback, element) {
			let currTime = new Date().getTime();
			let timeToCall = Math.max(0, 16 - (currTime - lastTime));
			let id = window.setTimeout(() => { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}()),
	// writable allows Jest spies to ... well spy
	writable: true
});
Object.defineProperty(window, 'cancelAnimationFrameMock', {
	value(id) {
		clearTimeout(id);
	},
	writable: true
});


