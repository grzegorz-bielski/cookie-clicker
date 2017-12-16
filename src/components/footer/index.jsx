import { h } from 'preact';

import { app } from '../../services';

class Footer {
	resetHandler = () => app.resetGame();

	render() {
		return (
			<footer>
			Icons made by
				<a
					href="http://www.freepik.com"
					title="Freepik"
				>
				Freepik
				</a>,
				<a
					href="https://www.flaticon.com/authors/dimitry-miroliubov"
					title="Dimitry Miroliubov"
				>
				Dimitry Miroliubov
				</a>,
				<a
					href="https://www.flaticon.com/authors/popcorns-arts"
					title="Icon Pond"
				>
				Icon Pond
				</a>
			from
				<a href="https://www.flaticon.com/" title="Flaticon">
				www.flaticon.com
				</a> are licensed by
				<a
					href="http://creativecommons.org/licenses/by/3.0/"
					title="Creative Commons BY 3.0"
					target="_blank"
					rel="noopener noreferrer"
				>
				CC 3.0 BY
				</a>
				<button onClick={this.resetHandler}>reset</button>
			</footer>
		);
	}
}

export default Footer;