const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const axios = require('axios');
const cheerio = require('cheerio');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '../data');
const IMAGES_FILE = path.join(DATA_DIR, 'images.json');

// Helper to read images data
async function readImagesData() {
  try {
    const data = await fs.readFile(IMAGES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper to write images data
async function writeImagesData(data) {
  await fs.writeFile(IMAGES_FILE, JSON.stringify(data, null, 2));
}

// Extract images from HTML file
router.post('/extract', async (req, res) => {
  try {
    const { htmlFile } = req.body;
    if (!htmlFile) {
      return res.status(400).json({ error: 'htmlFile path is required' });
    }

    const filePath = path.join(__dirname, '../', htmlFile);
    const htmlContent = await fs.readFile(filePath, 'utf-8');

    // Use cheerio to parse HTML
    const $ = cheerio.load(htmlContent);
    const extractedImages = [];
    const seen = new Set();

    // Find all img tags
    $('img').each((index, element) => {
      const src = $(element).attr('src');
      const alt = $(element).attr('alt') || '';
      const title = $(element).attr('title') || '';

      if (src && !src.startsWith('data:') && !seen.has(src)) {
        seen.add(src);
        extractedImages.push({
          srcUrl: src,
          alt,
          title,
          element: $(element).parent().html(),
          position: index
        });
      }
    });

    // Find all background images in style attributes
    $('[style*="background"]').each((index, element) => {
      const style = $(element).attr('style');
      const urlMatch = style.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (urlMatch && urlMatch[1] && !urlMatch[1].startsWith('data:') && !seen.has(urlMatch[1])) {
        seen.add(urlMatch[1]);
        extractedImages.push({
          srcUrl: urlMatch[1],
          alt: 'Background Image',
          title: `Background ${index}`,
          element: $(element).html(),
          position: index
        });
      }
    });

    res.json({
      count: extractedImages.length,
      images: extractedImages
    });
  } catch (error) {
    console.error('Extract error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Add extracted images to database
router.post('/add-multiple', async (req, res) => {
  try {
    const { images } = req.body;
    if (!Array.isArray(images)) {
      return res.status(400).json({ error: 'images array is required' });
    }

    const currentImages = await readImagesData();
    const addedImages = [];

    images.forEach(img => {
      const exists = currentImages.some(current => current.srcUrl === img.srcUrl);
      if (!exists) {
        const newImage = {
          id: uuidv4().split('-')[0],
          srcUrl: img.srcUrl,
          localPath: null,
          pageElement: img.element || null,
          description: img.alt || img.title || '',
          quality: 80,
          size: null,
          downloaded: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        currentImages.push(newImage);
        addedImages.push(newImage);
      }
    });

    await writeImagesData(currentImages);
    res.json({
      added: addedImages.length,
      images: addedImages,
      total: currentImages.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tracking stats
router.get('/stats', async (req, res) => {
  try {
    const images = await readImagesData();
    const downloaded = images.filter(img => img.downloaded).length;
    const totalSize = images.reduce((sum, img) => sum + (img.size || 0), 0);

    res.json({
      total: images.length,
      downloaded,
      pending: images.length - downloaded,
      totalSize: formatBytes(totalSize),
      averageQuality: images.length > 0 ? (images.reduce((sum, img) => sum + img.quality, 0) / images.length).toFixed(2) : 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

module.exports = router;
