/* ==========================================================
   ELEVGUIDEN – NYA MATTEOMRÅDEN FÖR ÅRSKURS 7
   Tal, Algebra: mönster och uttryck, Statistik.
   Laddas efter ak9.js och använder hjälpfunktionerna i index.html.
   ========================================================== */

(function(){ /* Allt i en egen funktion, så att namnen inte krockar med ak-filerna */

/* ---------- MATEMATIK: TAL ---------- */
const TAL7 = {
  g1(){ const ds=shuffle([1,2,3,4,5,6,7,8,9]).slice(0,4), n=ds[0]*1000+ds[1]*100+ds[2]*10+ds[3];
    const i=rnd(0,3), d=ds[i], names=['tusentals','hundratals','tiotals','entals'], vals=[d*1000,d*100,d*10,d], ans=vals[i];
    return choiceQ({ instr:'Välj rätt värde.', prompt:`Vilket värde har siffran ${d} i talet ${numSp(n)}?`, options:vals.map(numSp), answer:numSp(ans),
      hints:['Varje plats i ett tal har ett eget värde. Räkna från höger: ental, tiotal, hundratal, tusental.',`Siffran ${d} står på ${names[i]}platsen.`],
      solution:`Siffran ${d} står på ${names[i]}platsen och är värd ${numSp(ans)}.`,
      diagnose: () => 'Räkna platserna från höger: ental, tiotal, hundratal, tusental.' }); },
  g2(){ const n=rnd(11,99), a=n/10, mult=Math.random()<.5, k=mult?pick([10,100,1000]):pick([10,100]), steps=String(k).length-1;
    const ans = mult ? n*k/10 : n/(10*k), short = mult ? n*k/100 : n/k, wrong = mult ? n/(10*k) : n*k/10;
    const w = [[wrong, mult ? `Du har delat. Gånger ${numSp(k)} gör talet större.` : `Du har gångrat. Delat med ${numSp(k)} gör talet mindre.`]];
    if (k > 10) w.push([short, `Nästan! ${numSp(k)} har ${steps} nollor, så kommat ska flyttas ${steps} steg.`]);
    return numQ({ prompt:`Räkna ut ${fmt(a)} ${mult?'·':'/'} ${numSp(k)}.`, answer:ans,
      hints:[`Blir svaret större eller mindre än ${fmt(a)}?`,`${numSp(k)} har ${steps} ${steps===1?'nolla':'nollor'}. Flytta kommat lika många steg åt ${mult?'höger':'vänster'}.`],
      solution:`Kommat flyttas ${steps} ${steps===1?'steg':'steg'} åt ${mult?'höger':'vänster'}: ${fmt(a)} ${mult?'·':'/'} ${numSp(k)} = ${fmt(ans)}`,
      wrongs:w }); },
  g3(){ const t=rnd(2,9), a=t/10, b=(10*(t-1)+rnd(1,9))/100;
    return choiceQ({ instr:'Välj det tal som är störst.', prompt:`Vilket tal är störst: ${fmt(a)} eller ${fmt(b)}?`, options:[fmt(a),fmt(b)], answer:fmt(a),
      hints:['Jämför siffrorna plats för plats. Börja med tiondelarna, alltså första siffran efter kommat.',`Du kan skriva ${fmt(a)} som ${fmt(a)}0. Jämför nu ${fmt(a)}0 och ${fmt(b)}.`],
      solution:`${fmt(a)} är ${t} tiondelar. ${fmt(b)} är bara ${t-1} tiondelar och lite till. Alltså är ${fmt(a)} störst.`,
      diagnose: () => 'Fler siffror efter kommat betyder inte att talet är större. Jämför tiondelarna först.' }); },
  g4(){ let n=rnd(101,999); while(n%10===0) n=rnd(101,999);
    const x=n/100, dec=Math.random()<.5, ans=dec?Math.round(n/10)/10:Math.round(n/100), trunc=dec?Math.floor(n/10)/10:Math.floor(n/100);
    return numQ({ prompt:`Avrunda ${fmt(x)} till ${dec?'en decimal':'närmaste heltal'}.`, answer:ans,
      hints:[dec?'Titta på andra siffran efter kommat. Den bestämmer om du avrundar uppåt eller nedåt.':'Titta på första siffran efter kommat. Den bestämmer om du avrundar uppåt eller nedåt.','Är siffran 5 eller mer avrundar du uppåt. Är den 4 eller mindre avrundar du nedåt.'],
      solution:`${fmt(x)} ≈ ${fmt(ans)}`,
      wrongs: ans !== trunc ? [[trunc,'Du har bara strukit siffrorna. Siffran efter är 5 eller mer, så du ska avrunda uppåt.']] : [[trunc+(dec?0.1:1),'Siffran efter är 4 eller mindre, så du ska avrunda nedåt.']] }); },

  f1(){ const a=-rnd(2,9), b=rnd(1,12), ans=a+b;
    return numQ({ instr:'Skriv svaret som ett tal. Minustecken skriver du med -.', prompt:`På morgonen är det ${negStr(a)} °C. Till eftermiddagen blir det ${b} grader varmare. Vilken temperatur är det då?`, answer:ans,
      hints:['Tänk dig en termometer. Åt vilket håll går du när det blir varmare?',`Börja på ${negStr(a)} och räkna ${b} steg uppåt.`],
      solution:`${negStr(a)} + ${b} = ${negStr(ans)} °C`,
      wrongs:[[-a+b,`Du räknade som om det var ${-a} plusgrader från början.`],[a-b,'Varmare betyder att temperaturen går uppåt, inte nedåt.']] }); },
  f2(){ const t=rnd(0,2); let a, b, expr, ans;
    if (t===0) { a=rnd(1,9); b=rnd(a+1,15); expr=`${a} − ${b}`; ans=a-b; }
    else if (t===1) { a=-rnd(1,9); b=rnd(1,9); expr=`${negStr(a)} − ${b}`; ans=a-b; }
    else { a=-rnd(2,12); b=rnd(1,15); expr=`${negStr(a)} + ${b}`; ans=a+b; }
    return numQ({ instr:'Skriv svaret som ett tal. Minustecken skriver du med -.', prompt:`Räkna ut ${expr}.`, answer:ans,
      hints:['Tänk dig en tallinje. Var börjar du, och åt vilket håll går du?', t===2 ? `Börja på ${negStr(a)} och gå ${b} steg åt höger.` : `Börja på ${negStr(a)} och gå ${b} steg åt vänster.`],
      solution:`${expr} = ${negStr(ans)}`,
      wrongs:[[-ans,'Rätt avstånd, men fel tecken. Hamnar du över eller under noll på tallinjen?']] }); },
  f3(){ const t=rnd(0,2), a=rnd(2,9), b=rnd(2,9), c=rnd(2,9); let expr, ans, w, h;
    if (t===0) { expr=`${a} + ${b} · ${c}`; ans=a+b*c; w=[[(a+b)*c,'Du räknade från vänster. Gånger räknas före plus.']]; h=`Börja med ${b} · ${c} = ${b*c}.`; }
    else if (t===1) { const q=b*c, s=q+rnd(1,20); expr=`${s} − ${q} / ${c}`; ans=s-b; w=[[(s-q)/c,'Du räknade från vänster. Delat räknas före minus.']]; h=`Börja med ${q} / ${c} = ${b}.`; }
    else { expr=`(${a} + ${b}) · ${c}`; ans=(a+b)*c; w=[[a+b*c,'Parentesen räknas först. Lägg ihop talen i parentesen innan du gångrar.']]; h=`Börja med parentesen: ${a} + ${b} = ${a+b}.`; }
    return numQ({ prompt:`Räkna ut ${expr}.`, answer:ans,
      hints:['I vilken ordning ska du räkna? Först parenteser, sedan gånger och delat, sist plus och minus.', h],
      solution:`${h} Sedan: ${expr} = ${ans}`, wrongs:w }); },

  u1(){ const a=rnd(2,9), b=rnd(2,9), ans=a*b/100;
    return numQ({ instr:'Skriv svaret i decimalform.', prompt:`Räkna ut ${fmt(a/10)} · ${fmt(b/10)}.`, answer:ans,
      hints:[`Räkna först ${a} · ${b}, som om det inte fanns några komman.`,`${a} · ${b} = ${a*b}. Talen har en decimal var, alltså två tillsammans. Hur många decimaler ska svaret ha?`],
      solution:`${a} · ${b} = ${a*b}. Två decimaler: ${fmt(a/10)} · ${fmt(b/10)} = ${fmt(ans)}`,
      wrongs:[[a*b/10,'Räkna decimalerna. Båda talen har en decimal, så svaret ska ha två decimaler.'],[a*b,'Glöm inte kommat. Svaret blir mindre än 1.']] }); },
  u2(){ const [d,f]=pick([[0.5,2],[0.2,5],[0.25,4],[0.1,10]]), a=rnd(2,20), ans=a*f;
    return numQ({ prompt:`Räkna ut ${a} / ${fmt(d)}.`, answer:ans,
      hints:[`Hur många gånger får ${fmt(d)} plats i 1?`,`${fmt(d)} får plats ${f} gånger i 1. Hur många gånger får det då plats i ${a}?`],
      solution:`${fmt(d)} får plats ${f} gånger i 1. ${a} / ${fmt(d)} = ${a} · ${f} = ${ans}`,
      wrongs:[[a*d,`Du har gångrat med ${fmt(d)}. När du delar med ett tal som är mindre än 1 blir svaret större.`]] }); },
  u3(){ const a=-rnd(1,6), up=rnd(4,10), down=rnd(5,14), ans=a+up-down;
    return numQ({ instr:'Skriv svaret som ett tal. Minustecken skriver du med -.', prompt:`Klockan sex på morgonen var det ${negStr(a)} °C. Till lunch steg temperaturen ${up} grader, och till kvällen sjönk den ${down} grader. Vilken temperatur var det på kvällen?`, answer:ans,
      hints:['Ta det i två steg. Vilken temperatur var det vid lunch?',`Vid lunch var det ${negStr(a+up)} °C. Gå nu ${down} grader nedåt.`],
      solution:`${negStr(a)} + ${up} = ${negStr(a+up)}. ${negStr(a+up)} − ${down} = ${negStr(ans)} °C`,
      wrongs:[[a+up+down,'Sjönk betyder att temperaturen går nedåt. Då drar du bort.'],[-ans,'Kolla tecknet. Är det över eller under noll på kvällen?']] }); },
  u4(){ const warm=rnd(1,15), cold=-rnd(3,20), c=pick([['Malmö','Kiruna'],['Göteborg','Luleå'],['Stockholm','Abisko']]), ans=warm-cold;
    return numQ({ instr:'Skriv svaret i grader, bara talet.', prompt:`En vinterdag är det ${warm} °C i ${c[0]} och ${negStr(cold)} °C i ${c[1]}. Hur många grader skiljer det?`, answer:ans,
      hints:[`Hur många grader är det från ${negStr(cold)} upp till 0?`,`Från ${negStr(cold)} till 0 är det ${-cold} grader. Från 0 till ${warm} är det ${warm} grader.`],
      solution:`${warm} − (${negStr(cold)}) = ${warm} + ${-cold} = ${ans} grader`,
      wrongs:[[Math.abs(warm+cold),'Du har räknat som om båda var plusgrader. Räkna avståndet på termometern: ner till noll och sedan vidare.']] }); }
};

/* ---------- MATEMATIK: MÖNSTER OCH UTTRYCK ---------- */
const ALG7 = {
  g1(){ const s=rnd(1,12), d=rnd(2,9), seq=[0,1,2,3].map(i=>s+i*d), ans=s+4*d;
    return numQ({ prompt:`Vilket tal kommer sedan: ${seq.join(', ')}, …?`, answer:ans,
      hints:['Hur mycket ökar talen varje gång?',`Talen ökar med ${d} varje gång. Vad är ${seq[3]} + ${d}?`],
      solution:`Talen ökar med ${d}. ${seq[3]} + ${d} = ${ans}`,
      wrongs:[[seq[3]+1,`Titta på hur mycket talen ökar. Det är ${d} varje gång, inte 1.`]] }); },
  g2(){ const a=rnd(2,9), x=rnd(2,9), ans=a*x;
    return numQ({ prompt:`Vad är värdet av ${a}x om x = ${x}?`, answer:ans,
      hints:[`${a}x betyder ${a} · x. Gångertecknet är osynligt.`,`Byt ut x mot ${x}: ${a} · ${x}.`],
      solution:`${a}x = ${a} · ${x} = ${ans}`,
      wrongs:[[Number(`${a}${x}`),`${a}x betyder ${a} gånger x. Siffrorna ska inte skrivas bredvid varandra.`],[a+x,`${a}x betyder ${a} gånger x, inte ${a} plus x.`]] }); },
  g3(){ const a=rnd(2,6), b=rnd(1,12), x=rnd(2,9), ans=a*x+b;
    return numQ({ prompt:`Vad är värdet av ${a}x + ${b} om x = ${x}?`, answer:ans,
      hints:[`Byt ut x mot ${x}. Då får du ${a} · ${x} + ${b}.`,`Räkna gånger först: ${a} · ${x} = ${a*x}. Lägg sedan till ${b}.`],
      solution:`${a} · ${x} + ${b} = ${a*x} + ${b} = ${ans}`,
      wrongs:[[a*(x+b),`Gånger räknas före plus. Räkna ${a} · ${x} först.`],[Number(`${a}${x}`)+b,`${a}x betyder ${a} gånger x.`]] }); },

  f1(){ if (Math.random()<.5) { let a=rnd(2,7), b=rnd(2,7); while(a*b===a+b) b=rnd(2,7);
      return choiceQ({ instr:'Välj det förenklade uttrycket.', prompt:`Förenkla ${a}x + ${b}x.`, options:[`${a+b}x`,`${a+b}x²`,`${a*b}x`,`${a+b}`], answer:`${a+b}x`,
        hints:[`Tänk att x är ett äpple. Hur många äpplen har du om du har ${a} och får ${b} till?`,'Termer med x läggs ihop. x:et finns kvar, men blir inte x².'],
        solution:`${a}x + ${b}x = ${a+b}x`, diagnose: () => 'Lägg ihop antalet x. Själva x:et ändras inte.' }); }
    const a=rnd(2,7), b=rnd(1,9), c=rnd(2,7);
    return choiceQ({ instr:'Välj det förenklade uttrycket.', prompt:`Förenkla ${a}x + ${b} + ${c}x.`, options:[`${a+c}x + ${b}`,`${a+b+c}x`,`${a+b+c}`,`${a}x + ${b+c}x`], answer:`${a+c}x + ${b}`,
      hints:['Vilka termer hör ihop? Termer med x läggs ihop för sig, och tal utan x för sig.',`${a}x + ${c}x = ${a+c}x. Talet ${b} har inget x och står kvar.`],
      solution:`${a}x + ${c}x = ${a+c}x, och ${b} står kvar: ${a+c}x + ${b}`,
      diagnose: () => 'Tal med x och tal utan x kan inte läggas ihop med varandra.' }); },
  f2(){ const s=rnd(3,6), d=rnd(2,5), n=pick([6,8,10,12,20]), ans=s+(n-1)*d, thing=pick(['stickor','tändstickor','kulor','rutor']);
    return numQ({ prompt:`Ett mönster växer så här: figur 1 har ${s} ${thing}, figur 2 har ${s+d} och figur 3 har ${s+2*d}. Hur många ${thing} har figur ${n}?`, answer:ans,
      hints:['Hur många fler blir det för varje ny figur?',`Det blir ${d} fler varje gång. Från figur 1 till figur ${n} är det ${n-1} steg.`],
      solution:`${s} + ${n-1} · ${d} = ${s} + ${(n-1)*d} = ${ans}`,
      wrongs:[[s*n,`Mönstret ökar med ${d} varje gång, inte med ${s}.`],[s+n*d,`Nästan! Figur 1 har redan ${s}. Från figur 1 till figur ${n} är det bara ${n-1} steg.`]] }); },
  f3(){ const p=pick([8,10,12,15,18,20,25]); let q=pick([10,12,15,20,25,30]); while(q===p) q=pick([10,12,15,20,25,30]);
    const it=pick([['glassar','en dricka'],['bullar','en mjölk'],['biljetter','ett program'],['pennor','ett block']]);
    return choiceQ({ instr:'Välj rätt uttryck.', prompt:`Du köper x ${it[0]} för ${p} kr styck och ${it[1]} för ${q} kr. Vilket uttryck visar vad du betalar totalt?`,
      options:[`${p}x + ${q}`,`${q}x + ${p}`,`${p+q}x`,`${p} + ${q} + x`], answer:`${p}x + ${q}`,
      hints:[`Vad kostar x stycken om en kostar ${p} kr?`,`x stycken kostar ${p} · x = ${p}x kr. Sedan lägger du till det du bara köper en av.`],
      solution:`${p}x kr för ${it[0]} och ${q} kr för ${it[1]}: ${p}x + ${q}`,
      diagnose: () => `Det är bara ${it[0]} som du köper x stycken av.` }); },

  u1(){ const d=rnd(2,6), m=rnd(1,8), s=d+m, seq=[1,2,3,4].map(n=>d*n+m);
    return choiceQ({ instr:'Välj rätt uttryck.', prompt:`Talföljden är ${seq.join(', ')}, … Vilket uttryck ger tal nummer n?`,
      options:[`${d}n + ${m}`,`n + ${d}`,`${s}n + ${d}`,`${d}n + ${s}`], answer:`${d}n + ${m}`,
      hints:['Hur mycket ökar talen varje gång? Det talet står framför n.',`Talen ökar med ${d}, så uttrycket börjar med ${d}n. När n = 1 blir ${d}n = ${d}. Hur mycket fattas för att få ${s}?`],
      solution:`Talen ökar med ${d}, alltså ${d}n. När n = 1 är ${d}n = ${d}, men första talet är ${s}. Lägg till ${m}: ${d}n + ${m}.`,
      diagnose: () => 'Testa uttrycket: sätt in n = 1 och n = 2. Får du de två första talen i följden?' }); },
  u2(){ const a=rnd(2,6), b=rnd(1,9), x=rnd(2,9), ans=a*(x+b);
    return numQ({ prompt:`Vad är värdet av ${a}(x + ${b}) om x = ${x}?`, answer:ans,
      hints:['Räkna parentesen först.',`${x} + ${b} = ${x+b}. Gångra sedan med ${a}.`],
      solution:`${a}(${x} + ${b}) = ${a} · ${x+b} = ${ans}`,
      wrongs:[[a*x+b,`Talet framför parentesen gäller allt inuti: både x och ${b}.`]] }); },
  u3(){ const a=rnd(2,5), b=rnd(2,6), right=`${a+1}x + ${a*b}`;
    return choiceQ({ instr:'Välj det förenklade uttrycket.', prompt:`Förenkla ${a}(x + ${b}) + x.`,
      options:[right,`${a+1}x + ${b}`,`${a}x + ${a*b+1}`,`${a+1+a*b}x`], answer:right,
      hints:['Börja med parentesen. Talet framför ska gångras med båda termerna inuti.',`${a}(x + ${b}) = ${a}x + ${a*b}. Lägg sedan ihop x-termerna.`],
      solution:`${a}(x + ${b}) + x = ${a}x + ${a*b} + x = ${right}`,
      diagnose: () => 'Kom ihåg att gångra in talet i båda termerna i parentesen, och lägg sedan ihop x-termerna.' }); }
};

/* ---------- MATEMATIK: MEDELVÄRDE, MEDIAN OCH TYPVÄRDE ---------- */
const sum = a => a.reduce((x,y)=>x+y,0);
const distinct = (n, lo, hi) => { let a; do { a=Array.from({length:n},()=>rnd(lo,hi)); } while(new Set(a).size<n); return a; };
const STAT7 = {
  g1(){ const n=pick([3,4,5]), m=rnd(4,15); let arr;
    for (;;) { arr=[]; for (let i=0;i<n-1;i++) arr.push(Math.max(0,m+rnd(-4,4))); const last=n*m-sum(arr); if (last>=Math.max(0,m-6) && last<=m+6) { arr.push(last); break; } }
    arr=shuffle(arr);
    return numQ({ prompt:`Här är ${n} elevers poäng på ett test: ${andList(arr)}. Vad är medelvärdet?`, answer:m,
      hints:['Medelvärdet räknar du ut i två steg. Vad gör du först med alla talen?',`Summan är ${n*m}. Dela den med antalet tal, ${n}.`],
      solution:`(${arr.join(' + ')}) / ${n} = ${n*m} / ${n} = ${m}`,
      wrongs:[[n*m,'Det där är summan. Dela den med antalet tal.']] }); },
  g2(){ const mode=rnd(2,15), others=shuffle([...Array(20).keys()].map(i=>i+1).filter(v=>v!==mode)).slice(0,4), arr=shuffle([mode,mode,...others]);
    return numQ({ prompt:`Så här många minuter tog det för sex elever att gå till skolan: ${andList(arr)}. Vad är typvärdet?`, answer:mode,
      hints:['Typvärdet är det värde som finns flest gånger.','Leta efter ett tal som finns mer än en gång.'],
      solution:`${mode} finns två gånger. Alla andra tal finns bara en gång. Typvärdet är ${mode}.`,
      wrongs:[[Math.max(...arr),'Typvärdet är inte det största talet, utan det tal som finns flest gånger.']] }); },
  g3(){ const n=pick([5,7]), arr=shuffle(distinct(n,1,30)), sorted=arr.slice().sort((a,b)=>a-b), ans=sorted[(n-1)/2], mid=arr[(n-1)/2];
    return numQ({ prompt:`Här är resultaten från ett test: ${andList(arr)}. Vad är medianen?`, answer:ans,
      hints:['Medianen är talet i mitten. Men först måste talen stå i storleksordning.',`I storleksordning: ${sorted.join(', ')}. Vilket tal står i mitten?`],
      solution:`I storleksordning: ${sorted.join(', ')}. Talet i mitten är ${ans}.`,
      wrongs: mid!==ans ? [[mid,'Du tog talet i mitten innan talen var sorterade. Sortera dem från minst till störst först.']] : [] }); },

  f1(){ const arr=shuffle(distinct(6,1,40)), s=arr.slice().sort((a,b)=>a-b), ans=(s[2]+s[3])/2;
    return numQ({ prompt:`Sex kompisar räknade hur många sms de skickade under en dag: ${andList(arr)}. Vad är medianen?`, answer:ans,
      hints:['Sortera talen först. När antalet tal är jämnt finns det två tal i mitten.',`I ordning: ${s.join(', ')}. De två talen i mitten är ${s[2]} och ${s[3]}. Vad ligger mitt emellan dem?`],
      solution:`I ordning: ${s.join(', ')}. (${s[2]} + ${s[3]}) / 2 = ${fmt(ans)}`,
      wrongs:[[s[2],'Det finns två tal i mitten när antalet är jämnt. Räkna ut medelvärdet av dem.'],[s[3],'Det finns två tal i mitten när antalet är jämnt. Räkna ut medelvärdet av dem.'],[(arr[2]+arr[3])/2,'Sortera talen innan du letar efter mitten.']] }); },
  f2(){ const arr=distinct(6,5,60), mx=Math.max(...arr), mn=Math.min(...arr);
    return numQ({ prompt:`Sex kompisar fick så här mycket i veckopeng, i kronor: ${andList(arr)}. Vad är variationsbredden?`, answer:mx-mn,
      hints:['Variationsbredden visar hur stor skillnad det är mellan det största och det minsta värdet.',`Det största värdet är ${mx} och det minsta är ${mn}.`],
      solution:`${mx} − ${mn} = ${mx-mn}`,
      wrongs:[[mx,'Det där är det största värdet. Dra bort det minsta.'],[mx+mn,'Variationsbredden är skillnaden, inte summan.']] }); },
  f3(){ const arr=Array.from({length:4},()=>rnd(6,22)), s=sum(arr), ans=s/4;
    return numQ({ instr:'Skriv svaret som ett tal. Det kan bli ett decimaltal.', prompt:`Temperaturen klockan tolv under fyra dagar var ${andList(arr)} °C. Vad var medeltemperaturen?`, answer:ans,
      hints:['Lägg ihop alla temperaturerna först.',`Summan är ${s}. Dela med antalet dagar, 4.`],
      solution:`(${arr.join(' + ')}) / 4 = ${s} / 4 = ${fmt(ans)} °C`,
      wrongs:[[s,'Det där är summan. Dela med antalet dagar.'],[s/3,'Det var fyra dagar. Dela med 4.']] }); },

  u1(){ const n=pick([4,5]), m=rnd(6,15); let arr, last;
    do { arr=Array.from({length:n-1},()=>rnd(m-5,m+5)); last=n*m-sum(arr); } while(last<1 || last>m+10);
    return numQ({ prompt:`Medelvärdet av ${n} tal är ${m}. ${n===4?'Tre':'Fyra'} av talen är ${andList(arr)}. Vilket är det ${n===4?'fjärde':'femte'} talet?`, answer:last,
      hints:[`Om medelvärdet är ${m} och det finns ${n} tal, vad måste summan av alla talen vara?`,`Summan ska vara ${n} · ${m} = ${n*m}. De tal du vet är tillsammans ${sum(arr)}.`],
      solution:`${n} · ${m} = ${n*m}. ${n*m} − ${sum(arr)} = ${last}`,
      wrongs:[[m,'Det sista talet behöver inte vara lika med medelvärdet. Räkna ut vad summan måste vara.'],[n*m,'Det där är summan av alla talen. Dra bort de tal du redan vet.']] }); },
  u2(){ const base=pick([40,50,60,80,100]), big=base*pick([20,30,40]), arr=shuffle([base-10,base,base+10,base+20,big]), mean=(5*base+20+big)/5;
    return choiceQ({ instr:'Välj det svar som passar bäst.', prompt:`Fem kompisar får så här mycket i veckopeng: ${andList(arr)} kr. Vilket mått beskriver bäst vad en typisk kompis får?`,
      options:['Medianen','Medelvärdet','Variationsbredden'], answer:'Medianen',
      hints:['Ett av beloppen är mycket större än de andra. Hur påverkar det medelvärdet?','Medelvärdet dras upp av det stora beloppet. Medianen bryr sig bara om talet i mitten.'],
      solution:`Medianen är ${base+10} kr. Medelvärdet blir ${fmt(mean)} kr, eftersom ett belopp är så stort, och det säger inte vad en typisk kompis får.`,
      diagnose: raw => raw==='Medelvärdet' ? `Medelvärdet blir ${fmt(mean)} kr, för att ett av beloppen är så stort. Är det typiskt?` : 'Variationsbredden är inget lägesmått. Den visar hur utspridda värdena är.' }); },
  u3(){ const n=rnd(3,5), m1=rnd(10,18), m2=m1+rnd(1,3), ans=(n+1)*m2-n*m1;
    return numQ({ instr:'Skriv svaret i poäng, bara talet.', prompt:`Du har skrivit ${n} prov och har medelvärdet ${m1} poäng. Efter ett prov till har du medelvärdet ${m2} poäng. Hur många poäng fick du på det senaste provet?`, answer:ans,
      hints:[`Vad är summan av poängen på de första ${n} proven?`,`Först: ${n} · ${m1} = ${n*m1} poäng. Efter ${n+1} prov: ${n+1} · ${m2} = ${(n+1)*m2} poäng.`],
      solution:`${(n+1)*m2} − ${n*m1} = ${ans} poäng`,
      wrongs:[[m2,`Det nya provet måste vara högre än ${m2} för att dra upp medelvärdet.`],[2*m2-m1,'Ett prov påverkar medelvärdet mer än så. Räkna med summor istället.']] }); }
};

/* ---------- NYA OMRÅDEN I ÅRSKURS 7 ---------- */
Object.assign(CONTENT, {
  '7-matte-tal':{
    intro:[
      'Alla tal är byggda av siffror på olika platser: tusental, hundratal, tiotal, ental och, efter kommat, tiondelar och hundradelar. Platsen bestämmer hur mycket siffran är värd.',
      'När du gångrar med 10, 100 eller 1 000 flyttas kommat åt höger, ett steg för varje nolla. När du delar flyttas det åt vänster.',
      'Negativa tal är tal under noll, som −5 °C. Tänk på en tallinje: plus går åt höger och minus åt vänster. När du räknar med flera räknesätt gäller en ordning: parenteser först, sedan gånger och delat, sist plus och minus.'
    ],
    example:{title:'Exempel: Räkna ut 4 + 3 · 5', steps:['Gånger räknas före plus.','3 · 5 = 15.','4 + 15 = 19.','Svar: 19, inte 35.']},
    levels:[
      {name:'Grund', desc:'Siffrans värde, decimaltal och avrundning', make:()=>mix([TAL7.g1,TAL7.g2,TAL7.g3,TAL7.g4],8)},
      {name:'Fördjupning', desc:'Negativa tal och räkneordning', make:()=>mix([TAL7.f1,TAL7.f2,TAL7.f3],8)},
      {name:'Utmaning', desc:'Räkna med decimaltal och negativa tal i vardagen', make:()=>mix([TAL7.u1,TAL7.u2,TAL7.u3,TAL7.u4],8)}
    ]
  },
  '7-matte-monster':{
    intro:[
      'Algebra är matte med bokstäver. En bokstav, som x, står för ett tal som du inte vet eller som kan ändras.',
      '3x betyder 3 · x. Gångertecknet skrivs inte ut. Om x = 4 är 3x = 3 · 4 = 12.',
      'Ett mönster växer på ett bestämt sätt. Om du hittar hur mycket det ökar varje gång kan du skriva ett uttryck som gäller för alla figurer, till exempel 3n + 1.'
    ],
    example:{title:'Exempel: Vad är 2x + 5 om x = 3?', steps:['Byt ut x mot 3: 2 · 3 + 5.','Gånger först: 2 · 3 = 6.','6 + 5 = 11.','Svar: 11.']},
    levels:[
      {name:'Grund', desc:'Talföljder och värdet av uttryck', make:()=>mix([ALG7.g1,ALG7.g2,ALG7.g3],8)},
      {name:'Fördjupning', desc:'Förenkla uttryck och växande mönster', make:()=>mix([ALG7.f1,ALG7.f2,ALG7.f3],8)},
      {name:'Utmaning', desc:'Skriv en formel och räkna med parenteser', make:()=>mix([ALG7.u1,ALG7.u2,ALG7.u3],8)}
    ]
  },
  '7-matte-medelvarde':{
    intro:[
      'Lägesmått berättar vad som är typiskt i en samling värden. De tre vanligaste är medelvärde, median och typvärde.',
      'Medelvärdet får du om du lägger ihop alla värden och delar med antalet. Medianen är värdet i mitten när alla står i storleksordning. Typvärdet är det värde som finns flest gånger.',
      'Variationsbredden är skillnaden mellan det största och det minsta värdet. Den visar hur utspridda värdena är.'
    ],
    example:{title:'Exempel: Värdena 3, 8, 4, 8, 7', steps:['Medelvärde: (3 + 8 + 4 + 8 + 7) / 5 = 30 / 5 = 6.','Median: i ordning 3, 4, 7, 8, 8. Talet i mitten är 7.','Typvärde: 8 finns två gånger.','Variationsbredd: 8 − 3 = 5.']},
    levels:[
      {name:'Grund', desc:'Medelvärde, typvärde och median', make:()=>mix([STAT7.g1,STAT7.g2,STAT7.g3],8)},
      {name:'Fördjupning', desc:'Median med två tal i mitten och variationsbredd', make:()=>mix([STAT7.f1,STAT7.f2,STAT7.f3],8)},
      {name:'Utmaning', desc:'Tal som saknas och vilket mått som passar bäst', make:()=>mix([STAT7.u1,STAT7.u2,STAT7.u3],8)}
    ]
  }
});
})();
