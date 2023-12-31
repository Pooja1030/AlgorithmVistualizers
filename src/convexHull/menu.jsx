import React, {Component} from 'react';
import DiscreteSlider from "./slider";
class Menu extends Component {
    render() {
        return (
            <nav className="nav menu alert-dark">
                <div className='controls'>
              
                <DiscreteSlider
                    onChange={this.props.onChangeSpeed}
                    title="speed"
                    marks={false}
                    default={20}
                    step={1}
                    min={10}
                    max={50}
                    isDisabled={false}
                />
                <DiscreteSlider
                    onChange={this.props.onChangeValues}
                    title="Total Number"
                    marks={false}
                    default={100}
                    step={1}
                    min={10}
                    max={200}
                    isDisabled={this.props.isDisabled}
                />
                </div>
                <div>
                <button
                    className="visualize-btn btn-warning btn-lg m-2"
                    onClick={this.props.onVisualize}
                    disabled={this.props.isDisabled}
                    style={this.isClickable()}
                >
                    Visualize Graham Scan
                </button>
                <button className="reset-btn btn-primary btn-lg m-2" onClick={this.props.onRefresh} disabled={this.props.isDisabled} style={this.isClickable()}>Refresh</button>
                    </div>

            </nav>
        );
    }
    isClickable = () =>{
        if( this.props.isDisabled ){
            return {cursor: "not-allowed"};
        } else{
            return {};
        }
    }
}

export default Menu;