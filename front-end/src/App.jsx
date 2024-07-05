import './App.scss'
import { Routes, Route } from 'react-router-dom'
import {useEffect, useState} from "react"
import "bootstrap/dist/css/bootstrap.min.css"

/* Components */
import Header from './Components/Navbar/Header'
import IndexAll from './Components/MainDisplay/IndexAll/IndexAll'
import Footer from './Components/Footer/Footer'
import ShowOne from "./Components/MainDisplay/ShowOne/ShowOne"
import Edit from './Components/MainDisplay/Edit/Edit'
import NewTransaction from './Components/MainDisplay/New/NewTransaction'
import Home from './Components/MainDisplay/Home/Home'

function App() {

  const API = import.meta.env.VITE_BASE_URL
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(res => setTransactions(res))
      .catch(err => console.error(err))
  },[])

  return (
    <>
      <Header/>
      <div className='container__routes'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/transactions' element={<IndexAll transactions={transactions}/>}/>
          <Route path='/transactions/new' element={<NewTransaction setTransactions={setTransactions}/>}/>
          <Route path='/transactions/:id' element={<ShowOne transactions={transactions} setTransactions={setTransactions}/>}/>
          <Route path='/transactions/:id/edit' element={<Edit transactions={transactions} setTransactions={setTransactions}/>}/>
        </Routes>
      </div>
      <Footer/>  
    </>
  )
}

export default App
