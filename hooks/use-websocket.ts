"use client"

import { useEffect, useRef, useState } from "react"
import { io, type Socket } from "socket.io-client"
import type { ActivityItem } from "@/types/activity"

interface UseWebSocketProps {
  collectionId: string
  onNewActivity: (activity: ActivityItem) => void
}

/**
 * Custom hook for managing Socket.IO connections to receive real-time activity updates
 */
export function useWebSocket({ collectionId, onNewActivity }: UseWebSocketProps) {
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    // Initialize Socket.IO connection
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
      transports: ["websocket", "polling"],
    })

    const socket = socketRef.current

    // Connection event handlers
    socket.on("connect", () => {
      setIsConnected(true)
      socket.emit("join-collection", collectionId)
      console.log(`Connected to collection: ${collectionId}`)
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
      console.log("Disconnected from server")
    })

    // Listen for new activities
    socket.on("new-activity", (activity: ActivityItem) => {
      onNewActivity(activity)
    })

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error)
      setIsConnected(false)
    })

    // Cleanup on unmount
    return () => {
      socket.emit("leave-collection", collectionId)
      socket.disconnect()
    }
  }, [collectionId, onNewActivity])

  return { isConnected }
}
