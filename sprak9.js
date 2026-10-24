/* ==========================================================
   ELEVGUIDEN – NYA OMRÅDEN I SVENSKA OCH ENGELSKA, ÅRSKURS 9
   Svenska: Skolord i uppgifter, Språken i Sverige och Norden.
   Engelska: Hörförståelse, Engelska i världen.
   Laddas efter ak9.js och använder hjälpfunktionerna i index.html.
   ========================================================== */
(function(){ /* Allt i en egen funktion, så att namnen inte krockar med ak-filerna */

const SQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som passar bäst.', prompt, options, answer:options[0], hints, solution, diagnose: () => hints[1] });
const EQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som passar bäst.', prompt, lang:'en', options, answer:options[0], hints, solution, diagnose: () => hints[1] });
const LQ = (audio, prompt, options, h1, solution) => choiceQ({ instr:'Tryck på Lyssna och hör vad som sägs. Välj sedan rätt svar.', prompt, lang:'en', audio, options, answer:options[0],
  hints:[h1, `Det här sägs: ”${audio}”`], solution, diagnose: () => h1 });
const lv = (name, desc, pool, f, n=8) => ({ name, desc, make:() => shuffle(pool).slice(0, n).map(x => f(...x)) });

/* ---------- SVENSKA: SKOLORD I UPPGIFTER ---------- */
const SO_GRUND = [
  ['Vad betyder det att jämföra?',['Att visa likheter och skillnader','Att bara beskriva en sak','Att säga vad man tycker'],['När jämför man två saker?','Man tittar på vad som är lika och vad som skiljer.'],'Att jämföra betyder att visa likheter och skillnader.'],
  ['Vad betyder det att beskriva?',['Att berätta hur något är eller ser ut','Att förklara varför något har hänt','Att ge sin åsikt'],['Tänk på en beskrivning av en person.','Beskriva svarar på frågan hur något är.'],'Att beskriva betyder att berätta hur något är eller ser ut.'],
  ['Vad betyder det att förklara?',['Att visa hur eller varför något är som det är','Att räkna upp saker','Att rita en bild'],['Förklara svarar på frågorna hur och varför.','Ord som eftersom och därför hjälper när man förklarar.'],'Att förklara betyder att visa hur eller varför något är som det är.'],
  ['Vad betyder det att motivera?',['Att ge skäl för det man tycker eller väljer','Att peppa någon','Att sammanfatta'],['I skolan betyder motivera något annat än att peppa.','Motivera betyder att svara på frågan varför du tycker så.'],'Att motivera betyder att ge skäl för det man tycker eller väljer.'],
  ['Vad betyder det att sammanfatta?',['Att kort återge det viktigaste','Att skriva om allt i detalj','Att ge sin åsikt'],['Sammanfatta betyder att korta ner.','Bara det viktigaste kommer med.'],'Att sammanfatta betyder att kort återge det viktigaste.'],
  ['Vad betyder det att resonera?',['Att fundera på olika sidor av en fråga och dra en slutsats','Att svara med ett ord','Att skriva en dikt'],['Resonera handlar om att tänka i flera steg.','Man väger olika tankar mot varandra.'],'Att resonera betyder att fundera på olika sidor och dra en slutsats.'],
  ['Vad betyder det att reflektera?',['Att tänka efter om något, till exempel om egna erfarenheter','Att spegla något','Att räkna'],['Reflektera handlar om att tänka efter.','Man kopplar ofta till sig själv: vad tycker jag, och varför?'],'Att reflektera betyder att tänka efter, ofta om egna erfarenheter.'],
  ['Vad betyder det att analysera?',['Att undersöka delarna och hur de hänger ihop','Att läsa snabbt','Att gissa'],['Analys handlar om att undersöka noga.','Man delar upp något och tittar på hur delarna fungerar tillsammans.'],'Att analysera betyder att undersöka delarna och hur de hänger ihop.']
];
const SO_FORD = [
  ['Uppgiften säger: ”Jämför de två texterna.” Vilket svar gör det?',['Båda handlar om vänskap, men den första är glad och den andra sorglig.','Den första texten handlar om vänskap.','Jag gillar den andra texten mest.'],['Att jämföra betyder att visa likheter och skillnader.','Vilket svar tar upp både något som är lika och något som skiljer?'],'Det första svaret visar både en likhet och en skillnad.'],
  ['Uppgiften säger: ”Motivera ditt svar.” Vilket svar gör det?',['Jag väljer källa B, eftersom den kommer från en myndighet.','Jag väljer källa B.','Källa B är bra.'],['Motivera betyder att ge ett skäl.','Leta efter ordet eftersom.'],'Det första svaret ger ett skäl: eftersom den kommer från en myndighet.'],
  ['Uppgiften säger: ”Förklara varför Noah hjälper kvinnan.” Vilket svar förklarar?',['Han hjälper henne eftersom han ser att hon inte kan bära kassen själv.','Noah hjälper kvinnan.','Kvinnan har apelsiner.'],['Förklara svarar på frågan varför.','Vilket svar har med ett skäl?'],'Det första svaret förklarar varför.'],
  ['Uppgiften säger: ”Beskriv miljön i novellen.” Vilket svar beskriver?',['Det är en mörk och regnig kväll vid en gammal busshållplats.','Novellen är bra.','Huvudpersonen är tretton år.'],['Miljön är var och när berättelsen utspelar sig.','Vilket svar berättar hur platsen är?'],'Det första svaret beskriver platsen och tiden.'],
  ['Uppgiften säger: ”Sammanfatta texten.” Vilket svar sammanfattar?',['Texten handlar om att bin är viktiga för maten och att de behöver hjälp.','Bin har sex ben och två par vingar.','Jag tycker att bin är läskiga.'],['En sammanfattning tar med det viktigaste från hela texten.','Vilket svar handlar om hela texten, och inte om en detalj eller en åsikt?'],'Det första svaret återger det viktigaste i hela texten.'],
  ['Uppgiften säger: ”Resonera om för- och nackdelar med skoluniform.” Vilket svar resonerar?',['En fördel är att alla ser lika ut, men en nackdel är att man inte kan visa sin stil. Därför tror jag att …','Skoluniform är dåligt.','Skoluniformer finns i England.'],['Att resonera betyder att väga olika sidor mot varandra.','Vilket svar tar upp både för- och nackdelar och drar en slutsats?'],'Det första svaret väger för- och nackdelar mot varandra.'],
  ['Uppgiften säger: ”Ge exempel på hur huvudpersonen förändras.” Vilket svar ger exempel?',['I början vågar hon inte prata, men i slutet räcker hon upp handen.','Hon förändras mycket.','Hon heter Elin.'],['Ett exempel är något konkret från texten.','Vilket svar visar vad hon gör i början och i slutet?'],'Det första svaret ger konkreta exempel från början och slutet.'],
  ['Uppgiften säger: ”Utveckla ditt svar.” Vad betyder det?',['Skriv mer: förklara, ge exempel och visa hur du tänker','Skriv samma sak med andra ord','Skriv kortare'],['Utveckla betyder att bygga ut.','Fråga dig själv: varför, hur, och kan jag ge ett exempel?'],'Utveckla betyder att förklara mer, ge exempel och visa hur du tänker.']
];
const SO_UTM = [
  ['Vilket svar är mest välutvecklat?',['Elin känner sig ensam eftersom hon är ny i huset och mamma jobbar kvällar. Det syns när författaren skriver att det är så tyst att hon hör kylskåpet.','Elin är ensam.','Elin är ensam eftersom hon är ny.'],['Ett välutvecklat svar har både förklaring och exempel.','Vilket svar visar var i texten det syns?'],'Det första svaret förklarar och stödjer med ett exempel ur texten.'],
  ['Vad betyder ”nyanserat”?',['Att man visar flera sidor och inte överdriver','Att man använder många färger','Att man skriver snabbt'],['Tänk på motsatsen: svartvitt.','Ett nyanserat svar ser mer än en sida.'],'Nyanserat betyder att man visar flera sidor och inte överdriver.'],
  ['Vad betyder ”relevant”?',['Att något hör till ämnet och är viktigt för frågan','Att något är roligt','Att något är långt'],['Frågan är: hjälper det här att svara på uppgiften?','Det som inte hör till frågan är irrelevant.'],'Relevant betyder att det hör till ämnet och är viktigt för frågan.'],
  ['Vad betyder det att belägga ett påstående?',['Att visa var i texten eller i vilken källa det står','Att täcka över det','Att stryka det'],['Hur visar man att något stämmer?','Belägg är bevis, till exempel ett citat.'],'Att belägga betyder att visa var stödet finns, i texten eller i en källa.'],
  ['Vad betyder ”konsekvens”?',['Följd','Orsak','Fråga'],['En konsekvens kommer efter något annat.','Tänk: om det här händer, vad blir resultatet?'],'Konsekvens betyder följd.'],
  ['Vad betyder ”perspektiv”?',['Synvinkel, alltså hur någon ser på något','En sorts bild','Ett slut'],['Två personer kan se samma sak på olika sätt.','Perspektiv handlar om varifrån man ser.'],'Perspektiv betyder synvinkel.'],
  ['Vad ska du göra först när du får en skrivuppgift på ett prov?',['Läsa uppgiften noga och stryka under vad du ska göra','Börja skriva direkt','Räkna orden'],['Många tappar poäng för att de svarar på fel fråga.','Leta efter skolorden: jämför, förklara, motivera …'],'Läs uppgiften noga och stryk under vad du ska göra.'],
  ['Vad betyder det att kritiskt granska något?',['Att undersöka noga om något stämmer och är trovärdigt','Att säga något elakt','Att läsa snabbt'],['Kritisk betyder här noggrann, inte negativ.','Tänk på källkritik.'],'Att kritiskt granska betyder att noga undersöka om något stämmer.']
];

/* ---------- SVENSKA: SPRÅKEN I SVERIGE OCH NORDEN ---------- */
const NO_GRUND = [
  ['Vilka är Sveriges fem nationella minoritetsspråk?',['Finska, meänkieli, samiska, romani chib och jiddisch','Engelska, tyska, franska, spanska och arabiska','Norska, danska, isländska, färöiska och finska'],['Minoritetsspråken har talats i Sverige under mycket lång tid.','Ett av dem talas i Tornedalen och heter meänkieli.'],'Finska, meänkieli, samiska, romani chib och jiddisch är nationella minoritetsspråk.'],
  ['Vilket språk är huvudspråk i Sverige?',['Svenska','Engelska','Finska'],['Det står i språklagen.','Det är det språk som används i myndigheter och skola.'],'Svenska är huvudspråk i Sverige.'],
  ['Vilka språk ligger närmast svenskan?',['Norska och danska','Finska och samiska','Engelska och tyska'],['Vilka grannländer kan man ofta förstå utan att ha läst språket?','Svenska, norska och danska kallas grannspråk.'],'Norska och danska ligger närmast svenskan.'],
  ['Vad betyder ordet grannspråk?',['Språk i närliggande länder som liknar vårt eget','Språk som grannar talar i samma hus','Gamla språk som ingen talar'],['Granne betyder någon som bor nära.','Svenskar, norrmän och danskar kan ofta förstå varandra.'],'Grannspråk är språk i närliggande länder som liknar vårt eget.'],
  ['Vilket språk hör INTE till samma språkfamilj som svenska?',['Finska','Norska','Danska'],['Svenska, norska och danska är nordgermanska språk.','Ett av språken är släkt med estniska och ungerska.'],'Finska hör till en annan språkfamilj, den finsk-ugriska.'],
  ['Vilka är Sveriges urfolk?',['Samerna','Vikingarna','Tornedalingarna'],['Ett urfolk har levt i ett område sedan långt innan dagens gränser drogs.','Tornedalingarna är en nationell minoritet, men inte ett urfolk.'],'Samerna är Sveriges urfolk.'],
  ['I vilket land talar man isländska?',['Island','Irland','Grönland'],['Ländernas namn liknar varandra.','Isländska talas i landet med vulkaner och gejsrar.'],'Isländska talas på Island.'],
  ['Ungefär hur många språk talas i Sverige i dag?',['Över 150','Ungefär 5','Ungefär 20'],['Tänk på alla språk som talas i din skola.','Många som bor i Sverige har ett annat modersmål än svenska.'],'Över 150 språk talas i Sverige.']
];
const NO_FORD = [
  ['På danska betyder ”grine” …',['skratta','gråta','gräla'],['Ordet liknar ett svenskt ord, men betyder något annat.','Det är en falsk vän. På svenska betyder grina att gråta.'],'Grine betyder skratta på danska.'],
  ['På norska betyder ”rar” …',['konstig','snäll','gullig'],['Ordet liknar ett svenskt ord, men betyder något annat.','Om en norrman säger att du är rar, är det inte en komplimang.'],'Rar betyder konstig på norska.'],
  ['På danska betyder ”frokost” …',['lunch','frukost','middag'],['Ordet liknar ett svenskt ord, men det är en falsk vän.','Danskarna äter frokost mitt på dagen.'],'Frokost betyder lunch på danska.'],
  ['På danska betyder ”rolig” …',['lugn','kul','ledsen'],['Ordet liknar ett svenskt ord, men det är en falsk vän.','”Tag det roligt” betyder ta det lugnt.'],'Rolig betyder lugn på danska.'],
  ['På norska betyder ”artig” …',['rolig, alltså kul','snäll och hövlig','arg'],['Ordet liknar ett svenskt ord, men det är en falsk vän.','”Det var artig!” betyder att något var kul.'],'Artig betyder rolig, alltså kul, på norska.'],
  ['På danska betyder ”semester” …',['termin i skolan','ledighet från jobbet','sommar'],['Ordet liknar ett svenskt ord, men det är en falsk vän.','Det har med skolan och universitetet att göra.'],'Semester betyder termin på danska.'],
  ['På norska betyder ”glad i” …',['tycka om','vara glad','vara trött'],['Det är ett uttryck.','”Jeg er glad i deg” säger man till någon man älskar.'],'Glad i betyder tycka om, eller älska.'],
  ['På danska betyder ”glemme” …',['glömma','gömma','glimma'],['Säg ordet högt och tänk på svenska ord som låter likadant.','Det här ordet är inte en falsk vän.'],'Glemme betyder glömma.']
];
const NO_UTM = [
  ['Vad säger språklagen om svenskan?',['Svenska är huvudspråk i Sverige','Alla måste prata svenska hemma','Svenska får inte blandas med andra språk'],['Språklagen handlar om samhället, inte om vad man pratar hemma.','Lagen säger vilket språk som är huvudspråk.'],'Enligt språklagen är svenska huvudspråk i Sverige.'],
  ['Vad har en elev som tillhör en nationell minoritet rätt till i skolan?',['Modersmålsundervisning i sitt minoritetsspråk','Att slippa svenska','Att välja bort alla prov'],['Minoritetsspråken har ett särskilt skydd.','Eleven har rätt att få lära sig sitt språk i skolan.'],'Eleven har rätt till modersmålsundervisning i sitt minoritetsspråk.'],
  ['Vad är en dialekt?',['Ett sätt att tala som hör till en viss del av landet','Ett eget språk som inte är släkt med svenskan','Ett slangord'],['Tänk på hur man pratar i Skåne och i Norrland.','Dialekter skiljer sig i uttal, ord och ibland grammatik.'],'En dialekt är ett sätt att tala som hör till en viss del av landet.'],
  ['Vad är en sociolekt?',['Ett sätt att tala som hör till en viss grupp, till exempel en åldersgrupp','Ett skriftspråk','En norsk dialekt'],['Socio har med grupper i samhället att göra.','Unga kan prata på ett annat sätt än deras föräldrar.'],'En sociolekt är ett sätt att tala som hör till en viss grupp.'],
  ['Varför finns det många engelska ord i svenskan i dag?',['Engelska används mycket i musik, film, spel och på nätet','Svenskan saknar egna ord','Det är en lag'],['Var möter du engelska varje dag?','Ord följer med när språk möts.'],'Engelska används mycket i musik, film, spel och på nätet.'],
  ['Vad är ett lånord?',['Ett ord som har kommit in i svenskan från ett annat språk','Ett ord man lånar av en kompis','Ett ord som bara används en gång'],['Ord som dusch, choklad och jobb kommer från andra språk.','Svenskan har lånat ord från tyska, franska, engelska och många andra språk.'],'Ett lånord har kommit in i svenskan från ett annat språk, som dusch och choklad.'],
  ['Vad betyder det att vara flerspråkig?',['Att kunna använda flera språk','Att bara tala ett språk mycket bra','Att tala väldigt snabbt'],['Fler betyder flera.','Många elever i Sverige är flerspråkiga.'],'Att vara flerspråkig betyder att kunna använda flera språk.'],
  ['Varför kan det vara en styrka att kunna flera språk?',['Man kan prata med fler människor och förstå fler kulturer','Man slipper lära sig svenska','Det gör ingen skillnad'],['Tänk på vem du kan prata med om du kan två språk.','Forskning visar också att det kan vara lättare att lära sig ännu fler språk.'],'Flera språk gör att man kan prata med fler och förstå fler kulturer.']
];

/* ---------- ENGELSKA: HÖRFÖRSTÅELSE ---------- */
const L9_GRUND = [
  ["In today's news: a new bridge between the two islands will open next month. It will make the journey ten minutes shorter.",'How much shorter will the journey be?',['Ten minutes','Two minutes','One hour'],'Lyssna efter ordet shorter.','Resan blir tio minuter kortare.'],
  ['The football match between the two schools ended three–one. The winning team will play in the final on Saturday.','What was the score?',['Three–one','Three–three','One–nil'],'Lyssna efter två tal.','Matchen slutade tre–ett.'],
  ['Our guest today is Doctor Hannah Lee, who studies whales. She has spent ten years working in the Arctic.','What does Doctor Lee study?',['Whales','Polar bears','Ice'],'Lyssna efter ordet studies.','Doktor Lee forskar om valar.'],
  ['Because of heavy snow, all flights from the airport are cancelled until tomorrow morning.','Why are the flights cancelled?',['Heavy snow','A strike','A broken plane'],'Lyssna efter because.','Flygen är inställda på grund av mycket snö.'],
  ['A new survey shows that seven out of ten teenagers listen to music while they do their homework.','How many teenagers listen to music while they study?',['Seven out of ten','Ten out of ten','Three out of ten'],'Lyssna efter out of.','Sju av tio tonåringar lyssnar på musik när de pluggar.'],
  ['The new library will have a café, a gaming room and a quiet area for studying. It opens on the first of March.','When does the library open?',['On the first of March','On the first of May','On the third of March'],'Lyssna efter ett datum.','Biblioteket öppnar den första mars.'],
  ['How did you start running? Well, my grandfather took me to the forest every Sunday when I was six.','Who got the runner interested in running?',["The runner's grandfather",'A teacher','A friend'],'Lyssna efter vem som tog med löparen.','Löparens morfar eller farfar tog med hen till skogen.'],
  ['Temperatures will reach twenty-eight degrees today, so remember to drink lots of water and stay in the shade.','What advice does the speaker give?',['Drink water and stay in the shade','Wear a warm jacket','Stay at home all day'],'Lyssna efter remember.','Drick mycket vatten och håll dig i skuggan.']
];
const L9_FORD = [
  ['Was it hard to move to a new country? At first, yes. I missed my friends terribly. But now I have friends in both countries, which is kind of amazing.','How does the girl feel now?',['Positive about having friends in two countries','Still very sad','Angry about moving'],'Lyssna på slutet.','Nu tycker hon att det är fantastiskt att ha vänner i två länder.'],
  ['Critics say the new phone rule at the school is too strict. However, the head teacher points out that students now talk more to each other during breaks.','What positive effect does the head teacher mention?',['Students talk more to each other','Students get better grades','Students have longer breaks'],'Lyssna efter however.','Eleverna pratar mer med varandra på rasterna.'],
  ["I wouldn't say the concert was bad, exactly. But I've definitely seen them play better.",'What did the speaker think of the concert?',['It was not as good as usual','It was the best ever','It was terrible'],'Personen säger det försiktigt.','Konserten var inte dålig, men inte lika bra som vanligt.'],
  ['Volunteers collected over two tonnes of rubbish from the beach on Sunday. The organiser said she was proud, but also shocked by how much plastic they found.','How did the organiser feel?',['Proud but shocked','Only happy','Bored'],'Lyssna efter två känslor.','Hon var stolt, men också chockad.'],
  ["What's your advice for young people who want to become writers? Read everything. And don't be afraid to write badly at first. Everyone does.",'What is the writer’s main advice?',['Read a lot, and accept that your first texts may be bad','Only write when you feel inspired','Study grammar first'],'Lyssna efter två råd.','Läs mycket, och var inte rädd för att skriva dåligt i början.'],
  ['The company says its new drink is healthy, but it contains more sugar than most sodas.','What does the speaker suggest?',['The drink may not be as healthy as the company says','The drink has no sugar','Sodas are healthy'],'Lyssna efter but.','Drycken är kanske inte så nyttig som företaget säger.']
];
const L9_ROOF = 'Welcome back to Science Today. More and more cities are building green roofs, which are roofs covered with plants. They help keep buildings cool in summer, they collect rainwater, and they give bees and birds a place to live. The downside is that they are expensive to build, and some older buildings are not strong enough to carry them.';
const L9_NURSE = "You've been a nurse for thirty years. What has changed the most? Technology, definitely. When I started, we wrote everything by hand. But the most important thing hasn't changed at all: patients still need someone who listens.";
const L9_CLIMATE = 'Every year, thousands of young people take part in the climate debate. Some say they feel worried about the future. Others say that taking action, like cycling more or eating less meat, makes them feel more hopeful.';
const L9_UTM = [
  [L9_ROOF,'What is one advantage of green roofs?',['They help keep buildings cool','They make buildings taller','They produce electricity'],'Lyssna efter de saker som gröna tak hjälper till med.','Gröna tak håller byggnader svala, samlar regnvatten och ger bin och fåglar en plats att bo.'],
  [L9_ROOF,'What is a disadvantage of green roofs?',['They are expensive, and some buildings cannot carry them','They attract too many birds','They make buildings hot'],'Downside betyder nackdel.','De är dyra att bygga, och vissa äldre hus klarar inte tyngden.'],
  [L9_NURSE,'What has changed the most, according to the nurse?',['Technology','The patients','The salary'],'Lyssna efter definitely.','Tekniken har förändrats mest.'],
  [L9_NURSE,'What has NOT changed?',['Patients still need someone who listens','They still write everything by hand','The hospital building'],"Lyssna efter hasn't changed.",'Patienterna behöver fortfarande någon som lyssnar.'],
  [L9_CLIMATE,'What makes some young people feel more hopeful?',['Taking action','Ignoring the news','Buying new things'],'Hopeful betyder hoppfull.','Att göra något, som att cykla mer eller äta mindre kött.'],
  [L9_CLIMATE,'What is the main topic?',["Young people's feelings about the climate",'How to ride a bike','School lunches'],'Vad handlar hela texten om?','Texten handlar om ungas känslor inför klimatet.']
];

/* ---------- ENGELSKA: ENGELSKA I VÄRLDEN ---------- */
const EW_GRUND = [
  ['In which of these countries is English an official language?',['Australia','Brazil','Japan'],['Tänk på länder som en gång styrdes av Storbritannien.','I Brasilien talar man portugisiska.'],'Engelska är officiellt språk i Australien.'],
  ['What is the capital of the United Kingdom?',['London','Dublin','Edinburgh'],['Dublin ligger i Irland, som inte är en del av Storbritannien.','Edinburgh är huvudstad i Skottland, men inte i hela landet.'],'London är huvudstad i Storbritannien.'],
  ['Which four countries make up the United Kingdom?',['England, Scotland, Wales and Northern Ireland','England, Ireland, Scotland and Australia','England, Wales, Canada and Scotland'],['Alla fyra ligger på eller nära de brittiska öarna.','Republiken Irland hör inte till Storbritannien, men Nordirland gör det.'],'England, Skottland, Wales och Nordirland.'],
  ['In which country is Thanksgiving celebrated in November?',['The USA','The UK','Australia'],['Högtiden firas med kalkon.','Kanada firar också, men i oktober.'],'USA firar Thanksgiving i november.'],
  ['What do British people call what Americans call ”fries”?',['Chips','Crisps','Biscuits'],['Tänk på fish and …','Crisps är det som amerikaner kallar chips.'],'I Storbritannien heter pommes frites chips.'],
  ['What do Americans call a ”lift”?',['An elevator','A ladder','An escalator'],['En lift tar dig upp och ner mellan våningar.','Escalator är en rulltrappa.'],'Amerikaner säger elevator.'],
  ['In which country is English an official language together with Hindi?',['India','China','Egypt'],['Landet styrdes länge av Storbritannien.','Hindi är ett av landets största språk.'],'I Indien är både hindi och engelska officiella språk.'],
  ['Which spelling is American?',['color','colour','coluor'],['Amerikansk stavning är ofta kortare.','Brittisk engelska har ofta -our, amerikansk -or.'],'Color är amerikansk stavning. Colour är brittisk.']
];
const EW_FORD = [
  ['A British ”flat” is an American …',['apartment','tire','house'],['Var bor man?','En flat är en lägenhet.'],'Flat heter apartment på amerikansk engelska.'],
  ['American ”trash” is British …',['rubbish','garden','money'],['Vad slänger man i papperskorgen?','Trash betyder sopor.'],'Trash heter rubbish på brittisk engelska.'],
  ['British ”autumn” is American …',['fall','spring','winter'],['Det är en årstid.','Löven faller från träden.'],'Autumn heter fall på amerikansk engelska.'],
  ['American ”vacation” is British …',['holiday','journey','weekend'],['Vad har man på sommaren när man är ledig?','Vacation betyder semester eller lov.'],'Vacation heter holiday på brittisk engelska.'],
  ['British ”mobile phone” is American …',['cell phone','home phone','smart watch'],['Det är något du har i fickan.','Amerikanerna utgår från ordet cell.'],'Mobile phone heter cell phone på amerikansk engelska.'],
  ['American ”soccer” is British …',['football','rugby','cricket'],['Sporten spelas med en rund boll och fötterna.','I USA betyder football en annan sport.'],'Soccer heter football på brittisk engelska.'],
  ['Which spelling is British?',['centre','center','sentre'],['Brittisk engelska har ofta -re i slutet.','Amerikansk engelska har ofta -er.'],'Centre är brittisk stavning. Center är amerikansk.'],
  ['A British ”biscuit” is often an American …',['cookie','muffin','pie'],['Det är något sött och platt.','I USA är en biscuit oftast ett slags bröd.'],'Biscuit heter ofta cookie på amerikansk engelska.']
];
const EW_UTM = [
  ['Why is English often called a ”lingua franca”?',['People with different first languages use it to talk to each other','It comes from France','It is the oldest language in the world'],['Lingua franca betyder ett gemensamt språk.','Tänk på en svensk och en japan som pratar med varandra.'],'Engelska används som gemensamt språk av människor med olika modersmål.'],
  ['About how many people in the world speak English, as a first or a second language?',['Over one billion','About ten million','About one hundred thousand'],['Engelska talas på alla kontinenter.','A billion är en miljard.'],'Över en miljard människor talar engelska.'],
  ['Which of these English words comes from another language?',['Pyjamas, from Persian and Hindi','Water','House'],['Engelskan har lånat många ord från andra språk.','Ett av orden kom till engelskan från Indien.'],'Pyjamas kommer från persiska och hindi.'],
  ['What are Australia’s first peoples called?',['Aboriginal and Torres Strait Islander peoples','Māori','Inuit'],['Māori bor i Nya Zeeland.','Inuiter bor i Arktis.'],'Australiens urfolk är aboriginer och Torres Strait Islanders.'],
  ['Who are the first people of New Zealand?',['The Māori','The Sami','The Inuit'],['Samerna bor i norra Europa.','Nya Zeelands urfolk har ett eget språk, te reo.'],'Māori är Nya Zeelands urfolk.'],
  ['Which statement about English accents is true?',['There are many different accents, and all of them are correct English','Only British English is correct','Only American English is correct'],['Engelska talas på många olika sätt i världen.','Precis som svenska har engelska många dialekter.'],'Det finns många olika accenter, och alla är riktig engelska.'],
  ['Which language, besides English, is spoken in Wales?',['Welsh','Irish','Swedish'],['Språket har samma namn som landet på engelska.','Det är ett keltiskt språk.'],'I Wales talar man också walesiska, Welsh.'],
  ['What are the two official languages of Canada?',['English and French','English and Spanish','English and German'],['I Québec pratar de flesta ett annat språk än engelska.','Det är samma språk som man talar i Paris.'],'Kanadas officiella språk är engelska och franska.']
];

/* ---------- NYA OMRÅDEN I ÅRSKURS 9 ---------- */
Object.assign(CONTENT, {
  '9-svenska-skolord':{
    intro:[
      'I uppgifter och på prov står det ofta ord som jämför, förklara, motivera och resonera. De talar om exakt vad du ska göra.',
      'Om du svarar på något annat än det uppgiften ber om kan du tappa poäng, även om det du skriver är rätt. Stryk därför under skolordet innan du börjar.',
      'Ett välutvecklat svar förklarar varför, ger exempel och visar var i texten eller källan stödet finns.'
    ],
    example:{title:'Exempel: Samma fråga, olika svar', steps:['Uppgiften: Motivera varför du väljer källa B.','Svagt svar: Jag väljer källa B.','Bättre svar: Jag väljer källa B, eftersom den kommer från en myndighet.','Ordet eftersom visar att du motiverar.']},
    levels:[
      lv('Grund','Vad betyder orden i uppgifterna?', SO_GRUND, SQ),
      lv('Fördjupning','Vilket svar gör det uppgiften ber om?', SO_FORD, SQ),
      { ...lv('Utmaning','Utvecklade svar och ord inför nationella provet', SO_UTM, SQ),
        writing:{
          task:'Välj en bok, film eller serie du kan bra. Skriv 5–8 meningar där du jämför två personer i den. Visa både likheter och skillnader, och motivera med exempel.',
          check:['Tar du upp minst en likhet och en skillnad?','Ger du exempel på det du påstår?','Använder du ord som både, men, däremot och eftersom?','Börjar meningarna med stor bokstav och slutar med punkt?'],
          focus:'Fokusera på om eleven verkligen jämför, alltså visar både likheter och skillnader, och om påståendena stöds med exempel. Ge ett konkret exempel ur elevens text på något som fungerar och ett förslag på hur ett svar kan utvecklas.'
        }}
    ]
  },
  '9-svenska-norden':{
    intro:[
      'I Sverige talas över 150 språk. Svenska är huvudspråk, och finska, meänkieli, samiska, romani chib och jiddisch är nationella minoritetsspråk med ett särskilt skydd.',
      'Svenska, norska och danska är grannspråk. De är så lika att man ofta kan förstå varandra, men en del ord lurar. Rolig betyder lugn på danska, och rar betyder konstig på norska.',
      'Svenskan förändras hela tiden. Den har lånat ord från många språk, och den talas på olika sätt i olika delar av landet och av olika grupper.'
    ],
    example:{title:'Exempel: En falsk vän i Danmark', steps:['En dansk säger: ”Tag det roligt!”','Det låter som ha det kul.','Men rolig betyder lugn på danska.','Svar: Det betyder ta det lugnt.']},
    levels:[
      lv('Grund','Språken i Sverige och Norden', NO_GRUND, SQ),
      lv('Fördjupning','Grannspråk och ord som lurar', NO_FORD, SQ),
      lv('Utmaning','Språklagen, dialekter, lånord och flerspråkighet', NO_UTM, SQ)
    ]
  },
  '9-engelska-horforstaelse':{
    intro:[
      'I årskurs 9 handlar hörförståelse ofta om nyheter, intervjuer och resonemang. Då gäller det att förstå både fakta och vad personerna tycker.',
      'Lyssna efter ord som visar en vändning, som but, however och although. Det som kommer efter dem är ofta det viktigaste.',
      'Tryck på Lyssna så många gånger du vill. Om det går för fort finns texten i den andra ledtråden.'
    ],
    example:{title:'Exempel: En försiktig åsikt', steps:["Du hör: ”I wouldn't say it was bad, exactly. But I've seen better.”",'Personen säger inte rakt ut att det var dåligt.','Men but visar att hen inte är helt nöjd.','Svar: Det var okej, men inte jättebra.']},
    levels:[
      lv('Grund','Nyheter och fakta', L9_GRUND, LQ),
      lv('Fördjupning','Åsikter, känslor och vändningar', L9_FORD, LQ),
      lv('Utmaning','Längre reportage och intervjuer', L9_UTM, LQ)
    ]
  },
  '9-engelska-varlden':{
    intro:[
      'Engelska talas i hela världen, som modersmål i till exempel Storbritannien, Irland, USA, Kanada, Australien och Nya Zeeland, och som andraspråk i länder som Indien och Nigeria.',
      'Brittisk och amerikansk engelska skiljer sig lite åt. Det som heter flat i London heter apartment i New York, och colour stavas color i USA.',
      'Det finns många accenter, och alla är riktig engelska. När du förstår var engelskan talas förstår du också mer av filmer, musik och nyheter.'
    ],
    example:{title:'Exempel: Samma sak, två ord', steps:['En brittisk elev säger: ”I live in a flat.”','En amerikansk elev säger: ”I live in an apartment.”','Båda betyder: Jag bor i en lägenhet.']},
    levels:[
      lv('Grund','Länder, huvudstäder och högtider', EW_GRUND, EQ),
      lv('Fördjupning','Brittisk och amerikansk engelska', EW_FORD, EQ),
      { ...lv('Utmaning','Engelska som världsspråk', EW_UTM, EQ),
        writing:{
          task:'Skriv 6–10 meningar på engelska: Which English-speaking country would you like to visit, and why? Skriv vad du vet om landet och vad du skulle vilja se eller göra där.',
          check:['Säger du vilket land du väljer?','Förklarar du varför, till exempel med because?','Har du med något du vet om landet?','Börjar varje mening med stor bokstav och slutar med punkt?'],
          focus:'Fokusera på om eleven väljer ett land, motiverar valet och skriver begripliga meningar på engelska. Kommentera ett par saker i språket med exempel ur elevens text och visa hur de blir rätt. Citera engelska ord på engelska.'
        }}
    ]
  }
});
})();
