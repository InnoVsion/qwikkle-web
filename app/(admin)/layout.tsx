import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminHeader } from '@/components/layout/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}){
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
