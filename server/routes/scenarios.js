const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, requireRole, requireOwnership, apiRateLimiter } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Helper function to log user activity
const logActivity = async (userId, action, details = null, ipAddress = null, userAgent = null) => {
  try {
    await prisma.userActivity.create({
      data: {
        userId,
        action,
        details: details ? JSON.stringify(details) : null,
        ipAddress,
        userAgent
      }
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

// Get all scenarios (filtered by user role)
router.get('/', authenticateToken, apiRateLimiter, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    
    // Filter by status
    if (status) {
      where.status = status;
    }

    // Search functionality
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Role-based filtering
    if (req.user.role === 'admin') {
      // Admins can see all scenarios
    } else {
      // Users can only see their own scenarios and approved ones
      where.OR = [
        { userId: req.user.id },
        { status: 'approved' }
      ];
    }

    const scenarios = await prisma.scenario.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      },
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.scenario.count({ where });

    res.json({
      scenarios,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Scenarios fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch scenarios' });
  }
});

// Get single scenario
router.get('/:id', authenticateToken, apiRateLimiter, async (req, res) => {
  try {
    const scenarioId = parseInt(req.params.id);
    
    const scenario = await prisma.scenario.findUnique({
      where: { id: scenarioId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    });

    if (!scenario) {
      return res.status(404).json({ error: 'Scenario not found' });
    }

    // Check access permissions
    if (req.user.role !== 'admin' && scenario.userId !== req.user.id && scenario.status !== 'approved') {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ scenario });
  } catch (error) {
    console.error('Scenario fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch scenario' });
  }
});

// Create new scenario
router.post('/', authenticateToken, apiRateLimiter, async (req, res) => {
  try {
    const { name, description, notes, score, tags, data } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Scenario name is required' });
    }

    const scenario = await prisma.scenario.create({
      data: {
        name,
        description: description || null,
        notes: notes || null,
        score: score || 0,
        tags: tags ? JSON.stringify(tags) : null,
        data: data ? JSON.stringify(data) : null,
        userId: req.user.id,
        status: 'draft'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    });

    // Log activity
    await logActivity(req.user.id, 'create_scenario', { scenarioId: scenario.id, name }, req.ip, req.get('User-Agent'));

    res.status(201).json({
      message: 'Scenario created successfully',
      scenario
    });
  } catch (error) {
    console.error('Scenario creation error:', error);
    res.status(500).json({ error: 'Failed to create scenario' });
  }
});

// Update scenario
router.put('/:id', authenticateToken, requireOwnership('scenario'), apiRateLimiter, async (req, res) => {
  try {
    const scenarioId = parseInt(req.params.id);
    const { name, description, notes, score, tags, data, status } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (notes !== undefined) updateData.notes = notes;
    if (score !== undefined) updateData.score = score;
    if (tags !== undefined) updateData.tags = tags ? JSON.stringify(tags) : null;
    if (data !== undefined) updateData.data = data ? JSON.stringify(data) : null;
    
    // Only allow status updates for admins or if status is 'draft'
    if (status && (req.user.role === 'admin' || status === 'draft')) {
      updateData.status = status;
    }

    const scenario = await prisma.scenario.update({
      where: { id: scenarioId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    });

    // Log activity
    await logActivity(req.user.id, 'update_scenario', { scenarioId, updates: updateData }, req.ip, req.get('User-Agent'));

    res.json({
      message: 'Scenario updated successfully',
      scenario
    });
  } catch (error) {
    console.error('Scenario update error:', error);
    res.status(500).json({ error: 'Failed to update scenario' });
  }
});

// Delete scenario
router.delete('/:id', authenticateToken, requireOwnership('scenario'), apiRateLimiter, async (req, res) => {
  try {
    const scenarioId = parseInt(req.params.id);

    await prisma.scenario.delete({
      where: { id: scenarioId }
    });

    // Log activity
    await logActivity(req.user.id, 'delete_scenario', { scenarioId }, req.ip, req.get('User-Agent'));

    res.json({ message: 'Scenario deleted successfully' });
  } catch (error) {
    console.error('Scenario deletion error:', error);
    res.status(500).json({ error: 'Failed to delete scenario' });
  }
});

// Admin: Approve/Reject scenario
router.patch('/:id/status', authenticateToken, requireRole('admin'), apiRateLimiter, async (req, res) => {
  try {
    const scenarioId = parseInt(req.params.id);
    const { status, reason } = req.body;

    if (!['draft', 'review', 'approved', 'implemented'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const scenario = await prisma.scenario.update({
      where: { id: scenarioId },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    });

    // Log activity
    await logActivity(req.user.id, 'update_scenario_status', { 
      scenarioId, 
      status, 
      reason 
    }, req.ip, req.get('User-Agent'));

    res.json({
      message: 'Scenario status updated successfully',
      scenario
    });
  } catch (error) {
    console.error('Scenario status update error:', error);
    res.status(500).json({ error: 'Failed to update scenario status' });
  }
});

// Get scenario statistics
router.get('/stats/overview', authenticateToken, apiRateLimiter, async (req, res) => {
  try {
    const where = {};
    
    // Role-based filtering
    if (req.user.role !== 'admin') {
      where.OR = [
        { userId: req.user.id },
        { status: 'approved' }
      ];
    }

    const [total, draft, review, approved, implemented] = await Promise.all([
      prisma.scenario.count({ where }),
      prisma.scenario.count({ where: { ...where, status: 'draft' } }),
      prisma.scenario.count({ where: { ...where, status: 'review' } }),
      prisma.scenario.count({ where: { ...where, status: 'approved' } }),
      prisma.scenario.count({ where: { ...where, status: 'implemented' } })
    ]);

    const avgScore = await prisma.scenario.aggregate({
      where,
      _avg: { score: true }
    });

    res.json({
      stats: {
        total,
        draft,
        review,
        approved,
        implemented,
        averageScore: avgScore._avg.score || 0
      }
    });
  } catch (error) {
    console.error('Scenario stats error:', error);
    res.status(500).json({ error: 'Failed to fetch scenario statistics' });
  }
});

module.exports = router;
