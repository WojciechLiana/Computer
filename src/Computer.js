import React from "react";
import "./style.scss";
import database from './database.json';

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
        return idsOfSelectedParts
            .map((selectedId, id) => {
                if (selectedId === -1) {
                    return null;
                }
                return {
                    name: database[id][selectedId].name,
                    price: database[id][selectedId].price,
                    id: id
                };
            })
            .filter(element => element);
    }

    return (
        <div className='content'>
            <Form database={database}
                  partsID={idsOfSelectedParts}
                  handleIdChanges={setIdFunctions}
                  partsName={partsName}/>
            <Cart
                selectedParts={getSelectedParts(database, idsOfSelectedParts)}
                handleIdChanges={setIdFunctions} partsName={partsName}/>
        </div>
    );
}

function Form({database, partsID, handleIdChanges, partsName}) {

    return (
        <form className='form'>
            {partsName.map((partName, id) =>
                <div key={id}>
                    Choose {partName} for your PC
                    <ComputerPart
                        partsList={database[id]}
                        partsID={partsID[id]}
                        handleIdChanges={handleIdChanges[id]}/>
                </div>)}
        </form>
    );
}

function ComputerPart({partsList, partsID, handleIdChanges}) {
    return (
        <select value={partsID} onChange={(e) => handleIdChanges(e.target.value)}>
            <option value={-1}>Choose part</option>
            {partsList.map((part, id) => <option key={id} value={id}>{part.name}</option>)}
        </select>
    );
}

function Cart({selectedParts, handleIdChanges, partsName}) {

    function calculatePrice(selectedParts) {
        if (selectedParts.length) {
            return selectedParts.map(part => part ? part.price : 0).reduce((acc, curr) => acc + curr);
        }
        return 0;
    }

    function calculateNumberOfSelectedParts(selectedParts) {
        if (selectedParts.length) {
            return selectedParts.filter(part => part).length;
        }
        return 0;
    }

    return (
        <div className='cart'>
            <NumberOfSelectedParts numberOfParts={calculateNumberOfSelectedParts(selectedParts)}/>
            <PartsInCart selectedParts={selectedParts} handleIdChange={handleIdChanges} partsName={partsName}/>
            <TotalPrice price={calculatePrice(selectedParts)}/>
        </div>
    );
}

function PartsInCart({selectedParts, handleIdChange, partsName}) {
    return (
        <div>
            {selectedParts.map((element) => element ?
                <div key={element.id}>
                    {partsName[element.id]}: {element.name}
                    <RemoveFromCartButton idOfPartToDelete={(e) => handleIdChange[element.id](e)}/>
                </div> : null)}
        </div>
    );
}

function RemoveFromCartButton({idOfPartToDelete}) {

    return (
        <button onClick={() => idOfPartToDelete(-1)}>X</button>
    );
}

const TotalPrice = ({price}) => <div>Total price: {price} zł</div>;
const NumberOfSelectedParts = ({numberOfParts}) => <div>Parts in cart: {numberOfParts}</div>;

export default Computer;
