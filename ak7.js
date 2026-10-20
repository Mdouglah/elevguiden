/* ==========================================================
   ELEVGUIDEN – INNEHÅLL FÖR ÅRSKURS 7
   Laddas av index.html och använder hjälpfunktionerna där.
   ========================================================== */

/* ---------- MATEMATIK: PROCENT ---------- */
const P = {
  g50(){ const N=2*rnd(10,200); return numQ({ prompt:`Vad är 50 % av ${N}?`, answer:N/2,
    hints:['Hur stor del är 50 % – en liten del, hälften eller allt?','Hälften får du genom att dela med ett visst tal. Vilket?'],
    solution:`50 % är hälften. ${N} / 2 = ${fmt(N/2)}`,
    wrongs:[[N*2,'Du har gångrat med 2. 50 % är hälften, så svaret ska bli mindre än talet.'],[N,'Det där är hela talet, alltså 100 %. 50 % är bara hälften.']] }); },
  g10(){ const N=10*rnd(3,90); return numQ({ prompt:`Vad är 10 % av ${N}?`, answer:N/10,
    hints:['Om du delar något i tio lika stora delar, hur många procent är en del?','Vad blir talet om du delar det med 10?'],
    solution:`10 % är en tiondel. ${N} / 10 = ${fmt(N/10)}`,
    wrongs:[[N*10,'Du har gångrat med 10. 10 % är en tiondel, så svaret ska bli mindre än talet.'],[N,'Det där är hela talet. 10 % är bara en tiondel.']] }); },
  g25(){ const N=4*rnd(5,100); return numQ({ prompt:`Vad är 25 % av ${N}?`, answer:N/4,
    hints:['Hur många gånger får 25 % plats i 100 %?','Fyra lika stora delar. Vad blir talet delat med 4?'],
    solution:`25 % är en fjärdedel. ${N} / 4 = ${fmt(N/4)}`,
    wrongs:[[N/2,'Det där är 50 %. 25 % är hälften av hälften.'],[N*4,'Du har gångrat med 4. Svaret ska bli mindre än talet.']] }); },
  gdec(){ const p=pick([5,8,20,35,50,60,75,90]); return numQ({ instr:'Skriv svaret i decimalform, till exempel 0,3.', prompt:`Skriv ${p} % i decimalform.`, answer:p/100,
    hints:[`Procent betyder hundradelar. Hur skriver du ${p} hundradelar?`,`${p} hundradelar är ${p} / 100. Vad blir det?`],
    solution:`${p} % = ${p} / 100 = ${fmt(p/100)}`,
    wrongs:[[p,'Det där är fortfarande procenttalet. I decimalform delar du med 100.'],[p/10,'Nästan! Du har delat med 10. Procent är hundradelar, så dela med 100.'],[p*100,'Du har gångrat. För att få decimalform delar du med 100.']] }); },

  f1(){ const p=pick([5,15,20,30,40,60,75]), N=20*rnd(3,40), a=p*N/100; return numQ({ prompt:`Vad är ${p} % av ${N}?`, answer:a,
    hints:['Kan du räkna ut 1 % av talet först? Hur gör du det?',`1 % av ${N} är ${fmt(N/100)}. Hur många sådana procent behöver du?`],
    solution:`1 % av ${N} = ${fmt(N/100)}. ${p} % = ${fmt(N/100)} · ${p} = ${fmt(a)}`,
    wrongs:[[p*N,'Du glömde dela med 100. Procent betyder hundradelar.'],[p*N/10,'Du delade med 10. Procent betyder hundradelar, så dela med 100.'],[N/p,'Du delade talet med procenttalet. Räkna först ut 1 % genom att dela med 100.']] }); },
  f2(){ const N=20*rnd(10,60), p=pick([10,20,25,30,50]), thing=pick(['En jacka','En cykel','En ryggsäck','En lampa','En skateboard']); const r=N*p/100;
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`${thing} kostar ${N} kr. Den säljs med ${p} % rabatt. Vad kostar den nu?`, answer:N-r,
    hints:['Vilka två steg behövs? Först rabatten i kronor, och sedan …?',`Rabatten är ${fmt(r)} kr. Hur mycket blir kvar av ${N} kr?`],
    solution:`Rabatt: ${p} % av ${N} = ${fmt(r)} kr. Nytt pris: ${N} − ${fmt(r)} = ${fmt(N-r)} kr`,
    wrongs:[[r,'Det där är rabatten, alltså hur mycket billigare den blir. Vad kostar den när rabatten är borträknad?'],[N+r,'Du lade till rabatten. Rabatt betyder att priset blir lägre.']] }); },
  f3(){ const B=pick([20,40,200,400]), p=pick([10,20,25,50,75]), A=B*p/100;
    return numQ({ instr:'Skriv svaret i procent, bara talet.', prompt:`Hur många procent är ${A} av ${B}?`, answer:p,
    hints:[`Hur stor del av ${B} är ${A}? Kan du skriva det som en division?`,`${A} / ${B} = ${fmt(A/B)}. Hur gör du om ett decimaltal till procent?`],
    solution:`${A} / ${B} = ${fmt(A/B)} = ${p} %`,
    wrongs:[[A/B,'Rätt uträkning! Gör nu om decimaltalet till procent genom att gånga med 100.'],[B/A*100,'Du delade åt fel håll. Dela delen med det hela: '+A+' / '+B+'.']] }); },

  u1(){ const A=pick([200,400,500,800]), p=pick([5,10,15,20,25,30]), B=A+A*p/100;
    return numQ({ instr:'Skriv svaret i procent, bara talet.', prompt:`Priset på en konsertbiljett höjdes från ${A} kr till ${B} kr. Med hur många procent höjdes priset?`, answer:p,
    hints:['Hur många kronor ökade priset?',`Ökningen är ${B-A} kr. Hur många procent är det av det gamla priset, ${A} kr?`],
    solution:`Ökning: ${B} − ${A} = ${B-A} kr. ${B-A} / ${A} = ${fmt((B-A)/A)} = ${p} %`,
    wrongs:[[B-A,'Det där är ökningen i kronor. Hur många procent av det gamla priset är den?'],[(B-A)/B*100,'Du jämförde med det nya priset. Förändringen räknas mot det gamla priset.'],[(B-A)/A,'Rätt uträkning! Gör nu om decimaltalet till procent.']] }); },
  u2(){ const up=Math.random()<.5, p=pick([3,8,12,15,20,35]), f=up?1+p/100:1-p/100;
    return numQ({ instr:'Skriv svaret i decimalform.', prompt:`Ett pris ${up?'ökar':'minskar'} med ${p} %. Vilken förändringsfaktor ska du gånga det gamla priset med?`, answer:f,
    hints:['Om det gamla priset är 100 %, hur många procent är då det nya priset?', up?`100 % + ${p} % = ${100+p} %. Hur skriver du det i decimalform?`:`100 % − ${p} % = ${100-p} %. Hur skriver du det i decimalform?`],
    solution:`${up?100+p:100-p} % = ${fmt(f)}. Förändringsfaktorn är ${fmt(f)}.`,
    wrongs:[[p/100,'Det där är bara själva förändringen. Faktorn ska också innehålla hela det gamla priset, alltså 1.'],[up?1-p/100:1+p/100,'Kolla en gång till om priset ökar eller minskar.'],[up?100+p:100-p,'Rätt procent! Skriv det nu i decimalform genom att dela med 100.']] }); },
  u3(){ const A=100*rnd(2,15), p=pick([10,20,25,50]), B=A*(100-p)/100;
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`Efter ${p} % rabatt kostar en vara ${B} kr. Vad kostade den före rabatten?`, answer:A,
    hints:[`Om rabatten är ${p} %, hur många procent av det gamla priset betalar du?`,`${B} kr motsvarar ${100-p} %. Hur mycket är då 1 %?`],
    solution:`${B} kr = ${100-p} %. 1 % = ${fmt(B/(100-p))} kr. 100 % = ${fmt(A)} kr`,
    wrongs:[[B+B*p/100,'Ett vanligt fel! Rabatten räknades på det gamla priset, så du kan inte lägga på '+p+' % på det nya priset.'],[B-B*p/100,'Priset före rabatten måste vara högre än '+B+' kr.']] }); }
};

/* ---------- MATEMATIK: BRÅK ---------- */
const BR = {
  g1(){ const d=pick([2,3,4,5,10]), N=d*rnd(2,20); return numQ({ prompt:`Vad är 1/${d} av ${N}?`, answer:N/d,
    hints:[`Om du delar ${N} i ${d} lika stora delar, hur stor blir en del?`,`Vad blir ${N} delat med ${d}?`],
    solution:`1/${d} är en av ${d} lika delar. ${N} / ${d} = ${N/d}`,
    wrongs:[[N*d,`Du har gångrat. 1/${d} är en av ${d} lika delar, så svaret ska bli mindre än ${N}.`]] }); },
  g2(){ const [a,b]=pick([[1,2],[1,4],[3,4],[1,5],[2,5],[3,10],[7,10],[1,10]]); return numQ({ instr:'Skriv svaret i decimalform, till exempel 0,5.', prompt:`Skriv ${a}/${b} i decimalform.`, answer:a/b,
    hints:['Ett bråkstreck betyder division. Vad är täljaren delat med nämnaren?', b===10?'Tiondelar skrivs som första siffran efter decimalkommat.':`Tänk på pengar: ${a}/${b} av 100 kr är ${100*a/b} kr. Hur stor del av 100 är det?`],
    solution:`${a}/${b} = ${a} / ${b} = ${fmt(a/b)}`,
    wrongs:[[b/a,`Du har delat åt fel håll. Täljaren delas med nämnaren: ${a} / ${b}.`]] }); },
  g3(){ let x, y, same;
    if (Math.random()<.5){ const d=pick([5,6,8,10]); let a=rnd(1,d-1), b=rnd(1,d-1); while(b===a) b=rnd(1,d-1); x=[a,d]; y=[b,d]; same='nämnare'; }
    else { const a=pick([1,2,3]); let d1=rnd(a+1,9), d2=rnd(a+1,9); while(d2===d1) d2=rnd(a+1,9); x=[a,d1]; y=[a,d2]; same='täljare'; }
    const big = x[0]/x[1] > y[0]/y[1] ? x : y, small = big===x ? y : x;
    const bs=`${big[0]}/${big[1]}`, ss=`${small[0]}/${small[1]}`;
    return choiceQ({ instr:'Välj det bråk som är störst.', prompt:`Vilket bråk är störst: ${x[0]}/${x[1]} eller ${y[0]}/${y[1]}?`, options:[bs,ss], answer:bs,
      hints: same==='nämnare' ? ['Delarna är lika stora i båda bråken. Vad skiljer dem åt?','Det bråk som har flest delar är störst.'] : ['Båda bråken har lika många delar. Vilka delar är störst: om helheten delas i få eller i många bitar?','Ju större nämnare, desto mindre är varje del.'],
      solution: same==='nämnare' ? `Nämnarna är lika, så det bråk med störst täljare är störst: ${bs}.` : `Täljarna är lika. Mindre nämnare ger större delar, så ${bs} är störst.`,
      diagnose: () => same==='nämnare' ? 'Delarna är lika stora. Titta på hur många delar varje bråk har.' : 'Större nämnare betyder att helheten delas i fler, alltså mindre, bitar.' }); },

  f1(){ const b=pick([3,4,5,6,8,10]), a=rnd(2,b-1), N=b*rnd(2,15); return numQ({ prompt:`Vad är ${a}/${b} av ${N}?`, answer:N/b*a,
    hints:[`Hur mycket är 1/${b} av ${N}?`,`1/${b} av ${N} är ${N/b}. Hur många sådana delar behöver du?`],
    solution:`1/${b} av ${N} = ${N/b}. ${a}/${b} = ${a} · ${N/b} = ${N/b*a}`,
    wrongs:[[N/b,`Det där är 1/${b}. Du behöver ${a} sådana delar.`],[N*a,'Du har bara gångrat med täljaren. Dela också med nämnaren.']] }); },
  f2(){ const q=pick([3,4,5,7]); let p=rnd(1,q-1); while(gcd(p,q)!==1) p=rnd(1,q-1); const k=pick([2,3,4,5]); const P2=p*k, Q2=q*k;
    return fracQ({ prompt:`Förkorta ${P2}/${Q2} så långt det går.`, answer:{n:p,d:q},
      hints:[`Finns det ett tal som både ${P2} och ${Q2} går att dela med?`,`Både ${P2} och ${Q2} går att dela med ${k}.`],
      solution:`Dela täljare och nämnare med ${k}: ${P2}/${Q2} = ${p}/${q}` }); },
  f3(){ const d=pick([5,7,8,9,10,12]); const a=rnd(1,d-2), b=rnd(1,d-1-a);
    return numQ({ instr:'Skriv svaret som ett bråk, till exempel 3/7.', prompt:`Räkna ut ${a}/${d} + ${b}/${d}.`, answer:(a+b)/d,
      hints:['När nämnarna är lika, vad är det du lägger ihop: täljarna, nämnarna eller båda?','Lägg ihop täljarna och behåll nämnaren.'],
      solution:`Lika nämnare: lägg ihop täljarna. ${a}/${d} + ${b}/${d} = ${a+b}/${d}`,
      wrongs:[[(a+b)/(2*d),`Du har lagt ihop nämnarna också. Delarna är lika stora, så nämnaren ska vara kvar: ${d}.`]] }); },

  u1(){ const [a,b,c,d]=pick([[1,2,1,4],[1,3,1,6],[1,2,1,3],[2,3,1,6],[1,4,1,3],[3,4,1,8],[1,2,2,5],[1,3,1,4]]); const L=b*d/gcd(b,d);
    return numQ({ instr:'Skriv svaret som ett bråk, till exempel 5/6.', prompt:`Räkna ut ${a}/${b} + ${c}/${d}.`, answer:a/b+c/d,
      hints:['Bråken har olika nämnare. Kan du skriva om dem så att de får samma nämnare?',`Gemensam nämnare kan vara ${L}: ${a}/${b} = ${a*L/b}/${L} och ${c}/${d} = ${c*L/d}/${L}.`],
      solution:`${a*L/b}/${L} + ${c*L/d}/${L} = ${a*L/b+c*L/d}/${L}`,
      wrongs:[[(a+c)/(b+d),'Du har lagt ihop både täljare och nämnare. Gör först bråken liknämniga, alltså samma nämnare.']] }); },
  u2(){ const [a,b,c,d]=pick([[3,4,1,2],[5,6,1,3],[2,3,1,4],[7,8,1,4],[1,2,1,5],[3,5,1,10]]); const L=b*d/gcd(b,d);
    return numQ({ instr:'Skriv svaret som ett bråk, till exempel 1/4.', prompt:`Räkna ut ${a}/${b} − ${c}/${d}.`, answer:a/b-c/d,
      hints:['Kan du ge bråken samma nämnare innan du drar bort?',`Gemensam nämnare kan vara ${L}: ${a}/${b} = ${a*L/b}/${L} och ${c}/${d} = ${c*L/d}/${L}.`],
      solution:`${a*L/b}/${L} − ${c*L/d}/${L} = ${a*L/b-c*L/d}/${L}`,
      wrongs: b!==d ? [[(a-c)/(b-d),'Du har dragit bort både täljare och nämnare. Gör först bråken liknämniga.']] : [] }); },
  u3(){ const b=pick([4,5,10]), a=rnd(1,b-1), N=b*10*rnd(2,12), thing=pick(['En tröja','Ett par byxor','Ett spel','En väska']);
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`${thing} kostar ${N} kr. Den säljs nu för ${a}/${b} av priset. Vad kostar den nu?`, answer:N/b*a,
      hints:[`Hur mycket är 1/${b} av ${N} kr?`,`1/${b} av ${N} kr är ${N/b} kr. Hur många sådana delar ska du betala?`],
      solution:`1/${b} av ${N} = ${N/b}. ${a}/${b} = ${a} · ${N/b} = ${N/b*a} kr`,
      wrongs:[[N/b,`Det där är 1/${b} av priset. Du ska betala ${a} sådana delar.`],[N-N/b*a,`Du räknade ut hur mycket billigare den blir. Frågan gäller vad den kostar, alltså ${a}/${b} av priset.`]] }); }
};

/* ---------- MATEMATIK: GEOMETRI, AREA OCH OMKRETS ---------- */
const GEO = {
  g1(){ const a=rnd(3,15), b=rnd(2,a-1);
    return numQ({ instr:'Skriv svaret i cm, bara talet.', prompt:`En rektangel är ${a} cm lång och ${b} cm bred. Hur lång är omkretsen?`, answer:2*a+2*b, figure:FIG.rect(a,b),
    hints:['Omkretsen är hela vägen runt figuren. Hur många sidor har en rektangel?',`Lägg ihop alla fyra sidor: ${a} + ${b} + ${a} + ${b}.`],
    solution:`${a} + ${b} + ${a} + ${b} = ${2*a+2*b} cm`,
    wrongs:[[a*b,'Det där är arean. Omkretsen är längden runt hela figuren.'],[a+b,'Du har bara räknat två av sidorna. En rektangel har fyra sidor.']] }); },
  g2(){ const a=rnd(3,15), b=rnd(2,a-1);
    return numQ({ instr:'Skriv svaret i cm², bara talet.', prompt:`En rektangel är ${a} cm lång och ${b} cm bred. Hur stor är arean?`, answer:a*b, figure:FIG.rect(a,b),
    hints:['Arean är hur stor yta figuren täcker. Hur räknar du ut arean av en rektangel?',`Gånga längden med bredden: ${a} · ${b}.`],
    solution:`${a} · ${b} = ${a*b} cm²`,
    wrongs:[[2*a+2*b,'Det där är omkretsen. Arean räknar du med längd · bredd.'],[a+b,'Du har lagt ihop. Arean räknar du med gånger: längd · bredd.']] }); },
  g3(){ const s=rnd(3,12), area=Math.random()<.5;
    return area
      ? numQ({ instr:'Skriv svaret i cm², bara talet.', prompt:`En kvadrat har sidan ${s} cm. Hur stor är arean?`, answer:s*s, figure:FIG.square(s),
        hints:['I en kvadrat är alla sidor lika långa. Hur räknar du arean?',`Gånga sidan med sidan: ${s} · ${s}.`],
        solution:`${s} · ${s} = ${s*s} cm²`,
        wrongs:[[4*s,'Det där är omkretsen. Arean är sidan gånger sidan.'],[2*s,'Du räknade sidan gånger 2. Arean är sidan gånger sidan.']] })
      : numQ({ instr:'Skriv svaret i cm, bara talet.', prompt:`En kvadrat har sidan ${s} cm. Hur lång är omkretsen?`, answer:4*s, figure:FIG.square(s),
        hints:['Hur många sidor har en kvadrat, och hur långa är de?',`Fyra sidor som alla är ${s} cm: ${s} · 4.`],
        solution:`${s} · 4 = ${4*s} cm`,
        wrongs:[[s*s,'Det där är arean. Omkretsen är längden runt figuren.'],[2*s,'En kvadrat har fyra lika långa sidor, inte två.']] }); },

  f1(){ const b=2*rnd(2,9), h=rnd(2,12);
    return numQ({ instr:'Skriv svaret i cm², bara talet.', prompt:`En triangel har basen ${b} cm och höjden ${h} cm. Hur stor är arean?`, answer:b*h/2, figure:FIG.tri(b,h),
    hints:['En triangel är hälften av en rektangel med samma bas och höjd.',`Räkna ${b} · ${h} och dela sedan med 2.`],
    solution:`${b} · ${h} / 2 = ${b*h/2} cm²`,
    wrongs:[[b*h,'Du glömde dela med 2. En triangel är bara hälften av rektangeln.'],[b+h,'Area räknas med gånger, inte plus.']] }); },
  f2(){ const a=rnd(4,15), b=rnd(2,a-1), P=2*a+2*b;
    return numQ({ instr:'Skriv svaret i cm, bara talet.', prompt:`En rektangel har omkretsen ${P} cm. Den är ${a} cm lång. Hur bred är den?`, answer:b,
    hints:['Omkretsen är två längder och två bredder. Hur mycket är två längder?',`${P} − ${2*a} = ${P-2*a} cm är två bredder. Hur mycket är en?`],
    solution:`${P} − 2 · ${a} = ${P-2*a}. ${P-2*a} / 2 = ${b} cm`,
    wrongs:[[P-2*a,'Det där är båda bredderna tillsammans. Dela med 2.'],[P-a,'Det finns två längder. Dra bort båda.'],[P/a,'Omkretsen är inte längd gånger bredd. Den är summan av alla sidor.']] }); },
  f3(){ const b=rnd(3,12), h=rnd(2,9), sl=h+rnd(1,3);
    return numQ({ instr:'Skriv svaret i cm², bara talet.', prompt:`En parallellogram har basen ${b} cm och höjden ${h} cm. Den sneda sidan är ${sl} cm. Hur stor är arean?`, answer:b*h,
    hints:['Arean av en parallellogram är bas · höjd. Vilken av sträckorna är höjden?',`Höjden är den raka sträckan, ${h} cm. Den sneda sidan behövs inte.`],
    solution:`${b} · ${h} = ${b*h} cm²`,
    wrongs:[[b*sl,'Du använde den sneda sidan. Arean räknas med höjden, som står rakt upp från basen.'],[b*h/2,'Det där gäller trianglar. En parallellogram har formeln bas · höjd.']] }); },

  u1(){ const A=rnd(8,20), B=rnd(6,15), c=rnd(2,Math.min(5,B-2));
    return numQ({ instr:'Skriv svaret i m², bara talet.', prompt:`En rektangulär trädgård är ${A} m lång och ${B} m bred. I ett hörn ligger en kvadratisk altan som är ${c} m · ${c} m. Resten är gräsmatta. Hur stor är gräsmattan?`, answer:A*B-c*c,
    hints:['Räkna först ut arean av hela trädgården.',`Hela trädgården är ${A*B} m². Dra bort altanens area.`],
    solution:`Trädgården: ${A} · ${B} = ${A*B} m². Altanen: ${c} · ${c} = ${c*c} m². Gräsmattan: ${A*B} − ${c*c} = ${A*B-c*c} m²`,
    wrongs:[[A*B,'Det där är hela trädgården. Dra bort altanen.'],[A*B-c,`Altanens area är ${c} · ${c}, inte bara ${c}.`]] }); },
  u2(){ const r=rnd(3,10);
    return Math.random()<.5
      ? numQ({ instr:'Använd π ≈ 3,14. Skriv svaret som ett tal.', prompt:`En cirkel har radien ${r} cm. Hur stor är arean, i cm²?`, answer:3.14*r*r,
        hints:['Arean av en cirkel är π · radien · radien.',`Räkna 3,14 · ${r} · ${r}.`],
        solution:`3,14 · ${r} · ${r} = ${fmt(3.14*r*r)} cm²`,
        wrongs:[[3.14*2*r,'Det där är omkretsen. Arean är π · radien · radien.'],[3.14*r,'Du glömde gånga med radien en gång till.']] })
      : numQ({ instr:'Använd π ≈ 3,14. Skriv svaret som ett tal.', prompt:`En cirkel har diametern ${2*r} cm. Hur lång är omkretsen, i cm?`, answer:3.14*2*r,
        hints:['Omkretsen av en cirkel är π · diametern.',`Räkna 3,14 · ${2*r}.`],
        solution:`3,14 · ${2*r} = ${fmt(3.14*2*r)} cm`,
        wrongs:[[3.14*r,'Du använde radien. Omkretsen är π · diametern.'],[3.14*r*r,'Det där är arean. Omkretsen är π · diametern.']] }); },
  u3(){ const a=rnd(3,7), b=rnd(2,5), p=pick([150,200,250,300]);
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`Ett rum är ${a} m långt och ${b} m brett. Golvmattan kostar ${p} kr per kvadratmeter. Vad kostar mattan till hela golvet?`, answer:a*b*p,
    hints:['Hur många kvadratmeter är golvet?',`Golvet är ${a*b} m². Gånga med priset per kvadratmeter.`],
    solution:`${a} · ${b} = ${a*b} m². ${a*b} · ${p} = ${a*b*p} kr`,
    wrongs:[[(2*a+2*b)*p,'Du räknade med omkretsen. Mattan ska täcka ytan, alltså arean.'],[a*b,'Det där är golvets area. Gånga med priset.']] }); }
};

/* ---------- ENGELSKA: PRESENS OCH PRETERITUM ---------- */
const EN_GRUND = [
  ['Yesterday I ___ my grandmother.','visit','visits','visited','past','yesterday'],
  ['She ___ to school every day.','walk','walks','walked','s','every day'],
  ['We ___ a film last night.','watch','watches','watched','past','last night'],
  ['My brother ___ pizza every Friday.','cook','cooks','cooked','s','every Friday'],
  ['Last summer they ___ in Spain.','stay','stays','stayed','past','last summer'],
  ['I usually ___ my homework after dinner.','do','does','did','base','usually'],
  ['He ___ the bus this morning.','miss','misses','missed','past','this morning'],
  ['The shop ___ at nine every morning.','open','opens','opened','s','every morning'],
  ['Two years ago we ___ to a new house.','move','moves','moved','past','ago'],
  ['My dog always ___ at the mailman.','bark','barks','barked','s','always'],
  ['They often ___ basketball after school.','play','plays','played','base','often'],
  ['Last week she ___ her room.','clean','cleans','cleaned','past','last week']
];
const EN_FORD = [
  ['Yesterday I ___ (go) to the cinema.','go','went'],
  ['Last week we ___ (see) a whale.','see','saw'],
  ['She ___ (eat) breakfast at seven this morning.','eat','ate'],
  ['My dad ___ (buy) a new car last month.','buy','bought'],
  ['Last weekend they ___ (take) the train to Stockholm.','take','took'],
  ['I ___ (write) a letter to my friend yesterday.','write','wrote'],
  ['He ___ (come) home late last night.','come','came'],
  ['We ___ (have) a test last Monday.','have','had'],
  ['Last year she ___ (make) a cake for my birthday.','make','made'],
  ['This morning I ___ (find) my keys under the sofa.','find','found'],
  ['Yesterday I ___ (think) the test was easy.','think','thought'],
  ['Last summer we ___ (swim) in the lake every day.','swim','swam']
];
const EN_UTM = [
  {s:'Every morning she ___ (drink) tea.', base:'drink', a:'drinks', t:'pres', past:'drank', sform:'drinks', h:['Vilket ord i meningen visar när det händer? Är det en vana?','Det är en vana, och subjektet är she. Vad händer då med verbet?']},
  {s:'Yesterday she ___ (drink) coffee instead.', base:'drink', a:'drank', t:'past', past:'drank', sform:'drinks', h:['Vilket ord visar när det hände?','Drink är oregelbundet. Svaret börjar på ”dr” och slutar på ”k”.']},
  {s:'My friends often ___ (play) games online.', base:'play', a:'play', t:'pres', past:'played', sform:'plays', h:['Vilket ord visar hur ofta det händer?','Vem gör något? ”My friends” är flera. Får verbet -s då?']},
  {s:'Last night my friend ___ (play) until midnight.', base:'play', a:'played', t:'past', past:'played', sform:'plays', h:['Vilket ord visar när det hände?','Play är ett regelbundet verb. Hur ser det ut i preteritum?']},
  {s:'He ___ (get) up at six every day.', base:'get', a:'gets', t:'pres', past:'got', sform:'gets', h:['Vilket ord visar att det är en vana?','Det är en vana, och subjektet är he. Vad händer då med verbet?']},
  {s:'This morning he ___ (get) up at eight.', base:'get', a:'got', t:'past', past:'got', sform:'gets', h:['Har ”this morning” redan hänt, eller händer det ofta?','Get är oregelbundet. Svaret har tre bokstäver och börjar på ”g”.']},
  {s:'Our teacher always ___ (give) us homework on Fridays.', base:'give', a:'gives', t:'pres', past:'gave', sform:'gives', h:['Vilket ord visar hur ofta det händer?','”Our teacher” är en person, alltså hon eller han. Vad händer då med verbet?']},
  {s:'Last Friday she ___ (give) us a quiz.', base:'give', a:'gave', t:'past', past:'gave', sform:'gives', h:['Vilket ord visar när det hände?','Give är oregelbundet. Svaret börjar på ”ga”.']},
  {s:'The sun ___ (rise) in the east.', base:'rise', a:'rises', t:'pres', past:'rose', sform:'rises', h:['Är det här något som hände en gång, eller något som alltid gäller?','Det är ett faktum, och subjektet är ”the sun”, alltså den. Vad händer då med verbet?']},
  {s:'We ___ (win) the match last weekend.', base:'win', a:'won', t:'past', past:'won', sform:'wins', h:['Vilket ord visar när det hände?','Win är oregelbundet. Svaret har tre bokstäver och börjar på ”w”.']}
];

/* ---------- ENGELSKA: VARDAGSORD ---------- */
const VO = [
  {g:'skolan', w:[['suddgummi','eraser',['rubber']],['linjal','ruler',[]],['läxa','homework',[]],['rast','break',['recess']],['schema','timetable',['schedule']],['klassrum','classroom',[]],['bänk','desk',[]],['lärare','teacher',[]]]},
  {g:'maten', w:[['frukost','breakfast',[]],['middag','dinner',[]],['gaffel','fork',[]],['kniv','knife',[]],['sked','spoon',[]],['smör','butter',[]],['jordgubbe','strawberry',[]],['gurka','cucumber',[]]]},
  {g:'känslor', w:[['glad','happy',[]],['ledsen','sad',['upset']],['arg','angry',['mad']],['rädd','scared',['afraid','frightened']],['trött','tired',[]],['nervös','nervous',[]],['uttråkad','bored',[]],['stolt','proud',[]]]},
  {g:'hemmet', w:[['kudde','pillow',[]],['nyckel','key',[]],['trappa','stairs',['staircase']],['fönster','window',[]],['granne','neighbour',['neighbor']],['cykel','bike',['bicycle']],['handduk','towel',[]],['soffa','sofa',['couch']]]}
];
const VO_ALL = VO.flatMap(t => t.w.map(([sv, en, acc]) => ({sv, en, acc, g:t.g})));
function voChoice(x){
  const ds = shuffle(VO_ALL.filter(y => y.g === x.g && y.en !== x.en)).slice(0, 2).map(y => y.en);
  return choiceQ({ instr:'Välj rätt engelskt ord.', prompt:`Vad heter ”${x.sv}” på engelska?`, options:[x.en, ...ds], answer:x.en,
    hints:['Säg ordet tyst för dig själv. Har du hört det i en film, en låt eller ett spel?', `Ordet börjar på ”${x.en[0]}”.`],
    solution:`${x.sv} = ${x.en}`,
    diagnose: raw => { const y = VO_ALL.find(z => z.en === raw); return y ? `${cap(raw)} betyder ${y.sv}.` : null; } });
}
function voWrite(x){
  return textQ({ instr:'Skriv ordet på engelska.', prompt:`Skriv ”${x.sv}” på engelska.`, answer:x.en, accept:x.acc,
    hints:['Tänk på ett sammanhang där du har hört ordet, till exempel i skolan eller hemma.', `Ordet börjar på ”${x.en[0]}” och har ${x.en.length} bokstäver.`],
    solution:`${x.sv} = ${x.en}${x.acc.length ? ` (det går också bra med ${x.acc.join(' eller ')})` : ''}`,
    diagnose: raw => norm(raw) === norm(x.sv) ? 'Det där är det svenska ordet. Skriv det på engelska.' : null });
}
/* Falska vänner: [engelskt ord, rätt betydelse, ordet som lurar, ett annat alternativ, förklaring] */
const FF = [
  ['eventually','till slut','eventuellt','tyvärr','Eventually betyder till slut. Eventuellt heter possibly på engelska.'],
  ['actually','faktiskt','aktuellt','ofta','Actually betyder faktiskt. Aktuell heter current på engelska.'],
  ['sensible','förnuftig','känslig','snabb','Sensible betyder förnuftig. Känslig heter sensitive.'],
  ['gift','present','gift','pengar','Gift betyder present. Gift som i giftigt heter poison.'],
  ['chef','kock','chef','servitör','Chef betyder kock. En chef på jobbet heter boss eller manager.'],
  ['fabric','tyg','fabrik','färg','Fabric betyder tyg. Fabrik heter factory.'],
  ['novel','roman','novell','dikt','Novel betyder roman, alltså en lång bok. En novell heter short story.'],
  ['become','bli','få','komma','Become betyder bli. ”Can I become a hamburger?” betyder alltså ”Kan jag bli en hamburgare?”. Säg: Can I have a hamburger?'],
  ['prove','bevisa','prova','visa','Prove betyder bevisa. Prova heter try.'],
  ['blank','tom','blank','vit','Blank betyder tom, som ett papper utan text. Blank som i glänsande heter shiny.'],
  ['rent','hyra','ren','pengar','Rent betyder hyra. Ren heter clean.'],
  ['glass','glas','glass','vatten','Glass betyder glas. Glass som man äter heter ice cream.'],
  ['barn','lada','barn','bonde','Barn betyder lada, alltså en byggnad på en bondgård. Barn heter children.']
];
function ffQ([en, ok, trap, other, why]){
  return choiceQ({ instr:'Välj rätt svensk betydelse. Se upp för ord som lurar!', prompt:`Vad betyder ”${en}” på svenska?`, options:[ok, trap, other], answer:ok,
    hints:['Vissa engelska ord liknar svenska ord men betyder något helt annat. De kallas falska vänner.', why],
    solution:why,
    diagnose: raw => raw === trap ? `Lurad! ${why}` : why });
}

/* ---------- ENGELSKA: LÄSA OCH FÖRSTÅ KORTA TEXTER ---------- */
const NEW_GIRL = {
  title:'The New Girl', lang:'en',
  paras:[
    'It was the first day after the summer holiday. Maya walked into her new classroom and looked around. She did not know anyone. Her family had moved from Gothenburg to a small town in the north, and everything felt strange.',
    'The teacher, Mr Patel, smiled at her. “Welcome, Maya. You can sit next to Leo.” Leo had red hair and a big smile. He pushed his pencil case to the side to make room for her.',
    'During the break, Maya stood alone by the wall. Some girls were playing football, and the ball rolled towards her. She kicked it back, hard and straight. One of the girls shouted, “Wow! Do you want to play with us?”',
    'Maya hesitated for a second. Then she nodded and ran onto the field. She scored two goals before the bell rang.',
    'After school, Leo walked with her to the bus stop. “You are really good at football,” he said. “We have training on Thursdays. You should come.” Maya smiled for the first time that day. Maybe this town was not so bad after all.'
  ]
};
const ENR = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som stämmer bäst med texten.', prompt, lang:'en', options, answer:options[0], hints, solution,
  diagnose: () => `Det svaret får inte stöd i texten. ${hints[0]}` });

/* ---------- SVENSKA: LÄSFÖRSTÅELSE ---------- */
const STORY = {
  title:'Sista bussen',
  paras:[
    'Noah hade bara tre minuter på sig. Han sprang över skolgården med ryggsäcken studsande mot ryggen, men när han kom fram till hållplatsen såg han bara bakljusen försvinna runt hörnet. Nästa buss gick om en timme.',
    'Han satte sig på bänken och tog fram mobilen. Fyra procent batteri. Han skrev snabbt till mamma: ”Missade bussen. Kommer sent.” Sedan blev skärmen svart.',
    'Det började regna. En äldre kvinna med en tung matkasse ställde sig under taket bredvid honom. Plötsligt gick kassen sönder, och apelsiner rullade ut över trottoaren. Noah suckade, reste sig och började plocka. Han hittade sju apelsiner, en av dem i en vattenpöl.',
    '– Tack, sa kvinnan. Jag bor bara två kvarter bort, men jag kan inte bära allt det här i händerna.',
    'Noah tittade på klockan i kyrktornet. Fyrtio minuter kvar. Han tog kassen med de trasiga handtagen i famnen och följde med.',
    'När de kom fram bjöd hon på varm choklad medan de väntade på att regnet skulle ge sig. Hennes telefon låg på bordet, och hon frågade om han ville ringa hem.',
    '– Mamma? sa Noah. Jag är hos … Han tittade på kvinnan.',
    '– Margit, sa hon och log.',
    '– Hos Margit. Jag förklarar sen.',
    'Han hann till bussen med fem minuter till godo. Den kvällen berättade han allt för mamma. Hon skrattade när han sa att det var den bästa bussen han någonsin missat.'
  ]
};
const SV = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som stämmer bäst.', prompt, options, answer:options[0], hints, solution,
  diagnose: () => `Det svaret får inte stöd i texten. ${hints[0]}` });

/* ---------- SVENSKA: ORDKLASSER ---------- */
const OK_DEF = {
  substantiv:'Ett substantiv är namnet på en sak, person, plats, ett djur eller en känsla. Du kan sätta en, ett eller flera framför: en bok, ett hus.',
  verb:'Ett verb berättar vad någon gör eller vad som händer. Du kan sätta jag framför och ändra tiden: jag springer, jag sprang.',
  adjektiv:'Ett adjektiv beskriver hur någon eller något är: en glad hund, ett stort hus. Det går ofta att jämföra: glad, gladare, gladast.',
  adverb:'Ett adverb berättar hur, när eller var något händer: snabbt, igår, hemma.',
  pronomen:'Ett pronomen står i stället för ett namn eller ett substantiv: jag, du, hon, de, min, vår.',
  preposition:'En preposition visar läge eller riktning: på, i, under, efter.',
  konjunktion:'En konjunktion binder ihop ord eller meningar: och, men, eller.',
  räkneord:'Ett räkneord är ett tal eller en ordning: tre, tjugo, första.'
};
const OK_TEST = {
  substantiv:'Testa: kan du sätta en, ett eller flera framför ordet?',
  verb:'Testa: kan du sätta jag framför och ändra tiden, som jag springer och jag sprang?',
  adjektiv:'Testa: beskriver ordet hur någon eller något är? Går det att jämföra, som glad, gladare, gladast?',
  adverb:'Testa: svarar ordet på frågan hur, när eller var något händer?',
  pronomen:'Testa: kan ordet bytas mot ett namn eller ett substantiv?',
  preposition:'Testa: visar ordet var något är eller vart något rör sig, som på, i eller under?',
  konjunktion:'Testa: binder ordet ihop två ord eller två meningar?',
  räkneord:'Testa: är ordet ett tal eller en ordning?'
};
const OK_ART = c => ['preposition','konjunktion'].includes(c) ? 'en' : 'ett';
const OK_GRUND = [
  ['Hunden springer i parken.','springer','verb'],['Min syster köpte en ny cykel.','cykel','substantiv'],['Det var en kall morgon.','kall','adjektiv'],
  ['Eleverna läser en bok.','läser','verb'],['Vi åt glass på stranden.','glass','substantiv'],['Han har en röd jacka.','röd','adjektiv'],
  ['Läraren skrev på tavlan.','tavlan','substantiv'],['Katten sover hela dagen.','sover','verb'],['Filmen var väldigt spännande.','spännande','adjektiv'],
  ['Mormor bakade bullar.','bullar','substantiv']
];
const OK_FORD = [
  ['Hon ringde mig igår.','Hon','pronomen'],['Boken ligger på bordet.','på','preposition'],['Vi kommer hem snart.','snart','adverb'],
  ['De spelade fotboll efter skolan.','efter','preposition'],['Jag tycker om musik.','Jag','pronomen'],['Han pratar alltid högt.','alltid','adverb'],
  ['Katten gömde sig under sängen.','under','preposition'],['Ni får gärna komma.','gärna','adverb'],['Det här är vår lägenhet.','vår','pronomen'],
  ['Pennan ligger i väskan.','i','preposition']
];
const OK_UTM = [
  ['Hon sprang snabbt till bussen.','snabbt','adverb','adjektiv'],['Vi köpte tre äpplen.','tre','räkneord','adjektiv'],
  ['Jag ville gå ut, men det regnade.','men','konjunktion','adverb'],['Löpningen tog en timme.','Löpningen','substantiv','verb'],
  ['Den glada flickan vinkade.','glada','adjektiv','adverb'],['Att simma är roligt.','simma','verb','substantiv'],
  ['Han är snäll och hjälpsam.','och','konjunktion','preposition'],['Det blåser mycket idag.','idag','adverb','substantiv'],
  ['Vi ses på lördag.','lördag','substantiv','adverb'],['Det är den bästa boken jag har läst.','bästa','adjektiv','adverb']
];
function okQ([s, w, cls, trap], pool){
  const others = shuffle(pool.filter(c => c !== cls && c !== trap));
  const opts = [cls, ...(trap ? [trap] : []), ...others].slice(0, pool.length === 3 ? 3 : 4);
  return choiceQ({ instr:'Läs meningen och välj ordklass.', prompt:`Vilken ordklass är ”${w}” i meningen ”${s}”`, options:opts.map(cap), answer:cap(cls),
    hints:[`Vad gör ordet ”${w}” i meningen? Berättar det vad någon gör, vad något heter, hur något är, eller något annat?`, OK_TEST[cls]],
    solution:`”${w}” är ${OK_ART(cls)} ${cls}. ${OK_DEF[cls]}`,
    diagnose: raw => { const c = raw.toLowerCase(); return OK_DEF[c] ? `${cap(c)}? ${OK_DEF[c]} Passar det in på ”${w}” här?` : null; } });
}
const OK_ALL = Object.keys(OK_DEF);

/* ---------- SVENSKA: SKRIVA BERÄTTANDE TEXT ---------- */
const BQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som passar bäst.', prompt, options, answer:options[0], hints, solution,
  diagnose: () => hints[1] });
const BT_PARTS = ['Inledning','Problem','Höjdpunkt','Avslutning'];
const BT_GRUND = [
  ()=>BQ('Vilken del av en berättelse är det här? ”Det var en vanlig tisdag i november. Sara satt vid köksbordet och åt frukost medan regnet smattrade mot fönstret.”', BT_PARTS,
    ['Presenterar texten en person, en plats eller en tid?','I inledningen får läsaren veta vem, var och när.'], 'Det är inledningen. Läsaren får veta vem (Sara), var (köket) och när (en tisdag i november).'),
  ()=>BQ('Vilken del av en berättelse är det här? ”Då upptäckte hon att plånboken var borta. Hon letade i alla fickor, men den fanns ingenstans.”', ['Problem','Inledning','Höjdpunkt','Avslutning'],
    ['Händer det något som ställer till det för personen?','Problemet är det som sätter igång handlingen.'], 'Det är problemet. Den borttappade plånboken sätter igång handlingen.'),
  ()=>BQ('Vilken del av en berättelse är det här? ”Hjärtat bultade när hon öppnade dörren till källaren. Där, i mörkret, lyste något. Hon sträckte fram handen …”', ['Höjdpunkt','Inledning','Problem','Avslutning'],
    ['Är det här den mest spännande delen?','Höjdpunkten är där spänningen är som störst.'], 'Det är höjdpunkten. Spänningen är som störst och läsaren vill veta vad som händer.'),
  ()=>BQ('Vilken del av en berättelse är det här? ”När Sara gick och lade sig den kvällen log hon. Det hade varit en tisdag hon aldrig skulle glömma.”', ['Avslutning','Inledning','Problem','Höjdpunkt'],
    ['Knyter texten ihop det som har hänt?','Avslutningen visar hur det gick och hur personen känner efteråt.'], 'Det är avslutningen. Den knyter ihop berättelsen och visar hur Sara känner sig efteråt.'),
  ()=>BQ('Vad ska läsaren få veta i inledningen?', ['Vem, var och när','Hur berättelsen slutar','Vad författaren tycker om ämnet'],
    ['Inledningen är början. Vad behöver läsaren för att förstå resten?','Läsaren behöver känna personen, platsen och tiden.'], 'Inledningen presenterar vem berättelsen handlar om, var den utspelar sig och när.'),
  ()=>BQ('Vad är en höjdpunkt i en berättelse?', ['Den mest spännande delen','Den första meningen','En sammanfattning av texten'],
    ['Tänk på en film. När sitter du längst fram på stolen?','Höjdpunkten är där problemet ställs på sin spets.'], 'Höjdpunkten är den mest spännande delen, där problemet ställs på sin spets.'),
  ()=>BQ('Vilken tidsform skrivs berättelser oftast i?', ['Preteritum: gick, sa, såg','Presens: går, säger, ser','Futurum: ska gå, ska säga'],
    ['Berättelser handlar oftast om något som redan har hänt.','Det som redan har hänt skrivs i preteritum.'], 'Berättelser skrivs oftast i preteritum, eftersom de handlar om något som redan har hänt.'),
  ()=>BQ('Vad gör en bra avslutning?', ['Den knyter ihop berättelsen och visar hur det gick','Den börjar på något helt nytt','Den upprepar inledningen ord för ord'],
    ['Läsaren vill veta hur det gick till slut.','En bra avslutning svarar på frågan: hur löstes problemet?'], 'En bra avslutning knyter ihop berättelsen och visar hur det gick.')
];
const BT_FORD = [
  ()=>BQ('Vilken mening visar att Ali är nervös, utan att säga det rakt ut?', ['Ali torkade händerna mot byxorna och svalde hårt.','Ali var väldigt nervös.','Ali kände sig nervös och rädd.'],
    ['Att gestalta betyder att visa en känsla genom vad personen gör.','Vilken mening låter dig se nervositeten framför dig?'], 'Svettiga händer och att svälja hårt visar nervositet. Läsaren förstår känslan utan att den sägs rakt ut.'),
  ()=>BQ('Vilken mening skapar mest spänning?', ['Steg närmade sig i mörkret. Sedan blev det alldeles tyst.','Det var lite läskigt i huset.','Huset var gammalt och mörkt.'],
    ['Spänning uppstår när läsaren undrar vad som ska hända.','Korta meningar och något oväntat, som en plötslig tystnad, ökar spänningen.'], 'Stegen och den plötsliga tystnaden får läsaren att undra vad som händer härnäst.'),
  ()=>BQ('Vilket ord passar bäst i luckan? ”Vi väntade i en timme. ___ kom bussen.”', ['Till slut','Först','Dessutom'],
    ['Det handlar om tid. Kommer bussen i början eller efter lång väntan?','Till slut används när något händer efter en lång stund.'], '”Till slut kom bussen.” Till slut visar att det tog lång tid.'),
  ()=>BQ('Vilket ord gör meningen mest överraskande? ”Hon öppnade lådan. ___ hoppade en groda ut!”', ['Plötsligt','Sedan','Därför'],
    ['Vilket ord visar att något händer oväntat och snabbt?','Plötsligt används när något oväntat händer.'], '”Plötsligt hoppade en groda ut!” Plötsligt gör händelsen överraskande.'),
  ()=>BQ('Vilken mening beskriver platsen bäst?', ['Skogen luktade blöt mossa, och granarna stod så tätt att solen knappt syntes.','Skogen var fin.','Det fanns träd i skogen.'],
    ['En bra beskrivning använder sinnena: syn, hörsel, lukt och känsel.','Vilken mening får dig att nästan vara där?'], 'Lukten av mossa och de täta granarna gör att läsaren kan se och känna skogen.'),
  ()=>BQ('Vilket ord passar bäst i luckan? ”Mamma blev arg ___ jag hade glömt nycklarna.”', ['eftersom','men','eller'],
    ['Meningen förklarar varför mamma blev arg.','Eftersom används när du förklarar en orsak.'], '”Mamma blev arg eftersom jag hade glömt nycklarna.” Eftersom visar orsaken.'),
  ()=>BQ('Vilken mening är bäst som första mening i en spännande berättelse?', ['Ingen hade öppnat dörren på femtio år, förrän i dag.','Hej, jag heter Lisa och jag är tretton år.','Det här är en berättelse om en dörr.'],
    ['En bra första mening väcker läsarens nyfikenhet.','Vilken mening får dig att vilja läsa vidare?'], 'Meningen om dörren väcker frågor: varför har ingen öppnat den, och vad händer i dag?'),
  ()=>BQ('Varför är det bra att variera hur meningarna börjar?', ['Texten blir mer levande och lättare att läsa','Texten blir längre','Det finns en regel om det'],
    ['Tänk dig en text där varje mening börjar med ”Sen”. Hur låter den?','Variation gör att texten flyter och inte känns enformig.'], 'När meningarna börjar på olika sätt blir texten mer levande och lättare att läsa.')
];
const BT_UTM = [
  ()=>BQ('Vilken mening blandar tidsformer av misstag?', ['Hon sprang till bussen och hoppar på i sista sekund.','Hon sprang till bussen och hoppade på i sista sekund.','Hon springer till bussen och hoppar på i sista sekund.'],
    ['Titta på verben i varje mening. Står de i samma tidsform?','Sprang är preteritum, men hoppar är presens.'], 'Den första meningen blandar sprang (preteritum) och hoppar (presens). Håll dig till en tidsform.'),
  ()=>BQ('En berättelse är skriven i jag-form. Vilken mening passar in?', ['Jag kände hur kylan kröp in under jackan.','Han kände hur kylan kröp in under jackan.','Man kände hur kylan kröp in under jackan.'],
    ['I jag-form berättar huvudpersonen själv.','Vilken mening använder ordet jag?'], 'I jag-form berättar huvudpersonen själv, så det ska stå jag.'),
  ()=>BQ('Hur skriver man en replik i en svensk berättelse?', ['– Kom nu! ropade Emma.','Kom nu ropade Emma','KOM NU, ropade Emma.'],
    ['I svenska berättelser börjar repliker ofta med ett talstreck.','Talstrecket är ett långt streck följt av mellanslag.'], 'På svenska börjar en replik ofta med talstreck: – Kom nu! ropade Emma.'),
  ()=>BQ('Vad är det bästa sättet att få läsaren att bry sig om huvudpersonen?', ['Visa vad personen känner, vill och är rädd för','Beskriva exakt hur lång personen är','Låta personen aldrig säga något'],
    ['Vad gör att du bryr dig om en person i en film eller bok?','Läsaren bryr sig när den förstår personens känslor och mål.'], 'När läsaren förstår vad personen känner, vill och är rädd för börjar den bry sig.'),
  ()=>BQ('En berättelse handlar om en flicka som är rädd för vatten men till slut vågar hoppa från trampolinen. Vilken avslutning knyter bäst ihop berättelsen?', ['När hon kom upp till ytan skrattade hon. Vattnet var inte farligt längre.','Sedan gick hon hem och åt middag.','Slut.'],
    ['En bra avslutning knyter an till problemet i berättelsen.','Problemet var rädslan för vatten. Vilken avslutning visar att den är borta?'], 'Avslutningen visar att rädslan är borta. Den knyter ihop problemet med lösningen.')
];

/* ---------- ALLA OMRÅDEN I ÅRSKURS 7 ---------- */
Object.assign(CONTENT, {
  '7-matte-procent':{
    intro:[
      'Procent betyder hundradelar. 1 % är en hundradel, alltså 0,01. 25 % är 25 hundradelar, alltså 0,25.',
      'Några procent är bra att kunna utantill: 50 % är hälften, 25 % är en fjärdedel och 10 % är en tiondel.',
      'För att räkna ut en procent av ett tal kan du först räkna ut 1 % genom att dela med 100. Sedan gångar du med antalet procent.'
    ],
    example:{title:'Exempel: Vad är 15 % av 240?', steps:['1 % av 240 är 240 / 100 = 2,4.','15 % är 15 gånger så mycket: 2,4 · 15 = 36.','Svar: 15 % av 240 är 36.']},
    levels:[
      {name:'Grund', desc:'Hälften, tiondelar och decimalform', make:()=>mix([P.g50,P.g10,P.g25,P.gdec],8)},
      {name:'Fördjupning', desc:'Procent av ett tal och rabatter', make:()=>mix([P.f1,P.f2,P.f3],8)},
      {name:'Utmaning', desc:'Förändring, förändringsfaktor och ursprungligt pris', make:()=>mix([P.u1,P.u2,P.u3],8)}
    ]
  },
  '7-matte-brak':{
    intro:[
      'Ett bråk visar en del av en helhet. I 3/4 är 4 nämnaren, som visar hur många lika stora delar helheten är delad i. 3 är täljaren, som visar hur många av delarna du har.',
      'Ju större nämnare, desto mindre är varje del. 1/8 av en pizza är mindre än 1/4 av samma pizza.',
      'Bråk med samma nämnare kan du lägga ihop direkt: 1/5 + 2/5 = 3/5. Har bråken olika nämnare måste du först göra dem liknämniga, alltså ge dem samma nämnare.'
    ],
    example:{title:'Exempel: Vad är 3/4 av 20?', steps:['1/4 av 20 är 20 / 4 = 5.','3/4 är tre sådana delar: 3 · 5 = 15.','Svar: 3/4 av 20 är 15.']},
    levels:[
      {name:'Grund', desc:'Delar av tal, decimalform och jämförelser', make:()=>mix([BR.g1,BR.g2,BR.g3],8)},
      {name:'Fördjupning', desc:'Flera delar, förkortning och addition', make:()=>mix([BR.f1,BR.f2,BR.f3],8)},
      {name:'Utmaning', desc:'Olika nämnare och bråk i vardagen', make:()=>mix([BR.u1,BR.u2,BR.u3],8)}
    ]
  },
  '7-matte-geometri':{
    intro:[
      'Omkretsen är längden runt en figur. Du får den genom att lägga ihop alla sidor.',
      'Arean är hur stor yta figuren täcker. Den mäts i kvadratenheter, till exempel cm² eller m². En rektangel har arean längd · bredd, och en triangel har arean bas · höjd / 2.',
      'En cirkel har omkretsen π · diametern och arean π · radien · radien. π är ungefär 3,14. Diametern är sträckan rakt över cirkeln, och radien är hälften av diametern.'
    ],
    example:{title:'Exempel: En rektangel är 6 cm lång och 4 cm bred', steps:['Omkrets: 6 + 4 + 6 + 4 = 20 cm.','Area: 6 · 4 = 24 cm².','Svar: omkretsen är 20 cm och arean är 24 cm².']},
    levels:[
      {name:'Grund', desc:'Rektanglar och kvadrater', make:()=>mix([GEO.g1,GEO.g2,GEO.g3],8)},
      {name:'Fördjupning', desc:'Trianglar, parallellogrammer och en sida som saknas', make:()=>mix([GEO.f1,GEO.f2,GEO.f3],8)},
      {name:'Utmaning', desc:'Sammansatta figurer, cirklar och vardagsproblem', make:()=>mix([GEO.u1,GEO.u2,GEO.u3],8)}
    ]
  },
  '7-engelska-verbtider':{
    intro:[
      'På engelska använder du presens (present simple) för sådant som händer ofta, vanor och fakta. Med he, she, it eller ett namn får verbet ett -s: she plays, he walks.',
      'Du använder preteritum (past simple) för sådant som redan har hänt och är avslutat. Regelbundna verb får -ed: played, walked. Oregelbundna verb har egna former: go – went, see – saw.',
      'Leta efter tidsord. Every day, usually och often betyder oftast presens. Yesterday, last week och ago betyder oftast preteritum.'
    ],
    example:{title:'Exempel: Vilken form ska det vara?', steps:['Meningen är: Last Saturday I ___ (play) football.','Tidsordet är ”last Saturday”. Det har redan hänt.','Play är ett regelbundet verb, så det får -ed.','Svar: Last Saturday I played football.']},
    levels:[
      {name:'Grund', desc:'Välj rätt form med hjälp av tidsorden', make:()=>shuffle(EN_GRUND).slice(0,8).map(([s,base,sf,past,key,sig])=>{
        const ans = key==='past' ? past : key==='s' ? sf : base;
        const kind = o => o===past ? 'past' : o===sf ? 's' : 'base';
        return choiceQ({ instr:'Välj rätt form av verbet.', prompt:s, lang:'en', options:[base,sf,past], answer:ans,
          hints:[`Titta på ordet ”${sig}”. Handlar meningen om något som händer ofta, eller något som redan har hänt?`,
                 key==='past' ? 'Det har redan hänt. Hur ser verbet ut i preteritum?' : 'Det händer ofta. Vem gör något? Med he, she, it eller ett namn får verbet -s, med I, you, we och they får det inget -s.'],
          solution: fill(s, ans),
          diagnose: raw => { const k = kind(raw);
            if (key==='past') return `Ordet ”${sig}” visar att det redan har hänt. Då behövs preteritum.`;
            if (k==='past') return `Ordet ”${sig}” visar att det händer ofta, inte att det redan har hänt.`;
            if (key==='s' && k==='base') return 'Rätt tid! Men kolla vem som gör något. Med he, she, it eller ett namn får verbet -s.';
            if (key==='base' && k==='s') return 'Rätt tid! Men med I, you, we och they får verbet inget -s.';
            return null; } }); })},
      {name:'Fördjupning', desc:'Oregelbundna verb i preteritum', make:()=>shuffle(EN_FORD).slice(0,8).map(([s,base,a])=>
        textQ({ instr:'Skriv verbet i preteritum.', prompt:s, lang:'en', answer:a,
          hints:['Är verbet regelbundet eller oregelbundet? Säg meningen tyst för dig själv. Vilken form låter rätt?',`Svaret börjar på ”${a[0]}” och har ${a.length} bokstäver.`],
          solution:`${base} → ${a}: ${fill(s, a)}`,
          diagnose: raw => { const r = norm(raw);
            if (/ed$/.test(r)) return `${cap(base)} är oregelbundet, så det får inte -ed. Vilken form har du hört i meningar som ”Yesterday I …”?`;
            if (r===base || r===base+'s') return 'Det där är presens. Meningen handlar om något som redan har hänt.';
            return null; } }))},
      {name:'Utmaning', desc:'Presens eller preteritum? Plus en skrivuppgift', make:()=>shuffle(EN_UTM).slice(0,8).map(it=>
        textQ({ instr:'Skriv verbet i rätt form: presens eller preteritum.', prompt:it.s, lang:'en', answer:it.a, hints:it.h, solution:fill(it.s, it.a),
          diagnose: raw => { const r = norm(raw);
            if (it.t==='past') {
              if (r===it.base || r===it.sform) return 'Tidsordet visar att det redan har hänt. Då behövs preteritum.';
              if (/ed$/.test(r) && it.a!==it.base+'ed' && it.a!==it.base+'d') return `${cap(it.base)} är oregelbundet och får inte -ed.`;
            } else {
              if (r===it.past || /ed$/.test(r)) return 'Meningen handlar om något som händer ofta eller alltid gäller. Då behövs presens.';
              if (it.a===it.sform && r===it.base) return 'Rätt tid! Men med he, she, it eller ett namn får verbet -s.';
              if (it.a===it.base && r===it.sform) return 'Rätt tid! Men subjektet är flera, och då får verbet inget -s.';
            }
            return null; } })),
        writing:{
          task:'Skriv 5–8 meningar på engelska om vad du gjorde förra helgen. Använd preteritum (past simple).',
          check:['Har du skrivit 5–8 meningar?','Står verben i preteritum, till exempel went, played och saw?','Har du använt tidsord som first, then och after that?','Börjar varje mening med stor bokstav och slutar med punkt?'],
          focus:'Fokusera på om verben står i preteritum. Om något verb är fel, visa ett exempel ur elevens text och hur det blir rätt. Citera engelska ord på engelska.'
        }}
    ]
  },
  '7-engelska-vardagsord':{
    intro:[
      'Ett stort ordförråd gör det lättare att förstå och att säga det du vill på engelska. Du lär dig ord bäst i sammanhang, till exempel i en mening, en låt eller ett spel.',
      'Se upp för falska vänner. Det är engelska ord som liknar svenska ord men betyder något annat: gift betyder present och glass betyder glas.',
      'Öva lite ofta. Säg orden högt, skriv dem och använd dem i egna meningar.'
    ],
    example:{title:'Exempel: En falsk vän', steps:['På svenska säger man: Kan jag få en hamburgare?','Många säger fel på engelska: Can I become a hamburger?','Become betyder bli, inte få.','Rätt blir: Can I have a hamburger?']},
    levels:[
      {name:'Grund', desc:'Välj rätt ord: skolan, maten, känslor och hemmet', make:()=>shuffle(VO_ALL).slice(0,8).map(voChoice)},
      {name:'Fördjupning', desc:'Falska vänner: ord som lurar', make:()=>shuffle(FF).slice(0,8).map(ffQ)},
      {name:'Utmaning', desc:'Skriv orden själv', make:()=>shuffle(VO_ALL).slice(0,8).map(voWrite)}
    ]
  },
  '7-engelska-korta-texter':{
    text:NEW_GIRL,
    intro:[
      'När du läser på engelska behöver du inte förstå varje ord. Försök först förstå helheten, och gissa svåra ord utifrån sammanhanget.',
      'Läs frågan noga och leta sedan i texten. Svaret står ofta med andra ord än i frågan.',
      'Vissa frågor handlar om det som står i texten. Andra handlar om det du kan räkna ut, till exempel hur någon känner sig.'
    ],
    example:{title:'Exempel: Gissa ett ord utifrån sammanhanget', steps:['I en text står det: She was so exhausted that she fell asleep on the bus.','Du kanske inte kan ordet exhausted.','Men hon somnade på bussen. Då betyder exhausted förmodligen mycket trött.','Det stämmer!']},
    levels:[
      {name:'Grund', desc:'Hitta svaret i texten', make:()=>[
        ENR('Where did Maya’s family move from?',['Gothenburg','Stockholm','A small town in the north'],['Läs första stycket. Leta efter ett stadsnamn.','De flyttade från en stad till en liten ort i norr.'],'De flyttade från Gothenburg (Göteborg).'),
        ENR('What is the teacher’s name?',['Mr Patel','Leo','Mr Maya'],['Läs andra stycket.','Läraren säger ”Welcome, Maya”. Vem säger det?'],'Läraren heter Mr Patel.'),
        ENR('Who does Maya sit next to?',['Leo','Mr Patel','One of the football girls'],['Läs andra stycket igen.','Läraren säger vem hon ska sitta bredvid.'],'Hon sitter bredvid Leo.'),
        ENR('What were some girls doing during the break?',['Playing football','Playing basketball','Reading books'],['Läs tredje stycket.','Något rullade mot Maya. Vad var det?'],'Några tjejer spelade fotboll.'),
        ENR('How many goals did Maya score?',['Two','One','Three'],['Läs fjärde stycket.','Leta efter ett tal före ordet goals.'],'Hon gjorde två mål.'),
        ENR('When does the football team have training?',['On Thursdays','On Mondays','Every day'],['Läs sista stycket.','Leo berättar om träningen. Vilken dag säger han?'],'De tränar på torsdagar.')
      ]},
      {name:'Fördjupning', desc:'Läsa mellan raderna', make:()=>[
        ENR('How did Maya feel at the start of the day?',['Lonely and unsure','Happy and excited','Angry and tired'],['Maya kände ingen, och allt kändes konstigt. Hur känns det?','Strange betyder konstigt. Hon visste inte vad som väntade.'],'Hon kände sig ensam och osäker. Hon kände ingen och allt kändes konstigt.'),
        ENR('What does it tell us about Leo that he moved his pencil case?',['He is friendly and welcoming','He is very tidy','He does not want Maya there'],['Varför flyttade Leo sitt pennfack?','Han gjorde plats åt henne. Vad säger det om honom?'],'Leo gjorde plats för Maya. Det visar att han är vänlig och välkomnande.'),
        ENR('Why did the girl shout “Wow!”?',['She was impressed by Maya’s kick','The ball hit her','She was angry with Maya'],['Vad gjorde Maya med bollen?','Hon sparkade den hårt och rakt. Hur reagerar man på det?'],'Maya sparkade bollen hårt och rakt, och tjejen blev imponerad.'),
        ENR('What does “hesitated” mean in the text?',['Waited a moment before deciding','Ran very fast','Said no'],['Läs meningen igen: ”Maya hesitated for a second. Then she nodded …”','Hon väntade en sekund innan hon nickade. Vad betyder det?'],'Hesitated betyder att hon tvekade, alltså väntade ett ögonblick innan hon bestämde sig.'),
        ENR('Why did Maya smile “for the first time that day”?',['She started to feel welcome','She was happy to go home','She liked the bus'],['Vad hade hänt under dagen?','Leo bjöd in henne till träningen. Hur kändes det?'],'Hon började känna sig välkommen, eftersom hon fick spela och blev inbjuden till träningen.')
      ]},
      {name:'Utmaning', desc:'Bortom raderna och en skrivuppgift', make:()=>[
        ENR('What is the main message of the text?',['Small acts of kindness can help someone feel at home','Football is the best sport','Moving is always easy'],['Ett budskap handlar om något större än det som händer i texten.','Vad gjorde Leo och tjejerna för Maya?'],'Små vänliga handlingar kan få någon att känna sig hemma.'),
        ENR('What do you think Maya will do on Thursday?',['Go to the football training','Stay at home','Move back to Gothenburg'],['Vad bjöd Leo in henne till?','Hon log och tänkte att orten kanske inte var så dålig. Vad gör hon troligen?'],'Hon går troligen på fotbollsträningen.'),
        ENR('Which title would also fit the text?',['A Good First Day','The Lost Ball','A Rainy Holiday'],['Vad handlar hela texten om?','Hur var Mayas första dag, till slut?'],'A Good First Day passar, eftersom dagen slutade bra trots en jobbig start.')
      ],
        writing:{
          task:'Skriv 4–6 meningar på engelska: Beskriv en gång när du var ny någonstans, eller hur du kan hjälpa en ny elev att känna sig välkommen.',
          check:['Har du skrivit 4–6 meningar?','Svarar du på frågan?','Står verben i rätt tidsform, till exempel preteritum när du berättar om något som har hänt?','Börjar varje mening med stor bokstav och slutar med punkt?'],
          focus:'Fokusera på om eleven svarar på uppgiften och skriver begripliga meningar på engelska. Kommentera en eller två saker i språket, som verbformer, och visa hur det blir rätt med exempel ur elevens text. Citera engelska ord på engelska.'
        }}
    ]
  },
  '7-svenska-lasforstaelse':{
    text:STORY,
    intro:[
      'Du kan förstå en text på tre sätt. På raderna: det som står direkt i texten. Mellan raderna: det du kan räkna ut fast det inte står rakt ut. Bortom raderna: vad texten betyder och vad den vill säga.',
      'Läs hela texten en gång först. Gå sedan tillbaka till texten när du svarar. Det är inte fusk, det är så duktiga läsare gör.'
    ],
    example:{title:'Exempel: Att läsa mellan raderna', steps:['I en text står det: Hon tittade ut genom fönstret och suckade.','Det står inte att hon är uttråkad eller ledsen.','Men sucken visar att hon inte mår så bra, eller att hon längtar efter något.','Det kallas att läsa mellan raderna.']},
    levels:[
      {name:'Grund', desc:'På raderna: hitta svaret i texten', make:()=>[
        SV('Varför satt Noah på busshållplatsen?',['Han hade missat bussen.','Han väntade på en kompis.','Han skulle möta sin mamma.'],['Läs första stycket igen. Vad såg Noah försvinna runt hörnet?','Bakljusen tillhörde något som Noah ville hinna med.'],'Noah såg bussens bakljus försvinna. Han hade missat den.'),
        SV('Hur mycket batteri hade Noahs mobil kvar?',['4 procent','14 procent','40 procent'],['Läs andra stycket. Leta efter ett tal före ordet procent.','Talet är skrivet med bokstäver i texten.'],'Det står att mobilen hade fyra procent batteri.'),
        SV('Vad rullade ut över trottoaren?',['Apelsiner','Äpplen','Potatisar'],['Läs tredje stycket. Vad låg i kvinnans matkasse?','Noah hittade sju stycken, och en låg i en vattenpöl.'],'Apelsiner rullade ut när kassen gick sönder.'),
        SV('Hur länge dröjde det till nästa buss när Noah kom fram?',['En timme','En kvart','Fyrtio minuter'],['Läs slutet av första stycket.','Fyrtio minuter står också i texten, men det är hur lång tid som var kvar senare.'],'Det står att nästa buss gick om en timme.'),
        SV('Vad bjöd Margit på?',['Varm choklad','Te och bullar','Apelsinjuice'],['Läs stycket där de kommer fram till Margits hem.','Det var något varmt att dricka medan det regnade.'],'Margit bjöd på varm choklad.'),
        SV('Hur kunde Noah ringa till sin mamma?',['Han lånade Margits telefon.','Han laddade sin mobil hos Margit.','Han ringde från en telefonkiosk.'],['Noahs mobil hade slutat fungera. Vems telefon låg på bordet?','Läs stycket om den varma chokladen.'],'Margits telefon låg på bordet, och hon lät Noah ringa hem.')
      ]},
      {name:'Fördjupning', desc:'Mellan raderna: dra slutsatser', make:()=>[
        SV('Varför suckade Noah innan han började plocka upp apelsinerna?',['Han var trött och besviken, men hjälpte ändå till.','Han var arg på kvinnan för att hon tappade kassen.','Han ville inte hjälpa till och gick därifrån.'],['Hur har Noahs dag varit hittills?','Han reste sig och började plocka. Vad säger det om honom?'],'Noah hade missat bussen och mobilen var död. Sucken visar att han var trött på allt, men han hjälpte ändå till.'),
        SV('Varför tittade Noah på klockan i kyrktornet?',['Hans mobil var död, så han kunde inte se tiden på den.','Han tyckte om gamla kyrkor.','Han ville veta när kyrkan stängde.'],['Vad hände med Noahs mobil tidigare i texten?','Vad behövde han veta innan han följde med Margit?'],'Mobilen var död, så Noah använde kyrkklockan för att se hur mycket tid han hade kvar.'),
        SV('Varför gjorde Noah en paus och tittade på kvinnan när han pratade med mamma?',['Han visste inte vad hon hette.','Han ville att hon skulle prata i stället.','Han hade glömt vad han skulle säga om bussen.'],['Vad säger kvinnan direkt efter att Noah har tittat på henne?','Hon säger sitt namn. Varför behövde hon göra det?'],'Noah visste inte vad kvinnan hette. Därför säger hon ”Margit”.'),
        SV('Vad menar Noah med att det var den bästa bussen han någonsin missat?',['Att det blev något bra av att han missade bussen.','Att bussen var ny och fin.','Att han inte tycker om att åka buss.'],['Noah missade ju bussen. Vad hände efter det?','Hur kändes eftermiddagen hos Margit, jämfört med att sitta ensam och vänta?'],'Att missa bussen ledde till något bra: han hjälpte Margit och fick en fin stund.'),
        SV('Vilket ord beskriver Noah bäst i texten?',['Hjälpsam','Blyg','Slarvig'],['Vad gör Noah när kassen går sönder?','Han bär kassen hela vägen hem till Margit. Vad säger det om honom?'],'Hjälpsam. Han plockar upp apelsinerna och bär kassen trots att hans dag är jobbig.')
      ]},
      {name:'Utmaning', desc:'Bortom raderna och en skrivuppgift', make:()=>[
        SV('Vilket budskap passar bäst till texten?',['Små handlingar kan göra skillnad, även en dag när allt går fel.','Man ska alltid ladda mobilen innan man går hemifrån.','Man ska aldrig prata med människor man inte känner.'],['Ett budskap handlar om något större än just det som händer i texten. Vad kan läsaren lära sig?','Hur förändrades Noahs dag av att han hjälpte någon?'],'Budskapet är att små handlingar kan göra skillnad. Noahs dåliga dag blev bra för att han hjälpte någon.'),
        SV('Varför tror du att författaren låter det börja regna?',['Det gör läget jobbigare och visar att Noah hjälper till trots allt.','Det förklarar varför bussen var sen.','Det visar att berättelsen utspelar sig på hösten.'],['Hur påverkar regnet Noahs situation?','Om allt redan är jobbigt och Noah ändå hjälper, vad säger det om honom?'],'Regnet gör allt jobbigare. Att Noah hjälper till ändå visar vilken sorts person han är.'),
        SV('Vem berättar historien?',['En berättare som står utanför och berättar om Noah.','Noah själv, i jag-form.','Margit, i jag-form.'],['Vilka ord används om Noah i texten: han eller jag?','Det står till exempel ”Noah hade” och ”han sprang”.'],'En berättare som står utanför händelserna. Texten säger han om Noah, inte jag.')
      ],
        writing:{
          task:'Skriv 4–6 meningar: Vad tror du att Noah lärde sig den dagen? Använd minst ett exempel från texten för att visa vad du menar.',
          check:['Svarar du på frågan om vad Noah lärde sig?','Har du med minst ett exempel från texten?','Använder du ord som eftersom, därför eller till exempel för att förklara?','Börjar meningarna med stor bokstav och slutar med punkt?'],
          focus:'Fokusera på om eleven svarar på frågan och stödjer sitt svar med exempel från texten ”Sista bussen”, där Noah missar bussen, hjälper en äldre kvinna som heter Margit och till slut tycker att det var den bästa bussen han missat.'
        }}
    ]
  },
  '7-svenska-ordklasser':{
    intro:[
      'Ord delas in i ordklasser efter vad de gör i en mening. När du vet ordklassen blir det lättare att böja orden rätt och att förstå grammatik, även i andra språk.',
      'Tre vanliga ordklasser är substantiv (en bok, ett hus), verb (springer, läste) och adjektiv (glad, stor). Andra är pronomen (jag, hon), adverb (snabbt, igår) och prepositioner (på, under).',
      'Samma ord kan höra till olika ordklasser beroende på hur det används. Titta därför alltid på hela meningen.'
    ],
    example:{title:'Exempel: Vilken ordklass är ”glada”?', steps:['Meningen är: Den glada hunden skäller.','Ordet beskriver hur hunden är.','Det går att jämföra: glad, gladare, gladast.','Svar: ”glada” är ett adjektiv.']},
    levels:[
      {name:'Grund', desc:'Substantiv, verb och adjektiv', make:()=>shuffle(OK_GRUND).slice(0,8).map(x=>okQ(x,['substantiv','verb','adjektiv']))},
      {name:'Fördjupning', desc:'Pronomen, adverb och prepositioner', make:()=>shuffle(OK_FORD).slice(0,8).map(x=>okQ(x,['substantiv','verb','adjektiv','pronomen','adverb','preposition']))},
      {name:'Utmaning', desc:'Alla ordklasser och ord som lurar', make:()=>shuffle(OK_UTM).slice(0,8).map(x=>okQ(x,OK_ALL))}
    ]
  },
  '7-svenska-berattande':{
    intro:[
      'En berättelse har ofta en tydlig uppbyggnad: en inledning som presenterar vem, var och när, ett problem som sätter igång handlingen, en höjdpunkt där spänningen är som störst, och en avslutning.',
      'En bra berättelse visar känslor i stället för att bara säga dem. ”Hon bet sig i läppen och tittade ner” säger mer än ”hon var nervös”. Det kallas att gestalta.',
      'Berättelser skrivs oftast i preteritum: gick, sa, såg. Håll dig till samma tidsform hela vägen.'
    ],
    example:{title:'Exempel: Säga eller visa?', steps:['Säga: Jonas var rädd.','Visa: Jonas hjärta bultade. Han höll andan och lyssnade efter stegen.','Det andra exemplet låter läsaren känna rädslan själv.']},
    levels:[
      {name:'Grund', desc:'Berättelsens delar', make:()=>shuffle(BT_GRUND).map(f=>f())},
      {name:'Fördjupning', desc:'Gestalta, skapa spänning och välj rätt ord', make:()=>shuffle(BT_FORD).map(f=>f())},
      {name:'Utmaning', desc:'Tidsform, berättarperspektiv och en egen berättelse', make:()=>shuffle(BT_UTM).map(f=>f()),
        writing:{
          task:'Skriv en berättelse på 150–300 ord. Den ska ha en inledning, ett problem, en höjdpunkt och en avslutning. Välj själv: en dag då allt gick fel, eller en hemlighet som avslöjas.',
          check:['Har berättelsen inledning, problem, höjdpunkt och avslutning?','Visar du känslor genom vad personerna gör, och inte bara genom att säga dem?','Håller du dig till samma tidsform, oftast preteritum?','Börjar du ett nytt stycke när något nytt händer?'],
          focus:'Fokusera på berättelsens uppbyggnad (inledning, problem, höjdpunkt, avslutning) och på gestaltning. Ge ett konkret exempel ur elevens text på något som fungerar bra och ett på något som kan bli bättre, med förslag på hur.'
        }}
    ]
  }
});
