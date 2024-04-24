import React, { Component } from 'react';
import DiscreteSlider from "../Components/slider";
import SimpleSelect from "../Components/simpleSelect";
import RangeSlider from '../Components/douleSlider';
import SwitchLabels from "../Components/formControlLabel";
import CustomizedSlider from '../Components/douleSlider';
import Drawer from '@mui/material/Drawer';

class Menu extends Component {
    render() {
        return (
        //     <Drawer
        //     anchor="left"
        //     open={this.props.open}
        //     onClose={this.props.toggleDrawer}
        // >
            <nav className="nav menu alert-dark">

                <DiscreteSlider
                    default={50}
                    min={10}
                    max={100}
                    step={5}
                    title="Speed"
                    onCountChange={this.props.onSpeedChange}
                    isDisabled={false}
                />
                <SimpleSelect
                    pos={0}
                    onAlgoChanged={this.props.onAlgoChanged}
                    items={["Dijkstra's Algorithm",
                        "A* Algorithm", 
                        "Depth-first Search", 
                        "Breadth-first search"]} />
                <div>
                    <button
                        className='visualize-btn btn-warning btn-lg '
                        onClick={this.props.onVisualize}
                        disabled={this.props.isDisabled}
                        // style={this.isClickable()}
                    >
                        Visualize
                    </button>
                    <button
                        className='reset-btn btn-secondary m-2'
                        onClick={this.props.onRandomize}
                        disabled={this.props.isDisabled}
                        style={this.isClickable()}
                    >
                        Reset
                    </button>
                </div>
            </nav>
            // </Drawer>
        );
    }
    isClickable = () => {
        if (this.props.disable) {
            return { cursor: "not-allowed" };
        } else {
            return {};
        }
    }
}


export default Menu;