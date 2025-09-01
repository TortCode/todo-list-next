import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/lib/prisma';
import {bodyError, serverError} from "@/lib/responses";
import {todoSchema} from "@/lib/schemas";

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();

    return NextResponse.json(todos, {status: 200});
  } catch (e) {
    return serverError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    // parse body
    const body = await req.json();
    const result = todoSchema.safeParse(body);
    if (!result.success) {
      return bodyError(result.error);
    }

    const todo = await prisma.todo.create({
      data: result.data,
    });

    return NextResponse.json(todo, {status: 201});
  } catch (e) {
    return serverError(e);
  }
}