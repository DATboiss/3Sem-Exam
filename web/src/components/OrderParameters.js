import React from 'react';

export default function OrderParameters(props) {
    return (
        (props.tripType === "returntrip") ?
            <>
                <button className="btn btn-primary btn-lg col-6" name="totalPrice" onClick={props.compareBy}>Price</button>
                <button className="btn btn-primary btn-lg col-6" name="totalDuration" onClick={props.compareBy}>Duration</button>
            </>
            :
            <>
                <button className="btn btn-primary btn-lg col-6" name="price" onClick={props.compareBy}>Price</button>
                <button className="btn btn-primary btn-lg col-6" name="duration" onClick={props.compareBy}>Duration</button>
            </>



    )
}