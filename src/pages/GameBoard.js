      
import React , { useState , useEffect,useLayoutEffect,useRef} from "react";
import { useSelector, useDispatch } from 'react-redux'
import Missile from "../components/Missile";
import { updateArrow } from "../Redux/arrowSlice";

const GameBoard = () => {
    
    const dispatch = useDispatch()               
    //  initial coordinates of the text
    const [alienShipX, setX] = useState (0);
    const [alienShipY, setY] = useState (0);

    // initial coordinate of the missle
    const gameboardref = useRef(null);
    // Define the dimensions of the text
    const alienShipWidth = 100;
    const alienShipHeight = 100;

    useEffect (() => {

      const gameBoardElement = gameboardref.current;
      const gameboardRect = gameBoardElement.getBoundingClientRect();
      

      // the dimensions of the div
      const divWidth = gameboardRect.width;
      const divHeight = gameboardRect.height;
      // generate random coordinates within the div boundaries
      const maxX = divWidth - alienShipWidth;
      const maxY = divHeight - alienShipHeight;
      const randomX = Math.floor (Math.random () * maxX);
      const randomY = Math.floor (Math.random () * maxY);
                  
      // Set the state with the new coordinates
      setX (randomX);
      setY (randomY);
    },[]);

    


    const alienTextStyle = {
      width: `${alienShipWidth}px`,
      height: `${alienShipHeight}px`,
      color : 'white',
      position: "absolute",
      left: `${alienShipX}px`,
      top: `${alienShipY}px`,
    };


    return (
      <div ref={gameboardref} className=" mt-[5%] mx-auto w-[95%] h-[75%] bg-black" style={{position: "relative"}} onKeyDown={ (event)=>{dispatch(updateArrow(event.code))}} tabIndex={0}>
          <p  style={alienTextStyle}>ship</p> { /*the alien ship*/} 
          <Missile gameboardRef={gameboardref}  alienX = {alienShipX} alienY = {alienShipY} />
      </div>
    )
}

export default GameBoard


















    

        
 
 
   
