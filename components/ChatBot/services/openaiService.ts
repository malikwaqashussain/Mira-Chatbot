interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export class OpenAIService {
  private baseUrl = '/api/chat'

  async generateResponse(message: string, context: string = ''): Promise<string> {
    try {
      const systemPrompt = context
        ? `${context}\n\nPlease provide a helpful response as a customer service chatbot.`
        : 'Please provide a helpful response as a customer service chatbot.'

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Failed to generate response')
      }

      const data: OpenAIResponse = await response.json()

      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content
      } else {
        throw new Error('No response generated')
      }
    } catch (error) {
      throw error
    }
  }
}