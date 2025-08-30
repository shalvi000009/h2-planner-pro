const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');
const { apiRateLimiter } = require('./middleware/auth');

// Import routes
const authRoutes = require('./routes/auth');
const scenarioRoutes = require('./routes/scenarios');

const app = express();
const prisma = new PrismaClient();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.mapbox.com"]
    }
  }
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting for all routes
app.use(apiRateLimiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    ok: true, 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/scenarios', scenarioRoutes);

// Legacy routes for backward compatibility
app.get('/api/kpis', async (req, res) => {
  try {
    const kpis = await prisma.kPI.findMany({ 
      orderBy: { createdAt: 'desc' }, 
      take: 1 
    });
    res.json(kpis[0] || { co2Saved: 0, jobsCreated: 0, netZero: 0, investment: 0, energyGenerated: 0 });
  } catch (e) {
    console.error('KPIs fetch error:', e);
    res.status(500).json({ error: 'Failed to fetch KPIs' });
  }
});

app.post('/api/kpis', async (req, res) => {
  try {
    const { co2Saved, jobsCreated, netZero, investment, energyGenerated } = req.body;
    const created = await prisma.kPI.create({ 
      data: { 
        co2Saved: co2Saved || 0, 
        jobsCreated: jobsCreated || 0, 
        netZero: netZero || 0,
        investment: investment || 0,
        energyGenerated: energyGenerated || 0
      } 
    });
    res.status(201).json(created);
  } catch (e) {
    console.error('KPIs save error:', e);
    res.status(500).json({ error: 'Failed to save KPIs' });
  }
});

// Moderation routes
app.get('/api/moderation', async (req, res) => {
  try {
    const items = await prisma.moderationItem.findMany({ 
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    res.json(items);
  } catch (e) {
    console.error('Moderation fetch error:', e);
    res.status(500).json({ error: 'Failed to fetch moderation queue' });
  }
});

app.post('/api/moderation', async (req, res) => {
  try {
    const { title, description, status, type, data, userId } = req.body;
    const created = await prisma.moderationItem.create({ 
      data: { 
        title, 
        description, 
        status: status || 'PENDING',
        type: type || 'dataset',
        data: data ? JSON.stringify(data) : null,
        userId: userId || null
      } 
    });
    res.status(201).json(created);
  } catch (e) {
    console.error('Moderation save error:', e);
    res.status(500).json({ error: 'Failed to save moderation item' });
  }
});

app.patch('/api/moderation/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status, reason } = req.body;
    const updated = await prisma.moderationItem.update({ 
      where: { id }, 
      data: { status, reason } 
    });
    res.json(updated);
  } catch (e) {
    console.error('Moderation update error:', e);
    res.status(500).json({ error: 'Failed to update moderation item' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 H2 Planner API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Environment: ${process.env.NODE_ENV || 'development'}`);
});