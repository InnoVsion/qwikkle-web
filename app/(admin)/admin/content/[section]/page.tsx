// TODO: Implement per-section CMS editor with React Hook Form + Zod validation

interface ContentSectionPageProps {
  params: Promise<{ section: string }>;
}

export default async function ContentSectionPage({
  params,
}: ContentSectionPageProps){
  const { section } = await params;

  return (
    <div>
      <p className="text-muted-foreground">
        Content editor for &quot;{section}&quot; — placeholder
      </p>
    </div>
  );
}
