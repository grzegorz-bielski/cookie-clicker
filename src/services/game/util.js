import Buildings from '../buildings/buildings';

export const getInitialState = (Structures = Buildings) => ({
	name: 'Bakery',
	cookiesQuantity: 0,
	cookiesDisplay: 0,
	cookiesPerClick: 1,
	buildings: Structures.map(Structure => new Structure())
});

export const transformDbState = (state, Structures = Buildings) => (
	Object.assign({}, state, { buildings: state.buildings.map(dbBuilding => {
		const CurrentStructure = Structures.find(structure => structure.name === dbBuilding.name);
		if (CurrentStructure) {
			return Object.assign(new CurrentStructure(), dbBuilding );
		}
	}) })
);
