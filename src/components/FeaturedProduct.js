import { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import PreviewProducts from "./PreviewProducts";

export default function FeaturedProduct(){

	const[previews, setPreviews] = useState([]);

	useEffect(() => {

		fetch(`${process.env.REACT_APP_API_URL}/products/`)
			.then(res => res.json())
			.then(data => {

				

				
				const numbers = [];
				const featured = [];

				
				const generateRandomNums = () => {

					let randomNum = Math.floor(Math.random() * data.products.length);

					if(numbers.indexOf(randomNum) === -1){
						numbers.push(randomNum);
					} else {
						generateRandomNums();
					}

				}

				
				for(let i = 0; i < 5; i++){

					generateRandomNums();

					
					featured.push(

							
							<PreviewCourses data={data.products[numbers[i]]} key={data.products[numbers[i]]._id} breakPoint={2} />
						)

				}

				
				setPreviews(featured);

			})

	}, []);

	return(

			<>
				<h2 className="text-center">Featured Products</h2>
				<CardGroup className="justify-content-center">

					{ previews }

				</CardGroup>
			</>

		)
}