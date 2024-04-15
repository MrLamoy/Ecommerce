import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import ArchiveProducts from './ArchiveProducts';
import EditProduct from "./EditProduct";

export default function AdminView({ productsData, fetchData }) {


    const [product, setProduct] = useState([])


    //Getting the coursesData from the courses page
    useEffect(() => {
        console.log(productsData);

        const productsArr = productsData.map(product => {
            return (
                <tr className="text-center" key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td><EditProduct product={product._id} fetchData={fetchData}/></td>
                    <td><ArchiveProducts product={product._id} isActive={product.isActive} fetchData={fetchData}/></td>  
                    {/*<td><Button product={product._id}>Edit</Button> </td>  */}
                    {/*<td><Button product={product._id} className="btn-danger">Archive</Button></td>*/}
                </tr>
                )
        })

        setProduct(productsArr)

    }, [productsData])


    return(
        <>
            <h1 className="text-center my-4"> Admin Dashboard</h1>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {product}
                </tbody>
            </Table>    
        </>

        )
}