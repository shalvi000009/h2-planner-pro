const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@h2planner.com' },
    update: {},
    create: {
      email: 'admin@h2planner.com',
      password: adminPassword,
      name: 'System Administrator',
      role: 'admin',
      status: 'active'
    }
  });

  // Create sample user
  const userPassword = await bcrypt.hash('user123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'user@h2planner.com' },
    update: {},
    create: {
      email: 'user@h2planner.com',
      password: userPassword,
      name: 'John Doe',
      role: 'user',
      status: 'active'
    }
  });

  // Create developer user
  const devPassword = await bcrypt.hash('dev123', 12);
  const developer = await prisma.user.upsert({
    where: { email: 'dev@h2planner.com' },
    update: {},
    create: {
      email: 'dev@h2planner.com',
      password: devPassword,
      name: 'Jane Developer',
      role: 'developer',
      status: 'active'
    }
  });

  // Create sample KPIs
  const kpi = await prisma.kPI.create({
    data: {
      co2Saved: 2500000,
      jobsCreated: 15000,
      netZero: 75.5,
      investment: 1200000000,
      energyGenerated: 500000
    }
  });

  // Create sample scenarios
  const scenario1 = await prisma.scenario.create({
    data: {
      name: 'Coastal Wind Farm Integration',
      description: 'Integration of offshore wind farms with hydrogen production facilities',
      notes: 'High potential for renewable energy generation and hydrogen production',
      score: 85,
      status: 'approved',
      tags: JSON.stringify(['wind', 'offshore', 'hydrogen']),
      data: JSON.stringify({
        location: { lat: 51.5074, lng: -0.1278 },
        capacity: '500MW',
        estimatedCO2Reduction: 250000
      }),
      userId: user.id
    }
  });

  const scenario2 = await prisma.scenario.create({
    data: {
      name: 'Urban Transport Hub',
      description: 'Hydrogen refueling station network for urban transportation',
      notes: 'Strategic placement for maximum accessibility and impact',
      score: 78,
      status: 'review',
      tags: JSON.stringify(['transport', 'urban', 'refueling']),
      data: JSON.stringify({
        stations: 15,
        coverage: 'Greater London Area',
        estimatedVehicles: 5000
      }),
      userId: developer.id
    }
  });

  // Create sample moderation items
  const moderation1 = await prisma.moderationItem.create({
    data: {
      title: 'New Solar Farm Dataset',
      description: 'Updated solar irradiance data for Southern England',
      type: 'dataset',
      status: 'PENDING',
      userId: user.id
    }
  });

  const moderation2 = await prisma.moderationItem.create({
    data: {
      title: 'Transport Infrastructure Proposal',
      description: 'Proposed hydrogen pipeline network connecting major cities',
      type: 'project',
      status: 'APPROVED',
      userId: developer.id,
      moderatorId: admin.id
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log('👥 Users created:');
  console.log(`   Admin: admin@h2planner.com / admin123`);
  console.log(`   User: user@h2planner.com / user123`);
  console.log(`   Developer: dev@h2planner.com / dev123`);
  console.log(`📊 KPIs: ${kpi.id}`);
  console.log(`📋 Scenarios: ${scenario1.id}, ${scenario2.id}`);
  console.log(`🔍 Moderation items: ${moderation1.id}, ${moderation2.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
