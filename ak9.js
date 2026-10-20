/* ==========================================================
   ELEVGUIDEN – INNEHÅLL FÖR ÅRSKURS 9
   Laddas av index.html och använder hjälpfunktionerna där.
   ========================================================== */

/* ---------- MATEMATIK: FUNKTIONER ---------- */
/* Tabell och graf som visas ovanför frågan. Färgerna följer temat, även i nattläge. */
function fnTable(k, m, xs=[0,1,2,3]){
  const c = 'border:1px solid var(--n-line);padding:6px 14px;text-align:center';
  return `<table style="border-collapse:collapse;color:var(--n-ink);font-size:1rem" aria-label="Tabell över x och y">
    <tr><th style="${c};font-weight:600">x</th>${xs.map(x => `<td style="${c}">${x}</td>`).join('')}</tr>
    <tr><th style="${c};font-weight:600">y</th>${xs.map(x => `<td style="${c}">${k*x+m}</td>`).join('')}</tr></table>`;
}
function fnGraph(k, m){
  const top = Math.max(4, Math.ceil((4*k+m)/2)*2), X = x => 40 + x*45, Y = y => 170 - y*150/top, step = top > 8 ? 2 : 1;
  let g = '';
  for (let x = 0; x <= 4; x++) g += `<line x1="${X(x)}" y1="${Y(0)}" x2="${X(x)}" y2="${Y(top)}" stroke="currentColor" stroke-opacity=".18"/><text x="${X(x)}" y="190" text-anchor="middle">${x}</text>`;
  for (let y = 0; y <= top; y += step) g += `<line x1="${X(0)}" y1="${Y(y)}" x2="${X(4)}" y2="${Y(y)}" stroke="currentColor" stroke-opacity=".18"/><text x="30" y="${Y(y)+5}" text-anchor="end">${y}</text>`;
  const pts = [0,1,2,3,4].map(x => `<circle cx="${X(x)}" cy="${Y(k*x+m)}" r="3.5" fill="currentColor"/>`).join('');
  return `<svg viewBox="0 0 270 200" role="img" aria-label="En rät linje i ett koordinatsystem. Linjen går genom punkterna ${[0,1,2,3,4].map(x => `(${x}, ${k*x+m})`).join(', ')}.">${g}<line x1="${X(0)}" y1="${Y(m)}" x2="${X(4)}" y2="${Y(4*k+m)}" stroke="currentColor" stroke-width="2.5"/>${pts}<text x="${X(4)+12}" y="${Y(0)+5}">x</text><text x="${X(0)}" y="12" text-anchor="middle">y</text></svg>`;
}
const FN = {
  g1(){ const k=rnd(2,5), m=rnd(0,6);
    return numQ({ prompt:'Tabellen visar ett samband mellan x och y. Vad är y när x = 5?', answer:5*k+m, figure:fnTable(k,m),
    hints:['Hur mycket ökar y varje gång x ökar med 1?',`y ökar med ${k} för varje steg. När x = 3 är y = ${3*k+m}. Fortsätt två steg till.`],
    solution:`y ökar med ${k} för varje steg: ${3*k+m}, ${4*k+m}, ${5*k+m}. Svar: ${5*k+m}`,
    wrongs:[[4*k+m,'Det där är y när x = 4. Fortsätt ett steg till.']] }); },
  g2(){ const k=rnd(2,6), x=rnd(1,6); let m=rnd(-5,8); if (m===0) m=3;
    const eq = m < 0 ? `y = ${k}x − ${-m}` : `y = ${k}x + ${m}`;
    return numQ({ prompt:`Funktionen är ${eq}. Vad är y när x = ${x}?`, answer:k*x+m,
    hints:['Byt ut x mot talet och räkna. Gånger räknas före plus och minus.',`${k} · ${x} = ${k*x}.`],
    solution:`${k} · ${x} ${m < 0 ? '−' : '+'} ${Math.abs(m)} = ${k*x+m}`,
    wrongs:[[k+x+m,`${k}x betyder ${k} gånger x, inte ${k} plus x.`]] }); },
  g3(){ const k=pick([1,2]), m=rnd(0,3), x=rnd(1,4);
    return numQ({ prompt:`Grafen visar en rät linje. Vad är y när x = ${x}?`, answer:k*x+m, figure:fnGraph(k,m),
    hints:[`Leta upp x = ${x} på den vågräta axeln.`,'Gå rakt upp till linjen och sedan rakt åt vänster till den lodräta axeln.'],
    solution:`När x = ${x} är y = ${k*x+m}.`,
    wrongs:[[x,'Det där är x-värdet. Läs av y-värdet på den lodräta axeln.']] }); },

  f1(){ const k=rnd(2,6); let m=rnd(1,8); if (m===k) m++;
    return numQ({ prompt:'Tabellen visar ett linjärt samband. Hur mycket ökar y när x ökar med 1?', answer:k, figure:fnTable(k,m),
    hints:['Jämför två y-värden som står bredvid varandra.',`Räkna ${m+k} − ${m}.`],
    solution:`${m+k} − ${m} = ${k}. Lutningen är ${k}.`,
    wrongs:[[m,'Det där är y när x = 0. Titta på hur mycket y ändras för varje steg.']] }); },
  f2(){ const k=pick([1,2]), m=rnd(1,3);
    return numQ({ prompt:'Grafen visar en rät linje. I vilken punkt skär linjen y-axeln? Svara med y-värdet.', answer:m, figure:fnGraph(k,m),
    hints:['y-axeln är den lodräta axeln, där x = 0.','Följ linjen till vänster tills den når y-axeln.'],
    solution:`När x = 0 är y = ${m}. Linjen skär y-axeln i ${m}.`,
    wrongs:[[k,'Det där är lutningen, alltså hur mycket y ökar per steg. Var börjar linjen när x = 0?']] }); },
  f3(){ const k=rnd(2,5); let m=rnd(1,7); while (m===k) m=rnd(1,7);
    const ok=`y = ${k}x + ${m}`;
    return choiceQ({ instr:'Välj den formel som passar tabellen.', prompt:'Vilken formel beskriver sambandet i tabellen?', figure:fnTable(k,m), options:[ok,`y = ${m}x + ${k}`,`y = x + ${m}`], answer:ok,
    hints:['Lutningen k är hur mycket y ökar per steg. m är y-värdet när x = 0.',`Här ökar y med ${k} per steg, och när x = 0 är y = ${m}.`],
    solution:`k = ${k} och m = ${m}, så formeln är ${ok}.`,
    diagnose: () => 'Kontrollera: k är ökningen per steg och m är y när x = 0.' }); },

  u1(){ const f=pick([79,99,149]), p=pick([2,3,5]), ok=`y = ${p}x + ${f}`;
    return choiceQ({ instr:'Välj den formel som stämmer.', prompt:`Ett abonnemang kostar ${f} kr i månaden plus ${p} kr per samtalsminut. Vilken formel beskriver kostnaden y kr för x minuter?`, options:[ok,`y = ${f}x + ${p}`,`y = ${f+p}x`], answer:ok,
    hints:['Vilken del av kostnaden ändras med antalet minuter, och vilken del är fast?','Det som beror på x står framför x. Det fasta beloppet läggs till.'],
    solution:`Varje minut kostar ${p} kr, alltså ${p}x. Den fasta avgiften är ${f} kr. Formeln är ${ok}.`,
    diagnose: () => 'Det som betalas per minut ska gångas med x. Den fasta avgiften läggs till.' }); },
  u2(){ const f=pick([79,99,149]), p=pick([2,3,5]), x=rnd(10,60), y=p*x+f;
    return numQ({ prompt:`Ett abonnemang kostar ${f} kr i månaden plus ${p} kr per minut, alltså y = ${p}x + ${f}. En månad blev kostnaden ${y} kr. Hur många minuter ringde man?`, answer:x,
    hints:['Sätt in kostnaden som y och lös ekvationen.',`${y} = ${p}x + ${f}. Dra först bort ${f}.`],
    solution:`${p}x + ${f} = ${y}. ${p}x = ${y-f}. x = ${x} minuter`,
    wrongs:[[y/p,'Du glömde den fasta avgiften. Dra bort den först.'],[y-f,`Bra start! ${p}x = ${y-f}. Dela nu med ${p}.`]] }); },
  u3(){ const a=pick([2,3]), f=pick([40,60,80]), x=f/(a-1);
    return numQ({ prompt:`Abonnemang A kostar ${a} kr per minut och har ingen fast avgift. Abonnemang B kostar ${f} kr i månaden plus 1 kr per minut. Efter hur många minuter kostar de lika mycket?`, answer:x,
    hints:[`Skriv en formel för varje abonnemang. A: y = ${a}x. B: y = x + ${f}.`,`Sätt dem lika: ${a}x = x + ${f}. Lös ekvationen.`],
    solution:`${a}x = x + ${f}. ${cx(a-1)} = ${f}. x = ${x} minuter`,
    wrongs:[[f,'Det där är den fasta avgiften. Sätt formlerna lika och lös ekvationen.']] }); }
};

/* ---------- MATEMATIK: PROBLEMLÖSNING ---------- */
const pad2 = n => String(n).padStart(2,'0');
const fmtBig = n => n.toLocaleString('sv-SE');
const PL = {
  g1(){ const v=pick([60,80,90,120]), t=pick([1.5,2,2.5,3]);
    return numQ({ instr:'Skriv svaret i kilometer, bara talet.', prompt:`Ett tåg kör med medelhastigheten ${v} km/h. Hur långt kommer tåget på ${fmt(t)} timmar?`, answer:v*t,
    hints:['Hastigheten säger hur långt tåget kommer på en timme.',`Gånga hastigheten med tiden: ${v} · ${fmt(t)}.`],
    solution:`${v} · ${fmt(t)} = ${fmt(v*t)} km`,
    wrongs:[[v/t,'Du delade. Sträckan är hastighet gånger tid.'],[v+t,'Du lade ihop. Sträckan är hastighet gånger tid.']] }); },
  g2(){ const ks=shuffle([30,36,40,44,48,52,56]).slice(0,3), best=['A','B','C'][ks.indexOf(Math.min(...ks))];
    const opts=[`Förpackning A: 500 g för ${ks[0]/2} kr`,`Förpackning B: 1 kg för ${ks[1]} kr`,`Förpackning C: 2 kg för ${2*ks[2]} kr`];
    return choiceQ({ instr:'Välj den förpackning som är billigast per kilo.', prompt:'Vilken förpackning ris är billigast per kilo?', options:opts, answer:opts['ABC'.indexOf(best)],
    hints:['Räkna ut vad ett kilo kostar i varje förpackning.','500 g är ett halvt kilo, så gånga priset med 2. 2 kg är två kilo, så dela priset med 2.'],
    solution:`Kilopris: A ${ks[0]} kr, B ${ks[1]} kr och C ${ks[2]} kr. Billigast per kilo är förpackning ${best}.`,
    diagnose: () => 'Jämför priset per kilo, inte priset för hela förpackningen.' }); },
  g3(){ const q=pick([200,300,400,600]), n=pick([2,6,8,10]);
    return numQ({ instr:'Skriv svaret i gram, bara talet.', prompt:`Ett recept för 4 personer behöver ${q} g pasta. Hur många gram behövs för ${n} personer?`, answer:q/4*n,
    hints:['Hur mycket pasta behövs för en person?',`${q} / 4 = ${q/4} g per person. Gånga med ${n}.`],
    solution:`${q} / 4 = ${q/4} g per person. ${q/4} · ${n} = ${q/4*n} g`,
    wrongs:[[q+(n-4),'Du lade till skillnaden i antal personer. Räkna först ut hur mycket som behövs per person.'],[q*n,'Receptet är för 4 personer, inte för en. Dela först med 4.']] }); },

  f1(){ const sM=rnd(30,50), dur=rnd(Math.max(20,61-sM),45), end=7*60+sM+dur, eh=Math.floor(end/60), em=end%60;
    return numQ({ instr:'Skriv svaret i minuter, bara talet.', prompt:`Ella går hemifrån klockan 07.${pad2(sM)} och är framme i skolan klockan ${pad2(eh)}.${pad2(em)}. Hur många minuter tar promenaden?`, answer:dur,
    hints:['Räkna först minuterna fram till nästa hela timme.',`Från 07.${pad2(sM)} till 08.00 är det ${60-sM} minuter. Hur många minuter är det sedan fram till ${pad2(eh)}.${pad2(em)}?`],
    solution:`${60-sM} minuter fram till 08.00 och ${em} minuter till. ${60-sM} + ${em} = ${dur} minuter`,
    wrongs:[[(eh*100+em)-(700+sM),'Det går 60 minuter på en timme, inte 100. Räkna minuterna fram till hel timme först.']] }); },
  f2(){ const P=pick([500,800,1000,1200,2000]), p=pick([10,20,25]), up=P*(1+p/100), ans=up*(1-p/100);
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`En jacka kostar ${fmtBig(P)} kr. Priset höjs först med ${p} % och sänks sedan med ${p} %. Vad kostar jackan nu?`, answer:ans,
    hints:['Räkna ett steg i taget. Vad kostar jackan efter höjningen?',`Efter höjningen kostar den ${fmt(up)} kr. Sänk nu det priset med ${p} %.`],
    solution:`${P} · ${fmt(1+p/100)} = ${fmt(up)} kr. ${fmt(up)} · ${fmt(1-p/100)} = ${fmt(ans)} kr`,
    wrongs:[[P,'Många tror att priset blir som förut. Men sänkningen räknas på det högre priset, så den blir större än höjningen.']] }); },
  f3(){ const sc=pick([10000,25000,50000,100000]), d=rnd(2,9), ans=d*sc/100000;
    return numQ({ instr:'Skriv svaret i kilometer, bara talet.', prompt:`På en karta i skala 1:${fmtBig(sc)} är avståndet mellan två platser ${d} cm. Hur långt är det i verkligheten?`, answer:ans,
    hints:[`Skalan betyder att 1 cm på kartan är ${fmtBig(sc)} cm i verkligheten.`,`Räkna ${d} · ${fmtBig(sc)} cm. En kilometer är 100 000 cm.`],
    solution:`${d} · ${fmtBig(sc)} = ${fmtBig(d*sc)} cm = ${fmt(ans)} km`,
    wrongs:[[d*sc,'Det där är avståndet i centimeter. En kilometer är 100 000 cm.'],[d*sc/100,'Det där är avståndet i meter. En kilometer är 1 000 m.']] }); },

  u1(){ const a=pick([10,12,15]), b=pick([6,8,10]), per=pick([20,25]), price=pick([79,89,99]), A=a*b, packs=Math.ceil(A/per);
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`En gräsmatta är ${a} m lång och ${b} m bred. Ett paket gräsfrö räcker till ${per} m² och kostar ${price} kr. Vad kostar det att så hela gräsmattan?`, answer:packs*price,
    hints:['Räkna först ut gräsmattans area.',`Arean är ${A} m². Hur många paket behövs? Du kan bara köpa hela paket.`],
    solution:`${a} · ${b} = ${A} m². ${A} / ${per} = ${fmt(A/per)}, alltså ${packs} paket. ${packs} · ${price} = ${packs*price} kr`,
    wrongs:[[A/per*price,'Du kan inte köpa en del av ett paket. Avrunda antalet paket uppåt.'],[A*price,`Du räknade som om ett paket räcker till 1 m². Ett paket räcker till ${per} m².`]] }); },
  u2(){ const T=4*rnd(20,40), pizza=3*T/4;
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`En pizza och en läsk kostar tillsammans ${T} kr. Pizzan kostar tre gånger så mycket som läsken. Vad kostar pizzan?`, answer:pizza,
    hints:['Låt läsken kosta x kr. Vad kostar då pizzan?',`Pizzan kostar 3x. x + 3x = ${T}, alltså 4x = ${T}.`],
    solution:`x + 3x = ${T}. 4x = ${T}. x = ${T/4}. Pizzan kostar 3 · ${T/4} = ${pizza} kr`,
    wrongs:[[T/4,'Det där är vad läsken kostar. Pizzan kostar tre gånger så mycket.'],[T/3,'Pizzan och läsken är tillsammans fyra delar, inte tre.']] }); },
  u3(){ const s=pick([100,150,200,250]), w=rnd(6,16), have=pick([200,400,600]), goal=have+s*w;
    return numQ({ instr:'Skriv svaret i veckor, bara talet.', prompt:`Sam vill köpa en cykel som kostar ${fmtBig(goal)} kr. Han har redan ${have} kr och sparar ${s} kr i veckan. Hur många veckor tar det innan han har råd?`, answer:w,
    hints:['Hur mycket pengar saknas?',`Det saknas ${fmtBig(goal-have)} kr. Hur många veckor tar det att spara det?`],
    solution:`${fmtBig(goal)} − ${have} = ${fmtBig(goal-have)} kr. ${fmtBig(goal-have)} / ${s} = ${w} veckor`,
    wrongs:[[goal/s,'Glöm inte de pengar han redan har. Räkna först ut hur mycket som saknas.']] }); }
};

/* ---------- MATEMATIK: SANNOLIKHET ---------- */
const SA_INSTR = 'Skriv svaret som ett bråk, till exempel 1/4, eller som ett decimaltal.';
const pctWrong = p => [p*100, 'Rätt tänkt! Skriv svaret som bråk eller decimaltal, inte i procent.'];
function bag(){ const r=rnd(1,6), b=rnd(1,6), g=rnd(1,6); return {r, b, g, t:r+b+g}; }
const SA = {
  g1(){ const [ev,k]=pick([['en sexa',1],['en etta',1],['ett jämnt tal',3],['ett udda tal',3],['mer än 4',2],['högst 2',2],['minst 3',4]]);
    return numQ({ instr:SA_INSTR, prompt:`Du kastar en vanlig tärning. Hur stor är sannolikheten att du får ${ev}?`, answer:k/6,
    hints:['Hur många olika utfall finns det på en tärning?',`Hur många av de sex utfallen räknas som ${ev}?`],
    solution:`Det finns 6 möjliga utfall och ${k} av dem är gynnsamma. Sannolikheten är ${k}/6${simp(k,6)}.`,
    wrongs:[[k,'Det där är antalet gynnsamma utfall. Dela med antalet möjliga utfall, 6.'], pctWrong(k/6)] }); },
  g2(){ const B=bag(), [pl,sg,n]=pick([['röda','röd',B.r],['blå','blå',B.b],['gröna','grön',B.g]]);
    return numQ({ instr:SA_INSTR, prompt:`I en påse ligger ${B.r} röda, ${B.b} blå och ${B.g} gröna kulor. Du tar en kula utan att titta. Hur stor är sannolikheten att den är ${sg}?`, answer:n/B.t,
    hints:['Hur många kulor finns det sammanlagt i påsen?',`Det finns ${n} ${pl} kulor av ${B.t}. Hur skriver du det som ett bråk?`],
    solution:`${n} av ${B.t} kulor är ${pl}. Sannolikheten är ${n}/${B.t}${simp(n,B.t)}.`,
    wrongs:[[n,`Det där är antalet ${pl} kulor. Dela med alla kulor, ${B.t}.`],[n/(B.t-n),`Du jämförde med de andra kulorna. Dela med alla kulor, ${B.t}.`], pctWrong(n/B.t)] }); },
  g3(){ const f=pick([4,5,8,10]), k=rnd(1,f-1);
    return numQ({ instr:SA_INSTR, prompt:`Ett lyckohjul är delat i ${f} lika stora fält. ${k} av fälten är vinstfält. Hur stor är sannolikheten att hjulet stannar på ett vinstfält?`, answer:k/f,
    hints:['Hur många fält finns det sammanlagt?',`${k} av ${f} fält ger vinst. Hur skriver du det som ett bråk?`],
    solution:`${k} av ${f} fält är vinstfält. Sannolikheten är ${k}/${f}${simp(k,f)}.`,
    wrongs:[[k,'Det där är antalet vinstfält. Dela med antalet fält.'],[k/(f-k),`Du jämförde vinstfälten med de andra fälten. Dela med alla fält, ${f}.`], pctWrong(k/f)] }); },

  f1(){ const B=bag(), n=B.t-B.r;
    return numQ({ instr:SA_INSTR, prompt:`I en påse ligger ${B.r} röda, ${B.b} blå och ${B.g} gröna kulor. Du tar en kula utan att titta. Hur stor är sannolikheten att den inte är röd?`, answer:n/B.t,
    hints:['Hur många kulor är inte röda?',`${n} av ${B.t} kulor är inte röda. Du kan också räkna 1 minus sannolikheten för röd.`],
    solution:`${n} av ${B.t} kulor är inte röda. Sannolikheten är ${n}/${B.t}${simp(n,B.t)}.`,
    wrongs:[[B.r/B.t,'Det där är sannolikheten att kulan är röd. Hur stor är chansen att den inte är det?'],[n,`Det där är antalet kulor som inte är röda. Dela med alla kulor, ${B.t}.`], pctWrong(n/B.t)] }); },
  f2(){ const p=pick([10,20,30,40,60,70,80]);
    return numQ({ instr:'Skriv svaret i decimalform, till exempel 0,4.', prompt:`Sannolikheten att det regnar i morgon är ${p} %. Hur stor är sannolikheten att det inte regnar?`, answer:(100-p)/100,
    hints:['Det regnar eller det regnar inte. Tillsammans blir det 100 %.',`100 % − ${p} % = ${100-p} %. Hur skriver du det i decimalform?`],
    solution:`100 % − ${p} % = ${100-p} % = ${fmt((100-p)/100)}`,
    wrongs:[[100-p,'Rätt tänkt! Skriv svaret i decimalform genom att dela med 100.'],[p/100,'Det där är sannolikheten att det regnar.']] }); },
  f3(){ const [txt,ans,calc,s]=pick([
      ['Du singlar slant två gånger. Hur stor är sannolikheten att du får krona båda gångerna?',1/4,'1/2 · 1/2 = 1/4',1],
      ['Du kastar två tärningar. Hur stor är sannolikheten att båda visar en sexa?',1/36,'1/6 · 1/6 = 1/36',1/3],
      ['Du singlar slant och kastar en tärning. Hur stor är sannolikheten att du får krona och en sexa?',1/12,'1/2 · 1/6 = 1/12',2/3],
      ['Du singlar slant tre gånger. Hur stor är sannolikheten att du får krona alla tre gångerna?',1/8,'1/2 · 1/2 · 1/2 = 1/8',3/2]]);
    return numQ({ instr:SA_INSTR, prompt:txt, answer:ans,
    hints:['Räkna ut sannolikheten för varje händelse för sig.','När flera saker ska hända gångrar du sannolikheterna med varandra.'],
    solution:calc,
    wrongs:[[s,'Du lade ihop sannolikheterna. När alla ska hända gångrar du dem.']] }); },

  u1(){ const r=rnd(2,5), b=rnd(2,5), t=r+b;
    return numQ({ instr:'Skriv svaret som ett bråk, till exempel 3/10.', prompt:`I en påse ligger ${r} röda och ${b} blå kulor. Du tar två kulor, en i taget, och lägger inte tillbaka den första. Hur stor är sannolikheten att båda är röda?`, answer:r/t*(r-1)/(t-1),
    hints:['Hur stor är chansen att den första kulan är röd?',`Om den första var röd finns det ${r-1} röda kvar av ${t-1} kulor. Gångra sannolikheterna.`],
    solution:`${r}/${t} · ${r-1}/${t-1} = ${r*(r-1)}/${t*(t-1)}${simp(r*(r-1),t*(t-1))}`,
    wrongs:[[(r/t)*(r/t),'Du räknade som om kulan läggs tillbaka. Efter första dragningen finns det en röd kula färre och en kula färre totalt.']] }); },
  u2(){ const N=6*pick([10,20,50,100]), [ev,p]=pick([['en sexa',1/6],['ett jämnt tal',1/2],['en etta eller en tvåa',1/3]]);
    return numQ({ prompt:`Du kastar en tärning ${N} gånger. Ungefär hur många gånger kan du räkna med att få ${ev}?`, answer:N*p,
    hints:[`Hur stor är sannolikheten att få ${ev} i ett kast?`,`Gånga sannolikheten med antalet kast, ${N}.`],
    solution:`Sannolikheten är ${fracStr(Math.round(p*6),6)}. ${N} · ${fracStr(Math.round(p*6),6)} = ${N*p}`,
    wrongs:[[p,'Det där är sannolikheten för ett kast. Gånga den med antalet kast.']] }); },
  u3(){ const r=rnd(2,5), b=rnd(2,5), t=r+b;
    return numQ({ instr:'Skriv svaret som ett bråk, till exempel 4/25.', prompt:`I en påse ligger ${r} röda och ${b} blå kulor. Du tar en kula, tittar på färgen och lägger tillbaka den. Sedan tar du en kula till. Hur stor är sannolikheten att båda är röda?`, answer:(r/t)*(r/t),
    hints:['Kulan läggs tillbaka. Är chansen lika stor andra gången som första?',`Båda gångerna är chansen ${r}/${t}. Gångra sannolikheterna.`],
    solution:`${r}/${t} · ${r}/${t} = ${r*r}/${t*t}${simp(r*r,t*t)}`,
    wrongs:[[r/t*(r-1)/(t-1),'Kulan läggs tillbaka, så andra gången är det lika många kulor som första gången.'],[2*r/t,'Du lade ihop. När båda ska hända gångrar du sannolikheterna.']] }); }
};

/* ---------- ENGELSKA: AVANCERAD GRAMMATIK ---------- */
const COMP_H = 'Jämför meningen två saker (than) eller säger den vad som är mest av alla (the)? Är adjektivet kort eller långt?';
const EN9_GRUND = [
  ['This test is ___ than the last one.','easier','more easy','easyer',COMP_H,'comp_short'],
  ['Elephants are ___ than horses.','bigger','more big','biger',COMP_H,'comp_short'],
  ['This is the ___ film I have ever seen.','best','goodest','most good',COMP_H,'comp_irr'],
  ['Maths is ___ than history for me.','more difficult','difficulter','most difficult',COMP_H,'comp_long'],
  ['She is the ___ person in our class.','tallest','most tall','taller',COMP_H,'comp_short'],
  ['Today the weather is ___ than yesterday.','worse','badder','more bad',COMP_H,'comp_irr'],
  ['My phone is ___ than yours.','newer','more new','newest',COMP_H,'comp_short'],
  ['It was the ___ day of the year.','hottest','hotest','most hot',COMP_H,'comp_short'],
  ['This book is ___ than the first one.','more interesting','interestinger','most interesting',COMP_H,'comp_long'],
  ['He is the ___ player in the team.','most famous','famousest','more famous',COMP_H,'comp_long']
];
const EN9_FORD = [
  ['If it rains tomorrow, we ___ at home.','will stay','would stay','stayed','Titta på if-satsen. Står ”rains” i presens eller preteritum?','cond1'],
  ['If I ___ a million kronor, I would buy a house.','had','have','will have','Titta på den andra delen. Står det will eller would där?','cond2'],
  ['If you heat ice, it ___ into water.','turns','would turn','turned','Är det här något som alltid händer, ett faktum?','cond0'],
  ['If she studies hard, she ___ the test.','will pass','would pass','passed','Titta på if-satsen. Står ”studies” i presens eller preteritum?','cond1'],
  ['If I were you, I ___ talk to the teacher.','would','will','am','If I were you är något tänkt. Vilket ord passar då i den andra delen?','cond2'],
  ['If we ___ the bus, we will be late.','miss','will miss','missed','Titta på den andra delen. Står det will eller would där?','cond1'],
  ['If he had more time, he ___ more books.','would read','will read','reads','Titta på if-satsen. Står ”had” i presens eller preteritum?','cond2'],
  ['I would travel around the world if I ___ rich.','were','am','will be','Titta på den första delen. Står det will eller would där?','cond2'],
  ['If you mix blue and yellow, you ___ green.','get','would get','got','Är det här något som alltid gäller?','cond0'],
  ["If you don't hurry, you ___ the bus.",'will miss','would miss','missed','Titta på if-satsen. Står den i presens eller preteritum?','cond1']
];
const EN9_UTM = [
  ['The window ___ by the wind last night.','was broken','broke','is broken','Fönstret gjorde inget själv. Och vilket ord visar när det hände?','pass'],
  ['English ___ in many countries.','is spoken','speaks','is speaking','Engelskan talar inte själv. Någon talar den. Vilken form visar det?','pass'],
  ['The letters ___ every morning.','are delivered','deliver','delivered','Breven delar inte ut sig själva. Händer det ofta eller hände det en gång?','pass'],
  ['The new school ___ next year.','will be built','will build','is built','Skolan bygger inte sig själv. Vilket ord visar när det ska hända?','pass'],
  ['This cake ___ by my grandmother.','was made','made','is making','Kakan har inte bakat sig själv. Någon har gjort den. Vilken form visar det?','pass'],
  ['The match ___ because of the rain.','was cancelled','cancelled','has cancel','Matchen ställde inte in sig själv. Vilken form visar det?','pass'],
  ['Phones ___ in the classroom.','are not allowed',"don't allow",'not allowed','Mobilerna tillåter inte något själva. Vilken form av be behövs?','pass'],
  ['The thief ___ by the police yesterday.','was caught','caught','is caught','Tjuven gjorde inget själv. Vilket ord visar när det hände?','pass'],
  ['Many new words ___ to the dictionary every year.','are added','add','added','Orden lägger inte till sig själva. Händer det ofta eller hände det en gång?','pass'],
  ['The bridge ___ in 1890.','was built','built','is built','Bron byggde inte sig själv. Och när hände det?','pass']
];

/* ---------- ENGELSKA: ARGUMENTERA PÅ ENGELSKA ---------- */
const EAQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som passar bäst.', prompt, lang:'en', options, answer:options[0], hints, solution,
  diagnose: () => hints[1] });
const EA_GRUND = [
  ['Which sentence is a clear opinion?',['Schools should start later in the morning.','Some schools start at eight.','What time does your school start?'],['En åsikt säger vad någon tycker att det borde vara.','Leta efter ett ord som should.'],'”Schools should start later” är en tydlig åsikt.'],
  ['Which phrase can you use to give your opinion?',['In my opinion,','Once upon a time,','The end,'],['Vilken fras visar vad du tycker?','Opinion betyder åsikt.'],'In my opinion betyder enligt min åsikt.'],
  ['Which linking word introduces your first argument?',['Firstly,','Finally,','However,'],['Vilket ord betyder för det första?','First betyder först.'],'Firstly inleder det första argumentet.'],
  ['Which word shows a contrast?',['However','Moreover','Firstly'],['Vilket ord betyder däremot eller men?','En kontrast visar något som går åt motsatt håll.'],'However visar en kontrast, ungefär som däremot.'],
  ['Which word adds another argument?',['Furthermore','However','Although'],['Vilket ord betyder dessutom?','Furthermore lägger till något.'],'Furthermore betyder dessutom och lägger till ett nytt argument.'],
  ['Which sentence gives a reason?',['Students learn better because they are less tired.','Students are students.','I like school.'],['Ett skäl förklarar varför.','Leta efter ordet because.'],'Meningen med because ger ett skäl.'],
  ['What is a counterargument?',['An argument against your opinion','Your best argument','A summary of your text'],['Counter betyder mot.','Det är ett argument som någon som inte håller med kan använda.'],'Ett motargument är ett argument mot din åsikt.'],
  ['Which phrase is good for the conclusion?',['To sum up,','First of all,','For example,'],['Avslutningen sammanfattar texten.','Sum up betyder sammanfatta.'],'To sum up passar i början av avslutningen.']
];
const EA_FORD = [
  ['Which argument is the most convincing?',['Teenagers need more sleep, and a later start would help them concentrate.','Everybody knows that school starts too early.','I hate getting up.'],['Ett starkt argument ger ett skäl som gäller fler än bara skribenten.','Vilket argument förklarar varför, utan att överdriva?'],'Det första argumentet förklarar varför och gäller många elever.'],
  ['Choose the best phrase: “Phones can distract students. ___, they can be useful for research.”',['On the other hand','Therefore','For example'],['Den andra meningen säger något positivt efter något negativt.','On the other hand betyder å andra sidan.'],'On the other hand visar den andra sidan av saken.'],
  ['Choose the best word: “Fast food is often cheap. ___, it is not very healthy.”',['However','Because','Firstly'],['Den andra meningen säger något som går emot den första.','However betyder däremot.'],'However visar kontrasten mellan billigt och inte nyttigt.'],
  ['Which sentence answers a counterargument well?',['Some people say uniforms are boring, but they make everyone feel equal.','Uniforms are good. That is all.','People who dislike uniforms are wrong.'],['Ett bra bemötande tar motargumentet på allvar och svarar med ett skäl.','Leta efter Some people say … but …'],'Den första meningen erkänner motargumentet och svarar med ett skäl.'],
  ['Which sentence sounds the most formal?',['I believe that this would benefit all students.','This is like super good for everyone.','Gonna be great, trust me.'],['Formell engelska undviker slang.','Like, super och gonna är vardagliga ord.'],'Den första meningen är formell och passar i en argumenterande text.'],
  ['Which phrase gives an example?',['For instance,','In conclusion,','Nevertheless,'],['Vilken fras betyder till exempel?','Instance betyder fall eller exempel.'],'For instance betyder till exempel.'],
  ['Which sentence is correct?',['I think that we should have more breaks.','I am think that we should have more breaks.','I thinking that we should have more breaks.'],['Hur säger man jag tycker på engelska?','Think används utan am framför i den här meningen.'],'I think that we should have more breaks.']
];
const EA_UTM = [
  ['What is the best structure for an argumentative text?',['Introduction with your opinion, arguments, a counterargument and a conclusion','A conclusion, then a story, then your opinion','Only arguments, without an opinion'],['Vad kommer först, i mitten och sist?','Åsikten kommer i början och upprepas i slutet.'],'Inledning med åsikt, argument, motargument och avslutning.'],
  ['Which conclusion is the strongest?',['To sum up, a later start would give us healthier students and better results.','That was my text.','I am not sure what I think.'],['En stark avslutning upprepar åsikten och visar varför den är viktig.','Vilken mening sammanfattar och övertygar?'],'Den första avslutningen sammanfattar åsikten och visar vad som vinns.'],
  ['Which sentence uses “although” correctly?',['Although homework can be useful, too much of it causes stress.','Although homework. It is useful.','Homework although is useful too much.'],['Although betyder fastän.','Although inleder en bisats som följs av en huvudsats.'],'Although homework can be useful, too much of it causes stress.'],
  ['Which is NOT a good way to make your argument stronger?',['Insulting people who disagree','Using facts and examples','Explaining why your reason matters'],['Vad gör en text mindre trovärdig?','Personangrepp får skribenten att verka osaklig.'],'Att förolämpa den som tycker annorlunda gör texten svagare.']
];

/* ---------- ENGELSKA: LÄSA LÄNGRE TEXTER ---------- */
const CYKEL = {
  title:'The Letter in the Basket', lang:'en',
  paras:[
    'Omar bought the bike for two hundred kronor at a flea market. It was old and heavy, painted dark green, with a basket on the front that rattled every time he hit a bump. His friends laughed when they saw it. “Did you steal it from a museum?” asked Jonas.',
    'Omar did not care. The bike worked, and it was his. But one afternoon, when he was cleaning it, he found something stuck under the bottom of the basket: a small envelope, yellow with age. On the front, someone had written in careful handwriting: To the next person who rides this bike.',
    'Inside was a letter. “Dear stranger,” it began. “This bike has taken me to the best places in my life. To the lake where I learned to swim. To the library, where I met my husband. To the hill behind the church, where you can see the whole town at sunset. I am too old to ride now, but I hope the bike will take you to good places too. Best wishes, Greta.”',
    'Omar read the letter three times. That weekend, he cycled to the lake. It was cold, and the water was grey, but he sat on the jetty for a long time and imagined a young girl learning to swim there. The next day he found the hill behind the church. Greta had been right: at sunset, the whole town glowed orange.',
    'He told the woman at the flea market about the letter. She remembered the bike. “It came from Greta Lund,” she said. “She lives at the care home on Mill Street now.”',
    'Omar was nervous when he knocked on Greta’s door. She was small and thin, with sharp blue eyes. When he showed her the letter, she put her hand over her mouth. “I never thought anyone would find it,” she whispered.',
    'They talked for two hours. Greta told him about the town as it had been sixty years ago, and Omar showed her photos of the sunset from the hill. Before he left, she asked him a question. “Will you come back and tell me where the bike takes you next?”',
    'Omar promised. And on the way home, the old basket rattled as usual, but this time it did not bother him at all.'
  ]
};
const LTQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som stämmer bäst med texten.', prompt, lang:'en', options, answer:options[0], hints, solution,
  diagnose: () => `Det svaret får inte stöd i texten. ${hints[0]}` });
const LT_GRUND = [
  ['How much did Omar pay for the bike?',['Two hundred kronor','Two thousand kronor','Twenty kronor'],['Läs första meningen.','Two hundred betyder tvåhundra.'],'Han betalade tvåhundra kronor.'],
  ['Where did Omar find the envelope?',['Under the bottom of the basket','Inside the bike bell','Inside a tyre'],['Läs andra stycket.','Leta efter ordet basket.'],'Kuvertet satt fast under botten på korgen.'],
  ['Where did Greta meet her husband?',['At the library','At the lake','On the hill'],['Läs Gretas brev i tredje stycket.','Leta efter ordet husband.'],'Hon träffade sin man på biblioteket.'],
  ['What can you see from the hill behind the church at sunset?',['The whole town','The lake','The flea market'],['Läs Gretas brev igen.','Leta efter ordet sunset.'],'Från kullen kan man se hela staden i solnedgången.'],
  ['Where does Greta live now?',['At a care home on Mill Street','Next to the lake','With Omar’s family'],['Läs femte stycket.','Kvinnan på loppmarknaden berättar var Greta bor.'],'Greta bor på ett boende för äldre på Mill Street.'],
  ['How long did Omar and Greta talk?',['For two hours','For ten minutes','All day'],['Läs sjunde stycket.','Leta efter ett tidsuttryck i början av stycket.'],'De pratade i två timmar.']
];
const LT_FORD = [
  ['Why did Omar’s friends laugh at the bike?',['It was very old and looked old-fashioned','It was too small for him','It was pink'],['Läs första stycket. Hur beskrivs cykeln?','Jonas skämtar om att den kommer från ett museum.'],'Cykeln var gammal och såg omodern ut.'],
  ['What does it tell us about Omar that he read the letter three times?',['The letter made a strong impression on him','He did not understand English','He was bored'],['Varför läser man något flera gånger?','Fundera på vad brevet betydde för Omar.'],'Att han läste brevet tre gånger visar att det gjorde starkt intryck på honom.'],
  ['Why did Greta put her hand over her mouth?',['She was surprised and moved','She was angry','She had a cold'],['Vad säger Greta direkt efteråt?','Hon trodde aldrig att någon skulle hitta brevet.'],'Greta blev överraskad och rörd.'],
  ['What does “whispered” mean in the text?',['Said very quietly','Shouted','Laughed'],['Läs meningen där ordet står.','Hur säger man något när man är rörd?'],'Whispered betyder viskade, alltså sa mycket tyst.'],
  ['Why was Omar nervous before meeting Greta?',['He was going to meet a stranger','He was late','He had broken the bike'],['Kände Omar Greta innan?','Det kan kännas pirrigt att knacka på hos någon man inte känner.'],'Han skulle träffa en person han inte kände.'],
  ['What does Greta’s question at the end show?',['That she wants to stay in contact with Omar','That she wants the bike back','That she is angry with him'],['Vad ber Greta Omar att göra?','Hon vill att han ska komma tillbaka.'],'Frågan visar att Greta vill fortsätta träffa Omar.']
];
const LT_UTM = [
  ['What is the main theme of the story?',['Connection between young and old people','Winning a race','Living in a big city'],['Ett tema är vad texten handlar om på djupet.','Vilka två personer möts i berättelsen?'],'Temat är kontakten mellan unga och gamla människor.'],
  ['How does Omar’s attitude to the rattling basket change?',['At first it is annoying, but at the end it does not bother him','It is always annoying','He removes the basket'],['Jämför början och slutet av berättelsen.','Vad betyder korgen för honom nu?'],'Först stör korgen honom, men till slut gör den inte det, eftersom cykeln har fått en ny betydelse.'],
  ['Why do you think the writer included the friends’ laughter at the beginning?',['To show that Omar sees value in something others do not','To show that Omar has many friends','To make the story funnier'],['Hur reagerar Omar på skratten?','Han bryr sig inte. Vad säger det om honom?'],'Skratten visar att Omar ser ett värde i något som andra inte ser.'],
  ['Which word best describes Omar in the story?',['Curious','Lazy','Rude'],['Vad gör Omar efter att han har läst brevet?','Han besöker platserna och letar upp Greta.'],'Omar är nyfiken. Han besöker platserna och letar upp Greta.']
];

/* ---------- SVENSKA: SKRIVA ARGUMENTERANDE TEXT ---------- */
const AQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som passar bäst.', prompt, options, answer:options[0], hints, solution,
  diagnose: () => hints[1] });
const AR_GRUND = [
  ['Vad är en tes?',['Den åsikt som texten vill övertyga läsaren om','En sammanfattning av hela texten','En fråga som texten undersöker'],['Tesen är kärnan i en argumenterande text.','Det är det skribenten vill att läsaren ska hålla med om.'],'Tesen är den åsikt texten vill övertyga läsaren om.'],
  ['Vilken mening fungerar bäst som tes?',['Skolan bör ha mobilfria lektioner.','Mobiler finns i många färger.','Vad tycker du om mobiler?'],['En tes är en tydlig åsikt, inte ett faktum eller en fråga.','Leta efter ett ord som bör eller borde.'],'”Skolan bör ha mobilfria lektioner” är en tydlig åsikt.'],
  ['Vad är ett argument?',['Ett skäl som stödjer tesen','En åsikt utan förklaring','En rubrik'],['Argumenten förklarar varför tesen är rätt.','Ett argument svarar på frågan varför.'],'Ett argument är ett skäl som stödjer tesen.'],
  ['Vad är ett motargument?',['Ett argument som talar emot din tes','Ditt starkaste argument','En sammanfattning'],['Mot betyder emot.','Det är vad någon som inte håller med skulle säga.'],'Ett motargument talar emot din tes.'],
  ['Varför är det bra att ta med ett motargument och bemöta det?',['Texten blir trovärdigare när du visar att du har tänkt på andra åsikter','Texten blir längre','För att du ska byta åsikt i slutet'],['Hur uppfattar läsaren en skribent som bara ser en sida?','Att bemöta betyder att svara på motargumentet.'],'Du blir mer trovärdig när du visar att du har tänkt på andra åsikter och kan svara på dem.'],
  ['Var brukar tesen stå i en argumenterande text?',['I inledningen, och den upprepas ofta i avslutningen','Bara i mitten','Ingenstans, läsaren ska gissa'],['Läsaren ska tidigt förstå vad du vill.','Tesen kommer tidigt och återkommer på slutet.'],'Tesen står i inledningen och upprepas ofta i avslutningen.'],
  ['Vilket uttryck passar för att inleda ditt första argument?',['För det första','Sammanfattningsvis','Plötsligt'],['Vilket uttryck visar att det är det första av flera argument?','Nästa argument kan börja med för det andra.'],'För det första inleder det första argumentet.'],
  ['Vad ska avslutningen innehålla?',['En upprepning av tesen och en uppmaning eller slutsats','Ett helt nytt argument','En berättelse'],['Avslutningen knyter ihop texten.','Läsaren ska minnas vad du vill.'],'Avslutningen upprepar tesen och avslutas gärna med en uppmaning.']
];
const AR_FORD = [
  ['Vilket argument bygger på logos, alltså fakta och förnuft?',['Elever som sover tillräckligt orkar koncentrera sig bättre på lektionerna.','Tänk på alla trötta, ledsna elever!','Som rektor i tjugo år vet jag vad som är bäst.'],['Logos handlar om logik och fakta.','Vilket argument förklarar ett samband, utan att spela på känslor?'],'Det första argumentet bygger på förnuft och ett samband som går att undersöka.'],
  ['Vilket argument bygger på pathos, alltså känslor?',['Tänk dig att vara den enda i klassen som aldrig blir bjuden.','Statistiken visar att många elever sover för lite.','Enligt skollagen ska alla elever få stöd.'],['Pathos vill väcka känslor hos läsaren.','Vilken mening får dig att känna något?'],'Den första meningen vill väcka känslor hos läsaren.'],
  ['Vilket argument bygger på ethos, alltså avsändarens trovärdighet?',['Som skolsköterska i femton år har jag sett hur sömnbrist påverkar elever.','Alla vet ju att det är så!','Tänk på hur hemskt det skulle vara!'],['Ethos handlar om varför vi ska lita på den som skriver.','Vilken mening visar att skribenten har erfarenhet?'],'Skolsköterskans erfarenhet gör henne trovärdig. Det är ethos.'],
  ['Vilket ord passar bäst i luckan? ”Vissa menar att läxor behövs för att träna. ___ kan för mycket läxor ge stress.”',['Däremot','Därför','Till exempel'],['Den andra meningen säger något som går emot den första.','Däremot visar en motsats.'],'Däremot visar att den andra meningen går emot den första.'],
  ['Vilket ord passar bäst i luckan? ”Mobiler stör koncentrationen. ___ bör de samlas in under lektionerna.”',['Därför','Däremot','Å ena sidan'],['Den andra meningen är en följd av den första.','Därför visar en slutsats.'],'Därför visar att det andra är en följd av det första.'],
  ['Vilken mening är ett bra bemötande av motargumentet ”Mobilen behövs för skolarbetet”?',['Det stämmer att mobilen kan vara användbar, men skolans datorer räcker för skolarbetet.','Det är fel, punkt.','Den som tycker så är dum.'],['Ett bra bemötande tar motargumentet på allvar.','Erkänn det som stämmer, och förklara sedan varför din tes ändå håller.'],'Det första bemötandet erkänner motargumentet och svarar med ett skäl.'],
  ['Vilken mening är ett personangrepp, alltså något du bör undvika?',['Den som tycker så har inte tänkt efter.','Enligt en undersökning tycker många elever att …','Ett skäl till detta är att …'],['Ett personangrepp riktar sig mot personen i stället för mot åsikten.','Vilken mening säger något nedsättande om den som tycker annorlunda?'],'”Den som tycker så har inte tänkt efter” angriper personen i stället för åsikten.'],
  ['Vilken rubrik passar bäst för en debattartikel?',['Ge eleverna en sovmorgon i veckan!','Min vecka','En text om sömn'],['En bra rubrik visar tesen direkt.','Vilken rubrik säger tydligt vad skribenten vill?'],'”Ge eleverna en sovmorgon i veckan!” visar tesen direkt.']
];
const AR_UTM = [
  ['I vilken ordning brukar en argumenterande text vara uppbyggd?',['Inledning med tes, argument, motargument med bemötande, avslutning','Avslutning, argument och sist tesen','Bara argument, utan tes'],['Vad behöver läsaren veta först?','Tesen först, argumenten i mitten och avslutningen sist.'],'Inledning med tes, argument, motargument med bemötande och avslutning.'],
  ['Vilket argument är starkast för tesen ”Skolan ska ha längre lunchrast”?',['Elever som hinner äta i lugn och ro orkar koncentrera sig bättre på eftermiddagen.','Jag gillar långa raster.','Alla vill ha längre rast.'],['Ett starkt argument ger ett skäl som gäller fler än bara skribenten.','Vilket argument förklarar varför, utan att överdriva?'],'Det första argumentet förklarar varför och gäller många elever.'],
  ['Vilken avslutning är starkast?',['Därför måste skolan införa sovmorgon. Det skulle ge piggare elever och bättre resultat.','Det var allt jag hade att säga.','Men jag vet inte riktigt.'],['En stark avslutning upprepar tesen och visar vad som vinns.','Vilken avslutning lämnar läsaren övertygad?'],'Den första avslutningen upprepar tesen och visar vad som vinns.'],
  ['Vad är skillnaden mellan en insändare och en debattartikel?',['En insändare är oftast kortare och skrivs ofta av en privatperson, en debattartikel är längre och mer utvecklad','Det finns ingen skillnad','En insändare har aldrig en tes'],['Båda är argumenterande texter.','Skillnaden handlar om längd och vem som brukar skriva.'],'En insändare är oftast kortare, medan en debattartikel är längre och mer utvecklad.'],
  ['Vilken mening är mest saklig och övertygande?',['Fler cykelbanor skulle göra det säkrare för elever att ta sig till skolan.','Bilister är hemska och borde förbjudas!','Alla håller med mig.'],['Saklig betyder utan överdrifter och personangrepp.','Vilken mening ger ett rimligt skäl?'],'Den första meningen är saklig och ger ett rimligt skäl.']
];

/* ---------- SVENSKA: ANALYSERA SKÖNLITTERATUR ---------- */
const LJUS = {
  title:'Ljuset i fönstret',
  paras:[
    'Varje kväll klockan sju tändes en lampa i fönstret mitt emot. Elin såg den från sitt rum på tredje våningen. Lampan var gul och lite sned, och bakom den satt en gammal man och läste. Han vände sidorna långsamt, som om han hade all tid i världen.',
    'Elin hade bott i huset i tre månader. Hon hade inte pratat med någon i trappuppgången, och i skolan satt hon oftast ensam på rasterna. Mamma jobbade kvällar. Lägenheten var tyst, så tyst att hon kunde höra kylskåpet surra.',
    'En kväll tändes inte lampan. Elin väntade. Klockan blev halv åtta, sedan åtta. Fönstret mitt emot var svart. Hon kände en oro som hon inte kunde förklara. Hon kände ju inte ens mannen.',
    'Nästa morgon gick hon över gården och knackade på hans dörr. Det dröjde länge innan någon öppnade. Mannen stod där i morgonrock och såg förvånad ut.',
    '– Lampan, sa Elin. Den var släckt i går.',
    'Mannen tittade på henne en stund. Sedan log han. – Glödlampan gick sönder, sa han. Och jag har inte kunnat ta mig till affären. Benen vill inte riktigt längre.',
    'Elin cyklade till affären och köpte en ny glödlampa. När hon kom tillbaka hade mannen, som hette Arvid, satt på kaffe. Han berättade om böckerna han läste och om sin fru, som hade dött för två år sedan. Elin berättade om skolan, mer än hon hade berättat för någon på länge.',
    'Den kvällen tändes lampan igen klockan sju. Arvid lyfte handen och vinkade. Elin vinkade tillbaka. För första gången sedan flytten kändes lägenheten inte lika tyst.'
  ]
};
const ANQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som stämmer bäst.', prompt, options, answer:options[0], hints, solution,
  diagnose: () => hints[1] });
const AN_GRUND = [
  ['Hur dags tändes lampan varje kväll?',['Klockan sju','Klockan åtta','Klockan halv åtta'],['Läs första meningen.','Klockan halv åtta och åtta nämns också, men då väntade Elin.'],'Lampan tändes klockan sju.'],
  ['Hur länge hade Elin bott i huset?',['I tre månader','I två år','I tre veckor'],['Läs andra stycket.','Två år nämns också, men det handlar om Arvids fru.'],'Elin hade bott i huset i tre månader.'],
  ['Varför var lampan släckt?',['Glödlampan hade gått sönder','Arvid hade rest bort','Arvid hade somnat tidigt'],['Vad säger Arvid när Elin frågar?','Läs Arvids repliker.'],'Glödlampan hade gått sönder.'],
  ['Vad gjorde Elin för att hjälpa Arvid?',['Hon köpte en ny glödlampa','Hon ringde hans familj','Hon lagade lampan själv'],['Läs stycket där Elin cyklar iväg.','Vart cyklade hon?'],'Hon cyklade till affären och köpte en ny glödlampa.'],
  ['Vad berättade Arvid om?',['Böckerna han läste och sin fru','Sitt gamla jobb','Sina barnbarn'],['Läs stycket där de dricker kaffe.','Han berättade om två saker.'],'Arvid berättade om sina böcker och om sin fru, som hade dött.'],
  ['Varför var Elin ensam hemma på kvällarna?',['Mamma jobbade kvällar','Mamma var bortrest','Hon ville vara ensam'],['Läs andra stycket.','Leta efter ordet mamma.'],'Hennes mamma jobbade kvällar.']
];
const AN_FORD = [
  ['Varför kände Elin oro när lampan inte tändes?',['Lampan hade blivit en trygg del av hennes vardag','Hon var rädd för mörker','Hon ville låna en bok'],['Hur länge hade Elin tittat på lampan varje kväll?','Det står att hon inte kunde förklara oron. Vad betydde lampan för henne?'],'Lampan hade blivit något tryggt i hennes ensamma vardag.'],
  ['Vad säger meningen ”så tyst att hon kunde höra kylskåpet surra” om Elins liv?',['Att hon är ensam','Att kylskåpet är trasigt','Att hon bor nära en affär'],['När hör man ett kylskåp surra?','Tystnaden beskriver mer än bara ljudet i lägenheten.'],'Tystnaden visar att Elin är ensam.'],
  ['Ur vems perspektiv berättas novellen?',['Elins, men berättaren säger hon om henne','Arvids, i jag-form','Mammans'],['Vems tankar och känslor får läsaren veta?','Texten säger hon om Elin, inte jag.'],'Novellen följer Elin och hennes tankar, men berättaren säger hon.'],
  ['Varför tror du att Elin berättade mer än hon hade gjort på länge?',['Hon kände sig sedd och lyssnad på','Arvid tvingade henne','Hon var tvungen för skolan'],['Vem hade Elin pratat med innan hon träffade Arvid?','Hur känns det när någon lyssnar på en?'],'Elin kände sig sedd och lyssnad på för första gången på länge.'],
  ['Vilken stämning har novellens början?',['Ensam och stilla','Glad och stökig','Spännande och farlig'],['Hur beskrivs Elins liv i början?','Tänk på orden tyst, ensam och långsamt.'],'Början är ensam och stilla.'],
  ['Vad visar det att Arvid ”vände sidorna långsamt, som om han hade all tid i världen”?',['Att han lever ett lugnt och kanske ensamt liv','Att han läser dåligt','Att boken är tråkig'],['Varför har någon all tid i världen?','Vad får vi senare veta om Arvids liv?'],'Det visar att Arvid lever ett lugnt och kanske ensamt liv.']
];
const AN_UTM = [
  ['Vad kan lampan vara en symbol för?',['Kontakt och gemenskap mellan människor','Elektricitet','Att det är vinter'],['En symbol är något konkret som står för något större.','Vad förändras mellan Elin och Arvid när lampan tänds igen?'],'Lampan kan stå för kontakten mellan Elin och Arvid och för att de inte längre är ensamma.'],
  ['Vilket tema passar bäst för novellen?',['Ensamhet och att hitta gemenskap','Att vinna en tävling','Kärlek mellan två tonåringar'],['Temat är vad texten handlar om på djupet.','Hur har Elin och Arvid det i början, och hur har de det i slutet?'],'Temat är ensamhet och att hitta gemenskap.'],
  ['Hur förändras Elin under novellen?',['Från ensam och tyst till att våga ta kontakt','Från glad till ledsen','Hon förändras inte'],['Jämför Elin i början och i slutet.','Vad gör hon som hon inte hade gjort tidigare?'],'Elin går från att vara ensam till att våga ta kontakt.'],
  ['Varför slutar novellen med att lägenheten ”inte kändes lika tyst”?',['Det visar att ensamheten har brutits, även om lägenheten är lika tyst som förut','Det visar att mamma har kommit hem','Det visar att kylskåpet har lagats'],['Har ljudet i lägenheten egentligen förändrats?','Ordet kändes visar att det handlar om Elins känsla.'],'Lägenheten är lika tyst, men Elin känner sig inte längre ensam.'],
  ['Vad har Elin och Arvid gemensamt?',['Båda är ensamma på olika sätt','Båda går i skolan','Båda tycker om att cykla'],['Vad vet vi om Arvids liv?','Arvids fru är död och han kan inte ta sig ut.'],'Båda är ensamma: Elin efter flytten och Arvid efter att hans fru dog.']
];

/* ---------- SVENSKA: SPRÅKRIKTIGHET ---------- */
const SV_RULE = {
  dedem:'Byt ut ordet mot vi eller oss. Passar vi ska det vara de. Passar oss ska det vara dem.',
  attoch:'Att står före ett verb i grundform (att springa) och inleder en bisats (jag hoppas att du kommer). Och binder ihop två likadana delar (vi åt och drack).',
  sar:'Sammansatta ord skrivs ihop på svenska. Om orden skrivs isär kan betydelsen ändras: en engelsk lärare kommer från England, en engelsklärare undervisar i engelska.',
  varvart:'Var handlar om plats, där något är. Vart handlar om riktning, dit något ska.',
  sin:'Sin, sitt och sina används när något tillhör subjektet i samma sats. Hans, hennes och deras används när ägaren själv ingår i subjektet, eller när saken tillhör någon annan.',
  anen:'Än använder du när du jämför: större än, äldre än. En är ett räkneord eller en artikel: en bok.'
};
const SV_H1 = {
  dedem:'Prova att byta ut ordet mot vi eller oss.',
  attoch:'Binder ordet ihop två likadana saker, eller kommer det ett verb i grundform eller en bisats efter?',
  sar:'Tänk på hur ordet skulle stå i en ordbok.',
  varvart:'Handlar meningen om var något är, eller vart något ska?',
  sin:'Vem äger saken? Är det samma person som gör något i meningen?',
  anen:'Jämför meningen två saker?'
};
const SV_GRUND = [
  ['___ har redan gått hem.','De',['Dem'],'dedem'],
  ['Jag såg ___ på bussen i morse.','dem',['de'],'dedem'],
  ['Vi frågade ___ om vägen.','dem',['de'],'dedem'],
  ['___ som vill får gå ut på rast.','De',['Dem'],'dedem'],
  ['Jag hoppas ___ du kommer på festen.','att',['och'],'attoch'],
  ['Hon började ___ skratta.','att',['och'],'attoch'],
  ['Vi gick ut ___ spelade fotboll.','och',['att'],'attoch'],
  ['Det är viktigt ___ sova ordentligt.','att',['och'],'attoch'],
  ['Läraren gav ___ en extra uppgift.','dem',['de'],'dedem'],
  ['Kan ___ komma i morgon?','de',['dem'],'dedem'],
  ['Glöm inte ___ ta med gympakläder.','att',['och'],'attoch']
];
const SV_FORD = [
  ['Vilket är rätt skrivet?','skolgården',['skol gården','skol-gården'],'sar'],
  ['Vilket är rätt skrivet?','sjuksköterska',['sjuk sköterska','sjuk-sköterska'],'sar'],
  ['Vilket är rätt skrivet?','fotbollsmatch',['fotbolls match','fotboll match'],'sar'],
  ['Vilket är rätt skrivet?','mobiltelefon',['mobil telefon','mobil-telefon'],'sar'],
  ['Vilket är rätt skrivet?','engelsklärare',['engelsk lärare','engelska lärare'],'sar'],
  ['___ ska du åka i sommar?','Vart',['Var'],'varvart'],
  ['___ bor din kusin?','Var',['Vart'],'varvart'],
  ['Jag vet inte ___ mina nycklar är.','var',['vart'],'varvart'],
  ['Hon undrade ___ vi skulle gå efter skolan.','vart',['var'],'varvart'],
  ['___ ligger biblioteket?','Var',['Vart'],'varvart']
];
const SV_UTM = [
  ['Elsa tog ___ cykel och åkte hem.','sin',['hennes'],'sin'],
  ['Ali och ___ bror spelar fotboll.','hans',['sin'],'sin'],
  ['Han lånade ut ___ penna till mig.','sin',['hans'],'sin'],
  ['Kalle ringde ___ mormor i går.','sin',['hans'],'sin'],
  ['Mina kompisar och ___ föräldrar kom på avslutningen.','deras',['sina'],'sin'],
  ['Hon är två år äldre ___ jag.','än',['en'],'anen'],
  ['Jag har ___ bror och två systrar.','en',['än'],'anen'],
  ['Det här provet var svårare ___ det förra.','än',['en'],'anen'],
  ['Jag hjälpte ___ som var nya i klassen.','dem',['de'],'dedem'],
  ['Det var ___ som vann matchen.','de',['dem'],'dedem'],
  ['Ingen vet ___ hon tog vägen.','vart',['var'],'varvart']
];
function svQ([p, ans, wrongs, type]){
  const gap = p.includes('___');
  return choiceQ({ instr: gap ? 'Välj det ord som ska stå i luckan. Handlar det om ägande, så tillhör saken personen i meningen.' : 'Välj det alternativ som är rätt skrivet.',
    prompt:p, options:[ans, ...wrongs], answer:ans,
    hints:[SV_H1[type], SV_RULE[type]],
    solution:(gap ? fill(p, ans) : `Rätt skrivet: ${ans}.`) + ' ' + SV_RULE[type],
    diagnose: () => SV_RULE[type] });
}

/* ---------- ALLA OMRÅDEN I ÅRSKURS 9 ---------- */
Object.assign(CONTENT, {
  '9-matte-funktioner':{
    intro:[
      'En funktion beskriver ett samband mellan två storheter, till exempel hur mycket en taxiresa kostar beroende på hur långt man åker.',
      'En linjär funktion kan skrivas y = kx + m. k är lutningen, alltså hur mycket y ökar när x ökar med 1. m är y-värdet där linjen skär y-axeln, alltså när x = 0.',
      'Ett samband kan visas som en formel, en tabell eller en graf. Alla tre visar samma sak på olika sätt.'
    ],
    example:{title:'Exempel: y = 2x + 3', steps:['När x = 0 är y = 2 · 0 + 3 = 3. Linjen skär y-axeln i 3.','När x ökar med 1 ökar y med 2. Lutningen är 2.','När x = 4 är y = 2 · 4 + 3 = 11.']},
    levels:[
      {name:'Grund', desc:'Tabeller, formler och att läsa av grafer', make:()=>mix([FN.g1,FN.g2,FN.g3],8)},
      {name:'Fördjupning', desc:'Lutning, skärning med y-axeln och rätt formel', make:()=>mix([FN.f1,FN.f2,FN.f3],8)},
      {name:'Utmaning', desc:'Funktioner i vardagen och att jämföra två abonnemang', make:()=>mix([FN.u1,FN.u2,FN.u3],8)}
    ]
  },
  '9-matte-sannolikhet':{
    intro:[
      'Sannolikhet visar hur troligt det är att något händer. Den är ett tal mellan 0 och 1, där 0 betyder att det aldrig händer och 1 att det alltid händer.',
      'Sannolikheten räknar du ut som antalet gynnsamma utfall delat med antalet möjliga utfall. Gynnsamma utfall är de du är ute efter.',
      'Sannolikheten kan skrivas som bråk, decimaltal eller procent: 1/4 = 0,25 = 25 %. När flera saker ska hända efter varandra gångrar du sannolikheterna.'
    ],
    example:{title:'Exempel: Att få en femma eller en sexa på en tärning', steps:['En tärning har 6 möjliga utfall.','Femma och sexa är 2 gynnsamma utfall.','Sannolikheten är 2/6 = 1/3, ungefär 0,33 eller 33 %.']},
    levels:[
      {name:'Grund', desc:'Tärningar, påsar och lyckohjul', make:()=>mix([SA.g1,SA.g2,SA.g3],8)},
      {name:'Fördjupning', desc:'Motsatt händelse, procent och flera försök', make:()=>mix([SA.f1,SA.f2,SA.f3],8)},
      {name:'Utmaning', desc:'Dragning med och utan återläggning, förväntat antal', make:()=>mix([SA.u1,SA.u2,SA.u3],8)}
    ]
  },
  '9-matte-problemlosning':{
    intro:[
      'Problemlösning handlar om att förstå vad uppgiften frågar efter, välja en metod och kontrollera att svaret är rimligt.',
      'Läs uppgiften noga och stryk under det viktiga. Vad vet du, och vad ska du ta reda på? Rita gärna en bild eller skriv en ekvation.',
      'Kontrollera alltid svaret: är det rimligt? En promenad till skolan tar inte fem timmar, och en jacka kostar inte 3 kr.'
    ],
    example:{title:'Exempel: Ett recept för 4 personer behöver 300 g pasta. Hur mycket behövs för 6 personer?', steps:['Räkna ut per person: 300 / 4 = 75 g.','Gånga med 6: 75 · 6 = 450 g.','Rimligt? Fler personer ska ge mer pasta, och 450 g är mer än 300 g. Det stämmer.']},
    levels:[
      {name:'Grund', desc:'Hastighet, jämförpris och recept', make:()=>mix([PL.g1,PL.g2,PL.g3],8)},
      {name:'Fördjupning', desc:'Tid, procent i flera steg och skala', make:()=>mix([PL.f1,PL.f2,PL.f3],8)},
      {name:'Utmaning', desc:'Uppgifter i flera steg, som på nationella provet', make:()=>mix([PL.u1,PL.u2,PL.u3],8)}
    ]
  },
  '9-engelska-argumentera':{
    intro:[
      'När du argumenterar på engelska ger du din åsikt och stödjer den med skäl. Börja med en tydlig åsikt, till exempel ”In my opinion, schools should …”.',
      'Använd sambandsord som visar hur tankarna hänger ihop. Firstly, secondly och furthermore lägger till argument, however och on the other hand visar en motsats, och to sum up inleder avslutningen.',
      'En stark text tar också upp ett motargument och bemöter det: ”Some people say that …, but …”. Skriv sakligt och undvik slang.'
    ],
    example:{title:'Exempel: Ett kort argument på engelska', steps:['Opinion: In my opinion, schools should start later.','Argument: Firstly, teenagers need more sleep to concentrate.','Counterargument: Some people say it is harder for families, but the benefits for students are more important.','Conclusion: To sum up, a later start would help students learn.']},
    levels:[
      {name:'Grund', desc:'Åsikt, argument och sambandsord', make:()=>shuffle(EA_GRUND).map(x=>EAQ(...x))},
      {name:'Fördjupning', desc:'Starka argument, motargument och formell stil', make:()=>shuffle(EA_FORD).map(x=>EAQ(...x))},
      {name:'Utmaning', desc:'Struktur och avslutning, plus en egen text', make:()=>shuffle(EA_UTM).map(x=>EAQ(...x)),
        writing:{
          task:'Skriv 120–200 ord på engelska: Should students be allowed to use their phones during breaks? Ge din åsikt, minst två argument och ett motargument som du bemöter.',
          check:['Står din åsikt tydligt i början, till exempel In my opinion …?','Har du minst två argument med sambandsord som firstly och furthermore?','Tar du upp ett motargument och bemöter det, till exempel Some people say … but …?','Har du en avslutning som börjar med till exempel To sum up?'],
          focus:'Fokusera på om eleven har en tydlig åsikt, minst två argument, ett bemött motargument och en avslutning, och på sambandsorden. Kommentera ett par saker i språket med exempel ur elevens text och visa hur de blir rätt. Citera engelska ord på engelska.'
        }}
    ]
  },
  '9-engelska-grammatik':{
    intro:[
      'Adjektiv kan jämföras. Korta adjektiv får -er och -est: big, bigger, biggest. Långa adjektiv får more och most: more interesting, most interesting. Några är oregelbundna: good, better, best och bad, worse, worst.',
      'If-satser visar villkor. Om något är troligt använder du presens i if-satsen och will i den andra delen: If it rains, we will stay inside. Om något är tänkt eller osannolikt använder du preteritum och would: If I had a dog, I would walk it every day.',
      'Passiv form använder du när det viktiga är vad som händer, inte vem som gör det: The window was broken. Du bildar den med en form av be + verbets tredje form.'
    ],
    example:{title:'Exempel: Vilken if-sats?', steps:['Meningen är: If I ___ (win) the lottery, I would buy a boat.','Den andra delen har would. Det är något tänkt, inte troligt.','Då ska if-satsen stå i preteritum.','Svar: If I won the lottery, I would buy a boat.']},
    levels:[
      {name:'Grund', desc:'Jämförelser: bigger, more och best', make:()=>shuffle(EN9_GRUND).slice(0,8).map(x=>enQ(...x))},
      {name:'Fördjupning', desc:'If-satser: will eller would, plus en skrivuppgift', make:()=>shuffle(EN9_FORD).slice(0,8).map(x=>enQ(...x)),
        writing:{
          task:'Skriv 5–8 meningar på engelska: Vad skulle du göra om du fick bestämma över din skola i en vecka? Använd if-satser, till exempel If I were the principal, I would …',
          check:['Har du skrivit 5–8 meningar?','Använder du would i dina meningar?','Står if-satsen i preteritum, till exempel If I were eller If I had?','Börjar varje mening med stor bokstav och slutar med punkt?'],
          focus:'Fokusera på om eleven använder andra konditionalis rätt: preteritum i if-satsen och would i den andra delen. Om något är fel, visa ett exempel ur elevens text och hur det blir rätt. Citera engelska ord på engelska.'
        }},
      {name:'Utmaning', desc:'Passiv form', make:()=>shuffle(EN9_UTM).slice(0,8).map(x=>enQ(...x))}
    ]
  },
  '9-engelska-langre-texter':{
    text:CYKEL,
    intro:[
      'En längre text kan kännas jobbig, men du behöver inte förstå varje ord. Läs först igenom hela texten för att få en känsla för handlingen.',
      'Läs sedan stycke för stycke. Fundera på vad som händer, vem som är med och hur personerna känner sig.',
      'Gissa svåra ord utifrån sammanhanget. Fråga dig också vad texten vill säga och om personerna förändras.'
    ],
    example:{title:'Exempel: Förstå en känsla som inte sägs rakt ut', steps:['I en text står det: She put her hand over her mouth, and her eyes filled with tears.','Det står inte att hon blir rörd eller förvånad.','Men det hon gör visar det. Det kallas att läsa mellan raderna.']},
    levels:[
      {name:'Grund', desc:'Hitta svaren i texten', make:()=>shuffle(LT_GRUND).map(x=>LTQ(...x))},
      {name:'Fördjupning', desc:'Läsa mellan raderna och förstå ord i sammanhang', make:()=>shuffle(LT_FORD).map(x=>LTQ(...x))},
      {name:'Utmaning', desc:'Tema, förändring och författarens val, plus en skrivuppgift', make:()=>shuffle(LT_UTM).map(x=>LTQ(...x)),
        writing:{
          task:'Skriv 6–10 meningar på engelska. Tänk dig att du är Omar och skriv ett kort brev till Greta om ett nytt ställe som cykeln har tagit dig till.',
          check:['Börjar brevet med en hälsning, som Dear Greta?','Beskriver du platsen så att Greta kan se den framför sig?','Står verben i rätt tidsform, till exempel past simple när du berättar vad du gjorde?','Avslutar du brevet på ett vänligt sätt?'],
          focus:'Fokusera på om eleven skriver ett begripligt brev i Omars roll till Greta, en äldre kvinna som tidigare ägde cykeln, och beskriver en plats levande. Kommentera ett par saker i språket, som verbformer, med exempel ur elevens text. Citera engelska ord på engelska.'
        }}
    ]
  },
  '9-svenska-argumenterande':{
    intro:[
      'En argumenterande text vill övertyga läsaren. Den bygger på en tes, alltså den åsikt du vill att läsaren ska hålla med om.',
      'Texten börjar med en inledning där tesen presenteras. Sedan kommer argument, gärna ett per stycke, och ett motargument som du bemöter. Sist kommer en avslutning där du upprepar tesen.',
      'Du kan övertyga på tre sätt: med fakta och förnuft (logos), med känslor (pathos) och med trovärdighet (ethos). Undvik personangrepp och överdrifter.'
    ],
    example:{title:'Exempel: En argumenterande text i miniformat', steps:['Tes: Skolan bör ha mobilfria lektioner.','Argument: Utan mobiler blir det lättare att koncentrera sig.','Motargument och bemötande: Vissa säger att mobilen behövs för skolarbetet, men skolans datorer räcker till det.','Avslutning: Därför bör skolan införa mobilfria lektioner.']},
    levels:[
      {name:'Grund', desc:'Tes, argument, motargument och avslutning', make:()=>shuffle(AR_GRUND).map(x=>AQ(...x))},
      {name:'Fördjupning', desc:'Logos, pathos och ethos, sambandsord och bemötanden', make:()=>shuffle(AR_FORD).map(x=>AQ(...x))},
      {name:'Utmaning', desc:'Struktur, starka argument och en egen insändare', make:()=>shuffle(AR_UTM).map(x=>AQ(...x)),
        writing:{
          task:'Skriv en insändare på 150–300 ord. Välj en tes, till exempel ”Skolan bör ha mobilfria lektioner” eller ”Alla elever borde få en sovmorgon i veckan”. Ha med minst två argument, ett motargument som du bemöter och en avslutning.',
          check:['Står tesen tydligt i inledningen?','Har du minst två argument, gärna i egna stycken?','Tar du upp ett motargument och bemöter det?','Upprepar du tesen i avslutningen?','Skriver du sakligt, utan personangrepp och överdrifter?'],
          focus:'Fokusera på textens uppbyggnad (tes, argument, bemött motargument, avslutning), på hur övertygande argumenten är och på saklig ton. Ge ett konkret exempel ur elevens text på något som fungerar och ett på något som kan bli starkare.'
        }}
    ]
  },
  '9-svenska-analys':{
    text:LJUS,
    intro:[
      'Att analysera skönlitteratur betyder att undersöka hur en text är skriven och vad den vill säga, inte bara vad som händer.',
      'Fundera på personerna: hur är de, och hur förändras de? Titta på miljön och stämningen. Vem berättar, och ur vems perspektiv?',
      'Leta efter tema och symboler. Temat är vad texten handlar om på djupet, till exempel ensamhet eller vänskap. En symbol är något konkret som står för något större.'
    ],
    example:{title:'Exempel: En symbol', steps:['I en novell slår ett träd ut utanför fönstret samtidigt som huvudpersonen blir frisk.','Trädet är något konkret.','Men det kan också stå för hopp och nytt liv. Då är trädet en symbol.']},
    levels:[
      {name:'Grund', desc:'Vad händer i novellen?', make:()=>shuffle(AN_GRUND).map(x=>ANQ(...x))},
      {name:'Fördjupning', desc:'Personer, stämning och perspektiv', make:()=>shuffle(AN_FORD).map(x=>ANQ(...x))},
      {name:'Utmaning', desc:'Tema, symbol och förändring, plus en egen analys', make:()=>shuffle(AN_UTM).map(x=>ANQ(...x)),
        writing:{
          task:'Skriv en kort analys på 150–250 ord: Vad handlar novellen ”Ljuset i fönstret” om på djupet, och vad kan lampan betyda? Använd minst två exempel eller citat från texten.',
          check:['Skriver du om temat, alltså vad novellen handlar om på djupet?','Förklarar du vad lampan kan stå för?','Har du med minst två exempel eller citat från texten?','Använder du ord som visar att du tolkar, till exempel ”det kan betyda” eller ”det visar att”?'],
          focus:'Fokusera på om eleven tolkar novellens tema (ensamhet och gemenskap) och lampan som symbol, och stödjer tolkningen med exempel ur texten ”Ljuset i fönstret”, där Elin, som är ensam efter en flytt, hjälper den gamle grannen Arvid när hans lampa slocknar. Ge ett konkret exempel ur elevens text på något som fungerar och något som kan utvecklas.'
        }}
    ]
  },
  '9-svenska-sprakriktighet':{
    intro:[
      'Språkriktighet handlar om att skriva så att läsaren förstår direkt och inte fastnar på fel. Några fel är vanliga, även hos vuxna, och de går att lära sig att undvika.',
      'De och dem: byt ut ordet mot vi eller oss. Passar vi ska det vara de. Passar oss ska det vara dem.',
      'Sammansatta ord skrivs ihop på svenska: skolgården, inte skol gården. Var handlar om plats och vart om riktning. Sin, sitt och sina använder du när något tillhör subjektet.'
    ],
    example:{title:'Exempel: De eller dem?', steps:['Meningen är: Jag träffade ___ i parken.','Byt ut ordet: ”Jag träffade oss i parken” låter rätt. ”Jag träffade vi” låter fel.','Oss betyder att det ska vara dem.','Svar: Jag träffade dem i parken.']},
    levels:[
      {name:'Grund', desc:'De eller dem, att eller och', make:()=>shuffle(SV_GRUND).slice(0,8).map(svQ)},
      {name:'Fördjupning', desc:'Särskrivning, var och vart', make:()=>shuffle(SV_FORD).slice(0,8).map(svQ)},
      {name:'Utmaning', desc:'Sin eller hans, än eller en, och blandat', make:()=>shuffle(SV_UTM).slice(0,8).map(svQ)}
    ]
  }
});
