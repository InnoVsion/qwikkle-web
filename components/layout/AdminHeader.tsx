// TODO: Implement admin header with breadcrumb navigation, notification bell, and user avatar

export function AdminHeader(){
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
      <span className="text-sm text-muted-foreground">Breadcrumb — placeholder</span>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Notifications</span>
        <span className="text-sm text-muted-foreground">Avatar</span>
      </div>
    </header>
  );
}
