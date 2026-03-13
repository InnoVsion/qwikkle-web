// TODO: List all editable content sections with last-modified timestamps
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Content' };

export default function ContentIndexPage(){
  return (
    <div>
      <p className="text-muted-foreground">Content index — placeholder</p>
    </div>
  );
}
