import prisma from './lib/prisma.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const formulas = await prisma.customFormula.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json({ success: true, data: formulas });
    }

    if (req.method === 'POST') {
      const { title, expression, latex, detectedUnit, variables, category } = req.body;
      if (!title || !expression) {
        return res.status(400).json({ success: false, error: 'Judul dan ekspresi formula wajib diisi' });
      }

      const created = await prisma.customFormula.create({
        data: {
          title,
          expression,
          latex: latex || null,
          detectedUnit: detectedUnit || null,
          variables: variables || [],
          category: category || 'Kustom'
        }
      });
      return res.status(201).json({ success: true, data: created });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, error: 'ID formula wajib disertakan' });
      }

      await prisma.customFormula.delete({
        where: { id }
      });
      return res.status(200).json({ success: true, message: 'Formula berhasil dihapus' });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Custom Formulas Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan pada database',
      details: error.message
    });
  }
}
