import React, { useState } from 'react';
import "../styles/New.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const NewTransaction = ({ setTransactions }) => {

    const API = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();
    const [method, setMethod] = useState('deposit');

    const [newTransaction, setNewTransaction] = useState({
        id: nanoid(4),
        type: "",
        item_name: "",
        amount: "",
        date: "",
        from: "",
        category: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newTransaction.item_name || !newTransaction.amount || !newTransaction.date || !newTransaction.from || !newTransaction.category) {
            setError('Please fill out all fields.');
            return;
        }

        if(method === "withdraw"){
            newTransaction.amount = "-" + newTransaction.amount
        }

        fetch(`${API}`, {
          method: 'POST',
          body: JSON.stringify(newTransaction),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((res) => {
            console.log('Response from server:', res);
            setTransactions((prevState) => [...prevState, res]);
            navigate('/transactions');
          })
          .catch((err) => {
            console.error('Error occurred:', err);
          });
      };

    const handleChange = (e) => {
        if(e.target.name === "type") {
            setMethod(e.target.value)
        }
        setNewTransaction({...newTransaction, [e.target.name]: e.target.value});
    }

    return (
        <div className="form-container">
            <h2>Create New Transaction</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Transaction type</Form.Label>
                    <Form.Select value={newTransaction.type} onChange={handleChange} name='type'>
                        <option value="deposit">Deposit</option>
                        <option value="withdraw">Withdraw</option>
                    </Form.Select>
                    <Form.Text className="text-muted">
                        Is this a deposit or withdraw?
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Item Name" onChange={handleChange} name='item_name'/>
                    <Form.Text className="text-muted">
                        What is the name of the item?
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="text" placeholder="Enter Amount" onChange={handleChange} name='amount'/>
                    <Form.Text className="text-muted">
                        How much is the item?
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter the date" onChange={handleChange} name='date'/>
                    <Form.Text className="text-muted">
                        When was this purchase made? 
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>From</Form.Label>
                    <Form.Control type="text" placeholder="Enter item origin location" onChange={handleChange} name='from'/>
                    <Form.Text className="text-muted">
                        Where did this item come from?
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={newTransaction.category} onChange={handleChange} name='category'>
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
        </div>
    );
};

export default NewTransaction;
