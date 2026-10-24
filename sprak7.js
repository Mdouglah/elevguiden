/* ==========================================================
   ELEVGUIDEN – NYA OMRÅDEN I SVENSKA OCH ENGELSKA, ÅRSKURS 7
   Svenska: Ordförråd, Stavning och skiljetecken.
   Engelska: Hörförståelse, Ställa frågor.
   Laddas efter ak9.js och använder hjälpfunktionerna i index.html.
   ========================================================== */
(function(){ /* Allt i en egen funktion, så att namnen inte krockar med ak-filerna */

const SQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som passar bäst.', prompt, options, answer:options[0], hints, solution, diagnose: () => hints[1] });
const EQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som passar bäst.', prompt, lang:'en', options, answer:options[0], hints, solution, diagnose: () => hints[1] });
const LQ = (audio, prompt, options, h1, solution) => choiceQ({ instr:'Tryck på Lyssna och hör vad som sägs. Välj sedan rätt svar.', prompt, lang:'en', audio, options, answer:options[0],
  hints:[h1, `Det här sägs: ”${audio}”`], solution, diagnose: () => h1 });
const lv = (name, desc, pool, f, n=8) => ({ name, desc, make:() => shuffle(pool).slice(0, n).map(x => f(...x)) });

/* ---------- SVENSKA: ORDFÖRRÅD ---------- */
const SYN = [
  ['glad','lycklig','ledsen','trött'],['snabb','kvick','långsam','tung'],['börja','starta','sluta','vänta'],
  ['svår','krånglig','enkel','mjuk'],['stor','enorm','liten','smal'],['rädd','skrämd','modig','arg'],
  ['prata','samtala','tiga','skriva'],['tyst','stilla','högljudd','ljus'],['titta','se','lyssna','smaka'],['trött','utmattad','pigg','hungrig']
];
const synQ = (w, s, d1, d2) => SQ(`Vilket ord betyder nästan samma sak som ”${w}”?`, [s, d1, d2],
  ['Ord som betyder ungefär samma sak kallas synonymer.', `Byt ut ”${w}” mot alternativen i en mening, till exempel ”Hon var ${w}”. Vilket ord passar utan att betydelsen ändras?`],
  `”${s}” betyder ungefär samma sak som ”${w}”. Orden är synonymer.`);
const ANT = [
  ['modig','feg','stark','glad'],['tillåta','förbjuda','låta','ge'],['tidig','sen','snabb','ny'],['vinna','förlora','spela','tävla'],
  ['billig','dyr','gammal','fin'],['svag','stark','liten','mjuk'],['öppna','stänga','låsa upp','ta'],['frisk','sjuk','trött','glad'],['minnas','glömma','tänka','veta']
];
const antQ = (w, a, d1, d2) => SQ(`Vilket ord betyder motsatsen till ”${w}”?`, [a, d1, d2],
  ['Ett motsatsord betyder det omvända, som varm och kall.', `Tänk dig ”${w}” på ena sidan av en våg. Vilket ord hamnar längst bort på andra sidan?`],
  `Motsatsen till ”${w}” är ”${a}”.`);
const IDIOM = [
  ['ha is i magen','vara lugn och inte stressa','vara hungrig','ha ont i magen'],
  ['bita ihop','kämpa vidare fast det är jobbigt','bli arg','äta fort'],
  ['slå två flugor i en smäll','göra två saker på en gång','vara elak mot djur','vara snabb'],
  ['lägga näsan i blöt','lägga sig i andras saker','bli förkyld','gråta'],
  ['vara på hugget','vara pigg och redo','vara arg','ha bråttom'],
  ['ta något med en nypa salt','inte tro på allt helt och hållet','laga mat','vara snål'],
  ['gå som katten kring het gröt','undvika att säga det viktiga','gå långsamt','vara hungrig'],
  ['det är ingen ko på isen','det är ingen fara','det är kallt ute','det är halt'],
  ['få kalla fötter','ångra sig och bli rädd i sista stund','frysa','springa iväg']
];
const idiomQ = (u, ok, d1, d2) => SQ(`Vad betyder uttrycket ”att ${u}”?`, [ok, d1, d2],
  ['Ett uttryck betyder ofta något annat än orden var för sig. Tänk på när man kan säga så.', `Prova uttrycket i en mening: ”Inför provet försökte hon ${u}.” Vilken betydelse passar?`],
  `”Att ${u}” betyder att ${ok}.`);

/* ---------- SVENSKA: STAVNING OCH SKILJETECKEN ---------- */
const CAPS = [
  ['Vi åkte till Göteborg i juni.','vi åkte till göteborg i juni.','Vi åkte till Göteborg i Juni.'],
  ['Min kompis Sara bor i Uppsala.','Min kompis sara bor i uppsala.','min Kompis Sara bor i Uppsala.'],
  ['På måndag har vi engelska.','På Måndag har vi Engelska.','på måndag har vi Engelska.'],
  ['Jag pratar svenska och arabiska.','Jag pratar Svenska och Arabiska.','jag pratar svenska och Arabiska.'],
  ['Har du sett min mobil?','Har du sett min mobil.','har du sett min mobil?'],
  ['Vi firar midsommar i Dalarna.','Vi firar Midsommar i dalarna.','vi firar midsommar i Dalarna.'],
  ['Hon kommer från Syrien och bor nu i Enköping.','Hon kommer från syrien och bor nu i enköping.','Hon Kommer från Syrien och bor nu i Enköping.'],
  ['I december firar många jul.','I December firar många Jul.','i december firar många jul.']
];
const capsQ = (ok, w1, w2) => SQ('Vilken mening är rätt skriven?', [ok, w1, w2],
  ['Titta på de stora bokstäverna. Namn på personer, städer och länder skrivs med stor bokstav.', 'Veckodagar, månader, högtider och språk skrivs med liten bokstav på svenska. En mening börjar med stor bokstav och slutar med punkt, frågetecken eller utropstecken.'],
  `Rätt: ${ok} Namn på personer, orter och länder har stor bokstav. Veckodagar, månader, högtider och språk har liten bokstav.`);
const SJ = [
  ['sjuk','schuk','skjuk'],['tjugo','kjugo','schugo'],['skjorta','sjorta','chorta'],['kjol','tjol','sjol'],['stjärna','sjärna','tjärna'],
  ['choklad','sjoklad','skoklad'],['djur','jur','gjur'],['gärna','järna','jerna'],['ljus','jus','gjus'],['hjälp','jälp','gjälp'],['sked','sjed','chäd']
];
const SJ_RULE = 'Sj-ljudet kan stavas sj, skj, stj, sk, sch eller ch. Tj-ljudet stavas tj, kj eller k före e, i, y, ä och ö. J-ljudet kan stavas j, dj, gj, hj eller lj.';
const sjQ = (ok, w1, w2) => SQ('Vilket ord är rätt stavat?', [ok, w1, w2],
  ['Säg ordet tyst för dig själv. Har du sett det skrivet, på en skylt eller i en bok?', SJ_RULE],
  `Rätt stavning: ${ok}. ${SJ_RULE}`);
const COMMA = [
  ['Jag ville gå ut, men det regnade.','Jag ville, gå ut men det regnade.','Jag ville gå ut men, det regnade.','Sätt komma före men när det binder ihop två meningar.'],
  ['När vi kom hem, var middagen klar.','När vi, kom hem var middagen klar.','När vi kom hem var, middagen klar.','När en mening börjar med en bisats, som ”när vi kom hem”, sätter man komma efter bisatsen.'],
  ['Vi köpte mjölk, bröd, ost och ägg.','Vi köpte, mjölk bröd ost och ägg.','Vi köpte mjölk bröd, ost, och ägg.','I en uppräkning står det komma mellan sakerna, men inte före och.'],
  ['Om du har tid, kan du hjälpa mig?','Om du har, tid kan du hjälpa mig?','Om, du har tid kan du hjälpa mig?','Efter en inledande bisats, som ”om du har tid”, sätter man komma.'],
  ['Hon är trött, för hon sov dåligt.','Hon är, trött för hon sov dåligt.','Hon är trött för, hon sov dåligt.','Sätt komma före för när det binder ihop två meningar.'],
  ['Jag har tre syskon: Ali, Sara och Noor.','Jag har tre syskon, Ali: Sara och Noor.','Jag har: tre syskon Ali Sara och Noor.','Kolon kan stå före en uppräkning eller en förklaring.'],
  ['– Kom hit! ropade läraren.','Kom hit – ropade läraren!','– Kom hit ropade! läraren.','En replik börjar med talstreck, och utropstecknet står direkt efter det som sägs.'],
  ['Hej, hur mår du?','Hej hur, mår du?','Hej hur mår, du?','Efter en hälsning, som hej, sätter man komma.']
];
const commaQ = (ok, w1, w2, why) => SQ('Vilken mening har rätt skiljetecken?', [ok, w1, w2],
  ['Läs meningarna högt. Var gör du en naturlig paus?', why], `Rätt: ${ok} ${why}`);

/* ---------- ENGELSKA: HÖRFÖRSTÅELSE ---------- */
const L7_GRUND = [
  ["Hi, I'm Lina. I'm thirteen years old and I live in Leeds with my mum and my two brothers.",'How many brothers does Lina have?',['Two','One','Three'],'Lyssna efter ett tal före ordet brothers.','Lina har två bröder: ”my two brothers”.'],
  ['The bus to the city centre leaves at a quarter past nine from stop number four.','When does the bus leave?',['At 9.15','At 9.45','At 4.15'],'A quarter past nine betyder kvart över nio.','Bussen går kvart över nio, alltså 9.15.'],
  ['Can I have a cheese sandwich and an orange juice, please? No, not apple juice. Orange.','What does the person want to drink?',['Orange juice','Apple juice','Water'],'Personen ändrar sig mitt i. Lyssna på slutet.','Personen vill ha apelsinjuice, inte äppeljuice.'],
  ["My favourite subject is music, but I'm also good at maths. I don't like PE very much.",'Which subject does the speaker not like very much?',['PE','Music','Maths'],"Lyssna efter don't like.","PE (idrott) är ämnet personen inte tycker så mycket om."],
  ["It's going to be sunny in the morning, but it will rain in the afternoon, so take an umbrella.",'What will the weather be like in the afternoon?',['Rainy','Sunny','Snowy'],'Afternoon betyder eftermiddag.','På eftermiddagen ska det regna. Därför ska man ta med paraply.'],
  ['The party is on Saturday at my house. It starts at six, and please bring something to drink.','What should the guests bring?',['Something to drink','A present','Food'],'Lyssna efter ordet bring.','Gästerna ska ta med något att dricka.'],
  ['Excuse me, where is the library? Go straight on, and turn left after the church.','Where should you turn left?',['After the church','Before the school','At the station'],'Turn left betyder sväng vänster.','Man ska svänga vänster efter kyrkan.'],
  ['I have a dog called Max. He is black and white, and he loves playing in the snow.','What colour is Max?',['Black and white','Brown','All black'],'Colour betyder färg.','Max är svartvit.']
];
const L7_FORD = [
  ["Oh no, I forgot my keys again! And Mum won't be home until eight.",'How does the speaker probably feel?',['Annoyed','Happy','Excited'],'Hur låter det när någon säger ”Oh no”?','Personen är irriterad, för hen har glömt nycklarna och kommer inte in.'],
  ["Thanks so much for the flowers! They are beautiful. You really didn't have to.",'What is the speaker doing?',['Thanking someone for a gift','Buying flowers','Complaining'],'Lyssna efter ordet thanks.','Personen tackar för blommor som hen har fått.'],
  ["Sorry I'm late. The train stopped for twenty minutes because of snow on the tracks.",'Why is the speaker late?',['The train was delayed by snow','The speaker overslept','The speaker missed the bus'],'Lyssna efter ordet because.','Tåget stod still i tjugo minuter på grund av snö.'],
  ["I'd like to book a table for four people at seven o'clock tonight, please.",'Where is the speaker probably calling?',['A restaurant','A school','A hospital'],'Var bokar man ett bord?','Man bokar bord på en restaurang.'],
  ["Don't forget: the test is on Friday. You can use a dictionary, but not your phone.",'Who is probably speaking?',['A teacher','A shop assistant','A bus driver'],'Vem pratar om prov?','Det är troligen en lärare, eftersom det handlar om ett prov.'],
  ['I tried basketball last year, but now I prefer swimming. It is more relaxing.','Which sport does the speaker like best now?',['Swimming','Basketball','Football'],'Prefer betyder föredrar.','Personen tycker mest om simning nu.']
];
const L7_BIKE = 'Hello, this is a message for Sam. Your bike is ready at the repair shop. It cost two hundred and fifty kronor. We are open until five today, but tomorrow we close at three.';
const L7_TRIP = "Good morning, everyone. Today's school trip is cancelled because of the storm. Instead, we will have normal lessons, but lunch will be served thirty minutes earlier than usual.";
const L7_AHMED = "My name is Ahmed. I moved to Sweden two years ago. At first I didn't understand anything at school, but my classmates helped me a lot. Now my best friend is Erik, who sat next to me on my first day.";
const L7_UTM = [
  [L7_BIKE,'When does the shop close tomorrow?',['At three','At five','At two'],'Lyssna efter ordet tomorrow.','I morgon stänger verkstaden klockan tre.'],
  [L7_BIKE,'How much did the repair cost?',['250 kronor','215 kronor','500 kronor'],'Two hundred and fifty betyder tvåhundrafemtio.','Lagningen kostade 250 kronor.'],
  [L7_TRIP,'What changes about lunch?',['It is thirty minutes earlier','It is cancelled','It is thirty minutes later'],'Earlier betyder tidigare.','Lunchen serveras trettio minuter tidigare än vanligt.'],
  [L7_TRIP,'Why is the trip cancelled?',['Because of the storm','Because the bus broke down','Because the teacher is ill'],'Lyssna efter ordet because.','Utflykten blir inställd på grund av stormen.'],
  [L7_AHMED,'Who is Erik?',["Ahmed's best friend, who sat next to him on his first day","Ahmed's teacher","Ahmed's brother"],'Lyssna på slutet.','Erik är Ahmeds bästa vän. Han satt bredvid Ahmed första dagen.'],
  [L7_AHMED,'How did Ahmed feel at school at first?',["Confused, because he didn't understand anything",'Bored','Angry with his classmates'],'At first betyder i början.','I början förstod Ahmed ingenting, så han var nog förvirrad.']
];

/* ---------- ENGELSKA: STÄLLA FRÅGOR ---------- */
const DO_RULE = 'Med he, she, it och ett namn använder du does. Med I, you, we och they använder du do.';
const DO = [
  ['___ you like pizza?','Do','Does','Are'],['___ she play the piano?','Does','Do','Is'],['___ they live in London?','Do','Does','Is'],
  ['___ your brother have a car?','Does','Do','Has'],['___ we have homework today?','Do','Does','Are'],['___ he speak Spanish?','Does','Do','Is'],
  ['___ your parents work at the hospital?','Do','Does','Are'],['___ it rain a lot in Scotland?','Does','Do','Is']
];
const doQ = (s, ok, w1, w2) => EQ(s, [ok, w1, w2], ['Vem handlar frågan om? En person, eller flera?', DO_RULE], `${fill(s, ok)} ${DO_RULE}`);
const WH = [
  ['___ is your birthday? – In May.','When','Where','Who','Svaret är en tidpunkt.'],
  ['___ do you live? – In Enköping.','Where','When','What','Svaret är en plats.'],
  ['___ is your teacher? – Mr Brown.','Who','What','Where','Svaret är en person.'],
  ['___ old are you? – Fourteen.','How','What','Who','På engelska frågar man ”How old”, alltså hur gammal.'],
  ['___ do you like football? – Because it is fun.','Why','What','When','Svaret börjar med because, alltså eftersom.'],
  ['___ is your favourite food? – Pasta.','What','Who','Where','Svaret är en sak.'],
  ['___ much is this T-shirt? – Fifteen pounds.','How','What','Which','På engelska frågar man ”How much”, alltså hur mycket.'],
  ['___ bag is this? – It is Anna’s.','Whose','Who','Which','Svaret säger vem som äger något.']
];
const whQ = (s, ok, w1, w2, why) => EQ(s, [ok, w1, w2], ['Titta på svaret efter strecket. Vad frågar man efter: tid, plats, person, sak eller orsak?', why], `${fill(s, ok)} ${why}`);
const QF_RULE = 'I en fråga står do, does eller did före subjektet, och sedan kommer verbet i grundform. Med am, is, are, can och will byter du bara plats: Are you …? Can you …?';
const QF = [
  ['Where do you live?','Where you live?','Where does you live?'],['What does she want?','What she wants?','What do she want?'],
  ['Did you see the film?','Did you saw the film?','Do you saw the film?'],['Why are you late?','Why you are late?','Why do you late?'],
  ['How often do they train?','How often they train?','How often does they train?'],['Can you help me?','Do you can help me?','Can you to help me?'],
  ['Is he your brother?','Does he your brother?','Is he you brother?'],['What time does the film start?','What time the film starts?','What time do the film start?']
];
const qfQ = (ok, w1, w2) => EQ('Which question is correct?', [ok, w1, w2], ['Var står do, does eller did? Och vilken form har verbet efter?', QF_RULE], `Rätt: ${ok} ${QF_RULE}`);

/* ---------- NYA OMRÅDEN I ÅRSKURS 7 ---------- */
Object.assign(CONTENT, {
  '7-svenska-ordforrad':{
    intro:[
      'Ju fler ord du kan, desto lättare blir det att förstå texter och att säga precis det du menar.',
      'Synonymer är ord som betyder ungefär samma sak, som glad och lycklig. Motsatsord betyder det omvända, som varm och kall.',
      'Svenskan har också många uttryck som betyder något annat än orden var för sig. ”Att ha is i magen” betyder att vara lugn, inte att man har ätit is.'
    ],
    example:{title:'Exempel: Byt ut ett ord', steps:['Meningen är: Filmen var bra.','Bra är ett vanligt ord. Det finns andra ord som säger mer.','Filmen var spännande, rolig eller gripande.','Svar: Med ett mer exakt ord förstår läsaren bättre vad du menar.']},
    levels:[
      lv('Grund','Synonymer: ord som betyder ungefär samma sak', SYN, synQ),
      lv('Fördjupning','Motsatsord', ANT, antQ),
      lv('Utmaning','Svenska uttryck och vad de betyder', IDIOM, idiomQ)
    ]
  },
  '7-svenska-stavning':{
    intro:[
      'När du stavar rätt och använder skiljetecken blir texten lättare att läsa. Läsaren behöver inte fundera på vad du menar.',
      'På svenska skrivs namn på personer, städer och länder med stor bokstav. Veckodagar, månader, högtider och språk skrivs med liten bokstav: måndag, juni, jul och engelska.',
      'Vissa ljud kan stavas på flera sätt, som sj-ljudet i sjuk, skjorta och choklad. Skiljetecken, som punkt, komma och frågetecken, visar var läsaren ska göra pauser.'
    ],
    example:{title:'Exempel: Stor eller liten bokstav?', steps:['Meningen är: på fredag åker Ali till stockholm.','Meningen ska börja med stor bokstav: På.','Fredag är en veckodag, så den har liten bokstav.','Ali och Stockholm är namn, så de har stor bokstav.','Svar: På fredag åker Ali till Stockholm.']},
    levels:[
      lv('Grund','Stor och liten bokstav, punkt och frågetecken', CAPS, capsQ),
      lv('Fördjupning','Sj-ljud, tj-ljud och j-ljud', SJ, sjQ),
      lv('Utmaning','Komma, kolon och repliker', COMMA, commaQ)
    ]
  },
  '7-engelska-horforstaelse':{
    intro:[
      'Att förstå talad engelska är något man kan träna på. Du behöver inte förstå varje ord. Lyssna efter de ord som är viktiga för frågan.',
      'Läs frågan innan du lyssnar. Då vet du vad du ska lyssna efter, till exempel ett tal, en tid, en plats eller en känsla.',
      'Tryck på Lyssna så många gånger du vill. Om det går för fort finns texten i den andra ledtråden.'
    ],
    example:{title:'Exempel: Lyssna efter det viktiga', steps:['Frågan är: When does the bus leave?','Då lyssnar du efter en tid.','Du hör: ”The bus leaves at a quarter past nine.”','A quarter past nine betyder kvart över nio. Svar: 9.15.']},
    levels:[
      lv('Grund','Hitta fakta: tal, tider och platser', L7_GRUND, LQ),
      lv('Fördjupning','Förstå känslor och sammanhang', L7_FORD, LQ),
      lv('Utmaning','Längre meddelanden', L7_UTM, LQ)
    ]
  },
  '7-engelska-fragor':{
    intro:[
      'När du ställer frågor på engelska behöver du ofta hjälpordet do eller does. Do you like music? Does she play football?',
      'Frågeord visar vad du vill veta: what (vad), where (var), when (när), who (vem), why (varför) och how (hur).',
      'Med am, is, are, can och will byter du bara plats på orden: You are tired blir Are you tired? You can swim blir Can you swim?'
    ],
    example:{title:'Exempel: Gör om till en fråga', steps:['Meningen är: She likes pizza.','Subjektet är she, så det blir does.','Efter does står verbet i grundform: like, inte likes.','Svar: Does she like pizza?']},
    levels:[
      lv('Grund','Do eller does?', DO, doQ),
      lv('Fördjupning','Frågeord: what, where, when, who, why och how', WH, whQ),
      { ...lv('Utmaning','Rätt ordföljd i frågor, plus en skrivuppgift', QF, qfQ),
        writing:{
          task:'Skriv 6–8 frågor på engelska som du skulle vilja ställa till en ny klasskompis. Använd olika frågeord och både do och does.',
          check:['Har du skrivit 6–8 frågor?','Använder du olika frågeord, till exempel what, where och why?','Står do eller does före subjektet, och verbet i grundform efter?','Slutar varje fråga med frågetecken?'],
          focus:'Fokusera på om frågorna är rätt byggda: do eller does före subjektet och verbet i grundform, eller omvänd ordföljd med am, is, are och can. Om något är fel, visa ett exempel ur elevens text och hur det blir rätt. Citera engelska ord på engelska.'
        }}
    ]
  }
});
})();
