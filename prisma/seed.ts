import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const todoData: Prisma.TodoCreateInput[] = [
  {
    name: 'groceries',
    description: 'get milk, eggs, bread',
    status: 'Pending',
  },
  {
    name: 'taxes',
    description: 'damn IRS',
    status: 'Done',
  }
]

async function main() {
  for (const t of todoData) {
    await prisma.todo.create({data: t})
  }
}

main()