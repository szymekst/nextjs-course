import mongoose, { Schema, mongo } from "mongoose";
import { stringify } from "postcss";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
    {
        title: String,
        description: String,
        category: String,
        category: Number,
        progress: Number,
        status: String,
        active: Boolean,
    },
    { timestamps: true }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
export default Ticket;
