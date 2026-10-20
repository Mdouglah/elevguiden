/* ==========================================================
   ELEVGUIDEN – INNEHÅLL FÖR ÅRSKURS 8
   Laddas av index.html och använder hjälpfunktionerna där.
   ========================================================== */

/* ---------- MATEMATIK: EKVATIONER ---------- */
const EQ = {
  g1(){ const a=rnd(2,20), x=rnd(1,30), b=x+a; return numQ({ prompt:`Lös ekvationen: x + ${a} = ${b}`, answer:x,
    hints:[`Vilket tal plus ${a} blir ${b}?`,`Dra bort ${a} från båda sidor: x = ${b} − ${a}.`],
    solution:`x + ${a} = ${b}. Dra bort ${a} från båda sidor: x = ${b} − ${a} = ${x}`,
    wrongs:[[b+a,`Du har lagt till ${a}. För att få x ensamt drar du i stället bort ${a} från båda sidor.`]] }); },
  g2(){ const a=rnd(2,20), x=rnd(a+1,40), b=x-a; return numQ({ prompt:`Lös ekvationen: x − ${a} = ${b}`, answer:x,
    hints:[`Vilket tal minus ${a} blir ${b}?`,`Lägg till ${a} på båda sidor: x = ${b} + ${a}.`],
    solution:`x − ${a} = ${b}. Lägg till ${a} på båda sidor: x = ${b} + ${a} = ${x}`,
    wrongs:[[b-a,`Du har dragit bort ${a}. Gör det motsatta: lägg till ${a} på båda sidor.`]] }); },
  g3(){ const a=rnd(2,9), x=rnd(2,12), b=a*x; return numQ({ prompt:`Lös ekvationen: ${a}x = ${b}`, answer:x,
    hints:[`${a}x betyder ${a} gånger x. Vilket tal gånger ${a} blir ${b}?`,`Dela båda sidor med ${a}.`],
    solution:`${a}x = ${b}. Dela båda sidor med ${a}: x = ${b} / ${a} = ${x}`,
    wrongs:[[b-a,`Du har dragit bort ${a}. Men ${a}x betyder ${a} gånger x, så du ska dela med ${a}.`],[b*a,`Du har gångrat. Gör det motsatta: dela med ${a}.`]] }); },

  f1(){ const a=rnd(2,6), x=rnd(1,10), b=rnd(1,15), c=a*x+b; return numQ({ prompt:`Lös ekvationen: ${a}x + ${b} = ${c}`, answer:x,
    hints:[`Börja med att få bort + ${b}. Vad gör du då på båda sidor?`,`${a}x = ${c} − ${b} = ${c-b}. Vad blir x?`],
    solution:`Dra bort ${b} från båda sidor: ${a}x = ${c-b}. Dela med ${a}: x = ${x}`,
    wrongs:[[(c+b)/a,`Du lade till ${b}. Dra i stället bort ${b} från båda sidor.`],[c-b,`Bra start! ${a}x = ${c-b}. Dela nu också med ${a}.`]] }); },
  f2(){ const a=rnd(2,6), b=rnd(2,12), x=a*b; return numQ({ prompt:`Lös ekvationen: x / ${a} = ${b}`, answer:x,
    hints:[`x delat med ${a} blir ${b}. Är x större eller mindre än ${b}?`,`Gånga båda sidor med ${a}.`],
    solution:`x / ${a} = ${b}. Gånga båda sidor med ${a}: x = ${b} · ${a} = ${x}`,
    wrongs:[[b/a,`Du har delat. Gör det motsatta: gånga båda sidor med ${a}.`]] }); },
  f3(){ const a=rnd(2,6), x=rnd(2,10), b=rnd(1,Math.min(12, a*x-1)), c=a*x-b; return numQ({ prompt:`Lös ekvationen: ${a}x − ${b} = ${c}`, answer:x,
    hints:[`Börja med att få bort − ${b}. Vad gör du då på båda sidor?`,`${a}x = ${c} + ${b} = ${c+b}. Vad blir x?`],
    solution:`Lägg till ${b} på båda sidor: ${a}x = ${c+b}. Dela med ${a}: x = ${x}`,
    wrongs:[[(c-b)/a,`Du drog bort ${b}. Lägg i stället till ${b} på båda sidor.`],[c+b,`Bra start! ${a}x = ${c+b}. Dela nu också med ${a}.`]] }); },

  u1(){ const c=rnd(1,4), a=c+rnd(1,4), x=rnd(1,10), b=rnd(1,10), d=(a-c)*x+b;
    return numQ({ prompt:`Lös ekvationen: ${cx(a)} + ${b} = ${cx(c)} + ${d}`, answer:x,
    hints:[`Samla alla x på ena sidan. Vad händer om du drar bort ${cx(c)} från båda sidor?`,`${cx(a-c)} + ${b} = ${d}. Fortsätt som vanligt.`],
    solution:`Dra bort ${cx(c)}: ${cx(a-c)} + ${b} = ${d}. Dra bort ${b}: ${cx(a-c)} = ${d-b}. x = ${x}`,
    wrongs:[[(d-b)/(a+c),`Du lade ihop x-termerna. Dra i stället bort ${cx(c)} från båda sidor.`]] }); },
  u2(){ const a=rnd(2,5), b=rnd(1,8), x=rnd(1,10), c=a*(x+b);
    return numQ({ prompt:`Lös ekvationen: ${a}(x + ${b}) = ${c}`, answer:x,
    hints:[`Börja med att multiplicera in ${a} i parentesen. Vad blir ${a} · x och ${a} · ${b}?`,`${a}x + ${a*b} = ${c}. Fortsätt som vanligt.`],
    solution:`Multiplicera in: ${a}x + ${a*b} = ${c}. Dra bort ${a*b}: ${a}x = ${c-a*b}. Dela med ${a}: x = ${x}`,
    wrongs:[[(c-b)/a,`Du gångrade bara ${a} med x. ${a} ska gångas med båda talen i parentesen.`],[c/a,`Det där är värdet av hela parentesen, x + ${b}. Vad är då x?`]] }); },
  u3(){ const a=pick([150,200,250,300]), b=pick([100,200,300]), x=rnd(2,12), c=a*x+b;
    return numQ({ prompt:`Ett gym kostar ${b} kr i startavgift och sedan ${a} kr per månad. Ali har betalat ${c} kr totalt. Hur många månader har han tränat?`, answer:x,
    hints:['Skriv en ekvation. Låt x vara antalet månader. Hur mycket kostar x månader?',`${a}x + ${b} = ${c}. Lös ekvationen.`],
    solution:`${a}x + ${b} = ${c}. ${a}x = ${c-b}. x = ${x} månader`,
    wrongs:[[c/a,`Du glömde startavgiften. Dra först bort ${b} kr.`]] }); }
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

/* ---------- ALLA OMRÅDEN I ÅRSKURS 8 ---------- */
Object.assign(CONTENT, {
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
  }
});
