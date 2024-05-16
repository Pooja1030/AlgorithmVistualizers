import React, { useState, useEffect } from 'react';
import './sidepanell.css'; // You can define your styles in this CSS file

const SidePanel = ({ algorithmSteps, isOpen, onClose, onAlgoChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [executedSteps, setExecutedSteps] = useState([]); // State to hold executed steps

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && currentStep < algorithmSteps.length - 1) {
        setCurrentStep(prevStep => prevStep + 1);
      } else {
        setIsPlaying(false); // Pause when all steps are played
      }
    }, 1000); // Change the interval as per your requirement

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, algorithmSteps]);

  const togglePlayPause = () => {
    if (executedSteps.length === algorithmSteps.length) {
      // If all steps are executed, reset and start again
      setCurrentStep(0);
      setExecutedSteps([]);
    }
    setIsPlaying(!isPlaying);
  };

  const rewind = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
      setExecutedSteps(prevSteps => prevSteps.slice(0, currentStep - 1));
    }
  };

  const forward = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, algorithmSteps.length - 1));
  };

  const handleClose = () => {
    setIsPlaying(false); // Stop playback when closing
    setCurrentStep(0); // Reset step when closing
    onClose();
  };

  const handleAlgoChange = (pos, val) => {
    setCurrentStep(0); // Reset step when algorithm changes
    setExecutedSteps([]);
    onAlgoChange(pos, val);
  };

  useEffect(() => {
    if (isPlaying) {
      setExecutedSteps(prevSteps => [...prevSteps, algorithmSteps[currentStep]]);
    }
  }, [currentStep, isPlaying, algorithmSteps]);

  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}>
      {/* Close button on top */}
      <button className="close-btn" onClick={handleClose}>
        <span>&#8592;</span>
      </button>
      {/* Buttons in a row */}
      <div className="buttons-row">
        <button className="toggle-btn" onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="rewind-btn" onClick={rewind}>
          Rewind
        </button>
        <button className="forward-btn" onClick={forward}>
          Forward
        </button>
      </div>
      {/* Panel content */}
      {isOpen && (
        <div className="panel-content">
          {/* Render the code related to current step */}
          {executedSteps.map((step, index) => (
            <p key={index}>{step.code}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidePanel;