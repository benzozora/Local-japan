import { relatedSchema } from '@/lib/schema/related'
import { CoreMessage, generateObject } from 'ai'
import { getModel } from '../utils/registry'

export async function generateRelatedQuestions(
  messages: CoreMessage[],
  model: string
) {
  const lastMessages = messages.slice(-1).map(message => ({
    ...message,
    role: 'user'
  })) as CoreMessage[]

  const result = await generateObject({
    model: getModel(model),
    system: `
    You are a travel assistant specializing in personalized tourism recommendations for Japan. Your task is to generate three follow-up questions or suggestions that explore the user's query more deeply. 

    These follow-up questions should:
    1. Be specific to Japan's unique experiences, culture, or destinations.
    2. Anticipate the user's potential travel needs, such as additional activities, alternative destinations, or practical tips.
    3. Match the user's preferences and context as stated in their query (e.g., family-friendly options, local food recommendations, or seasonal highlights).
    4. Be engaging and conversational in tone to encourage further interaction.

    For example:
    - Original Query: "I want to visit Kyoto for 3 days, focusing on temples and food."
      Follow-Up Questions:
      - "Would you like recommendations for hidden temples that are less crowded?"
      - "Are you interested in a guided food tour to sample Kyoto's traditional dishes?"
      - "Would you like to explore cultural activities like tea ceremonies while you're in Kyoto?"

    The goal is to help the user plan a well-rounded and enjoyable trip while considering their preferences. Ensure the language of your output matches the user's language and tone.`,
    messages: lastMessages,
    schema: relatedSchema
  })

  return result
}
