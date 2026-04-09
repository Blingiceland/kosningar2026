import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Smile, Map, Sun, Heart, ChevronDown, ChevronUp, ThumbsUp, Share2, Music
} from 'lucide-react';

const stefnuMalaflokkar = [
  {
    id: 'rekstur',
    title: 'Rekstur',
    subTitle: 'Ábyrg stjórnun og gagnsæ þjónusta',
    icon: Briefcase,
    color: 'var(--primary-dark)',
    colorBg: 'rgba(251, 176, 59, 0.12)',
    lykilsetning: 'Við leggjum áherslu á ábyrgan, gagnsæjan og sjálfbæran rekstur sveitarfélaga.',
    atgerdir: [
      'Hófleg álög á íbúa og fyrirtæki — skattalækkanir þegar svigrúm er til',
      'Einföld og að fullu stafræn stjórnsýsla',
      'Skýr aðskilnaður á milli faglegrar stjórnsýslu og stjórnmála',
      'Gagnsæi í bókhaldi, ákvarðanatöku og verkferlum',
      'Fagmennska í fyrirrúmi — sveitarfélag einbeitir sér að kjarnahlutverkum',
    ],
    ideasFraFundum: [
      'Fækka nefndum til að einfalda stjórnsýslu',
      'Betra eftirlit með fjármálum',
      'Innkaupastefna sveitarfélagsins',
      'Gæðastjórnun sveitarfélagsins',
      'Gagnsæi í stjórnsýslu — fundargerðir og fylgigögn',
    ],
  },
  {
    id: 'born',
    title: 'Börn og Ungmenni',
    subTitle: 'Jöfn tækifæri og stuðningur frá upphafi',
    icon: Smile,
    color: 'var(--primary-dark)',
    colorBg: 'rgba(251, 176, 59, 0.12)',
    lykilsetning: 'Við viljum að Garðabær sé besti bær landsins fyrir fjölskyldur.',
    atgerdir: [
      'Öruggar leikskólaþjónusta og öflugur skóli',
      'Snemmtækur stuðningur við börn með ólíkar þarfir',
      'Styrkja kennara og fagfólk í skólunum',
      'Auka aðgengi að talmeinaþjónustu',
      'Frístundastyrkir — öll börn hafi sömu möguleika',
      'Forvarnir og vellíðan alltaf í forgrunni',
    ],
    ideasFraFundum: [
      'Mötuneyti leikskóla — eldað á staðnum',
      'Sumarfrístund allan daginn',
      'Leikskólar frá 1 árs',
      'Félagsmiðstöðvar fyrir yngri krakka',
      'Talmeinafræðinga inn í skóla',
      'Skólalóðir aðlaðandi fyrir unglinga',
    ],
  },
  {
    id: 'skipulag',
    title: 'Skipulag og Umhverfi',
    subTitle: 'Aðgengilegar, vistvænar og lifandi hverfi',
    icon: Map,
    color: 'var(--primary-dark)',
    colorBg: 'rgba(251, 176, 59, 0.12)',
    lykilsetning: '"Ef við skipuleggjum hverfi út frá 8 ára og 80 ára þá hentar það öllum."',
    atgerdir: [
      'Skilvirk og einföld ferli í skipulagsmálum',
      'Ný hverfi hönnuð aðgengileg öllum frá fyrsta degi',
      'Styðja vistvænar samgöngur og efla almenningssamgöngur',
      'Loftslagsmarkmið í samræmi við Parísarsamkomulagið',
      'Vel skipulagt nærumhverfi og góðar grænar lausnir',
    ],
    ideasFraFundum: [
      'Bæta samgöngur á milli hverfa — hjól og strætó',
      'Undirgöng á milli Garðabæjar og Kópavogs',
      'Yfirbyggð strætóskýli',
      'Göngustígur meðfram sjó við Arnarnes',
      'Garðatorg grænna og aðlaðandi',
      'Tenging úr Urriðaholti við Heiðmörk',
    ],
  },
  {
    id: 'velferd',
    title: 'Velferð',
    subTitle: 'Stafrænar lausnir og aukin þátttaka íbúa',
    icon: Sun,
    color: 'var(--primary-dark)',
    colorBg: 'rgba(251, 176, 59, 0.12)',
    lykilsetning: 'Stafrænar lausnir þurfa að einfalda aðgengi, hraða afgreiðslu mála og styrkja þjónustu.',
    atgerdir: [
      'Stafrænar lausnir til að einfalda þjónustu íbúa',
      'Aukin þátttaka íbúa í ákvörðunarferli',
      'Þjónusta við fatlað fólk — Garðabær til fyrirmyndar',
      'Öflugt forvarnarstarf fyrir alla aldurshópa',
      'Inniviðar og framtíðarsýn með áherslu á lífsgæði',
    ],
    ideasFraFundum: [
      'Opnun einkarekinnar heilsugæslu í Garðabæ',
      'Forvarnir og fræðsla — vímuefni og unglingar',
      'Aukinn stuðningur við börn með greiningar',
      'Frumkvöðlasetur — stuðningur við ungt fólk',
      'Stuðningur við kennara og mannauðsmál',
    ],
  },
  {
    id: 'aldradir',
    title: 'Njótum efri áranna',
    subTitle: 'Virkt og skemmtilegt líf í Garðabæ',
    icon: Heart,
    color: 'var(--primary-dark)',
    colorBg: 'rgba(251, 176, 59, 0.12)',
    lykilsetning: 'Við viljum að Garðabær sé bær þar sem fólk nýtur þess að eldast.',
    atgerdir: [
      'Gott aðgengi og öflugt félagslíf',
      'Fjölbreytt hreyfing, menning og samvera',
      'Þjónusta sem styður sjálfstætt og virkt líf sem lengst',
      'Sérstakur stuðningur við 65+ hóp til að njóta bæjarins',
      '"Grimm uppbygging á gleði og afþreyingu" — þetta er slagorðið okkar!',
    ],
    ideasFraFundum: [
      'Frístundabíll f. aldraða — úr öðrum hverfum í Jónshús',
      'Niðurgreiðsla heilsurækt eldra fólks',
      'Heilsurækt og samvera fyrir aldraða íbúa',
    ],
    slagorð: 'GA-GA í Garðabæ',
  },
  {
    id: 'skemmtun',
    title: 'Skemmtilegri Garðabær',
    subTitle: 'Raunveruleg aðstaða fyrir listir og menningu',
    icon: Music,
    color: 'var(--primary-dark)',
    colorBg: 'rgba(251, 176, 59, 0.12)',
    lykilsetning: 'Við viljum að til verði raunveruleg aðstaða fyrir listir og menningu í Garðabæ – rými fyrir æfingar, smærri viðburði og lifandi menningarlíf. Garðabær á að vera skemmtilegur staður til að búa á.',
    atgerdir: [
      'Afturköllum stimpilinn um "svefnbæinn"',
      'Sköpum rými fyrir ungt tónlistar- og listafólk til að æfa, skapa og stíga fyrstu skrefin',
      'Byggjum upp eins og gert var í gamla daga fyrir hljómsveitir (t.d. Sveinatungu)',
      'Nýtum gríðarlegan fjölda nemenda í list- og tónlistarnámi og veitum þeim vettvang',
      'Gerum menningarstarf að grunnhlutverki í bænum, ekki bara góðgerðarverkefni',
    ],
    ideasFraFundum: [
      'Opnum nýja æfingaaðstöðu fyrir bílskúrsbönd',
      'Smærri tónleika- og viðburðarými fyrir grasrótina',
      'Tengjum fjölbrautaskólann og tónlistarskólann betur saman um aðstöðu',
    ],
  },
];

export default function StefnaSida() {
  const [opinnFl, setOpinnFl] = useState(null);
  const [likes, setLikes] = useState({ skemmtun: 0, rekstur: 0, born: 0, skipulag: 0, velferd: 0, aldradir: 0 });
  const [likedBy, setLikedBy] = useState({});
  const [deiltVid, setDeiltVid] = useState(null);

  const toggleFlokk = (id) => setOpinnFl(opinnFl === id ? null : id);

  const handleLike = (id) => {
    if (likedBy[id]) return;
    setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setLikedBy(prev => ({ ...prev, [id]: true }));
  };

  const handleShare = (title, id) => {
    const text = `Ég styð stefnuna í ${title} hjá Viðreisn í Garðabæ! Komdu og kynntu þér málefnin.`;
    if (navigator.share) {
      navigator.share({ title: `Viðreisn — ${title}`, text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
      setDeiltVid(id);
      setTimeout(() => setDeiltVid(null), 2000);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
          STEFNA VIÐREISNAR Í GARÐABÆ
        </div>
        <h1>Okkar helstu Stefnumál</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '1rem auto 0' }}>
          en við erum opin fyrir öllum góðum hugmyndum
        </p>
      </motion.div>

      {/* Stefnukort */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {stefnuMalaflokkar.map((fl, i) => {
          const Icon = fl.icon;
          const erOpinn = opinnFl === fl.id;
          const erLikað = likedBy[fl.id];

          return (
            <motion.div
              key={fl.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="glass-card" style={{
                borderLeft: `4px solid ${fl.color}`,
                background: erOpinn ? fl.colorBg : 'var(--card-bg)',
                transition: 'all 0.35s ease',
                cursor: 'pointer',
              }}>
                {/* Haus málaflokks */}
                <div
                  onClick={() => toggleFlokk(fl.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                  <div style={{
                    background: fl.colorBg, border: `1px solid ${fl.color}`,
                    color: fl.color, padding: '0.75rem', borderRadius: '0.75rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minWidth: '52px', minHeight: '52px',
                  }}>
                    <Icon size={24} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.1rem' }}>{fl.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{fl.subTitle}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

                    <div style={{ color: 'var(--text-muted)' }}>
                      {erOpinn ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Innihald — opnast þegar smellt */}
                <AnimatePresence>
                  {erOpinn && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                        {/* Lykilsetning */}
                        <blockquote style={{
                          borderLeft: `3px solid ${fl.color}`, paddingLeft: '1rem',
                          color: 'var(--dark-800)', fontStyle: 'italic', fontSize: '1.05rem',
                          marginBottom: '1.5rem', lineHeight: '1.7'
                        }}>
                          {fl.lykilsetning}
                        </blockquote>

                        {/* Tvennar dálkar: Stefna + Hugmyndir */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div>
                            <h4 style={{ color: fl.color, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: '700' }}>
                              Í stefnunni okkar
                            </h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                              {fl.atgerdir.map((a, j) => (
                                <li key={j} style={{
                                  display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                                  fontSize: '0.92rem', color: 'var(--dark-700)', padding: '0.5rem 0'
                                }}>
                                  <span style={{ color: fl.color, marginTop: '0.15rem', flexShrink: 0 }}>✓</span>
                                  {a}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: '700' }}>
                              Hugmyndir af málefnafundi
                            </h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                              {fl.ideasFraFundum.map((h, j) => (
                                <li key={j} style={{
                                  display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                                  fontSize: '0.92rem', color: 'var(--text-muted)', padding: '0.5rem 0',
                                  borderBottom: '1px solid var(--border-color)'
                                }}>
                                  <span style={{ flexShrink: 0 }}>→</span>
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* GA-GA sérhlutur */}
                        {fl.slagorð && (
                          <div style={{
                            marginTop: '1.5rem', background: 'var(--light)',
                            border: '1px solid var(--border-color)', borderRadius: '0.75rem',
                            padding: '1.25rem', textAlign: 'center'
                          }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--dark-800)', marginBottom: '0.5rem' }}>
                              {fl.slagorð}
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                              Sérstök herferð fyrir 65+ íbúa í Garðabæ. Við viljum gera það skemmtilegt að eldast hér!
                            </p>
                          </div>
                        )}

                        {/* Aðgerðahnappar */}
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>

                          <button
                            onClick={() => handleShare(fl.title, fl.id)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '0.5rem',
                              background: 'transparent', border: '1px solid var(--glass-border)',
                              color: 'var(--text-muted)', padding: '0.6rem 1.2rem',
                              borderRadius: '2rem', cursor: 'pointer', fontSize: '0.9rem',
                              transition: 'all 0.25s ease',
                            }}
                          >
                            <Share2 size={15} />
                            {deiltVid === fl.id ? '✓ Afritað!' : 'Deila'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Neðst — Kall til aðgerða */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          marginTop: '3rem', textAlign: 'center',
          background: 'var(--white)',
          border: '1px solid var(--border-color)', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: 'var(--shadow-md)'
        }}
      >
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.75rem' }}>
          Viltu hjálpa okkur að vinna?
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          Við þurfum á þér að halda! Skráðu þig sem stuðningsaðila og við segjum þér hvernig þú getur gert Garðabæ betri.
        </p>
        <button className="submit-btn" style={{ maxWidth: '320px', margin: '0 auto' }}>
          Skrá mig sem stuðningsaðila
        </button>
      </motion.div>
    </div>
  );
}
