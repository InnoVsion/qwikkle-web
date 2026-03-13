'use client';

import { motion } from 'framer-motion';
import { PhoneMockup } from '@/components/shared/PhoneMockup';
import { FeatureShowcase } from './FeatureShowcase';
import { FeaturesStickyNav } from './FeaturesStickyNav';

// ─── Visual: Encryption ─────────────────────────────────────────────────────

function EncryptionVisual() {
  return (
    <div className="relative">
      <PhoneMockup animate={false} />
      {/* Floating lock badge */}
      <div
        className="absolute -right-3 top-10 flex h-14 w-14 items-center justify-center rounded-full bg-white"
        style={{
          boxShadow: '0 4px 24px rgba(233, 30, 99, 0.25)',
          border: '2px solid rgba(233, 30, 99, 0.15)',
        }}
        aria-hidden="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#E91E63">
          <path d="M12 1C9.24 1 7 3.24 7 6v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2V6c0-2.76-2.24-5-5-5zm0 2c1.65 0 3 1.35 3 3v2H9V6c0-1.65 1.35-3 3-3zm0 9c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
        </svg>
      </div>
    </div>
  );
}

// ─── Visual: Disappearing Messages ──────────────────────────────────────────

function DisappearingVisual() {
  return (
    <div
      className="relative mx-auto w-[230px]"
      style={{ filter: 'drop-shadow(0 24px 48px rgba(233, 30, 99, 0.12))' }}
    >
      <div style={{ background: '#263238', borderRadius: '44px', padding: '10px', border: '2px solid rgba(255,255,255,0.06)' }}>
        <div className="mx-auto mb-2 rounded-full" style={{ width: '80px', height: '26px', background: '#1a2428' }} />
        <div className="overflow-hidden rounded-[30px]" style={{ background: '#F5F7F9', minHeight: '380px' }}>
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-[#E4E8EC] bg-white px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #E91E63, #880E4F)' }} aria-hidden="true">A</div>
            <div>
              <p className="text-xs font-semibold text-[#263238]">Alex</p>
              <p className="flex items-center gap-1 text-[10px] text-[#9E9E9E]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#00E676" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
                disappearing messages on
              </p>
            </div>
          </div>
          {/* Messages */}
          <div className="flex flex-col gap-2 px-2.5 py-3">
            <div className="flex justify-end">
              <div className="max-w-[82%] rounded-2xl rounded-br-sm px-2.5 py-1.5 text-white" style={{ background: '#E91E63' }}>
                <p className="text-[10px]">This stays forever. 😊</p>
                <p className="mt-0.5 text-right text-[8px] text-white/60">09:40</p>
              </div>
            </div>
            <div className="flex justify-end">
              <motion.div
                className="relative max-w-[82%] rounded-2xl rounded-br-sm px-2.5 py-1.5 text-white"
                style={{ background: '#E91E63' }}
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
              >
                <p className="text-[10px]">This disappears in...</p>
                <div className="mt-0.5 flex items-center justify-end gap-1">
                  <span className="text-[8px] font-semibold text-white/90">⏱ 5s</span>
                </div>
              </motion.div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[82%] rounded-2xl rounded-bl-sm border border-[#E4E8EC] bg-white px-2.5 py-1.5">
                <p className="text-[10px] text-[#263238]">That&apos;s brilliant 🔥</p>
                <p className="mt-0.5 text-[8px] text-[#9E9E9E]">09:41</p>
              </div>
            </div>
          </div>
          {/* Input bar */}
          <div className="flex items-center gap-2 border-t border-[#E4E8EC] bg-white px-2.5 py-2">
            <div className="flex-1 rounded-full bg-[#F5F7F9] px-3 py-1.5"><p className="text-[10px] text-[#9E9E9E]">Message...</p></div>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: '#E91E63' }} aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Visual: Group Chats ─────────────────────────────────────────────────────

function GroupsVisual() {
  const bubbles = [
    { initial: 'S', color: '#E91E63', text: 'End-to-end encrypted 🔒', delay: 0 },
    { initial: 'M', color: '#880E4F', text: 'Even in groups? Yes!', delay: 0.5 },
    { initial: 'J', color: '#00C853', text: 'Finally a secure group chat 🎉', delay: 1 },
  ];

  return (
    <div className="flex w-full max-w-[320px] flex-col gap-3" aria-hidden="true">
      {bubbles.map(({ initial, color, text, delay }) => (
        <motion.div
          key={initial}
          className="flex items-start gap-3"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: color }}
          >
            {initial}
          </div>
          <div
            className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm"
            style={{
              border: '1px solid #E4E8EC',
              boxShadow: '0 2px 12px rgba(38, 50, 56, 0.06)',
            }}
          >
            <p className="text-sm text-[#263238]">{text}</p>
            <p className="mt-1 text-xs text-[#9E9E9E]">just now</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Visual: Voice & Video Calls ────────────────────────────────────────────

function CallsVisual() {
  return (
    <div
      className="mx-auto w-full max-w-[300px] overflow-hidden rounded-3xl"
      style={{
        background: 'linear-gradient(135deg, #263238 0%, #1a2428 100%)',
        boxShadow: '0 24px 48px rgba(38, 50, 56, 0.25)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      aria-hidden="true"
    >
      {/* Video area */}
      <div className="relative flex h-52 items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a2428, #263238)' }}>
        {/* Caller avatar */}
        <div className="relative flex flex-col items-center gap-2">
          <motion.div
            className="relative flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #E91E63, #880E4F)' }}
          >
            A
            {/* Signal rings */}
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full"
                style={{ border: '2px solid rgba(233, 30, 99, 0.4)' }}
                animate={{ scale: [1, 1.4 + i * 0.3], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
          <p className="text-sm font-semibold text-white">Alex Chen</p>
          <p className="text-xs text-white/60">HD · Encrypted · 00:42</p>
        </div>
        {/* E2E badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 backdrop-blur-sm">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#00E676"><path d="M12 1C9.24 1 7 3.24 7 6v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2V6c0-2.76-2.24-5-5-5zm0 2c1.65 0 3 1.35 3 3v2H9V6c0-1.65 1.35-3 3-3zm0 9c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/></svg>
          <span className="text-[10px] font-medium text-white">Encrypted</span>
        </div>
      </div>
      {/* Call controls */}
      <div className="flex items-center justify-center gap-4 px-6 py-4">
        {[
          { icon: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8', label: 'Mute', bg: 'rgba(255,255,255,0.1)', color: 'white' },
          { icon: 'M23 7l-7 5 7 5V7z M1 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z', label: 'Camera', bg: 'rgba(255,255,255,0.1)', color: 'white' },
          { icon: 'M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07C9.44 17.25 7.76 15.59 6.06 13.89a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.9a16 16 0 0 0 2.59 2.41', label: 'End call', bg: '#FF5C5C', color: 'white' },
        ].map(({ icon, label, bg, color }) => (
          <button
            key={label}
            className="flex h-12 w-12 items-center justify-center rounded-full transition-opacity hover:opacity-80"
            style={{ background: bg }}
            aria-label={label}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={icon} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Visual: File Sharing ────────────────────────────────────────────────────

function FilesVisual() {
  const files = [
    { label: 'PDF', name: 'report.pdf', size: '4.2 MB', color: '#FF5C5C', bg: 'rgba(255,92,92,0.08)', progress: 100 },
    { label: 'IMG', name: 'photo.jpg', size: '8.1 MB', color: '#E91E63', bg: 'rgba(233,30,99,0.08)', progress: 100 },
    { label: 'MP4', name: 'video.mp4', size: '512 MB', color: '#00C853', bg: 'rgba(0,200,83,0.08)', progress: 68 },
    { label: 'ZIP', name: 'archive.zip', size: '1.7 GB', color: '#9E9E9E', bg: 'rgba(158,158,158,0.08)', progress: 100 },
  ];

  return (
    <div className="w-full max-w-[320px]" aria-hidden="true">
      <div className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E4E8EC', boxShadow: '0 2px 16px rgba(38,50,56,0.06)' }}>
        <div className="border-b border-[#E4E8EC] px-4 py-3">
          <p className="text-sm font-semibold text-[#263238]">Shared files</p>
          <p className="text-xs text-[#9E9E9E]">All encrypted end-to-end</p>
        </div>
        <div className="flex flex-col divide-y divide-[#E4E8EC]">
          {files.map(({ label, name, size, color, bg, progress }) => (
            <div key={name} className="flex items-center gap-3 px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold" style={{ background: bg, color }}>
                {label}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[#263238]">{name}</p>
                {progress < 100 ? (
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#F5F7F9]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: color }}
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    />
                  </div>
                ) : (
                  <p className="text-[10px] text-[#9E9E9E]">{size}</p>
                )}
              </div>
              {progress === 100 && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Visual: Multi-Device ────────────────────────────────────────────────────

function MultiDeviceVisual() {
  return (
    <div className="flex flex-col items-center gap-6" aria-hidden="true">
      <div className="flex items-end justify-center gap-4">
        {/* Phone */}
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="overflow-hidden rounded-2xl bg-[#263238]" style={{ width: '64px', height: '108px', border: '3px solid #3D4F57', padding: '4px' }}>
            <div className="h-full w-full rounded-xl bg-[#F5F7F9]" />
          </div>
          <span className="text-xs text-[#9E9E9E]">Phone</span>
        </motion.div>

        {/* Sync arrows */}
        <div className="mb-10 flex flex-col items-center gap-1">
          <motion.svg
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M5 12h14M15 8l4 4-4 4" stroke="#E91E63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
          <motion.svg
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M19 12H5M9 8L5 12l4 4" stroke="#E91E63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>

        {/* Tablet */}
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <div className="overflow-hidden rounded-2xl bg-[#263238]" style={{ width: '88px', height: '116px', border: '3px solid #3D4F57', padding: '5px' }}>
            <div className="h-full w-full rounded-xl bg-[#F5F7F9]" />
          </div>
          <span className="text-xs text-[#9E9E9E]">Tablet</span>
        </motion.div>

        {/* Sync arrows */}
        <div className="mb-10 flex flex-col items-center gap-1">
          <motion.svg
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
          >
            <path d="M5 12h14M15 8l4 4-4 4" stroke="#E91E63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
          <motion.svg
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
          >
            <path d="M19 12H5M9 8L5 12l4 4" stroke="#E91E63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>

        {/* Laptop */}
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-t-xl bg-[#263238]" style={{ width: '120px', height: '76px', border: '3px solid #3D4F57', borderBottom: 'none', padding: '5px' }}>
              <div className="h-full w-full rounded-lg bg-[#F5F7F9]" />
            </div>
            <div className="h-2 w-[130px] rounded-b-sm bg-[#3D4F57]" />
          </div>
          <span className="text-xs text-[#9E9E9E]">Laptop</span>
        </motion.div>
      </div>

      {/* Sync status */}
      <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2" style={{ border: '1px solid #E4E8EC', boxShadow: '0 2px 8px rgba(38,50,56,0.06)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <span className="text-xs font-medium text-[#263238]">All devices in sync</span>
      </div>
    </div>
  );
}

// ─── Feature data ─────────────────────────────────────────────────────────────

interface FeatureConfig {
  id: string;
  tag: string;
  headline: string;
  subheadline: string;
  description: string;
  bulletPoints: string[];
  layout: 'text-left' | 'text-right';
  Visual: () => React.ReactElement;
}

const features: FeatureConfig[] = [
  {
    id: 'encryption',
    tag: 'Privacy',
    headline: 'Every message. Every call. Encrypted.',
    subheadline: "Not even we can read your messages.",
    description:
      'We use the Signal Protocol — the gold standard in end-to-end encryption. Your messages are locked with keys that only exist on your device.',
    bulletPoints: ['Signal Protocol encryption', 'Zero knowledge architecture', 'Open source & auditable'],
    layout: 'text-left',
    Visual: EncryptionVisual,
  },
  {
    id: 'disappearing',
    tag: 'Control',
    headline: 'Messages that disappear on your terms.',
    subheadline: 'Set it. Send it. Gone.',
    description:
      'Choose messages, photos, or entire conversations to automatically delete after a set time. You control how long your history lasts.',
    bulletPoints: ['Timer from 5 seconds to 1 week', 'Works for media too', 'No recovery for anyone'],
    layout: 'text-right',
    Visual: DisappearingVisual,
  },
  {
    id: 'groups',
    tag: 'Community',
    headline: 'Groups for every corner of your life.',
    subheadline: 'Up to 1,000 members. Zero compromise on privacy.',
    description:
      'Create groups for work, friends, or family. Encrypted group chats with admin controls, polls, reactions, and more.',
    bulletPoints: ['Up to 1,000 members', 'Admin controls & permissions', 'Polls, reactions, mentions'],
    layout: 'text-left',
    Visual: GroupsVisual,
  },
  {
    id: 'calls',
    tag: 'Connection',
    headline: 'Crystal clear. End-to-end encrypted.',
    subheadline: "Calls that sound like you're in the same room.",
    description:
      'HD voice and video calls, encrypted the same way as your messages. Group calls for up to 32 people.',
    bulletPoints: ['HD audio & video', 'End-to-end encrypted', 'Group calls up to 32 people'],
    layout: 'text-right',
    Visual: CallsVisual,
  },
  {
    id: 'files',
    tag: 'Productivity',
    headline: 'Share anything. Privately.',
    subheadline: 'Files up to 2GB. Encrypted in transit and at rest.',
    description:
      'Send documents, photos, videos, and files of any type, up to 2GB each. Everything is encrypted — no scanning, no indexing.',
    bulletPoints: ['Up to 2GB per file', 'All file types supported', 'Encrypted at rest'],
    layout: 'text-left',
    Visual: FilesVisual,
  },
  {
    id: 'multidevice',
    tag: 'Flexibility',
    headline: 'Your messages. On every screen.',
    subheadline: 'Phone, tablet, desktop. All in sync.',
    description:
      'Link up to 4 devices to one account. Your messages sync instantly across all of them — even when your phone is off.',
    bulletPoints: ['Up to 4 linked devices', 'Works without your phone online', 'Messages sync instantly'],
    layout: 'text-right',
    Visual: MultiDeviceVisual,
  },
];

// ─── FeaturesContent ──────────────────────────────────────────────────────────

export function FeaturesContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="flex gap-16">
        <FeaturesStickyNav />
        <div className="min-w-0 flex-1 divide-y divide-[#E4E8EC]">
          {features.map((f) => (
            <FeatureShowcase
              key={f.id}
              id={f.id}
              tag={f.tag}
              headline={f.headline}
              subheadline={f.subheadline}
              description={f.description}
              bulletPoints={f.bulletPoints}
              layout={f.layout}
              visual={<f.Visual />}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
