export const stats = [
  { id: 1, name: 'Total Invoices', value: '2,845', change: '+12.5%', status: 'up' },
  { id: 2, name: 'Pending Invoices', value: '148', change: '-4.2%', status: 'down' },
  { id: 3, name: 'Validated Invoices', value: '2,612', change: '+18.1%', status: 'up' },
  { id: 4, name: 'Rejected Invoices', value: '85', change: '+2.4%', status: 'down' },
];

export const transactions = [
  { id: 'INV-001', company: 'Nexus Corp', trn: '1002345678', amount: '$4,250.00', status: 'Cleared', irn: 'IRN-99827-001', uuid: 'f87a-8b2c-9a1d', submissionDate: '2024-03-20 09:45', date: '2024-03-20' },
  { id: 'INV-002', company: 'Al-Madina Ltd', trn: '1004561234', amount: '$1,820.50', status: 'Pending', irn: 'IRN-99827-002', uuid: 'e21b-4c5d-6f7e', submissionDate: '2024-03-21 11:20', date: '2024-03-21' },
  { id: 'INV-003', company: 'Global Tech', trn: '1007894561', amount: '$9,340.00', status: 'Rejected', irn: 'IRN-99827-003', uuid: 'd34c-5e6f-7g8h', submissionDate: '2024-03-21 14:10', date: '2024-03-21' },
  { id: 'INV-004', company: 'Swift Logistics', trn: '1001237890', amount: '$2,100.00', status: 'Cleared', irn: 'IRN-99827-004', uuid: 'c45d-6f7g-8h9i', submissionDate: '2024-03-22 10:05', date: '2024-03-22' },
  { id: 'INV-005', company: 'Vertex Solutions', trn: '1009876543', amount: '$6,450.25', status: 'Cleared', irn: 'IRN-99827-005', uuid: 'b56e-7g8h-9i0j', submissionDate: '2024-03-22 16:30', date: '2024-03-22' },
];

export const chartData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 700 },
];

export const companies = [
  { id: 'c1', name: 'Zentrix Middle East', trn: '100123456789' },
  { id: 'c2', name: 'Bilal Engineering', trn: '100987654321' },
  { id: 'c3', name: 'HCC Logistics', trn: '100456789123' },
];

export const businessPartners = [
  { id: 'BP-1001', name: 'Alpha Solutions LLC', type: 'Customer', group: 'Private', currency: 'AED', balance: '12,500.00' },
  { id: 'BP-1002', name: 'Global Traders Inc', type: 'Vendor', group: 'Supplier', currency: 'USD', balance: '0.00' },
  { id: 'BP-1003', name: 'Nexus Corp', type: 'Customer', group: 'Enterprise', currency: 'AED', balance: '45,200.00' },
  { id: 'BP-1004', name: 'Desert Oasis Retail', type: 'Customer', group: 'Retail', currency: 'AED', balance: '3,100.00' },
  { id: 'BP-1005', name: 'TechFlow Systems', type: 'Vendor', group: 'IT Services', currency: 'USD', balance: '8,400.00' }
];

export const items = [
  { id: 'ITM-001', description: 'Consulting Services - Standard', group: 'Services', uom: 'Hour', price: '$150.00', stock: 'N/A' },
  { id: 'ITM-002', description: 'Enterprise Server Node X1', group: 'Hardware', uom: 'Unit', price: '$2,400.00', stock: '45' },
  { id: 'ITM-003', description: 'Cloud Storage Tier 1 (1TB)', group: 'Software', uom: 'Month', price: '$45.00', stock: 'N/A' },
  { id: 'ITM-004', description: 'Network Switch 24-Port', group: 'Hardware', uom: 'Unit', price: '$320.00', stock: '12' },
  { id: 'ITM-005', description: 'Annual Maintenance Contract', group: 'Services', uom: 'Year', price: '$1,200.00', stock: 'N/A' }
];

export const arCreditMemos = [
  { id: 'ARCM-001', company: 'Nexus Corp', trn: '1002345678', amount: '-$850.00', reason: 'Overcharge on Consulting Hours', refInvoice: 'INV-001', status: 'Cleared', irn: 'IRN-CM-99827-101', uuid: 'g98h-0i1j-1k2l', submissionDate: '2024-03-22 11:00', date: '2024-03-22' },
  { id: 'ARCM-002', company: 'Alpha Solutions LLC', trn: '100123456789', amount: '-$320.00', reason: 'Returned Goods — Network Switch', refInvoice: 'INV-004', status: 'Pending', irn: 'IRN-CM-99827-102', uuid: 'h09i-1j2k-2l3m', submissionDate: '2024-03-23 15:30', date: '2024-03-23' },
  { id: 'ARCM-003', company: 'Desert Oasis Retail', trn: '1009876543', amount: '-$1,200.00', reason: 'Service Cancellation Refund', refInvoice: 'INV-005', status: 'Cleared', irn: 'IRN-CM-99827-103', uuid: 'i10j-2k3l-3m4n', submissionDate: '2024-03-24 10:15', date: '2024-03-24' },
  { id: 'ARCM-004', company: 'Global Tech', trn: '1007894561', amount: '-$450.00', reason: 'Duplicate Invoice Correction', refInvoice: 'INV-003', status: 'Rejected', irn: 'IRN-CM-99827-104', uuid: 'j21k-3l4m-4n5o', submissionDate: '2024-03-25 13:45', date: '2024-03-25' },
];

export const apCreditMemos = [
  { id: 'APCM-001', company: 'Global Traders Inc', trn: '1004561234', amount: '-$2,100.00', reason: 'Vendor Overcharge on Server Units', refInvoice: 'INV-002', status: 'Cleared', irn: 'IRN-CM-99827-201', uuid: 'k32l-4m5n-5o6p', submissionDate: '2024-03-20 16:50', date: '2024-03-20' },
  { id: 'APCM-002', company: 'TechFlow Systems', trn: '1001237890', amount: '-$560.00', reason: 'Defective Hardware Return', refInvoice: 'INV-004', status: 'Pending', irn: 'IRN-CM-99827-202', uuid: 'l43m-5n6o-6p7q', submissionDate: '2024-03-21 09:20', date: '2024-03-21' },
  { id: 'APCM-003', company: 'Global Traders Inc', trn: '1004561234', amount: '-$900.00', reason: 'Storage Contract Early Termination', refInvoice: 'INV-005', status: 'Cleared', irn: 'IRN-CM-99827-203', uuid: 'm54n-6o7p-7q8r', submissionDate: '2024-03-23 11:40', date: '2024-03-23' },
];

export const billingUsage = {
  tierLimit: 5000,
  consumed: 5240,
  overageLimit: 1000,
  resetDate: '2024-12-31',
  currency: 'AED',
  overageRate: 0.75,
  trnBreakdown: [
    { name: 'Zentrix Middle East', trn: '100123456789', usage: 1850, type: 'Subsidiary' },
    { name: 'Bilal Engineering', trn: '100987654321', usage: 2140, type: 'Subsidiary' },
  ]
};

export const auditLogs = [
  { 
    id: 'L-101', 
    timestamp: '2024-03-20 09:45:12', 
    docId: 'INV-001', 
    action: 'Submitted', 
    user: 'system.api', 
    status: 'Success',
    rawLog: { endpoint: '/v1/clearance', request_id: 'req_88234', response_code: 200, message: 'Document received and queued.' }
  },
  { 
    id: 'L-102', 
    timestamp: '2024-03-20 09:45:18', 
    docId: 'INV-001', 
    action: 'FTA Validated', 
    user: 'fta.portal', 
    status: 'Success',
    rawLog: { irn: 'IRN-99827-001', validation_result: 'PASS', signature_check: 'OK' }
  },
  { 
    id: 'L-103', 
    timestamp: '2024-03-21 11:20:05', 
    docId: 'INV-002', 
    action: 'Submitted', 
    user: 'admin.hcc', 
    status: 'Pending',
    rawLog: { endpoint: '/v1/clearance', request_id: 'req_88291', response_code: 202, message: 'Processing in progress.' }
  },
  { 
    id: 'L-104', 
    timestamp: '2024-03-21 14:10:45', 
    docId: 'INV-003', 
    action: 'Rejected', 
    user: 'fta.portal', 
    status: 'Error',
    rawLog: { error_code: 'ERR_TRN_INVALID', error_msg: 'The recipient TRN is not active in FTA portal.', severity: 'CRITICAL' }
  },
  { 
    id: 'L-105', 
    timestamp: '2024-03-22 10:05:30', 
    docId: 'INV-004', 
    action: 'Archived', 
    user: 'system.cron', 
    status: 'Success',
    rawLog: { archive_id: 'ARC_7721', erp_sync: 'Completed', vault: 'Local-ERP-DB' }
  },
];

export const hardcodedUsers = [
  { id: 1, username: 'admin', password: 'admin123', name: 'System Administrator', role: 'Super Admin', initials: 'SA' },
  { id: 2, username: 'hcc', password: 'hcc_erp', name: 'HCC Operations', role: 'Operations Manager', initials: 'HO' }
];

export const systemActivityLogs = [
  { id: 'SYS-5092', timestamp: '2024-03-22 08:15:02', user: 'admin@hcc.ae', role: 'System Admin', action: 'User Login', ip: '192.168.1.45', status: 'Success', detail: 'Successful authentication via SSO.' },
  { id: 'SYS-5093', timestamp: '2024-03-22 08:45:12', user: 'j.doe@hcc.ae', role: 'Finance Manager', action: 'Role Update', ip: '10.0.0.55', status: 'Success', detail: 'Updated permissions for user s.smith@hcc.ae to "Reviewer".' },
  { id: 'SYS-5094', timestamp: '2024-03-22 09:12:44', user: 'system.api', role: 'API Client', action: 'Token Renewal', ip: '172.16.0.12', status: 'Success', detail: 'OAuth2 bearer token renewed successfully for 24h.' },
  { id: 'SYS-5095', timestamp: '2024-03-22 10:05:30', user: 'admin@hcc.ae', role: 'System Admin', action: 'Settings Change', ip: '192.168.1.45', status: 'Warning', detail: 'Changed Global Retry Limit from 3 to 5.' },
  { id: 'SYS-5096', timestamp: '2024-03-22 11:30:00', user: 'unknown', role: 'Guest', action: 'Failed Login', ip: '45.22.19.102', status: 'Error', detail: 'Invalid credentials attempted 3 times.' },
  { id: 'SYS-5097', timestamp: '2024-03-22 14:22:15', user: 'admin@hcc.ae', role: 'System Admin', action: 'User Logout', ip: '192.168.1.45', status: 'Success', detail: 'Session terminated gracefully.' },
];
