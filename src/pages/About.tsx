import { motion } from 'framer-motion';
import { Info, Bug, Send, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import brandywineLogo from '@/assets/brandywine-logo.png';

const initialRequests = [
  { id: 1, type: 'feature', title: 'Add export to PDF for reports', status: 'Open', date: '2026-02-10', submittedBy: 'J. Smith' },
  { id: 2, type: 'bug', title: 'Dashboard chart not loading on refresh', status: 'In Progress', date: '2026-02-08', submittedBy: 'A. Johnson' },
  { id: 3, type: 'improvement', title: 'Improve search performance in Part Master', status: 'Closed', date: '2026-01-28', submittedBy: 'M. Davis' },
  { id: 4, type: 'feature', title: 'Add barcode scanning to Stockroom', status: 'Open', date: '2026-02-12', submittedBy: 'R. Wilson' },
  { id: 5, type: 'bug', title: 'Shipping label prints incorrect weight', status: 'Open', date: '2026-02-11', submittedBy: 'K. Lee' },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Open': return 'default';
    case 'In Progress': return 'secondary';
    case 'Closed': return 'outline';
    default: return 'default';
  }
};

const typeLabel = (type: string) => {
  switch (type) {
    case 'feature': return { label: 'Feature', variant: 'default' as const };
    case 'bug': return { label: 'Bug', variant: 'destructive' as const };
    case 'improvement': return { label: 'Improvement', variant: 'secondary' as const };
    default: return { label: type, variant: 'default' as const };
  }
};

const About = () => {
  const { toast } = useToast();
  const [submissionType, setSubmissionType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requests, setRequests] = useState(initialRequests);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      id: requests.length + 1,
      type: submissionType,
      title,
      status: 'Open',
      date: new Date().toISOString().split('T')[0],
      submittedBy: 'Current User',
    };
    setRequests([newRequest, ...requests]);
    toast({ title: 'Submitted', description: 'Your submission has been recorded. Thank you!' });
    setSubmissionType('');
    setTitle('');
    setDescription('');
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold text-foreground">About</h1>
        <p className="text-muted-foreground mt-1">Application information and feedback</p>
      </motion.div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Info className="w-4 h-4" /> About
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <Bug className="w-4 h-4" /> Feature/Bug List
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="items-center">
                <img src={brandywineLogo} alt="Brandywine Communications Logo" className="h-24 w-auto object-contain mb-4" />
                <CardTitle>pc/Link Real-Time Production Extension</CardTitle>
                <CardDescription>Manufacturing Execution System</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex justify-between"><span className="font-medium text-foreground">Version</span><span>1.0.0</span></div>
                <div className="flex justify-between"><span className="font-medium text-foreground">Build</span><span>2026.02.13</span></div>
                <div className="flex justify-between"><span className="font-medium text-foreground">Environment</span><span>Production</span></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Modules</CardTitle>
                <CardDescription>Active modules in this installation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {['Dashboard', 'Part Master', 'Work Order', 'Stockroom', 'Assembly', 'Testing', 'Troubleshooting', 'Quality Control', 'Shipping', 'AS9100 Compliance', 'Administration'].map((mod) => (
                    <li key={mod} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-foreground">{mod}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="feedback">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Feature/Bug List</CardTitle>
                  <CardDescription>Track feature requests and bug reports</CardDescription>
                </div>
                <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Request
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted By</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((req) => {
                      const t = typeLabel(req.type);
                      return (
                        <TableRow key={req.id}>
                          <TableCell><Badge variant={t.variant}>{t.label}</Badge></TableCell>
                          <TableCell className="font-medium">{req.title}</TableCell>
                          <TableCell><Badge variant={statusColor(req.status)}>{req.status}</Badge></TableCell>
                          <TableCell>{req.submittedBy}</TableCell>
                          <TableCell className="text-muted-foreground">{req.date}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Feature Request or Bug Report</DialogTitle>
            <DialogDescription>Help us improve the system by reporting issues or suggesting features</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={submissionType} onValueChange={setSubmissionType}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Brief summary" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Provide details..." value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[120px]" />
            </div>
            <Button type="submit" className="flex items-center gap-2">
              <Send className="w-4 h-4" /> Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default About;
