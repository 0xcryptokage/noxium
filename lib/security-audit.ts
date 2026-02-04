// Security audit - token approvals and dangerous permissions

export interface SecurityIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'unlimited_approval' | 'suspicious_program' | 'large_approval' | 'old_approval';
  description: string;
  program?: string;
  token?: string;
  amount?: string;
  recommendation: string;
}

export async function auditWalletSecurity(wallet: string): Promise<SecurityIssue[]> {
  const issues: SecurityIssue[] = [];
  
  // TODO: Check token account delegations
  // TODO: Check program authorities
  // TODO: Analyze transaction patterns
  
  // Mock data for now
  if (Math.random() > 0.5) {
    issues.push({
      severity: 'critical',
      type: 'unlimited_approval',
      description: 'Unlimited token approval detected',
      token: 'USDC',
      program: 'Unknown DApp',
      recommendation: 'Revoke this approval immediately'
    });
  }
  
  return issues;
}

export function getSecurityScore(issues: SecurityIssue[]): number {
  if (issues.length === 0) return 100;
  
  let deduction = 0;
  issues.forEach(issue => {
    if (issue.severity === 'critical') deduction += 30;
    else if (issue.severity === 'high') deduction += 20;
    else if (issue.severity === 'medium') deduction += 10;
    else deduction += 5;
  });
  
  return Math.max(0, 100 - deduction);
}
