import React, { useState } from 'react'
import { Table } from 'react-bootstrap';
import { Button, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Ingredients(props) {
	const [selectedIngredients, setSelectedIngredients] = useState([]);
	const [inputValue, setInputValue] = useState([]);
	const [message, setMessage] = useState({type: "", text: ""})

	const defaultOptions = {
		measure: ["unit", "cup", "ml", "l", "g", "kg", "spoon", "teaspoon", "tablespoon"]
	}

	function addIngredient() {
		let newSelectedIngredients = [...selectedIngredients]
		const ingObject = props.ingredients.find(i => i.name === inputValue)
		if (ingObject) {
			const isAdded = newSelectedIngredients.find(i => i.name === inputValue)
			if (!isAdded) {
				newSelectedIngredients.push(ingObject)
				setSelectedIngredients(newSelectedIngredients)
				props.setIngredients(newSelectedIngredients)
				setMessage({
					type: "success",
					text: "Ingredient added to the list."
				})
			} else {
				setMessage({
					type: "error",
					text: "Ingredient already added to the list."
				})
			}
		} else {
			setMessage({
				type: "error",
				text: "Ingredient not found!"
			})
		}
	}

	function handleInput(e, newInputValue) {
		// clear error message when typing
		setMessage({type: "", text: ""})
		setInputValue(newInputValue)
	}

	function handleSelectChange(e) {
		let newSelectedIngredients = [...selectedIngredients]
		newSelectedIngredients.forEach((i) => {
			if (i.name === e.target.name) {
				i.measure_type = e.target.value
			}
			return i
		})
		setSelectedIngredients(newSelectedIngredients)
		props.setIngredients(newSelectedIngredients)
	}

	function handleQtyChange(e) {
		let newSelectedIngredients = [...selectedIngredients]
		newSelectedIngredients.forEach((i) => {
			if (i.name === e.target.name) {
				i.quantity = e.target.value
			}
			return i
		})
		setSelectedIngredients(newSelectedIngredients)
		props.setIngredients(newSelectedIngredients)

	}

	function deleteIngredient(e) {
		let newSelectedIngredients = [...selectedIngredients]
		if (e.target.id) {
			newSelectedIngredients = newSelectedIngredients.filter(i => i.name !== e.target.id)
		} else {
			newSelectedIngredients = newSelectedIngredients.filter(i => i.name !== e.target.parentElement.id)
		}
		setSelectedIngredients(newSelectedIngredients ? newSelectedIngredients : [])
		props.setIngredients(newSelectedIngredients ? newSelectedIngredients : [])
	}

	return (
		<>
			{message ?
				<Alert severity={message.type}>{message.text}</Alert>
				: null}
			<Autocomplete
				id="ingredient-search"
				freeSolo
				onInputChange={handleInput}
				options={props.ingredients.map((ingredient) => ingredient.name)}
				renderInput={(params) => (
					<>
						<TextField {...params} label="Search ingredients.." margin="normal" variant="outlined" />
						<Button className="btn btn-primary" onClick={addIngredient}>ADD</Button>
					</>
				)}
			/>
			{selectedIngredients.length > 0 ?
				<Table striped bordered hover size="sm">
					<tbody>
						{selectedIngredients.map((ing) => (
							<tr key={ing.ingredient_id}>
								<td>{ing.name}</td>
								<td>
									<TextField
										id="qty"
										key={ing.ingredient_id}
										label="Quantity"
										type="number"
										name={ing.name}
										onChange={handleQtyChange}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</td>
								<td>
									<>
										<InputLabel id="demo-simple-select-label">Measure</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="measure"
											key={ing.ingredient_id}
											name={ing.name}
											onChange={handleSelectChange}
										>
											{defaultOptions.measure.map((option) => (
												<MenuItem value={option}>{option}</MenuItem>
											))}
										</Select>
									</>
								</td>
								<td><Button className="btn btn-danger" onClick={deleteIngredient} id={ing.name}>DELETE</Button></td>
							</tr>
						))}
					</tbody>
				</Table>
				: null}
		</>
	)
}
