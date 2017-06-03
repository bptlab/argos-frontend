import React, {Component} from "react";
import IconHelpInactive from "material-ui/svg-icons/action/help-outline";
import IconHelp from "material-ui/svg-icons/action/help";
import IconButton from "material-ui/IconButton";
import "./../Header.css";
import help from "./../config/help";
const introJs = require('intro.js/minified/intro.min.js');

class HelpButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hintsVisible: false
		};
	}

	toggleHintsOnPage() {
		const hintsCurrentlyVisible = this.state.hintsVisible;
		if (hintsCurrentlyVisible) {
			introJs.introJs().hideHints();
		}
		else {
			introJs.introJs().showHints();
			introJs.introJs().addHints();
		}
		this.setState({
			hintsVisible: !hintsCurrentlyVisible
		});
	}

	getHelpButton() {
		let hintButton = <IconHelpInactive/>;
		let buttonTooltip = help.button.showHelpBullets;
		if (this.state.hintsVisible) {
			hintButton = <IconHelp/>;
			buttonTooltip = help.button.hideHelpBullets;
		}
		return (
			<IconButton
				tooltip={buttonTooltip}
				tooltipPosition="bottom-left"
				onTouchTap={() => this.toggleHintsOnPage()}
				className="whiteIcon">
				{hintButton}
			</IconButton>
		);
	}

	render() {
		return (
			<span>
				{this.getHelpButton()}
			</span>
		);
	}
}
export default HelpButton;