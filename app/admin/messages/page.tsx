'use client';

import { useEffect, useState } from 'react';
import { ContactMessage } from '@/lib/types';
import { getContactMessages } from '@/lib/store';
import { Mail, Calendar, User, MessageSquare } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getContactMessages();
      setMessages(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="py-20 text-center text-slate-400">Loading messages...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Contact Messages Inbox</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review inquiries, project proposals, and messages sent via your public website contact form.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="p-4 rounded-full bg-slate-800 text-slate-500 w-16 h-16 mx-auto flex items-center justify-center">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-white text-base">Inbox is empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Messages sent through your public website contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <span className="font-bold text-white text-sm">{msg.name}</span>
                  <span className="text-xs text-slate-400">({msg.email})</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              {msg.subject && (
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Subject: {msg.subject}
                </p>
              )}

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>

              <div className="pt-2 flex justify-end">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
