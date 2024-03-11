import React from "react";

const Tenzies = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="dice" style={styles} onClick={props.handleClick}>
            {props.values}
        </div>  
    );    
}

export default Tenzies;
