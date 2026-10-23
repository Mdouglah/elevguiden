/* ==========================================================
   ELEVGUIDEN – NYA MATTEOMRÅDEN FÖR ÅRSKURS 8
   Tal: potenser, Proportionalitet och skala, Geometri: volym och vinklar.
   Laddas efter ak9.js och använder hjälpfunktionerna i index.html.
   ========================================================== */
(function(){ /* Allt i en egen funktion, så att namnen inte krockar med ak-filerna */

const times = (b, e) => Array(e).fill(b).join(' · ');

/* ---------- MATEMATIK: POTENSER OCH GRUNDPOTENSFORM ---------- */
const POT8 = {
  g1(){ const b=rnd(2,5), e=b===2?rnd(3,6):rnd(2,4), ans=b**e;
    return numQ({ prompt:`Räkna ut ${b}${supStr(e)}.`, answer:ans,
      hints:[`${b}${supStr(e)} betyder att ${b} gångras med sig självt. Exponenten ${e} visar hur många ${b}:or det är.`,`Räkna ${times(b,e)}.`],
      solution:`${times(b,e)} = ${ans}`,
      wrongs:[[b*e,`Du har räknat ${b} · ${e}. ${b}${supStr(e)} betyder ${times(b,e)}.`],[e**b,'Du har bytt plats på basen och exponenten.']] }); },
  g2(){ const b=rnd(2,9); let e=rnd(3,6); while(e===b) e=rnd(3,6);
    return choiceQ({ instr:'Välj rätt potens.', prompt:`Skriv ${times(b,e)} som en potens.`,
      options:[`${b}${supStr(e)}`,`${e}${supStr(b)}`,`${b} · ${e}`,`${b*e}`], answer:`${b}${supStr(e)}`,
      hints:['Vilket tal gångras med sig självt? Det är basen.',`Räkna hur många ${b}:or det är. Det antalet blir exponenten.`],
      solution:`${e} stycken ${b}:or: ${b}${supStr(e)}`,
      diagnose: () => 'Basen är talet som gångras. Exponenten, den lilla siffran uppe till höger, är hur många gånger.' }); },
  g3(){ const e=rnd(2,7), ans=10**e;
    if (Math.random()<.5) return numQ({ prompt:`Skriv 10${supStr(e)} som ett vanligt tal.`, answer:ans,
      hints:['10² = 10 · 10 = 100. Hur många nollor blev det?',`10${supStr(e)} har ${e} nollor efter ettan.`],
      solution:`10${supStr(e)} = ${numSp(ans)}`,
      wrongs:[[10*e,`Du har räknat 10 · ${e}. 10${supStr(e)} betyder ${e} tior som gångras med varandra.`],[10**(e-1),'Räkna nollorna en gång till. Exponenten visar hur många nollor det blir.']] });
    return choiceQ({ instr:'Välj rätt tiopotens.', prompt:`Skriv ${numSp(ans)} som en tiopotens.`,
      options:[`10${supStr(e)}`,`10${supStr(e+1)}`,`10${supStr(e-1)}`,`${e}${supStr(10)}`], answer:`10${supStr(e)}`,
      hints:['Räkna nollorna i talet.',`${numSp(ans)} har ${e} nollor.`],
      solution:`${numSp(ans)} = 10${supStr(e)}`,
      diagnose: () => 'I en tiopotens är exponenten lika med antalet nollor.' }); },

  f1(){ const t=rnd(0,2); let expr, ans, w, h;
    if (t===0) { const a=rnd(2,9), b=rnd(2,6); expr=`${a} + ${b}${supStr(2)}`; ans=a+b*b; w=[[(a+b)**2,`Potensen räknas före plus. Räkna ut ${b}² först.`],[a+2*b,`${b}² betyder ${b} · ${b}, inte ${b} · 2.`]]; h=`Börja med ${b}² = ${b*b}.`; }
    else if (t===1) { const a=rnd(2,5), b=rnd(2,3); expr=`${a} · ${b}${supStr(3)}`; ans=a*b**3; w=[[(a*b)**3,`Potensen räknas före gånger. Bara ${b} ska upphöjas till 3.`]]; h=`Börja med ${b}³ = ${b**3}.`; }
    else { const a=rnd(2,5), b=rnd(1,6); expr=`(${a} + ${b})${supStr(2)}`; ans=(a+b)**2; w=[[a*a+b*b,'Parentesen räknas först. Lägg ihop talen innan du upphöjer.']]; h=`Börja med parentesen: ${a} + ${b} = ${a+b}.`; }
    return numQ({ prompt:`Räkna ut ${expr}.`, answer:ans,
      hints:['Ordningen är: parenteser, potenser, gånger och delat, plus och minus.', h],
      solution:`${h} Svar: ${expr} = ${ans}`, wrongs:w }); },
  f2(){ let m; do { m=rnd(11,99); } while(m%10===0); const e=rnd(3,6), val=m*10**(e-1), mm=fmt(m/10);
    return choiceQ({ instr:'Välj rätt grundpotensform.', prompt:`Skriv ${numSp(val)} i grundpotensform.`,
      options:[`${mm} · 10${supStr(e)}`,`${m} · 10${supStr(e-1)}`,`${mm} · 10${supStr(e-1)}`,`0,${m} · 10${supStr(e+1)}`], answer:`${mm} · 10${supStr(e)}`,
      hints:['I grundpotensform skrivs talet som ett tal mellan 1 och 10, gånger en tiopotens.',`${numSp(val)} = ${mm} · ${numSp(10**e)}. Hur skriver du ${numSp(10**e)} som en tiopotens?`],
      solution:`${numSp(val)} = ${mm} · ${numSp(10**e)} = ${mm} · 10${supStr(e)}`,
      diagnose: raw => (raw.startsWith(m+' ') || raw.startsWith('0,')) ? 'Värdet stämmer, men i grundpotensform ska talet framför tiopotensen vara mellan 1 och 10.' : 'Räkna hur många steg kommat flyttas. Det blir exponenten.' }); },
  f3(){ const b=rnd(2,7), m=rnd(2,6); let n=rnd(2,6); while(m===2 && n===2) n=rnd(2,6);
    return choiceQ({ instr:'Välj rätt potens.', prompt:`Skriv ${b}${supStr(m)} · ${b}${supStr(n)} som en potens.`,
      options:[`${b}${supStr(m+n)}`,`${b}${supStr(m*n)}`,`${b*b}${supStr(m+n)}`,`${b*b}${supStr(m*n)}`], answer:`${b}${supStr(m+n)}`,
      hints:[`Skriv ut faktorerna. Hur många ${b}:or gångras totalt?`,`${m} stycken och ${n} stycken ${b}:or blir ${m+n} stycken. När basen är samma läggs exponenterna ihop.`],
      solution:`${b}${supStr(m)} · ${b}${supStr(n)} = ${b}${supStr(m+n)}`,
      diagnose: () => 'Basen ändras inte. Exponenterna läggs ihop när du gångrar potenser med samma bas.' }); },

  u1(){ const b=rnd(2,9), m=rnd(5,10), n=rnd(2,m-2);
    return choiceQ({ instr:'Välj rätt potens.', prompt:`Skriv ${b}${supStr(m)} / ${b}${supStr(n)} som en potens.`,
      options:[`${b}${supStr(m-n)}`,`${b}${supStr(m+n)}`,`${b}${supStr(m*n)}`,`1${supStr(m-n)}`], answer:`${b}${supStr(m-n)}`,
      hints:[`Tänk dig ${m} stycken ${b}:or ovanför bråkstrecket och ${n} under. Hur många kan du stryka?`,'När du delar potenser med samma bas drar du bort exponenterna.'],
      solution:`Exponenterna dras bort: ${m} − ${n} = ${m-n}. ${b}${supStr(m)} / ${b}${supStr(n)} = ${b}${supStr(m-n)}`,
      diagnose: () => 'Basen ändras inte. När du delar drar du bort exponenterna.' }); },
  u2(){ const d=rnd(2,9), e=rnd(2,5), str='0,'+'0'.repeat(e-1)+d;
    return choiceQ({ instr:'Välj rätt grundpotensform.', prompt:`Skriv ${str} i grundpotensform.`,
      options:[`${d} · 10${supStr(-e)}`,`${d} · 10${supStr(e)}`,`${d} · 10${supStr(-(e-1))}`,`0,${d} · 10${supStr(-(e-1))}`], answer:`${d} · 10${supStr(-e)}`,
      hints:['Ett tal som är mindre än 1 får en negativ exponent.',`Flytta kommat åt höger tills du får ett tal mellan 1 och 10. Hur många steg blir det?`],
      solution:`Kommat flyttas ${e} steg åt höger: ${str} = ${d} · 10${supStr(-e)}`,
      diagnose: raw => raw.startsWith('0,') ? 'Värdet stämmer, men talet framför tiopotensen ska vara mellan 1 och 10.' : 'Räkna stegen kommat flyttas. Små tal får minus i exponenten.' }); },
  u3(){ const [a,b]=pick([[2,3],[2,4],[3,3],[4,2],[3,2]]), m=rnd(2,5); let n=rnd(2,5); while(m===2 && n===2) n=rnd(2,5);
    const right=`${a*b} · 10${supStr(m+n)}`;
    return choiceQ({ instr:'Välj rätt svar.', prompt:`Räkna ut (${a} · 10${supStr(m)}) · (${b} · 10${supStr(n)}). Svara i grundpotensform.`,
      options:[right,`${a*b} · 10${supStr(m*n)}`,`${a+b} · 10${supStr(m+n)}`,`${a*b} · 10${supStr(m+n-1)}`], answer:right,
      hints:['Gångra talen för sig och tiopotenserna för sig.',`${a} · ${b} = ${a*b}, och 10${supStr(m)} · 10${supStr(n)} = 10${supStr(m+n)}.`],
      solution:`${a} · ${b} = ${a*b} och 10${supStr(m)} · 10${supStr(n)} = 10${supStr(m+n)}. Svar: ${right}`,
      diagnose: () => 'Gångra talen med varandra, och lägg ihop exponenterna.' }); }
};

/* ---------- MATEMATIK: PROPORTIONALITET OCH SKALA ---------- */
const PROP8 = {
  g1(){ const n=rnd(2,6), p=pick([5,8,12,15,20,25,30,45]), it=pick([['kg äpplen','1 kg'],['liter juice','1 liter'],['biljetter','en biljett'],['block','ett block']]);
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`${n} ${it[0]} kostar ${n*p} kr. Vad kostar ${it[1]}?`, answer:p,
      hints:['Om du vet vad flera kostar, hur tar du reda på vad en kostar?',`Dela ${n*p} kr med ${n}.`],
      solution:`${n*p} / ${n} = ${p} kr`,
      wrongs:[[n*p*n,`Du har gångrat. Om ${n} kostar ${n*p} kr måste en kosta mindre.`],[n*p-n,'Du drog bort antalet. Dela istället priset med antalet.']] }); },
  g2(){ const n=rnd(2,5), p=pick([12,15,20,25,40,45,60]); let k=rnd(2,9); while(k===n) k=rnd(2,9); const it=pick(['biobiljetter','glassar','bussbiljetter','pizzor']);
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`${n} ${it} kostar ${n*p} kr. Vad kostar ${k} ${it}?`, answer:k*p,
      hints:['Vad kostar en?',`En kostar ${n*p} / ${n} = ${p} kr. Vad kostar då ${k}?`],
      solution:`En kostar ${n*p} / ${n} = ${p} kr. ${k} · ${p} = ${k*p} kr`,
      wrongs:[[n*p+(k-n),'Du lade till skillnaden i antal. Räkna först ut vad en kostar.'],[n*p*k,'Du har gångrat hela priset. Räkna först ut vad en kostar.']] }); },
  g3(){ const p1=rnd(15,40); let p2=rnd(15,40); while(p2===p1) p2=rnd(15,40);
    const [n1,n2]=Math.random()<.5?[2,3]:[3,2], o1=`${n1} kg för ${n1*p1} kr`, o2=`${n2} kg för ${n2*p2} kr`, ans=p1<p2?o1:o2;
    return choiceQ({ instr:'Välj det som är billigast per kilo.', prompt:`Du ska köpa äpplen. Vilket är billigast per kilo?`, options:[o1,o2], answer:ans,
      hints:['Räkna ut vad 1 kg kostar i båda fallen.',`${n1*p1} / ${n1} = ${p1} kr per kg och ${n2*p2} / ${n2} = ${p2} kr per kg.`],
      solution:`${o1} blir ${p1} kr/kg. ${o2} blir ${p2} kr/kg. Billigast per kilo är ${ans}.`,
      diagnose: () => 'Det som kostar minst totalt är inte alltid billigast per kilo. Jämför priset för 1 kg.' }); },

  f1(){ const sc=pick([10000,20000,25000,50000,100000]), cm=rnd(2,12), ans=cm*sc/100000;
    return numQ({ instr:'Skriv svaret i km, bara talet.', prompt:`En karta har skalan 1:${numSp(sc)}. På kartan är avståndet mellan två orter ${cm} cm. Hur långt är det i verkligheten?`, answer:ans,
      hints:[`Skalan betyder att 1 cm på kartan är ${numSp(sc)} cm i verkligheten. Hur många cm blir ${cm} cm?`,`${cm} · ${numSp(sc)} = ${numSp(cm*sc)} cm. 1 km = 100 000 cm.`],
      solution:`${cm} · ${numSp(sc)} = ${numSp(cm*sc)} cm = ${fmt(ans)} km`,
      wrongs:[[cm*sc,'Det där är i centimeter. Gör om till km: 1 km = 100 000 cm.'],[cm*sc/100,'Det där är i meter. 1 km = 1 000 m.']] }); },
  f2(){ const k=pick([5,10,20,50]), img=rnd(4,20), ans=img/k, an=pick(['myra','fluga','nyckelpiga','loppa']);
    return numQ({ instr:'Skriv svaret i cm, bara talet.', prompt:`En bild av en ${an} är ritad i skala ${k}:1. På bilden är den ${img} cm lång. Hur lång är den i verkligheten?`, answer:ans,
      hints:[`Skala ${k}:1 betyder att bilden är ${k} gånger större än verkligheten.`,`Dela bildens längd med ${k}.`],
      solution:`${img} / ${k} = ${fmt(ans)} cm`,
      wrongs:[[img*k,`Skala ${k}:1 betyder att bilden är förstorad ${k} gånger. Verkligheten är alltså mindre än bilden.`]] }); },
  f3(){ const k=rnd(2,9), x1=rnd(2,6); let x2=rnd(3,12); while(x2===x1) x2=rnd(3,12);
    return numQ({ prompt:`y är proportionellt mot x. När x = ${x1} är y = ${k*x1}. Vad är y när x = ${x2}?`, answer:k*x2,
      hints:['Hur många gånger större än x är y?',`y är ${k*x1} / ${x1} = ${k} gånger så stort som x. Vad blir ${k} · ${x2}?`],
      solution:`y = ${k}x. ${k} · ${x2} = ${k*x2}`,
      wrongs:[[k*x1+(x2-x1),'Proportionellt betyder att y alltid är lika många gånger större än x. Det räcker inte att lägga till skillnaden.']] }); },

  u1(){ const p1=pick([2,4,6]), p2=pick([3,5,8,10]), q=rnd(2,15)*10, amt=p1*q, ing=pick(['mjöl','socker','pasta','ris']);
    return numQ({ instr:'Skriv svaret i gram, bara talet.', prompt:`Ett recept för ${p1} personer behöver ${amt} g ${ing}. Hur mycket ${ing} behövs för ${p2} personer?`, answer:p2*q,
      hints:['Hur mycket behövs till en person?',`${amt} / ${p1} = ${q} g per person.`],
      solution:`${amt} / ${p1} = ${q} g per person. ${p2} · ${q} = ${p2*q} g`,
      wrongs:[[amt+(p2-p1),'Du lade till skillnaden i antal personer. Räkna först ut hur mycket som behövs per person.']] }); },
  u2(){ let p1, t, p2; for (;;) { p1=rnd(2,4); t=rnd(3,12); const tot=p1*t, ds=[]; for (let d=2; d<=12; d++) if (tot%d===0 && d!==p1) ds.push(d); if (ds.length) { p2=pick(ds); break; } }
    return numQ({ instr:'Skriv svaret i timmar, bara talet.', prompt:`${p1} personer målar ett staket på ${t} timmar. Hur lång tid tar det för ${p2} personer, om alla jobbar lika snabbt?`, answer:p1*t/p2,
      hints:['Hur lång tid skulle det ta för en person ensam?',`En person skulle behöva ${p1} · ${t} = ${p1*t} timmar.`],
      solution:`En person: ${p1} · ${t} = ${p1*t} timmar. ${p2} personer: ${p1*t} / ${p2} = ${fmt(p1*t/p2)} timmar`,
      wrongs:[[t*p2/p1,'Fler personer gör att det går snabbare, inte långsammare. Det här är omvänt proportionellt.'],[t,'Antalet personer påverkar hur lång tid det tar.']] }); },
  u3(){ const a=2*rnd(2,8), b=2*rnd(2,8), ans=a*b/4;
    return numQ({ instr:'Skriv svaret i m², bara talet.', prompt:`En ritning har skalan 1:50. Ett rum är ${a} cm · ${b} cm på ritningen. Hur stor är rummets area i verkligheten?`, answer:ans,
      hints:['Gör om sidorna till verkliga mått först. 1 cm på ritningen är 50 cm i verkligheten.',`${a} cm blir ${a*50} cm = ${fmt(a/2)} m, och ${b} cm blir ${fmt(b/2)} m.`],
      solution:`${fmt(a/2)} m · ${fmt(b/2)} m = ${fmt(ans)} m²`,
      wrongs:[[a*b,'Det där är arean på ritningen. Gör om sidorna till meter först.'],[a*b/2,'Skalan gäller sidorna, inte arean. Gör om varje sida först.']] }); }
};

/* ---------- MATEMATIK: VOLYM OCH VINKLAR ---------- */
const VOL8 = {
  g1(){ let a, b, c; do { a=rnd(25,100); b=rnd(25,100); c=180-a-b; } while(c<15);
    return numQ({ instr:'Skriv svaret i grader, bara talet.', prompt:`I en triangel är två av vinklarna ${a}° och ${b}°. Hur stor är den tredje vinkeln?`, answer:c,
      hints:['Vad är vinkelsumman i en triangel, alltså alla tre vinklarna tillsammans?',`Vinklarna i en triangel är tillsammans 180°. ${a}° + ${b}° = ${a+b}°.`],
      solution:`180° − ${a}° − ${b}° = ${c}°`,
      wrongs:[[360-a-b,'Vinkelsumman i en triangel är 180°, inte 360°.']] }); },
  g2(){ let a=rnd(20,160); while(a===90) a=rnd(20,160);
    return numQ({ instr:'Skriv svaret i grader, bara talet.', prompt:`Två vinklar ligger bredvid varandra på en rak linje. Den ena är ${a}°. Hur stor är den andra?`, answer:180-a,
      hints:['Hur många grader är en rak linje, alltså ett halvt varv?','En rak linje är 180°.'],
      solution:`180° − ${a}° = ${180-a}°`,
      wrongs:[[360-a,'En rak linje är 180°, inte 360°.'],[90-a,'En rak linje är 180°, inte 90°.']] }); },
  g3(){ const l=rnd(3,12), b=rnd(2,8), h=rnd(2,8);
    return numQ({ instr:'Skriv svaret i cm³, bara talet.', prompt:`En låda har formen av ett rätblock. Den är ${l} cm lång, ${b} cm bred och ${h} cm hög. Hur stor är volymen?`, answer:l*b*h,
      hints:['Volymen av ett rätblock är längd · bredd · höjd.',`Räkna ${l} · ${b} · ${h}.`],
      solution:`${l} · ${b} · ${h} = ${l*b*h} cm³`,
      wrongs:[[l+b+h,'Volym räknas med gånger: längd · bredd · höjd.'],[l*b,'Det där är bottenytans area. Gångra också med höjden.']] }); },

  f1(){ const s=rnd(2,10);
    return numQ({ instr:'Skriv svaret i cm³, bara talet.', prompt:`En kub har sidan ${s} cm. Hur stor är volymen?`, answer:s**3,
      hints:['En kub har lika långa sidor åt alla håll.',`Volymen är ${s} · ${s} · ${s}.`],
      solution:`${s} · ${s} · ${s} = ${s**3} cm³`,
      wrongs:[[3*s,`${s}³ betyder ${s} · ${s} · ${s}, inte ${s} · 3.`],[s*s,'Det där är arean av en sida. Gångra med sidan en gång till.'],[6*s*s,'Det där är begränsningsarean, alltså alla sex sidornas area. Volymen är sidan · sidan · sidan.']] }); },
  f2(){ const l=10*rnd(3,8), b=10*rnd(2,5), h=10*rnd(2,5), v=l*b*h, ans=v/1000;
    return numQ({ instr:'Skriv svaret i liter, bara talet.', prompt:`Ett akvarium är ${l} cm långt, ${b} cm brett och ${h} cm högt. Hur många liter rymmer det?`, answer:ans,
      hints:['1 liter är lika mycket som 1 dm³. Kan du göra om måtten till dm först?',`${l} cm = ${l/10} dm, ${b} cm = ${b/10} dm och ${h} cm = ${h/10} dm.`],
      solution:`${l/10} · ${b/10} · ${h/10} = ${fmt(ans)} dm³ = ${fmt(ans)} liter`,
      wrongs:[[v,'Det där är i cm³. 1 liter = 1 000 cm³.'],[v/100,'1 liter är 1 000 cm³, inte 100.']] }); },
  f3(){ let a, b, c, d; do { a=rnd(50,140); b=rnd(50,140); c=rnd(50,140); d=360-a-b-c; } while(d<40 || d>170);
    return numQ({ instr:'Skriv svaret i grader, bara talet.', prompt:`En fyrhörning har tre vinklar som är ${a}°, ${b}° och ${c}°. Hur stor är den fjärde vinkeln?`, answer:d,
      hints:['En fyrhörning kan delas i två trianglar. Vad blir vinkelsumman då?','Vinkelsumman i en fyrhörning är 2 · 180° = 360°.'],
      solution:`360° − ${a}° − ${b}° − ${c}° = ${d}°`,
      wrongs:[[180-a-b-c,'En fyrhörning har vinkelsumman 360°, inte 180°.']] }); },

  u1(){ const r=rnd(2,6), h=rnd(5,20), ans=Math.round(3.14*r*r*h*100)/100;
    return numQ({ instr:'Använd π ≈ 3,14. Skriv svaret i cm³, bara talet.', prompt:`En burk har formen av en cylinder. Radien är ${r} cm och höjden är ${h} cm. Hur stor är volymen?`, answer:ans,
      hints:['Volymen av en cylinder är bottenytans area · höjden. Bottenytan är en cirkel.',`Bottenytan är 3,14 · ${r} · ${r} = ${fmt(3.14*r*r)} cm². Gångra med höjden.`],
      solution:`3,14 · ${r} · ${r} · ${h} = ${fmt(ans)} cm³`,
      wrongs:[[Math.round(3.14*2*r*h*100)/100,'Du räknade med omkretsen. Bottenytan är π · r · r.'],[Math.round(3.14*r*h*100)/100,'Radien ska gångras med sig själv: π · r · r.']] }); },
  u2(){ const l=rnd(3,10), b=rnd(2,8), h=rnd(2,10), v=l*b*h;
    return numQ({ instr:'Skriv svaret i cm, bara talet.', prompt:`Ett rätblock har volymen ${v} cm³. Det är ${l} cm långt och ${b} cm brett. Hur högt är det?`, answer:h,
      hints:['Volymen är längd · bredd · höjd. Vad är längd · bredd?',`${l} · ${b} = ${l*b}. Vilket tal gånger ${l*b} blir ${v}?`],
      solution:`${v} / (${l} · ${b}) = ${v} / ${l*b} = ${h} cm`,
      wrongs:[[v-l-b,'Volymen räknas med gånger. Dela istället för att dra bort.'],[v/l,'Du delade bara med längden. Dela med både längden och bredden.']] }); },
  u3(){ const top=2*rnd(10,70), ans=(180-top)/2;
    return numQ({ instr:'Skriv svaret i grader, bara talet.', prompt:`En likbent triangel har toppvinkeln ${top}°. De två basvinklarna är lika stora. Hur stor är en basvinkel?`, answer:ans,
      hints:['Hur många grader är kvar till de två basvinklarna tillsammans?',`180° − ${top}° = ${180-top}°. Det ska delas lika på två vinklar.`],
      solution:`(180° − ${top}°) / 2 = ${ans}°`,
      wrongs:[[180-top,'Det där är båda basvinklarna tillsammans. Dela med 2.'],[top,'Basvinklarna är lika stora som varandra, men inte som toppvinkeln.'],[(360-top)/2,'Vinkelsumman i en triangel är 180°.']] }); }
};

/* ---------- NYA OMRÅDEN I ÅRSKURS 8 ---------- */
Object.assign(CONTENT, {
  '8-matte-potenser':{
    intro:[
      'En potens är ett kortare sätt att skriva samma tal gånger sig självt. 2⁵ betyder 2 · 2 · 2 · 2 · 2 = 32. Talet 2 är basen och 5 är exponenten.',
      'Tiopotenser är extra bra att kunna. 10³ = 1 000, och exponenten visar antalet nollor.',
      'Stora tal skrivs ofta i grundpotensform: ett tal mellan 1 och 10 gånger en tiopotens. 45 000 skrivs 4,5 · 10⁴. Små tal får negativ exponent: 0,003 = 3 · 10⁻³.'
    ],
    example:{title:'Exempel: Skriv 72 000 i grundpotensform', steps:['Flytta kommat så att talet blir mellan 1 och 10: 7,2.','Kommat flyttades 4 steg åt vänster.','Svar: 72 000 = 7,2 · 10⁴.']},
    levels:[
      {name:'Grund', desc:'Potenser och tiopotenser', make:()=>mix([POT8.g1,POT8.g2,POT8.g3],8)},
      {name:'Fördjupning', desc:'Räkneordning, grundpotensform och potenslagar', make:()=>mix([POT8.f1,POT8.f2,POT8.f3],8)},
      {name:'Utmaning', desc:'Dela potenser, små tal och räkna i grundpotensform', make:()=>mix([POT8.u1,POT8.u2,POT8.u3],8)}
    ]
  },
  '8-matte-proportionalitet':{
    intro:[
      'Två storheter är proportionella om de ökar i samma takt. Köper du dubbelt så många kostar det dubbelt så mycket.',
      'Ett bra knep är att först räkna ut vad en sak kostar, eller hur mycket som går åt till en person. Sedan gångrar du.',
      'Skala visar hur mycket en bild eller karta är förminskad eller förstorad. Skala 1:50 000 betyder att 1 cm på kartan är 50 000 cm i verkligheten. Skala 10:1 betyder att bilden är tio gånger större än verkligheten.'
    ],
    example:{title:'Exempel: 4 biljetter kostar 320 kr. Vad kostar 7?', steps:['En biljett kostar 320 / 4 = 80 kr.','7 biljetter kostar 7 · 80 = 560 kr.','Svar: 560 kr.']},
    levels:[
      {name:'Grund', desc:'Pris per styck och jämförpris', make:()=>mix([PROP8.g1,PROP8.g2,PROP8.g3],8)},
      {name:'Fördjupning', desc:'Kartor, förstoringar och proportionalitet', make:()=>mix([PROP8.f1,PROP8.f2,PROP8.f3],8)},
      {name:'Utmaning', desc:'Recept, omvänd proportionalitet och area i skala', make:()=>mix([PROP8.u1,PROP8.u2,PROP8.u3],8)}
    ]
  },
  '8-matte-volym':{
    intro:[
      'Vinklar mäts i grader. En rak linje är 180°. Vinklarna i en triangel är tillsammans 180°, och i en fyrhörning 360°.',
      'Volym är hur mycket något rymmer. Ett rätblock har volymen längd · bredd · höjd, och en cylinder har volymen bottenytans area · höjden.',
      'Volym mäts i kubikenheter, till exempel cm³ eller dm³. 1 dm³ är lika mycket som 1 liter, och 1 liter är 1 000 cm³.'
    ],
    example:{title:'Exempel: En mjölkkartong är 7 cm · 7 cm · 20 cm', steps:['Volym: 7 · 7 · 20 = 980 cm³.','1 liter = 1 000 cm³.','Svar: 980 cm³, nästan en liter.']},
    levels:[
      {name:'Grund', desc:'Vinklar och volymen av ett rätblock', make:()=>mix([VOL8.g1,VOL8.g2,VOL8.g3],8)},
      {name:'Fördjupning', desc:'Kuber, liter och vinklar i fyrhörningar', make:()=>mix([VOL8.f1,VOL8.f2,VOL8.f3],8)},
      {name:'Utmaning', desc:'Cylindrar, en sida som saknas och likbenta trianglar', make:()=>mix([VOL8.u1,VOL8.u2,VOL8.u3],8)}
    ]
  }
});
})();
