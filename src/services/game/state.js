import Buildings from '../buildings/buildings';
// load app state from db or use default one
const loadAppState = () => (
	// if (!dbClient.get('app')) then return default state
	{
		name: 'Bakery',
		cookiesQuantity: 0,
		cookiesDisplay: 0,
		cookiesPerClick: 1,
		buildings: Buildings.map(building => ({ name: building.name, quantity: building.name === 'Cursor' ? 0 : 0 }))
	}
);

// normalize to get JS objects
const transformAppState = state => (
	typeof state === 'string' ? JSON.parse(state) : state
);

// construct buildings
const buildAppState = state => (
	{ ...state, buildings: state.buildings.map(({ quantity, name }) => {
		const CurrentBuilding = Buildings.find(building => building.name === name);
		return CurrentBuilding ? new CurrentBuilding(quantity) : void 0;
	}) }
);

// export default () => buildAppState(transformAppState(loadAppState()));

class StateService {
	constructor({ db, Buildings }) {
		this.db = db;
		this.Buildings = Buildings;
	}

	loadState() {
		return Promise.resolve(buildAppState(transformAppState(loadAppState())));
	}
}

export default StateService;
