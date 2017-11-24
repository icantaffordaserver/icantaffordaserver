import '../loadEnv' // needs to be at the top to load env vars
import throat from 'throat'

// set the max concurrency for requests to 2
const throttle = throat(2)

import client from '../../config/GraphQLClient'

const allConversationPromptsQuery = `
  {
    allConversationPrompts {
      id
    }
  }
`
const deleteConversationPromptMutation = `
  mutation deleteConversationPrompt($id: ID!) {
    deleteConversationPrompt(id: $id) {
      id
    }
  }
`

const deleteAllConversationPrompts = async () => {
  const { allConversationPrompts } = await client.request(
    allConversationPromptsQuery,
  )
  const data = allConversationPrompts.map(prompt =>
    throttle(async () => {
      const deletedConversationPrompt = await client.request(
        deleteConversationPromptMutation,
        {
          id: prompt.id,
        },
      )
      console.log('Conversation Prompt deleted: ', deletedConversationPrompt)
    }),
  )
  await Promise.all(data)
  console.log('All Conversation Prompts deleted.')
}

export default deleteAllConversationPrompts
