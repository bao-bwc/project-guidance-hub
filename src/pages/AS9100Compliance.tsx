import { motion } from 'framer-motion';
import { ShieldCheck, FileText, ClipboardCheck, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const complianceMetrics = [
  { label: 'Document Control', score: 94, status: 'compliant' },
  { label: 'Risk Management', score: 88, status: 'compliant' },
  { label: 'Supplier Quality', score: 76, status: 'attention' },
  { label: 'Process Control', score: 92, status: 'compliant' },
  { label: 'Nonconformance Management', score: 85, status: 'compliant' },
  { label: 'Corrective Actions', score: 79, status: 'attention' },
];

const recentAudits = [
  { id: 'AUD-2024-001', type: 'Internal Audit', date: '2024-01-15', status: 'Completed', findings: 2 },
  { id: 'AUD-2024-002', type: 'Supplier Audit', date: '2024-01-22', status: 'In Progress', findings: 0 },
  { id: 'AUD-2024-003', type: 'Process Audit', date: '2024-02-01', status: 'Scheduled', findings: 0 },
];

export default function AS9100Compliance() {
  const overallScore = Math.round(
    complianceMetrics.reduce((acc, metric) => acc + metric.score, 0) / complianceMetrics.length
  );

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">AS9100 Compliance</h1>
        </div>
        <p className="text-muted-foreground">
          Aerospace quality management system compliance monitoring and documentation
        </p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Overall Compliance</CardDescription>
              <CardTitle className="text-3xl text-primary">{overallScore}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={overallScore} className="h-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Open CARs</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-destructive" />
                3
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Corrective Action Requests</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Documents Due</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Clock className="h-6 w-6 text-amber-500" />
                7
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Reviews pending this month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Next Audit</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <ClipboardCheck className="h-6 w-6 text-primary" />
                12d
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">External surveillance audit</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Compliance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Compliance Metrics by Area
            </CardTitle>
            <CardDescription>AS9100D clause compliance scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {complianceMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{metric.label}</span>
                    <Badge
                      variant={metric.status === 'compliant' ? 'default' : 'secondary'}
                      className={metric.status === 'attention' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : ''}
                    >
                      {metric.status === 'compliant' ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {metric.score}%
                    </Badge>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Audits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Recent Audits
            </CardTitle>
            <CardDescription>Internal and external audit tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAudits.map((audit) => (
                <div
                  key={audit.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{audit.id}</p>
                      <p className="text-sm text-muted-foreground">{audit.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{audit.date}</span>
                    <Badge
                      variant={
                        audit.status === 'Completed'
                          ? 'default'
                          : audit.status === 'In Progress'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {audit.status}
                    </Badge>
                    {audit.findings > 0 && (
                      <Badge variant="destructive">{audit.findings} findings</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
