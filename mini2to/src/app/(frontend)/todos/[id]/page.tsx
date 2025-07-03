import config from '@/payload.config'
import { getPayload } from 'payload'

export default async function TodoPage({ params }: { params: { id: string } }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const todo = await payload.findByID({
    collection: 'todos',
    id: params.id,
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
      }}
    >
      <h1>Todo {todo.title}</h1>
      <p>{todo.description}</p>
      <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
      <p>{todo.createdAt}</p>
      <p>{todo.updatedAt}</p>
      <pre>{JSON.stringify(todo.media, null, 2)}</pre>
    </div>
  )
}
