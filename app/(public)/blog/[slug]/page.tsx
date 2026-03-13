// TODO: Fetch individual blog post by slug from Go backend
// TODO: Add generateStaticParams for popular posts

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps){
  const { slug } = await params;

  return (
    <main>
      <p className="text-muted-foreground">Blog post &quot;{slug}&quot; — placeholder</p>
    </main>
  );
}
