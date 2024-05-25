import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        console.log("skibidi", params.id);
        const { id } = params;
        console.log("id", id);
        const foundTicket = await Ticket.findOne({ _id: id });
        console.log("found ticket: ", foundTicket);

        return NextResponse.json({ foundTicket }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        await Ticket.findByIdAndDelete(id);

        return NextResponse.json(
            { message: "Ticked Deleted" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}
