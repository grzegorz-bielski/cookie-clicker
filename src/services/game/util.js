import Buildings from '../buildings/buildings';

export const getInitialState = (Structures = Buildings) => ( {
	name: 'Bakery',
	cookiesQuantity: 0,
	cookiesDisplay: 0,
	cookiesPerClick: 1,
	buildings: Object.keys(Structures).map(key => new Structures[key]())
});

export const transformDbState = (state, Structures = Buildings) => (
	Object.assign({}, state, { buildings: state.buildings.map(dbBuilding => {
		const CurrentStructure = Structures[dbBuilding.name];
		if (CurrentStructure) {
			return Object.assign(new CurrentStructure(), dbBuilding );
		}
	}) })
);
