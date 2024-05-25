import React from "react";

const ProgressDisplay = () => {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
                className="bg-blue-600 h-2.5 rouneded-full"
                style={{ width: "75%" }}
            ></div>
        </div>
    );
};

export default ProgressDisplay;
