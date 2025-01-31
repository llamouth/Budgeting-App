import React, { useState } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { formatString, formatAmount } from "../../../utils/helpers";
import "../styles/ShowOne.scss";

const ShowOne = ({ transactions, setTransactions }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const transaction = transactions.find(ele => ele.id === id);
    const API = import.meta.env.VITE_BASE_URL;

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        setConfirmDelete(!confirmDelete);
    };

    const deleteTransaction = () => {
        fetch(`${API}/${transactions.indexOf(transaction)}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(res => {
            navigate('/transactions');
        })
        .catch(err => console.error(err));
        transactions.splice(transactions.indexOf(transaction), 1);
        setTransactions(transactions);
    };

    return (
        <div className='transaction-container'>
            {transactions.length !== 0 && 
                <>
                    <div className="transaction-header">
                        <h2>{formatString(transaction.item_name)}</h2>
                    </div>
                    <div className="transaction-details">
                        <p className="transaction-id">ID: {id}</p>
                        <p>Type: {formatString(transaction.type)}</p>
                        <p>Amount: {formatAmount(transaction.amount)}</p>
                        <p>Date: {transaction.date}</p>
                        <p>From: {formatString(transaction.from)}</p>
                        <p>Category: {formatString(transaction.category)}</p>
                    </div>
                </>
            }
            <div className='btn-container'>
                <Button onClick={handleDelete}>Delete</Button>
                <Link to={`/transactions/${id}/edit`}>
                    <Button>Edit</Button>
                </Link>
            </div>
            {confirmDelete && 
                <>
                    <div className='confirmDelete-overlay'></div>
                    <div className='confirmDelete'>
                        <p>Are you sure you want to delete this transaction?</p>
                        <div className="delete-buttons">
                            <Button onClick={deleteTransaction}>Yes</Button>
                            <Button onClick={handleDelete}>No</Button>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ShowOne;
