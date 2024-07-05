import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/Edit.scss';

const Edit = ({ transactions, setTransactions }) => {

    const API = import.meta.env.VITE_BASE_URL;
    const [transaction, setTransaction] = useState({
        item_name: "",
        amount: "",
        date: "",
        from: "",
        category: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const singleTransaction = transactions.find(ele => ele.id === id);

    useEffect(() => {
        if (singleTransaction) {
            fetch(`${API}/${transactions.indexOf(singleTransaction)}`)
                .then(res => res.json())
                .then(res => setTransaction(res))
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelect = (e) => {
        setTransaction({...transaction, category: e.target.value})
    }

    const handleSubmit = (e) => { 
        e.preventDefault();

        if (!transaction.item_name || !transaction.amount || !transaction.date || !transaction.from || transaction.category === "Select category...") {
            console.error('Please fill out all fields.');
            return <h1>'Please fill out all fields.'</h1>
        }

        fetch(`${API}/edit/${transactions.indexOf(singleTransaction)}`, {
            method: "PUT",
            body: JSON.stringify(transaction),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                setTransactions(prevTransactions => prevTransactions.map(tran => tran.id === id ? res : tran));
                navigate(`/transactions/${id}`);
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="form-container">
            {singleTransaction &&
                <>
                    <h2>Edit Transaction</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Item Name" value={transaction.item_name} onChange={handleChange} name='item_name' />
                            <Form.Text className="text-muted">
                                What is the name of the item?
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" placeholder="Enter Amount" value={transaction.amount} onChange={handleChange} name='amount' />
                            <Form.Text className="text-muted">
                                How much is the item?
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter the date" value={transaction.date} onChange={handleChange} name='date' />
                            <Form.Text className="text-muted">
                                When was this purchase made?
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>From</Form.Label>
                            <Form.Control type="text" placeholder="Enter item origin location" value={transaction.from} onChange={handleChange} name='from' />
                            <Form.Text className="text-muted">
                                Where did this item come from?
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={transaction.category} onChange={handleSelect} name='category'>
                                <option value="">Select category...</option>
                                <option value="savings">Savings</option>
                                <option value="leisure">Leisure</option>
                                <option value="housing">Housing</option>
                                <option value="groceries">Groceries</option>
                            </Form.Select>
                            <Form.Text className="text-muted">
                                What is the category for this item?
                            </Form.Text>
                        </Form.Group>
                        <Button as="input" type="submit" value="Submit" />
                    </Form>
                </>
            }
        </div>
    );
};

export default Edit;
