import React, {Component} from "react";
import "./style.scss";

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

    const processorList = [['Choose part ', ''], ['intel i3 ', 1000], ['intel i5 ', 1200], ['intel i7 ', 1500], ['intel i9 ', 1900], ['AMD K5 ', 1000], ['AMD K6 ', 1200],
        ['AMD K7 ', 1500], ['AMD K8 ', 1900]];
    const cardsList = [['Choose part ', ''], ['GeForce 700 ', 700], ['GeForce 800 ', 800], ['GeForce 900 ', 900], ['GeForce 1000 ', 1000], ['Radeon Rx 2xx ', 700],
        ['Radeon Rx 3xx ', 800], ['Radeon Rx 4xx ', 900], ['Radeon Rx 5xx ', 1000]];
    const ramList = [['Choose part ', ''], ['4 GB ', 200], ['8 GB ', 600], ['16 GB ', 1000]];
    const powerSupplyList = [['Choose part ', ''], ['500 W ', 200], ['600 W ', 300], ['700 W ', 400], ['800 W ', 500], ['1000 W ', 600]];
    const motherboardList = [['Choose part ', ''], ['MSI ', 500], ['Gigabyte ', 600], ['Asus ', 500], ['ASRock ', 600]];
    const hardDriveList = [['Choose part ', ''], ['200 GB ', 400], ['500 GB ', 500], ['800 GB ', 600], ['1TB ', 700]];

    const database = [processorList, cardsList, ramList, powerSupplyList, motherboardList, hardDriveList];

    const [processor, setProcessor] = React.useState(0);
    const [ram, setRam] = React.useState(0);
    const [graphic, setGraphic] = React.useState(0);
    const [power, setPower] = React.useState(0);
    const [motherboard, setMotherboard] = React.useState(0);
    const [hardDrive, setHardDrive] = React.useState(0);

    const partsID = [processor, ram, graphic, power, motherboard, hardDrive];
    const hooks = [setProcessor, setRam, setGraphic, setPower, setMotherboard, setHardDrive];
    const names = ['Processor', 'RAM', 'Graphic card', 'Power supply', 'Motherboard', 'Hard drive'];

    return (
        <div className='content'>
            <Form database={database} partsID={partsID} hooks={hooks} names={names}/>
            <Cart database={database} partsID={partsID} hooks={hooks}/>
        </div>
    );
}

function Form({database, partsID, hooks, names}) {

    return (
        <form className='form'>
            {names.map((element, id) => <div key={id}>Choose {names[id]} for your PC <ComputerPart
                database={database[id]}
                partsID={partsID[id]}
                hooks={hooks[id]}/>
            </div>)}
        </form>
    );
}

function ComputerPart({database, partsID, hooks}) {
    return (
        <select value={partsID} onChange={(e) => hooks(e.target.value)}>
            {database.map((element, id) =>
                <option key={id} value={id}>{database[id]}</option>
            )}
        </select>
    );
}

function Cart({database, partsID, hooks}) {

    return (
        <div className='cart'>
            <NumberOfSelectedParts parts={partsID}/>
            {database.map((element, id) => (<div key={id}>
            <span>{element[partsID[id]]}</span><RemoveFromCartButton partsID={partsID} onClick={(e) => hooks[id](e)}/>
            </div>))}
            <Price part={database} partId={partsID}/>
        </div>
    );
}

function RemoveFromCartButton({onClick, partsID}) {
    return (
        <button onClick={() => onClick(0)}>X</button>
    );
}

function Price({part, partId}){

    const price2 = partId.map((element, id)=>(element == 0 ? 0 : part[id][element][1])).reduce((acc, curr)=> acc + curr);

    return(
        <div>Total price: {price2} zl</div>
    );
}

function NumberOfSelectedParts({parts}){

    const numberOfParts = parts.filter(element=>element>0).length;

    return(
        <div>Parts in cart: {numberOfParts}</div>
    );
}

export default Computer;