// TODO: Fetch pricing tiers from Go backend
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Pricing' };

export default function PricingPage(){
  return (
    <main>
      <p className="text-muted-foreground">Pricing page — placeholder</p>
    </main>
  );
}
