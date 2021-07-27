import React, { useEffect, useState } from 'react';
import { Card, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBLink } from "mdbreact";
import '../App.css';
import './RecipesByCategory.css';

export default function RecipesByCategory(props) {
	const { recipes, type } = props;
	const titleStyle = {
		textAlign: "center",
	};

	return (
		<div>

			<Card>
				<Card.Img variant="top" src={`/${type}-header.jpg`} />
				<Card.Body>
					<Card.Text>
						<h1 style={titleStyle}>{type.toUpperCase()} PAGE</h1>
					</Card.Text>
				</Card.Body>
			</Card>

			<Row className="justify-content-md-center">
				{recipes.map((recipe) => (
				<Col lg={true} key={recipe.id}>
					<Card style={{ width: 'auto' }} className="card">
					<Card.Img className="card-img-top" variant="top" src={(recipe.imageUrl) ? recipe.imageUrl : "/placeholder.jpg"} />
					<Card.Body className="categoriescardbody">
						<Card.Title>{recipe.recipe_name}</Card.Title>
						<Card.Text>
						Recipe Cuisine: 
						{recipe.cuisine}
						</Card.Text>
					</Card.Body >
					<ListGroup className="list-group-flush">
						<ListGroupItem className="listitem">Meal Type: {recipe.meal_type}</ListGroupItem>
					</ListGroup>
					<Card.Body className="secondcategorycardbody">
						<Button href={`/recipes/${recipe.id}`} variant="warning">VIEW RECIPE</Button>
					</Card.Body>
					</Card>
				</Col>
				))}
			</Row>

			{/* <h1 style={titleStyle}>BREAKFAST PAGE</h1> */}
		</div>
	)
}
