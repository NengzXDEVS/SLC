const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const imageRoutes = require('./api/images');
const trackerRoutes = require('./api/tracker');

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

// API Routes
app.use('/api/images', imageRoutes);
app.use('/api/tracker', trackerRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root redirect to admin dashboard
app.get('/admin-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'dashboard.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Initialize data directory
async function initializeApp() {
  try {
    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, 'data');
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Initialize images.json if it doesn't exist
    const imagesFile = path.join(dataDir, 'images.json');
    try {
      await fs.access(imagesFile);
    } catch {
      await fs.writeFile(imagesFile, JSON.stringify([], null, 2));
    }

    console.log('✓ Application initialized');
    console.log(`✓ Starting server on http://localhost:${PORT}`);
    console.log(`✓ Admin Dashboard: http://localhost:${PORT}/admin-dashboard`);
  } catch (error) {
    console.error('Initialization error:', error);
  }
}

app.listen(PORT, () => {
  initializeApp();
});

module.exports = app;
