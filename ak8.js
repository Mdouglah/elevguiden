/* ==========================================================
   ELEVGUIDEN – INNEHÅLL FÖR ÅRSKURS 8
   Laddas av index.html och använder hjälpfunktionerna där.
   ========================================================== */

/* Kopplar en text till en fråga, så att texten visas även i
   nivåtestet. Används i källkritikens utmaning. */
function withText(q, t){ Object.defineProperty(q, 'text', { value:t, writable:false, enumerable:true }); return q; }

/* ---------- MATEMATIK: ALGEBRA OCH UTTRYCK ---------- */
const AL_WORDS = [
  ['tre gånger ett tal x','3x',['x + 3','x/3']],
  ['ett tal x minskat med 7','x − 7',['7 − x','7x']],
  ['hälften av ett tal x','x/2',['2x','x − 2']],
  ['ett tal x ökat med 5','x + 5',['5x','x − 5']],
  ['dubbelt så mycket som x, plus 1','2x + 1',['2(x + 1)','x + 2']],
  ['x gånger x','x²',['2x','x + x']],
  ['4 mindre än dubbla x','2x − 4',['4 − 2x','2(x − 4)']]
];
const AL = {
  g1(){ const a=rnd(2,9), b=rnd(1,15), x=rnd(1,10);
    return numQ({ prompt:`Vad är värdet av ${a}x + ${b} när x = ${x}?`, answer:a*x+b,
    hints:[`${a}x betyder ${a} gånger x. Byt ut x mot ${x}.`,`${a} · ${x} = ${a*x}. Lägg sedan till ${b}.`],
    solution:`${a} · ${x} + ${b} = ${a*x} + ${b} = ${a*x+b}`,
    wrongs:[[a+x+b,`${a}x betyder ${a} gånger x, inte ${a} plus x.`],[a*(x+b),`Räkna gånger först: ${a} · ${x}. Lägg sedan till ${b}.`]] }); },
  g2(){ const [txt,ans,w]=pick(AL_WORDS);
    return choiceQ({ instr:'Välj det uttryck som stämmer.', prompt:`Vilket uttryck betyder: ${txt}?`, options:[ans,...w], answer:ans,
    hints:['Översätt orden ett i taget. Ökat med betyder plus, minskat med betyder minus och gånger betyder multiplikation.','Kontrollera ordningen. ”Ett tal x minskat med 7” betyder att 7 dras bort från x.'],
    solution:`${cap(txt)} skrivs ${ans}.`,
    diagnose: () => 'Läs orden igen och översätt dem ett i taget till matematik.' }); },
  g3(){ let a=rnd(2,9), b=rnd(2,9); if (a+b===a*b) b++;
    return choiceQ({ instr:'Välj det förenklade uttrycket.', prompt:`Förenkla: ${a}x + ${b}x`, options:[`${a+b}x`,`${a*b}x`,`${a+b}x²`], answer:`${a+b}x`,
    hints:[`Tänk på x som en sak, till exempel äpplen. ${a} äpplen plus ${b} äpplen blir?`,'Termer med x kan läggas ihop. Själva x:et ändras inte.'],
    solution:`${a}x + ${b}x = ${a+b}x`,
    diagnose: raw => raw.includes('²') ? 'När du lägger ihop x-termer blir det inte x². Det blir x² bara när du gångrar x med x.' : 'Du ska lägga ihop, inte gånga. Det är plus mellan termerna.' }); },

  f1(){ const a=rnd(2,7), b=rnd(1,9), c=rnd(2,7), d=rnd(1,9), ok=`${a+c}x + ${b+d}`;
    return choiceQ({ instr:'Välj det förenklade uttrycket.', prompt:`Förenkla: ${a}x + ${b} + ${c}x + ${d}`, options:[ok,`${a+b+c+d}x`,`${a+c}x + ${b+d}x`], answer:ok,
    hints:['Lägg ihop det som hör ihop: x-termer för sig och vanliga tal för sig.',`x-termerna: ${a}x + ${c}x. Talen: ${b} + ${d}.`],
    solution:`${a}x + ${c}x = ${a+c}x och ${b} + ${d} = ${b+d}. Svar: ${ok}`,
    diagnose: () => 'Termer med x och vanliga tal kan inte läggas ihop med varandra. Lägg ihop dem var för sig.' }); },
  f2(){ let p, q, a, b, v; do { p=rnd(2,6); q=rnd(2,4); a=rnd(2,8); b=rnd(1,6); v=p*a-q*b; } while (v <= 0);
    return numQ({ prompt:`Vad är värdet av ${p}a − ${q}b när a = ${a} och b = ${b}?`, answer:v,
    hints:['Byt ut a och b mot talen. Räkna gånger före minus.',`${p} · ${a} = ${p*a} och ${q} · ${b} = ${q*b}.`],
    solution:`${p} · ${a} − ${q} · ${b} = ${p*a} − ${q*b} = ${v}`,
    wrongs:[[p*a+q*b,'Det är minus mellan termerna, inte plus.'],[p+a-q-b,`Bokstäverna betyder gånger: ${p}a är ${p} gånger a.`]] }); },
  f3(){ const k=rnd(2,6), n=rnd(1,9), ok=`${k}x + ${k*n}`;
    return choiceQ({ instr:'Välj det rätta svaret.', prompt:`Multiplicera in: ${k}(x + ${n})`, options:[ok,`${k}x + ${n}`,`x + ${k*n}`], answer:ok,
    hints:['Talet framför parentesen ska gångas med allt som står inuti.',`${k} · x = ${k}x och ${k} · ${n} = ${k*n}.`],
    solution:`${k} · x + ${k} · ${n} = ${ok}`,
    diagnose: () => `${k} ska gångas med båda termerna i parentesen, både x och ${n}.` }); },

  u1(){ const a=rnd(4,9), b=rnd(1,a-1), c=rnd(1,9), ok=`${cx(a-b)} − ${c}`;
    return choiceQ({ instr:'Välj det förenklade uttrycket.', prompt:`Förenkla: ${a}x − (${cx(b)} + ${c})`, options:[ok,`${cx(a-b)} + ${c}`,`${a+b}x + ${c}`], answer:ok,
    hints:['Ett minustecken framför en parentes ändrar tecknet på allt inuti parentesen.',`Det blir ${a}x − ${cx(b)} − ${c}. Förenkla sedan.`],
    solution:`${a}x − ${cx(b)} − ${c} = ${ok}`,
    diagnose: () => `Minustecknet gäller båda termerna i parentesen. Både ${cx(b)} och ${c} ska dras bort.` }); },
  u2(){ const k=rnd(2,5), m=rnd(1,4); let n=rnd(1,7); while (gcd(m,n)!==1) n=rnd(1,7);
    const ok=`${k}(${cx(m)} + ${n})`;
    return choiceQ({ instr:'Välj det rätta svaret.', prompt:`Bryt ut den största gemensamma faktorn: ${cx(k*m)} + ${k*n}`, options:[ok,`${k}(${cx(m)} + ${k*n})`,`${cx(k*m)}(1 + ${n})`], answer:ok,
    hints:[`Vilket är det största tal som både ${k*m} och ${k*n} går att dela med?`,`Båda går att dela med ${k}. Vad blir kvar i parentesen?`],
    solution:`${cx(k*m)} + ${k*n} = ${k} · ${cx(m)} + ${k} · ${n} = ${ok}`,
    diagnose: () => `Kontrollera genom att multiplicera in igen. Det ska bli ${cx(k*m)} + ${k*n}.` }); },
  u3(){ const s=pick([40,50,60]), p=pick([12,15,20]), km=rnd(3,15);
    return numQ({ instr:'Skriv svaret i kronor, bara talet.', prompt:`En taxi kostar ${s} kr i startavgift och ${p} kr per kilometer. Priset kan skrivas som ${p}x + ${s}, där x är antalet kilometer. Vad kostar en resa på ${km} km?`, answer:p*km+s,
    hints:['Byt ut x mot antalet kilometer.',`Räkna ${p} · ${km} + ${s}.`],
    solution:`${p} · ${km} + ${s} = ${p*km} + ${s} = ${p*km+s} kr`,
    wrongs:[[p*km,'Du glömde startavgiften.'],[(p+s)*km,'Startavgiften betalas bara en gång, inte för varje kilometer.']] }); }
};

/* ---------- MATEMATIK: STATISTIK ---------- */
const stList = (n, a=1, b=20) => Array.from({length:n}, () => rnd(a,b));
const sorted = v => v.slice().sort((x,y) => x-y);
const sum = v => v.reduce((s,x) => s+x, 0);
const ST_CONC = [
  ['Fem personer tjänar 20 000, 21 000, 22 000, 23 000 och 200 000 kr i månaden. Vilket lägesmått ger bäst bild av en typisk lön?',['Medianen','Medelvärdet','Variationsbredden'],
    ['En av lönerna är mycket högre än de andra. Hur påverkar den medelvärdet?','Medianen påverkas inte av ett enstaka extremt värde.'],'Medianen, 22 000 kr, ger bäst bild. Medelvärdet dras upp av den mycket höga lönen.'],
  ['Vilket mått berättar hur utspridda värdena är?',['Variationsbredden','Medelvärdet','Typvärdet'],
    ['Vilket mått jämför det största och det minsta värdet?','Variationsbredden är största minus minsta värdet.'],'Variationsbredden visar hur utspridda värdena är.'],
  ['En skoaffär vill veta vilken skostorlek den ska köpa in flest av. Vilket mått passar bäst?',['Typvärdet','Medelvärdet','Medianen'],
    ['Affären vill veta vilken storlek som är vanligast.','Typvärdet är det vanligaste värdet.'],'Typvärdet visar vilken storlek som är vanligast.'],
  ['I ett stapeldiagram börjar y-axeln på 90 i stället för på 0. Vad kan hända?',['Små skillnader ser mycket större ut än de är','Diagrammet blir mer exakt','Ingenting, det spelar ingen roll'],
    ['Tänk dig två staplar med värdena 92 och 96. Hur ser de ut om axeln börjar på 90?','Den ena stapeln ser ut att vara mer än dubbelt så hög.'],'Om axeln inte börjar på 0 kan små skillnader se stora ut. Det kan vilseleda läsaren.']
];
const ST = {
  g1(){ const v4=stList(4); let x=rnd(1,20); while ((sum(v4)+x) % 5) x++; const v=shuffle([...v4, x]), s=sum(v), med=sorted(v)[2];
    const ctx=pick(['Fem elever läste så här många sidor i en bok:','Fem kompisar gjorde så här många mål under en säsong:','En kiosk sålde så här många glassar fem dagar i rad:']);
    return numQ({ prompt:`${ctx} ${v.join(', ')}. Vad är medelvärdet?`, answer:s/5,
    hints:['Medelvärdet får du genom att lägga ihop alla värden och dela med antalet värden.',`Summan är ${s}. Hur många värden finns det?`],
    solution:`${v.join(' + ')} = ${s}. ${s} / 5 = ${s/5}`,
    wrongs:[[s,'Det där är summan. Dela med antalet värden, 5.'],[med,'Det där är medianen, alltså mittenvärdet. Medelvärdet är summan delat med antalet.']] }); },
  g2(){ const n=pick([5,7]), v=stList(n), s=sorted(v), mid=(n-1)/2;
    return numQ({ prompt:`Här är några elevers poäng på ett prov: ${v.join(', ')}. Vad är medianen?`, answer:s[mid],
    hints:['Medianen är värdet i mitten när talen står i storleksordning.',`I ordning: ${s.join(', ')}. Vilket tal står i mitten?`],
    solution:`I ordning: ${s.join(', ')}. Mittenvärdet är ${s[mid]}.`,
    wrongs:[[v[mid],'Du tog talet i mitten utan att sortera. Ordna talen i storleksordning först.'],[sum(v)/n,'Det där är medelvärdet. Medianen är värdet i mitten.']] }); },
  g3(){ const m=rnd(36,43), rest=shuffle([35,36,37,38,39,40,41,42,43,44].filter(x => x!==m)), o1=rest[0];
    const v=shuffle([m,m,m,o1,o1,rest[1],rest[2]]);
    return numQ({ prompt:`Eleverna i en grupp har de här skostorlekarna: ${v.join(', ')}. Vad är typvärdet?`, answer:m,
    hints:['Typvärdet är det värde som förekommer flest gånger.','Räkna hur många gånger varje storlek finns.'],
    solution:`${m} finns tre gånger, fler gånger än något annat värde.`,
    wrongs:[[Math.max(...v),'Det där är det största värdet. Typvärdet är det vanligaste värdet.'],[o1,'Det värdet finns två gånger. Finns det något värde som finns ännu fler gånger?']] }); },

  f1(){ const v=stList(7, 8, 25), mx=Math.max(...v), mn=Math.min(...v);
    return numQ({ prompt:`Temperaturen i grader var så här under en vecka: ${v.join(', ')}. Vad är variationsbredden?`, answer:mx-mn,
    hints:['Variationsbredden visar hur utspridda värdena är.','Ta det största värdet minus det minsta.'],
    solution:`Största värdet är ${mx} och minsta är ${mn}. ${mx} − ${mn} = ${mx-mn}`,
    wrongs:[[mx,'Det där är det största värdet. Variationsbredden är största minus minsta värdet.'],[mx+mn,'Du lade ihop. Variationsbredden är största minus minsta värdet.']] }); },
  f2(){ const v=stList(6), s=sorted(v), ans=(s[2]+s[3])/2;
    return numQ({ prompt:`Sex lag fick så här många poäng i en turnering: ${v.join(', ')}. Vad är medianen?`, answer:ans,
    hints:['Ordna talen. När antalet värden är jämnt finns det två tal i mitten.',`I ordning: ${s.join(', ')}. Vilket tal ligger mitt emellan ${s[2]} och ${s[3]}?`],
    solution:`I ordning: ${s.join(', ')}. (${s[2]} + ${s[3]}) / 2 = ${fmt(ans)}`,
    wrongs:[[s[2],'Det finns två tal i mitten. Medianen ligger mitt emellan dem.'],[s[3],'Det finns två tal i mitten. Medianen ligger mitt emellan dem.']] }); },
  f3(){ const c1=rnd(2,8), v1=rnd(3,6), c2=rnd(2,8), v2=v1+rnd(1,4), tot=c1*v1+c2*v2, n=c1+c2;
    return numQ({ prompt:`På ett prov fick ${c1} elever ${v1} poäng och ${c2} elever ${v2} poäng. Vad är medelvärdet? Avrunda till två decimaler om det behövs.`, answer:tot/n,
    hints:['Räkna först ut hur många poäng alla elever fick tillsammans.',`${c1} · ${v1} + ${c2} · ${v2} = ${tot}. Dela med antalet elever, ${n}.`],
    solution:`${c1} · ${v1} + ${c2} · ${v2} = ${tot}. ${tot} / ${n} ≈ ${fmt(Math.round(tot/n*100)/100)}`,
    wrongs:[[(v1+v2)/2,'Du tog medelvärdet av poängen utan att räkna med hur många elever som fick varje poäng.']] }); },

  u1(){ const four=stList(4), s4=sum(four); let five=rnd(2,20); while ((s4+five) % 5) five++; const m=(s4+five)/5;
    return numQ({ prompt:`Medelvärdet av fem tal är ${m}. Fyra av talen är ${four.join(', ')}. Vilket är det femte talet?`, answer:five,
    hints:[`Om medelvärdet av fem tal är ${m}, vad är då summan av alla fem?`,`Summan är ${5*m}. Dra bort de fyra kända talen.`],
    solution:`5 · ${m} = ${5*m}. ${5*m} − ${s4} = ${five}`,
    wrongs:[[m,'Det där är medelvärdet. Räkna först ut summan av alla fem tal.'],[5*m,'Det där är summan av alla fem tal. Dra bort de fyra kända.']] }); },
  u2(){ const T=pick([20,25,40,50]), k=T===40 ? 2*rnd(1,19) : rnd(1,T-1);
    const act=pick(['åker buss till skolan','har ett husdjur','spelar ett instrument','tränar i en förening']);
    return numQ({ instr:'Skriv svaret i procent, bara talet.', prompt:`I en enkät svarade ${T} elever. ${k} av dem ${act}. Hur många procent är det?`, answer:100*k/T,
    hints:['Hur stor del av alla är det? Skriv det som en division.',`${k} / ${T} = ${fmt(k/T)}. Hur gör du om det till procent?`],
    solution:`${k} / ${T} = ${fmt(k/T)} = ${100*k/T} %`,
    wrongs:[[k,'Det där är antalet elever. Räkna ut hur stor del av alla det är.'],[k/T,'Rätt uträkning! Gör nu om decimaltalet till procent genom att gånga med 100.']] }); },
  u3(){ const [p,o,h,s]=pick(ST_CONC);
    return choiceQ({ instr:'Välj det svar som stämmer bäst.', prompt:p, options:o, answer:o[0], hints:h, solution:s, diagnose: () => h[1] }); }
};

/* ---------- ENGELSKA: FLER VERBTIDER ---------- */
const EN8_GRUND = [
  ['Look! It ___ outside.','is snowing','snows','snowed','Look!','cont'],
  ['Be quiet! The baby ___ in the next room.','is sleeping','sleeps','slept','Be quiet!','cont'],
  ['She ___ to school every day.','walks','is walking','walked','every day','simple'],
  ['Right now I ___ my homework.','am doing','do','did','right now','cont'],
  ['We usually ___ dinner at six.','eat','are eating','ate','usually','simple'],
  ['Listen! Someone ___ the piano.','is playing','plays','played','Listen!','cont'],
  ['My dad ___ coffee every morning.','drinks','is drinking','drank','every morning','simple'],
  ['At the moment they ___ a film.','are watching','watch','watched','at the moment','cont'],
  ['He often ___ his bike to school.','rides','is riding','rode','often','simple'],
  ['Hurry up! The bus ___ now.','is coming','comes','came','now','cont']
];
const EN8_FORD = [
  ['We ___ the film yesterday.','saw','have seen','see','yesterday','past'],
  ['She ___ here since 2020.','has lived','lived','lives','since','perf'],
  ["I ___ my homework yet.","haven't finished","didn't finish","don't finish",'yet','perf'],
  ['They ___ to Spain last summer.','went','have gone','go','last summer','past'],
  ['He has already ___ lunch.','eaten','ate','eat','has','part'],
  ['I ___ him two days ago.','met','have met','meet','ago','past'],
  ['We ___ each other for five years.','have known','knew','know','for five years','perf'],
  ['Have you ever ___ a horse?','ridden','rode','ride','Have','part'],
  ['My sister ___ her phone last week.','broke','has broken','breaks','last week','past'],
  ['I have just ___ an email to my teacher.','written','wrote','write','have','part']
];
const EN8_UTM = [
  {s:'Right now my brother ___ (sleep).', a:'is sleeping', acc:["'s sleeping"], h:['Vilka ord visar när det händer?','Det händer just nu. Använd is + verbet med -ing.']},
  {s:'I ___ (live) here since I was five.', a:'have lived', acc:["'ve lived"], h:['Ordet since visar att något har pågått fram till nu.','Använd have + verbets tredje form. Live är regelbundet.']},
  {s:'Yesterday we ___ (buy) a new sofa.', a:'bought', acc:[], h:['Vilket ord visar när det hände?','Buy är oregelbundet. Svaret börjar på ”b” och har sex bokstäver.']},
  {s:'She has never ___ (see) snow.', a:'seen', acc:[], h:['Vilket ord står före luckan?','Efter has kommer verbets tredje form: see, saw, …?']},
  {s:'Every weekend they ___ (visit) their grandparents.', a:'visit', acc:[], h:['Vilka ord visar hur ofta det händer?','Det är en vana, och subjektet är they. Får verbet -s då?']},
  {s:'Listen! The birds ___ (sing).', a:'are singing', acc:["'re singing"], h:['Vad säger ordet Listen! om när det händer?','Det händer just nu, och subjektet är flera. Använd are + verbet med -ing.']},
  {s:'He ___ (lose) his wallet last Friday.', a:'lost', acc:[], h:['Vilket ord visar när det hände?','Lose är oregelbundet. Svaret har fyra bokstäver.']},
  {s:'We have ___ (know) each other for years.', a:'known', acc:[], h:['Vilket ord står före luckan?','Efter have kommer verbets tredje form: know, knew, …?']},
  {s:'At the moment she ___ (read) a book.', a:'is reading', acc:["'s reading"], h:['Vad betyder at the moment?','Det händer just nu. Använd is + verbet med -ing.']},
  {s:'Have you ___ (finish) your homework yet?', a:'finished', acc:[], h:['Vilket ord står i början av frågan?','Efter have kommer verbets tredje form. Finish är regelbundet.']}
];

/* ---------- ENGELSKA: LÄSA FAKTATEXT ---------- */
const SLEEP = {
  title:'Why Do We Need Sleep?', lang:'en',
  paras:[
    'We spend about a third of our lives asleep. For a long time, scientists thought that sleep was simply a time when the body and the brain rested. Today we know that the brain is very busy while we sleep.',
    'One of the most important jobs of sleep is to help us remember. During the day, we take in a lot of new information. At night, the brain sorts this information and stores the most important parts. This is why a good night’s sleep before a test can be more useful than studying late.',
    'Sleep is also important for our feelings. People who sleep too little often feel irritated or sad, and they find it harder to concentrate. Over time, lack of sleep can also make it easier to get ill.',
    'Teenagers need about eight to ten hours of sleep every night. But during the teenage years, the body’s inner clock changes. Many teenagers do not feel tired until late in the evening, which makes it hard to get up early for school.',
    'There are some simple ways to sleep better. Try to go to bed at the same time every night, even at weekends. Put your phone away an hour before bedtime, because the light from screens can make it harder to fall asleep. And keep your bedroom dark, quiet and cool.'
  ]
};
const FR = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som stämmer bäst med texten.', prompt, lang:'en', options, answer:options[0], hints, solution,
  diagnose: () => `Det svaret får inte stöd i texten. ${hints[0]}` });
const FR_GRUND = [
  ['According to the text, how much of our lives do we spend asleep?',['About a third','About half','About a quarter'],['Läs första stycket.','A third betyder en tredjedel.'],'Vi sover ungefär en tredjedel av livet.'],
  ['What does the brain do with new information at night?',['It sorts it and stores the most important parts','It deletes all of it','It sends it to the muscles'],['Läs andra stycket.','Leta efter orden sorts och stores.'],'Hjärnan sorterar informationen och sparar det viktigaste.'],
  ['How many hours of sleep do teenagers need?',['About eight to ten hours','About five to six hours','About twelve hours'],['Läs fjärde stycket.','Leta efter ett antal timmar.'],'Tonåringar behöver ungefär åtta till tio timmars sömn.'],
  ['Why should you put your phone away before bedtime?',['The light from screens can make it harder to fall asleep','The phone needs to charge','Phones are too loud at night'],['Läs sista stycket.','Leta efter ordet light.'],'Ljuset från skärmen kan göra det svårare att somna.'],
  ['What should a bedroom be like for good sleep?',['Dark, quiet and cool','Light and warm','Bright and noisy'],['Läs sista meningen i texten.','Dark, quiet och cool betyder mörkt, tyst och svalt.'],'Sovrummet ska vara mörkt, tyst och svalt.'],
  ['What often happens to people who sleep too little?',['They feel irritated or sad','They grow taller','They remember more'],['Läs tredje stycket.','Irritated betyder irriterad.'],'De blir ofta irriterade eller ledsna och har svårt att koncentrera sig.']
];
const FR_FORD = [
  ['What is the main purpose of the text?',['To inform the reader about sleep','To tell an exciting story','To sell a new bed'],['Vad vill texten att läsaren ska få veta?','Inform betyder informera.'],'Texten vill informera om sömn.'],
  ['Why might studying late the night before a test be a bad idea?',['The brain needs sleep to store what you have learned','Teachers do not allow it','It is too dark to read'],['Läs andra stycket igen.','Vad gör hjärnan med det du har lärt dig medan du sover?'],'Hjärnan behöver sömn för att spara det du har lärt dig.'],
  ['Why is it hard for many teenagers to get up early?',['Their inner clock makes them tired later in the evening','They do not like school','Their alarm clocks are broken'],['Läs fjärde stycket.','Inner clock betyder inre klocka.'],'Tonåringars inre klocka gör att de blir trötta senare på kvällen.'],
  ['In the text, what does “lack of sleep” mean?',['Not getting enough sleep','Sleeping too much','Sleeping in the afternoon'],['Läs meningen där uttrycket står.','Lack betyder brist.'],'Lack of sleep betyder sömnbrist, alltså att man inte sover tillräckligt.'],
  ['Which words best describe the text?',['Informative and helpful','Angry and upset','Funny and silly'],['Hur låter texten när du läser den?','Texten förklarar och ger råd.'],'Texten är informativ och hjälpsam.']
];
const FR_UTM = [
  ['Which advice does the text NOT give?',['Drink warm milk before bed','Go to bed at the same time every night','Keep your bedroom dark'],['Läs sista stycket och jämför med alternativen.','Vilket råd står inte i texten?'],'Texten säger ingenting om varm mjölk.'],
  ['How is the text organised?',['It explains why sleep matters and then gives advice','It tells a story in time order','It compares two countries'],['Vad handlar början om, och vad handlar slutet om?','Det sista stycket ger tips.'],'Texten förklarar först varför sömn är viktig och ger sedan råd.'],
  ['Which statement is a fact, not an opinion?',['Teenagers need about eight to ten hours of sleep','Sleep is the most boring part of the day','Everyone should love going to bed early'],['Ett faktum går att kontrollera. En åsikt är något någon tycker.','Vilket påstående står i texten och bygger på kunskap?'],'Att tonåringar behöver åtta till tio timmars sömn är ett faktum som går att kontrollera.'],
  ['What would be a good title for the last paragraph?',['Tips for better sleep','Why we dream','The history of beds'],['Vad handlar sista stycket om?','Stycket ger flera råd.'],'Tips for better sleep, eftersom stycket ger råd för att sova bättre.']
];

/* ---------- ENGELSKA: SKRIVA BESKRIVANDE TEXT ---------- */
const EB = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som passar bäst.', prompt, lang:'en', options, answer:options[0], hints, solution,
  diagnose: () => hints[1] });
const EB_GRUND = [
  ['Which sentence describes the place best?',['The old café smelled of fresh bread, and soft music came from a radio in the corner.','The café was nice.','There was a café.'],['Vilken mening låter dig se, höra och känna lukten av platsen?','En bra beskrivning använder flera sinnen.'],'Den första meningen använder lukt (fresh bread) och hörsel (soft music).'],
  ['Which word in this sentence is an adjective? “The tall man walked slowly.”',['tall','walked','slowly'],['Ett adjektiv beskriver hur någon eller något är.','Vilket ord beskriver mannen?'],'Tall beskriver mannen och är ett adjektiv. Slowly är ett adverb.'],
  ['Which senses can you use in a description?',['Sight, hearing, smell, taste and touch','Only sight','Only hearing'],['Hur många sinnen har vi?','Sight är syn, hearing är hörsel, smell är lukt, taste är smak och touch är känsel.'],'Du kan använda alla fem sinnena: syn, hörsel, lukt, smak och känsel.'],
  ['Choose the best word: “The ___ waves crashed against the rocks.”',['huge','happy','tidy'],['Vilket ord passar till vågor som slår mot klippor?','Huge betyder enorma.'],'Huge waves, alltså enorma vågor, passar bäst.'],
  ['Choose the best word: “The room was so ___ that I could hear my own heartbeat.”',['quiet','loud','yellow'],['Om man hör sitt eget hjärta, hur är det i rummet?','Quiet betyder tyst.'],'Quiet passar, eftersom man bara hör sitt eget hjärta när det är tyst.'],
  ['Which sentence uses a comparison?',['Her eyes were as blue as the sea.','Her eyes were blue.','She had eyes.'],['En jämförelse beskriver något genom att likna det vid något annat.','Leta efter as … as eller like.'],'”As blue as the sea” jämför ögonen med havet.'],
  ['What is the purpose of a descriptive text?',['To help the reader see, hear and feel something','To argue for an opinion','To give instructions'],['Describe betyder beskriva.','Vad ska läsaren uppleva när den läser?'],'En beskrivande text hjälper läsaren att se, höra och känna det som beskrivs.'],
  ['Choose the best verb: “The wind ___ through the trees.”',['whistled','ate','sat'],['Vad gör vinden i träden?','Whistled betyder visslade.'],'The wind whistled through the trees: vinden visslade genom träden.']
];
const EB_FORD = [
  ['Which sentence is correct?',['She has a beautiful red dress.','She has a dress beautiful red.','She has a red beautiful dress.'],['På engelska står adjektiven före substantivet.','Åsikt (beautiful) kommer före färg (red).'],'She has a beautiful red dress. Adjektiven står före substantivet, och åsikt kommer före färg.'],
  ['Which sentence is correct?',['It was a very cold morning.','It was a morning very cold.','It was very a cold morning.'],['Står adjektivet före eller efter substantivet?','Very står direkt före adjektivet.'],'It was a very cold morning.'],
  ['Where does an adjective usually go in English?',['Before the noun, like a big house','After the noun, like a house big','At the end of the sentence'],['Tänk på exemplet a red car.','Det är som på svenska: en röd bil.'],'Adjektivet står före substantivet: a big house.'],
  ['Choose the best word: “The beach was crowded, ___ we found a quiet spot.”',['but','because','so'],['Den andra delen säger något oväntat.','But betyder men.'],'But passar: det var trångt, men de hittade ändå en lugn plats.'],
  ['Which word makes the description most precise? “She ___ across the room.”',['tiptoed','went','moved'],['Vilket ord visar exakt hur hon rörde sig?','Tiptoed betyder smög på tå.'],'Tiptoed visar exakt hur hon rörde sig: hon smög på tå.'],
  ['Which opening is best for a description of your favourite place?',['My favourite place is a small bench by the lake, where the water is always calm.','This text is about a place.','I am going to write about my favourite place now.'],['En bra inledning väcker intresse och visar platsen direkt.','Vilken mening får dig att se platsen framför dig?'],'Den första meningen visar platsen direkt och väcker läsarens intresse.'],
  ['Which word is spelled correctly?',['beautiful','beutiful','beautifull'],['Ordet betyder vacker.','Tänk på stavningen beau-ti-ful.'],'Beautiful stavas b-e-a-u-t-i-f-u-l.']
];
const EB_UTM = [
  ['Which sentence shows a feeling instead of just telling it?',['My hands were shaking as I opened the door.','I was nervous.','I felt nervous and scared.'],['Att visa en känsla betyder att beskriva vad kroppen gör.','Vilken mening låter dig se nervositeten?'],'Skakande händer visar nervositet, utan att ordet nervous behövs.'],
  ['How can you organise a description of a room?',['From one side to the other, or from big things to small details','In alphabetical order','In a random order, so the reader is surprised'],['Hur blir det lättast för läsaren att följa med?','Tänk på hur en kamera rör sig genom ett rum.'],'Beskriv rummet i en tydlig ordning, till exempel från ena sidan till den andra.'],
  ['Which ending is best for a description of a busy market?',['As the sun went down, the voices faded and the smell of spices hung in the air.','The end.','That was the market.'],['En bra avslutning lämnar en känsla hos läsaren.','Vilken mening fortsätter att använda sinnena?'],'Den första meningen avslutar med ljud och lukt och lämnar en stämning hos läsaren.'],
  ['Which sentence uses the most senses?',['The hot soup smelled of garlic and warmed my cold fingers.','The soup was good.','I had soup.'],['Räkna sinnena i varje mening.','Lukt och känsel finns i en av meningarna.'],'Den första meningen använder både lukt och känsel.']
];

/* ---------- SVENSKA: SATSDELAR ---------- */
const SD_DEF = {
  predikat:'Predikatet är verbet som visar vad som händer eller vad någon gör: springer, åt, är.',
  subjekt:'Subjektet är den som gör något, eller den eller det som meningen handlar om. Fråga: vem eller vad + predikatet?',
  objekt:'Objektet är den eller det som handlingen riktas mot. Fråga: vem eller vad + predikatet + subjektet? Vad åt Lisa? En macka.',
  'indirekt objekt':'Det indirekta objektet är mottagaren, den som får något. Fråga: till eller åt vem + predikatet + subjektet + objektet?',
  adverbial:'Ett adverbial berättar hur, när, var eller varför något händer: igår, i skolan, snabbt.'
};
const SD_TEST = {
  predikat:'Testa: vilket ord är verbet, det som visar vad som händer?',
  subjekt:'Testa: ställ frågan vem eller vad + predikatet. Den som gör något är subjektet.',
  objekt:'Testa: ställ frågan vem eller vad + predikatet + subjektet.',
  'indirekt objekt':'Testa: vem får något? Ställ frågan till eller åt vem.',
  adverbial:'Testa: svarar delen på frågan hur, när, var eller varför?'
};
const SD_GRUND = [
  ['Lisa åt en macka.','Lisa','subjekt'],['Lisa åt en macka.','åt','predikat'],['Lisa åt en macka.','en macka','objekt'],
  ['Hunden jagade katten.','katten','objekt'],['Hunden jagade katten.','Hunden','subjekt'],['Min bror spelar gitarr.','spelar','predikat'],
  ['Min bror spelar gitarr.','Min bror','subjekt'],['Vi köpte nya skor.','nya skor','objekt'],['Eleverna skrev ett prov.','skrev','predikat'],
  ['Mormor stickade en tröja.','en tröja','objekt'],['Läraren öppnade fönstret.','Läraren','subjekt'],['Barnen byggde en koja.','byggde','predikat']
];
const SD_FORD = [
  ['Vi spelade fotboll i parken.','i parken','adverbial'],['Igår regnade det hela dagen.','Igår','adverbial'],['Hon sprang snabbt hem.','snabbt','adverbial'],
  ['Efter skolan åt vi glass.','vi','subjekt'],['Efter skolan åt vi glass.','glass','objekt'],['På lördag åker de till Göteborg.','de','subjekt'],
  ['Han läste boken i sängen.','boken','objekt'],['Katten sover ofta i fönstret.','ofta','adverbial'],['I morgon har vi prov.','vi','subjekt'],
  ['Pappa lagade middag i köket.','i köket','adverbial']
];
const SD_UTM = [
  ['Jag gav min syster en present.','min syster','indirekt objekt','objekt'],['Jag gav min syster en present.','en present','objekt','indirekt objekt'],
  ['Läraren visade klassen en film.','klassen','indirekt objekt','objekt'],['Mamma skickade mig ett sms.','mig','indirekt objekt','subjekt'],
  ['Igår gav Ali sin hund ett ben.','Ali','subjekt','indirekt objekt'],['Det snöade hela natten.','Det','subjekt','objekt'],
  ['I går kväll såg vi en film.','I går kväll','adverbial','subjekt'],['Henne känner jag inte.','Henne','objekt','subjekt'],
  ['Boken lånade hon på biblioteket.','Boken','objekt','subjekt'],['Han berättade en hemlighet för mig.','en hemlighet','objekt','adverbial']
];
function sdQ([s, w, cls, trap], pool){
  const others = shuffle(pool.filter(c => c !== cls && c !== trap));
  const opts = [cls, ...(trap ? [trap] : []), ...others].slice(0, Math.min(4, pool.length));
  return choiceQ({ instr:'Läs meningen och välj satsdel.', prompt:`Vilken satsdel är ”${w}” i meningen ”${s}”?`, options:opts.map(cap), answer:cap(cls),
    hints:[`Hitta först predikatet, alltså verbet. Vilken uppgift har sedan ”${w}” i meningen?`, SD_TEST[cls]],
    solution:`”${w}” är ${cls} i meningen. ${SD_DEF[cls]}`,
    diagnose: raw => { const c = raw.toLowerCase(); return SD_DEF[c] ? `${cap(c)}? ${SD_DEF[c]} Passar det in på ”${w}” här?` : null; } });
}
const SD_ALL = Object.keys(SD_DEF);

/* ---------- SVENSKA: SKRIVA UTREDANDE TEXT ---------- */
const UQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som passar bäst.', prompt, options, answer:options[0], hints, solution,
  diagnose: () => hints[1] });
const UT_GRUND = [
  ['Vad är syftet med en utredande text?',['Att undersöka och förklara en fråga från olika håll','Att övertyga läsaren om sin egen åsikt','Att berätta en spännande historia'],['Tänk på ordet utreda. Vad gör man när man utreder något?','En utredande text letar svar och visar olika sidor av en fråga.'],'En utredande text undersöker en fråga och förklarar den från olika håll.'],
  ['Vad ska finnas i inledningen av en utredande text?',['En frågeställning som texten ska undersöka','Slutet på berättelsen','En lista över alla källor'],['Inledningen visar läsaren vad texten ska handla om.','Läsaren behöver veta vilken fråga texten vill besvara.'],'Inledningen presenterar ämnet och frågeställningen.'],
  ['Vilken rubrik passar bäst för en utredande text?',['Varför sover tonåringar för lite?','Min bästa sommar','Därför ska alla äta glass!'],['En utredande text undersöker en fråga.','Vilken rubrik är en fråga som går att utreda?'],'”Varför sover tonåringar för lite?” är en fråga som går att undersöka från olika håll.'],
  ['Vad brukar avslutningen i en utredande text innehålla?',['En sammanfattning och en slutsats','En ny fråga som aldrig besvaras','Ett skämt'],['Avslutningen knyter ihop texten.','Vad kom du fram till när du undersökte frågan?'],'Avslutningen sammanfattar och drar en slutsats.'],
  ['Vilken mening passar bäst i en utredande text?',['Det finns flera orsaker till att elever känner sig stressade.','Jag tycker att läxor är det värsta som finns!','Det var en gång en stressad elev.'],['En utredande text är saklig och undersökande.','Vilken mening berättar inte en historia och uttrycker inte en stark åsikt?'],'Meningen om flera orsaker är saklig och öppnar för en undersökning.'],
  ['Varför ska man ange källor i en utredande text?',['Så att läsaren kan se var fakta kommer ifrån','För att texten ska bli längre','Det spelar ingen roll'],['Hur kan läsaren veta att fakta stämmer?','Källor gör att läsaren kan kontrollera informationen.'],'Källor visar var fakta kommer ifrån, så att läsaren kan kontrollera dem.'],
  ['Vilket ord visar bäst en orsak?',['eftersom','däremot','slutligen'],['En orsak svarar på frågan varför.','Vilket ord kan följas av en förklaring till varför något händer?'],'Eftersom visar en orsak: Många är trötta eftersom de sover för lite.'],
  ['Vad betyder det att skriva sakligt?',['Att skriva tydligt och neutralt, utan överdrifter','Att skriva så roligt som möjligt','Att bara skriva korta meningar'],['Sakligt handlar om sakfrågan, inte om känslor.','Undvik ord som superdålig, värst och alla.'],'Sakligt betyder tydligt och neutralt, utan överdrifter och känsloladdade ord.']
];
const UT_FORD = [
  ['Vilket uttryck passar bäst i luckan? ”Mobilen kan störa koncentrationen. ___ kan den vara ett bra hjälpmedel i skolarbetet.”',['Å andra sidan','Därför','Till exempel'],['Den andra meningen säger något som går åt motsatt håll.','Å andra sidan används när du visar en annan sida av saken.'],'”Å andra sidan” visar att det finns en annan sida av frågan.'],
  ['Vilket uttryck passar bäst i luckan? ”Många elever sover för lite. ___ de får svårare att koncentrera sig.”',['Det leder till att','Däremot','Å ena sidan'],['Den andra meningen beskriver en följd av den första.','Vilket uttryck visar en konsekvens?'],'”Det leder till att” visar en konsekvens.'],
  ['Frågan är varför fler unga cyklar till skolan. Vilken mening beskriver en konsekvens?',['Det leder till att färre bilar kör till skolan på morgonen.','Många cyklar för att det är billigt.','Cyklar finns i många färger.'],['En konsekvens är något som händer på grund av något annat.','Vad blir resultatet av att fler cyklar?'],'Att färre bilar kör till skolan är en följd av att fler cyklar.'],
  ['Frågan är varför fler unga cyklar till skolan. Vilken mening beskriver en orsak?',['Många väljer att cykla eftersom det är billigare än bussen.','Därför blir luften renare.','Cyklar har två hjul.'],['En orsak förklarar varför något händer.','Leta efter en mening med ordet eftersom.'],'Att det är billigare är en orsak till att fler cyklar.'],
  ['Vilken mening är mest saklig?',['Enligt en undersökning rör sig många unga mindre än vad som rekommenderas.','Alla unga är superlata!','Ungdomar i dag gör ingenting.'],['En saklig mening överdriver inte.','Vilken mening bygger på fakta och säger varifrån de kommer?'],'Meningen som hänvisar till en undersökning är saklig och överdriver inte.'],
  ['Varför är det bra att ta med olika perspektiv i en utredande text?',['Läsaren får en mer rättvis och fullständig bild','Texten blir mer spännande','Man slipper dra en slutsats'],['Tänk om bara en sida av saken visas. Vad saknas då?','Olika perspektiv gör att läsaren kan förstå hela frågan.'],'Olika perspektiv ger en rättvis och fullständig bild.'],
  ['Vilket uttryck visar att du ger ett exempel?',['till exempel','därför','slutligen'],['Vilket uttryck kan följas av något konkret som visar vad du menar?','Exempel gör en förklaring tydligare.'],'Till exempel används när du ger ett exempel.'],
  ['Vilket ord passar bäst för att inleda avslutningen?',['Sammanfattningsvis','Plötsligt','Först'],['Avslutningen sammanfattar texten.','Vilket ord betyder ungefär ”för att sammanfatta”?'],'Sammanfattningsvis passar bra i början av avslutningen.']
];
const UT_UTM = [
  ['Vilken frågeställning passar bäst för en utredande text?',['Vilka följder får skärmtid för ungas sömn?','Skärmar är dåliga.','Gillar du din mobil?'],['En frågeställning är en fråga som går att undersöka.','Vilken fråga går att besvara med fakta från olika håll?'],'”Vilka följder får skärmtid för ungas sömn?” går att undersöka med fakta.'],
  ['Vilken mening passar bäst som slutsats?',['Sammanfattningsvis påverkas sömnen av flera saker, och skärmtiden är en av de viktigaste.','Så det var allt om sömn.','Jag hatar att gå och lägga mig.'],['En slutsats knyter ihop det texten har kommit fram till.','Vilken mening sammanfattar och svarar på frågan?'],'Den första meningen sammanfattar och svarar på frågeställningen.'],
  ['Vilken källa är mest pålitlig för fakta om ungas sömn?',['En myndighet eller forskare som skriver om sömn','Ett anonymt inlägg på sociala medier','En reklam för en ny madrass'],['Vem vet mest om ämnet och vill inte sälja något?','Fundera på vem som står bakom källan och varför.'],'En myndighet eller forskare är mest pålitlig. De har kunskap om ämnet och vill inte sälja något.'],
  ['Hur ska en utredande text vara uppbyggd?',['Inledning med frågeställning, stycken med orsaker eller perspektiv, och en avslutning','Ett enda långt stycke utan rubrik','Avslutningen först och inledningen sist'],['Tänk på vad som kommer först, i mitten och sist.','Varje orsak eller perspektiv kan få ett eget stycke.'],'Inledning med frågeställning, stycken med orsaker eller perspektiv och en avslutning.'],
  ['Vad är skillnaden mellan en utredande och en argumenterande text?',['Den utredande undersöker frågan från olika håll, den argumenterande vill övertyga','Det finns ingen skillnad','Den utredande är alltid kortare'],['Vad vill skribenten uppnå i de två texttyperna?','Den argumenterande texten har en tes som den vill att läsaren ska hålla med om.'],'En utredande text undersöker från olika håll. En argumenterande text vill övertyga.']
];

/* ---------- SVENSKA: KÄLLKRITISK LÄSNING ---------- */
const KQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som passar bäst.', prompt, options, answer:options[0], hints, solution,
  diagnose: () => hints[1] });
const KK_TEXT = {
  title:'Tre källor om energidrycker',
  paras:[
    'Källa A är ett inlägg från kontot @PowerKick_Official: ”Vår nya energidryck ger dig mer fokus i skolan! Testa själv, 20 % rabatt i dag!”',
    'Källa B är en text från en statlig myndighet som arbetar med livsmedel. Texten är uppdaterad i år. Där står det att barn och unga avråds från att dricka energidrycker, eftersom de innehåller mycket koffein som till exempel kan ge hjärtklappning och sömnproblem.',
    'Källa C är en kommentar under en video: ”Jag dricker tre energidrycker om dagen och mår superbra, så det är inte farligt.”'
  ]
};
const KK_GRUND = [
  ['Vad betyder källkritik?',['Att granska varifrån information kommer och om den går att lita på','Att alltid tro på det som står i en bok','Att kritisera andra människor på nätet'],['Källa betyder varifrån något kommer.','Källkritik handlar om att granska, inte om att vara elak.'],'Källkritik betyder att granska information och avsändare för att se om det går att lita på.'],
  ['Vilken fråga är viktigast att ställa om en källa?',['Vem står bakom informationen?','Hur många färger har sidan?','Har inlägget många emojis?'],['Det spelar roll vem som säger något, och varför.','Avsändaren kan ha egna skäl att säga något.'],'Vem som står bakom informationen säger mycket om hur trovärdig den är.'],
  ['Vilken källa är troligen mest pålitlig om du vill veta hur många som bor i Sverige?',['Statistiska centralbyrån (SCB)','En kompis inlägg på sociala medier','En kommentar under en video'],['Vem har som uppgift att ta fram statistik om befolkningen?','SCB är en myndighet som tar fram statistik om Sverige.'],'SCB är en myndighet som tar fram officiell statistik.'],
  ['Ett inlägg har 50 000 gillamarkeringar. Betyder det att det som står är sant?',['Nej, många gillamarkeringar säger inget om vad som är sant','Ja, så många kan inte ha fel','Ja, om inlägget är gammalt'],['Gillar folk saker för att de är sanna, eller för att de är roliga eller upprörande?','Falska nyheter sprids ofta snabbare än sanna.'],'Hur populärt något är säger inget om ifall det är sant.'],
  ['Vad är en förstahandskälla?',['Någon som själv har varit med om eller sett det som hänt','Någon som har läst om det i en tidning','Den källa man hittar först när man söker'],['Första hand betyder direkt, utan mellanhänder.','Ett ögonvittne är ett exempel.'],'En förstahandskälla har själv upplevt eller sett det som hänt.'],
  ['Varför är det viktigt att kolla när en text skrevs?',['Informationen kan vara gammal och inte stämma längre','Gamla texter är alltid fel','Nya texter är alltid sanna'],['Kunskap och fakta kan förändras med tiden.','Det här kallas tidskriteriet.'],'Information kan bli inaktuell. Kolla därför alltid när något skrevs.'],
  ['Du hittar en överraskande nyhet på nätet. Vad bör du göra först?',['Kolla om flera trovärdiga källor skriver samma sak','Dela den direkt','Tro på den om den har en bild'],['Hur kan du veta om nyheten stämmer?','Om nyheten är sann brukar fler pålitliga källor skriva om den.'],'Kontrollera om flera trovärdiga och oberoende källor skriver samma sak.'],
  ['Vad betyder det att en källa har en tendens?',['Att den vill påverka dig i en viss riktning','Att den är väldigt gammal','Att den är skriven för barn'],['Tendens handlar om avsikt.','Vill avsändaren att du ska tycka, tro eller köpa något?'],'En källa med tendens vill påverka dig, till exempel så att du köper eller tycker något.']
];
const KK_FORD = [
  ['Ett inlägg säger: ”FORSKARE CHOCKADE: Choklad gör dig smartare på en vecka!!!” Vilket är det tydligaste varningstecknet?',['Den överdrivna rubriken med versaler och utropstecken','Att det handlar om choklad','Att det nämner forskare'],['Hur skriver seriösa nyhetskällor sina rubriker?','Överdrivna rubriker vill locka klick, inte informera.'],'Överdrivna rubriker med versaler och många utropstecken är ett vanligt tecken på klickbete.'],
  ['En webbsida som säljer kosttillskott skriver att deras produkt är bäst för hälsan. Vad är problemet?',['Avsändaren tjänar pengar på att du tror på det','Webbsidan är för lång','Inget, företaget vet mest om sin produkt'],['Vad vill avsändaren att du ska göra?','Det här är ett exempel på tendens.'],'Företaget vill sälja. Källan har därför en tendens och behöver kontrolleras med andra källor.'],
  ['Två nyhetssajter skriver samma sak, men båda bygger på samma anonyma inlägg. Hur många oberoende källor finns det?',['En, eftersom båda bygger på samma inlägg','Två, så det är säkert sant','Tre'],['Var kommer informationen ursprungligen ifrån?','Det här kallas beroende: källor som bygger på varandra räknas inte som flera.'],'Båda sajterna bygger på samma inlägg, så det är egentligen bara en källa.'],
  ['En bild på en översvämning sprids och påstås vara tagen i går. Hur kan du kontrollera det?',['Göra en bildsökning för att se om bilden har publicerats tidigare','Räkna hur många som har delat den','Läsa kommentarerna'],['Gamla bilder sprids ofta som om de vore nya.','Med en omvänd bildsökning kan du hitta var bilden har synts förut.'],'En bildsökning visar om bilden har publicerats tidigare, i ett annat sammanhang.'],
  ['Vilket av påståendena är en åsikt och inte ett faktum?',['Fotboll är den roligaste sporten','Vatten fryser vid 0 grader','Ett år har tolv månader'],['Ett faktum går att kontrollera. En åsikt är något någon tycker.','Kan man bevisa att något är roligast?'],'Att fotboll är roligast är en åsikt. De andra påståendena går att kontrollera.'],
  ['Ett konto utan profilbild, skapat förra veckan, sprider samma nyhet hundratals gånger. Vad kan det vara?',['Ett falskt konto eller en bot som vill sprida något','En pålitlig nyhetsbyrå','En vanlig person som är intresserad av nyheter'],['Vad är ovanligt med kontot?','Nya konton som postar samma sak om och om igen är ofta automatiska.'],'Det är troligen ett falskt konto eller en bot som vill sprida ett budskap.'],
  ['Du läser en artikel om mobilanvändning som skrevs för femton år sedan. Vad bör du tänka på?',['Mycket kan ha ändrats sedan dess, så leta efter nyare källor','Gamla artiklar är alltid mer sanna','Det spelar ingen roll när den skrevs'],['Hur har mobiler och appar förändrats på femton år?','Det här handlar om tidskriteriet.'],'Mobilanvändningen har förändrats mycket. Leta efter nyare källor.']
];
const KK_UTM = [
  ['Läs texten ”Tre källor om energidrycker”. Vilken källa är mest trovärdig?',['Källa B','Källa A','Källa C'],['Vem står bakom varje källa, och vill någon av dem sälja något?','En myndighet har kunskap och vill inte sälja något.'],'Källa B kommer från en myndighet, är uppdaterad och vill inte sälja något.'],
  ['Varför ska man vara försiktig med källa A?',['Avsändaren vill sälja sin produkt','Den är för kort','Den skrevs i år'],['Vem skrev inlägget?','Rabatten visar vad avsändaren vill att du ska göra.'],'Källa A har en tendens: företaget vill sälja energidrycker.'],
  ['Vad är problemet med källa C?',['En persons upplevelse visar inte vad som gäller för alla','Den är för gammal','Den är skriven av en myndighet'],['Kan en person bevisa att något är ofarligt för alla?','En enskild erfarenhet är inte samma sak som forskning.'],'En enda persons upplevelse räcker inte för att säga vad som gäller för alla.'],
  ['Du frågar dig om källa A vill påverka dig. Vilket källkritiskt kriterium handlar det om?',['Tendens','Tid','Äkthet'],['De fyra kriterierna är äkthet, tid, beroende och tendens.','Vilket kriterium handlar om avsändarens avsikt?'],'Tendens handlar om att en källa vill påverka dig i en viss riktning.'],
  ['Du vill veta mer om energidrycker. Vad är bäst att göra?',['Leta efter fler oberoende källor, till exempel vården eller forskare','Fråga företaget bakom källa A','Läsa fler kommentarer under videon'],['Vilka källor har kunskap och inga skäl att vinkla informationen?','Oberoende källor bygger inte på varandra och vill inte sälja något.'],'Oberoende och kunniga källor, som vården eller forskare, ger den bästa bilden.'],
  ['Varför är det bra att källa B är uppdaterad i år?',['Den bygger troligen på aktuell kunskap','Nya texter är alltid längre','Det spelar ingen roll'],['Det här handlar om tidskriteriet.','Kunskap kan förändras. En uppdaterad text följer med i det.'],'En uppdaterad text bygger troligen på den kunskap som finns i dag.']
];

/* ---------- ALLA OMRÅDEN I ÅRSKURS 8 ---------- */
Object.assign(CONTENT, {
  '8-matte-algebra':{
    intro:[
      'I algebra använder man bokstäver, till exempel x, i stället för tal. Bokstaven kallas en variabel och kan stå för olika tal.',
      '3x betyder 3 · x. Termer med samma variabel kan läggas ihop: 2x + 5x = 7x. Termer med x och vanliga tal läggs ihop var för sig.',
      'Står det ett tal framför en parentes ska det gångas med allt i parentesen: 3(x + 2) = 3x + 6.'
    ],
    example:{title:'Exempel: Vad är 4x + 3 när x = 5?', steps:['Byt ut x mot 5: 4 · 5 + 3.','Räkna gånger först: 4 · 5 = 20.','Lägg till 3: 20 + 3 = 23.','Svar: 23.']},
    levels:[
      {name:'Grund', desc:'Värdet av uttryck, ord till uttryck och x-termer', make:()=>mix([AL.g1,AL.g2,AL.g3],8)},
      {name:'Fördjupning', desc:'Förenkla, två variabler och parenteser', make:()=>mix([AL.f1,AL.f2,AL.f3],8)},
      {name:'Utmaning', desc:'Minus framför parentes, bryta ut och vardagsproblem', make:()=>mix([AL.u1,AL.u2,AL.u3],8)}
    ]
  },
  '8-matte-ekvationer':{
    intro:[
      'En ekvation är som en våg i jämvikt. Det som står på vänster sida är lika mycket värt som det som står på höger sida.',
      'Målet är att få x ensamt på ena sidan. Du gör det genom att göra samma sak på båda sidor, så att vågen fortsätter att väga jämnt.',
      'Gör det motsatta: står det + 5 drar du bort 5, och står det 3x delar du med 3. Kontrollera gärna svaret genom att sätta in det i ekvationen.'
    ],
    example:{title:'Exempel: Lös 3x + 4 = 19', steps:['Dra bort 4 från båda sidor: 3x = 15.','Dela båda sidor med 3: x = 5.','Kontroll: 3 · 5 + 4 = 19. Det stämmer.','Svar: x = 5.']},
    levels:[
      {name:'Grund', desc:'Ett steg: plus, minus och gånger', make:()=>mix([EQ.g1,EQ.g2,EQ.g3],8)},
      {name:'Fördjupning', desc:'Två steg och division', make:()=>mix([EQ.f1,EQ.f2,EQ.f3],8)},
      {name:'Utmaning', desc:'x på båda sidor, parenteser och textuppgifter', make:()=>mix([EQ.u1,EQ.u2,EQ.u3],8)}
    ]
  },
  '8-matte-statistik':{
    intro:[
      'Statistik handlar om att samla in, ordna och tolka information, till exempel svaren från en enkät.',
      'Lägesmått beskriver ett typiskt värde. Medelvärdet är summan delat med antalet. Medianen är värdet i mitten när talen står i ordning. Typvärdet är det vanligaste värdet.',
      'Variationsbredden är det största värdet minus det minsta. Den visar hur utspridda värdena är.'
    ],
    example:{title:'Exempel: Talen 4, 9, 6, 6 och 10', steps:['Medelvärde: (4 + 9 + 6 + 6 + 10) / 5 = 35 / 5 = 7.','Median: i ordning 4, 6, 6, 9, 10. Mittenvärdet är 6.','Typvärde: 6 finns två gånger, så typvärdet är 6.','Variationsbredd: 10 − 4 = 6.']},
    levels:[
      {name:'Grund', desc:'Medelvärde, median och typvärde', make:()=>mix([ST.g1,ST.g2,ST.g3],8)},
      {name:'Fördjupning', desc:'Variationsbredd, jämnt antal och tabeller', make:()=>mix([ST.f1,ST.f2,ST.f3],8)},
      {name:'Utmaning', desc:'Saknade värden, procent och att välja rätt mått', make:()=>mix([ST.u1,ST.u2,ST.u3],8)}
    ]
  },
  '8-engelska-fler-verbtider':{
    intro:[
      'Present continuous (am, is eller are + -ing) använder du för sådant som händer just nu: I am reading. Present simple använder du för vanor och fakta: I read every day.',
      'Present perfect (have eller has + verbets tredje form) använder du när något har hänt fram till nu, utan att det sägs exakt när: I have been to London. Past simple använder du när det sägs när det hände: I went to London last year.',
      'Tidsorden hjälper dig. Now och look! pekar på continuous. Ever, never, yet, already, since och for pekar ofta på present perfect. Yesterday, ago och last pekar på past simple.'
    ],
    example:{title:'Exempel: Present perfect eller past simple?', steps:['Meningen är: I ___ (see) that film last week.','Tidsordet ”last week” säger exakt när det hände.','Då ska det vara past simple. See är oregelbundet.','Svar: I saw that film last week.']},
    levels:[
      {name:'Grund', desc:'Just nu eller brukar: continuous och simple', make:()=>shuffle(EN8_GRUND).slice(0,8).map(x=>enQ(x[0],x[1],x[2],x[3],enSig(x[4],x[5]),x[5]))},
      {name:'Fördjupning', desc:'Present perfect eller past simple', make:()=>shuffle(EN8_FORD).slice(0,8).map(x=>enQ(x[0],x[1],x[2],x[3],enSig(x[4],x[5]),x[5]))},
      {name:'Utmaning', desc:'Skriv rätt form själv, plus en skrivuppgift', make:()=>shuffle(EN8_UTM).slice(0,8).map(it=>
        textQ({ instr:'Skriv verbet i rätt form. Ibland behövs två ord, till exempel is reading.', prompt:it.s, lang:'en', answer:it.a, accept:it.acc, hints:it.h, solution:fill(it.s, it.a) })),
        writing:{
          task:'Skriv 5–8 meningar på engelska om något du har gjort i år och något du gjorde förra sommaren. Använd både present perfect (I have …) och past simple (I went …).',
          check:['Har du skrivit 5–8 meningar?','Har du med både present perfect, som I have tried, och past simple, som I went?','Använder du past simple när du säger exakt när något hände?','Börjar varje mening med stor bokstav och slutar med punkt?'],
          focus:'Fokusera på om eleven använder present perfect och past simple på rätt ställen. Om något verb är fel, visa ett exempel ur elevens text och hur det blir rätt. Citera engelska ord på engelska.'
        }}
    ]
  },
  '8-engelska-faktatext':{
    text:SLEEP,
    intro:[
      'En faktatext vill informera. Den har ofta en rubrik, en inledning som presenterar ämnet och stycken som tar upp en sak i taget.',
      'Läs rubriken och första meningen i varje stycke först. Då får du snabbt en bild av vad texten handlar om. Det kallas att skumläsa.',
      'Svåra ord kan du ofta förstå utifrån sammanhanget. Fundera också på varför texten är skriven och vem den riktar sig till.'
    ],
    example:{title:'Exempel: Skumläsa en faktatext', steps:['Läs rubriken: Why Do We Need Sleep?','Läs första meningen i varje stycke.','Nu vet du att texten handlar om varför sömn är viktig och hur man sover bättre.','Läs sedan hela texten noga.']},
    levels:[
      {name:'Grund', desc:'Hitta fakta i texten', make:()=>shuffle(FR_GRUND).map(x=>FR(...x))},
      {name:'Fördjupning', desc:'Syfte, ord i sammanhang och slutsatser', make:()=>shuffle(FR_FORD).map(x=>FR(...x))},
      {name:'Utmaning', desc:'Textens uppbyggnad, fakta och åsikter, plus en skrivuppgift', make:()=>shuffle(FR_UTM).map(x=>FR(...x)),
        writing:{
          task:'Skriv 5–8 meningar på engelska: Ge råd till en kompis som sover för lite. Använd minst två fakta från texten ”Why Do We Need Sleep?”.',
          check:['Har du skrivit 5–8 meningar?','Har du med minst två fakta från texten?','Ger du tydliga råd, till exempel You should … eller Try to …?','Börjar varje mening med stor bokstav och slutar med punkt?'],
          focus:'Fokusera på om eleven ger tydliga råd och använder fakta från texten, som att tonåringar behöver åtta till tio timmars sömn, att hjärnan sparar minnen under sömnen och att skärmar kan försvåra insomningen. Kommentera ett par saker i språket med exempel ur elevens text. Citera engelska ord på engelska.'
        }}
    ]
  },
  '8-engelska-beskrivande':{
    intro:[
      'En beskrivande text hjälper läsaren att se, höra och känna något, till exempel en plats, en person eller en händelse.',
      'Använd sinnena: vad ser, hör, luktar, smakar och känner man? Välj exakta ord. ”She tiptoed” säger mer än ”she went”, och ”huge waves” säger mer än ”big waves”.',
      'På engelska står adjektivet före substantivet: a cold morning, a beautiful red dress. Jämförelser som ”as quiet as a mouse” gör texten levande.'
    ],
    example:{title:'Exempel: Från enkel till levande', steps:['Enkel: The kitchen was nice.','Levande: The kitchen smelled of cinnamon, and the warm oven made the windows steam up.','Den levande meningen använder lukt, känsel och syn.']},
    levels:[
      {name:'Grund', desc:'Sinnen, adjektiv och starka ord', make:()=>shuffle(EB_GRUND).map(x=>EB(...x))},
      {name:'Fördjupning', desc:'Ordföljd, sambandsord och en bra inledning', make:()=>shuffle(EB_FORD).map(x=>EB(...x))},
      {name:'Utmaning', desc:'Visa känslor, ordna texten och skriv en egen beskrivning', make:()=>shuffle(EB_UTM).map(x=>EB(...x)),
        writing:{
          task:'Skriv 80–150 ord på engelska där du beskriver en plats som är viktig för dig. Hjälp läsaren att se, höra och känna platsen.',
          check:['Använder du minst tre sinnen?','Har du med exakta adjektiv och verb, till exempel huge, whispered och tiptoed?','Står adjektiven före substantivet, som a quiet street?','Har texten en tydlig början och ett tydligt slut?'],
          focus:'Fokusera på hur levande beskrivningen är: användningen av sinnena, exakta ordval och adjektivens placering. Visa ett konkret exempel ur elevens text på något som fungerar och ett förslag på hur en mening kan bli mer levande. Citera engelska ord på engelska.'
        }}
    ]
  },
  '8-svenska-satsdelar':{
    intro:[
      'Satsdelar visar vilken uppgift orden har i en mening. Ordklasser handlar om vad ett ord är, satsdelar om vad det gör i just den meningen.',
      'Börja alltid med att hitta predikatet, alltså verbet som visar vad som händer. Sedan kan du ställa frågor för att hitta resten.',
      'Subjektet hittar du med frågan vem eller vad + predikatet. Objektet hittar du med frågan vem eller vad + predikatet + subjektet. Adverbial berättar hur, när, var eller varför.'
    ],
    example:{title:'Exempel: Satsdelarna i ”Lisa åt en macka i skolan.”', steps:['Predikat: åt. Det är verbet.','Subjekt: Vem åt? Lisa.','Objekt: Vad åt Lisa? En macka.','Adverbial: Var åt hon? I skolan.']},
    levels:[
      {name:'Grund', desc:'Subjekt, predikat och objekt', make:()=>shuffle(SD_GRUND).slice(0,8).map(x=>sdQ(x,['subjekt','predikat','objekt']))},
      {name:'Fördjupning', desc:'Adverbial och omvänd ordföljd', make:()=>shuffle(SD_FORD).slice(0,8).map(x=>sdQ(x,['subjekt','predikat','objekt','adverbial']))},
      {name:'Utmaning', desc:'Indirekt objekt och satsdelar som lurar', make:()=>shuffle(SD_UTM).slice(0,8).map(x=>sdQ(x,SD_ALL))}
    ]
  },
  '8-svenska-utredande':{
    intro:[
      'En utredande text undersöker en fråga och förklarar den från olika håll. Den kan handla om orsaker, konsekvenser eller olika perspektiv på en fråga.',
      'Texten börjar med en inledning där du presenterar ämnet och frågeställningen. Sedan kommer stycken där du tar upp orsaker, följder eller perspektiv, gärna med fakta från källor. Sist kommer en avslutning med en sammanfattning och en slutsats.',
      'Skriv sakligt och använd sambandsord som visar hur tankarna hänger ihop: eftersom, därför, å ena sidan, å andra sidan, det leder till att och sammanfattningsvis.'
    ],
    example:{title:'Exempel: En utredande text i miniformat', steps:['Frågeställning: Varför väljer fler unga att cykla till skolan?','Orsak: Många cyklar eftersom det är billigare än bussen.','Konsekvens: Det leder till att färre bilar kör till skolan på morgonen.','Slutsats: Sammanfattningsvis spelar både ekonomi och miljö roll.']},
    levels:[
      {name:'Grund', desc:'Vad en utredande text är och hur den börjar och slutar', make:()=>shuffle(UT_GRUND).map(x=>UQ(...x))},
      {name:'Fördjupning', desc:'Orsaker, konsekvenser, perspektiv och sambandsord', make:()=>shuffle(UT_FORD).map(x=>UQ(...x))},
      {name:'Utmaning', desc:'Frågeställning, slutsats och källor, plus en egen text', make:()=>shuffle(UT_UTM).map(x=>UQ(...x)),
        writing:{
          task:'Skriv en utredande text på 200–350 ord. Välj en frågeställning, till exempel ”Varför sover många unga för lite?” eller ”Vilka följder får det att använda mobilen mycket?”. Ha en inledning med frågeställning, minst två orsaker eller konsekvenser, och en avslutning med en slutsats.',
          check:['Har du en inledning med en tydlig frågeställning?','Tar du upp minst två orsaker, konsekvenser eller perspektiv, gärna i egna stycken?','Skriver du sakligt, utan överdrifter?','Använder du sambandsord som eftersom, därför, å andra sidan och sammanfattningsvis?','Har du en avslutning med en slutsats?'],
          focus:'Fokusera på textens struktur (inledning med frågeställning, stycken med orsaker eller konsekvenser, avslutning med slutsats), på saklig ton och på sambandsord. Ge ett konkret exempel ur elevens text på något som fungerar och ett på något som kan förbättras.'
        }}
    ]
  },
  '8-svenska-kallkritik':{
    intro:[
      'Källkritik betyder att granska information innan du tror på den eller sprider den vidare. Det gäller nyheter, sociala medier och skolböcker.',
      'Fyra frågor hjälper dig. Äkthet: är källan den den utger sig för att vara? Tid: när skrevs den, och stämmer den fortfarande? Beroende: bygger den på andra källor, eller är den oberoende? Tendens: vill avsändaren påverka dig?',
      'Jämför alltid med flera källor. Om något verkar för bra, för upprörande eller för konstigt för att vara sant, kontrollera det extra noga.'
    ],
    example:{title:'Exempel: Ett inlägg om skolan', steps:['Ett konto skriver: ”Från nästa vecka slutar alla skolor i Sverige med läxor!”','Vem står bakom? Ett okänt konto.','Skriver någon annan samma sak? Nej, varken skolan, kommunen eller nyheterna.','Slutsats: Lita inte på inlägget förrän trovärdiga källor bekräftar det.']},
    levels:[
      {name:'Grund', desc:'Vad källkritik är och de viktigaste frågorna', make:()=>shuffle(KK_GRUND).map(x=>KQ(...x))},
      {name:'Fördjupning', desc:'Klickbeten, falska konton och gamla bilder', make:()=>shuffle(KK_FORD).map(x=>KQ(...x))},
      {name:'Utmaning', desc:'Granska tre källor, plus en skrivuppgift', make:()=>shuffle(KK_UTM).map(x=>withText(KQ(...x), KK_TEXT)),
        writing:{
          task:'Tänk på de tre källorna om energidrycker: reklam från ett företag (A), en uppdaterad text från en myndighet (B) och en kommentar under en video (C). Skriv 4–6 meningar: Vilken källa skulle du använda i ett skolarbete, och varför? Använd minst ett av orden äkthet, tid, beroende eller tendens.',
          check:['Säger du tydligt vilken källa du väljer?','Förklarar du varför, med minst ett källkritiskt ord?','Förklarar du också varför du inte väljer de andra källorna?','Börjar meningarna med stor bokstav och slutar med punkt?'],
          focus:'Fokusera på om eleven väljer en rimlig källa och motiverar valet med källkritiska begrepp. Källa A är reklam från ett energidrycksföretag, källa B är en uppdaterad text från en myndighet som avråder unga från energidrycker, och källa C är en kommentar från en privatperson. Ge ett konkret exempel ur elevens text på något som fungerar och något som kan bli tydligare.'
        }}
    ]
  }
});
