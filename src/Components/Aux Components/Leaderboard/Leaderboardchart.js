import React, { Component } from 'react'
import BarChart from 'react-bar-chart';
 
const data = [
  {text: 'Man', value: 340}, 
  {text: 'Woman', value: 60} 
];
 
const margin = {top: 20, right: 20, bottom: 30, left: 40};
 
class Chart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            width: 250
        }
    }

    // componentDidMount() {
    //     window.onresize = () => {
    //      this.setState({width: this.refs.root.offsetWidth}); 
    //     };
    // }

    render() {
        return (
            <div ref='root'>
                <div style={{width: '50%'}}> 
                    <BarChart ylabel='Quantity'
                      width={this.state.width}
                      height={500}
                      margin={margin}
                      data={data} />
                </div>
            </div>
        );
    }

}

export default Chart