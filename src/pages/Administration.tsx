import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Users, Shield, FileText, Plus, Search, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const users = [
  { id: '1', username: 'admin', name: 'System Administrator', role: 'Administrator', department: 'Management', status: 'Active' },
  { id: '2', username: 'jsmith', name: 'John Smith', role: 'Assembler', department: 'Production', status: 'Active' },
  { id: '3', username: 'mjohnson', name: 'Mary Johnson', role: 'Tester', department: 'Production', status: 'Active' },
  { id: '4', username: 'rwilliams', name: 'Robert Williams', role: 'Tester', department: 'Quality', status: 'Active' },
  { id: '5', username: 'kbrown', name: 'Karen Brown', role: 'Quality', department: 'Quality', status: 'Active' },
  { id: '6', username: 'ldavis', name: 'Linda Davis', role: 'Technician', department: 'Production', status: 'Inactive' },
];

const auditLogs = [
  { id: '1', action: 'Work Order Updated', user: 'admin', target: 'WO-282537', timestamp: '2026-01-15 09:30:15' },
  { id: '2', action: 'ATR Approved', user: 'kbrown', target: 'ATR-2026-0114-003', timestamp: '2026-01-15 09:15:22' },
  { id: '3', action: 'User Login', user: 'jsmith', target: '-', timestamp: '2026-01-15 08:45:00' },
  { id: '4', action: 'Serial Number Created', user: 'mjohnson', target: 'SN-2026-016', timestamp: '2026-01-15 08:30:45' },
  { id: '5', action: 'Test Failed', user: 'rwilliams', target: 'WO-282424 / Step 3', timestamp: '2026-01-14 16:20:10' },
];

export default function Administration() {
  const [activeTab, setActiveTab] = useState<'users' | 'audit'>('users');

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Administration</h1>
        <p className="text-muted-foreground">User management and system audit logs</p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={item} className="flex gap-2">
        <Button
          variant={activeTab === 'users' ? 'default' : 'outline'}
          onClick={() => setActiveTab('users')}
          className="gap-2"
        >
          <Users className="w-4 h-4" />
          User Management
        </Button>
        <Button
          variant={activeTab === 'audit' ? 'default' : 'outline'}
          onClick={() => setActiveTab('audit')}
          className="gap-2"
        >
          <FileText className="w-4 h-4" />
          Audit Logs
        </Button>
      </motion.div>

      {activeTab === 'users' ? (
        <>
          {/* Search & Add */}
          <motion.div variants={item} className="mes-card">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-10"
                />
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add User
              </Button>
            </div>
          </motion.div>

          {/* Users Table */}
          <motion.div variants={item} className="mes-card">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Users ({users.length})</h2>
            <div className="overflow-x-auto">
              <table className="mes-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="font-mono">{user.username}</td>
                      <td className="font-medium">{user.name}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Shield className={`w-4 h-4 ${
                            user.role === 'Administrator' ? 'text-destructive' :
                            user.role === 'Quality' ? 'text-success' :
                            'text-muted-foreground'
                          }`} />
                          {user.role}
                        </div>
                      </td>
                      <td className="text-muted-foreground">{user.department}</td>
                      <td>
                        <span className={user.status === 'Active' ? 'mes-badge-success' : 'mes-badge-warning'}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          {/* Audit Logs */}
          <motion.div variants={item} className="mes-card">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search audit logs..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Date Range</Button>
              <Button variant="outline">Export</Button>
            </div>
          </motion.div>

          <motion.div variants={item} className="mes-card">
            <h2 className="text-lg font-semibold mb-4 text-foreground">System Activity</h2>
            <div className="overflow-x-auto">
              <table className="mes-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Action</th>
                    <th>User</th>
                    <th>Target</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="font-mono text-sm">{log.timestamp}</td>
                      <td className="font-medium">{log.action}</td>
                      <td className="font-mono">{log.user}</td>
                      <td className="text-muted-foreground">{log.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
