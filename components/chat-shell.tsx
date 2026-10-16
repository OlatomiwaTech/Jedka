"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Camera,
  ImageIcon,
  MessageCircleMore,
  Phone,
  Search,
  SendHorizontal,
  Smile,
  Video,
} from "lucide-react";

const conversations = [
  { id: "conv-demo", name: "Ada Johnson", preview: "Looks great — I can already feel the new app coming together.", time: "2m ago" },
  { id: "conv-team", name: "Product team", preview: "QA noted the login flow and delivery states are on track.", time: "11m ago" },
  { id: "conv-design", name: "Design review", preview: "The new media composer is nearly ready for approval.", time: "1h ago" },
];

const messages = [
  { id: "m1", sender: "them", body: "Hey there! I just set up ChatWave.", time: "09:12" },
  { id: "m2", sender: "me", body: "Looks great — I can already feel the new app coming together.", time: "09:13" },
  { id: "m3", sender: "them", body: "The messaging layer is the next checkpoint.", time: "09:14" },
];

export function ChatShell() {
  const [activeConversation, setActiveConversation] = useState(conversations[0].id);

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100">
      <aside className="w-full max-w-[360px] border-r border-slate-800 bg-slate-900/80 p-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">ChatWave</p>
            <h1 className="mt-2 text-2xl font-semibold">Messages</h1>
          </div>
          <button className="rounded-full bg-emerald-500 p-2 text-slate-950 hover:bg-emerald-400" aria-label="New chat">
            <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="mb-5 flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/70 px-3 py-2">
          <Search size={16} className="text-slate-400" />
          <input
            aria-label="Search chats"
            placeholder="Search conversations"
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setActiveConversation(conversation.id)}
              className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                activeConversation === conversation.id
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-transparent bg-slate-800/30 hover:border-slate-700"
              }`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 font-semibold text-slate-950">
                {conversation.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-medium">{conversation.name}</span>
                  <span className="text-[10px] text-slate-400">{conversation.time}</span>
                </div>
                <p className="truncate text-sm text-slate-400">{conversation.preview}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col bg-slate-950">
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 font-semibold text-slate-950">
              AJ
            </div>
            <div>
              <h2 className="font-medium">Ada Johnson</h2>
              <p className="text-xs text-emerald-400">online</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-full border border-slate-700 p-2 text-slate-200 hover:bg-slate-800" aria-label="Voice call">
              <Phone size={18} />
            </button>
            <button className="rounded-full border border-slate-700 p-2 text-slate-200 hover:bg-slate-800" aria-label="Video call">
              <Video size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                  message.sender === "me"
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-800 text-slate-100"
                }`}
              >
                <p>{message.body}</p>
                <span className={`mt-1 block text-[10px] ${message.sender === "me" ? "text-slate-900/80" : "text-slate-400"}`}>
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 bg-slate-900/80 p-4">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-3 py-2">
            <button className="rounded-full p-2 text-slate-400 hover:bg-slate-700 hover:text-slate-100" aria-label="Add media">
              <ImageIcon size={18} />
            </button>
            <button className="rounded-full p-2 text-slate-400 hover:bg-slate-700 hover:text-slate-100" aria-label="Attach file">
              <Camera size={18} />
            </button>
            <button className="rounded-full p-2 text-slate-400 hover:bg-slate-700 hover:text-slate-100" aria-label="Emoji">
              <Smile size={18} />
            </button>
            <input
              aria-label="Message composer"
              placeholder="Type a message"
              className="flex-1 bg-transparent px-2 py-1 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
            <button className="rounded-full bg-emerald-500 p-2 text-slate-950 hover:bg-emerald-400" aria-label="Send message">
              <SendHorizontal size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 border-t border-slate-800 bg-slate-900 px-6 py-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><MessageCircleMore size={14} /> Live</span>
          <span>Typing indicator ready</span>
          <span>95% delivery health</span>
        </div>
      </main>
    </div>
  );
}
