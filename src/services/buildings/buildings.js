import Structure from './structure';

class Cursor extends Structure {
	constructor(owned) {
		super({
			owned,
			baseCost: 15,
			name: 'Cursor',
			refreshRate: 0.1,
			incrQuantity: 1
		});
	}
}

class Grandma extends Structure {
	constructor(owned) {
		super({
			owned,
			baseCost: 100,
			name: 'Grandma',
			incrQuantity: 1
		});
	}
}

class Farm extends Structure {
	constructor(owned) {
		super({
			owned,
			baseCost: 1100,
			name: 'Farm',
			incrQuantity: 8
		});
	}
}

class Mine extends Structure {
	constructor(owned) {
		super({
			owned,
			baseCost: 12000,
			name: 'Mine',
			incrQuantity: 47
		});
	}
}

class Factory extends Structure {
	constructor(owned) {
		super({
			owned,
			baseCost: 130000,
			name: 'Factory',
			incrQuantity: 260
		});
	}
}

export default [ Cursor, Grandma, Farm, Mine, Factory ];