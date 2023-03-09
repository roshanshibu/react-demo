import "./logs.css"

const Logs = (props) => {
    return (
        <div className="logContainer">
            {props.logArray.map((log, index) => {
                return (<li className="logEntry" 
                            key={index} 
                            onClick={ () => props.deleteLog(log.id)}
                            onMouseEnter={ () => props.toggleWarning()}
                            onMouseLeave={ () => props.toggleWarning()}
                            >{log.log}</li>)
            }) }
            
        </div>
    )
}

export default Logs