import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Filter, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockWorkOrders } from '@/data/mockData';

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

export default function WorkOrder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredOrders = mockWorkOrders.filter(wo => {
    const matchesSearch = wo.woNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || wo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-4">
        <button
          onClick={() => setStatusFilter(statusFilter === 'On-Time' ? null : 'On-Time')}
          className={`mes-card text-left transition-all ${statusFilter === 'On-Time' ? 'ring-2 ring-success' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {mockWorkOrders.filter(wo => wo.status === 'On-Time').length}
              </p>
              <p className="text-sm text-muted-foreground">On-Time</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'At-Risk' ? null : 'At-Risk')}
          className={`mes-card text-left transition-all ${statusFilter === 'At-Risk' ? 'ring-2 ring-warning' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                {mockWorkOrders.filter(wo => wo.status === 'At-Risk').length}
              </p>
              <p className="text-sm text-muted-foreground">At-Risk</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setStatusFilter(statusFilter === 'Late' ? null : 'Late')}
          className={`mes-card text-left transition-all ${statusFilter === 'Late' ? 'ring-2 ring-destructive' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">
                {mockWorkOrders.filter(wo => wo.status === 'Late').length}
              </p>
              <p className="text-sm text-muted-foreground">Late</p>
            </div>
          </div>
        </button>
      </motion.div>

      {/* Search & Filters */}
      <motion.div variants={item} className="mes-card">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by WO#, part number, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Date Range
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </motion.div>

      {/* Work Orders Table */}
      <motion.div variants={item} className="mes-card">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          Active Work Orders ({filteredOrders.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="mes-table">
            <thead>
              <tr>
                <th>WO Number</th>
                <th>Part Number</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Ship Date</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((wo) => (
                <tr key={wo.id} className="cursor-pointer">
                  <td className="font-mono font-medium">{wo.woNo}</td>
                  <td className="font-mono">{wo.partNo}</td>
                  <td className="max-w-xs truncate">{wo.description}</td>
                  <td className="text-center">{wo.qty}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{wo.reqShipDate}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            wo.status === 'On-Time' ? 'bg-success' :
                            wo.status === 'At-Risk' ? 'bg-warning' :
                            'bg-destructive'
                          }`}
                          style={{ width: `${wo.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-10">{wo.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={
                      wo.status === 'On-Time' ? 'mes-badge-success' :
                      wo.status === 'At-Risk' ? 'mes-badge-warning' :
                      'mes-badge-destructive'
                    }>
                      {wo.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
