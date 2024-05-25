"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TicketForm = ({ ticket }) => {
    const EDITMODE = ticket.id === "new" ? false : true;

    const router = useRouter();

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((preState) => ({
            ...preState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (EDITMODE) {
            const res = await fetch(`/api/Tickets/${ticket._id}`, {
                method: "PUT",
                body: JSON.stringify({ formData }),
                "content-type": "application/json",
            });

            if (!res.ok) {
                throw new Error("Failed to create Ticket");
            }
        } else {
            const res = await fetch("/api/Tickets", {
                method: "POST",
                body: JSON.stringify({ formData }),
                "content-type": "application/json",
            });

            if (!res.ok) {
                throw new Error("Failed to create Ticket");
            }
        }

        router.push("/");
        router.refresh();
    };

    const startingTicketData = {
        title: "",
        description: "",
        category: "Hardware Problem",
        priority: 1,
        progress: 0,
        status: "not started",
    };

    if (EDITMODE) {
        startingTicketData["title"] = ticket.title;
        startingTicketData["description"] = ticket.description;
        startingTicketData["priority"] = ticket.priority;
        startingTicketData["progress"] = ticket.progress;
        startingTicketData["status"] = ticket.status;
        startingTicketData["category"] = ticket.category;
    }

    const [formData, setFormData] = useState(startingTicketData);
    return (
        <div className="flex justify-center">
            <form
                className="flex flex-col gap-3 w-1/2"
                method="post"
                onSubmit={handleSubmit}
            >
                <h3>
                    {EDITMODE ? "Update your Ticket" : "Create Your Ticket"}
                </h3>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    required={true}
                    value={formData.title}
                />
                <label htmlFor="title">Description</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={handleChange}
                    required={true}
                    value={formData.description}
                    rows="5"
                />
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="Hardware Problem">Hardware Problem</option>
                    <option value="Software Problem">Software Problem</option>
                    <option value="Project">Project</option>
                </select>
                <label htmlFor="priority">Priority</label>
                <div>
                    {[...Array(5)].map((_, index) => {
                        index++;
                        return (
                            <React.Fragment key={index}>
                                <input
                                    type="radio"
                                    id={"priority-" + index}
                                    name="priority"
                                    onChange={handleChange}
                                    value={index}
                                    checked={formData.priority == index}
                                />
                                <label>{index}</label>
                            </React.Fragment>
                        );
                    })}
                </div>
                <label htmlFor="progress">Progress</label>
                <input
                    type="range"
                    id="progress"
                    name="progress"
                    value={formData.progress}
                    min="0"
                    max="100"
                    onChange={handleChange}
                />
                <label htmlFor="status">Status</label>
                <select
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="not started">Not Started</option>
                    <option value="started">Started</option>
                    <option value="done">Done</option>
                </select>
                <input
                    type="submit"
                    className="btn"
                    value={EDITMODE ? "Update Ticket" : "Create Ticket"}
                    onClick={handleSubmit}
                />
            </form>
        </div>
    );
};

export default TicketForm;
