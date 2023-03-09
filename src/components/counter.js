import './counter.css';
import React from "react"
import Logs from './logs/logs';


class Counter extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      incValue: 0,
      decValue: 0,
      showLogs: false,
      logs: [],
      showWarning: false,
    }
    // this.handleCounter = this.handleCounter.bind(this);
    // this is not needed if handleCounter is an arrow function
    // arrow functions extend their scope to that of their parents
    // hence setState (which is not within ths scope of handleCounter) can be accessed
  }

  handleCounter = (sign) => {
    let oldValue = this.state.counter
    let newValue = null

    if (sign === "+"){
      newValue = oldValue + this.state.incValue
      this.setState({
        counter: this.state.counter + this.state.incValue,
        incValue: 0,
      })
    }else if (sign === "-" && this.state.counter > 0){
      newValue = oldValue + this.state.decValue
      this.setState({
        counter: this.state.counter - this.state.decValue,
        decValue: 0,
      })
    }

    let newLog = {
        id: Math.random(100), 
        log: `Previous value [ ${oldValue} ], Operation [ ${sign === "+" ? "Added" : "Subtract" } ] , New value [ ${newValue} ]`
    }

    this.setState({logs: [...this.state.logs, newLog]})

    
  }

  handleOperation = (event) => {
    if (event.target.id === "value_inc")
      this.setState({incValue: +event.target.value})
    else
      this.setState({decValue: +event.target.value})
  }

  toggleLogs = () => {
    this.setState({showLogs : !this.state.showLogs})
  }

  deleteLogs = (deleteID) => {
    console.log(`delete log with id ${deleteID}`)
    let tmpArray = this.state.logs.filter(log => log.id !== deleteID)
    console.log(tmpArray)
    this.setState({logs: tmpArray})
  }
  
  toggleWarning = () => {
    this.setState({showWarning: !this.state.showWarning})
  }

  render () {
    return (
      <div className="main">
        <div>
          <h1>Counter</h1>
        </div>
        <div>
          <h3>Value of Counter: {this.state.counter}</h3>
        </div>
        <div className='buttons'>
          <div className='action_section'>
            <form>
              <input value={this.state.incValue}
                type="number" id="value_inc"
                placeholder="0"
                onChange={(e)=>this.handleOperation(e)}>
              </input>
            </form>
            <button 
              className="button button_inc" 
              onClick={() => this.handleCounter("+")}>
              Increase
            </button>
          </div>
          <div className='action_section'>
            <form>
                <input value={this.state.decValue}
                  type="number" id="value_dec"
                  placeholder="0"
                  onChange={(e)=>this.handleOperation(e)}
                  >
                </input>
            </form>
            <button 
              className="button button_dec" 
              onClick={() => this.handleCounter("-")}>
              Decrease
            </button>
          </div>
        </div>
        <div className='logs'>
          <button className='button button_info'
            style={{backgroundColor: "black", color:"white"}}
            onClick={() => this.toggleLogs()} >
            Show Logs
          </button>
          {this.state.showLogs && ( 
            <div className='logs_container'>
                <div className='warning_container'>
                    <p className={this.state.showWarning ? "warning" : "hidden"}> 'Click to delete'</p>
                </div>
                <Logs   logArray={this.state.logs} 
                        deleteLog={this.deleteLogs} 
                        toggleWarning={this.toggleWarning} />
            </div>
          )}
        </div>
      </div>
    );
  }

}

export default Counter;
