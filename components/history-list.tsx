'use client'

import React, { Suspense, useEffect, useState } from 'react'
import HistoryItem from './history-item'
import { Chat } from '@/lib/types'
import { getChats } from '@/lib/actions/chat'
import { ClearHistory } from './clear-history'

type HistoryListProps = {
  userId?: string
}

function HistoryListContent({ userId }: HistoryListProps) {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const result = await getChats(userId)
        setChats(result || [])
      } catch (error) {
        console.error('Error fetching chats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchChats()
  }, [userId])

  if (loading) {
    return (
      <div className="text-foreground/30 text-sm text-center py-4">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 space-y-3 h-full">
      <div className="flex flex-col space-y-0.5 flex-1 overflow-y-auto">
        {!chats?.length ? (
          <div className="text-foreground/30 text-sm text-center py-4">
            No search history
          </div>
        ) : (
          chats?.map(
            (chat: Chat) => chat && <HistoryItem key={chat.id} chat={chat} />
          )
        )}
      </div>
      <div className="mt-auto">
        <ClearHistory empty={!chats?.length} />
      </div>
    </div>
  )
}

export function HistoryList(props: HistoryListProps) {
  return (
    <Suspense fallback={<div className="text-foreground/30 text-sm text-center py-4">Loading...</div>}>
      <HistoryListContent {...props} />
    </Suspense>
  )
}
