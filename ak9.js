
/* ==========================================================
   ELEVGUIDEN – INNEHÅLL FÖR ÅRSKURS 9
   Laddas av index.html och använder hjälpfunktionerna där.
   ========================================================== */

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
  f3(){ const [txt,ans,calc,sum]=pick([
      ['Du singlar slant två gånger. Hur stor är sannolikheten att du får krona båda gångerna?',1/4,'1/2 · 1/2 = 1/4',1],
      ['Du kastar två tärningar. Hur stor är sannolikheten att båda visar en sexa?',1/36,'1/6 · 1/6 = 1/36',1/3],
      ['Du singlar slant och kastar en tärning. Hur stor är sannolikheten att du får krona och en sexa?',1/12,'1/2 · 1/6 = 1/12',2/3],
      ['Du singlar slant tre gånger. Hur stor är sannolikheten att du får krona alla tre gångerna?',1/8,'1/2 · 1/2 · 1/2 = 1/8',3/2]]);
    return numQ({ instr:SA_INSTR, prompt:txt, answer:ans,
    hints:['Räkna ut sannolikheten för varje händelse för sig.','När flera saker ska hända gångrar du sannolikheterna med varandra.'],
    solution:calc,
    wrongs:[[sum,'Du lade ihop sannolikheterna. När alla ska hända gångrar du dem.']] }); },

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
