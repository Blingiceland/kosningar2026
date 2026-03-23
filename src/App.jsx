import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Map, 
  Briefcase, 
  Sun, 
  Smile, 
  MoreHorizontal, 
  CheckCircle2, 
  Send,
  MessageSquare
} from 'lucide-react';
import { ideaCategories } from './data';
import './index.css';

// Map icon names to components
const IconMap = {
  Heart,
  Activity,
  Map,
  Briefcase,
  Sun,
  Smile,
  MoreHorizontal
};

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [submitted, setSubmitted] = useState(false);
  
  // Calculate total ideas
  const totalIdeas = ideaCategories.reduce((acc, cat) => acc + cat.ideas.length, 0);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      e.target.reset();
    }, 4000);
  };

  return (
    <div className="app-container">
      <header className="header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Kosningahugmyndir Garðabæjar
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Vettvangur fyrir íbúa til að hafa áhrif. Skoðaðu hugmyndir frá vinnustofum okkar og komdu með þínar eigin!
        </motion.p>
      </header>

      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Yfirlit & Tölfræði
        </button>
        <button 
          className={`tab-btn ${activeTab === 'ideas' ? 'active' : ''}`}
          onClick={() => setActiveTab('ideas')}
        >
          Flokkaðar Hugmyndir
        </button>
        <button 
          className={`tab-btn ${activeTab === 'participate' ? 'active' : ''}`}
          onClick={() => setActiveTab('participate')}
        >
          Taka Þátt
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="summary-stats">
              <div className="glass-card stat-card">
                <div className="stat-value">{totalIdeas}</div>
                <div className="stat-label">Skráðar Hugmyndir</div>
              </div>
              <div className="glass-card stat-card">
                <div className="stat-value">{ideaCategories.length}</div>
                <div className="stat-label">Málaflokkar</div>
              </div>
              <div className="glass-card stat-card">
                <div className="stat-value">100%</div>
                <div className="stat-label">Fókus á Garðabæ</div>
              </div>
            </div>

            <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Vinnuplagg Framboðsins</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', textAlign: 'center' }}>
                Gögnin úr "málefnafundur" skjalinu hafa verið tekin saman hér fyrir ofan til að auðvelda okkur yfirsýn. 
                Hægt er að nýta þetta app beint á vinnufundum listans eða bjóða íbúum að skoða hugmyndirnar undir "Flokkaðar Hugmyndir".
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                {ideaCategories.map((cat, idx) => {
                  const Icon = IconMap[cat.iconName] || MessageSquare;
                  return (
                    <motion.div 
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      style={{ 
                        background: 'rgba(255,255,255,0.05)', 
                        padding: '1rem', 
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                    >
                      <Icon size={24} color="var(--primary)" />
                      <div>
                        <strong>{cat.title}</strong>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cat.ideas.length} hugmyndir</div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'ideas' && (
          <motion.div
            key="ideas"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="ideas-grid"
          >
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
                  <div className="category-header">
                    <div className="category-icon">
                      <Icon size={24} />
                    </div>
                    <h2 className="category-title">{category.title}</h2>
                  </div>
                  <ul className="idea-list">
                    {category.ideas.map((idea, i) => (
                      <li className="idea-item" key={i}>
                        <CheckCircle2 size={16} className="idea-dot" style={{ flexShrink: 0 }} />
                        <span>{idea}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'participate' && (
          <motion.div
            key="participate"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
             <div className="glass-card form-container">
               <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Komdu Þinni Hugmynd Á Framfæri</h2>
               <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center' }}>
                 Við viljum heyra frá þér! Hvað finnst þér skipta máli í Garðabæ? Taktu þátt í að móta framtíðina með okkur.
               </p>

               {submitted ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   style={{ 
                     textAlign: 'center', 
                     padding: '2rem', 
                     background: 'rgba(16, 185, 129, 0.1)', 
                     borderRadius: '0.5rem',
                     border: '1px solid rgba(16, 185, 129, 0.3)'
                   }}
                 >
                   <CheckCircle2 size={48} color="var(--secondary)" style={{ margin: '0 auto 1rem' }} />
                   <h3 style={{ color: 'var(--secondary)' }}>Takk Fyrir!</h3>
                   <p>Hugmyndin þín hefur verið móttekin og mun hjálpa okkur í stefnumótunarvinnunni.</p>
                 </motion.div>
               ) : (
                 <form onSubmit={handleFormSubmit}>
                   <div className="form-group">
                     <label>Nafn (valfrjálst)</label>
                     <input type="text" className="form-control" placeholder="Þitt nafn..." />
                   </div>
                   <div className="form-group">
                     <label>Netfang (valfrjálst)</label>
                     <input type="email" className="form-control" placeholder="þitt@netfang.is" />
                   </div>
                   <div className="form-group">
                     <label>Málaflokkur</label>
                     <select className="form-control" required style={{ background: '#1e293b' }}>
                       <option value="">Veldu málaflokk...</option>
                       {ideaCategories.map(cat => (
                         <option key={cat.id} value={cat.id}>{cat.title}</option>
                       ))}
                     </select>
                   </div>
                   <div className="form-group">
                     <label>Þín hugmynd eða áhersla</label>
                     <textarea 
                       className="form-control" 
                       rows="4" 
                       placeholder="Lýstu þinni hugmynd í stuttu máli..."
                       required
                     ></textarea>
                   </div>
                   <button type="submit" className="submit-btn">
                     <Send size={20} />
                     Senda inn hugmynd
                   </button>
                 </form>
               )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
