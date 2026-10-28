import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { buscarImagenesBiblicas } from './bibliotecaBiblica';
import './Presentation.css';

export function splitSlideText(text, limit = 320) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  const parts = [];
  let part = '';
  for (const word of words) {
    if (part && part.length + word.length + 1 > limit) { parts.push(part); part = word; }
    else part += `${part ? ' ' : ''}${word}`;
  }
  if (part) parts.push(part);
  return parts;
}

export function buildSlides(lesson) {
  if (!lesson) return [];
  const textSlides = (title, text) => {
    const parts = splitSlideText(text);
    return parts.map((content, index) => ({ title, content, part: parts.length > 1 ? `${index + 1} de ${parts.length}` : '' }));
  };
  const questions = (Array.isArray(lesson.questions) ? lesson.questions : []).map((question, index) => ({ question: String(question || '').trim(), answer: lesson.answers?.[index] })).filter(item => item.question);
  return [
    { title: '¡Bienvenidos a Life Church Kids!', cover: true, image: '/bienvenida-kids.png', content: lesson.title },
    ...textSlides('✨ Tema de la lección', lesson.theme || lesson.title),
    ...textSlides('📖 Versículo para memorizar', lesson.verse),
    ...textSlides('📖 Historia bíblica', lesson.bibleStory),
    ...textSlides('💡 Aprendamos juntos', lesson.explanation),
    ...questions.map((item, index) => ({ title: `❓ Pregunta ${index + 1}`, content: item.question, answer: item.answer || 'Conversemos juntos sobre esta pregunta.' })),
    ...(Array.isArray(lesson.activitySlides) ? lesson.activitySlides : []).flatMap(slide => textSlides(slide.title, slide.content)),
    ...textSlides('🙏 Oración', lesson.prayer),
    ...textSlides('⭐ Desafío para casa', lesson.challenge),
  ];
}

export default function Presentation({ lessonData } = {}) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const lessonId = params.get('id');
  const [loadedLesson, setLoadedLesson] = useState(null);
  const [status, setStatus] = useState('Cargando la lección…');
  const [slideIndex, setSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState('');
  const deck = useRef(null);
  const lesson = lessonData || loadedLesson;
  const slides = buildSlides(lesson);
  const index = Math.min(slideIndex, Math.max(0, slides.length - 1));
  const current = slides[index];

  useEffect(() => {
    if (lessonData) return;
    let active = true;
    setLoadedLesson(null);
    setStatus('Cargando la lección…');
    async function loadLesson() {
      try {
        const response = await fetch('https://life-church-kids.onrender.com/api/lessons');
        if (!response.ok) throw new Error('No se pudo cargar la lección.');
        const data = await response.json();
        const selected = Array.isArray(data) ? (lessonId ? data.find(item => item._id === lessonId) : data.at(-1)) : null;
        if (!active) return;
        if (!selected) { setStatus('No hay una lección publicada.'); return; }
        const images = buscarImagenesBiblicas(selected.title, selected.theme, selected.bibleStory);
        setLoadedLesson({ ...selected, imagenColor: images.imagenColor, answers: Array.isArray(selected.answers) ? selected.answers : [] });
        setSlideIndex(0);
      } catch { if (active) setStatus('No se pudo cargar la lección. Intenta actualizar la página.'); }
    }
    loadLesson();
    return () => { active = false; };
  }, [lessonData, lessonId]);

  useEffect(() => {
    function handleKey(event) {
      if (!slides.length || event.altKey || event.ctrlKey || event.metaKey || event.target.closest?.('input, select, textarea, [contenteditable="true"], summary')) return;
      if (!deck.current?.contains(event.target) && event.target !== document.body) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); setSlideIndex(previous => Math.min(previous + 1, slides.length - 1)); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setSlideIndex(previous => Math.max(previous - 1, 0)); }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [slides.length]);

  useEffect(() => {
    const update = () => setIsFullscreen(document.fullscreenElement === deck.current);
    document.addEventListener('fullscreenchange', update);
    return () => document.removeEventListener('fullscreenchange', update);
  }, []);

  async function toggleFullscreen() {
    setFullscreenError('');
    try {
      if (document.fullscreenElement === deck.current) await document.exitFullscreen();
      else await deck.current.requestFullscreen();
    } catch { setFullscreenError('Tu navegador no permitió la pantalla completa. Puedes seguir usando las diapositivas aquí.'); }
  }

  if (!current) return <section className="lesson-deck deck-status"><p role="status">{status}</p><button type="button" onClick={() => navigate('/inicio')}>← Volver al inicio</button></section>;

  return <section className="lesson-deck" aria-label="Presentación de la lección" ref={deck}>
    <div className="deck-toolbar">
      <button type="button" onClick={() => navigate('/inicio')}>← Inicio</button>
      <span className="deck-name">Life Church Kids</span>
      {typeof document !== 'undefined' && document.fullscreenEnabled && <button type="button" onClick={toggleFullscreen}>{isFullscreen ? 'Salir de pantalla completa' : '⛶ Pantalla completa'}</button>}
    </div>
    {fullscreenError && <p className="deck-error" role="status">{fullscreenError}</p>}
    <div className={`slide-board${current.cover ? ' slide-board--cover' : ''}`} aria-live="polite" aria-atomic="true">
      <header className="slide-heading"><h2>{current.title}</h2>{current.part && <p className="slide-part">Parte {current.part}</p>}</header>
      <div className="slide-body" key={index}>
        {current.cover ? <><img className="slide-cover-image" src={current.image} alt="Bienvenidos a Life Church Kids" /><p className="slide-cover-title">{lesson.title}</p></> : <><p className="slide-text">{current.content}</p>{current.answer && <details className="slide-answer"><summary>👀 Mostrar respuesta</summary><p>{current.answer}</p></details>}</>}
      </div>
      <p className="slide-brand">Aprendiendo juntos la Palabra de Dios</p>
    </div>
    <nav className="deck-controls" aria-label="Navegar diapositivas">
      <button type="button" onClick={() => setSlideIndex(Math.max(index - 1, 0))} disabled={index === 0}>← Anterior</button>
      <span className="deck-counter" aria-live="polite">{index + 1} de {slides.length}</span>
      <button type="button" onClick={() => setSlideIndex(Math.min(index + 1, slides.length - 1))} disabled={index === slides.length - 1}>Siguiente →</button>
    </nav>
  </section>;
}
