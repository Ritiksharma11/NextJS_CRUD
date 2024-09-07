import { NextResponse } from "next/dist/server/web/spec-extension/response";
import DBconf from '../../../libs/db'
import todoModel from '../../../models/Todo'

export async function PUT(request, { params }) {
    try {
        const id = params.id;
        const { title, desc } = await request.json()
        await DBconf();
        const findTodo = await todoModel.findById(id);

        if (!findTodo) {
            return NextResponse.json({ message: "Todo Not Found" }, { status: 404 })
        }

        const updateTodo = await todoModel.findByIdAndUpdate(id,
            { title, desc }, { new: true }
        )

        return NextResponse.json({ message: "Todo Updated Successfully", updateTodo }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error ", error }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const id = params.id;
        await DBconf();

        const DeleteTodo = await todoModel.findByIdAndDelete(id)

        return NextResponse.json({ message: "Todo Deleted Successfully", DeleteTodo }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error ", error }, { status: 500 })
    }
}