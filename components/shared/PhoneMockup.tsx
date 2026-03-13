'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ChatMessage {
  id: string;
  sender: 'self' | 'other';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface PhoneMockupProps {
  messages?: ChatMessage[];
  className?: string;
  animate?: boolean;
}

const defaultMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'other',
    text: 'Hey! Did you see the new privacy features? 🔒',
    time: '09:41',
  },
  {
    id: '2',
    sender: 'self',
    text: 'Yes! End-to-end encrypted everything.',
    time: '09:42',
    status: 'read',
  },
  {
    id: '3',
    sender: 'other',
    text: 'Even the calls?',
    time: '09:42',
  },
  {
    id: '4',
    sender: 'self',
    text: "Every message and call. Nobody can read them.",
    time: '09:43',
    status: 'read',
  },
  {
    id: '5',
    sender: 'other',
    text: "Switching now! 🚀",
    time: '09:43',
  },
];

function ReadTick({ status }: { status: 'sent' | 'delivered' | 'read' }) {
  const color = status === 'read' ? '#00E676' : '#9E9E9E';
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      className="ml-1 inline-block shrink-0"
      aria-hidden="true"
    >
      <path
        d="M1 5l3 3 4.5-6.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 5l3 3 4.5-6.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneMockup({
  messages = defaultMessages,
  className,
  animate = true,
}: PhoneMockupProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  return (
    <motion.div
      className={cn('relative mx-auto w-[230px]', className)}
      animate={shouldAnimate ? { y: [0, -12, 0] } : undefined}
      transition={
        shouldAnimate ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : undefined
      }
      style={{ filter: 'drop-shadow(0 24px 48px rgba(233, 30, 99, 0.15))' }}
    >
      {/* Phone frame */}
      <div
        className="relative overflow-hidden"
        style={{
          background: '#263238',
          borderRadius: '44px',
          padding: '10px',
          border: '2px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Dynamic island */}
        <div
          className="mx-auto mb-2 rounded-full"
          style={{ width: '80px', height: '26px', background: '#1a2428' }}
        />

        {/* Screen */}
        <div
          className="overflow-hidden rounded-[30px]"
          style={{ background: '#F5F7F9', minHeight: '400px' }}
        >
          {/* Chat header */}
          <div className="flex items-center gap-2 border-b border-[#E4E8EC] bg-white px-3 py-2.5">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #E91E63, #880E4F)' }}
              aria-hidden="true"
            >
              A
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#263238]">Alex</p>
              <p className="text-[10px] text-[#00C853]">online</p>
            </div>
            {/* E2E lock indicator */}
            <svg
              className="ml-auto shrink-0"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="#00E676"
              aria-label="End-to-end encrypted"
            >
              <path d="M12 1C9.24 1 7 3.24 7 6v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2V6c0-2.76-2.24-5-5-5zm0 2c1.65 0 3 1.35 3 3v2H9V6c0-1.65 1.35-3 3-3zm0 9c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
            </svg>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-2 px-2.5 py-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn('flex', msg.sender === 'self' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[82%] rounded-2xl px-2.5 py-1.5',
                    msg.sender === 'self'
                      ? 'rounded-br-sm text-white'
                      : 'rounded-bl-sm border border-[#E4E8EC] bg-white text-[#263238]',
                  )}
                  style={msg.sender === 'self' ? { background: '#E91E63' } : undefined}
                >
                  <p className="text-[10px] leading-snug">{msg.text}</p>
                  <div
                    className={cn(
                      'mt-0.5 flex items-center',
                      msg.sender === 'self' ? 'justify-end' : 'justify-start',
                    )}
                  >
                    <span
                      className={cn(
                        'text-[8px]',
                        msg.sender === 'self' ? 'text-white/60' : 'text-[#9E9E9E]',
                      )}
                    >
                      {msg.time}
                    </span>
                    {msg.sender === 'self' && msg.status && <ReadTick status={msg.status} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input bar */}
          <div className="flex items-center gap-2 border-t border-[#E4E8EC] bg-white px-2.5 py-2">
            <div className="flex-1 rounded-full bg-[#F5F7F9] px-3 py-1.5">
              <p className="text-[10px] text-[#9E9E9E]">Message...</p>
            </div>
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              style={{ background: '#E91E63' }}
              aria-hidden="true"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
