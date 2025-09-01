import {NextRequest, NextResponse} from "next/server";
import {bodyError, isNotFoundError, notFoundError, serverError} from "@/lib/responses";
import prisma from "@/lib/prisma";

import {todoSchema} from "@/lib/schemas";

export async function GET(_req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  try {
    const todo = await prisma.todo.findUnique({
      where: {id},
    });
    if (todo === null) {
      return notFoundError();
    }

    return NextResponse.json(todo, {status: 200});
  } catch (e) {
    return serverError(e);
  }
}

export async function PUT(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  try {
    // parse body
    const body = await req.json();
    const result = todoSchema.safeParse(body);
    if (!result.success) {
      return bodyError(result.error);
    }

    console.log('id', id)
    const todo = await prisma.todo.update({
      where: {id},
      data: result.data,
    });

    return NextResponse.json(todo, {status: 200});
  } catch (e) {
    if (isNotFoundError(e)) {
      return notFoundError();
    }
    return serverError(e);
  }
}

export async function DELETE(_req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  try {
    await prisma.todo.delete({
      where: {id}
    });

    return new NextResponse(null, {status: 204})
  } catch (e) {
    if (isNotFoundError(e)) {
      return notFoundError();
    }
    return serverError(e);
  }
}
