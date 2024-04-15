import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PreviewProducts(props){

	// props is used here to get the data and breakPoint from the FeaturedCourses.js
	const { data, breakPoint } = props;

	console.log(data);

	const { _id, name, description, price } = data;

	return(

			<Col xs={12} md={ breakPoint }>
				<Card className="cardHighlight m-2">
				    <Card.Body>
				        <Card.Title className="text-center">
				            <Link to={`/products/${_id}`}>{ name }</Link>
				        </Card.Title>

				        <Card.Text className="text-center">
				            { description }
				        </Card.Text>
				    </Card.Body>

				    <Card.Footer>
				        <h5 className="text-center">{ price }</h5>
				        <Link className="btn btn-primary d-block" to={`/products/${_id}`}>Details</Link>
				    </Card.Footer>
				</Card>
			</Col>

		)

}