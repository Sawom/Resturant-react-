import React from 'react';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './Meal.css';

const Meal = (props) => {
    const {handleAddToOrder, meal} = props;
    const { strMeal, strInstructions, strMealThumb } = props.meal;
    
    return (
        <Col className="meal">
            <img src={strMealThumb} alt="" />
            <h4>{strMeal}</h4>
            <p>{strInstructions.slice(0, 100)}</p>
            <Button onClick={() => handleAddToOrder(meal)} variant="success">Add this Food</Button>
        </Col>
    );
};

export default Meal;