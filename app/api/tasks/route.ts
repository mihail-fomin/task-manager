import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'


export async function POST(req: Request) {
  const errorMessage = 'ERROR CREATING TASK'

  try {
    const {userID} = auth()

    if(!userID) {
      return NextResponse.json({ error: 'Unauthrized', status: 401})
    }

    const {title, description, date, completed, important} = await req.json()

    if (!title || !description || !date) {
      return NextResponse.json({
        error: 'Missing required fields',
        status: 400,
      })
    }

    
  } catch (error) {
    console.log(errorMessage, error);
    return new NextResponse.json({ error: errorMessage, status: 500})
  }
}

export async function GET(req: Request) {
  const errorMessage = 'ERROR GETTING TASK'

  try {
    
  } catch (error) {
    console.log(errorMessage, error);
    return new NextResponse.json({ error: errorMessage, status: 500})
  }
}

export async function PUT(req: Request) {
  const errorMessage = 'ERROR UPDAITNG TASK'

  try {
    
  } catch (error) {
    console.log(errorMessage, error);
    return new NextResponse.json({ error: errorMessage, status: 500})
  }
}

export async function DELETE(req: Request) {
  const errorMessage = 'ERROR DELETING TASK'

  try {
    
  } catch (error) {
    console.log(errorMessage, error);
    return new NextResponse.json({ error: errorMessage, status: 500})
  }
}