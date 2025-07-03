import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid white',
        padding: '10px',
      }}
    >
      <h1>Payload Mini To Do App</h1>
      <h3>Welcome, {user?.email}</h3>
      <div className="todos">
        <h2
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          Todos
        </h2>
        {todos.docs.map((todo) => (
          <div key={todo.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
            <p>{todo.createdAt}</p>
            <p>{todo.updatedAt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
