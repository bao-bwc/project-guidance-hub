import { motion } from 'framer-motion';
import { CheckCircle, Search, FileText, Clock, User, Stamp } from 'lucide-react';
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

const pendingReviews = [
  {
    atrId: 'ATR-2026-0114-003',
    workOrder: 'WO-282511',
    serialNo: 'SN-2026-015',
    description: '2U MODULAR MASTER CLOCK MGU A4-PTP',
    inspector: 'R. Williams',
    completedAt: '2026-01-14 16:45',
    testsPassed: 6,
    testsFailed: 0,
  },
  {
    atrId: 'ATR-2026-0114-002',
    workOrder: 'WO-282424',
    serialNo: 'SN-2025-108',
    description: '2U MMC SAIC SATCOM CONFIG',
    inspector: 'K. Brown',
    completedAt: '2026-01-14 14:20',
    testsPassed: 5,
    testsFailed: 1,
  },
  {
    atrId: 'ATR-2026-0113-001',
    workOrder: 'WO-282537',
    serialNo: 'SN-2026-004',
    description: '1U MMC- NDDS TIME DIST UNIT',
    inspector: 'J. Smith',
    completedAt: '2026-01-13 11:30',
    testsPassed: 6,
    testsFailed: 0,
  },
];

export default function QualityControl() {
  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-4 gap-4">
        <div className="mes-card">
          <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
          <p className="text-2xl font-bold text-warning">3</p>
        </div>
        <div className="mes-card">
          <p className="text-sm text-muted-foreground mb-1">Approved Today</p>
          <p className="text-2xl font-bold text-success">5</p>
        </div>
        <div className="mes-card">
          <p className="text-sm text-muted-foreground mb-1">Rejected</p>
          <p className="text-2xl font-bold text-destructive">1</p>
        </div>
        <div className="mes-card">
          <p className="text-sm text-muted-foreground mb-1">Yield Rate</p>
          <p className="text-2xl font-bold text-success">98.2%</p>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="mes-card">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search ATR reports..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">Date Range</Button>
          <Button variant="outline">Status</Button>
        </div>
      </motion.div>

      {/* Pending Reviews */}
      <motion.div variants={item} className="mes-card">
        <h2 className="text-lg font-semibold mb-4 text-foreground">Pending QC Review</h2>
        <div className="space-y-3">
          {pendingReviews.map((review) => (
            <div 
              key={review.atrId} 
              className="p-4 border border-border rounded-lg hover:border-accent/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-medium">{review.atrId}</span>
                      <span className="mes-badge-warning">Pending Review</span>
                    </div>
                    <p className="text-sm text-foreground">{review.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="font-mono">{review.workOrder}</span>
                      <span className="font-mono">{review.serialNo}</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {review.inspector}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {review.completedAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Test Results</p>
                    <p className="font-medium">
                      <span className="text-success">{review.testsPassed}</span>
                      {review.testsFailed > 0 && (
                        <span className="text-destructive"> / {review.testsFailed}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View ATR</Button>
                    <Button size="sm" className="gap-1">
                      <Stamp className="w-3 h-3" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
