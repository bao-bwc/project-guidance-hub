import { motion } from 'framer-motion';
import { Wrench, Play, Pause, CheckCircle, FileText, ClipboardCheck } from 'lucide-react';
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

const activeSession = {
  workOrder: 'WO-282537',
  partNo: '033010019',
  description: '1U MMC- NDDS TIME DIST UNIT',
  serialNo: 'SN-2026-001',
  station: 'ASM-01',
  startTime: '09:15:00',
  elapsedTime: '02:45:30',
};

export default function Assembly() {
  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >

      {/* Active Session Info */}
      <motion.div variants={item} className="mes-card bg-accent/5 border-accent/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-semibold text-lg">{activeSession.workOrder}</span>
                <span className="mes-badge-success">Active</span>
              </div>
              <p className="text-muted-foreground">{activeSession.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Serial Number</p>
              <p className="font-mono font-medium">{activeSession.serialNo}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Station</p>
              <p className="font-mono font-medium">{activeSession.station}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Elapsed</p>
              <p className="font-mono font-medium text-lg">{activeSession.elapsedTime}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Pause className="w-4 h-4" />
              </Button>
              <Button className="gap-2">
                <CheckCircle className="w-4 h-4" />
                Complete
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Drawing & ATP side by side */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Assembly Drawing */}
        <motion.div variants={item} className="mes-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">Assembly Drawing</h2>
            </div>
            <Button variant="outline" size="sm">Full Screen</Button>
          </div>
          <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center border border-dashed border-border">
            <div className="text-center text-muted-foreground p-8">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="font-medium mb-2">Assembly Drawing: 033010019-DWG</p>
              <p className="text-sm">PDF/Image viewer would display here</p>
              <p className="text-xs mt-4 text-muted-foreground/60">Rev C1 | Updated: 2025-12-01</p>
            </div>
          </div>
        </motion.div>

        {/* ATP Checklist */}
        <motion.div variants={item} className="mes-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">ATP Checklist</h2>
            </div>
            <span className="text-sm text-muted-foreground">ATP #950000125</span>
          </div>
          
          <div className="space-y-3">
            {[
              { id: 1, step: 'Verify chassis assembly integrity', status: 'complete' },
              { id: 2, step: 'Install MCM module in slot 1', status: 'complete' },
              { id: 3, step: 'Connect power harness (P1)', status: 'complete' },
              { id: 4, step: 'Install GPS antenna connector', status: 'active' },
              { id: 5, step: 'Route timing cables per diagram', status: 'pending' },
              { id: 6, step: 'Verify LED indicators', status: 'pending' },
              { id: 7, step: 'Perform initial power-on test', status: 'pending' },
              { id: 8, step: 'Record serial numbers in ATR', status: 'pending' },
            ].map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  step.status === 'complete' ? 'bg-success/5 border-success/20' :
                  step.status === 'active' ? 'bg-accent/5 border-accent/20' :
                  'bg-muted/50 border-border'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  step.status === 'complete' ? 'bg-success text-success-foreground' :
                  step.status === 'active' ? 'bg-accent text-accent-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {step.status === 'complete' ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                <span className={`flex-1 ${
                  step.status === 'complete' ? 'text-muted-foreground line-through' :
                  step.status === 'active' ? 'font-medium' :
                  ''
                }`}>
                  {step.step}
                </span>
                {step.status === 'active' && (
                  <Button size="sm" className="gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Mark Done
                  </Button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
