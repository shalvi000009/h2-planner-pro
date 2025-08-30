import { Menu, Bell, User as UserIcon, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const Sidebar: React.FC<{ items: { label: string; href: string; icon?: React.ReactNode }[] }> = ({ items }) => {
  return (
    <motion.aside initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="hidden md:flex w-64 flex-col p-4 bg-white/10 backdrop-blur-xl border-r border-white/20 min-h-screen sticky top-0">
      <div className="text-xl font-bold mb-6">H2 Platform</div>
      <nav className="space-y-1">
        {items.map((it) => (
          <a key={it.href} href={it.href} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10">
            {it.icon}
            <span>{it.label}</span>
          </a>
        ))}
      </nav>
    </motion.aside>
  );
};

export const Topbar: React.FC<{ title: string }> = ({ title }) => {
  const { user, logout } = useAuth();
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/30 backdrop-blur-xl border-b border-white/20">
      <div className="flex items-center gap-2">
        <Menu className="md:hidden" />
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button size="icon" variant="ghost" className="rounded-full bg-white/30"><Bell className="h-5 w-5" /></Button>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/40">
          <UserIcon className="h-4 w-4" />
          <span className="text-sm">{user?.name || user?.email}</span>
          <Button size="sm" variant="ghost" onClick={logout}><LogOut className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
};

const PanelShell: React.FC<{ title: string; sidebar: React.ReactNode; children: React.ReactNode }> = ({ title, sidebar, children }) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.15),rgba(251,191,36,0.10),rgba(30,64,175,0.15))]">
      <div className="mx-auto max-w-7xl">
        <div className="flex">
          {sidebar}
          <div className="flex-1">
            <Topbar title={title} />
            <main className="p-4 md:p-6 space-y-6">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelShell;