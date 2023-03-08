import './App.css';
import React from "react"
import Logs from './components/logs';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 0,
      incValue: 0,
      decValue: 0,
      showLogs: false,
    }
    // this.handleCounter = this.handleCounter.bind(this);
    // this is not needed if handleCounter is an arrow function
    // arrow functions extend their scope to that of their parents
    // hence setState (which is not within ths scope of handleCounter) can be accessed
  }

  handleCounter = (sign) => {
    if (sign === "+"){
      this.setState({
        counter: this.state.counter + this.state.incValue,
        incValue: 0,
      })
    }else if (sign === "-" && this.state.counter > 0){
      this.setState({
        counter: this.state.counter - this.state.decValue,
        decValue: 0,
      })
    }
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
              <Logs />
            </div>
          )}
        </div>
      </div>
    );
  }

}

export default App;
