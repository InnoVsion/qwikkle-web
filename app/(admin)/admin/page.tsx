import type { Metadata } from 'next';
import type { LucideProps } from 'lucide-react';
import { Users, Building2, FileText, Activity } from 'lucide-react';

export const metadata: Metadata = { title: 'Dashboard — Qwikkle Admin' };

interface StatCard {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ComponentType<LucideProps>;
  iconColor: string;
  iconBg: string;
}

const statCards: StatCard[] = [
  {
    label: 'Total Users',
    value: '10,248',
    trend: '↑ 12% this week',
    trendUp: true,
    icon: Users,
    iconColor: '#E91E63',
    iconBg: 'rgba(233, 30, 99, 0.08)',
  },
  {
    label: 'Organizations',
    value: '342',
    trend: '↑ 3 this week',
    trendUp: true,
    icon: Building2,
    iconColor: '#2196F3',
    iconBg: 'rgba(33, 150, 243, 0.08)',
  },
  {
    label: 'Pending Docs',
    value: '17',
    trend: 'Needs review',
    trendUp: false,
    icon: FileText,
    iconColor: '#FF9800',
    iconBg: 'rgba(255, 152, 0, 0.08)',
  },
  {
    label: 'Active Sessions',
    value: '4,891',
    trend: '↑ 8% this week',
    trendUp: true,
    icon: Activity,
    iconColor: '#00C853',
    iconBg: 'rgba(0, 200, 83, 0.08)',
  },
];

export default function AdminDashboardPage(): React.ReactElement {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#263238]">Overview</h2>
        <p className="mt-0.5 text-sm text-[#9E9E9E]">
          Welcome back — here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-[#E4E8EC] bg-white p-5"
              style={{ boxShadow: '0 2px 16px rgba(38, 50, 56, 0.06)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#9E9E9E]">{card.label}</p>
                  <p className="mt-1.5 text-2xl font-bold text-[#263238]">{card.value}</p>
                </div>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: card.iconBg }}
                  aria-hidden="true"
                >
                  <Icon size={18} color={card.iconColor} />
                </span>
              </div>
              <p
                className="mt-3 text-xs font-medium"
                style={{ color: card.trendUp ? '#00C853' : '#FF9800' }}
              >
                {card.trend}
              </p>
            </div>
          );
        })}
      </div>

      {/* Placeholder for future dashboard content */}
      <div
        className="mt-6 rounded-2xl border border-[#E4E8EC] bg-white p-8 text-center"
        style={{ boxShadow: '0 2px 16px rgba(38, 50, 56, 0.06)' }}
      >
        <p className="text-sm text-[#B0BEC5]">
          Charts and activity feed — coming in a future session.
        </p>
      </div>
    </div>
  );
}
