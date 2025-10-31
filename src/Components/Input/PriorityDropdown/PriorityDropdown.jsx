import { useState } from "react";
import { priorities } from "../../Index.js";
export const PriorityDropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(priorities[1]);
  const handleSelect = (priority) => {
    setSelectedPriority(priority);
    setIsOpen(false);
    onSelect(priority);
  };
  return (
    <div className="priority-dropdown">
      <div
        className="selected-priority"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        style={{
          borderLeft: `5px solid ${selectedPriority.color}`,
        }}
      >
        {selectedPriority.label}
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {priorities.map((priority) => (
            <div
              key={priority.value}
              className="dropdown-item"
              style={{
                borderLeft: `5px solid ${priority.color}`,
              }}
              onClick={() => handleSelect(priority)}
            >
              {priority.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
