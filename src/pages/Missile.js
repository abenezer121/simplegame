import React , { useState , useEffect,useLayoutEffect,useRef} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateArrow } from "../Redux/arrowSlice";
const Missile = ({gameboardRef,alienX,alienY}) => {
   
    const dispatch = useDispatch()
    // initial coordinate of the missle
    const [missleX , setMissleX] = useState(390)
    const [missleY , setMissileY] = useState(610)
    const [missileSpeed , setMissileSpeed] = useState(0)
    // init missle pointing angle
    const [missileAngle , setMissileAngle] = useState(0)
    const missileRef = useRef(null);



    // Define the dimensions of the text
    const missileWidth = 100;
    const missileHeight = 100;
    const friction = 0.05;
    const maxSpeed = 5; 
    const missileAcceleration = 0.2

    const missileTextStyle = {
        width: `${missileWidth}px`,
        height: `${missileHeight}px`,
        color : 'white',
        position: "absolute",
        left: `${missleX}px`,
        top: `${missleY}px`,
        transform: `rotate(${missileAngle}deg)`,
    };


    const arrow = useSelector((state) => state.arrow); // Access the 'arrow' slice of the state


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
 

    useEffect (()=>{

            
        if (arrow.code === "ArrowUp") {  
            let newXY = calculateAngleAndSpeed(missleX , missleY , arrow.code)
            setMissleX(() => newXY[0] );
            setMissileY(() =>  newXY[1] )
        }
        if (arrow.code === "ArrowRight") { 
            let newXY = calculateAngleAndSpeed(missleX , missleY , arrow.code)
            setMissleX(() => newXY[0] );
            setMissileY(() =>  newXY[1] )
        }
        if (arrow.code === "ArrowLeft") { 
            let newXY = calculateAngleAndSpeed(missleX , missleY , arrow.code)
            setMissleX(() => newXY[0] );
            setMissileY(() =>  newXY[1] ) 
        }
        dispatch(updateArrow(""))
    },[arrow.code]) 

   

       
    // //crash with ship detector
    useEffect(() => {
        const checkShipCollion = () => {
        
            // Get the positions of the missile and the alien ship
            const _missileX = missleX + missileWidth / 2;
            const _missileY = missleY + missileHeight / 2;
            const _alienShipX = alienX + missileWidth / 2;
            const _alienShipY = alienY + missileHeight / 2;
           
           // Calculate the distance between the missile and alien ship centers
            const distance = Math.sqrt(
                Math.pow(_missileX - _alienShipX, 2) + Math.pow(_missileY - _alienShipY, 2)
            );
                                
            if (distance < missileWidth / 2) {
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
      },);


    // crash with wall detector
    useEffect(() => {
        const gameBoardElement = gameboardRef.current;
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


 

    return ( <p ref={missileRef} style={missileTextStyle}>|</p> )

}

export default Missile



