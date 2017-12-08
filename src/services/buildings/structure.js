export default class Structure {
	constructor({ baseCost, owned, name, refreshRate, incrQuantity }) {
		this.baseCost = baseCost;
		this.owned = owned;
		this.name = name;
		this.refreshRate = refreshRate ? refreshRate : 1;
		this.incrQuantity = incrQuantity;

		this.affordable = false;
		this.cookiesPerSecond = 0;
		this.price = this.getPrice(1);
	}

	getPrice(quantity = 1) {
		// magic numbers and formulas acquired from:
		// http://cookieclicker.wikia.com/wiki/Buildings
		const powBase = 1.15;
		const denominator = 0.15;

		if (quantity === 1) {
			return Math.ceil(this.baseCost * (powBase ** this.owned));
		}
		else if (quantity >= 1){
			return Math.ceil((this.baseCost * (powBase ** (this.owned + quantity)) - (powBase ** this.owned)) / denominator);
		}
		
		throw new Error('quantity can\'t be lower than 1');
	}

	calculateCookiesPerSecond() {
		const cps = Math.floor(10 * (this.owned * this.refreshRate * this.incrQuantity)) / 10;
		this.cookiesPerSecond = cps;
		return cps;
	}

	checkIfAffordable(cookies, quantity = 1) {
		const price = this.getPrice(quantity);
		const affordable = cookies >= price;
		this.affordable = affordable;
		return affordable;
	}

	buy(cookies, quantity = 1) {
		const price = this.getPrice(quantity);
		if (cookies >= price) {
			this.owned += quantity;
		}

		// calculate next price of structure
		this.price = this.getPrice();

		// return current price
		return price;
	}
}
