import { useEffect, useState } from "react";
import "./advice-generator.component.css";

export const AdviceGenerator = () => {
    const [advice, setData] = useState({"slip": {"id": 0, "advice": "Rolling the Dice"}});
    let mobileDivider =  new URL("/pattern-divider-mobile.svg", import.meta.url).href;
    let desktopDivider = new URL("/pattern-divider-desktop.svg", import.meta.url).href;
    let diceIcon = new URL("/icon-dice.svg", import.meta.url).href;
    const [displayImage, setDisplayImage] = useState(window.outerWidth > 375 ? desktopDivider : mobileDivider);
    
    //Fetches first advice slip, and handles the window resizing.

    const changeImage = () => {
        setDisplayImage(window.outerWidth > 375 ? desktopDivider : mobileDivider);
    }

    useEffect(()=> {
        fetch("https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then(data => setData(data));

        window.addEventListener('resize', changeImage);
        return () => {
            window.removeEventListener('resize', changeImage);
        }
    }, []);

    const newAdvice = () => {
        fetch("https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then(data => setData(data));
    }

    return (
        <div className="main-body flex">
            <div className="content-container flex">
                <p>Advice #{advice.slip.id}</p>
                <p>"{advice.slip.advice}"</p>
            </div>
            <div className="image-container flex">
                <img className="divider" src={displayImage}/>
                <img className="dice" src={diceIcon} onClick={newAdvice}/>
            </div>
        </div>
    );
}