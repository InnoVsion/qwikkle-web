import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturePreviewSection } from '@/components/sections/FeaturePreviewSection';
import { DownloadSection } from '@/components/sections/DownloadSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

// Revalidate every hour — content is static for now; swap for CMS calls in a future session
export const revalidate = 3600;

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturePreviewSection />
      <DownloadSection />
      <TestimonialsSection />
    </>
  );
}
