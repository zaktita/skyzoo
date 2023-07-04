import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import './accordion.css';

function Accordion(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
  
    const toggleAccordion = (index) => {
      if (activeIndex === index) {
        setIsOpen(!isOpen);
      } else {
        setActiveIndex(index);
        setIsOpen(true);
      }
    };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={() => toggleAccordion(props.index)}>
        <h3>
            {props.title}
            </h3>
        <span> {isOpen ? <AiOutlineUp/> : <AiOutlineDown/>}</span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          {props.children}
        </div>
      )}
    </div>
  );
}

export default Accordion;
