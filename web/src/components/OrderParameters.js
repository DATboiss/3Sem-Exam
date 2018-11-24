import React from 'react';

export default function OrderParameters(props) {
    return (
        <div>
            <button name="price" onClick={props.compareBy}>Price</button>
            <button name="duration" onClick={props.compareBy}>Duration</button>
        </div>

    )
}