import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'
import { Media } from '@/payload-types'
import Link from 'next/link'
import { getUser } from '@/utils/getUser'
import { redirect } from 'next/navigation'

export default async function TodoPage({ params }: { params: { id: string } }) {
  // get user if exists
  const { user } = await getUser()
  if (!user) {
    redirect('/login')
  }

  const resolvedParams = await params
  const todoId = resolvedParams.id

  // same thing with REST API
  const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/todos/${todoId}`)
  const todo = await response.json()
  console.log('Todo from REST api', todo)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
      }}
    >
      <Link href="/">Back to todos</Link>
      <h1>Todo {todo.title}</h1>
      <p>{todo.description}</p>
      <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
      <p>{todo.createdAt}</p>
      <p>{todo.updatedAt}</p>
      {/*  <pre>{JSON.stringify(todo.media, null, 2)}</pre> */}
      {todo.media && (
        <Image
          src={(todo.media as Media).url!}
          alt={(todo.media as Media).alt ?? 'not avialable'}
          width={(todo.media as Media).width ?? 0}
          height={(todo.media as Media).height ?? 0}
        />
      )}
    </div>
  )
}
