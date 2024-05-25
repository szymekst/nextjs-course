"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TicketForm = () => {
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((preState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "not started",
        category: "Hardware Problem",
    };

    const [formData, setFormData] = useState(startingTicketData);
    return (
        <div className="flex justify-center">
            <form action="">
                <h3>Create Your Ticket</h3>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    required={true}
                    value={formData.title}
                />
            </form>
        </div>
    );
};

export default TicketForm;
