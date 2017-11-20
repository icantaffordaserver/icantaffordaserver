import '../loadEnv' // needs to be at the top to load env vars
import throat from 'throat'

const throttle = throat(2)

import client from '../../config/GraphQLClient'

const prompts = [
  'What scares you the most in life',
  'What is one thing about you people would be surprised to learn?',
  'If you had to lose one of your five senses, which one would it be?',
  'When have you laughed the hardest? Cried?',
  'Go forward in time, what would you want to see?',
]
const createConversationPromptsMutation = `
  mutation createConversationPrompt(
    $question: String!
  ) {
    createConversationPrompt(
      question: $question
    ) {
      id
    }
  }
`

// seed the db with users, make one admin user, give all users password hello
const createConversationPrompts = async () => {
  const requests = prompts.map(question =>
    throttle(async () => {
      await client.request(createConversationPromptsMutation, {
        question,
      })
      console.log('Created Conversation Prompt: ', question)
    }),
  )
  await Promise.all(requests)
  console.log('All Conversation Prompts created')
  return Promise.resolve()
}

export default createConversationPrompts
