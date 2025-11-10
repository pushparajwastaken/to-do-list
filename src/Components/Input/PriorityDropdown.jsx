import React, { useState } from "react";
import { priorityLevels } from "../../App/index.js";
export const PriorityDropdown = (setPriority) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div>
      {showDropdown ? (
        <div>
          {priorityLevels.map((priority) => (
            <button
              onSelect={() => {
                setPriority(priority.value);
              }}
            >
              <h2>{priority.label}</h2>
            </button>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
