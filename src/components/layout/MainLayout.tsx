'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, LayoutDashboard, Receipt, Wallet, Tags } from 'lucide-react';
import { create } from 'zustand';

// Zustand store for theme
interface ThemeStore {
  theme: string;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light', // default light theme
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Expenses', path: '/expenses', icon: <Receipt size={20} /> },
    { name: 'Income', path: '/income', icon: <Wallet size={20} /> },
    { name: 'Categories', path: '/categories', icon: <Tags size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 shadow-xl hidden md:flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-base-300 flex items-center gap-2">
          <Wallet className="text-primary" />
          <span>Expense Tracker</span>
        </div>
        <ul className="menu p-4 w-64 text-base-content flex-1 gap-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path} 
                className={pathname === item.path ? 'active' : ''}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="navbar bg-base-100 shadow-sm px-4">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">
              {navItems.find(i => i.path === pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex-none gap-4">
            <button className="btn btn-ghost btn-circle" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="text-lg">US</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
