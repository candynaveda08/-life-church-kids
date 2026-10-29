export function splitSlideText(text, limit = 240) {
  const sentences = String(text || '').trim().split(/(?<=[.!?])\s+/).filter(Boolean);
  const parts = [];
  let part = '';
  for (const sentence of sentences) {
    const pieces = [];
    let piece = '';
    for (const word of sentence.split(/\s+/)) {
      if (piece && piece.length + word.length + 1 > limit) { pieces.push(piece); piece = word; }
      else piece += `${piece ? ' ' : ''}${word}`;
    }
    if (piece) pieces.push(piece);
    for (const next of pieces) {
      if (part && part.length + next.length + 1 > limit) { parts.push(part); part = next; }
      else part += `${part ? ' ' : ''}${next}`;
    }
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

