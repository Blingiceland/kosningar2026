// Viðreisn Garðabær - Frambjóðendur 2026
export const candidates = [
  { seat: 1, name: 'Guðlaugur Kristmundsson', role: 'Bæjarf. og fyrrv. framkv.stjóri', bio: 'Stutt kynning á Guðlaugi hér. Frábært rými fyrir helstu áherslur og kosningaloforð í komandi kosningum.', featured: true, gradient: 'var(--gradient-primary)', image: '/1.png' },
  { seat: 2, name: 'Harpa Þorsteinsdóttir', role: 'Lýðheilsufræðingur og varabæjarf.', bio: 'Hér verður pláss fyrir fínan kynningartexta um Hörpu, og helstu málin hennar.', featured: true, gradient: 'var(--gradient-primary)', image: '/2.png' },
  { seat: 3, name: 'Jón Bjarni Steinsson', role: 'Lögfræðingur og viðburðahaldari', bio: 'Helstu áherslumál Jóns og baráttumál verða sett hérna inn.', featured: true, gradient: 'var(--gradient-primary)', image: '/3.png' },
  { seat: 4, name: 'Sigríður Þóra Ásgeirsdóttir', role: 'Frumkvöðull og framkv.stjóri', bio: 'Frumkvöðlakrafturinn hennar Sigríðar verður gerður upp hérna.', featured: true, gradient: 'var(--gradient-primary)', image: '/4.png' },
  { seat: 5, name: 'Hreiðar Þór Jónsson', role: 'Framkvæmdastjóri', bio: 'Kynningartextinn fyrir Hreiðar fer beint inn í þetta pláss.', featured: true, gradient: 'var(--gradient-primary)', image: '/5.png' },
  { seat: 6, name: 'Tamar Klara Lipka Þormarsdóttir', role: 'Lögfræðingur', bio: 'Stutt kynning um frambjóðanda. Hér er pláss fyrir texta sem lýsir störfum og áherslum.', midTier: true },
  { seat: 7, name: 'Júlíus Arnarson', role: 'Framkvæmdastjóri', bio: 'Stutt kynning um frambjóðanda. Hér er pláss fyrir texta sem lýsir störfum og áherslum.', midTier: true },
  { seat: 8, name: 'Þyrí Halla Steingrímsdóttir', role: 'Lögfræðingur', bio: 'Stutt kynning um frambjóðanda. Hér er pláss fyrir texta sem lýsir störfum og áherslum.', midTier: true },
  { seat: 9, name: 'Árni Björn Eiríksson', role: 'Viðskiptafræðingur', bio: 'Stutt kynning um frambjóðanda. Hér er pláss fyrir texta sem lýsir störfum og áherslum.', midTier: true },
  { seat: 10, name: 'Herdís Anna Ingimarsdóttir', role: 'Verkefnastjóri og markþjálfi', bio: 'Stutt kynning um frambjóðanda. Hér er pláss fyrir texta sem lýsir störfum og áherslum.', midTier: true },
  { seat: 11, name: 'Hafsteinn Ezekíel Hafsteinsson', role: 'Sölustjóri', gradient: 'linear-gradient(135deg, #6D7073, #53575A)' },
  { seat: 12, name: 'Geirþrúður Alfreðsdóttir', role: 'Verkfræðingur', gradient: 'linear-gradient(135deg, #FD7D26, #FBB03B)' },
  { seat: 13, name: 'Jens Guðjón Einarsson', role: 'Fyrrv. kennari og framkv.stjóri', gradient: 'linear-gradient(135deg, #53575A, #6D7073)' },
  { seat: 14, name: 'Maria Rosario Blöndal', role: 'Markaðsstjóri', gradient: 'linear-gradient(135deg, #FCC55F, #FBB03B)' },
  { seat: 15, name: 'Viðar Kristinsson', role: 'Þjónustustjóri', gradient: 'linear-gradient(135deg, #E09A25, #FBB03B)' },
  { seat: 16, name: 'Tinna Borg Arnfinnsdóttir', role: 'Innri endurskoðandi', gradient: 'linear-gradient(135deg, #6D7073, #53575A)' },
  { seat: 17, name: 'Eyþór Eðvarðsson', role: 'Stjórnendaþjálfari og ráðgjafi', gradient: 'linear-gradient(135deg, #FD7D26, #FBB03B)' },
  { seat: 18, name: 'Ásta Sigríður Guðjónsdóttir', role: 'Sr. mark. og samskiptamálum', gradient: 'linear-gradient(135deg, #53575A, #6D7073)' },
  { seat: 19, name: 'Ingi Þór Hermannsson', role: 'Fyrrv. formaður Odda', gradient: 'linear-gradient(135deg, #FCC55F, #FBB03B)' },
  { seat: 20, name: 'Heiðrún Sigurðardóttir', role: 'Viðskiptafræðingur', gradient: 'linear-gradient(135deg, #E09A25, #FBB03B)' },
  { seat: 21, name: 'Eiríkur Björn Björgvinsson', role: 'Alþingism. og fyrrum bæjarstj.', gradient: 'linear-gradient(135deg, #6D7073, #53575A)' },
  { seat: 22, name: 'Sara Dögg Svanhildardóttir', role: 'Fyrrv. bæjarfullrúi', gradient: 'linear-gradient(135deg, #FD7D26, #FBB03B)' },
];

export const ideaCategories = [
  {
    id: "aldradir",
    title: "Gaman að vera gamall í Garðabæ",
    iconName: "Heart",
    ideas: [
      "Frístundabíll f. aldraða - úr öðrum hverfum í Jónshús",
      "Niðurgreiðsla heilsurækt eldra fólks",
      "Heilsurækt fyrir aldraða"
    ]
  },
  {
    id: "ithrottir",
    title: "Íþróttir og menning",
    iconName: "Activity",
    ideas: [
      "Aukið aðgengi að sundlaug (stækkun sundlaugar)",
      "Lengja opnunartíma sundlauga",
      "Æfingaraðstaða jaðarsettra hópa/íþróttagreina (Dansaðstaða, stærri fimleikaaðstaða)",
      "Bæjarhátíð",
      "Götugrill/ Nágrannatengsl",
      "Aukið menning/tónlist",
      "Fleiri 'Þorp' eins og Jazzþorpið",
      "Meira af gleði og samfélagi á Garðatorgi",
      "Garðatorg - tengja 'torgin' betur",
      "Sundlaugarmenning - Mynd og músík",
      "Sjáland Veitingarstaður?",
      "Gera Garðatorg hlýrra og meira aðlaðandi - fyrri fólk til að 'hang out'",
      "Nýta Hofstaðatún f/Gleði á sumrin t.d. 17.júní",
      "Efla bókasafnið - Gera meira kósý og aðlaðandi f.fjölskyldur",
      "Flakk á milli íþrótta f. yngstu börnin",
      "Gera meira á 17.júní í bænum og færa menningarmót í GBÆ",
      "Jólaþorp - Taka HFJ til fyrirmyndar og nýta Garðatorg í það",
      "Markvisst fjölga veitingarstöðum í bænum",
      "Líkamsræktarstöð",
      "Miðgarður: sterk framtíðarsýn. Blanda saman menningu og íþróttum",
      "Opna sunnudagskvöld í sund til 22.00",
      "Stærri hugmyndir um Miðbæ",
      "Æfingarhúsnæði fyrir Tónlistarfólk"
    ]
  },
  {
    id: "samgongur",
    title: "Samgöngur og skipulagsmál",
    iconName: "Map",
    ideas: [
      "Undirgöng á milli Garðabæjar og Kópavogs við smára og akra",
      "Inngangur í Garðabæ við Arnarneshæð - hitamál akrahverfis og arnarneshverfis",
      "Útivist v. Urriðakotsvatn",
      "Bæta samgöngur á milli hverfa. Hjóla / Strætó",
      "Laga gangstéttir",
      "Yfirbyggð strætóskýli. Börn og ungmenni eiga að hafa greiðan aðgang um bæinn",
      "Almenningssamgöngur innanbæjar",
      "Hjólageymslur við Ásgarð og Garðaskóla",
      "Hringakstur / sleppistæði við öll íþróttahús og skóla",
      "Fjölga skutlvösum",
      "Norðurnesið skipulagsmál",
      "Hvar stöndum við í borgarlínu og stokk í gegnum Garðabæ",
      "Framtíðarsýn hverfa m.t.t. sérstöðu",
      "Vífilstaðir: Nýta græn svæði",
      "Garðatorg grænna!",
      "Samgöngumál í Urriðaholti",
      "Urriðaholt í sér póstnúmer",
      "Umferðarflæði (Urriðaholt, Þorraholt)",
      "Tenging úr Urriðaholti við Heiðmörk",
      "Öryggi og aðgengi milli staða (göngustígar)",
      "Göngustígur meðfram sjó (Arnarnes) og læk (sunnuflöt)",
      "Einn Garðabær!",
      "Ofanbyggðarvegur - samtal milli sveitarfélaga",
      "Öryggi íbúa - ein leið inn í urriðaholt",
      "Leiksvæði í Garðabæ. Auka fjölbreytni"
    ]
  },
  {
    id: "fjarmal",
    title: "Fjármál og rekstur",
    iconName: "Briefcase",
    ideas: [
      "Húsnæðismál f. ungt fólk",
      "Betra eftirlit með fjármálum",
      "Ljósastýring götumála",
      "Lestur á heitu vatni í innviðum bæjarins",
      "Fækka nefndum til að einfalda stjórnsýslu",
      "Hvatapeningar frá 2 ára",
      "Verðskrá Stjörnunnar",
      "Innkaupastefna sveitarfélagsins",
      "Betri eftirfylgni með hvatapeningum",
      "Fjármál tengd íþróttastarfssemi. Flæði á milli greina",
      "Hærri hvatapeningar - líka fyrir 18-20 ára",
      "Systkinaafsláttur - Fjölgreinaafsláttur í íþróttum",
      "Iðgjöld íþrótta fyrir börn 4-10 ára. 1 gjaldfrjáls íþrótt",
      "Gæðastjórnun sveitarfélagsins"
    ]
  },
  {
    id: "velferd",
    title: "Velferð",
    iconName: "Sun",
    ideas: [
      "Þjónusta við fatlað fólk. Verum til fyrirmyndar",
      "Opnun einkarekinnar heilsugæslu í Garðabæ",
      "Forvarnir og fræðsla; vímuefni og unglingar",
      "Aukinn stuðningur við börn með greiningar og talvandamál",
      "Talmeinafræðinga í skólana",
      "Öflugt forvarnarstarf fyrir alla aldurshópa"
    ]
  },
  {
    id: "born",
    title: "Börn og ungmenni",
    iconName: "Smile",
    ideas: [
      "Frístundastrætó, aukin tíðni og aukinn akstur",
      "Félagsmiðstöðvar fyrir yngri krakka",
      "Heildstæð nálgun v. málefna fjölskyldna",
      "Sumarfrístund allan daginn",
      "Ungmennahús - framtíðarmöguleikar",
      "Mötuneyti leikskóla - eldað á staðnum",
      "Niðurgreiðsla hækkar um 18 mán (...)",
      "Leikskólar frá 1 árs",
      "Félagsmiðstöðvar - horfa til mosó",
      "Skólalóðir aðlaðandi fyrir unglinga - sérstaklega unglingsstúlkur"
    ]
  },
  {
    id: "annad",
    title: "Annað",
    iconName: "MoreHorizontal",
    ideas: [
      "Frumkvöðlasetur - stuðningur við ungt fólk",
      "Styðja við ungt fólk sérstaklega í nýsköpun",
      "Gagnsæi í stjórnsýslu (T.d. fundargerðir og fylgigögn)",
      "Mannauðsmál",
      "Frístundabíll foreldra!!",
      "Stækkun FG",
      "Stuðningur við Kennara",
      "Stækkun Sjálandsskóla"
    ]
  }
];
