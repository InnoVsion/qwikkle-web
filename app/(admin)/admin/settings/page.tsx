// TODO: Implement site settings editor (company name, SEO, social links)
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage(){
  return (
    <div>
      <p className="text-muted-foreground">Settings — placeholder</p>
    </div>
  );
}
