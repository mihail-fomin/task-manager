import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import prisma from '@/app/utils/connect'

export async function POST(req: Request) {
  const errorMessage = 'ERROR CREATING TASK'

  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthrized', status: 401 })
    }

    const { title, description, date, completed, important } = await req.json()

    if (!title || !description || !date) {
      return NextResponse.json({
        error: 'Missing required fields',
        status: 400,
      })
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: 'Title must be at least 3 characters long',
        status: 400,
      })
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    })

    return NextResponse.json(task)
  } catch (error) {
    console.log(errorMessage, error)
    return NextResponse.json({ error: errorMessage, status: 500 })
  }
}

export async function GET(req: Request) {
  const errorMessage = 'ERROR GETTING TASK'

  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthrized', status: 401 })
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    })
    console.log('tasks: ', tasks)

    return NextResponse.json(tasks)
  } catch (error) {
    console.log(errorMessage, error)
    return NextResponse.json({ error: errorMessage, status: 500 })
  }
}

export async function PUT(req: Request) {
  const errorMessage = 'ERROR UPDAITNG TASK'

  try {
  } catch (error) {
    console.log(errorMessage, error)
    return NextResponse.json({ error: errorMessage, status: 500 })
  }
}

export async function DELETE(req: Request) {
  const errorMessage = 'ERROR DELETING TASK'

  try {
  } catch (error) {
    console.log(errorMessage, error)
    return NextResponse.json({ error: errorMessage, status: 500 })
  }
}
