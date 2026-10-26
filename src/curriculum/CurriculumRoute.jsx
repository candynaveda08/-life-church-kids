import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { lessons2026, defaultLessonDate } from './lessons';
import './curriculum.css';

const storageKey = 'life-kids-curriculum-date';
const tabs = [ ['lesson', '/lesson', 'Lección'], ['color', '/colorear', 'Página para colorear'], ['verse', '/versiculo', 'Versículo de la semana'], ['story', '/historias', 'Historias bíblicas'], ['activity', '/juegos', 'Actividades'], ['credo', '/oracion', 'Credo'] ];
const dateLabel = date => new Date(`${date}T12:00:00`).toLocaleDateString('es-US', { day: 'numeric', month: 'long', year: 'numeric' });
function readPreference() {
  try { return localStorage.getItem(storageKey); } catch { return null; }
}
function PrintDrawing({ lesson }) {
  const [error, setError] = useState('');
  function printDrawing() {
    setError('');
    const page = window.open('', '_blank');
    if (!page) { setError('Permite las ventanas emergentes para imprimir o abre el dibujo y usa Imprimir.'); return; }
    page.document.title = `Colorear — ${lesson.title}`;
    const style = page.document.createElement('style');
    style.textContent = '@page { size: letter portrait; margin: 10mm; } body { margin:0; text-align:center; } img { width:100%; height:auto; max-height:250mm; object-fit:contain; }';
    page.document.head.appendChild(style);
    const picture = page.document.createElement('img');
    picture.alt = lesson.title;
    picture.onload = () => { page.focus(); page.print(); };
    picture.onerror = () => { page.document.body.textContent = 'No se pudo cargar el dibujo. Cierra esta ventana y abre el enlace del dibujo para volver a intentar.'; };
    page.document.body.appendChild(picture);
    picture.src = lesson.color;
  }
  return <>
    <p>{lesson.colorPrompt}</p>
    <div className="resource-actions"><button onClick={printDrawing}>🖨️ Imprimir dibujo</button><a href={lesson.color} target="_blank" rel="noopener noreferrer">Abrir dibujo completo ↗</a><a href={lesson.color} download={`colorear-${lesson.date}.svg`}>Descargar dibujo</a></div>
    {error && <p role="alert">{error}</p>}
    <img className="coloring-sheet" src={lesson.color} alt={`${lesson.title}. ${lesson.colorPrompt}`} />
  </>;
}
function Questions({ lesson }) {
  return <div>{lesson.questions.map(([question, answer]) => <details className="question" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>;
}
function Activity({ lesson }) {
  const [answers, setAnswers] = useState({});
  const [showVerse, setShowVerse] = useState(false);
  return <>
    <h2>🎨 {lesson.craft.title}</h2><p><strong>Materiales:</strong> {lesson.craft.materials}</p>
    <ol>{lesson.craft.steps.map(step => <li key={step}>{step}</li>)}</ol>
    <h2>🎲 {lesson.game.title}</h2><ol>{lesson.game.steps.map(step => <li key={step}>{step}</li>)}</ol>
    <h2>✅ Verdadero o falso</h2>
    {lesson.trueFalse.map(([statement, correct, explanation], index) => <section className="quiz-item" key={statement}><p>{statement}</p><div className="resource-actions">{[true, false].map(value => <button key={String(value)} onClick={() => setAnswers(previous => ({ ...previous, [index]: value }))}>{value ? 'Verdadero' : 'Falso'}</button>)}</div>{answers[index] !== undefined && <p role="status">{answers[index] === correct ? '¡Correcto! ' : 'Probemos otra vez. '}{explanation}</p>}</section>)}
    <h2>🧠 Completa el versículo</h2><p>{lesson.verse.split(' ').map((word, index) => index % 3 === 2 ? '______' : word).join(' ')} — {lesson.verseReference}</p>
    <button onClick={() => setShowVerse(!showVerse)}>{showVerse ? 'Ocultar respuesta' : 'Mostrar versículo completo'}</button>{showVerse && <p>{lesson.verse}</p>}
    <h2>⭐ Desafío para casa</h2><p>{lesson.challenge}</p>
    <h2>❓ Repasemos</h2><Questions lesson={lesson} />
  </>;
}
function Video({ lesson }) {
  const [play, setPlay] = useState(false);
  return <><h2>{lesson.video.title}</h2><p><strong>{lesson.video.source}</strong> · En español</p><p>{lesson.video.note}</p>
    {play ? <iframe className="curriculum-video" title={lesson.video.title} src={`https://www.youtube-nocookie.com/embed/${lesson.video.id}?rel=0`} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <button onClick={() => setPlay(true)}>▶ Ver video en la aplicación</button>}
    <p><a href={`https://www.youtube.com/watch?v=${lesson.video.id}`} target="_blank" rel="noopener noreferrer">Abrir en YouTube ↗</a></p>
    <details className="question"><summary>Leer también la historia bíblica</summary>{lesson.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</details>
    <h2>Conversemos</h2><Questions lesson={lesson} />
  </>;
}
function FullLesson({ lesson }) {
  return <>
    <p><strong>Edad sugerida:</strong> 4–10 años · <strong>Duración:</strong> 40 minutos</p>
    <p><strong>Objetivo:</strong> {lesson.objective}</p>
    <p><strong>Materiales:</strong> Biblia, hojas y crayones. {lesson.craft.materials}</p>
    <h2>1. Bienvenida y oración · 5 min</h2><p>{lesson.welcome}</p><p>Oración inicial: Jesús, gracias por reunirnos. Ayúdanos a escuchar tu Palabra y a vivirla con amor. Amén.</p>
    <h2>2. Historia bíblica · 8 min</h2><p><strong>{lesson.reference}</strong> · Narración adaptada para niños</p>{lesson.story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<p className="main-truth">{lesson.truth}</p>
    <p className="teacher-note">Video opcional: úsalo en lugar de parte de la narración o como extensión. Las duraciones varían; revisa el enlace de Historias bíblicas antes de clase.</p>
    <h2>3. Conversemos · 5 min</h2><Questions lesson={lesson} />
    <h2>4. Juego · 6 min</h2><h3>{lesson.game.title}</h3><ol>{lesson.game.steps.map(step => <li key={step}>{step}</li>)}</ol>
    <h2>5. Actividad · 10 min</h2><h3>{lesson.craft.title}</h3><ol>{lesson.craft.steps.map(step => <li key={step}>{step}</li>)}</ol>
    <p>La página para colorear es una alternativa a la manualidad. Para los pequeños, permite responder con dibujos y ayuda a escribir; para los mayores, pide explicar cómo aplicar la enseñanza. Ofrece participación sentada y materiales al alcance.</p>
    <h2>6. Versículo con movimientos · 3 min</h2><blockquote>{lesson.verse}<footer>{lesson.verseReference}</footer></blockquote><p>{lesson.motions} Repítanlo tres veces sin competir.</p>
    <h2>7. Oración final · 3 min</h2><p><strong>Oración:</strong> {lesson.prayer}</p>
    <h2>Desafío para casa</h2><p>{lesson.challenge}</p>
  </>;
}
export function CurrentVerse() {
  const [lesson, setLesson] = useState(null);
  const [status, setStatus] = useState('Cargando el versículo…');
  useEffect(() => {
    let active = true;
    fetch('https://life-church-kids.onrender.com/api/lessons').then(response => {
      if (!response.ok) throw new Error('load');
      return response.json();
    }).then(data => {
      if (!active) return;
      const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });
      const available = Array.isArray(data) ? data.filter(item => item.verse && (!item.date || item.date.slice(0, 10) <= today)) : [];
      available.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
      setLesson(available[0] || null);
      setStatus('Selecciona una fecha del programa para ver su versículo, o guarda el versículo de la clase actual en el panel de maestros.');
    }).catch(() => { if (active) setStatus('No se pudo cargar el versículo actual. Puedes seleccionar una fecha del programa arriba.'); });
    return () => { active = false; };
  }, []);
  return <section className="curriculum-card"><h1>📜 Versículo de la semana</h1>{lesson ? <><h2>{lesson.title}</h2><blockquote>{lesson.verse}</blockquote><p>Repítelo, conversa sobre su significado y compártelo en casa.</p></> : <p>{status}</p>}</section>;
}
export default function CurriculumRoute({ mode, children }) {
  const [params, setParams] = useSearchParams();
  const saved = params.get('fecha') ?? readPreference() ?? defaultLessonDate();
  const selected = lessons2026.some(lesson => lesson.date === saved) ? saved : 'actual';
  const lesson = lessons2026.find(item => item.date === selected);
  function selectDate(value) {
    try { localStorage.setItem(storageKey, value); } catch { /* Navigation still works without storage. */ }
    setParams(previous => { const next = new URLSearchParams(previous); next.set('fecha', value); return next; });
  }
  return <div className="curriculum-shell">
    <section className="curriculum-picker" aria-label="Seleccionar fecha de clase">
      <label htmlFor="curriculum-date">📅 Fecha de la clase</label>
      <select id="curriculum-date" value={selected} onChange={event => selectDate(event.target.value)}>
        <option value="actual">Lecciones anteriores / clase actual</option>
        {lessons2026.map(item => <option key={item.date} value={item.date}>{dateLabel(item.date)} — {item.teacher} — {item.title}</option>)}
      </select>
      <p>Programa de noviembre–diciembre 2026 según el cronograma de maestras. Selecciona una fecha para preparar sus materiales.</p>
    </section>
    {lesson ? <main className="curriculum-content" key={`${lesson.date}-${mode}`}>
      <div className="resource-actions no-print"><Link to="/inicio">← Volver al inicio</Link><button onClick={() => window.print()}>🖨️ Imprimir esta página</button></div>
      <header className="curriculum-header"><p>Life Church Kids · Ministerio Español</p><h1>{lesson.title}</h1><p><strong>{dateLabel(lesson.date)}</strong> · Maestra: {lesson.teacher}</p><p>{lesson.reference}</p></header>
      <nav className="curriculum-tabs no-print" aria-label="Materiales de esta lección">{tabs.map(([tabMode, path, label]) => <Link key={tabMode} to={`${path}?fecha=${lesson.date}`} aria-current={mode === tabMode ? 'page' : undefined}>{label}</Link>)}</nav>
      <article className="curriculum-card">
        {(mode === 'lesson' || mode === 'presentation') && <FullLesson lesson={lesson} />}
        {mode === 'color' && <><h2>🖍️ Página para colorear</h2><PrintDrawing lesson={lesson} /></>}
        {mode === 'verse' && <><h2>📜 Versículo de la semana</h2><blockquote>{lesson.verse}<footer>{lesson.verseReference}</footer></blockquote><p className="main-truth">{lesson.truth}</p><h3>Aprendamos con movimientos</h3><p>{lesson.motions}</p><p>Repítanlo juntos tres veces. Los pequeños pueden repetir por frases y los mayores practicar sin mirar.</p><h3>Para practicar en casa</h3><p>{lesson.challenge}</p></>}
        {mode === 'story' && <Video lesson={lesson} />}
        {mode === 'activity' && <Activity lesson={lesson} />}
      </article>
    </main> : children}
  </div>;
}

