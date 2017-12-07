export default class Structure {
	constructor({ baseCost, owned, name, refreshRate, incrQuantity }) {
		this.baseCost = baseCost;
		this.owned = owned;
		this.name = name;
		this.refreshRate = refreshRate ? refreshRate : 1;
		this.incrQuantity = incrQuantity;
	}

	getPrice(quantity = 1) {
		// magic numbers and formulas acquired from:
		// http://cookieclicker.wikia.com/wiki/Buildings
		const powBase = 1.15;
		const denominator = 0.15;

		if (quantity === 1) {
			return this.baseCost * (powBase ** this.owned);
		}
		else if (quantity >= 1){
			return (this.baseCost * (powBase ** (this.owned + quantity)) - (powBase ** this.owned)) / denominator;
		}
		
		throw new Error('quantity can\'t be lower than 1');
	}

	getCookiesPerSecond() {
		return this.owned * this.refreshRate * this.incrQuantity;
	}

	/// TODO: rest of methods
}
