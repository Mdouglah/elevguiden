/* ==========================================================
   ELEVGUIDEN – NYA MATTEOMRÅDEN FÖR ÅRSKURS 9
   Tal: kvadratrötter och grundpotensform, Procent och förändringsfaktor,
   Geometri: Pythagoras sats och likformighet.
   Laddas efter ak9.js och använder hjälpfunktionerna i index.html.
   ========================================================== */
(function(){ /* Allt i en egen funktion, så att namnen inte krockar med ak-filerna */

/* Rätvinklig triangel. a = basen, b = höjden, c = hypotenusan. Skriv '?' för sidan som söks. */
FIG.rt = (a, b, c) => `<svg viewBox="0 0 270 160" role="img" aria-label="En rätvinklig triangel. Den liggande kateten är ${a}, den stående kateten är ${b} och hypotenusan är ${c}."><polygon points="60,125 230,125 60,25" fill="none" stroke="currentColor" stroke-width="2.5"/><polyline points="60,111 74,111 74,125" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="145" y="148" text-anchor="middle">${a}</text><text x="52" y="80" text-anchor="end">${b}</text><text x="152" y="66">${c}</text></svg>`;
const dec = n => String(n).replace('.', ',');

/* ---------- MATEMATIK: KVADRATRÖTTER OCH GRUNDPOTENSFORM ---------- */
const ROT9 = {
  g1(){ const r=rnd(2,15), n=r*r;
    return numQ({ prompt:`Vad är √${n}?`, answer:r,
      hints:['Roten ur ett tal är det tal som gånger sig självt blir talet.',`Vilket tal · samma tal = ${n}? Prova dig fram, till exempel med ${r-1} · ${r-1} = ${(r-1)**2}.`],
      solution:`${r} · ${r} = ${n}, så √${n} = ${r}`,
      wrongs:[[n/2,`Roten ur är inte hälften av talet. Vilket tal gånger sig självt blir ${n}?`]] }); },
  g2(){ const a=rnd(4,20);
    return numQ({ prompt:`Räkna ut ${a}².`, answer:a*a,
      hints:[`${a}² betyder ${a} · ${a}.`,`Räkna ${a} · ${a}.`],
      solution:`${a} · ${a} = ${a*a}`,
      wrongs:[[2*a,`${a}² betyder ${a} · ${a}, inte ${a} · 2.`]] }); },
  g3(){ let n; do { n=rnd(5,120); } while(Number.isInteger(Math.sqrt(n)));
    const k=Math.floor(Math.sqrt(n)), o=a=>`${a} och ${a+1}`, h=Math.floor(n/2);
    const opts=[o(k),o(k-1),o(k+1)]; opts.push(o([k-1,k,k+1].includes(h) ? k+2 : h));
    return choiceQ({ instr:'Välj rätt svar.', prompt:`Mellan vilka två heltal ligger √${n}?`, options:opts, answer:o(k),
      hints:[`Vilka kvadrattal ligger närmast ${n}, ett under och ett över?`,`${k}² = ${k*k} och ${k+1}² = ${(k+1)**2}. ${n} ligger mellan dem.`],
      solution:`${k}² = ${k*k} och ${k+1}² = ${(k+1)**2}. Alltså ligger √${n} mellan ${k} och ${k+1}.`,
      diagnose: () => 'Roten ur är inte hälften. Leta efter kvadrattalen närmast talet.' }); },

  f1(){ const [a,b]=Math.random()<.5 ? pick([[3,4],[6,8],[5,12],[8,6]]) : [rnd(2,9),rnd(2,9)];
    return numQ({ prompt:`Räkna ut √${a*a} + √${b*b}.`, answer:a+b,
      hints:['Dra roten ur varje tal för sig först.',`√${a*a} = ${a}. Vad är √${b*b}?`],
      solution:`√${a*a} + √${b*b} = ${a} + ${b} = ${a+b}`,
      wrongs:[[Math.sqrt(a*a+b*b),'Du kan inte lägga ihop talen under rottecknen först. Dra roten ur vart och ett för sig.']] }); },
  f2(){ let m; do { m=rnd(11,99); } while(m%10===0); const e=rnd(3,6), ans=m*10**(e-1);
    return numQ({ prompt:`Skriv ${fmt(m/10)} · 10${supStr(e)} som ett vanligt tal.`, answer:ans,
      hints:['Exponenten visar hur många steg kommat ska flyttas åt höger.',`Flytta kommat i ${fmt(m/10)} ${e} steg åt höger, och fyll på med nollor.`],
      solution:`${fmt(m/10)} · 10${supStr(e)} = ${numSp(ans)}`,
      wrongs:[[m*10**e,`Kommat ska flyttas ${e} steg. Du har flyttat det ett steg för långt.`],[m*10**(e-2),`Kommat ska flyttas ${e} steg. Du har flyttat det ett steg för kort.`]] }); },
  f3(){ const d=rnd(2,9), e=rnd(2,3), ans=d/10**e;
    return numQ({ instr:'Skriv svaret i decimalform.', prompt:`Skriv ${d} · 10${supStr(-e)} som ett decimaltal.`, answer:ans,
      hints:['En negativ exponent betyder att talet är mindre än 1.',`Flytta kommat ${e} steg åt vänster.`],
      solution:`${d} · 10${supStr(-e)} = ${fmt(ans)}`,
      wrongs:[[d*10**e,'En negativ exponent betyder att talet blir mindre än 1. Flytta kommat åt vänster.'],[d/10**(e-1),`Flytta kommat ${e} steg åt vänster, inte ${e-1}.`]] }); },

  u1(){ const [a,b]=pick([[8,2],[9,3],[6,2],[8,4],[6,3]]), m=rnd(6,10), n=rnd(2,4), right=`${a/b} · 10${supStr(m-n)}`;
    return choiceQ({ instr:'Välj rätt svar.', prompt:`Räkna ut (${a} · 10${supStr(m)}) / (${b} · 10${supStr(n)}). Svara i grundpotensform.`,
      options:[right,`${a-b} · 10${supStr(m-n)}`,`${a/b} · 10${supStr(m+n)}`,`${a*b} · 10${supStr(m-n)}`], answer:right,
      hints:['Dela talen för sig och tiopotenserna för sig.',`${a} / ${b} = ${a/b}. När du delar tiopotenser drar du bort exponenterna: ${m} − ${n} = ${m-n}.`],
      solution:`${a} / ${b} = ${a/b} och 10${supStr(m)} / 10${supStr(n)} = 10${supStr(m-n)}. Svar: ${right}`,
      diagnose: () => 'Dela talen med varandra, och dra bort exponenterna.' }); },
  u2(){ const [a,b]=pick([[2,5],[4,5],[5,6],[5,8]]), m=rnd(2,5), n=rnd(2,5), p=a*b, right=`${p/10} · 10${supStr(m+n+1)}`;
    return choiceQ({ instr:'Välj rätt svar.', prompt:`Räkna ut (${a} · 10${supStr(m)}) · (${b} · 10${supStr(n)}). Svara i grundpotensform.`,
      options:[right,`${p} · 10${supStr(m+n)}`,`${p/10} · 10${supStr(m+n)}`,`${a+b} · 10${supStr(m+n)}`], answer:right,
      hints:['Gångra talen för sig och lägg ihop exponenterna.',`${a} · ${b} = ${p}, men ${p} är inte mellan 1 och 10. Skriv ${p} som ${p/10} · 10.`],
      solution:`${a} · ${b} = ${p} = ${p/10} · 10. 10 · 10${supStr(m+n)} = 10${supStr(m+n+1)}. Svar: ${right}`,
      diagnose: raw => raw.startsWith(p+' ') ? `Värdet stämmer, men ${p} är inte mellan 1 och 10. Skriv om ${p} som ${p/10} · 10.` : 'Gångra talen och lägg ihop exponenterna. Kolla sedan att talet framför är mellan 1 och 10.' }); },
  u3(){ const s=rnd(4,15), A=s*s;
    return numQ({ instr:'Skriv svaret i meter, bara talet.', prompt:`En kvadratisk gräsmatta har arean ${A} m². Hur lång är omkretsen?`, answer:4*s,
      hints:['Börja med att räkna ut hur lång en sida är. Arean av en kvadrat är sidan · sidan.',`Sidan är √${A} = ${s} m. Omkretsen är fyra sidor.`],
      solution:`Sidan: √${A} = ${s} m. Omkretsen: 4 · ${s} = ${4*s} m`,
      wrongs:[[s,'Det där är en sida. Omkretsen är alla fyra sidorna.'],[A/4,'Du delade arean med 4. Räkna först ut sidan med roten ur.'],[4*A,'Arean är inte en sida. Ta roten ur arean först.']] }); }
};

/* ---------- MATEMATIK: PROCENT OCH FÖRÄNDRINGSFAKTOR ---------- */
const FF9 = {
  g1(){ const up=Math.random()<.5, p=pick([3,6,8,12,15,20,35,40]), f=up?1+p/100:1-p/100;
    return numQ({ instr:'Skriv svaret i decimalform.', prompt:`Ett pris ${up?'ökar':'minskar'} med ${p} %. Vilken förändringsfaktor ska du gånga det gamla priset med?`, answer:f,
      hints:['Om det gamla priset är 100 %, hur många procent är då det nya priset?', up?`100 % + ${p} % = ${100+p} %. Hur skriver du det i decimalform?`:`100 % − ${p} % = ${100-p} %. Hur skriver du det i decimalform?`],
      solution:`${up?100+p:100-p} % = ${fmt(f)}. Förändringsfaktorn är ${fmt(f)}.`,
      wrongs:[[p/100,'Det där är bara själva förändringen. Faktorn ska också innehålla hela det gamla priset, alltså 1.'],[up?1-p/100:1+p/100,'Kolla en gång till om priset ökar eller minskar.'],[up?100+p:100-p,'Rätt procent! Skriv det nu i decimalform genom att dela med 100.']] }); },
  g2(){ const up=Math.random()<.5, p=pick([2,5,8,12,15,20,25,30,40]), f=up?1+p/100:1-p/100, A=up?'Ökat':'Minskat', B=up?'Minskat':'Ökat';
    return choiceQ({ instr:'Välj rätt svar.', prompt:`Ett pris gångras med förändringsfaktorn ${fmt(f)}. Hur har priset ändrats?`,
      options:[`${A} med ${p} %`,`${B} med ${p} %`,`${A} med ${up?100+p:100-p} %`,`Ökat med ${fmt(f)} %`], answer:`${A} med ${p} %`,
      hints:['Är faktorn större eller mindre än 1? Vad betyder det för priset?',`${fmt(f)} = ${up?100+p:100-p} %. Jämför med 100 %.`],
      solution:`${fmt(f)} = ${up?100+p:100-p} %. Det är ${p} procentenheter ${up?'mer':'mindre'} än 100 %, så priset har ${A.toLowerCase()} med ${p} %.`,
      diagnose: () => 'En faktor över 1 betyder ökning och under 1 betyder minskning. Jämför med 100 %.' }); },
  g3(){ const N=20*rnd(5,50), up=Math.random()<.5, p=pick([5,10,15,20,25,30]), f=up?1+p/100:1-p/100, ans=N*(up?100+p:100-p)/100;
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`En vara kostar ${N} kr. Priset ${up?'höjs':'sänks'} med ${p} %. Vad blir det nya priset? Använd förändringsfaktorn.`, answer:ans,
      hints:[`Vilken förändringsfaktor hör till en ${up?'höjning':'sänkning'} med ${p} %?`,`Förändringsfaktorn är ${fmt(f)}. Räkna ${N} · ${fmt(f)}.`],
      solution:`${N} · ${fmt(f)} = ${fmt(ans)} kr`,
      wrongs:[[N*p/100,'Det där är förändringen i kronor. Vad blir det nya priset?'],[N*(up?100-p:100+p)/100,`Kolla om priset ${up?'höjs':'sänks'}.`]] }); },

  f1(){ const N=pick([1000,2000,4000,5000,8000,10000]), p=pick([10,20,25,50]), f=1-p/100, ans=N*(100-p)*(100-p)/10000, it=pick(['En mobil','En dator','En cykel','En moped']);
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`${it} kostar ${numSp(N)} kr ny. Den tappar ${p} % i värde varje år. Vad är den värd efter 2 år?`, answer:ans,
      hints:['Det andra året räknas minskningen på det nya värdet, inte på det första priset.',`Förändringsfaktorn är ${fmt(f)} per år. Räkna ${numSp(N)} · ${fmt(f)} · ${fmt(f)}.`],
      solution:`${numSp(N)} · ${fmt(f)} · ${fmt(f)} = ${fmt(ans)} kr`,
      wrongs:[[N*(1-2*p/100),`Du drog bort ${p} % av det första priset två gånger. Det andra året räknas ${p} % på det nya, lägre värdet.`],[N*f,'Det där är värdet efter ett år. Räkna ett år till.']] }); },
  f2(){ const [a,b]=pick([[2,3],[4,5],[2,5],[4,6],[5,6],[10,12],[5,8],[20,25]]), pe=b-a, pc=(b-a)/a*100, unit=Math.random()<.5;
    const th=pick(['Räntan på ett sparkonto','Räntan på ett lån','Andelen elever som cyklar till skolan']);
    return numQ({ instr:'Skriv svaret som ett tal.', prompt:`${th} ökar från ${a} % till ${b} %. ${unit?'Hur många procentenheter är ökningen?':'Hur många procent är ökningen?'}`, answer:unit?pe:pc,
      hints: unit ? ['Procentenheter är skillnaden mellan två procentsatser.',`Räkna ${b} − ${a}.`] : ['Procent jämför ökningen med det man hade från början.',`Ökningen är ${pe} procentenheter. Hur många procent är ${pe} av ${a}?`],
      solution: unit ? `${b} − ${a} = ${pe} procentenheter` : `${pe} / ${a} = ${fmt(pe/a)} = ${fmt(pc)} %`,
      wrongs: unit ? [[pc,`Det där är ökningen i procent. Procentenheter är bara skillnaden: ${b} − ${a}.`]] : [[pe,`Det där är ökningen i procentenheter. Hur många procent är ${pe} av ${a}?`]] }); },
  f3(){ const A=20*rnd(5,40), p=pick([10,20,25,50]), B=A*(100+p)/100;
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`Efter en höjning med ${p} % kostar en biljett ${fmt(B)} kr. Vad kostade den innan?`, answer:A,
      hints:[`Vilken förändringsfaktor hör till en höjning med ${p} %?`,`Det gamla priset · ${fmt(1+p/100)} = ${fmt(B)}. Dela ${fmt(B)} med ${fmt(1+p/100)}.`],
      solution:`${fmt(B)} / ${fmt(1+p/100)} = ${A} kr`,
      wrongs:[[B-B*p/100,`Ett vanligt fel! Höjningen räknades på det gamla priset, så du kan inte dra bort ${p} % av det nya.`],[B*(1+p/100),'Priset innan höjningen måste vara lägre.']] }); },

  u1(){ const N=pick([5000,10000,20000]), p=pick([2,3,4,5]), y=pick([3,4,5]), ans=Math.round(N*Math.pow(1+p/100,y));
    return numQ({ instr:'Avrunda till hela kronor. Du får använda miniräknare.', prompt:`Du sätter in ${numSp(N)} kr på ett sparkonto med ${p} % ränta per år. Räntan läggs till varje år. Hur mycket finns det på kontot efter ${y} år?`, answer:ans,
      hints:[`Förändringsfaktorn för en ökning med ${p} % är ${fmt(1+p/100)}. Den gäller varje år.`,`Räkna ${numSp(N)} · ${fmt(1+p/100)}${supStr(y)}.`],
      solution:`${numSp(N)} · ${fmt(1+p/100)}${supStr(y)} ≈ ${numSp(ans)} kr`,
      wrongs:[[N*(1+y*p/100),`Du räknade ${p} % av startbeloppet ${y} gånger. Med ränta på ränta räknas räntan på det nya beloppet varje år.`]] }); },
  u2(){ const p=pick([10,20,30,50]), d=p*p/100;
    return choiceQ({ instr:'Välj rätt svar.', prompt:`Ett pris höjs först med ${p} % och sänks sedan med ${p} %. Hur har priset ändrats totalt?`,
      options:[`Sänkts med ${fmt(d)} %`,'Det är oförändrat',`Höjts med ${fmt(d)} %`,`Sänkts med ${p} %`], answer:`Sänkts med ${fmt(d)} %`,
      hints:['Testa med ett pris, till exempel 100 kr. Vad blir det efter höjningen?',`100 · ${fmt(1+p/100)} = ${100+p} kr. Sänkningen räknas på ${100+p} kr: ${100+p} · ${fmt(1-p/100)} = ?`],
      solution:`${fmt(1+p/100)} · ${fmt(1-p/100)} = ${fmt(1-d/100)}. Priset har sänkts med ${fmt(d)} %.`,
      diagnose: raw => raw==='Det är oförändrat' ? 'Sänkningen räknas på det högre priset, så den blir större än höjningen.' : 'Räkna med förändringsfaktorerna och gångra dem med varandra.' }); },
  u3(){ const p=pick([2,3,4,5,10]), ans=Math.round(Math.pow(1+p/100,2)*10000)/10000;
    const f=fmt(1+p/100), sum2=fmt(1+2*p/100);
    return choiceQ({ instr:'Välj rätt förändringsfaktor.', prompt:`Ett pris ökar med ${p} % per år i två år. Vilken förändringsfaktor motsvarar det för båda åren tillsammans?`,
      options:[dec(ans), sum2, fmt(2*(1+p/100)), f], answer:dec(ans),
      hints:['Varje år gångras priset med samma faktor. Vilken?',`Räkna ${f} · ${f}.`],
      solution:`${f} · ${f} = ${dec(ans)}`,
      diagnose: raw => raw===sum2 ? `Du lade ihop procenten. Faktorerna ska gångras: ${f} · ${f}.` : `Priset gångras med ${f} två gånger: ${f} · ${f}.` }); }
};

/* ---------- MATEMATIK: PYTHAGORAS SATS OCH LIKFORMIGHET ---------- */
const TR = [[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[12,16,20],[7,24,25],[15,20,25]];
const PYT9 = {
  g1(){ const [a,b,c]=pick(TR), sides=shuffle([a,b,c]);
    return choiceQ({ instr:'Välj rätt sida.', prompt:`En rätvinklig triangel har sidorna ${andList(sides)} cm. Vilken sida är hypotenusan?`,
      options:[`${c} cm`,`${a} cm`,`${b} cm`], answer:`${c} cm`,
      hints:['Hypotenusan är sidan mitt emot den räta vinkeln.','Hypotenusan är alltid den längsta sidan.'],
      solution:`Hypotenusan är den längsta sidan, ${c} cm. De andra två sidorna kallas kateter.`,
      diagnose: () => 'Hypotenusan är alltid den längsta sidan i en rätvinklig triangel.' }); },
  g2(){ const [a,b,c]=pick(TR);
    return numQ({ instr:'Skriv svaret i cm, bara talet.', prompt:`En rätvinklig triangel har kateterna ${a} cm och ${b} cm. Hur lång är hypotenusan?`, answer:c, figure:FIG.rt(`${a} cm`,`${b} cm`,'?'),
      hints:['Pythagoras sats: a² + b² = c², där c är hypotenusan.',`${a}² + ${b}² = ${a*a} + ${b*b} = ${a*a+b*b}. Vilket tal gånger sig självt blir ${a*a+b*b}?`],
      solution:`${a}² + ${b}² = ${a*a+b*b}. √${a*a+b*b} = ${c} cm`,
      wrongs:[[a+b,'Du lade ihop sidorna. Med Pythagoras sats lägger du ihop kvadraterna: a² + b² = c².'],[a*a+b*b,'Rätt så här långt! Dra nu roten ur för att få c.']] }); },
  g3(){ const yes=Math.random()<.5, s=yes?pick(TR):pick([[4,5,6],[5,6,8],[6,7,9],[3,5,6],[5,10,12],[7,8,10]]), L=s[0]*s[0]+s[1]*s[1], R=s[2]*s[2];
    return choiceQ({ instr:'Välj rätt svar.', prompt:`En triangel har sidorna ${s[0]} cm, ${s[1]} cm och ${s[2]} cm. Är den rätvinklig?`,
      options:['Ja','Nej'], answer:yes?'Ja':'Nej',
      hints:['Om triangeln är rätvinklig gäller Pythagoras sats: de två kortaste sidorna i kvadrat ska tillsammans bli lika mycket som den längsta sidan i kvadrat.',`${s[0]}² + ${s[1]}² = ${L}, och ${s[2]}² = ${R}. Är det lika?`],
      solution: yes ? `${s[0]}² + ${s[1]}² = ${L} och ${s[2]}² = ${R}. Det är lika, så triangeln är rätvinklig.` : `${s[0]}² + ${s[1]}² = ${L}, men ${s[2]}² = ${R}. Det är inte lika, så triangeln är inte rätvinklig.`,
      diagnose: () => 'Räkna ut kvadraterna och jämför. Gäller a² + b² = c²?' }); },

  f1(){ const [a,b,c]=pick(TR);
    return numQ({ instr:'Skriv svaret i cm, bara talet.', prompt:`I en rätvinklig triangel är hypotenusan ${c} cm och ena kateten ${a} cm. Hur lång är den andra kateten?`, answer:b, figure:FIG.rt(`${a} cm`,'?',`${c} cm`),
      hints:['När du söker en katet drar du bort: b² = c² − a².',`${c}² − ${a}² = ${c*c} − ${a*a} = ${c*c-a*a}. Dra roten ur.`],
      solution:`${c}² − ${a}² = ${c*c-a*a}. √${c*c-a*a} = ${b} cm`,
      wrongs:[[c-a,`Du drog bort sidorna direkt. Dra bort kvadraterna: ${c}² − ${a}².`],[c*c-a*a,'Rätt så här långt! Dra nu roten ur.'],[Math.sqrt(c*c+a*a),'När du söker en katet ska du dra bort, inte lägga ihop.']] }); },
  f2(){ let a, b; do { a=rnd(2,12); b=rnd(2,12); } while(Number.isInteger(Math.sqrt(a*a+b*b))); const ans=Math.round(Math.sqrt(a*a+b*b)*10)/10;
    return numQ({ instr:'Avrunda till en decimal. Du får använda miniräknare.', prompt:`En rätvinklig triangel har kateterna ${a} cm och ${b} cm. Hur lång är hypotenusan?`, answer:ans, figure:FIG.rt(`${a} cm`,`${b} cm`,'?'),
      hints:['a² + b² = c²',`${a*a} + ${b*b} = ${a*a+b*b}. c = √${a*a+b*b}.`],
      solution:`c = √${a*a+b*b} ≈ ${fmt(ans)} cm`,
      wrongs:[[a+b,'Du lade ihop sidorna. Lägg ihop kvadraterna och dra sedan roten ur.'],[a*a+b*b,'Glöm inte att dra roten ur.']] }); },
  f3(){ const k=rnd(2,4), a=rnd(2,6); let b=rnd(3,9); while(b===a) b=rnd(3,9);
    return numQ({ instr:'Skriv svaret i cm, bara talet.', prompt:`Två trianglar är likformiga. I den lilla triangeln är två sidor ${a} cm och ${b} cm. I den stora triangeln är sidan som motsvarar ${a} cm lång ${a*k} cm. Hur lång är sidan som motsvarar ${b} cm?`, answer:b*k,
      hints:['Hur många gånger större är den stora triangeln?',`${a*k} / ${a} = ${k}. Alla sidor är ${k} gånger så långa.`],
      solution:`Skalan är ${a*k} / ${a} = ${k}. ${b} · ${k} = ${b*k} cm`,
      wrongs:[[b+(a*k-a),'Likformiga figurer förstoras med gånger, inte med plus.']] }); },

  u1(){ const [a,b,c]=pick([[3,4,5],[1.5,2,2.5],[2.4,3.2,4],[1.8,2.4,3],[1.2,1.6,2]]);
    return numQ({ instr:'Skriv svaret i meter, bara talet.', prompt:`En ${fmt(c)} m lång stege står lutad mot en vägg. Stegens fot står ${fmt(a)} m från väggen. Hur högt upp på väggen når stegen?`, answer:b,
      hints:['Stegen, väggen och marken bildar en rätvinklig triangel. Vilken sida är hypotenusan?',`Stegen är hypotenusan. Höjden² = ${fmt(c)}² − ${fmt(a)}².`],
      solution:`${fmt(c)}² − ${fmt(a)}² = ${fmt(c*c)} − ${fmt(a*a)} = ${fmt(b*b)}. √${fmt(b*b)} = ${fmt(b)} m`,
      wrongs:[[c-a,'Du drog bort sidorna direkt. Använd Pythagoras sats med kvadraterna.'],[Math.round(Math.sqrt(c*c+a*a)*100)/100,'Stegen är hypotenusan. När du söker en katet drar du bort.']] }); },
  u2(){ const [a,b,c]=pick(TR), it=pick(['En rektangulär surfplatta','En rektangulär tavla','En rektangulär bordsskiva']);
    return numQ({ instr:'Skriv svaret i cm, bara talet.', prompt:`${it} är ${b} cm lång och ${a} cm bred. Hur lång är diagonalen?`, answer:c,
      hints:['Diagonalen delar rektangeln i två rätvinkliga trianglar. Diagonalen är hypotenusan.',`${b}² + ${a}² = ${b*b+a*a}. Dra roten ur.`],
      solution:`${b}² + ${a}² = ${a*a+b*b}. √${a*a+b*b} = ${c} cm`,
      wrongs:[[a+b,'Diagonalen är inte summan av sidorna. Använd Pythagoras sats.'],[a*a+b*b,'Glöm inte att dra roten ur.']] }); },
  u3(){ const [h,s]=pick([[1,2],[1.5,2],[2,3],[1.5,3],[2,5],[1,4]]), S=s*rnd(3,8), ans=S*h/s;
    return numQ({ instr:'Skriv svaret i meter, bara talet.', prompt:`En flaggstång kastar en ${fmt(S)} m lång skugga. Samtidigt kastar en ${fmt(h)} m lång pinne en ${fmt(s)} m lång skugga. Hur hög är flaggstången?`, answer:ans,
      hints:['Solens strålar bildar likformiga trianglar. Hur många gånger längre är flaggstångens skugga än pinnens?',`${fmt(S)} / ${fmt(s)} = ${S/s}. Flaggstången är lika många gånger högre än pinnen.`],
      solution:`${fmt(S)} / ${fmt(s)} = ${S/s}. ${S/s} · ${fmt(h)} = ${fmt(ans)} m`,
      wrongs:[[S*s/h,'Du har ställt upp förhållandet åt fel håll. Jämför pinnens höjd och skugga med flaggstångens höjd och skugga.'],[S-s+h,'Likformighet handlar om gånger, inte om plus och minus.']] }); }
};

/* ---------- NYA OMRÅDEN I ÅRSKURS 9 ---------- */
Object.assign(CONTENT, {
  '9-matte-rotter':{
    intro:[
      'Att dra roten ur är motsatsen till att upphöja i två. 7² = 49, så √49 = 7. Tal som 4, 9, 16 och 25 kallas kvadrattal, eftersom deras rötter är heltal.',
      'Rötter ur andra tal blir decimaltal. √30 ligger mellan 5 och 6, eftersom 5² = 25 och 6² = 36.',
      'Stora och små tal skrivs i grundpotensform: ett tal mellan 1 och 10 gånger en tiopotens. 320 000 = 3,2 · 10⁵ och 0,004 = 4 · 10⁻³.'
    ],
    example:{title:'Exempel: Räkna ut (4 · 10⁵) · (5 · 10³)', steps:['Talen: 4 · 5 = 20.','Tiopotenserna: 10⁵ · 10³ = 10⁸.','20 · 10⁸ är inte grundpotensform. 20 = 2 · 10.','Svar: 2 · 10⁹.']},
    levels:[
      {name:'Grund', desc:'Kvadrater och kvadratrötter', make:()=>mix([ROT9.g1,ROT9.g2,ROT9.g3],8)},
      {name:'Fördjupning', desc:'Räkna med rötter och grundpotensform', make:()=>mix([ROT9.f1,ROT9.f2,ROT9.f3],8)},
      {name:'Utmaning', desc:'Räkna i grundpotensform och rötter i vardagen', make:()=>mix([ROT9.u1,ROT9.u2,ROT9.u3],8)}
    ]
  },
  '9-matte-forandringsfaktor':{
    intro:[
      'En förändringsfaktor är det tal du gångrar med när något ökar eller minskar i procent. Ökar priset med 15 % är det nya priset 115 % av det gamla, alltså faktorn 1,15. Minskar det med 15 % blir faktorn 0,85.',
      'När något förändras flera gånger gångrar du med faktorn en gång för varje förändring. Så räknas ränta på ränta och värdeminskning.',
      'Procentenheter och procent är inte samma sak. Om räntan går från 2 % till 3 % har den ökat med 1 procentenhet, men med 50 %.'
    ],
    example:{title:'Exempel: 5 000 kr på ett konto med 3 % ränta i 2 år', steps:['Förändringsfaktorn är 1,03.','5 000 · 1,03 · 1,03 = 5 304,5.','Svar: ungefär 5 305 kr.']},
    levels:[
      {name:'Grund', desc:'Från procent till förändringsfaktor och tillbaka', make:()=>mix([FF9.g1,FF9.g2,FF9.g3],8)},
      {name:'Fördjupning', desc:'Upprepade förändringar, procentenheter och pris före höjning', make:()=>mix([FF9.f1,FF9.f2,FF9.f3],8)},
      {name:'Utmaning', desc:'Ränta på ränta och flera förändringar efter varandra', make:()=>mix([FF9.u1,FF9.u2,FF9.u3],8)}
    ]
  },
  '9-matte-pythagoras':{
    intro:[
      'I en rätvinklig triangel kallas den längsta sidan hypotenusan. Den ligger mitt emot den räta vinkeln. De två andra sidorna kallas kateter.',
      'Pythagoras sats säger att a² + b² = c², där a och b är kateterna och c är hypotenusan. Med den kan du räkna ut en sida om du vet de två andra.',
      'Två figurer är likformiga om de har samma form men olika storlek. Då är alla sidor förstorade lika många gånger.'
    ],
    example:{title:'Exempel: Kateterna är 6 cm och 8 cm', steps:['6² + 8² = 36 + 64 = 100.','c² = 100, så c = √100 = 10.','Svar: hypotenusan är 10 cm.']},
    levels:[
      {name:'Grund', desc:'Hypotenusan och om en triangel är rätvinklig', make:()=>mix([PYT9.g1,PYT9.g2,PYT9.g3],8)},
      {name:'Fördjupning', desc:'Kateter, avrundade svar och likformighet', make:()=>mix([PYT9.f1,PYT9.f2,PYT9.f3],8)},
      {name:'Utmaning', desc:'Stegar, diagonaler och skuggor', make:()=>mix([PYT9.u1,PYT9.u2,PYT9.u3],8)}
    ]
  }
});
})();
