import React from 'react';
import "../styles/Home.scss"
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()

    return (
        <div className='home-container'>
            <h1 onClick={() => navigate("/transactions")}>Welcome to BudgetYaSelf!</h1>
            <p>An app where you have a better management on your expenses. To get started simply click home to view your current transactions or click new to add a new one.</p>
        </div>
    );
};

export default Home;