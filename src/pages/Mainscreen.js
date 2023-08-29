

     

   

import React , { useState , useEffect,useLayoutEffect,useRef} from "react";
import GameBoard from "./GameBoard";


const GameScreen = () => {
                    return (
                        <div className=" mt-[10%] h-full items-center">
                            <p className="text-3xl font-bold">Space invasion</p>
                            <div className="flex mx-[3%] items-center">
                                <p className="text-xl ">Generation</p>
                                <p className="text-xl mx-[10%]">100</p>
                            </div>
                            <GameBoard/>
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