import React , { useState , useEffect} from "react";



const GameScreen = () => {
    return (
        
        <div className=" mt-[10%] h-full items-center">
            <p>Space invasion</p>
            <GameBoard/>
        </div>
    )
}
const GameBoard = () => {

 
        // the dimensions of the div
        const divWidth = 800;
        const divHeight = 546;
      
        // Define the dimensions of the text
        const textWidth = 100;
        const textHeight = 100;
      
        //  initial coordinates of the text
        const [x, setX] = useState (0);
        const [y, setY] = useState (0);
             
        const textStyle = {
            width: `${textWidth}px`,
            height: `${textHeight}px`,
            color : 'white',
            position: "absolute",
            left: `${x}px`,
            top: `${y}px`,
        };
       
        useEffect (() => {
            // generate random coordinates within the div boundaries
            const maxX = divWidth - textWidth;
            const maxY = divHeight - textHeight;
        
            const randomX = Math.floor (Math.random () * maxX);
            const randomY = Math.floor (Math.random () * maxY);
            
          
      
            // Set the state with the new coordinates
            setX (randomX);
            setY (randomY);
        },[]);
    return (
        <div className=" mt-[5%] mx-auto w-[95%] h-[75%] bg-black" style={{position: "relative"}}>
         <p style={textStyle}>Hello world</p>
        </div>
    )
}

const MainScreen = ()=> {
    return (   
            <div class="flex h-full">
                <div class="flex-1 bg-red-500">Left</div>
                <div class="flex-1 h-full w-full"><GameScreen/></div>
            </div>
            )
}

export default MainScreen;