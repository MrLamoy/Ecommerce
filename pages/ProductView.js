import { useContext, useEffect, useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function ProductView() {
  const { user } = useContext(UserContext);

  const { productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const addToCart = (productId) => {
    const userId = user.id; 
    const quantity = 1; 

    fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        quantity: quantity
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Response from addToCart:", data);

        if (typeof data === "object") {
          Swal.fire({
            title: "Successfully Add to Cart!",
            text: "This product is added to your cart",
            icon: "success"
          });

          
          navigate("/products");
        } else if (data === false) {
          Swal.fire({
            title: "Forbidden access!",
            text: "You are an administrator.",
            icon: "error"
          });
        } else {
          Swal.fire({
            title: "Something went wrong.",
            text: "Please try again.",
            icon: "error"
          });
        }
      })
      .catch(error => {
        console.error("Error in addToCart:", error);
        Swal.fire({
          title: "Something went wrong.",
          text: "Please try again.",
          icon: "error"
        });
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
      });
  }, [productId]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>PhP {price}</Card.Text>

              {user.id !== null ? (
                <Button variant="primary" onClick={() => addToCart(productId)}>
                  Add to Cart
                </Button>
              ) : (
                <Link className="btn btn-danger btn-block" to="/login">
                  Login to Add to Cart
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
