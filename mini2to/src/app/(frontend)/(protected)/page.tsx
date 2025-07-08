import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import { redirect } from 'next/navigation'
import config from '@/payload.config'

import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import { getUser } from '@/utils/getUser'

export default async function HomePage() {
  // get user if exists
  const { user, payload } = await getUser()
  if (!user) {
    redirect('/login')
  }

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const todos = await payload?.find({
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
        <Link href="/todo-create">
          <button
            style={{
              border: '1px solid #ccc',
              borderRadius: 10,
              padding: 10,
              marginBottom: 16,
            }}
          >
            Create Todo
          </button>
          <LogoutButton />
        </Link>
        {todos.docs.map((todo) => (
          <Link href={`/todos/${todo.id}`} key={todo.id} style={{ textDecoration: 'none' }}>
            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
              <p>{todo.createdAt}</p>
              <p>{todo.updatedAt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
