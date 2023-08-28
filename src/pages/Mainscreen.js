

     

   

import React , { useState , useEffect,useLayoutEffect,useRef} from "react";



const GameScreen = () => {
                    return (
                        <div className=" mt-[10%] h-full items-center">
                            <p>Space invasion</p>
                            <GameBoard/>
                        </div>
                    )
}
        
const GameBoard = () => {
                
                
                    //  initial coordinates of the text
                    const [alienX, setX] = useState (0);
                    const [alienY, setY] = useState (0);
                
                    // initial coordinate of the missle
                    const [missleX , setMissleX] = useState(750)
                    const [missleY , setMissileY] = useState(450)
                    const [missileSpeed , setMissileSpeed] = useState(0)
                    const [missileAcceleration , setMissileAcceleration] = useState(0.2)
                    // init missle pointing angle
                    const [missileAngle , setMissileAngle] = useState(0)
                
                
                      // Define the dimensions of the text
                    const textWidth = 100;
                    const textHeight = 100;
                    const friction = 0.05;
                    const maxSpeed = 5; 
                  
                     
                 
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
                        const calculateAngle = (x,y,direction) => {
                 
                            let newspeed = missileSpeed;
                            let angle = missileAngle
                          
                             if (direction === "ArrowUp") {
                                newspeed = ( missileSpeed+ missileAcceleration);
                             
                            } 
                
                           
                             if(newspeed > maxSpeed) newspeed = maxSpeed
                           
                            if(missileSpeed > 0)  newspeed = newspeed - friction   
                            
                            if(newspeed < friction) newspeed = 0
                          
                            if (direction === "ArrowLeft") angle = missileAngle - 0.5;
                             
                            else if (direction === "ArrowRight") angle = missileAngle + 0.5;
                          
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
                     
                            let newXY = calculateAngle(missleX , missleY , event.code)
                            setMissleX(() => newXY[0] );
                            setMissileY(() =>  newXY[1] )
                           
                        }
                
                
                
                        if (event.code === "ArrowRight") { 
                            let newXY = calculateAngle(missleX , missleY , event.code)
                            setMissleX(() => newXY[0] );
                            setMissileY(() =>  newXY[1] )
                        }
                        
                        if (event.code === "ArrowLeft") { 
                            let newXY = calculateAngle(missleX , missleY , event.code)
                            setMissleX(() => newXY[0] );
                            setMissileY(() =>  newXY[1] ) 
                        }
                        };
                
                    return (
                        <div className=" mt-[5%] mx-auto w-[95%] h-[75%] bg-black" style={{position: "relative"}} onKeyDown={keyDownEvent} tabIndex={0}>
                         <p style={alienTextStyle}>ship</p> {/* the alien ship*/}
                         <p style={missileTextStyle}>|</p> {/* the missile*/}
                        </div>
                    )
                }
                
                const MainScreen = ()=> {
                    return (   
                            <div class="flex h-full" >
                                <div class="flex-1 bg-red-500">Left</div>
                                <div class="flex-1 h-full w-full"><GameScreen/></div>
                            </div>
                            )
                }
                
                export default MainScreen;