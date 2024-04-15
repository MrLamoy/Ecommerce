import React from "react";
import Banner from "../components/Banner";
// import { Container } from "react-bootstrap";


export default function Home() {
  const data = {
    title: "E-Commerce MERN App",
    content: "Capstone 3",
    destination: "/products",
    label: "Buy now!",
  };

 
  const renderHome = () => {
    return (
      <>
        <Banner data={data} />
        
      </>
    );
  };

  
  return renderHome();
}
