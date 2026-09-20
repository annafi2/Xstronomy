import prisma from './lib/prisma.js';



export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET: Fetch all articles strictly from database
    if (req.method === 'GET') {
      const articles = await prisma.article.findMany({
        orderBy: { createdAt: 'desc' }
      });

      return res.status(200).json({ success: true, data: articles });
    }

    // POST: Create a new article
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { title, category, author, summary, content, coverImage, readTime, tags, featured } = body;

      if (!title || !summary || !content) {
        return res.status(400).json({ success: false, error: 'Judul, ringkasan, dan konten wajib diisi.' });
      }

      const newArticle = await prisma.article.create({
        data: {
          title,
          category: category || 'Astrofisika & Kosmologi',
          author: author || 'Admin Xstronomy',
          date: new Date().toISOString().split('T')[0],
          readTime: readTime || '4 menit baca',
          coverImage: coverImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
          summary,
          content,
          tags: Array.isArray(tags) ? tags : [],
          featured: Boolean(featured)
        }
      });

      return res.status(201).json({ success: true, data: newArticle });
    }

    // PUT: Update an article
    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { id, title, category, author, summary, content, coverImage, readTime, tags, featured } = body;

      if (!id) {
        return res.status(400).json({ success: false, error: 'ID artikel wajib disertakan.' });
      }

      const updated = await prisma.article.update({
        where: { id },
        data: {
          title,
          category,
          author,
          summary,
          content,
          coverImage,
          readTime,
          tags: Array.isArray(tags) ? tags : undefined,
          featured: featured !== undefined ? Boolean(featured) : undefined
        }
      });

      return res.status(200).json({ success: true, data: updated });
    }

    // DELETE: Delete an article
    if (req.method === 'DELETE') {
      const { id } = req.query || req.body || {};
      const articleId = id || (req.body && (typeof req.body === 'string' ? JSON.parse(req.body).id : req.body.id));

      if (!articleId) {
        return res.status(400).json({ success: false, error: 'ID artikel wajib disertakan untuk penghapusan.' });
      }

      await prisma.article.delete({
        where: { id: articleId }
      });

      return res.status(200).json({ success: true, message: 'Artikel berhasil dihapus dari database.' });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error in /api/news:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
}
