// TODO: Implement media library — upload, browse, and delete assets via Go backend
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Media' };

export default function MediaPage(){
  return (
    <div>
      <p className="text-muted-foreground">Media manager — placeholder</p>
    </div>
  );
}
