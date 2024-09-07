import { NextResponse } from "next/server";
import DBconf from "../../libs/db";
import todoModel from "../../models/Todo";

export async function POST(request) {
    try {
        const { title, desc } = await request.json();
        await DBconf();

        if (!title || !desc) {
            return NextResponse.json({ message: "All fields are required" })
        }

        const createNew = await todoModel.create({
            title, desc
        })
        return NextResponse.json({ success: true, todo: createNew }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 })
    }
}

export async function GET() {
    try {
        await DBconf();

        const Todo = await todoModel.find()

        if (!Todo) {
            return NextResponse.json({ success: false, message: "Data Not Found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, Todo }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 })
    }
}