import React from "react";
import "./style.scss";
import database from './database.json';

function Computer() {

    const [menuOption, setMenuOption] = React.useState(1);

    return (
        <div className='computer'>
            <Menu setMenuOption={(e) => setMenuOption(e)}/>
            <HomePage menuOption={menuOption}/>
            <Content menuOption={menuOption}/>
            <AboutUs menuOption={menuOption}/>
            <ContactUs menuOption={menuOption}/>
        </div>
    );
}

function Menu({setMenuOption}) {
    return (
        <div className='menu'>
            <MenuButton id={1} setMenuOption={(e) => setMenuOption(e)} label='Home page'/>
            <MenuButton id={2} setMenuOption={(e) => setMenuOption(e)} label='Order PC'/>
            <MenuButton id={3} setMenuOption={(e) => setMenuOption(e)} label='About us'/>
            <MenuButton id={4} setMenuOption={(e) => setMenuOption(e)} label='Contact'/>
        </div>
    );
}

function MenuButton({label, id, setMenuOption}) {
    return (
        <button onClick={() => setMenuOption(id)}>{label}</button>
    );
}

const HomePage = ({menuOption}) => menuOption == 1 ? <div>Best Computer Shop</div> : null;

const AboutUs = ({menuOption}) => menuOption == 3 ? <div>Wojciech Liana - React Developer</div> : null;

const ContactUs = ({menuOption}) => menuOption == 4 ?
    <div>
        <Phone phone={508539222}/>
        <Email email='wojtek.liana@gmail.com'/>
        <Map/>
    </div> : null;


const Phone = ({phone}) => <div>Phone number: {phone}</div>;
const Email = ({email}) => <div>Email adress: {email}</div>;

const Map = () => <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7242.336700790632!2d20.01624270837917!3d50.07593813738488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716453b881ad1c3%3A0x795b70441e44171f!2zQmllxYRjenlja2EsIEtyYWvDs3c!5e0!3m2!1spl!2spl!4v1585232836955!5m2!1spl!2spl"
    width="600" height="450" frameBorder="0" allowFullScreen="" aria-hidden="false"
    tabIndex="0"></iframe>

function Content({menuOption}) {
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

    if (menuOption == 2) {
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
    return null;
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
