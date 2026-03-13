import type { Metadata } from 'next';
import { FeaturesHero } from '@/components/features/FeaturesHero';
import { FeaturesContent } from '@/components/features/FeaturesContent';
import { DownloadSection } from '@/components/sections/DownloadSection';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Every feature of Qwikkle — end-to-end encryption, disappearing messages, HD calls, and more.',
};

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <FeaturesContent />
      <DownloadSection />
    </>
  );
}
