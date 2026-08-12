import React from 'react';
import { ShoppingCart, MapPin, CreditCard, ClipboardList } from 'lucide-react';
import './CheckoutStepper.css';

const CheckoutStepper = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: 'Cart', num: '01', icon: ShoppingCart },
    { id: 2, label: 'Address', num: '02', icon: MapPin },
    { id: 3, label: 'Payment', num: '03', icon: CreditCard },
    { id: 4, label: 'Summary', num: '04', icon: ClipboardList },
  ];

  return (
    <div className="custom-stepper-wrapper">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        
  
        const isLineSolid = step.id < currentStep || (step.id === currentStep && currentStep < steps.length); // Assuming line from current to next is solid? The image shows line from 1 to 2 is solid when 1 is active. Let's make it solid if step.id <= currentStep. Wait, image shows step 1 active, line from 1 to 2 is solid brown. Line from 2 to 3 is dashed. So line after step is solid if step.id <= currentStep. Actually, let's just say line is solid if step.id <= currentStep.

        const showLine = index < steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <div className={`custom-step ${isActive ? 'active' : (isCompleted ? 'completed' : 'pending')}`}>
              <div className="step-circle-wrapper">
                {isActive && <div className="step-glow-ring"></div>}
                <div className="step-circle">
                  <step.icon size={20} className="step-icon-svg" />
                </div>
              </div>
              
              <div className="step-label">{step.label}</div>
            </div>

            {showLine && (
              <div className={`custom-step-line-container ${step.id <= currentStep ? 'solid-line' : 'dashed-line'}`}>
                <div className="line-path"></div>
                <div className="line-dot"></div>
              </div>
            )}
          </React.Fragment>  
        );
      })}
    </div>
  );
};

export default CheckoutStepper;
