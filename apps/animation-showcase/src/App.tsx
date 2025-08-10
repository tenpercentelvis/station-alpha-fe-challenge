import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import ButtonRequirement from './components/ButtonRequirement';
import PlaneIcon from './components/icons/PlaneIcon';
import TickIcon from './components/icons/TickIcon';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Book a flight');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setIsCompleted(false);
    // Reset loading state after a couple seconds (simulate api success)
    setTimeout(() => {
      setLoading(false);
      setIsCompleted(true);
      // Update the text on success
      setButtonText('Flight booked');
 
    }, 2000);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Button Animation Challenge</h1>
      </header>

      <main className="app-content">
        <section className="challenge-description">
          <h2>Challenge Requirements</h2>
          <p>
            Create a reusable button component that replicates the animation shown in the example.
          </p>
          
        </section>

        <section className="examples-section">
          <h2>Create this button</h2>
          <ButtonRequirement />
        </section>

        <section className="your-solution">
          <h2>Your Solution</h2>
          <p>Implement your animated button component and showcase it below:</p>
          <div className="solution-demo">
            
            <Button 
              onClick={handleClick}
              icon={isCompleted ? <TickIcon /> : <PlaneIcon />}
              loading={loading}
              text={buttonText}
              size="small"
            />

            <Button 
              onClick={handleClick}
              icon={isCompleted ? <TickIcon /> : <PlaneIcon />}
              loading={loading}
              text={buttonText}
              size="large"
            />
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Button Animation Challenge &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App; 