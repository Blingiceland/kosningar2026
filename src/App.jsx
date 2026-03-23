import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Activity, Map, Briefcase, Sun, Smile, MoreHorizontal, 
  CheckCircle2, Send, MessageSquare, Users, BarChart3, Edit3, 
  PlusCircle, FileText, Lock
} from 'lucide-react';
import { ideaCategories } from './data';
import './index.css';

const IconMap = {
  Heart, Activity, Map, Briefcase, Sun, Smile, MoreHorizontal
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data for Candidate Roster
  const [candidates] = useState([
    { id: 1, name: "Jón Jónsson", role: "Oddviti", focus: "Fjármál og rekstur", email: "jon@vidreisngardabaer.is" },
    { id: 2, name: "Guðrún Guðmunsdóttir", role: "2. sæti", focus: "Börn og ungmenni", email: "gudrun@vidreisngardabaer.is" },
    { id: 3, name: "Páll Pálsson", role: "3. sæti", focus: "Skipulagsmál", email: "pall@vidreisngardabaer.is" },
  ]);

  // Mock data for Surveys
  const [surveys] = useState([
    { id: 1, title: "Hvað brennur á þér í skipulagsmálum?", status: "Í gangi (Lokað á morgun)", responses: 142 },
    { id: 2, title: "Ánægjukönnun: Skólamáltíðir", status: "Drög (Ekki birt)", responses: 0 },
  ]);

  const totalIdeas = ideaCategories.reduce((acc, cat) => acc + cat.ideas.length, 0);

  return (
    <div className="app-container">
      <header className="header" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(79, 70, 229, 0.2)', padding: '0.5rem 1rem', borderRadius: '2rem', color: '#818cf8', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          <Lock size={16} /> Innra Vinnuborð Framboðs
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Kosningastjórn: Garðabær
        </motion.h1>
      </header>

      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart3 size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Mælaborð
        </button>
        <button 
          className={`tab-btn ${activeTab === 'manifesto' ? 'active' : ''}`}
          onClick={() => setActiveTab('manifesto')}
        >
          <Edit3 size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Stefnumótun (Hugmyndir)
        </button>
        <button 
          className={`tab-btn ${activeTab === 'surveys' ? 'active' : ''}`}
          onClick={() => setActiveTab('surveys')}
        >
          <MessageSquare size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Kannanir & Kjósendur
        </button>
        <button 
          className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          <Users size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Framboðslistinn
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* 1. Mælaborð (Dashboard) */}
        {activeTab === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="summary-stats">
              <div className="glass-card stat-card">
                <div className="stat-value">{totalIdeas}</div>
                <div className="stat-label">Hugmyndir til vinnslu</div>
              </div>
              <div className="glass-card stat-card">
                <div className="stat-value">3</div>
                <div className="stat-label">Virkar Kannanir</div>
              </div>
              <div className="glass-card stat-card">
                <div className="stat-value">142</div>
                <div className="stat-label">Innsend svör kjósenda</div>
              </div>
            </div>

            <div className="ideas-grid">
              <div className="glass-card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity color="var(--primary)" /> Nýjustu aðgerðir
                </h3>
                <ul className="idea-list">
                  <li className="idea-item">Páll uppfærði stefnu í skipulagsmálum (Fyrir 2 klst)</li>
                  <li className="idea-item">Ný könnun birt á Facebook: Skipulagsmál (Í gær)</li>
                  <li className="idea-item">Jón samþykkti drög að bæklingi (Fyrir 2 dögum)</li>
                </ul>
              </div>
              <div className="glass-card">
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText color="var(--primary)" /> Málaflokkar tilbúnir
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>Málaflokkar þar sem búið er að vinna úr Post-It miðum:</p>
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.5rem 1rem', borderRadius: '0.5rem', marginBottom: '0.5rem', color: '#10b981' }}>
                    <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '0.5rem' }}/> Samgöngur (100%)
                  </div>
                  <div style={{ background: 'rgba(244, 63, 94, 0.2)', padding: '0.5rem 1rem', borderRadius: '0.5rem', color: '#f43f5e' }}>
                    <MoreHorizontal size={16} style={{ display: 'inline', marginRight: '0.5rem' }}/> Börn og ungmenni (Í vinnslu)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. Stefnumótun (Manifesto Builder) */}
        {activeTab === 'manifesto' && (
          <motion.div
            key="manifesto"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)' }}>Hér vinnum við stefnuskrána upp úr "Post-It" fundinum. Smellið á flokka til að sjá hugmyndir eða breyta þeim í texta fyrir bækling.</p>
            </div>
            <div className="ideas-grid">
              {ideaCategories.map((category, index) => {
                const Icon = IconMap[category.iconName] || MessageSquare;
                return (
                  <motion.div 
                    className="glass-card" 
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="category-header" style={{ justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="category-icon">
                          <Icon size={24} />
                        </div>
                        <h2 className="category-title">{category.title}</h2>
                      </div>
                      <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>{category.ideas.length} miðar</span>
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      <button style={{ width: '100%', background: 'rgba(79, 70, 229, 0.1)', border: '1px solid rgba(79, 70, 229, 0.3)', color: '#818cf8', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                        + Skrifa stefnutexta úr þessum miðum
                      </button>
                    </div>

                    <ul className="idea-list" style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                      {category.ideas.map((idea, i) => (
                         <li className="idea-item" key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <span>{idea}</span>
                           <input type="checkbox" title="Merkja sem afgreitt" style={{ cursor: 'pointer' }} />
                         </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 3. Kannanir & Útsendingar */}
        {activeTab === 'surveys' && (
          <motion.div
            key="surveys"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>Virk Kannanakerfi (Tilbúið til deilingar)</h2>
                <button className="submit-btn" style={{ width: 'auto', padding: '0.5rem 1rem' }}>
                  <PlusCircle size={18} /> Búa til Nýja Könnun
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {surveys.map(survey => (
                   <div key={survey.id} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', padding: '1.5rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div>
                       <h3 style={{ marginBottom: '0.5rem' }}>{survey.title}</h3>
                       <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                         <strong>Staða:</strong> {survey.status} | <strong>Svör:</strong> <span style={{ color: 'var(--secondary)' }}>{survey.responses}</span>
                       </div>
                     </div>
                     <div style={{ display: 'flex', gap: '1rem' }}>
                       <button style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Skoða Niðurstöður</button>
                       <button style={{ background: 'var(--primary)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Afrita Hlekk</button>
                     </div>
                   </div>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2>Sýnishorn: Hvernig Garðbæingar sjá könnunina</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Hlekkurinn sem þið afritið vísar kjósendum á einfalt skjáform án lykilorðs, sbr. þetta mock-up:</p>
              
              <div style={{ background: '#0f172a', padding: '2rem', borderRadius: '1rem', border: '1px dashed rgba(255,255,255,0.2)' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#fff' }}>Hvað brennur á þér í skipulagsmálum í Garðabæ?</h3>
                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
                  <label style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                    <input type="radio" name="demo" /> Meiri almenningssamgöngur
                  </label>
                  <label style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                    <input type="radio" name="demo" /> Betri hjólastíga milli hverfa
                  </label>
                  <button className="submit-btn">Senda Svar</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. Framboðslistinn (Team Roster) */}
        {activeTab === 'team' && (
          <motion.div
            key="team"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="ideas-grid">
              {candidates.map(candidate => (
                <motion.div 
                  className="glass-card" 
                  key={candidate.id}
                  whileHover={{ scale: 1.02 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {candidate.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ margin: 0 }}>{candidate.name}</h3>
                      <p style={{ color: 'var(--primary)', margin: 0, fontWeight: 'bold' }}>{candidate.role}</p>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <p style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <strong style={{ color: 'var(--text-muted)' }}>Áhersluflokkur:</strong><br/>
                      {candidate.focus}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                      <strong style={{ color: 'var(--text-muted)' }}>Netfang:</strong><br/>
                      <a href={`mailto:${candidate.email}`} style={{ color: '#e5e7eb', textDecoration: 'none' }}>{candidate.email}</a>
                    </p>
                  </div>
                </motion.div>
              ))}
              
              <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', cursor: 'pointer', border: '1px dashed var(--glass-border)', background: 'transparent' }}>
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <PlusCircle size={32} style={{ marginBottom: '0.5rem' }} />
                  <p>Bæta við frambjóðanda</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
