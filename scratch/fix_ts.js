const fs = require('fs');

function replaceInFile(filePath, search, replacement) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(search, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. alerts/page.tsx
replaceInFile(
  'src/app/(admin)/admin/alerts/page.tsx', 
  /new Date\(n\.created_at\)/g, 
  'new Date(n.created_at || new Date())'
);

// 2. api-monitoring/page.tsx
replaceInFile(
  'src/app/(admin)/admin/api-monitoring/page.tsx',
  /orderBy: \{ created_at: 'desc' \}/g,
  "orderBy: { login_time: 'desc' }"
);
replaceInFile(
  'src/app/(admin)/admin/api-monitoring/page.tsx',
  /new Date\(a\.created_at\)/g,
  'new Date(a.login_time || new Date())'
);

// 3. audit-logs/page.tsx
replaceInFile(
  'src/app/(admin)/admin/audit-logs/page.tsx',
  /log\.id\.substring\(0,6\)/g,
  'log.id.toString()'
);
replaceInFile(
  'src/app/(admin)/admin/audit-logs/page.tsx',
  /entity: log\.entity/g,
  'entity: log.entity_type'
);
replaceInFile(
  'src/app/(admin)/admin/audit-logs/page.tsx',
  /new Date\(log\.created_at\)/g,
  'new Date(log.created_at || new Date())'
);

// 4. departments/page.tsx
replaceInFile(
  'src/app/(admin)/admin/departments/page.tsx',
  /d\.status \|\| "Active"/g,
  'd.is_active === false ? "Inactive" : "Active"'
);

// 5. users/page.tsx
replaceInFile(
  'src/app/(admin)/admin/users/page.tsx',
  /u\.id\.substring\(0,6\)/g,
  'u.id.toString()'
);
replaceInFile(
  'src/app/(admin)/admin/users/page.tsx',
  /u\.role\.charAt\(0\)/g,
  '(u.role || "citizen").charAt(0)'
);
replaceInFile(
  'src/app/(admin)/admin/users/page.tsx',
  /new Date\(u\.created_at\)/g,
  'new Date(u.created_at || new Date())'
);

// 6. applications/page.tsx
replaceInFile(
  'src/app/(dashboard)/dashboard/applications/page.tsx',
  /app\.service\.name/g,
  'app.service?.name || "Unknown Service"'
);
replaceInFile(
  'src/app/(dashboard)/dashboard/applications/page.tsx',
  /new Date\(app\.created_at\)/g,
  'new Date(app.created_at || new Date())'
);

// 7. grievances/page.tsx
replaceInFile(
  'src/app/(dashboard)/dashboard/grievances/page.tsx',
  /subject: g\.subject/g,
  'subject: g.title'
);
replaceInFile(
  'src/app/(dashboard)/dashboard/grievances/page.tsx',
  /g\.status ===/g,
  '(g.status || "") ==='
);
replaceInFile(
  'src/app/(dashboard)/dashboard/grievances/page.tsx',
  /g\.status\.charAt\(0\)/g,
  '(g.status || "under_review").charAt(0)'
);
replaceInFile(
  'src/app/(dashboard)/dashboard/grievances/page.tsx',
  /new Date\(g\.created_at\)/g,
  'new Date(g.created_at || new Date())'
);

// 8. notifications/NotificationsClient.tsx
replaceInFile(
  'src/app/(dashboard)/dashboard/notifications/NotificationsClient.tsx',
  '  const filteredNotifications = activeTab === "All" \n    ? notifications \n    : notifications.filter(n => n.type === activeTab);',
  '  const filteredNotifications = activeTab === "All" \n    ? initialNotifications \n    : initialNotifications.filter((n: any) => n.type === activeTab);'
);

// 9. notifications/page.tsx
replaceInFile(
  'src/app/(dashboard)/dashboard/notifications/page.tsx',
  /new Date\(n\.created_at\)/g,
  'new Date(n.created_at || new Date())'
);

// 10. payments/page.tsx
replaceInFile(
  'src/app/(dashboard)/dashboard/payments/page.tsx',
  /p\.id\.substring\(0,6\)/g,
  'p.id.toString()'
);
replaceInFile(
  'src/app/(dashboard)/dashboard/payments/page.tsx',
  /new Date\(p\.created_at\)/g,
  'new Date(p.created_at || new Date())'
);

// 11. departmentActions.ts
replaceInFile(
  'src/app/actions/departmentActions.ts',
  /status: "Active"/g,
  'is_active: true'
);

// 12. documentActions.ts
replaceInFile(
  'src/app/actions/documentActions.ts',
  /file_url:/g,
  'file_path:'
);

// 13. grievanceActions.ts
replaceInFile(
  'src/app/actions/grievanceActions.ts',
  /subject,/g,
  'title: subject,'
);

console.log("Fixed TS errors");
