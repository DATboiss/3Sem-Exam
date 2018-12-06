import React from 'react';

export default function OrderParameters(props) {
    return (
        //TODO make duration on retuntrips total duration
        (props.tripType === "returntrip") ?
            <div>
                <button name="totalPrice" onClick={props.compareBy}>Price</button>
                <button name="duration1" onClick={props.compareBy}>Duration</button>
            </div>
            :
            <div>
                <button name="price" onClick={props.compareBy}>Price</button>
                <button name="duration" onClick={props.compareBy}>Duration</button>
            </div>



    )
}