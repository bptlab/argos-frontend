import React, { Component } from 'react';
import { css } from 'aphrodite';

class EventDiagram extends Component {
	render() {
		return (
			<div className={css(this.props.styles)}>
				404 Diagram not found
			</div>
		);
	}
}

export default EventDiagram;