import React from 'react';

export default function OrderParameters(props) {
    return (
        (props.tripType === "returntrip") ?
            <>
                <button name="totalPrice" onClick={props.compareBy}>Price</button>
                <button name="duration1" onClick={props.compareBy}>Duration</button>
            </>
            :
            <>
                <button name="price" onClick={props.compareBy}>Price</button>
                <button name="duration" onClick={props.compareBy}>Duration</button>
            </>



    )
}