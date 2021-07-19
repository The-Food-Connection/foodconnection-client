import React from 'react'
import { Form } from 'react-bootstrap';

class SelectFC extends React.Component {
	constructor(props) {
		super(props)
	}
	//  this.props.select watches the state from outside
	render() {
		return (
			<Form.Control as="select" onChange={this.props.changeSelect} name={this.props.name} text={this.props.text}>
				<option>{this.props.text}</option>
				{this.props.options.map((option) => (
					<option value={option} key={option}>{option}</option>
				))}
			</Form.Control>
		)
	}
}

export default SelectFC;
