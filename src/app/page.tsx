"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

export default function ChatApp() {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot"; time: string }[]>([
    { text: "Hello! How can I help you today?", sender: "bot", time: getCurrentTime() },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  function getCurrentTime() {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage = { text: inputValue, sender: "user", time: getCurrentTime() }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage = {
        text: `I received your message: "${inputValue}" ?`,
        sender: "bot",
        time: getCurrentTime(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md chat-container">
        {/* Chat header */}
        <div className="chat-header text-white">
          <h1 className="text-xl font-bold">My Simple Chat Program</h1>
          <p className="text-sm opacity-80">Lets Yapp</p>
        </div>

        {/* Messages container */}
        <div className="messages-container h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}>
              <div className={`message ${message.sender === "user" ? "message-user" : "message-bot"}`}>
                {message.text}
              </div>
              <span className={`message-time ${message.sender === "user" ? "text-right" : "text-left"}`}>
                {message.time}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form */}
        <form onSubmit={handleSendMessage} className="input-container flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="message-input flex-1 focus:outline-none"
          />
          <button type="submit" className="send-button text-white focus:outline-none" aria-label="Send message">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}
