import { motion } from 'framer-motion';
import { AlertTriangle, Search, Plus, Clock, User, Tag } from 'lucide-react';
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

const defects = [
  {
    id: 'DEF-001',
    title: 'Intermittent GPS lock failure',
    workOrder: 'WO-282529',
    serialNo: 'SN-2025-089',
    severity: 'High',
    status: 'Open',
    assignee: 'J. Smith',
    createdAt: '2026-01-14 14:30',
  },
  {
    id: 'DEF-002',
    title: 'Timing output drift >50ns',
    workOrder: 'WO-282424',
    serialNo: 'SN-2025-102',
    severity: 'Medium',
    status: 'In Progress',
    assignee: 'M. Johnson',
    createdAt: '2026-01-13 09:15',
  },
  {
    id: 'DEF-003',
    title: 'Front panel LED not illuminating',
    workOrder: 'WO-282537',
    serialNo: 'SN-2026-003',
    severity: 'Low',
    status: 'Resolved',
    assignee: 'R. Williams',
    createdAt: '2026-01-10 16:45',
  },
];

export default function Troubleshooting() {
  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Troubleshooting</h1>
          <p className="text-muted-foreground">Defect logging and root cause analysis</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Log Defect
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-4 gap-4">
        <div className="mes-card">
          <p className="text-sm text-muted-foreground mb-1">Open</p>
          <p className="text-2xl font-bold text-destructive">3</p>
        </div>
        <div className="mes-card">
          <p className="text-sm text-muted-foreground mb-1">In Progress</p>
          <p className="text-2xl font-bold text-warning">2</p>
        </div>
        <div className="mes-card">
          <p className="text-sm text-muted-foreground mb-1">Resolved</p>
          <p className="text-2xl font-bold text-success">12</p>
        </div>
        <div className="mes-card">
          <p className="text-sm text-muted-foreground mb-1">Avg Resolution</p>
          <p className="text-2xl font-bold">2.4d</p>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="mes-card">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search defects..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filters</Button>
        </div>
      </motion.div>

      {/* Defects List */}
      <motion.div variants={item} className="space-y-3">
        {defects.map((defect) => (
          <div key={defect.id} className="mes-card hover:border-accent/30 transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                defect.severity === 'High' ? 'bg-destructive/10' :
                defect.severity === 'Medium' ? 'bg-warning/10' :
                'bg-muted'
              }`}>
                <AlertTriangle className={`w-5 h-5 ${
                  defect.severity === 'High' ? 'text-destructive' :
                  defect.severity === 'Medium' ? 'text-warning' :
                  'text-muted-foreground'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm text-muted-foreground">{defect.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    defect.status === 'Open' ? 'bg-destructive/10 text-destructive' :
                    defect.status === 'In Progress' ? 'bg-warning/10 text-warning' :
                    'bg-success/10 text-success'
                  }`}>
                    {defect.status}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    defect.severity === 'High' ? 'bg-destructive/10 text-destructive' :
                    defect.severity === 'Medium' ? 'bg-warning/10 text-warning' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {defect.severity}
                  </span>
                </div>
                <h3 className="font-medium text-foreground">{defect.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {defect.workOrder}
                  </span>
                  <span className="font-mono">{defect.serialNo}</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {defect.assignee}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {defect.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
