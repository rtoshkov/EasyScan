import {sheetAddress, sheetNames} from '../Utils/InventoryFileStructure'

const Inventory = (props) => {

    function inventoryHandler(){
        //pass
    }

    function handleCheckbox(){

    }

    const sheetAddressKeys = Object.keys(sheetAddress);

    return (
        <>
        <form onSubmit={inventoryHandler}>
            <label htmlFor="sheetAddress">Which file? </label>
            <select id="sheetAddress" name="sheetAddress">
                {
                sheetAddressKeys.map((k) => (
                 <option key={k} value={sheetAddress[k]}>{k}</option>
            ))
                }
            </select>

            <label htmlFor="sheetName">What equipment? </label>
            <select id="sheetName" name="sheetName">
                {
                    sheetNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                    ))
                }
            </select>

            <label htmlFor="save">Добави в колона Serials# ако липсва от там</label>
              <input onChange={handleCheckbox} type="checkbox" id="save" name="save" value="true"/>




        </form>

        {/*<ul>*/}
        {/*    {props.results.map((result) => <li key={result}>{result}</li>)}*/}
        {/*</ul>*/}
        </>
    )
}


export default Inventory;