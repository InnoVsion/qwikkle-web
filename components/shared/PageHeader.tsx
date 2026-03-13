// TODO: Add optional subtitle, breadcrumb, and background image support

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps){
  return (
    <div className="bg-muted py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
