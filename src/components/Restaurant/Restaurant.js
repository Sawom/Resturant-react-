import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Meal from '../Meal/Meal';
import OrderList from '../OrderList/OrderList';
import './Restaurant.css';

const Restaurant = () => {
    const [meals, setMeals] = useState([]);
    const [orders, setOrders] = useState([]);
    const [display, setDisplay] = useState([]);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=fish')
            .then(res => res.json())
            .then(data =>{
                setMeals(data.meals);
                setDisplay(data.meals);
            } );
    }, []);

        useEffect( () =>{
            const storedOrder = getStoredCart();
            const savedOrder = [];

            for(const id in storedOrder){
                const addedMeal = meals.find(meal => meal.idMeal === id);
                if(addedMeal){
                    const quantity = storedOrder[id];
                    addedMeal.quantity = quantity;
                    savedOrder.push(addedMeal);
                }
            }
            setOrders(savedOrder);
        }, [meals])
    // ********
    const handleAddToOrder = meal =>{
        let newOrders = [];
        const exists = orders.find(m => m.idMeal === meal.idMeal);
        if(exists){
            const rest = orders.filter(m => m.idMeal !== meal.idMeal);
            exists.quantity = exists.quantity + 1;
            newOrders= [...rest, exists];
        }
        else{
            meal.quantity = 1;
            newOrders = [...orders, meal];
        }
        
        setOrders(newOrders);
        addToDb(meal.idMeal);
    }
    // search function
    const handleSerach = (event)=>{
        const searchItem = event.target.value;
        const matched = meals.filter((meal)=>
            // console.log(meal);
            meal.strMeal.toLowerCase().includes(searchItem.toLowerCase()));
            setDisplay(matched);
    }
    // return
    return (
        <div >
            {/* search */}
            <br />
            <div className='stle' >
                <input onChange={handleSerach} type="text" placeholder='Search here' /> <br />
            </div> <br />
            <div className="restaurant-menu">
                <Row xs={1} sm={1} md={2} lg={3} className="g-4" >
                    {
                    display.map(meal => <Meal
                        key={meal.idMeal}
                        meal={meal}
                        handleAddToOrder={handleAddToOrder}
                    ></Meal>)
                    }
                </Row>
                <div className="order-list">
                    <OrderList orders={orders}></OrderList>
                </div>
            </div>
        </div>
    );
};
export default Restaurant;