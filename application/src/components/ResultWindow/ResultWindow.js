const ResultWindow = (props) => {
    console.log()
    return (
        <div>
        <h1>Results: {props.results.length}</h1>
            <ul>
                {props.results.map((serial) => <li key={serial}>{serial}</li>)}
            </ul>
        </div>
    )
}

export default ResultWindow;