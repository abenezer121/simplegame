import React , { useState , useEffect,useLayoutEffect,useRef} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateArrow } from "../Redux/arrowSlice";
import { updateMissileProperties } from "../Redux/missileSlice";

const Missile = ({gameboardRef,alienX,alienY}) => {
   
    const dispatch = useDispatch()
    const arrow = useSelector((state) => state.arrow); // Access the 'arrow' slice of the state
    const missile = useSelector((state) => state.missile)
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
        left: `${missile.missileX}px`,
        top: `${missile.missileY}px`,
        transform: `rotate(${missile.missileAngle}deg)`,
    };




    // calculate the angle and new posiion of the missile
    const calculateAngleAndSpeed = (x,y,direction) => {
  
     let newspeed = missile.missileSpeed;
     let angle = missile.missileAngle
       
     if (direction === "ArrowUp") {
         newspeed = ( newspeed + missileAcceleration);    
     } 
 
        
     if(newspeed > maxSpeed) newspeed = maxSpeed
     if(newspeed > 0)  newspeed = newspeed - friction   
     if(newspeed < friction) newspeed = 0
       
     if (direction === "ArrowLeft") angle = missile.missileAngle - 2;
     else if (direction === "ArrowRight") angle = missile.missileAngle + 2;
       
         // Convert missileAngle from degrees to radians
     const angleInRadians = missile.missileAngle * (Math.PI / 180);
 
 
     // Calculate new positions using radians
     let newY = y - Math.cos(angleInRadians) * newspeed;
     let newX = x + Math.sin(angleInRadians) * newspeed;
 

        

     return [newX, newY,newspeed,angle];           
 }
 

    useEffect (()=>{

            
        if (arrow.code === "ArrowUp") {  
            let newXY = calculateAngleAndSpeed(missile.missileX , missile.missileY , arrow.code)
         
            dispatch(updateMissileProperties({
                speed : newXY[2],
                angle : newXY[3],
                missileX : newXY[0],
                missileY : newXY[1]
            }))

        }
        if (arrow.code === "ArrowRight") { 
            let newXY = calculateAngleAndSpeed(missile.missileX , missile.missileY , arrow.code)
            dispatch(updateMissileProperties({
                speed : newXY[2],
                angle : newXY[3],
                missileX : newXY[0],
                missileY : newXY[1]
            }))
        }
        if (arrow.code === "ArrowLeft") { 
            let newXY = calculateAngleAndSpeed(missile.missileX , missile.missileY, arrow.code)
            dispatch(updateMissileProperties({
                speed : newXY[2],
                angle : newXY[3],
                missileX : newXY[0],
                missileY : newXY[1]
            })) 
        }
        dispatch(updateArrow(""))
    },[arrow.code]) 

   

       
    // //crash with ship detector
    useEffect(() => {
        const checkShipCollion = () => {
        
            // Get the positions of the missile and the alien ship
            const _missileX = missile.missileX + missileWidth / 2;
            const _missileY = missile.missileY + missileHeight / 2;
            const _alienShipX = alienX + missileWidth / 2;
            const _alienShipY = alienY + missileHeight / 2;
           


            
           // Calculate the distance between the missile and alien ship centers
            const distance = Math.sqrt(
                Math.pow(_missileX - _alienShipX, 2) + Math.pow(_missileY - _alienShipY, 2)
            );
          
           
      
                                
            if (distance < missileWidth / 2) {

                dispatch(updateMissileProperties({
                    speed : 0,
                    angle : 0,
                    missileX : 390,
                    missileY : 610
                }))
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
        
                dispatch(updateMissileProperties({
                    speed : 0,
                    angle : 0,
                    missileX : 390,
                    missileY : 610
                }))
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



