import React, { useEffect, useState } from 'react';
import Table from "react-bootstrap/Table"
import "../styles/IndexAll.scss"
import {useNavigate} from "react-router-dom"
import {generateTotalAmount, formatString, formatAmount} from "../../../utils/helpers"


const IndexAll = ({transactions}) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const total = generateTotalAmount(transactions)

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
            <h3>Current Balance: <span className={total.includes("-") ? "withdraw" : "deposit"}>{total}</span></h3>
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
                {transactions.map((transaction) => {
                    const { id, item_name, amount, date, from, category } = transaction
                    const handleClick = () => {
                        navigate(`/transactions/${id}`)
                    }
                    return( 
                        <tr onClick={handleClick} key={id}>
                            <td>{id}</td>
                            <td>{formatString(item_name)}</td>
                            <td className={amount.includes("-") ? "withdraw" : "deposit"}>{formatAmount(amount)}</td>
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