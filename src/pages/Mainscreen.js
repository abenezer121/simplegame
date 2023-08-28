import React from "react";



const GameScreen = () => {
    return (
        
        <div className=" mt-[10%] h-full items-center">
            <p>Space invasion</p>
            <GameBoard/>
        </div>
    )
}
const GameBoard = () => {
    return (
        <div className=" mt-[5%] mx-auto w-[95%] h-[75%] bg-black">
            <p>asdf</p>
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