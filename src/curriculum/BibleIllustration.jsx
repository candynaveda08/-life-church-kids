import React from "react";

// Original scalable Bible-story illustrations; each date has its own scene.
const Person = ({x,y,robe="#d66d50",scale=1,halo=false}) => <g transform={`translate(${x} ${y}) scale(${scale})`}>
  {halo && <circle cx="0" cy="-57" r="37" fill="#ffe58a" opacity=".65"/>}
  <path d="M-30 0 Q-43 48 -42 98 L42 98 Q43 48 30 0Z" fill={robe} stroke="#764e42" strokeWidth="3"/>
  <path d="M-29 12 L-52 58 M29 12 L51 58" stroke="#c58b60" strokeWidth="13" strokeLinecap="round"/>
  <circle cx="0" cy="-35" r="29" fill="#e8b785" stroke="#a56c4d" strokeWidth="2"/>
  <path d="M-28 -44 Q-19 -80 11 -67 Q30 -59 29 -39 Q4 -55 -28 -44Z" fill="#57392d"/>
  <circle cx="-10" cy="-35" r="2.8" fill="#37271f"/><circle cx="10" cy="-35" r="2.8" fill="#37271f"/>
  <path d="M-9 -20 Q0 -12 9 -20" stroke="#8d4a3c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
</g>;
const Sheep = ({x,y,scale=1}) => <g transform={`translate(${x} ${y}) scale(${scale})`}>
  <ellipse cx="0" cy="0" rx="50" ry="32" fill="#fff" stroke="#a8a5a0" strokeWidth="3"/>
  {[-30,-8,15,34].map(n=><circle key={n} cx={n} cy="-18" r="19" fill="#fff"/> )}
  <path d="M-26 22 V49 M27 22 V49" stroke="#8a7766" strokeWidth="9" strokeLinecap="round"/>
  <ellipse cx="48" cy="-2" rx="22" ry="24" fill="#d8b18d"/><circle cx="56" cy="-6" r="3" fill="#33271f"/>
  <ellipse cx="30" cy="-20" rx="10" ry="6" fill="#d8b18d" transform="rotate(-25 30 -20)"/>
</g>;
const Star = ({x,y,r=24}) => <polygon points={Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5,v=i%2?r*.45:r;return `${x+Math.cos(a)*v},${y+Math.sin(a)*v}`}).join(" ")} fill="#ffdb4f" stroke="#e8a72c" strokeWidth="3"/>;
function Scene({date}) {
 switch(date) {
 case "2026-11-08": return <><Person x={245} y={200} robe="#4277bd" halo/><Sheep x={450} y={300} scale={1.2}/><Sheep x={580} y={335} scale={.7}/><path d="M210 255 Q340 295 440 300" stroke="#b87b43" strokeWidth="9" fill="none" strokeLinecap="round"/><Star x={490} y={105}/></>;
 case "2026-11-15": return <><Person x={220} y={220} robe="#b96dba" halo/><Person x={460} y={225} robe="#54a68d"/><path d="M320 200 Q370 120 420 200" stroke="#f5c24b" strokeWidth="9" strokeLinecap="round" fill="none"/>{[345,380,415].map((x,i)=><Star key={x} x={x} y={95+i*12} r={16}/>)}</>;
 case "2026-11-22": return <><Person x={195} y={210} robe="#b8504e" halo/><Person x={525} y={225} robe="#57a5b4" scale={.85}/><ellipse cx="365" cy="330" rx="118" ry="52" fill="#bb7739" stroke="#81502b" strokeWidth="6"/><path d="M250 308 Q365 380 480 308" stroke="#e0a356" strokeWidth="8" fill="none"/>{[290,330,370,410].map(x=><ellipse key={x} cx={x} cy={294} rx="27" ry="15" fill="#f8c66a" stroke="#b47d34" strokeWidth="3"/>)}<path d="M335 330 q28 -24 54 0 q-26 24 -54 0 M400 332 q26 -22 52 0 q-26 22 -52 0" fill="#b3d8e6" stroke="#5186a2" strokeWidth="4"/><circle cx="348" cy="329" r="3" fill="#2e5061"/></>;
 case "2026-11-29": return <><Person x={255} y={220} robe="#9e79bf"/><Person x={490} y={192} robe="#f4f4ee" halo/><path d="M425 190 Q350 65 415 80 Q465 95 455 175 M555 190 Q625 65 555 80 Q505 95 525 175" fill="#f7ffff" stroke="#c6e6f4" strokeWidth="5"/><Star x={375} y={90} r={32}/></>;
 case "2026-12-13": return <><Star x={370} y={70} r={42}/><Person x={220} y={225} robe="#7e9fc4"/><Person x={540} y={225} robe="#a66d69"/><path d="M290 350 L310 280 L440 280 L460 350Z" fill="#b87e47" stroke="#704c30" strokeWidth="6"/><ellipse cx="375" cy="278" rx="50" ry="24" fill="#f8dba5"/><circle cx="375" cy="255" r="21" fill="#e8b785"/><path d="M336 282 Q375 315 414 282" fill="#e8f2ff"/></>;
 case "2026-12-20": return <><Star x={380} y={70} r={36}/><Person x={380} y={170} robe="#fff6de" halo/><path d="M320 172 Q235 65 290 80 Q365 105 340 185 M440 172 Q525 65 470 80 Q395 105 420 185" fill="#fff" stroke="#d6eaf6" strokeWidth="5"/><Person x={160} y={275} robe="#90755b" scale={.75}/><Person x={590} y={275} robe="#7a9f70" scale={.75}/><Sheep x={260} y={340} scale={.6}/><Sheep x={510} y={345} scale={.65}/></>;
 default: return <><Person x={235} y={220} robe="#65a7c4"/><Person x={510} y={225} robe="#c9895c"/><path d="M365 355 L365 175" stroke="#6e5635" strokeWidth="13" strokeLinecap="round"/><path d="M310 225 L365 150 L420 225" stroke="#f9e28a" strokeWidth="10" fill="none"/><Star x={365} y={118} r={33}/><path d="M270 300 Q360 235 465 300" stroke="#f4c64e" strokeWidth="8" fill="none"/></>;
 }
}
export default function BibleIllustration({lesson}) {
 return <svg className="bible-scene" viewBox="0 0 760 420" role="img" aria-label={`Ilustración bíblica de ${lesson.title}`} xmlns="http://www.w3.org/2000/svg">
 <defs><linearGradient id="bibleSky" x2="0" y2="1"><stop stopColor="#8edaff"/><stop offset="1" stopColor="#f9f6ca"/></linearGradient></defs>
 <rect width="760" height="420" rx="24" fill="url(#bibleSky)"/>
 <circle cx="660" cy="75" r="42" fill="#ffe58b"/>
 <path d="M0 275 Q180 145 360 280 Q545 130 760 270 V420 H0Z" fill="#a7d890"/>
 <path d="M0 335 Q170 260 390 335 Q575 255 760 330 V420 H0Z" fill="#6fbf7d"/>
 <g fill="#fff" opacity=".85"><ellipse cx="115" cy="78" rx="67" ry="23"/><ellipse cx="150" cy="65" rx="35" ry="28"/><ellipse cx="580" cy="120" rx="60" ry="19"/></g>
 <Scene date={lesson.date}/>
 <g fill="#ffdd69">{[70,110,650,690].map((x,i)=><circle key={x} cx={x} cy={350+i%2*18} r="5"/>)}</g>
 </svg>;
}
