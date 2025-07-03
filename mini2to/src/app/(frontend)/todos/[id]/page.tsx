import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'
import { Media } from '@/payload-types'
import Link from 'next/link'

export default async function TodoPage({ params }: { params: { id: string } }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const todoId = params.id

  const todo_local = await payload.findByID({
    collection: 'todos',
    id: todoId,
  })

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
