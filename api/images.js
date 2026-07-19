const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const axios = require('axios');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '../data');
const IMAGES_DIR = path.join(__dirname, '../public/images');
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

// Get all images
router.get('/', async (req, res) => {
  try {
    const images = await readImagesData();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single image
router.get('/:id', async (req, res) => {
  try {
    const images = await readImagesData();
    const image = images.find(img => img.id === req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new image
router.post('/', async (req, res) => {
  try {
    const { srcUrl, pageElement, description } = req.body;
    if (!srcUrl) {
      return res.status(400).json({ error: 'srcUrl is required' });
    }

    const images = await readImagesData();
    const newImage = {
      id: uuidv4().split('-')[0],
      srcUrl,
      localPath: null,
      pageElement,
      description,
      quality: 80,
      size: null,
      downloaded: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    images.push(newImage);
    await writeImagesData(images);
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update image
router.put('/:id', async (req, res) => {
  try {
    const { quality, description } = req.body;
    const images = await readImagesData();
    const image = images.find(img => img.id === req.params.id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    if (quality !== undefined) image.quality = Math.min(100, Math.max(1, quality));
    if (description !== undefined) image.description = description;
    image.updatedAt = new Date().toISOString();

    // If quality changed and image was downloaded, recompress
    if (quality !== undefined && image.downloaded && image.localPath) {
      await recompressImage(image.id, image.srcUrl, quality);
    }

    await writeImagesData(images);
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download image
router.post('/:id/download', async (req, res) => {
  try {
    const images = await readImagesData();
    const image = images.find(img => img.id === req.params.id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Download and compress image
    const response = await axios.get(image.srcUrl, {
      responseType: 'arraybuffer',
      timeout: 10000
    });

    const buffer = Buffer.from(response.data);
    const ext = getImageExtension(image.srcUrl, response.headers['content-type']);
    const fileName = `${image.id}${ext}`;
    const filePath = path.join(IMAGES_DIR, fileName);

    // Ensure images directory exists
    await fs.mkdir(IMAGES_DIR, { recursive: true });

    // Get image format
    const format = ext.includes('webp') ? 'webp' : ext.replace('.', '');
    const jpegQuality = image.quality || 80;

    // Compress with quality
    const sharpPipeline = sharp(buffer).withMetadata();
    
    if (format === 'jpeg' || format === 'jpg') {
      await sharpPipeline.jpeg({ quality: jpegQuality }).toFile(filePath);
    } else if (format === 'webp') {
      await sharpPipeline.webp({ quality: jpegQuality }).toFile(filePath);
    } else if (format === 'png') {
      await sharpPipeline.png().toFile(filePath);
    } else {
      await sharpPipeline.toFormat(format).toFile(filePath);
    }

    image.localPath = `/public/images/${fileName}`;
    image.downloaded = true;
    image.size = (await fs.stat(filePath)).size;
    image.updatedAt = new Date().toISOString();

    await writeImagesData(images);
    res.json({ success: true, image });
  } catch (error) {
    console.error('Download error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Recompress image with new quality
async function recompressImage(imageId, srcUrl, quality) {
  try {
    const ext = getImageExtension(srcUrl, 'image/jpeg');
    const fileName = `${imageId}${ext}`;
    const filePath = path.join(IMAGES_DIR, fileName);

    const response = await axios.get(srcUrl, {
      responseType: 'arraybuffer',
      timeout: 10000
    });

    const buffer = Buffer.from(response.data);
    const format = ext.replace('.', '');

    if (format === 'jpeg' || format === 'jpg') {
      await sharp(buffer).withMetadata().jpeg({ quality }).toFile(filePath);
    } else if (format === 'webp') {
      await sharp(buffer).withMetadata().webp({ quality }).toFile(filePath);
    }
  } catch (error) {
    console.error('Recompress error:', error.message);
  }
}

// Delete image
router.delete('/:id', async (req, res) => {
  try {
    const images = await readImagesData();
    const imageIndex = images.findIndex(img => img.id === req.params.id);

    if (imageIndex === -1) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const image = images[imageIndex];

    // Delete local file if exists
    if (image.localPath) {
      try {
        const filePath = path.join(__dirname, '../', image.localPath);
        await fs.unlink(filePath);
      } catch (e) {
        console.error('File delete error:', e.message);
      }
    }

    images.splice(imageIndex, 1);
    await writeImagesData(images);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to get image extension
function getImageExtension(url, contentType) {
  const urlExt = path.extname(new URL(url).pathname);
  if (urlExt) return urlExt;

  if (contentType) {
    if (contentType.includes('webp')) return '.webp';
    if (contentType.includes('png')) return '.png';
    if (contentType.includes('gif')) return '.gif';
  }
  return '.jpg';
}

module.exports = router;
