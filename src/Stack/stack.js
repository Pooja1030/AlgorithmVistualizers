import React, { useState, useEffect } from 'react';
import Navbar from '../Components/navbar';
import DiscreteSlider from '../Components/slider';
import SidePanel from './sidePanelS'; // Import the SidePanel component
import './stack.css';
import { gsap } from 'gsap';

const StackVisualizer = () => {
    const [stack, setStack] = useState([]);
    const [maxSize, setSize] = useState(5);
    const [poppedDie, setPoppedDie] = useState(null);
    const [resultText, setResultText] = useState(null);
    const [currVal, setCurrVal] = useState(null);
    const [sidePanelOpen, setSidePanelOpen] = useState(false); // State to manage side panel visibility
    const [algorithmSteps, setAlgorithmSteps] = useState([]); // Define state for algorithm steps
    // const [isPlaying, setIsPlaying] = useState(false); // State to manage play-pause functionality

    useEffect(() => {
        // Define your algorithm steps here
        const steps = [
            {
                code: `1. A pointer called TOP is used to keep track of the 
top element in the stack.`
            },
            {
                code: `2. When initializing the stack, we set its value to -1 
so that we can check if the stack is empty by comparing TOP == -1.`
            },
            {
                code: `3. On pushing an element, we increase the value of TOP 
and place the new element in the position pointed to by TOP.`
            },
            {
                code: `4. On popping an element, we return the element pointed to
by TOP and reduce its value.`
            },
            {
                code: "5. Before pushing, we check if the stack is already full"
            },
            {
                code: "6. Before popping, we check if the stack is already empty"
            },
        ];

        setAlgorithmSteps(steps);
    }, []);


    const push = () => {
        setResultText(null);
        setCurrVal(null);
        if (stack.length < maxSize) {
            const newValue = Math.floor(Math.random() * 10) + 1; // Generate random value for new die
            setStack(prevStack => [...prevStack, newValue]);
        } else {
            setResultText("");
            setCurrVal('Stack is full');
        }
    };

    const pop = () => {
        if (stack.length > 0) {
            setResultText('Popped: ');
            setCurrVal(stack[stack.length - 1]);
            setPoppedDie(stack[stack.length - 1]); // Store the popped die
            setStack(prevStack => prevStack.slice(0, -1)); // Remove top die from stack
            setTimeout(() => {
                setPoppedDie(null); // Clear the popped die after the animation duration
            }, 500); // Adjust animation duration as needed
        } else {
            setResultText("");
            setCurrVal('Stack is empty');
        }
    };

    const peek = () => {
        if (stack.length > 0) {
            setResultText('Top value: ')
            setCurrVal(stack[stack.length - 1]);
            const timeline = gsap.timeline();
            timeline.to(".top", { background: "#992155", duration: 0.5 });
            timeline.to(".top", { background: "#fb21d3", duration: 0.5, delay: 1 });

        } else {
            setResultText("");
            setCurrVal('Stack is empty');
        }
    };

    const isEmpty = () => {
        setResultText('Is empty: ')
        setCurrVal(stack.length === 0 ? 'True' : 'False');
    };

    const size = () => {
        setResultText('Size: ')
        setCurrVal(stack.length);
    };

    const toggleSidePanel = () => {
        setSidePanelOpen(!sidePanelOpen);
    };

    // const togglePlayPause = () => {
    //     setIsPlaying(!isPlaying);
    // };
    // const togglePlayPause = () => {
    //     setIsPlaying(!isPlaying);
    //   };


    return (
        <>
            <Navbar currentPage="Stack" />

            {/* Side panel toggle button */}
            <button className="side-panel-toggle" onClick={toggleSidePanel}>Toggle Side Panel</button>

            {/* Render the play-pause buttons */}
            {/* <button className="play-pause-btn" onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button> */}
            {/* <button className="play-pause-btn" onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button> */}

            {/* Render the side panel component */}
            <SidePanel algorithmSteps={algorithmSteps} isOpen={sidePanelOpen} onClose={toggleSidePanel} />

            <div className="stack-visualizer">
                <div>
                    <div className="menu">
                        <DiscreteSlider
                            title='Stack size'
                            default={maxSize}
                            onCountChange={setSize}
                            step={1}
                            min={1}
                            max={10} />
                        <button className='visualize-btn' onClick={push}>Push</button>
                        <button className='reset-btn' onClick={pop}>Pop</button>
                        <button onClick={peek}>Peek</button>
                        <button onClick={isEmpty}>IsEmpty</button>
                        <button onClick={size}>Size</button>
                    </div>
                    <div className="result">{currVal !== null && `${resultText} ${currVal}`}</div>
                </div>

                <div className="stack">
                    {stack.map((value, index) => (
                        <div key={index} className={`die ${index === stack.length - 1 ? "top" : ""}`}>
                            {value}
                        </div>
                    ))}
                    {poppedDie && ( // Render the popped die with animation if it exists
                        <div className="die popped" onAnimationEnd={() => setPoppedDie(null)}>
                            {poppedDie}
                        </div>
                    )}
                </div>

                <div className="representation">
                    <div class="row mx-auto" id="pop-pseudocode">
                        <div class="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
                            <div class="ide w-100">
                                <div class="row ml-auto mr-auto 1">
                                    <h3>PUSH</h3>
                                    <span class="comment w-100 mt-1"> Add an element to the top of a stack</span>
                                    <span class="comment w-100 mt-1"> </span>
                                    <span class="comment w-100 mt-1">TIME COMPLEXITY: O(1)</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
                            <div class="ide w-100">
                                <div class="row ml-auto mr-auto 1">
                                    <h3>POP</h3>
                                    <span class="comment w-100 mt-1"> Remove an element from the top of a stack</span>
                                    <span class="comment w-100 mt-1"> </span>
                                    <span class="comment w-100 mt-1">TIME COMPLEXITY: O(1)</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
                            <div class="ide w-100">
                                <div class="row ml-auto mr-auto 1">

                                    <h3> PEEK</h3>
                                    <span class="comment w-100 mt-1">Get the value of the top element without removing it</span>
                                    <span class="comment w-100 mt-1"> </span>
                                    <span class="comment w-100 mt-1">TIME COMPLEXITY: O(1)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="explanation">
                        <h3>Explanation</h3>
                        <p>
                            The stack data structure follows the Last-In-First-Out (LIFO) principle.
                            Elements are added and removed from only one end, the top.
                            The push operation inserts a new element onto the top of the stack.
                            The pop operation removes and returns the top element from the stack.
                            The peek operation returns the value of the top element without removing it.
                            The isEmpty operation checks if the stack is empty.
                            The size operation returns the number of elements currently in the stack.
                        </p>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default StackVisualizer;
