// TODO: Implement admin dashboard with summary cards (pages, media, last published)
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

export default function AdminDashboardPage(){
  return (
    <div>
      <p className="text-muted-foreground">Admin dashboard — placeholder</p>
    </div>
  );
}
