/* ==========================================================
   ELEVGUIDEN – NYA OMRÅDEN I SVENSKA OCH ENGELSKA, ÅRSKURS 8
   Svenska: Läsa faktatext och sammanfatta, Tala inför andra.
   Engelska: Hörförståelse, Vardagsfraser och artighet.
   Laddas efter ak9.js och använder hjälpfunktionerna i index.html.
   ========================================================== */
(function(){ /* Allt i en egen funktion, så att namnen inte krockar med ak-filerna */

const SQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som passar bäst.', prompt, options, answer:options[0], hints, solution, diagnose: () => hints[1] });
const EQ = (prompt, options, hints, solution) => choiceQ({ instr:'Välj det svar som passar bäst.', prompt, lang:'en', options, answer:options[0], hints, solution, diagnose: () => hints[1] });
const LQ = (audio, prompt, options, h1, solution) => choiceQ({ instr:'Tryck på Lyssna och hör vad som sägs. Välj sedan rätt svar.', prompt, lang:'en', audio, options, answer:options[0],
  hints:[h1, `Det här sägs: ”${audio}”`], solution, diagnose: () => h1 });
const lv = (name, desc, pool, f, n=8) => ({ name, desc, make:() => shuffle(pool).slice(0, n).map(x => f(...x)) });
const tq = (q, t) => { Object.defineProperty(q, 'text', { value:t, writable:false, enumerable:true }); return q; };

/* ---------- SVENSKA: LÄSA FAKTATEXT OCH SAMMANFATTA ---------- */
const BIN = {
  title:'Bina och maten vi äter',
  paras:[
    'Bin är små, men de har en mycket stor uppgift. När ett bi flyger från blomma till blomma för att samla nektar fastnar pollen på dess kropp. Pollenet följer med till nästa blomma, och på så sätt blir blomman befruktad. Det kallas pollinering.',
    'Utan pollinering blir det inga frukter och inga frön. Ungefär en tredjedel av den mat vi äter är beroende av pollinerande insekter, till exempel äpplen, jordgubbar och blåbär. Även djur som lever av växter påverkas.',
    'I Sverige finns ungefär 300 olika arter av bin. Honungsbiet är det mest kända, men de flesta arter är vildbin som lever ensamma. Humlor är också en sorts bin.',
    'På många håll minskar antalet bin. Orsakerna är bland annat att det finns färre blommande ängar, att vissa bekämpningsmedel skadar bina och att klimatet förändras.',
    'Det finns saker som alla kan göra. Man kan låta en del av gräsmattan växa och blomma, plantera blommor som bin tycker om eller bygga ett bihotell av ihåliga pinnar. Små åtgärder kan göra stor skillnad.'
  ]
};
const SF_GRUND = [
  ['Vad kallas det när pollen förs från blomma till blomma?',['Pollinering','Fotosyntes','Avdunstning'],['Läs första stycket.','Ordet står i sista meningen i stycket.'],'Det kallas pollinering.'],
  ['Hur stor del av maten vi äter är beroende av pollinerande insekter?',['Ungefär en tredjedel','Ungefär hälften','Nästan all mat'],['Läs andra stycket.','En tredjedel betyder en av tre delar.'],'Ungefär en tredjedel av maten är beroende av pollinerande insekter.'],
  ['Hur många arter av bin finns det i Sverige?',['Ungefär 300','Ungefär 30','Ungefär 3 000'],['Läs tredje stycket.','Leta efter ett tal.'],'Det finns ungefär 300 arter av bin i Sverige.'],
  ['Vilket bi är mest känt?',['Honungsbiet','Humlan','Vildbiet'],['Läs tredje stycket.','Leta efter orden mest kända.'],'Honungsbiet är det mest kända biet.'],
  ['Vad kan man bygga ett bihotell av, enligt texten?',['Ihåliga pinnar','Gamla tegelstenar','Plast'],['Läs sista stycket.','Leta efter ordet bihotell.'],'Ett bihotell kan byggas av ihåliga pinnar.'],
  ['Vilken mat nämns som exempel på mat som beror på pollinering?',['Jordgubbar','Potatis','Ris'],['Läs andra stycket.','Texten räknar upp tre sorters frukt och bär.'],'Texten nämner äpplen, jordgubbar och blåbär.']
];
const SF_FORD = [
  ['Vad handlar stycke 4 om?',['Varför antalet bin minskar','Hur bin gör honung','Vad man kan göra för bina'],['Läs första meningen i stycket.','Ordet orsakerna visar vad stycket förklarar.'],'Stycke 4 handlar om varför antalet bin minskar.'],
  ['Vilken rubrik passar bäst till sista stycket?',['Så kan du hjälpa bina','Binas historia','Olika sorters humlor'],['Vad handlar sista stycket om?','Stycket räknar upp saker man kan göra.'],'”Så kan du hjälpa bina” passar, eftersom stycket ger tips.'],
  ['Vilka ord är viktigast i en sammanfattning av stycke 1?',['bin, pollen, blommor, pollinering','små, flyger, kropp, nästa','uppgift, sätt, kallas, det'],['Nyckelord är de ord som bär innehållet.','Vilka ord behövs för att förstå vad stycket handlar om?'],'Bin, pollen, blommor och pollinering är nyckelorden.'],
  ['Vad är textens syfte?',['Att informera om varför bin är viktiga','Att sälja honung','Att berätta en saga om ett bi'],['Vad vill texten att läsaren ska få veta?','En faktatext vill informera.'],'Texten vill informera om varför bin är viktiga och vad man kan göra för dem.'],
  ['Vilket påstående stämmer INTE med texten?',['De flesta bin i Sverige är honungsbin','Humlor är en sorts bin','Bekämpningsmedel kan skada bin'],['Läs tredje stycket igen.','Texten säger att de flesta arter är vildbin.'],'Det stämmer inte. De flesta arter i Sverige är vildbin.'],
  ['Vad betyder ”åtgärder” i sista meningen?',['Saker man gör för att förbättra något','Problem','Insekter'],['Läs meningen före. Vad räknas upp där?','Åtgärder är det man gör för att lösa ett problem.'],'Åtgärder betyder saker man gör för att förbättra något.']
];
const SF_UTM = [
  ['Vilken mening är den bästa sammanfattningen av hela texten?',['Bin pollinerar växter som ger mycket av vår mat, men de minskar, och alla kan göra något för att hjälpa dem.','Bin är små och flyger mellan blommor.','I Sverige finns 300 sorters bin, och honungsbiet är mest känt.'],['En sammanfattning tar med det viktigaste från hela texten, inte bara en del.','Vilken mening tar med både varför bin är viktiga, problemet och lösningen?'],'Den första meningen tar med det viktigaste från alla delar av texten.'],
  ['Vad ska en sammanfattning INTE innehålla?',['Dina egna åsikter om ämnet','Textens viktigaste innehåll','Egna ord'],['En sammanfattning återger vad texten säger.','Vad tycker du hör hemma i en egen text, men inte i en sammanfattning?'],'En sammanfattning innehåller inte dina egna åsikter.'],
  ['Hur lång bör en sammanfattning vara?',['Mycket kortare än texten','Lika lång som texten','Längre än texten, med fler detaljer'],['Sammanfatta betyder att korta ner.','Ta bara med det viktigaste.'],'En sammanfattning är mycket kortare än originaltexten.'],
  ['Vilken mening är skriven med egna ord?',['Bin hjälper växterna att få frukt genom att flytta pollen.','När ett bi flyger från blomma till blomma för att samla nektar fastnar pollen på dess kropp.','Pollenet följer med till nästa blomma.'],['Jämför meningarna med texten. Vilken är inte kopierad?','Egna ord betyder att du säger samma sak, men på ditt sätt.'],'Den första meningen säger samma sak som texten, men med egna ord.'],
  ['Varför är det bra att ange källan när man sammanfattar?',['Så att läsaren vet var informationen kommer ifrån','För att texten ska bli längre','Det behövs inte'],['Vem har skrivit det du sammanfattar?','Källan visar att det inte är dina egna tankar.'],'Källan visar läsaren var informationen kommer ifrån.']
];

/* ---------- SVENSKA: TALA INFÖR ANDRA ---------- */
const TA_GRUND = [
  ['Vad är det första du bör göra när du ska hålla en presentation?',['Ta reda på vad den ska handla om och vem som lyssnar','Lära dig hela texten utantill','Göra snygga bilder'],['Tänk på planeringen först.','Vad du säger beror på ämnet och på vem du pratar för.'],'Börja med att ta reda på ämnet och vem som ska lyssna.'],
  ['Vad ska en bra inledning göra?',['Väcka intresse och berätta vad du ska prata om','Säga allt viktigt på en gång','Be om ursäkt för att du är nervös'],['Vad behöver publiken i början?','Publiken ska vilja lyssna och veta vad som kommer.'],'En bra inledning väcker intresse och berättar vad du ska prata om.'],
  ['Vad är bäst att ha i handen när du presenterar?',['Stödord på en lapp','Hela texten att läsa upp','Ingenting, även om du glömmer'],['Hur kan du komma ihåg utan att läsa innantill?','Stödord är några viktiga ord som hjälper dig att minnas.'],'Stödord hjälper dig att minnas utan att du läser innantill.'],
  ['Var bör du titta när du talar?',['På publiken, och flytta blicken mellan olika personer','I golvet','Bara på läraren'],['Hur visar du att du pratar med publiken?','Ögonkontakt gör att publiken känner sig sedd.'],'Titta på publiken och flytta blicken mellan olika personer.'],
  ['Hur snabbt ska du prata?',['Lugnt, med pauser','Så snabbt som möjligt','Mycket långsamt, ett ord i taget'],['Många pratar fortare när de är nervösa.','Pauser ger publiken tid att tänka.'],'Prata lugnt och gör pauser.'],
  ['Hur avslutar du en presentation bäst?',['Sammanfatta det viktigaste och tacka','Sluta mitt i en mening','Säga ”det var allt” och gå'],['Publiken ska minnas det viktigaste.','En bra avslutning knyter ihop presentationen.'],'Sammanfatta det viktigaste och tacka publiken.'],
  ['Vad gör du om du blir nervös?',['Andas lugnt och tänk på att många känner likadant','Springer ut','Pratar fortare för att bli klar'],['Nästan alla blir nervösa när de ska tala inför andra.','Lugna andetag hjälper kroppen att slappna av.'],'Andas lugnt. Nervositet är vanligt och brukar minska när du har börjat prata.'],
  ['Vad är rimligt att ha med i en presentation på fem minuter?',['Två eller tre huvudpunkter','Tio olika ämnen','Bara en mening'],['Hur mycket hinner publiken ta in på fem minuter?','Hellre lite och tydligt än mycket och rörigt.'],'Två eller tre huvudpunkter räcker för fem minuter.']
];
const TA_FORD = [
  ['Hur mycket text bör det vara på en bild i ett bildspel?',['Lite: några ord eller en bild','Hela manuset','Så mycket som får plats'],['Ska publiken lyssna på dig eller läsa?','Bilderna ska stödja det du säger, inte ersätta det.'],'Lite text. Bilderna ska stödja det du säger.'],
  ['Vilken respons är mest hjälpsam till en kompis?',['Du hade bra exempel. Nästa gång kan du titta mer på publiken.','Det var bra.','Det var tråkigt.'],['Bra respons är konkret.','Säg något som fungerade och ett tips till nästa gång.'],'Den första responsen säger konkret vad som var bra och ger ett tips.'],
  ['Vad betyder det att anpassa en presentation efter mottagaren?',['Att tänka på vilka som lyssnar och vad de redan vet','Att prata högre','Att ha fler bilder'],['Mottagaren är den som lyssnar.','Du pratar olika för sjuåringar och för vuxna.'],'Att tänka på vilka som lyssnar och vad de redan kan.'],
  ['Vilken inledning väcker mest intresse?',['Visste ni att ett enda bi kan besöka tusentals blommor på en dag?','Jag ska prata om bin.','Hej. Bin.'],['Vilken inledning gör dig nyfiken?','En fråga eller ett överraskande faktum väcker intresse.'],'En överraskande fråga väcker publikens nyfikenhet.'],
  ['Vad är ett bra sätt att öva?',['Säga presentationen högt för någon hemma eller för dig själv','Bara läsa den tyst','Inte öva alls'],['Det är skillnad på att tänka och att säga.','Att öva högt gör dig tryggare.'],'Öva högt, gärna för någon annan.'],
  ['Hur visar du att du lyssnar aktivt när en klasskompis presenterar?',['Du tittar på personen och ställer en fråga efteråt','Du tittar i mobilen','Du pratar med bänkkompisen'],['Hur vill du att andra ska lyssna på dig?','En bra lyssnare visar intresse.'],'Titta på personen och ställ gärna en fråga efteråt.'],
  ['Någon ställer en fråga som du inte kan svara på. Vad gör du?',['Säger ärligt att du inte vet, och att du kan ta reda på det','Hittar på ett svar','Låtsas att du inte hörde'],['Det är okej att inte veta allt.','Ärlighet gör dig mer trovärdig.'],'Säg ärligt att du inte vet, och att du kan ta reda på det.']
];
const TA_UTM = [
  ['I vilken ordning bör en presentation vara?',['Inledning, huvuddel, avslutning','Avslutning, inledning, huvuddel','Huvuddel, avslutning, inledning'],['Vad behöver publiken först, och vad ska de minnas sist?','Det är samma ordning som i många texter.'],'Inledning, huvuddel och avslutning.'],
  ['Vilket är ett exempel på ett retoriskt knep?',['Att ställa en fråga till publiken','Att läsa snabbt från papperet','Att vända ryggen mot publiken'],['Retorik är konsten att tala så att andra lyssnar och blir övertygade.','Vad gör publiken delaktig?'],'Att ställa en fråga till publiken gör dem delaktiga.'],
  ['Du ska prata för en klass 4 om solen. Vilken mening passar bäst?',['Solen är en stjärna. Den är så stor att en miljon jordklot skulle få plats i den.','Solen är en huvudseriestjärna av spektraltyp G.','Solen typ är stor.'],['Tänk på vilka som lyssnar.','Tioåringar behöver enkla ord och ett exempel.'],'Den första meningen är enkel och har ett exempel som tioåringar förstår.'],
  ['Vad gör ett exempel i en presentation?',['Gör det lättare för publiken att förstå och minnas','Gör presentationen längre','Inget särskilt'],['Tänk på en lärare som förklarar något svårt.','Exempel gör det abstrakta konkret.'],'Exempel gör det lättare att förstå och minnas.'],
  ['Vilken avslutning lämnar starkast intryck?',['Så nästa gång ni äter ett äpple, tänk på att ett bi kanske har hjälpt till.','Ja, det var allt om bin.','Har ni några frågor? Nej? Okej.'],['En stark avslutning stannar kvar hos publiken.','Den kopplar ämnet till publikens eget liv.'],'Den första avslutningen kopplar ämnet till publikens egen vardag.'],
  ['Varför är kroppsspråket viktigt?',['Det visar publiken att du är engagerad och trygg','Det spelar ingen roll','Det gör att man slipper förbereda sig'],['Publiken ser dig, inte bara hör dig.','Hållning, blick och gester säger mycket.'],'Kroppsspråket visar att du är engagerad och trygg.']
];

/* ---------- ENGELSKA: HÖRFÖRSTÅELSE ---------- */
const L8_GRUND = [
  ['Attention, please. The train to Stockholm will leave from platform six instead of platform two.','Which platform does the train leave from now?',['Platform six','Platform two','Platform sixteen'],'Instead of betyder i stället för.','Tåget går från spår sex i stället för spår två.'],
  ['Heat the oven to two hundred degrees. Mix the flour and the sugar, then add two eggs.','How many eggs do you need?',['Two','Three','Four'],'Lyssna efter ett tal före ordet eggs.','Man behöver två ägg.'],
  ["Hi Mia, it's Dad. I'll pick you up at half past four outside the sports hall, not at the school.",'Where will Dad pick Mia up?',['Outside the sports hall','At the school','At home'],'Lyssna efter ordet not.','Pappa hämtar Mia utanför idrottshallen, inte vid skolan.'],
  ['The museum is open every day except Monday, from ten in the morning to five in the afternoon.','Which day is the museum closed?',['Monday','Sunday','Friday'],'Except betyder utom.','Museet är stängt på måndagar.'],
  ['Tickets cost eight pounds for adults and five pounds for students. Children under six go free.','How much does a student ticket cost?',['Five pounds','Eight pounds','Nothing'],'Lyssna efter ordet students.','En studentbiljett kostar fem pund.'],
  ['To get to the hotel, take bus number twelve and get off at the third stop.','Where should you get off the bus?',['At the third stop','At the twelfth stop','At the last stop'],'Get off betyder kliva av.','Man ska kliva av vid tredje hållplatsen.'],
  ['Please remember to bring your swimming things on Thursday. We are going to the pool after lunch.','When are they going to the pool?',['On Thursday after lunch','On Tuesday morning','On Thursday before lunch'],'Lyssna efter en dag och en tid.','De ska till badhuset på torsdag efter lunch.'],
  ['This is a reminder that your dentist appointment has been moved from Tuesday to Wednesday at ten.','When is the new appointment?',['On Wednesday at ten','On Tuesday at ten','On Wednesday at two'],'Moved from … to betyder flyttad från … till.','Den nya tiden är onsdag klockan tio.']
];
const L8_FORD = [
  ["I'm really sorry, but I can't come tonight. My little sister is ill, and I have to stay with her.",'Why can’t the speaker come?',['The speaker has to look after a sick sister','The speaker is ill','The speaker has too much homework'],'Lyssna efter ordet ill.','Personen måste ta hand om sin sjuka lillasyster.'],
  ['Honestly, the film was too long, but the music was amazing and the actors were great.','What did the speaker think of the film?',['Mostly positive, but it was too long','Completely terrible','Perfect in every way'],'Lyssna på både det positiva och det negativa.','Personen tyckte mest om filmen, men den var för lång.'],
  ['Could everyone please turn off their phones? The concert is about to begin.','Where is the speaker probably?',['At a concert','In a classroom','On a bus'],'Vad är det som ska börja?','Personen är på en konsert.'],
  ['If you press the red button, the machine stops immediately. Only use it in an emergency.','When should you press the red button?',['Only in an emergency','Every morning','When the machine is slow'],'Emergency betyder nödsituation.','Den röda knappen ska bara användas i en nödsituation.'],
  ["I usually take the bus, but today it's so nice outside that I'm going to walk.",'Why does the speaker walk today?',['The weather is nice','The bus is late','The bus is too expensive'],'Lyssna efter ordet but.','Personen går för att det är så fint väder.'],
  ["We're out of milk and bread. Could you buy some on your way home? Oh, and some bananas, if they're cheap.",'Which food should you only buy if it is cheap?',['Bananas','Milk','Bread'],'Lyssna efter ordet if.','Bananerna ska man bara köpa om de är billiga.']
];
const L8_CAMP = 'Welcome to the summer camp! Breakfast is served at eight in the main hall. After breakfast, you will be divided into groups. Group A goes canoeing in the morning and climbing in the afternoon, and Group B does the opposite. Please wear good shoes for climbing.';
const L8_JOB = "Hi, my name is Priya, and I'm calling about the job at the café. I saw the advert online. I'm sixteen, I've worked at my uncle's restaurant, and I can work weekends.";
const L8_READ = 'Scientists say that reading for twenty minutes a day can help you learn many new words. Reading a book before bed can also help you sleep better than using a screen.';
const L8_UTM = [
  [L8_CAMP,'What does Group B do in the morning?',['Climbing','Canoeing','Swimming'],'The opposite betyder det motsatta.','Grupp B gör det motsatta mot grupp A, alltså klättring på förmiddagen.'],
  [L8_CAMP,'What should you wear for climbing?',['Good shoes','A helmet only','Swimming clothes'],'Lyssna på sista meningen.','Man ska ha bra skor när man klättrar.'],
  [L8_JOB,'Why is Priya calling?',['She wants a job at the café','She wants to order food','She wants to complain'],'Lyssna efter ordet job.','Priya ringer om ett jobb på kaféet.'],
  [L8_JOB,'What experience does Priya have?',["She has worked at her uncle's restaurant",'She has worked at a school','She has no experience'],'Lyssna efter ordet worked.','Hon har jobbat på sin farbrors eller morbrors restaurang.'],
  [L8_READ,'How long should you read each day, according to the speaker?',['Twenty minutes','Two hours','Ten minutes'],'Lyssna efter ett tal.','Tjugo minuter om dagen.'],
  [L8_READ,'Why can reading before bed be good?',['It can help you sleep better than using a screen','It makes you hungry','It is required by school'],'Lyssna på sista meningen.','Att läsa en bok kan hjälpa dig att sova bättre än att använda en skärm.']
];

/* ---------- ENGELSKA: VARDAGSFRASER OCH ARTIGHET ---------- */
const FP_GRUND = [
  ['You want to ask a stranger for the time. What do you say?',['Excuse me, do you know what time it is?','Give me the time.','Time, now!'],['Hur börjar man artigt när man pratar med någon man inte känner?','Excuse me betyder ursäkta.'],'Excuse me, do you know what time it is? är artigt.'],
  ['Someone says ”Thank you!” What can you answer?',["You're welcome.",'Yes, thank you.','Excuse me.'],['Vad säger man på svenska när någon tackar?','You are welcome betyder ungefär varsågod eller ingen orsak.'],"You're welcome."],
  ['You bump into someone in the corridor. What do you say?',['Sorry!','Cheers!','Welcome!'],['Vad säger man när man råkar stöta till någon?','Sorry betyder förlåt.'],'Sorry!'],
  ['You meet someone for the first time. What do you say?',['Nice to meet you.','See you later.','Get well soon.'],['Vad säger man när man hälsar på någon ny?','Meet betyder träffa.'],'Nice to meet you betyder trevligt att träffas.'],
  ['You did not hear what the teacher said. What do you say?',['Sorry, could you repeat that, please?','What?!',"I don't care."],['Hur ber man någon säga något igen, på ett artigt sätt?','Repeat betyder upprepa.'],'Sorry, could you repeat that, please?'],
  ['You want to order in a café. What do you say?',['Could I have a hot chocolate, please?','I want hot chocolate now.','Hot chocolate, give.'],['Hur beställer man artigt?','Could I have … please? är artigt.'],'Could I have a hot chocolate, please?'],
  ['Your friend is ill. What do you say?',['Get well soon!','Congratulations!','Have a nice trip!'],['Vad önskar man någon som är sjuk?','Get well betyder bli frisk.'],'Get well soon! betyder krya på dig.'],
  ['Your friend has passed a difficult test. What do you say?',['Congratulations!','Get well soon!','Never mind.'],['Vad säger man när någon har lyckats?','Congratulations betyder grattis.'],'Congratulations!']
];
const FP_FORD = [
  ['Which question is the most polite?',['Would you mind opening the window?','Open the window.','Window, open it.'],['Vilken fråga låter vänligast?','Would you mind …? är ett mycket artigt sätt att be om något.'],'Would you mind opening the window? är mest artigt.'],
  ['Which is a polite way to say no?',["Thanks, but I'm afraid I can't.",'No way.','Never.'],['Hur säger man nej utan att låta otrevlig?',"I'm afraid betyder här tyvärr."],"Thanks, but I'm afraid I can't."],
  ['How do you start an email to a teacher you do not know?',['Dear Ms Smith,','Hey babe,','Yo teacher,'],['Ett mejl till någon du inte känner ska vara formellt.','Dear används i formella brev och mejl.'],'Dear Ms Smith, är en formell hälsning.'],
  ['How do you end a formal email?',['Kind regards,','Bye bye!!!','Love ya,'],['Hur avslutar man ett formellt mejl?','Kind regards betyder vänliga hälsningar.'],'Kind regards, är en formell avslutning.'],
  ['What does ”Could you give me a hand?” mean?',['Could you help me?','Could you give me your hand to hold?','Could you clap?'],['Det är ett uttryck. Tänk på när man kan säga så.','Give someone a hand betyder hjälpa någon.'],'Could you give me a hand? betyder kan du hjälpa mig?'],
  ['What does ”I’m afraid the shop is closed” mean?',['Unfortunately, the shop is closed','I am scared of the shop','The shop is dangerous'],["I'm afraid kan betyda jag är rädd, men också något annat.","Här betyder I'm afraid ungefär tyvärr."],"I'm afraid betyder här tyvärr: affären är tyvärr stängd."],
  ['Your friend says ”Fancy a game of football?” What does it mean?',['Do you want to play football?','Do you like fancy football?','Is football expensive?'],['Fancy är ett vardagligt ord i Storbritannien.','Fancy something betyder ha lust med något.'],'Fancy a game of football? betyder vill du spela fotboll?'],
  ['Which is the best way to interrupt politely?',['Sorry to interrupt, but …','Shut up, I want to talk.','Listen to me!'],['Hur avbryter man utan att vara otrevlig?','Interrupt betyder avbryta.'],'Sorry to interrupt, but … är ett artigt sätt att avbryta.']
];
const FP_UTM = [
  ['”It’s raining cats and dogs.” What does it mean?',["It's raining very hard",'Animals are falling from the sky',"It's raining a little"],['Det är ett uttryck. Det handlar inte om djur.','Det säger man när det regnar väldigt mycket. Svenskan har ”det regnar småspik”.'],"It's raining cats and dogs betyder att det regnar väldigt mycket."],
  ['”Break a leg!” What does it mean?',['Good luck!','Be careful!','Go to the hospital!'],['Det säger man till någon som ska uppträda.','På svenska kan man säga lycka till eller spark i baken.'],'Break a leg! betyder lycka till.'],
  ['”I’m feeling under the weather.” What does it mean?',['I feel a bit ill','I love rain','I am outside'],['Det handlar om hur man mår.','Under the weather betyder att man inte mår riktigt bra.'],"I'm feeling under the weather betyder jag känner mig lite sjuk."],
  ['”Can you look after my cat?” What does ”look after” mean?',['Take care of','Look for','Look behind'],['Vad behöver en katt när ägaren är bortrest?','Look after betyder ta hand om.'],'Look after betyder ta hand om.'],
  ['”We ran out of milk.” What does it mean?',['There is no milk left','We ran to buy milk','We spilled the milk'],['Run out of betyder inte springa.','Run out of betyder att något tar slut.'],'We ran out of milk betyder att mjölken har tagit slut.'],
  ['”Don’t give up!” What does ”give up” mean?',['Stop trying','Give a present','Stand up'],['Det säger man för att peppa någon.','Give up betyder ge upp.'],'Give up betyder ge upp, alltså sluta försöka.'],
  ['”I need to find out when the bus leaves.” What does ”find out” mean?',['Get to know or discover','Go outside','Lose something'],['Vad behöver personen göra med informationen?','Find out betyder ta reda på.'],'Find out betyder ta reda på.'],
  ['”The test was a piece of cake.” What does it mean?',['The test was very easy','The test was about food','The test was short'],['Det är ett uttryck. Det handlar inte om tårta.','A piece of cake betyder att något är väldigt lätt.'],'A piece of cake betyder att något är väldigt lätt.']
];

/* ---------- NYA OMRÅDEN I ÅRSKURS 8 ---------- */
Object.assign(CONTENT, {
  '8-svenska-sammanfatta':{
    text:BIN,
    intro:[
      'När du läser en faktatext är det bra att först skumläsa: läs rubriken och första meningen i varje stycke. Då vet du vad texten handlar om.',
      'Leta sedan efter nyckelord, alltså de viktigaste orden i varje stycke. De hjälper dig att förstå och komma ihåg.',
      'En sammanfattning återger det viktigaste i texten, kort och med egna ord. Den innehåller inte dina egna åsikter. Skriv gärna vilken text du sammanfattar.'
    ],
    example:{title:'Exempel: Sammanfatta ett stycke', steps:['Stycket handlar om hur bin flyttar pollen mellan blommor.','Nyckelord: bin, pollen, blommor, pollinering.','Med egna ord: Bin för pollen mellan blommor, och det kallas pollinering.','Från tre långa meningar till en kort.']},
    levels:[
      lv('Grund','Hitta fakta i texten', SF_GRUND, SQ),
      lv('Fördjupning','Stycken, nyckelord och textens syfte', SF_FORD, SQ),
      { ...lv('Utmaning','Skriv en bra sammanfattning', SF_UTM, (...x) => tq(SQ(...x), BIN)),
        writing:{
          task:'Skriv en sammanfattning på 50–80 ord av texten ”Bina och maten vi äter”. Använd egna ord och ta bara med det viktigaste.',
          check:['Är sammanfattningen 50–80 ord?','Har du med det viktigaste: varför bin behövs, varför de minskar och vad man kan göra?','Har du skrivit med egna ord, utan att kopiera hela meningar?','Har du låtit bli att skriva egna åsikter?'],
          focus:'Fokusera på om sammanfattningen tar med textens viktigaste delar (bin pollinerar växter som ger ungefär en tredjedel av vår mat, antalet bin minskar på grund av färre ängar, bekämpningsmedel och klimatet, och alla kan hjälpa till genom att låta det blomma eller bygga bihotell), om den är skriven med egna ord och om den saknar egna åsikter. Ge ett konkret exempel ur elevens text.'
        }}
    ]
  },
  '8-svenska-presentera':{
    intro:[
      'Att tala inför andra är något man blir bättre på genom att öva. Nästan alla är nervösa i början, och det brukar gå över när man har kommit igång.',
      'En bra presentation har en inledning som väcker intresse, en huvuddel med två eller tre huvudpunkter och en avslutning som sammanfattar.',
      'Använd stödord i stället för att läsa innantill. Titta på publiken, prata lugnt och tänk på vilka som lyssnar.'
    ],
    example:{title:'Exempel: Stödord för en presentation om bin', steps:['Inledning: tusentals blommor varje dag?','Punkt 1: pollinering, en tredjedel av maten.','Punkt 2: bin minskar, ängar, gifter.','Avslutning: vad du kan göra, bihotell.']},
    levels:[
      lv('Grund','Förbered dig och håll presentationen', TA_GRUND, SQ),
      lv('Fördjupning','Bilder, respons och att lyssna', TA_FORD, SQ),
      { ...lv('Utmaning','Retorik, mottagare och en egen inledning', TA_UTM, SQ),
        writing:{
          task:'Skriv inledningen till en presentation om något du kan mycket om, 60–120 ord. Börja med något som väcker intresse, och berätta vad presentationen ska handla om.',
          check:['Börjar du med något som väcker intresse, som en fråga eller ett överraskande faktum?','Berättar du vad presentationen ska handla om?','Passar orden för dem som ska lyssna?','Är det lätt att säga högt, med korta meningar?'],
          focus:'Fokusera på om inledningen väcker intresse, om den talar om vad presentationen ska handla om och om den passar att säga högt. Ge ett konkret exempel ur elevens text på något som fungerar och ett förslag på hur början kan bli ännu mer fångande.'
        }}
    ]
  },
  '8-engelska-horforstaelse':{
    intro:[
      'I vardagen hör du engelska i meddelanden, instruktioner och utrop, till exempel på en flygplats eller i ett röstmeddelande.',
      'Läs frågan innan du lyssnar, så att du vet vad du ska lyssna efter. Små ord som not, except, instead och if kan ändra hela betydelsen.',
      'Tryck på Lyssna så många gånger du vill. Om det går för fort finns texten i den andra ledtråden.'
    ],
    example:{title:'Exempel: Små ord som ändrar betydelsen', steps:['Du hör: ”The museum is open every day except Monday.”','Except betyder utom.','Alltså är museet öppet alla dagar utom måndag.','Svar: Museet är stängt på måndagar.']},
    levels:[
      lv('Grund','Meddelanden och instruktioner', L8_GRUND, LQ),
      lv('Fördjupning','Åsikter, orsaker och sammanhang', L8_FORD, LQ),
      lv('Utmaning','Längre meddelanden och samtal', L8_UTM, LQ)
    ]
  },
  '8-engelska-fraser':{
    intro:[
      'Att kunna vardagsfraser gör det mycket lättare att klara sig på engelska, till exempel på ett kafé, i skolan eller när man träffar nya människor.',
      'På engelska är det viktigt att vara artig. Please, thank you, excuse me och sorry används mycket ofta. Frågor som Could you …? och Would you mind …? låter vänligare än order.',
      'Engelskan har också många uttryck som inte betyder det orden säger, som ”It’s a piece of cake”, som betyder att något är lätt.'
    ],
    example:{title:'Exempel: Från order till artig fråga', steps:['Order: Give me the salt.','Lite artigare: Can you give me the salt, please?','Mest artigt: Could you pass me the salt, please?']},
    levels:[
      lv('Grund','Vad säger man när …?', FP_GRUND, EQ),
      lv('Fördjupning','Artigt och formellt', FP_FORD, EQ),
      lv('Utmaning','Uttryck och partikelverb', FP_UTM, EQ)
    ]
  }
});
})();
