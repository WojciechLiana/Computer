import React, {Component} from "react";
import "./style.scss";
import exportedDatabase from './database.js'

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

    const database = [...exportedDatabase];

    const [selectedProcessorId, setProcessorId] = React.useState(-1);
    const [selectedRamId, setRamId] = React.useState(-1);
    const [selectedGraphicId, setGraphicId] = React.useState(-1);
    const [selectedPowerId, setPowerId] = React.useState(-1);
    const [selectedMotherboardId, setMotherboardId] = React.useState(-1);
    const [selectedHardDriveId, setHardDriveId] = React.useState(-1);

    const idsOfSelectedParts = [selectedProcessorId, selectedRamId, selectedGraphicId, selectedPowerId, selectedMotherboardId, selectedHardDriveId];
    const setIdFunctions = [setProcessorId, setRamId, setGraphicId, setPowerId, setMotherboardId, setHardDriveId];
    const partsName = ['Processor', 'Graphic card', 'RAM', 'Power supply', 'Motherboard', 'Hard drive'];

    function getSelectedParts(database, idsOfSelectedParts) {

        const selectedParts = idsOfSelectedParts.map((selectedId, id) =>
            selectedId == -1 ? null : {name: database[id][selectedId].name, price: database[id][selectedId].price, id:id});
        return selectedParts;
    }

    const selectedParts = getSelectedParts(database, idsOfSelectedParts);

    return (
        <div className='content'>
            <Form database={database} partsID={idsOfSelectedParts} handleIdChanges={setIdFunctions}
                  partsName={partsName}/>
            <Cart selectedParts={selectedParts} partsID={idsOfSelectedParts} handleIdChanges={setIdFunctions}
                  partsName={partsName}/>
        </div>
    );
}

function Form({database, partsID, handleIdChanges, partsName}) {

    return (
        <form className='form'>
            {partsName.map((partName, id) => <div key={id}>Choose {partName} for your PC <ComputerPart
                partsList={database[id]} partsID={partsID[id]} hook={handleIdChanges[id]}/></div>)}
        </form>
    );
}

function ComputerPart({partsList, partsID, hook}) {
    return (
        <select value={partsID} onChange={(e) => hook(e.target.value)}>
            <option value={-1}>Choose part</option>
            {partsList.map((part, id) =>
                <option key={id} value={id}>{part.name}</option>
            )}
        </select>
    );
}

function Cart({selectedParts, partsID, handleIdChanges, partsName}) {

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
            <PartsInCart selectedParts={selectedParts} hooks={handleIdChanges} partsName={partsName}/>
            <TotalPrice price={price}/>
        </div>
    );
}

function PartsInCart({selectedParts, hooks, partsName}) {
    return (
        <div>
            {selectedParts.map((element, id) => element ?
                <div key={id}>{partsName[id]}: {element.name} <RemoveFromCartButton onClick={(e) => hooks[id](e)}/>
                </div> : null)}
        </div>
    );
}

function RemoveFromCartButton({onClick}) {

    return (
        <button onClick={() => onClick(-1)}>X</button>
    );
}

function TotalPrice({price}) {

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