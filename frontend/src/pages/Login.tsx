import React from 'react';

interface SignInProps {
  onLogin: () => void;
}

// Check #1: Does your function signature include `{ onLogin }`?
export default function YourSignInComponent({ onLogin }: SignInProps) {
  return (
    <div>
      {/* ... other form elements */}
      
      <button
        // Check #2: Is the onClick handler spelled correctly and calling onLogin?
        // Add the console.log here to test the click itself.
        onClick={() => {
          console.log('Demo button was clicked!'); // <-- Add this line
          onLogin();
        }}
        className="/*... your styles ...*/"
      >
        Enter Demo Dashboard
      </button>

      {/* ... other elements */}
    </div>
  );
}