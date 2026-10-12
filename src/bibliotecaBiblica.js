// Biblioteca de imágenes bíblicas para Life Church Kids

const historias = [
  {
    palabras: ["buen samaritano", "good samaritan"],
    imagenColor: "/dibujos-biblicos/buen-samaritano-color.png",
    dibujo: "/dibujos-biblicos/buen-samaritano-colorear.png",
  },
  {
    palabras: [
      "jesus calma la tormenta",
      "jesus calma la tempestad",
      "jesus y la tormenta",
    ],
    imagenColor: "/dibujos-biblicos/tormenta-color.png",
    dibujo: "/dibujos-biblicos/tormenta-colorear.png",
  },
];

function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function buscarImagenesBiblicas(titulo, tema, historia) {
  const texto = normalizar(`${titulo} ${tema} ${historia}`);

  const encontrada = historias.find((item) =>
    item.palabras.some((palabra) => texto.includes(normalizar(palabra)))
  );

  if (!encontrada) {
    return {
      imagenColor: "",
      dibujo: "",
    };
  }

  return {
    imagenColor: encontrada.imagenColor,
    dibujo: encontrada.dibujo,
  };
}