import React, {Component} from "react";
import "./style.scss";
import database2 from './database.js'

function Computer() {
    return (
        <div className='computer'>
            <Menu/>
            <Content/>
        </div>
    );
}

function Menu() {
    return (
        <div className='menu'>
            Menu
        </div>
    );
}

function Content() {

    const database = [...database2];

    const [processor, setProcessor] = React.useState(0);
    const [ram, setRam] = React.useState(0);
    const [graphic, setGraphic] = React.useState(0);
    const [power, setPower] = React.useState(0);
    const [motherboard, setMotherboard] = React.useState(0);
    const [hardDrive, setHardDrive] = React.useState(0);

    const partsID = [processor, ram, graphic, power, motherboard, hardDrive];
    const hooks = [setProcessor, setRam, setGraphic, setPower, setMotherboard, setHardDrive];
    const names = ['Processor', 'Graphic card', 'RAM', 'Power supply', 'Motherboard', 'Hard drive'];

    function getSelectedParts(database, partsID) {
        const selectedParts = partsID.map((element, id) =>
            element == 0 ? null : {name: database[id][element].name, price: database[id][element].price});

        return selectedParts;
    }

    const selectedParts = getSelectedParts(database, partsID);

    return (

        <div className='content'>
            <Form database={database} partsID={partsID} hooks={hooks} partsName={names}/>
            <Cart selectedParts={selectedParts} partsID={partsID} hooks={hooks} partsName={names}/>
        </div>
    );
}

function Form({database, partsID, hooks, partsName}) {

    return (
        <form className='form'>
            {partsName.map((partName, id) => <div key={id}>Choose {partName} for your PC <ComputerPart
                partsList={database[id]} partsID={partsID[id]} hook={hooks[id]}/></div>)}
        </form>
    );
}

function ComputerPart({partsList, partsID, hook}) {
    return (
        <select value={partsID} onChange={(e) => hook(e.target.value)}>
            {partsList.map((part, id) =>
                <option key={id} value={id}>{part.name}</option>
            )}
        </select>
    );
}

function Cart({selectedParts, partsID, hooks, partsName}) {

    function calculatePrice(selectedParts) {
        const price = selectedParts.map(part => part ? part.price : 0).reduce((acc, curr) => acc + curr);
        return price
    }

    const price = calculatePrice(selectedParts);

    function calculateNumberOfSelectedParts(selectedParts) {
        const numberOfParts = selectedParts.filter(part => part).length;
        return numberOfParts;
    }

    const numberOfParts = calculateNumberOfSelectedParts(selectedParts);

    return (
        <div className='cart'>
            <NumberOfSelectedParts numberOfParts={numberOfParts}/>
            <PartsInCart selectedParts={selectedParts} hooks={hooks} partsID={partsID} partsName={partsName}/>
            <Price price={price}/>
        </div>
    );
}

function PartsInCart({selectedParts, hooks, partsID, partsName}){
    return(
        <div>
            {selectedParts.map((element,id)=>element ? <div key={id}>{partsName[id]}: {element.name } <RemoveFromCartButton onClick={(e) => hooks[id](e)}/></div>: null)}
        </div>
    );
}

function RemoveFromCartButton({onClick}) {

    return (
        <button onClick={()=>onClick(0)}>X</button>
    );
}

function Price({price}) {

    return (
        <div>Total price: {price} zł</div>
    );
}

function NumberOfSelectedParts({numberOfParts}) {

    return (
        <div>Parts in cart: {numberOfParts}</div>
    );
}

export default Computer;