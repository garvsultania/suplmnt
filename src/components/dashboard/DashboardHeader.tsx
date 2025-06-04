import { useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NotificationList } from './NotificationList';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Activity {
  type: string;
  title: string;
  time: string;
  icon: string;
  color: string;
}

interface DashboardHeaderProps {
  recentActivities: Activity[];
}

export const DashboardHeader = ({ recentActivities }: DashboardHeaderProps) => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-mint font-bold text-xl">suplmnt</span>
            </div>
            <div className="hidden md:block ml-8">
              <div className="flex items-baseline space-x-4">
                <h1 className="text-lg font-medium text-slate">Dashboard</h1>
                <span className="text-sm text-slate/60">|</span>
                <span className="text-sm text-slate/60">Welcome back, Alex</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 rounded-full hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsNotificationModalOpen(true)}
            >
              <Bell className="w-5 h-5 text-slate/70" />
              {recentActivities.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-coral rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-white font-medium">{recentActivities.length}</span>
                </span>
              )}
            </button>

            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-50 transition-colors duration-200">
                <div className="w-8 h-8 rounded-full bg-gradient-mint flex items-center justify-center">
                  <span className="text-white font-medium">A</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate/60" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-gray-50' : ''
                        } block px-4 py-2 text-sm text-slate/70`}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-gray-50' : ''
                        } block px-4 py-2 text-sm text-slate/70`}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-gray-50' : ''
                        } block px-4 py-2 text-sm text-slate/70`}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      <Dialog open={isNotificationModalOpen} onOpenChange={setIsNotificationModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <NotificationList activities={recentActivities} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
