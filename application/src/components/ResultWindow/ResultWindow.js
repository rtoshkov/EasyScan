import {Link} from "react-router-dom";

const ResultWindow = (props) => {
    console.log()
    return (
        <div>
        <h1>Results: {props.results.length}</h1>
            <ul>
                {props.results.map((serial) => <li key={serial}>{serial}</li>)}
            </ul>
            <Link to="/notion">Notion API</Link>
            <br/>
            <Link to="/inventory">Inventory File</Link>
        </div>
    )
}

export default ResultWindow;