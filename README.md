# UCPB Image Management System - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Navigate to project directory:**
```bash
cd cloned_ucpbleasingandfinancecorporation.com
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the server:**
```bash
npm start
```

The server will start on `http://localhost:3000`

### Access Points

- **Website**: `http://localhost:3000` (original HTML pages)
- **Admin Dashboard**: `http://localhost:3000/admin-dashboard`
- **API Endpoints**: `http://localhost:3000/api/*`

---

## 📋 Project Structure

```
├── admin/                      # Admin dashboard frontend
│   └── dashboard.html         # Main admin interface
├── api/                       # Backend API routes
│   ├── images.js             # Image management endpoints
│   └── tracker.js            # Image tracking & extraction
├── public/
│   └── images/               # Downloaded images storage
├── data/
│   └── images.json           # Image metadata database
├── server.js                 # Express server
├── package.json              # Dependencies
└── index.html                # Original website
```

---

## 🎯 Features

### Admin Dashboard
- **Extract Images**: Scan HTML files for all image sources
- **Image Management**: Edit, preview, and delete images
- **Quality Control**: Adjust compression percentage (1-100%)
- **Image Preview**: Real-time preview with quality adjustments
- **Download Management**: Download individual or all pending images
- **Statistics**: Track total images, downloaded count, and storage size
- **Search**: Filter images by URL or description

### Image Tracking
- Automatic detection of image URLs from HTML files
- Local storage of external images
- Image compression with quality control
- Metadata tracking (size, quality, status)

### API Endpoints

#### Images API (`/api/images`)
- `GET /` - Get all images
- `GET /:id` - Get specific image
- `POST /` - Add new image
- `PUT /:id` - Update image (quality, description)
- `POST /:id/download` - Download and compress image
- `DELETE /:id` - Delete image

#### Tracker API (`/api/tracker`)
- `POST /extract` - Extract images from HTML file
- `POST /add-multiple` - Add multiple extracted images
- `GET /stats` - Get tracking statistics

---

## 💡 Usage Guide

### 1. Extract Images from HTML
1. Go to Admin Dashboard
2. Click "📥 Extract Images from HTML"
3. Select `index.html` from dropdown
4. Review found images
5. Click "Add to Database" to import

### 2. Manage Images
- **Edit**: Click the pencil icon on any image card
  - Change description
  - Adjust compression quality
  - Preview with current settings
- **Download**: Click "Download" button for individual images
- **Delete**: Click trash icon to remove from database

### 3. Download All Pending
- Click "⬇️ Download All Pending" to batch download
- Monitor progress with notifications

### 4. View Statistics
- Dashboard shows real-time statistics:
  - Total images in system
  - Downloaded count
  - Pending count
  - Total storage size used

### 5. Search and Filter
- Use search box to filter images by:
  - Image URL
  - Description/Alt text
  - Element information

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory (optional):

```env
PORT=3000
NODE_ENV=development
```

---

## 📦 Dependencies

- **express** - Web server framework
- **cors** - Cross-Origin Resource Sharing
- **body-parser** - Request body parsing
- **axios** - HTTP client for image downloads
- **sharp** - Image processing & compression
- **cheerio** - HTML parsing
- **dotenv** - Environment variables

---

## 🎨 Dashboard Features

### Statistics Cards
Shows real-time metrics:
- Total images tracked
- Downloaded count
- Pending downloads
- Total storage size

### Image Cards
Each image displays:
- Preview thumbnail
- Status (Downloaded/Pending)
- URL (truncated)
- Description
- Current quality setting
- Action buttons

### Quality Control
- Range slider (1-100%)
- Real-time quality value display
- Automatic re-compression on update

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in server.js or use:
PORT=3001 npm start
```

### Images Not Downloading
- Check internet connection
- Verify image URL is accessible
- Check browser console for CORS errors

### Permission Denied
- Ensure write permissions for `public/images` and `data` directories
- On Windows: Run as Administrator if needed

### Missing Dependencies
```bash
npm install --save sharp
```

---

## 📝 Notes

- Downloaded images are stored locally in `public/images/`
- Image metadata is stored in `data/images.json`
- Original HTML files remain unchanged
- All operations are tracked in the database
- Images can be re-downloaded with different quality settings

---

## 🤝 Support

For issues or questions, check:
1. Browser console for errors (F12)
2. Server console output
3. `data/images.json` for metadata

---

## 📜 License

MIT License - Feel free to use and modify!
