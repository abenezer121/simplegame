      
import React , { useState , useEffect,useLayoutEffect,useRef} from "react";
import { useSelector, useDispatch } from 'react-redux'
import Missile from "./Missile";
import { updateArrow } from "../Redux/arrowSlice";

const GameBoard = () => {
    
    const dispatch = useDispatch()
 
                
    //  initial coordinates of the text
    const [alienX, setX] = useState (0);
    const [alienY, setY] = useState (0);

    // initial coordinate of the missle

    const gameboardref = useRef(null);


      // Define the dimensions of the text
    const textWidth = 100;
    const textHeight = 100;

      
 
    useEffect (() => {

                // the dimensions of the div
            const divWidth = 800;
            const divHeight = 546;
        
          
            // generate random coordinates within the div boundaries
            const maxX = divWidth - textWidth;
            const maxY = divHeight - textHeight;
        
            const randomX = Math.floor (Math.random () * maxX);
            const randomY = Math.floor (Math.random () * maxY);
                  
            // Set the state with the new coordinates
            setX (randomX);
            setY (randomY);
    },[]);

    


    const alienTextStyle = {
            width: `${textWidth}px`,
            height: `${textHeight}px`,
            color : 'white',
            position: "absolute",
            left: `${alienX}px`,
            top: `${alienY}px`,
    };


    

        
    const keyDownEvent = (event) => {
            
        dispatch(updateArrow(event.code))
    };
 
 
   

    return (
        <div   ref={gameboardref} className=" mt-[5%] mx-auto w-[95%] h-[75%] bg-black" style={{position: "relative"}} onKeyDown={keyDownEvent} tabIndex={0}>
          <p  style={alienTextStyle}>ship</p> { /*the alien ship*/} 
          <Missile gameboardRef={gameboardref}  alienX = {alienX} alienY = {alienY} />
        </div>
    )
}

export default GameBoard

















