



The system prompt for the AI's internet search functionality is defined in researcher.ts and includes the following key instructions:

The AI has access to three main tools:
search tool for general web searches
retrieve tool for getting detailed content from specific URLs
video search tool for finding video content
When processing a user's query, the AI follows these guidelines:
Searches for relevant information using the search tool when needed
Uses the retrieve tool to get detailed content from specific URLs
Uses the video search tool when looking for video content
Analyzes all search results to provide accurate, up-to-date information
Important rules for responses:
Must cite sources using the format [number](url)
Multiple relevant sources should be comma-separated
Only uses information that has a URL available for citation
Falls back to general knowledge if search results aren't relevant
Provides comprehensive responses based on search results
Uses markdown for formatting responses
Can include relevant images but only when they aid understanding
The retrieve tool is restricted to only user-provided URLs
The system also includes the current date and time with each prompt to ensure the AI is aware of the temporal context when searching and providing information.

This system prompt is used in combination with the user's messages and a specified model to generate appropriate responses that incorporate real-time web search results.



-----------------



Based on my analysis of the codebase, here's how RAG and Redis are implemented:

RAG (Retrieval-Augmented Generation) Implementation:
The RAG system is implemented through the researcher agent in lib/agents/researcher.ts
It uses three main tools for retrieval:
searchTool: For general web searches
retrieveTool: For getting detailed content from specific URLs
videoSearchTool: For video content searches
The retrieve functionality uses two different services:
Jina AI Reader (fetchJinaReaderData)
Tavily Extract (fetchTavilyExtractData)
There's a character limit of 10,000 for retrieved content
Redis Implementation:
Redis is primarily used for chat history storage
The system supports two Redis configurations:
Local Redis (for development)
Upstash Redis (recommended for production)
Configuration is managed through environment variables:
CopyInsert
NEXT_PUBLIC_ENABLE_SAVE_CHAT_HISTORY=true
USE_LOCAL_REDIS=false
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
The Redis implementation includes:
RedisWrapper: A wrapper class that handles both local Redis and Upstash Redis clients
UpstashPipelineWrapper: For handling Upstash Redis pipeline operations
LocalPipelineWrapper: For handling local Redis pipeline operations
Redis operations supported:
zrange: For ordered set operations
hgetall: For hash operations
hmset: For setting multiple hash fields
zadd: For adding to sorted sets
So yes, Redis is currently being used to save chat history, but it's not being used for RAG functionality. The RAG implementation relies on external services (Jina AI and Tavily) for content retrieval, while Redis is specifically used for storing and managing chat history data. The system uses Upstash Redis in production and offers a local Redis option for development purposes.