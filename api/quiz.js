import prisma from './lib/prisma.js';
import { INITIAL_QUIZ_SEED } from '../prisma/seedQuiz.js';

export default async function handler(req, res) {
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
    // 1. GET: Ambil daftar soal kuis (opsional filter grade)
    if (req.method === 'GET') {
      const { grade } = req.query;
      const where = grade && grade !== 'Semua' ? { grade: parseInt(grade, 10) } : {};

      let questions = await prisma.quizQuestion.findMany({
        where,
        orderBy: { createdAt: 'asc' }
      });

      // Auto-seed fallback jika database masih kosong
      if (questions.length === 0) {
        console.log('Database soal kuis kosong, melakukan inisialisasi awal...');
        for (const q of INITIAL_QUIZ_SEED) {
          await prisma.quizQuestion.create({ data: q });
        }
        questions = await prisma.quizQuestion.findMany({
          where,
          orderBy: { createdAt: 'asc' }
        });
      }

      return res.status(200).json({ success: true, data: questions });
    }

    // 2. POST: Buat soal kuis baru oleh admin
    if (req.method === 'POST') {
      const { 
        grade, 
        topic, 
        question, 
        questionLatex, 
        options, 
        explanation, 
        difficulty, 
        formulaHint 
      } = req.body;

      if (!question || !options || !Array.isArray(options) || options.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Pertanyaan dan minimal 2 opsi pilihan ganda wajib diisi'
        });
      }

      const created = await prisma.quizQuestion.create({
        data: {
          grade: parseInt(grade, 10) || 12,
          topic: topic || 'Fisika Umum',
          question,
          questionLatex: questionLatex || null,
          options,
          explanation: explanation || 'Penjelasan solusi konsep fisika.',
          difficulty: difficulty || 'Sedang',
          formulaHint: formulaHint || null
        }
      });

      return res.status(201).json({ success: true, data: created });
    }

    // 3. PUT: Edit / update soal kuis yang ada
    if (req.method === 'PUT') {
      const { 
        id, 
        grade, 
        topic, 
        question, 
        questionLatex, 
        options, 
        explanation, 
        difficulty, 
        formulaHint 
      } = req.body;

      if (!id) {
        return res.status(400).json({ success: false, error: 'ID soal wajib disertakan' });
      }

      const updated = await prisma.quizQuestion.update({
        where: { id },
        data: {
          grade: grade ? parseInt(grade, 10) : undefined,
          topic,
          question,
          questionLatex,
          options,
          explanation,
          difficulty,
          formulaHint
        }
      });

      return res.status(200).json({ success: true, data: updated });
    }

    // 4. DELETE: Hapus soal kuis
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, error: 'ID soal wajib disertakan' });
      }

      await prisma.quizQuestion.delete({
        where: { id }
      });

      return res.status(200).json({ success: true, message: 'Soal kuis berhasil dihapus' });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Quiz Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan pada server database',
      details: error.message
    });
  }
}
