import Buildings from '../buildings/buildings';
// import dbClient from '../db';

const loadAppState = () => (
	// if (!dbClient.get('app')) then return default state
	{
		name: 'Bakery',
		cookiesQuantity: 0,
		cookiesPerClick: 1,
		buildings: Buildings.map(building => ({ name: building.name, quantity: 1 }))
	}
);

const transformAppState = state => (
	typeof state === 'string' ? JSON.parse(state) : state
);

const buildAppState = state => (
	{ ...state, buildings: state.buildings.map(({ quantity, name }) => {
		const CurrentBuilding = Buildings.find(building => building.name === name);
		return CurrentBuilding ? new CurrentBuilding(quantity) : void 0;
	}) }
);

export default () => buildAppState(transformAppState(loadAppState()));