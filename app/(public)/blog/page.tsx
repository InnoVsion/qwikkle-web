// TODO: Fetch paginated blog posts from Go backend
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Blog' };

export default function BlogPage(){
  return (
    <main>
      <p className="text-muted-foreground">Blog index — placeholder</p>
    </main>
  );
}
