import { motion } from 'framer-motion';
import { TestTube, Play, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
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

const testProcedures = [
  { id: 1, name: 'Power-On Self Test', duration: '5 min', status: 'complete', result: 'pass' },
  { id: 2, name: 'GPS Signal Acquisition', duration: '10 min', status: 'complete', result: 'pass' },
  { id: 3, name: 'Time Sync Verification', duration: '15 min', status: 'running', result: null },
  { id: 4, name: 'Output Signal Quality', duration: '20 min', status: 'pending', result: null },
  { id: 5, name: 'Environmental Stress Test', duration: '30 min', status: 'pending', result: null },
  { id: 6, name: 'Final Acceptance Criteria', duration: '10 min', status: 'pending', result: null },
];

export default function Testing() {
  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-foreground">Testing Station</h1>
        <p className="text-muted-foreground">ATP execution and ATR generation</p>
      </motion.div>

      {/* Active Test Info */}
      <motion.div variants={item} className="mes-card bg-info/5 border-info/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-info/20 flex items-center justify-center">
              <TestTube className="w-6 h-6 text-info" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-semibold text-lg">WO-282511</span>
                <span className="text-xs bg-info/20 text-info px-2 py-0.5 rounded-full">Testing</span>
              </div>
              <p className="text-muted-foreground">2U MODULAR MASTER CLOCK MGU A4-PTP</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Serial</p>
              <p className="font-mono font-medium">SN-2026-015</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="font-mono font-medium">3/6 Steps</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Test Procedures */}
        <motion.div variants={item} className="lg:col-span-2 mes-card">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Test Procedures</h2>
          <div className="space-y-3">
            {testProcedures.map((test) => (
              <div
                key={test.id}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  test.status === 'complete' && test.result === 'pass' ? 'bg-success/5 border-success/20' :
                  test.status === 'complete' && test.result === 'fail' ? 'bg-destructive/5 border-destructive/20' :
                  test.status === 'running' ? 'bg-info/5 border-info/20' :
                  'bg-muted/50 border-border'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  test.status === 'complete' && test.result === 'pass' ? 'bg-success' :
                  test.status === 'complete' && test.result === 'fail' ? 'bg-destructive' :
                  test.status === 'running' ? 'bg-info animate-pulse' :
                  'bg-muted'
                }`}>
                  {test.status === 'complete' && test.result === 'pass' ? (
                    <CheckCircle className="w-5 h-5 text-success-foreground" />
                  ) : test.status === 'complete' && test.result === 'fail' ? (
                    <XCircle className="w-5 h-5 text-destructive-foreground" />
                  ) : test.status === 'running' ? (
                    <Play className="w-4 h-4 text-info-foreground" />
                  ) : (
                    <span className="text-xs font-medium text-muted-foreground">{test.id}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${test.status === 'complete' ? 'text-muted-foreground' : ''}`}>
                    {test.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{test.duration}</span>
                  </div>
                </div>
                {test.status === 'pending' && (
                  <Button variant="outline" size="sm" className="gap-1">
                    <Play className="w-3 h-3" />
                    Start
                  </Button>
                )}
                {test.status === 'running' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <XCircle className="w-3 h-3" />
                      Fail
                    </Button>
                    <Button size="sm" className="gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Pass
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ATR Preview */}
        <motion.div variants={item} className="mes-card">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground">ATR Preview</h2>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Report ID</p>
              <p className="font-mono">ATR-2026-0115-001</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Inspector</p>
              <p>R. Williams</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-info rounded-full animate-pulse" />
                <span>In Progress</span>
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-medium mb-2">Results Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Passed</span>
                  <span className="text-success font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Failed</span>
                  <span className="text-destructive font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending</span>
                  <span className="font-medium">4</span>
                </div>
              </div>
            </div>
            <Button className="w-full gap-2" disabled>
              <FileText className="w-4 h-4" />
              Generate ATR
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
