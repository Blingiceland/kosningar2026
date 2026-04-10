import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, MessageSquare, Users, BarChart3, Edit3,
  Lock, Globe, ThumbsUp, BookOpen, LogIn, LogOut,
  CheckCircle2, XCircle, Clock, Send, User
} from 'lucide-react';
import { ideaCategories, candidates } from './data';
import StefnaSida from './components/StefnaSida';
import { db, auth, googleProvider } from './firebase';
import {
  collection, addDoc, query, where,
  onSnapshot, doc, updateDoc, serverTimestamp
} from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import './index.css';

// 🔐 Leyfðir admin notendur
const ADMIN_EMAILS = [
  'jonb.steinsson@gmail.com',
];

function App() {
  // ── Auth ──
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // ── Q&A — Public ──
  const [approvedQuestions, setApprovedQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [questionFrom, setQuestionFrom] = useState('');
  const [questionEmail, setQuestionEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Q&A — Admin ──
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [processing, setProcessing] = useState({});

  const totalIdeas = ideaCategories.reduce((acc, cat) => acc + cat.ideas.length, 0);

  // Aðeins notendur sem eru á whitelist fá admin aðgang
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  // ── Auth state listener ──
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // ── Fetch approved questions (real-time) ──
  useEffect(() => {
    const q = query(
      collection(db, 'questions'),
      where('status', '==', 'approved')
    );
    const unsub = onSnapshot(q, (snap) => {
      const sorted = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setApprovedQuestions(sorted);
    });
    return () => unsub();
  }, []);

  // ── Fetch pending questions — admin only (real-time) ──
  useEffect(() => {
    if (!isAdmin) return;
    const q = query(
      collection(db, 'questions'),
      where('status', '==', 'pending')
    );
    const unsub = onSnapshot(q, (snap) => {
      const sorted = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setPendingQuestions(sorted);
    });
    return () => unsub();
  }, [isAdmin]);

  // ── Sign in / out ──
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      if (ADMIN_EMAILS.includes(email)) {
        setShowAdmin(true);
      } else {
        // Innskráður en ekki á lista — skráðu þá strax út
        await signOut(auth);
        alert(`Netfangið ${email} hefur ekki admin aðgang.`);
      }
    } catch (e) {
      console.error('Sign-in failed:', e);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setShowAdmin(false);
  };

  // ── Submit question ──
  const handleSubmitQuestion = async () => {
    if (!questionText.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'questions'), {
        text: questionText.trim(),
        from: questionFrom.trim() || 'Nafnlaus',
        email: questionEmail.trim() || null,  // geymt en birt aldrei public
        status: 'pending',
        answer: null,
        likes: 0,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setQuestionText('');
      setQuestionFrom('');
      setQuestionEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (e) {
      console.error('Submit failed:', e);
    }
    setSubmitting(false);
  };

  // ── Admin: approve question with answer ──
  const handleApprove = async (id) => {
    const answer = answers[id]?.trim();
    if (!answer) return;
    setProcessing(p => ({ ...p, [id]: true }));
    try {
      await updateDoc(doc(db, 'questions', id), {
        status: 'approved',
        answer,
        answeredAt: serverTimestamp(),
      });
      setAnswers(prev => ({ ...prev, [id]: '' }));
    } catch (e) {
      console.error('Approve failed:', e);
    }
    setProcessing(p => ({ ...p, [id]: false }));
  };

  // ── Admin: reject question ──
  const handleReject = async (id) => {
    setProcessing(p => ({ ...p, [id]: 'reject' }));
    try {
      await updateDoc(doc(db, 'questions', id), { status: 'rejected' });
    } catch (e) {
      console.error('Reject failed:', e);
    }
    setProcessing(p => ({ ...p, [id]: false }));
  };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // ────────────────────────────────────────────
  // PUBLIC VIEW
  // ────────────────────────────────────────────
  const renderPublicView = () => (
    <div>
      {/* Sticky nav */}
      <div className="tabs tabs--sticky">
        <button id="tab-heim" className="tab-btn active" onClick={() => scrollTo('section-heim')}>
          <Globe size={18} /> Heim
        </button>
        <button id="tab-stefna" className="tab-btn" onClick={() => scrollTo('section-stefna')}>
          <BookOpen size={18} /> Stefnan okkar
        </button>
        <button id="tab-frambjodendur" className="tab-btn" onClick={() => scrollTo('section-frambjodendur')}>
          <Users size={18} /> Frambjóðendur
        </button>
        <button id="tab-spurningar" className="tab-btn" onClick={() => scrollTo('section-spurningar')}>
          <MessageSquare size={18} /> Spurt og Svarað
        </button>
      </div>

      {/* ── HERO ── */}
      <section id="section-heim" style={{ scrollMarginTop: '6rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <header className="header" style={{ marginBottom: '3rem', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
                width: '100%', maxWidth: '700px', height: '340px',
                background: 'radial-gradient(ellipse at center, rgba(251,176,59,0.08) 0%, transparent 70%)',
                borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <motion.img src="/vidreisn-logo.png" alt="Viðreisn Garðabær"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, type: 'spring', stiffness: 200 }}
                  style={{ height: '90px', marginBottom: '2rem', filter: 'drop-shadow(0 4px 12px rgba(251,176,59,0.3))' }} />
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
                  style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(251,176,59,0.15)', padding: '0.4rem 1.1rem', borderRadius: '2rem', color: 'var(--primary-dark)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                    VIÐREISN Í GARÐABÆ
                  </span>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                  style={{ fontSize: '3.8rem', fontWeight: 900, letterSpacing: '-2.5px', lineHeight: 1.05, color: 'var(--dark-800)', marginBottom: '1.2rem' }}>
                  Við viljum gera Garðabæ<br />að enn betri bæ
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
                  style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
                  Kynntu þér okkur og hvernig við viljum gera Garðabæ enn betri
                </motion.p>
              </div>
            </header>
            <div className="ideas-grid" style={{ marginBottom: '6rem' }}>
              <div className="glass-card" style={{ borderTop: '4px solid var(--primary)' }}>
                <h3><MessageSquare size={20} style={{ display: 'inline', marginRight: '0.5rem', color: 'var(--primary)' }}/> Spurðu og þér verður svarað</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Viltu spyrja okkur að einhverju - gerðu það hér og eitthvert okkar svarar þér.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input
                    className="form-control"
                    placeholder="Nafn þitt (valfrjálst)"
                    value={questionFrom}
                    onChange={e => setQuestionFrom(e.target.value)}
                    style={{ marginBottom: '0.25rem' }}
                  />
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Netfang — ef þú vilt fá svar beint (valfrjálst)"
                    value={questionEmail}
                    onChange={e => setQuestionEmail(e.target.value)}
                    style={{ marginBottom: '0.25rem' }}
                  />
                  <textarea
                    className="form-control"
                    placeholder="Hver er þín spurning?"
                    rows="3"
                    value={questionText}
                    onChange={e => setQuestionText(e.target.value)}
                  />
                  {submitted ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(251,176,59,0.12)', padding: '0.75rem 1rem', borderRadius: '0.75rem', color: 'var(--primary-dark)', fontWeight: 700 }}>
                      <CheckCircle2 size={20} /> Spurning móttekin! Við svörum fljótlega.
                    </div>
                  ) : (
                    <button
                      className="submit-btn"
                      style={{ padding: '0.75rem', fontSize: '1rem' }}
                      onClick={handleSubmitQuestion}
                      disabled={submitting || !questionText.trim()}
                    >
                      {submitting ? 'Sendi...' : <><Send size={16} /> Senda Spurningu</>}
                    </button>
                  )}
                </div>
              </div>
              <div className="glass-card" style={{ borderTop: '4px solid var(--secondary)' }}>
                <h3><BookOpen size={20} style={{ display: 'inline', marginRight: '0.5rem', color: 'var(--secondary)' }}/> Skoðaðu Stefnuna</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Kynntu þér okkar helstu stefnumál og hvernig við ætlum að gera Garðabæ að enn betri bæ.</p>
                <button className="submit-btn" style={{ background: 'var(--gradient-secondary)' }} onClick={() => scrollTo('section-stefna')}>
                  📖 Lesa Stefnuna
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── STEFNA ── */}
      <section id="section-stefna" style={{ scrollMarginTop: '5rem', paddingBottom: '6rem' }}>
        <StefnaSida />
      </section>

      {/* ── FRAMBJÓÐENDUR ── */}
      <section id="section-frambjodendur" style={{ scrollMarginTop: '5rem', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--dark-800)', marginBottom: '0.5rem' }}>Framboðið</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Fjölbreyttur hópur fólks sem leggur sig fram fyrir Garðabæ</p>
          </div>
          <div className="featured-top-2">
            {candidates.filter(c => c.seat <= 2).map((c) => (
              <div key={c.seat} className="candidate-card featured">
                <div className="candidate-image-placeholder">
                  {c.image ? (
                    <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: c.gradient || 'linear-gradient(135deg, #FBB03B, #FD7D26)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {c.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                  )}
                  <div className="candidate-number" style={{ background: 'var(--white)', color: 'var(--dark-800)' }}>{c.seat}</div>
                </div>
                <div className="candidate-info">
                  <h3 className="candidate-name">{c.name}</h3>
                  <p className="candidate-role" style={{ color: 'var(--primary)' }}>{c.role}</p>
                  {c.bio && <p className="candidate-bio">{c.bio}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="featured-top-3">
            {candidates.filter(c => c.seat >= 3 && c.seat <= 5).map((c) => (
              <div key={c.seat} className="candidate-card featured">
                <div className="candidate-image-placeholder">
                  {c.image ? (
                    <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: c.gradient || 'linear-gradient(135deg, #FBB03B, #FD7D26)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {c.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                  )}
                  <div className="candidate-number" style={{ background: 'var(--white)', color: 'var(--dark-800)' }}>{c.seat}</div>
                </div>
                <div className="candidate-info">
                  <h3 className="candidate-name" style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{c.name}</h3>
                  <p className="candidate-role" style={{ color: 'var(--primary)' }}>{c.role}</p>
                  {c.bio && <p className="candidate-bio">{c.bio}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="mid-tier-container" style={{ marginTop: '2rem' }}>
            {candidates.filter(c => c.midTier).map((c) => (
              <div key={c.seat} className="candidate-card mid-tier">
                <div className="candidate-number">{c.seat}</div>
                <h3 className="candidate-name" style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{c.name}</h3>
                <p className="candidate-role" style={{ color: 'var(--primary-dark)', fontSize: '0.9rem', fontWeight: 'bold' }}>{c.role}</p>
                {c.bio && <p className="candidate-bio" style={{ marginTop: '0.8rem' }}>{c.bio}</p>}
              </div>
            ))}
          </div>
          <div className="candidates-list-container">
            {candidates.filter(c => c.seat > 10).map((c) => (
              <div key={c.seat} className="candidate-list-item">
                <div className="candidate-list-number">{c.seat}</div>
                <div className="candidate-list-info">
                  <div className="candidate-list-name">{c.name}</div>
                  <div className="candidate-list-role">{c.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPURT OG SVARAÐ ── */}
      <section id="section-spurningar" style={{ scrollMarginTop: '5rem', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="glass-card">
            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Spurt og Svarað</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {approvedQuestions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <MessageSquare size={48} style={{ color: 'var(--border-color)', marginBottom: '1rem' }} />
                  <h3 style={{ color: 'var(--dark-800)', marginBottom: '0.5rem' }}>Engar sýnilegar spurningar ennþá</h3>
                  <p>Spurningar sem berast fara fyrst í gegnum samþykktarferli og fá svar áður en þær birtast hér.</p>
                </div>
              ) : (
                approvedQuestions.map(q => (
                  <div key={q.id} className="question-card">
                    <div style={{ flex: 1 }}>
                      <div className="question-meta">Frá: {q.from}</div>
                      <p className="question-text">{q.text}</p>
                      {q.answer && (
                        <div className="question-answer">
                          <div className="answer-label">Svar frá Viðreisn:</div>
                          <p style={{ margin: 0, color: 'var(--dark-800)', lineHeight: '1.6' }}>{q.answer}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // ────────────────────────────────────────────
  // ADMIN VIEW
  // ────────────────────────────────────────────
  const renderAdminView = () => (
    <>
      <header className="header" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(79, 70, 229, 0.15)', padding: '0.5rem 1rem', borderRadius: '2rem', color: '#818cf8', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          <Lock size={16} /> Innra Vinnuborð Framboðs
        </div>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Kosningastjórn: Garðabær
        </motion.h1>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1rem' }}>
            <img src={user.photoURL} alt={user.displayName} style={{ width: 32, height: 32, borderRadius: '50%' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{user.displayName}</span>
            <button onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'transparent', border: '1px solid var(--border-color)', padding: '0.4rem 0.9rem', borderRadius: '2rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <LogOut size={14} /> Útskrá
            </button>
          </div>
        )}
      </header>

      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <BarChart3 size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Mælaborð
        </button>
        <button className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`} onClick={() => setActiveTab('questions')}>
          <MessageSquare size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Spurningar
          {pendingQuestions.length > 0 && (
            <span style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '1rem', padding: '0.1rem 0.5rem', marginLeft: '0.4rem', fontSize: '0.8rem', fontWeight: 800 }}>
              {pendingQuestions.length}
            </span>
          )}
        </button>
        <button className={`tab-btn ${activeTab === 'manifesto' ? 'active' : ''}`} onClick={() => setActiveTab('manifesto')}>
          <Edit3 size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Stefnumótun
        </button>
        <button className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>
          <Users size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Framboðslistinn
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4 }}>
            <div className="summary-stats">
              <div className="glass-card stat-card">
                <div className="stat-value">{totalIdeas}</div>
                <div className="stat-label">Hugmyndir til vinnslu</div>
              </div>
              <div className="glass-card stat-card">
                <div className="stat-value" style={{ color: 'var(--secondary)' }}>{pendingQuestions.length}</div>
                <div className="stat-label">Spurningar bíða svara</div>
              </div>
              <div className="glass-card stat-card">
                <div className="stat-value">{approvedQuestions.length}</div>
                <div className="stat-label">Spurningar birtar</div>
              </div>
            </div>
            <div className="ideas-grid">
              <div className="glass-card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity color="var(--primary)" /> Yfirlit
                </h3>
                <ul className="idea-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                    <Clock size={16} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--dark-700)' }}>{pendingQuestions.length} spurning{pendingQuestions.length !== 1 ? 'ar' : ''} bíður svara í "Spurningar" flipanum</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--dark-700)' }}>{approvedQuestions.length} spurning{approvedQuestions.length !== 1 ? 'ar' : ''} birtar á vefsíðunni</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Q&A ADMIN */}
        {activeTab === 'questions' && (
          <motion.div key="questions" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
              {pendingQuestions.length === 0 ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
                  <CheckCircle2 size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                  <h3 style={{ marginBottom: '0.5rem' }}>Allt tómt!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Engar spurningar bíða svara.</p>
                </div>
              ) : (
                pendingQuestions.map(q => (
                  <motion.div
                    key={q.id}
                    className="glass-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ borderLeft: '4px solid var(--secondary)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <User size={12} /> {q.from}
                          {q.createdAt && (
                            <span>· {new Date(q.createdAt.seconds * 1000).toLocaleDateString('is-IS')}</span>
                          )}
                          {q.email && (
                            <a
                              href={`mailto:${q.email}`}
                              style={{ color: 'var(--primary-dark)', fontWeight: 600, textDecoration: 'none', background: 'rgba(251,176,59,0.1)', padding: '0.1rem 0.5rem', borderRadius: '1rem' }}
                            >
                              📧 {q.email}
                            </a>
                          )}
                        </div>
                        <p style={{ fontWeight: 600, color: 'var(--dark-800)', fontSize: '1.05rem', lineHeight: 1.5 }}>{q.text}</p>
                      </div>
                      <button
                        onClick={() => handleReject(q.id)}
                        disabled={!!processing[q.id]}
                        title="Hafna"
                        style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, marginLeft: '1rem', color: 'var(--text-muted)' }}
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Skrifaðu svar hér..."
                        value={answers[q.id] || ''}
                        onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                        style={{ fontSize: '0.95rem' }}
                      />
                      <button
                        className="submit-btn"
                        onClick={() => handleApprove(q.id)}
                        disabled={!answers[q.id]?.trim() || !!processing[q.id]}
                        style={{ padding: '0.75rem', fontSize: '0.95rem' }}
                      >
                        {processing[q.id] ? 'Vinsar...' : <><CheckCircle2 size={16} /> Samþykkja og birta</>}
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* PLACEHOLDERS */}
        {(activeTab === 'manifesto' || activeTab === 'team') && (
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
              <Lock size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '0.5rem' }}>Í vinnslu</h3>
              <p style={{ color: 'var(--text-muted)' }}>Þessi hluti kemur fljótlega.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // ────────────────────────────────────────────
  // ADMIN SIGN-IN SCREEN
  // ────────────────────────────────────────────
  const renderSignInScreen = () => (
    <div style={{ maxWidth: '420px', margin: '8rem auto', textAlign: 'center' }}>
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ padding: '3rem' }}
      >
        <div style={{ width: 64, height: 64, background: 'rgba(251,176,59,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Lock size={28} color="var(--primary-dark)" />
        </div>
        <h2 style={{ marginBottom: '0.5rem' }}>Stjórnborð</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Skráðu þig inn með Google til að skoða og svara spurningum kjósenda.
        </p>
        <button
          onClick={handleSignIn}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            width: '100%', padding: '0.9rem 1.5rem', borderRadius: '0.75rem',
            background: 'white', border: '1px solid var(--border-color)',
            cursor: 'pointer', fontSize: '1rem', fontWeight: 700,
            boxShadow: 'var(--shadow-md)', transition: 'all 0.2s ease',
            color: 'var(--dark-800)'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
            <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
          </svg>
          Innskrá með Google
        </button>
      </motion.div>
    </div>
  );

  // ────────────────────────────────────────────
  // ROOT RENDER
  // ────────────────────────────────────────────
  return (
    <div className="app-container">
      {/* Admin toggle button */}
      {!authLoading && (
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
          {user ? (
            <button
              onClick={() => setShowAdmin(a => !a)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: showAdmin ? 'var(--gradient-primary)' : 'var(--white)',
                color: showAdmin ? 'white' : 'var(--dark-700)',
                padding: '0.5rem 1rem', borderRadius: '2rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              {showAdmin ? <><Globe size={16} /> Vefsíða</> : <><Lock size={16} /> Stjórnborð</>}
            </button>
          ) : (
            <button
              onClick={() => setShowAdmin(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--white)', color: 'var(--dark-600)',
                padding: '0.5rem 1rem', borderRadius: '2rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              }}
            >
              <LogIn size={15} /> Stjórnborð
            </button>
          )}
        </div>
      )}

      {showAdmin
        ? (user ? renderAdminView() : renderSignInScreen())
        : renderPublicView()
      }
    </div>
  );
}

export default App;
