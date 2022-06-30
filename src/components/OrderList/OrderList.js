import React from 'react';

const OrderList = (props) => {
    const { orders } = props;
    console.log(orders);
    let count = 0;
    for(const meal of orders){
        count = count + meal.quantity;
    }
    
    return (
        <div>
            <h6>Order List</h6>
            <h6>Items Ordered: {count}</h6>
        </div>
    );
};

export default OrderList;
