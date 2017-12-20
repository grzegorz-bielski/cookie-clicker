import Structure from './structure';

// buildings descriptions and stats acquired from cookie clicker wiki:
// http://cookieclicker.wikia.com/wiki/Buildings

class Cursor extends Structure {
	constructor(owned) {
		super({
			owned,
			baseCost: 15,
			refreshRate: 0.1,
			incrQuantity: 1,
			name: 'Cursor',
			picture: 'cursor.svg',
			desc: 'Autoclicks once every 10 seconds.'
		});
	}
}

class Grandma extends Structure {
	constructor(owned) {
		super({
			owned,
			baseCost: 100,
			incrQuantity: 1,
			name: 'Grandma',
			picture: 'grandma.svg',
			desc: 'A nice grandma to bake more cookies.'
		});
	}
}

class Farm extends Structure {
	constructor(owned) {
		super({
			owned,
			baseCost: 1100,
			incrQuantity: 8,
			name: 'Farm',
			picture: 'farm.svg',
			desc: 'Grows cookie plants from cookie seeds.'
		});
	}
}

class Mine extends Structure {
	constructor(owned) {
		super({
			owned,
			baseCost: 12000,
			incrQuantity: 47,
			name: 'Mine',
			picture: 'mine.svg',
			desc: 'Mines out cookie dough and chocolate chips.'
		});
	}
}

class Factory extends Structure {
	constructor(owned) {
		super({
			owned,
			baseCost: 130000,
			incrQuantity: 260,
			name: 'Factory',
			picture: 'factory.svg',
			desc: 'Produces large quantities of cookies.'
		});
	}
}

export default { Cursor, Grandma, Farm, Mine, Factory };