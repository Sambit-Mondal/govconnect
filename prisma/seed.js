const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting DB Seed...');

  // 1. Create System Settings
  const settings = [
    { key: 'platform_name', value: 'GovConnect' },
    { key: 'maintenance_mode', value: 'false' },
    { key: 'session_timeout', value: '30' }
  ];
  for (const s of settings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s
    });
  }
  console.log('System Settings seeded.');

  // 2. Create Departments
  const deptData = [
    { name: 'Transport Department', code: 'DEPT-TRANS' },
    { name: 'Health & Family Welfare', code: 'DEPT-HLTH' },
    { name: 'Revenue Department', code: 'DEPT-REV' }
  ];
  const depts = [];
  for (const d of deptData) {
    const dept = await prisma.department.upsert({
      where: { code: d.code },
      update: {},
      create: d
    });
    depts.push(dept);
  }
  console.log('Departments seeded.');

  // 3. Create Services
  const services = [
    { name: 'Driving License Renewal', code: 'SRV-DL-01', department_id: depts[0].id, category: 'Transport', processing_time: 7, fee_amount: 500 },
    { name: 'Birth Certificate', code: 'SRV-BC-01', department_id: depts[1].id, category: 'Health', processing_time: 14, fee_amount: 50 },
    { name: 'Income Certificate', code: 'SRV-IC-01', department_id: depts[2].id, category: 'Revenue', processing_time: 10, fee_amount: 25 }
  ];
  const srvs = [];
  for (const s of services) {
    const srv = await prisma.service.upsert({
      where: { code: s.code },
      update: {},
      create: s
    });
    srvs.push(srv);
  }
  console.log('Services seeded.');

  // 4. Create Schemes
  const schemes = [
    { name: 'Senior Citizen Health Scheme', code: 'SCH-HLTH-01', department_id: depts[1].id, min_age: 60, benefits: 'Free health checkups' },
    { name: 'Farmer Subsidy Program', code: 'SCH-REV-01', department_id: depts[2].id, max_income: 500000, benefits: 'Subsidized seeds and fertilizer' }
  ];
  for (const s of schemes) {
    await prisma.scheme.upsert({
      where: { code: s.code },
      update: {},
      create: s
    });
  }
  console.log('Schemes seeded.');

  // 5. Create Government Offices (Nearby Places)
  const offices = [
    { name: 'Central RTO Office', department_id: depts[0].id, address: '123 Main St', type: 'RTO', city: 'Metropolis', latitude: 28.6139, longitude: 77.2090 },
    { name: 'City Civil Hospital', department_id: depts[1].id, address: '456 Health Ave', type: 'Hospital', city: 'Metropolis', latitude: 28.5355, longitude: 77.3910 }
  ];
  for (const o of offices) {
    await prisma.governmentOffice.create({
      data: o
    });
  }
  console.log('Offices seeded.');

  // 6. Create Users (Admin & Citizens)
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@govconnect.in' },
    update: {},
    create: {
      name: 'System Admin',
      email: 'admin@govconnect.in',
      password: hashedAdminPassword,
      role: 'admin',
      two_factor_enabled: true
    }
  });

  const hashedCitizenPassword = await bcrypt.hash('citizen123', 10);
  const citizen = await prisma.user.upsert({
    where: { email: 'citizen@govconnect.in' },
    update: {},
    create: {
      name: 'Ravi Kumar',
      email: 'citizen@govconnect.in',
      password: hashedCitizenPassword,
      role: 'citizen',
      aadhar_number: '123456789012'
    }
  });
  console.log('Users seeded.');

  // 7. Seed Applications, Consents, etc. for the Citizen
  await prisma.application.create({
    data: {
      user_id: citizen.id,
      service_id: srvs[0].id,
      status: 'approved',
      data: { "license_number": "DL-12345", "renewal_years": 5 }
    }
  });

  await prisma.application.create({
    data: {
      user_id: citizen.id,
      service_id: srvs[1].id,
      status: 'pending',
      data: { "hospital_name": "City Civil Hospital", "date_of_birth": "2023-01-01" }
    }
  });

  await prisma.dataConsent.create({
    data: {
      user_id: citizen.id,
      department_id: depts[0].id,
      purpose: 'Verification of driving records'
    }
  });

  await prisma.notification.create({
    data: {
      user_id: citizen.id,
      title: 'Application Approved',
      message: 'Your Driving License Renewal has been approved.',
      type: 'status_update'
    }
  });

  await prisma.payment.create({
    data: {
      user_id: citizen.id,
      amount: 500,
      status: 'completed',
      description: 'Fee for Driving License Renewal'
    }
  });

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
