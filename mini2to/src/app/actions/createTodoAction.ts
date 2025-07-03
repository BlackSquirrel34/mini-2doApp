import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'

export async function createTodo(formData: FormData) {
  'use server'
  const title = formData.get('title')
  const description = formData.get('description')
  const completed = formData.get('completed') ? true : false
  const media = formData.get('media')

  const payload = await getPayload({ config: payloadConfig })

  const todo = await payload.create({
    collection: 'todos',
    data: {
      title: title as string,
      description: description as string,
      completed: completed as boolean,
    },
  })
}
