import {NextResponse} from "next/server";
import {Prisma} from "@prisma/client";

export function isNotFoundError(e: unknown) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2025') {
      return true;
    }
  }
  return false;
}

export function notFoundError() {
  return error('resource not found', null, 404);
}

export function bodyError(e: unknown) {
  return error('invalid body', e, 400);
}

export function serverError(e: unknown) {
  return error('server error', e, 500);
}

export function error(msg: string, e: unknown, status: number) {
  console.error(e);
  return NextResponse.json({error: `${msg}: ${e ?? ''}`}, {status});
}