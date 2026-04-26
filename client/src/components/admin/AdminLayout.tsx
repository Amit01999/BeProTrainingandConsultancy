import { useState } from 'react';
import { Link } from 'wouter';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import logo from '@/asset/logo1.png';

export type AdminSection =
  | 'dashboard'
  | 'courses'
  | 'enrollments'
  | 'applications';

interface NavItem {
  key: AdminSection;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    key: 'courses',
    label: 'Manage Courses',
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    key: 'enrollments',
    label: 'Enrollments',
    icon: <Users className="h-4 w-4" />,
  },
  {
    key: 'applications',
    label: 'Manage Applications',
    icon: <ClipboardList className="h-4 w-4" />,
  },
];

// ── Shared sidebar body (reused in both mobile drawer and desktop sidebar) ──
function SidebarBody({
  activeSection,
  onNavClick,
  onClose,
}: {
  activeSection: AdminSection;
  onNavClick?: () => void;
  onClose?: () => void;
}) {
  const { user, logoutMutation } = useAuth();

  function handleLogout() {
    logoutMutation.mutate();
  }

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <img src={logo} alt="Logo" className="h-8 w-auto object-contain shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 leading-tight">
              Admin Panel
            </p>
            <p className="text-[10px] text-slate-400 truncate leading-tight">
              {user?.fullName ?? 'Administrator'}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            className="p-1 text-slate-400 hover:text-slate-600"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-5 px-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 px-3 mb-3">
          Main Menu
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(item => {
            const active = activeSection === item.key;
            return (
              <li key={item.key}>
                <Link
                  to={`/admin/${item.key}`}
                  onClick={onNavClick}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    text-sm font-medium cursor-pointer
                    transition-colors duration-150
                    ${
                      active
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <span className={active ? 'text-white' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {active && (
                    <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 shrink-0 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-primary transition-colors duration-150"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to site
        </Link>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="
            group w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg
            border border-red-200 bg-red-50 text-red-600
            text-sm font-medium
            hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-md
            transition-all duration-200 ease-in-out
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <LogOut className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
          <span>{logoutMutation.isPending ? 'Logging out…' : 'Log out'}</span>
        </button>
      </div>
    </div>
  );
}

// ── Main layout ──
export function AdminLayout({
  activeSection,
  children,
}: {
  activeSection: AdminSection;
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeLabel =
    NAV_ITEMS.find(i => i.key === activeSection)?.label ?? 'Admin';

  return (
    /*
     * h-screen + overflow-hidden on the shell:
     * The entire viewport is occupied. Nothing here scrolls.
     * Only <main> (overflow-y-auto) scrolls.
     */
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Mobile sidebar drawer (fixed, slides in) ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64
          bg-white border-r border-slate-200
          transition-transform duration-200 ease-in-out
          lg:hidden
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarBody
          activeSection={activeSection}
          onNavClick={() => setDrawerOpen(false)}
          onClose={() => setDrawerOpen(false)}
        />
      </aside>

      {/* ── Desktop sidebar (static in flex flow, never scrolls) ── */}
      <aside className="hidden lg:block w-64 h-full bg-white border-r border-slate-200 shrink-0">
        <SidebarBody activeSection={activeSection} />
      </aside>

      {/* ── Right column: header + scrollable content ── */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Mobile top bar */}
        <header className="lg:hidden h-14 bg-white border-b border-slate-200 flex items-center gap-3 px-4 shrink-0">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1 text-slate-500 hover:text-slate-700"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-slate-800">
            {activeLabel}
          </span>
        </header>

        {/* Desktop page header */}
        <div className="hidden lg:flex h-14 items-center px-8 bg-white border-b border-slate-200 shrink-0">
          <span className="text-sm font-semibold text-slate-800">
            {activeLabel}
          </span>
        </div>

        {/* ── Only this scrolls ── */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
