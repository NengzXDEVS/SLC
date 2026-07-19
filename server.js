const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Static files
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));
app.use('/', express.static(path.join(__dirname, '.')));

// Health check endpoint (should be before route requires)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), env: process.env.NODE_ENV || 'development' });
});

// Initialize data directory
async function initializeApp() {
  try {
    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, 'data');
    const imagesDir = path.join(__dirname, 'public/images');
    
    await fs.mkdir(dataDir, { recursive: true });
    await fs.mkdir(imagesDir, { recursive: true });

    // Initialize images.json if it doesn't exist
    const imagesFile = path.join(dataDir, 'images.json');
    try {
      await fs.access(imagesFile);
    } catch {
      await fs.writeFile(imagesFile, JSON.stringify([], null, 2));
    }

    console.log('✓ Application initialized');
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ Server listening on port ${PORT}`);
    console.log(`✓ Admin Dashboard: http://localhost:${PORT}/admin-dashboard`);
  } catch (error) {
    console.error('Initialization error:', error);
    // Don't crash, continue with what we have
  }
}

// Load API routes after initialization
async function loadRoutes() {
  try {
    const imageRoutes = require('./api/images');
    const trackerRoutes = require('./api/tracker');
    
    // API Routes
    app.use('/api/images', imageRoutes);
    app.use('/api/tracker', trackerRoutes);
    
    console.log('✓ API routes loaded');
  } catch (error) {
    console.error('Error loading routes:', error);
  }
}

// Admin dashboard route
app.get('/admin-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'dashboard.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Start server
async function startServer() {
  try {
    await initializeApp();
    await loadRoutes();
    
    const server = app.listen(PORT, () => {
      console.log(`\n✅ Server is running on port ${PORT}\n`);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

module.exports = app;
