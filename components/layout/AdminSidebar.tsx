// TODO: Implement collapsible sidebar with active-link highlighting using usePathname

export function AdminSidebar(){
  return (
    <aside className="hidden w-56 shrink-0 border-r border-border bg-background md:flex md:flex-col">
      <div className="p-4 font-bold">Qwikkle CMS</div>
      <nav className="flex flex-col gap-1 p-2 text-sm">
        <span className="px-3 py-2 text-muted-foreground">Dashboard</span>
        <span className="px-3 py-2 font-medium">Content</span>
        <span className="pl-6 py-1 text-muted-foreground">Home</span>
        <span className="pl-6 py-1 text-muted-foreground">Features</span>
        <span className="pl-6 py-1 text-muted-foreground">Pricing</span>
        <span className="px-3 py-2 text-muted-foreground">Media</span>
        <span className="px-3 py-2 text-muted-foreground">Settings</span>
      </nav>
    </aside>
  );
}
