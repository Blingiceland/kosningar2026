import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Newspaper } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

export default function FrettirSida() {
  const [frettir, setFrettir] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'news'),
      where('published', '==', true)
    );
    const unsub = onSnapshot(q, (snap) => {
      const sorted = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setFrettir(sorted);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const formatDate = (ts) => {
    if (!ts?.seconds) return '';
    return new Date(ts.seconds * 1000).toLocaleDateString('is-IS', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
      Hleður fréttir...
    </div>
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="header"
        style={{ marginBottom: '3rem' }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(251,176,59,0.2)', padding: '0.5rem 1.2rem',
          borderRadius: '2rem', color: 'var(--primary-dark)', fontWeight: '700',
          marginBottom: '1.5rem', fontSize: '0.9rem', letterSpacing: '0.05em'
        }}>
          FRÉTTIR OG GREINAR
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--dark-800)', marginBottom: '0.5rem' }}>
          Í fjölmiðlum
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Fréttir og greinar um Viðreisn í Garðabæ
        </p>
      </motion.div>

      {frettir.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
          <Newspaper size={48} style={{ color: 'var(--border-color)', marginBottom: '1rem' }} />
          <h3 style={{ color: 'var(--dark-800)', marginBottom: '0.5rem' }}>Engar fréttir ennþá</h3>
          <p>Fréttir og greinar verða birtar hér</p>
        </div>
      ) : (
        <div className="news-grid">
          {frettir.map((f, i) => (
            <motion.a
              key={f.id}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="news-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              {/* Mynd */}
              <div className="news-card-image">
                {f.imageUrl ? (
                  <img src={f.imageUrl} alt={f.title} />
                ) : (
                  <div className="news-card-placeholder">
                    <Newspaper size={40} style={{ opacity: 0.4 }} />
                  </div>
                )}
                {f.source && (
                  <div className="news-source-badge">{f.source}</div>
                )}
              </div>

              {/* Efni */}
              <div className="news-card-body">
                {f.createdAt && (
                  <div className="news-date">{formatDate(f.createdAt)}</div>
                )}
                <h3 className="news-title">{f.title}</h3>
                {f.excerpt && (
                  <p className="news-excerpt">{f.excerpt}</p>
                )}
                <div className="news-link">
                  <ExternalLink size={14} /> Lesa greinina
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}
