import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Activity, Map, Briefcase, Sun, Smile, MoreHorizontal, 
  CheckCircle2, Send, MessageSquare, Users, BarChart3, Edit3, 
  PlusCircle, FileText, Lock, Globe, User, ThumbsUp, BookOpen
} from 'lucide-react';
import { ideaCategories, candidates } from './data';
import StefnaSida from './components/StefnaSida';
import './index.css';
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { db } from './firebase';

const IconMap = {
  Heart, Activity, Map, Briefcase, Sun, Smile, MoreHorizontal
};

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Toggle between Voter View & Admin View
  const [activeTab, setActiveTab] = useState('dashboard');
  const [publicTab, setPublicTab] = useState('heim');
  
  // Listinn sóttur úr data.js

  // Public Q&A Board
  const [questions, setQuestions] = useState([]);

  // Mock data for Surveys
  const [surveys] = useState([
    { id: 1, title: "Hvað brennur á þér í skipulagsmálum?", status: "Í gangi (Lokað á morgun)", responses: 142 },
  ]);

  const totalIdeas = ideaCategories.reduce((acc, cat) => acc + cat.ideas.length, 0);

  // ---------- Kjósendaviðmót (Voter Portal) ----------
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderPublicView = () => (
    <div>
      {/* Sticky nav */}
      <div className="tabs" style={{ position: 'sticky', top: '1rem', zIndex: 100 }}>
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
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(251,176,59,0.15)', padding: '0.4rem 1.1rem', borderRadius: '2rem', color: 'var(--primary-dark)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>
                  VIÐREISN Í GARÐABÆ
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
                  <textarea className="form-control" placeholder="Hver er þín spurning?" rows="3"></textarea>
                  <button className="submit-btn" style={{ padding: '0.75rem', fontSize: '1rem' }}>Senda Spurningu</button>
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
              {questions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <MessageSquare size={48} style={{ color: 'var(--border-color)', marginBottom: '1rem' }} />
                  <h3 style={{ color: 'var(--dark-800)', marginBottom: '0.5rem' }}>Engar sýnilegar spurningar ennþá</h3>
                  <p>Spurningar sem berast fara fyrst í gegnum samþykktarferli og fá svar áður en þær birtast hér.</p>
                </div>
              ) : (
                questions.sort((a,b) => b.likes - a.likes).map(q => (
                  <div key={q.id} className="question-card">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', minWidth: '50px' }}>
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='var(--primary)'} onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}><ThumbsUp size={24} /></button>
                      <span style={{ fontWeight: '800', color: 'var(--dark-800)', fontSize: '1.1rem' }}>{q.likes}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="question-meta">Frá: {q.from}</div>
                      <p className="question-text">{q.q}</p>
                      {q.answered ? (
                        <div className="question-answer">
                          <div className="answer-label">Svar frá Viðreisn:</div>
                          <p style={{ margin: 0, color: 'var(--dark-800)', lineHeight: '1.6' }}>{q.reply}</p>
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.9rem', color: 'var(--secondary)', fontStyle: 'italic', fontWeight: '500' }}>Bíður svara...</div>
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

  // ---------- Innra stjórnborð (Admin Portal) ----------
  const renderAdminView = () => (
    <>
      <header className="header" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(79, 70, 229, 0.2)', padding: '0.5rem 1rem', borderRadius: '2rem', color: '#818cf8', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          <Lock size={16} /> Innra Vinnuborð Framboðs
        </div>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Kosningastjórn: Garðabær</motion.h1>
      </header>

      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><BarChart3 size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Mælaborð</button>
        <button className={`tab-btn ${activeTab === 'manifesto' ? 'active' : ''}`} onClick={() => setActiveTab('manifesto')}><Edit3 size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Stefnumótun (Hugmyndir)</button>
        <button className={`tab-btn ${activeTab === 'surveys' ? 'active' : ''}`} onClick={() => setActiveTab('surveys')}><MessageSquare size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Kannanir & Kjósendur</button>
        <button className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}><Users size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Framboðslistinn</button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4 }}>
            <div className="summary-stats">
              <div className="glass-card stat-card"><div className="stat-value">{totalIdeas}</div><div className="stat-label">Hugmyndir til vinnslu</div></div>
              <div className="glass-card stat-card"><div className="stat-value">3</div><div className="stat-label">Virkar Kannanir</div></div>
              <div className="glass-card stat-card"><div className="stat-value">142</div><div className="stat-label">Innsend svör kjósenda</div></div>
            </div>
            {/* Same internal dashboard as before */}
            <div className="ideas-grid">
              <div className="glass-card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity color="var(--primary)" /> Nýjustu aðgerðir</h3>
                <ul className="idea-list">
                  <li className="idea-item">Páll uppfærði stefnu í skipulagsmálum (Fyrir 2 klst)</li>
                  <li className="idea-item">Tugir kjósenda hafa 'lækað' spurninguna um skólamáltíðir (Í morgun)</li>
                  <li className="idea-item">Jón samþykkti drög að bæklingi (Fyrir 2 dögum)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* ... Include the manifesto and candidates from earlier ... */}
        {(activeTab === 'manifesto' || activeTab === 'team' || activeTab === 'surveys') && (
           <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
             <p style={{ color: 'var(--text-muted)' }}>Málaflokkar, Teymi eða Kannanir: Sjá upprunalegan kóða sýnishorns að ofan. <br/>(Sýnir aðeins public skjá fyrir kjörklefann akkúrat núna í þessu módeli)</p>
           </div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <div className="app-container">
      {/* Vef-Toggle Switch fyrir Demo upplifun (í raunveruleikanum verður þetta Auth varið) */}
      <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000, background: 'var(--white)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--dark-700)', fontWeight: '600' }}>
          <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
          <span>Stjórnborð</span>
        </label>
      </div>

      {isAdmin ? renderAdminView() : renderPublicView()}
    </div>
  );
}

export default App;
