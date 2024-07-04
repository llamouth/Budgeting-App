import React, { useEffect, useState } from 'react';
import Table from "react-bootstrap/Table"
import "../styles/IndexAll.scss"
import {useNavigate} from "react-router-dom"
import {generateTotalAmount, formatString, formatAmount} from "../../../utils/helpers"


const IndexAll = ({transactions}) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(transactions.length > 0){
            setLoading(false)
        }
    },[transactions])

    if (loading) {
        return <p>Loading transactions...</p>;
    }
    
    return (
        <div className='table-container'>
            <h1>Weekly Amount Spent: {generateTotalAmount(transactions)}</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>        
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>From</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                {transactions.map((transaction, i) => {
                    // console.log(transaction)
                    const { id, item_name, amount, date, from, category } = transaction
                    const handleClick = () => {
                        navigate(`/transactions/${id}`)
                    }
                    return( 
                        <tr onClick={handleClick} key={id}>
                            <td>{id}</td>
                            <td>{formatString(item_name)}</td>
                            <td>{formatAmount(amount)}</td>
                            <td>{date}</td>
                            <td>{formatString(from)}</td>
                            <td>{formatString(category)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default IndexAll;