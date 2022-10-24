const Inventory = (props) => {

    return (
        <ul>
            {props.results.map((result) => <li key={result}>{result}</li>)}
        </ul>
    )
}


export default Inventory;