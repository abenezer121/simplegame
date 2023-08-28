      
import React , { useState , useEffect,useLayoutEffect,useRef} from "react";


const GameBoard = () => {
                
                
    //  initial coordinates of the text
    const [alienX, setX] = useState (0);
    const [alienY, setY] = useState (0);

    // initial coordinate of the missle
    const [missleX , setMissleX] = useState(390)
    const [missleY , setMissileY] = useState(610)
    const [missileSpeed , setMissileSpeed] = useState(0)
    const [ , setMissileAcceleration] = useState(0.2)
    // init missle pointing angle
    const [missileAngle , setMissileAngle] = useState(0)
    const gameboardref = useRef(null);
    const missileRef = useRef(null);
    const alienShipRef = useRef(null)

 


      // Define the dimensions of the text
    const textWidth = 100;
    const textHeight = 100;
    const friction = 0.05;
    const maxSpeed = 5; 
    const missileAcceleration = 0.2
  
     
 
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

    
    //crash with ship detector

    useEffect(() => {


        const alienShipElement = alienShipRef.current;
        const missileElement = missileRef.current;
    
        const checkShipCollion = () => {
            const alienShipRect = alienShipElement.getBoundingClientRect();
            const missileRect = missileElement.getBoundingClientRect();
        
            // Get the positions of the missile and the alien ship
        const _missileX = missleX + textWidth / 2;
        const _missileY = missleY + textHeight / 2;
        const _alienShipX = alienX + textWidth / 2;
        const _alienShipY = alienY + textHeight / 2;
           
           // Calculate the distance between the missile and alien ship centers
            const distance = Math.sqrt(
                Math.pow(_missileX - _alienShipX, 2) + Math.pow(_missileY - _alienShipY, 2)
            );
                                
            if (distance < textWidth / 2) {
                setMissleX(390);
                setMissileY(610);
                setMissileAngle(0)
                setMissileSpeed(0)

            }
        };
    
        window.addEventListener('resize', checkShipCollion);
        checkShipCollion();
    
        return () => {
          window.removeEventListener('resize', checkShipCollion);
        };
      }, );


    // crash with wall detector
    useEffect(() => {
        const gameBoardElement = gameboardref.current;
        const missileElement = missileRef.current;

        
        const checkWallCollsion = () => {
            const gameboardRect = gameBoardElement.getBoundingClientRect();
            const missileRect = missileElement.getBoundingClientRect();
        
            if (missileRect.top >= gameboardRect.top &&missileRect.left >= gameboardRect.left &&missileRect.right <= gameboardRect.right &&missileRect.bottom <= gameboardRect.bottom) {
                
            }else{
        
                setMissleX(390);
                setMissileY(610);
                setMissileAngle(0)
                setMissileSpeed(0)

            }
        };
    
        window.addEventListener('resize', checkWallCollsion);
        checkWallCollsion();
    
        return () => {
          window.removeEventListener('resize', checkWallCollsion);
        };
      }, );


        const alienTextStyle = {
            width: `${textWidth}px`,
            height: `${textHeight}px`,
            color : 'white',
            position: "absolute",
            left: `${alienX}px`,
            top: `${alienY}px`,
        };


        const missileTextStyle = {
            width: `${textWidth}px`,
            height: `${textHeight}px`,
            color : 'white',
            position: "absolute",
            left: `${missleX}px`,
            top: `${missleY}px`,
            transform: `rotate(${missileAngle}deg)`,
        };

        
    
 
 
        // calculate the angle and new posiion of the missile
        const calculateAngleAndSpeed = (x,y,direction) => {
 
            let newspeed = missileSpeed;
            let angle = missileAngle
          
             if (direction === "ArrowUp") {
                newspeed = ( missileSpeed+ missileAcceleration);
             
            } 

           
            if(newspeed > maxSpeed) newspeed = maxSpeed
            if(missileSpeed > 0)  newspeed = newspeed - friction   
            if(newspeed < friction) newspeed = 0
          
            if (direction === "ArrowLeft") angle = missileAngle - 2;
            else if (direction === "ArrowRight") angle = missileAngle + 2;
          
            // Convert missileAngle from degrees to radians
            const angleInRadians = missileAngle * (Math.PI / 180);


           // Calculate new positions using radians
            let newY = y - Math.cos(angleInRadians) * newspeed;
            let newX = x + Math.sin(angleInRadians) * newspeed;

            
           
           
            setMissileSpeed(newspeed)
            setMissileAngle(angle)
           
            
            return [newX, newY];           
        }
        const keyDownEvent = (event) => {
     
       
      
          if (event.code === "ArrowUp") {
     
            let newXY = calculateAngleAndSpeed(missleX , missleY , event.code)
            setMissleX(() => newXY[0] );
            setMissileY(() =>  newXY[1] )
           
        }



        if (event.code === "ArrowRight") { 
            let newXY = calculateAngleAndSpeed(missleX , missleY , event.code)
            setMissleX(() => newXY[0] );
            setMissileY(() =>  newXY[1] )
        }
        
        if (event.code === "ArrowLeft") { 
            let newXY = calculateAngleAndSpeed(missleX , missleY , event.code)
            setMissleX(() => newXY[0] );
            setMissileY(() =>  newXY[1] ) 
        }
        };

    return (
        <div   ref={gameboardref} className=" mt-[5%] mx-auto w-[95%] h-[75%] bg-black" style={{position: "relative"}} onKeyDown={keyDownEvent} tabIndex={0}>
         <p ref={alienShipRef} style={alienTextStyle}>ship</p> {/* the alien ship*/}
         <p ref={missileRef} style={missileTextStyle}>|</p> {/* the missile*/}
        </div>
    )
}

export default GameBoard