import type { EventCategory, EventSection } from "./events";

/*
  French translations of the events archive.

  Kept alongside events.ts rather than inside it so the English data stays
  readable, and so a missing translation degrades to English rather than
  breaking the page. `eventFr(slug)` returns undefined when an event has not
  been translated yet, and the French pages fall back to the English text.

  Proper nouns are not translated: the organisation's registered name, partner
  organisations (Mother of Hope Cameroon, UNESCO, MINEPAT, Alliance Française),
  place names, and people's names all stay as they are.
*/

export const categoryFr: Record<EventCategory, string> = {
  Environment: "Environnement",
  Heritage: "Patrimoine",
  Youth: "Jeunesse",
  Arts: "Arts",
  Advocacy: "Plaidoyer",
};

export type EventFr = {
  title: string;
  excerpt: string;
  body?: string[];
  sections?: EventSection[];
  /** image src -> translated alt text and caption */
  photos?: Record<string, { alt: string; caption?: string }>;
};

export const eventsFr: Record<string, EventFr> = {
  "girls-leadership-healthy-relationships-mohcam": {
    title:
      "Aider les filles à bâtir des relations saines et à diriger avec confiance",
    excerpt:
      "Leotine Pietamen, chargée de la protection de l'enfance chez DARED, a animé une session du Girls Leadership Program avec Mother of Hope Cameroon, autour de l'estime de soi, des limites saines et des relations respectueuses.",
    body: [
      "Dans le cadre de notre engagement pour les droits, la protection et l'autonomisation des filles, Leotine Pietamen, chargée de la protection de l'enfance chez DARED, a récemment animé une session du Girls Leadership Program, soutenu par Mother of Hope Cameroon (MOHCAM).",
      "Cette session interactive portait sur l'estime de soi, les limites saines, les relations respectueuses et l'importance de préserver sa tranquillité. À travers des discussions ouvertes et des activités de réflexion, les participantes ont été encouragées à s'exprimer, à remettre en question les idées reçues qui leur nuisent et à trouver la confiance nécessaire pour faire des choix sains.",
      "L'un des moments les plus marquants est survenu lorsque les filles ont compris que poser des limites et exiger le respect ne relèvent pas de l'égoïsme, mais de l'estime de soi. À la fin de la session, elles s'encourageaient mutuellement à se valoriser et à construire des relations fondées sur le respect mutuel.",
      "DARED salue l'engagement de Leotine Pietamen, qui crée des espaces sûrs où les filles trouvent leur voix, gagnent en confiance et développent les compétences de leadership dont elles ont besoin pour s'épanouir.",
      "Nous remercions sincèrement Mother of Hope Cameroon (MOHCAM) de nous avoir permis de contribuer à cette belle initiative. Ensemble, nous accompagnons une génération de filles confiantes, résilientes et autonomes.",
    ],
    photos: {
      "/images/girls-leadership-program-mohcam-session.jpg": {
        alt: "Participantes et animatrices assises dans l'herbe autour de la banderole du Girls Leadership Program",
        caption: "La session s'est tenue en plein air, en cercle plutôt qu'en rangées.",
      },
      "/images/girls-leadership-program-mohcam-facilitator.jpg": {
        alt: "Une animatrice vêtue d'un haut en tissu Toghu anime une discussion avec des filles assises dans l'herbe",
        caption:
          "Les échanges ont porté sur l'estime de soi, les limites et la préservation de sa tranquillité.",
      },
      "/images/girls-leadership-program-mohcam-group-discussion.jpg": {
        alt: "Participantes et bénévoles de MOHCAM assises en cercle pendant une discussion de groupe",
        caption:
          "Les filles se sont encouragées mutuellement à exiger le respect dans leurs relations.",
      },
    },
  },

  "child-trauma-awareness-workshop-bamenda": {
    title:
      "Favoriser la guérison par la sensibilisation au traumatisme infantile à Bamenda",
    excerpt:
      "Leotine Pietamen, chargée de la protection de l'enfance chez DARED, a animé un atelier de sensibilisation au traumatisme infantile dans un orphelinat de Bamenda, réunissant 21 enfants et encadrants autour du traumatisme, de la guérison émotionnelle et des stratégies d'adaptation positives.",
    body: [
      "Dans le cadre de l'engagement de DARED pour la protection de l'enfance et le bien-être psychosocial, notre chargée de la protection de l'enfance, Leotine Pietamen, a animé un atelier de sensibilisation au traumatisme infantile dans un orphelinat de Bamenda. La session a réuni 21 enfants et encadrants afin de construire une compréhension commune du traumatisme et de ce que peut être la guérison.",
      "L'atelier a offert un espace sûr et bienveillant où les participants ont pu parler librement du traumatisme infantile, de la guérison émotionnelle et des stratégies d'adaptation positives. Discussions de groupe, activités d'expression des émotions, séances de questions-réponses et présentations collectives ont permis aux enfants comme aux encadrants de prendre part à des échanges porteurs de résilience, de compréhension et d'espoir.",
      "Bien que de nombreux enfants résidant à l'orphelinat aient été absents ce jour-là, le programme s'est déroulé avec des enfants de la communauté environnante, grâce à la collaboration des encadrants de l'orphelinat.",
      "L'un des résultats les plus encourageants est venu des encadrants eux-mêmes, qui ont déclaré avoir autant appris que les enfants. Leurs retours confirment l'importance de doter à la fois les enfants et les adultes qui les entourent des connaissances et des compétences nécessaires pour accompagner la guérison.",
      "DARED salue l'engagement de Leotine Pietamen en faveur de la protection de l'enfance et de la création d'espaces sûrs où les enfants peuvent apprendre, guérir et s'épanouir, et remercie sincèrement toutes celles et ceux dont le soutien a rendu cette initiative possible. Ensemble, nous restons déterminés à protéger les enfants, à renforcer les familles et à bâtir des communautés résilientes.",
    ],
    photos: {
      "/images/child-trauma-awareness-workshop-session.jpg": {
        alt: "Des enfants assis sur des bancs sous une véranda écoutent l'animatrice à l'orphelinat",
        caption: "Vingt et un enfants et encadrants ont pris part à l'atelier.",
      },
      "/images/child-trauma-awareness-workshop-feelings-card.jpg": {
        alt: "Une fiche des émotions imprimée présentant dix-huit sentiments, de la joie et la gratitude à l'inquiétude et la solitude",
        caption:
          "La fiche des émotions utilisée pour l'activité d'expression : « Il est normal de ressentir chacune de ces émotions. »",
      },
      "/images/child-trauma-awareness-workshop-session-plan.jpg": {
        alt: "Une page de carnet manuscrite présentant l'objectif de l'atelier et son animatrice",
        caption:
          "Le plan de séance : comprendre le traumatisme, ses causes et ses effets, et les stratégies d'adaptation saines.",
      },
    },
  },

  "nayef-2026-national-youth-economic-forum": {
    title: "Des paroles aux actes : DARED au NAYEF 2026",
    excerpt:
      "Le Directeur de DARED a rejoint responsables publics, partenaires au développement, entrepreneurs et jeunes leaders comme délégué sélectionné au premier Forum économique national de la jeunesse, avec des enseignements sur la participation des jeunes, la collaboration et la valorisation des talents.",
    sections: [
      {
        paragraphs: [
          "Le Directeur de DARED, Tamfu Kilem Bongwa, a représenté l'organisation en tant que délégué sélectionné à la première édition du Forum économique national de la jeunesse (NAYEF 2026), placé sous le patronage du Ministère de l'Économie, de la Planification et de l'Aménagement du Territoire (MINEPAT).",
          "Le forum a réuni responsables publics, partenaires au développement, entrepreneurs, innovateurs, créateurs et jeunes leaders, tous engagés à bâtir une économie plus forte et plus inclusive pour le Cameroun.",
        ],
      },
      {
        heading: "Les enseignements que nous retenons",
        bullets: [
          "Les jeunes doivent participer activement à l'élaboration des politiques et des programmes qui les concernent. Comme l'a justement rappelé M. Ngwane Denzel : « Tout ce qui est fait pour les jeunes sans les jeunes est fait contre les jeunes. »",
          "La collaboration est plus puissante que la concurrence. Lorsque organisations et individus travaillent ensemble autour d'une vision commune, l'impact est bien plus grand.",
          "Le talent a besoin d'un environnement propice. Les opportunités se développent là où existent des politiques favorables, la redevabilité, l'accès à l'information et des réseaux solides.",
          "La créativité devient une valeur durable grâce à la marque, à la communication et à la narration. Le Cameroun regorge de talents, et il reste beaucoup à faire pour en faire des marques reconnues à l'international.",
          "Le leadership commence par la connaissance de soi : comprendre ses forces, reconnaître ses faiblesses et s'engager au service des autres.",
        ],
      },
      {
        paragraphs: [
          "DARED revient du NAYEF encouragé et plus déterminé encore à faire progresser l'autonomisation des jeunes par l'entrepreneuriat, l'innovation, la finance et le développement inclusif.",
          "Les échanges ont eu lieu. Il s'agit maintenant de les traduire en actes.",
        ],
      },
    ],
    photos: {
      "/images/national-youth-economic-forum-nayef-2026-poster.jpg": {
        alt: "Affiche du Forum économique national de la jeunesse consacré à l'entreprise, à l'investissement et à la croissance inclusive",
        caption:
          "Le forum s'est tenu sous le patronage du MINEPAT, avec le PNUD parmi les partenaires.",
      },
      "/images/national-youth-economic-forum-nayef-2026-panel.jpg": {
        alt: "Des panélistes installés à la table d'honneur s'adressent à un amphithéâtre rempli de délégués",
        caption: "Les délégués en séance dans la salle du MINEPAT.",
      },
      "/images/national-youth-economic-forum-nayef-2026-dared-director.jpg": {
        alt: "Le Directeur de DARED au fond de l'amphithéâtre du forum",
        caption:
          "Le Directeur de DARED, Tamfu Kilem Bongwa, y participait comme délégué sélectionné.",
      },
    },
  },

  "undp-field-visit": {
    title: "Visite de terrain du PNUD et revue du projet de relèvement",
    excerpt:
      "DARED a accompagné le Représentant résident du PNUD lors d'une visite de terrain dans la Région du Nord-Ouest pour évaluer l'impact du projet de relèvement : hausse de 2 % de la production agricole, nouveaux hangars de marché à Bafmen et programme de football pour la paix et la cohésion sociale.",
    sections: [
      {
        paragraphs: [
          "Le Directeur de DARED a accompagné le Représentant résident du PNUD, M. Mathues, lors d'une visite de terrain et d'une réunion de concertation dans la Région du Nord-Ouest du Cameroun, afin d'évaluer l'impact d'un projet de relèvement en cours. La mission a réuni le Délégué régional de l'Agriculture, le Maire de la commune de Zhoa, des représentants de la commune de Bamenda I ainsi que des partenaires issus des institutions publiques, des collectivités locales et de la société civile.",
        ],
      },
      {
        heading: "L'impact du projet à ce jour",
        bullets: [
          "Une hausse de 2 % de la production agricole dans la Région du Nord-Ouest grâce à la distribution d'intrants.",
          "16 hangars de marché achevés à Bafmen, sur les 37 demandés.",
          "Un programme de football pendant les vacances favorisant la paix et la cohésion sociale chez les jeunes.",
        ],
      },
      {
        heading: "Perspectives",
        paragraphs: [
          "À cette occasion, le PNUD a présenté ses priorités stratégiques pour 2027-2031, centrées sur le développement du capital humain, la résilience économique et la consolidation de la paix.",
        ],
      },
      {
        heading: "Axes stratégiques",
        bullets: [
          "Capital humain et cohésion sociale.",
          "Résilience économique et développement du secteur privé (économie bleue et verte).",
          "Action climatique et égalité de genre.",
        ],
      },
      {
        paragraphs: [
          "Cette concertation a renforcé la collaboration entre DARED, les institutions publiques, les collectivités locales et la société civile en faveur d'un relèvement inclusif et d'une paix durable dans la région.",
        ],
      },
    ],
  },

  "football-for-social-cohesion": {
    title: "Le football au service de la cohésion sociale et du développement",
    excerpt:
      "Bilan de la première année du projet « Football au service de la cohésion sociale et du développement communautaire » à Bamenda : 865 participants (54 % de femmes et de filles) et plus de 1 000 jeunes mobilisés pour des campagnes de salubrité.",
    sections: [
      {
        paragraphs: [
          "En partenariat avec Development for Humanity (DEH), DARED a achevé la première année du projet « Football au service de la cohésion sociale et du développement communautaire » à Bamenda, dans la Région du Nord-Ouest du Cameroun. Le projet mobilise le sport et le service communautaire pour renforcer la coexistence pacifique dans une région marquée par le conflit.",
        ],
      },
      {
        heading: "Le projet",
        paragraphs: [
          "Le projet visait à renforcer la cohésion sociale entre la majorité Grassfield et la minorité peule, à promouvoir la responsabilité environnementale et à favoriser l'inclusion des femmes et des personnes en situation de handicap dans la vie communautaire.",
        ],
      },
      {
        heading: "Résultats de la première année",
        bullets: [
          "865 participants directs engagés dans le football, la consolidation de la paix et les activités communautaires.",
          "54 % de participation féminine, femmes et filles confondues.",
          "Plus de 1 000 jeunes mobilisés pour des campagnes de salubrité.",
          "Participation d'hommes en situation de handicap.",
        ],
      },
      {
        heading: "Activités",
        bullets: [
          "Matchs de football masculins et féminins.",
          "Actions de consolidation de la paix entre communautés.",
          "Service communautaire et assainissement des rues, des marchés et des espaces publics.",
        ],
      },
      {
        heading: "Difficultés et enseignements",
        paragraphs: [
          "Malgré un travail de mobilisation ciblé, l'équipe n'a pas pu identifier de participantes amputées éligibles cette année. Approfondir l'inclusion des personnes en situation de handicap reste une priorité pour la prochaine phase du projet.",
        ],
      },
      {
        paragraphs: [
          "Ensemble, ces actions ont contribué à une meilleure cohésion sociale, à un environnement plus propre et à une inclusion renforcée, au service d'une coexistence pacifique dans toute la région.",
        ],
      },
    ],
  },

  "project-management-grant-writing-workshop": {
    title: "Atelier de gestion de projet et de rédaction de demandes de subvention",
    excerpt:
      "Une formation intensive de trois jours à Bamenda, financée par l'Agence française de développement via l'Alliance Française Bamenda, qui a doté 30 participants issus de plus de 20 organisations de compétences en conception de projet et en recherche de financements.",
    body: [
      "Direct Action for Rights Equity and Development (DARED) a organisé à Bamenda, dans la Région du Nord-Ouest du Cameroun, un atelier de trois jours consacré à la gestion de projet et à la rédaction de demandes de subvention. Cette formation intensive a réuni 30 participants venus de plus de 20 organisations : artistes, organisations communautaires et représentants de personnes en situation de handicap. Elle a été rendue possible grâce au financement de l'Agence française de développement (AFD), via l'Alliance Française Bamenda.",
      "La première journée, animée par le Dr Forgwie Gideon, a porté sur les fondamentaux de la conception de projet, de l'identification du problème à la définition d'objectifs SMART.",
      "La deuxième journée, le Directeur de DARED, Tamfu Kilem Bongwa, a guidé les participants dans l'approche du cadre logique et les principes de l'élaboration budgétaire.",
      "La dernière journée était consacrée à la rédaction de demandes de subvention : montage de la proposition, structuration de dossiers compétitifs et compréhension des exigences des bailleurs.",
      "À l'issue de l'atelier, les participants disposaient de compétences essentielles en conception de projet et en recherche de financements, renforçant les capacités de leurs organisations et favorisant la collaboration intersectorielle dans toute la région.",
    ],
  },

  "tree-planting-bafut-palace": {
    title: "Plantation d'arbres au Palais royal de Bafut",
    excerpt:
      "Avec le soutien de l'Assemblée régionale du Nord-Ouest et du programme des Volontaires du patrimoine mondial de l'UNESCO, DARED a planté 500 palmiers pour restaurer le patrimoine écologique et culturel du royaume de Bafut.",
    body: [
      "Dans une démarche importante de sauvegarde du patrimoine naturel et culturel, Direct Action for Rights Equity and Development (DARED) a mené une opération de plantation d'arbres de grande ampleur au Palais royal historique de Bafut. Ce projet a été rendu possible grâce au financement de l'Assemblée régionale du Nord-Ouest et à un partenariat avec la commune de Bafut et le programme des Volontaires du patrimoine mondial de l'UNESCO 2025.",
      "L'objectif principal était de rétablir l'équilibre écologique des abords du palais par la plantation de 500 palmiers sur l'ensemble du site. Cette action répond directement au défi urgent de la déforestation, qui menace la biodiversité de la région, dégrade la qualité des sols et érode les paysages traditionnels indissociables de l'identité du palais.",
      "Au-delà de son impact environnemental, l'initiative s'inscrit dans une logique de durabilité économique et culturelle. La plantation de palmiers vise à revitaliser la pratique ancestrale de la récolte du vin de palme, activité culturellement significative et économiquement précieuse pour les communautés de Bafut. En investissant dans ces arbres, le projet soutient les moyens de subsistance futurs tout en préservant une part essentielle de la tradition et de l'identité locales.",
      "Cette collaboration entre institutions communautaires, pouvoirs publics et partenaires du patrimoine culturel marque une avancée importante. Elle témoigne d'un engagement commun à protéger les richesses inestimables du royaume de Bafut pour les générations à venir, afin que l'environnement naturel comme les traditions continuent de prospérer.",
    ],
  },

  "heritage-engagement-bamendankwen": {
    title: "Rencontre culturelle au Palais de Bamendankwen",
    excerpt:
      "En partenariat avec la Délégation régionale des Arts et de la Culture, DARED a conduit des étudiants de l'Université de Bamenda au Palais et au Musée de Bamendankwen pour renforcer l'engagement des jeunes dans la préservation culturelle.",
    body: [
      "Pour reconnecter les jeunes à leurs racines, Direct Action for Rights Equity and Development (DARED) a organisé une activité de valorisation du patrimoine culturel. Menée en partenariat avec la Délégation régionale des Arts et de la Culture et le Conseil traditionnel de Bamendankwen, cette initiative a réuni des étudiants de la Faculté du patrimoine culturel et des relations internationales de l'Université de Bamenda autour d'un lien plus étroit avec le patrimoine local.",
      "La journée s'est ouverte sur l'allocution du Délégué régional des Arts et de la Culture, qui a souligné le rôle déterminant des étudiants dans la préservation de l'identité culturelle camerounaise. La Reine mère de Bamendankwen a chaleureusement accueilli les participants, exprimant sa gratitude pour cette visite et rappelant l'importance historique du palais.",
      "Les participants ont ensuite suivi une visite guidée du Palais de Bamendankwen, conduite par la Reine mère et le Secrétaire du palais. Les étudiants ont découvert l'organisation architecturale, les symboles culturels et les structures administratives du fondom, acquérant une expérience concrète venant compléter leurs études. La visite s'est poursuivie au Musée de Bamendankwen, où les objets historiques ont donné vie à l'évolution de la communauté.",
      "L'engagement pratique était au cœur du programme. Les étudiants ont participé à une opération de nettoyage du musée, aux côtés des gardiens du palais, dans ce travail essentiel d'entretien et de conservation. Le Directeur de DARED, Tamfu Kilem Bongwa, a ensuite prononcé une intervention marquante sur le volontariat comme pilier de la protection du patrimoine, invitant les étudiants à devenir des gardiens actifs au sein de leurs propres communautés.",
      "La journée s'est achevée par un repas partagé et une séance de questions-réponses avec le Fon de Bamendankwen et le chef du Conseil traditionnel. Ce dialogue ouvert a offert aux étudiants une occasion rare d'échanger directement avec les autorités traditionnelles et d'approfondir leur compréhension des enjeux de la préservation culturelle.",
    ],
  },

  "visit-bafut-palace": {
    title: "Une visite au Palais de Bafut",
    excerpt:
      "Une rencontre avec les producteurs locaux d'Atogho au Palais de Bafut, site inscrit sur la Liste indicative de l'UNESCO, pour discuter du développement de la broderie et du secteur créatif de la région.",
    body: [
      "Une visite au Palais de Bafut, l'un des deux seuls sites de la Région du Nord-Ouest inscrits sur la Liste indicative du patrimoine mondial de l'UNESCO. Une rencontre s'est tenue avec les producteurs locaux d'Atogho, élément majeur du patrimoine de la mode et du design de la région.",
      "Lors de cette rencontre présidée par le Fon de Bafut, nous avons évoqué les moyens de dynamiser le secteur de la broderie par le soutien aux créateurs de mode locaux, la création de PME et la mise en relation permettant d'attirer des investissements dans les secteurs créatifs et culturels. Nous avons également discuté de marchés alternatifs pour les artisans locaux, durement touchés par la crise en cours qui a interrompu le tourisme dans le village de Bafut.",
    ],
  },

  "childrens-holiday-bootcamp": {
    title: "Camp de vacances pour enfants",
    excerpt:
      "Un camp pratique réunissant 50 enfants autour des arts plastiques, de la peinture, de la programmation informatique, du développement web et de la musique, pour développer créativité, compétences numériques et confiance en soi.",
    body: [
      "Le camp visait à stimuler la créativité par les arts plastiques, la peinture et le dessin ; à développer les compétences numériques par la programmation et le développement web ; à faire naître le talent et le goût musical par une formation dédiée ; et à offrir un cadre sûr propice au travail d'équipe, à la confiance en soi et à l'innovation.",
      "Les participants ont pris part à des ateliers pratiques dans cinq domaines : arts plastiques (pensée créative, créativité et résolution de problèmes) ; peinture et dessin (esquisse, mise en couleur et ombrage) ; programmation informatique (bases du code, pensée logique et littératie numérique) ; développement web (création de pages simples et production de contenu) ; et formation musicale (solfège de base, rythme et technique vocale).",
      "Au-delà des compétences techniques, les participants ont renforcé leurs compétences relationnelles : travail d'équipe et collaboration, prise de parole en public et présentation, confiance en soi et autodiscipline.",
      "Le camp a réuni 50 enfants et adolescents, dont l'enthousiasme et les réalisations ont marqué l'ensemble des sessions. Il s'est conclu par une cérémonie de clôture mémorable, en présence des parents, des formateurs et des partenaires, au cours de laquelle un certificat de participation a été remis à chacun des 50 enfants, accompagnée d'expositions d'œuvres, de projets numériques et de prestations musicales.",
    ],
  },

  "film-for-advocacy-workshop": {
    title: "Atelier « Le cinéma au service du plaidoyer »",
    excerpt:
      "De jeunes cinéastes venus de tout le Cameroun se sont formés au cinéma de plaidoyer à l'ambassade des États-Unis à Yaoundé, dans le cadre du programme d'échange réciproque de la Mandela Washington Fellowship.",
    body: [
      "DARED est fier d'avoir pris part à l'atelier « Le cinéma au service du plaidoyer », qui s'est tenu du 2 au 12 avril 2024. Organisé par Noble Arts Entertainment Company (NAEC) en partenariat avec Israel Scott Family Creatives à l'ambassade des États-Unis à Yaoundé, l'événement a réuni de jeunes cinéastes venus de tout le Cameroun pour se former au cinéma, avec un accent particulier sur le film de plaidoyer.",
      "Cet atelier a été rendu possible par le programme d'échange réciproque de la Mandela Washington Fellowship du Département d'État américain, financé par le gouvernement des États-Unis et administré par IREX — un soutien qui souligne l'importance de donner aux voix créatives les moyens de porter le changement social.",
      "Les participants ont été formés lors de sessions interactives par des spécialistes et des figures reconnues du cinéma : le Dr Peter Fada (producteur et réalisateur, Lahira TV, Royaume-Uni), le Dr Victor Okhai (producteur, réalisateur et consultant, Nigeria), M. Israel Scott (producteur, acteur et coach d'acteurs, États-Unis), M. Mekemndi Randy (cinéaste primé et animateur) et Mme Rose Mbolle Epie (journaliste et animatrice de télévision chevronnée).",
      "L'événement a offert un cadre d'apprentissage pratique remarquable. Il a également constitué une véritable plateforme de mise en réseau pour les jeunes cinéastes camerounais : répartis en groupes, les participants ont été accompagnés dans la réalisation de courts métrages de plaidoyer sur des sujets variés reflétant la réalité de nos communautés.",
    ],
  },

  "commemorating-world-heritage-day": {
    title: "Commémoration de la Journée mondiale du patrimoine",
    excerpt:
      "Une journée d'activités commémoratives comprenant une intervention à la radio CRTV et des visites guidées de sites patrimoniaux — le fort allemand et les chutes de Menteh — avec des étudiants de l'Université de Bamenda.",
    body: [
      "Une expérience remarquable pour cette première journée d'activités communautaires célébrant la Journée internationale des monuments et des sites. Les activités commémoratives ont débuté à 9 heures par une visite à la station régionale de la radio CRTV pour l'émission « Yours and Mine ». Nous y avons évoqué la portée historique de la Journée mondiale du patrimoine, son origine et sa conception, ainsi que sa signification culturelle dans notre contexte local. Nous avons mis en lumière les sites patrimoniaux de la Région du Nord-Ouest du Cameroun et l'importance de les protéger.",
      "Le programme s'est poursuivi par la visite d'une série de sites patrimoniaux de la région avec des étudiants de la Faculté d'histoire et d'archéologie de l'Université de Bamenda. Nous avons commencé par le fort allemand, où les étudiants ont découvert des bâtiments vieux de plus de 112 ans, ainsi que le cimetière du fort où reposent des soldats allemands et britanniques tombés au Cameroun. A suivi une visite au village de Menteh, qui abrite l'un des sites patrimoniaux les plus remarquables de la région : les chutes de Menteh.",
      "À notre arrivée au village, nous avons été reçus chez le sous-chef, appelé « MOOH ». Il a accueilli la délégation en retraçant brièvement l'histoire du village, ses festivals et ses pratiques ancestrales. Lors d'une séance de questions-réponses, les étudiants ont découvert la signification culturelle des chutes de Menteh et les pratiques liées aux valeurs locales, notamment les festivals annuels au cours desquels l'eau des chutes est portée au Fon du village pour l'année. La visite s'est achevée sur le site lui-même, guidée par le MOOH et des notables du village de Menteh.",
    ],
  },

  "world-heritage-volunteers": {
    title: "Volontaires du patrimoine mondial",
    excerpt:
      "Un partenariat avec la Délégation régionale des Arts et de la Culture pour le projet du Fonds des Volontaires du patrimoine mondial de l'UNESCO au Palais royal de Bafut, faisant du volontariat un levier de restauration du patrimoine.",
    body: [
      "À mesure que le monde devient un village planétaire, une bataille culturelle s'engage, chaque culture cherchant à influencer et à dominer les autres. Il nous appartient donc de préserver notre culture, notre patrimoine culturel et notre identité, pour cette génération comme pour la suivante.",
      "C'est avec fierté que Direct Action for Rights Equity and Development (DARED) s'associe à la Délégation régionale des Arts et de la Culture du Nord-Ouest pour la mise en œuvre du projet du Fonds des Volontaires du patrimoine mondial de l'UNESCO, sous l'égide du service régional du patrimoine culturel. Mené au Palais royal de Bafut, ce projet fait du volontariat un levier de restauration et de préservation du patrimoine.",
      "Le projet, qui associe sensibilisation et travaux pratiques, vise également à créer un sentiment d'inclusion et de participation chez les jeunes volontaires. Grâce à des partenariats avec les acteurs clés, nous œuvrons à la restauration de ce patrimoine majeur qu'est le Palais royal de Bafut, site inscrit sur la Liste indicative du patrimoine mondial de l'UNESCO. Nous sommes également fiers que notre Directeur, Tamfu Kilem, assure la coordination du programme.",
    ],
  },

  "youth-empowerment-workshop": {
    title: "Atelier d'autonomisation des jeunes",
    excerpt:
      "Une formation pratique en littératie numérique, entrepreneuriat, gestion financière et leadership, pour combler l'écart entre la formation et l'emploi des jeunes.",
    body: [
      "Le développement des compétences, en particulier chez les jeunes, est un pilier d'un avenir plus résilient et l'un des moyens les plus durables de bâtir les économies locales.",
      "Chez DARED, nous sommes convaincus qu'il est essentiel de doter la prochaine génération de compétences concrètes et recherchées. Cet atelier a été conçu pour combler l'écart entre la formation et l'emploi, en offrant aux jeunes participants une formation pratique en littératie numérique, entrepreneuriat, gestion financière et leadership.",
      "Investir dans notre jeunesse, c'est investir directement dans la force et la prospérité de nos communautés. Cet événement marque une nouvelle étape de notre engagement à créer des opportunités durables et à cultiver l'autonomie et l'innovation. Nous sommes fiers de nous associer aux responsables et aux experts locaux pour proposer un contenu utile et à fort impact.",
    ],
  },

  "world-theatre-day": {
    title: "Journée mondiale du théâtre 2024",
    excerpt:
      "Une rencontre réunissant de jeunes comédiens et des comédiens en devenir pour célébrer le théâtre comme culture de paix, et explorer les défis et les opportunités du secteur des arts de la scène.",
    body: [
      "Dans le cadre des activités de célébration de la Journée mondiale du théâtre 2024, Direct Action for Rights Equity and Development (DARED), en partenariat avec la Délégation régionale des Arts et de la Culture du Nord-Ouest et Noble Arts Entertainment, a organisé une rencontre réunissant des jeunes et des comédiens en devenir de toute la région.",
      "La célébration s'articulait autour du thème : « L'artiste et le mouvement de structuration culturelle du Cameroun et la consolidation de la paix ; opportunités et défis des arts de la scène. » Ce thème a nourri des échanges importants sur le rôle des arts dans la construction d'une société pacifique et culturellement riche.",
      "Considérant que le théâtre est une culture de paix et un miroir de la société, les acteurs du secteur et les figures expérimentées ont encouragé les jeunes artistes à ne pas fléchir dans leur détermination. La session a également mis en lumière les défis et les opportunités du secteur, offrant des repères précieux à la nouvelle génération d'artistes.",
      "L'événement s'est conclu par une série de prestations inspirantes des troupes de théâtre locales présentes, révélant la vitalité des talents de notre communauté.",
    ],
  },

  "ivy-africa-madex-workshop": {
    title: "Atelier I.V.Y Africa MadEx (Madagascar)",
    excerpt:
      "DARED a rejoint à Antananarivo de jeunes responsables venus de plus de 15 pays pour traiter de la préservation du patrimoine et de l'action climatique par le volontariat, à l'invitation de la Commission nationale malgache pour l'UNESCO.",
    body: [
      "DARED a eu la belle occasion de participer à l'atelier I.V.Y. Africa MadEx à Antananarivo, à Madagascar, accueilli par la Commission nationale malgache pour l'UNESCO (COMMAT). Cet événement a réuni de jeunes responsables et des organisations de toute l'Afrique et au-delà, avec des délégués venus de Chine, de Thaïlande, d'Allemagne et de Roumanie, autour de la préservation du patrimoine et de l'action climatique par le volontariat.",
      "Parmi les principaux apports figurent l'exploration du lien entre changement climatique et conservation du patrimoine, et l'apprentissage de la conception de projets de volontariat à fort impact. Les participants ont mené une recherche-action participative sur la remarquable Colline royale d'Ambohimanga, site du patrimoine mondial de l'UNESCO, en échangeant sur les difficultés avec les communautés locales et les autorités, et ont acquis des outils de planification stratégique, de recherche de financements et de plaidoyer pour amplifier les initiatives portées par les jeunes.",
      "L'atelier a également été une expérience de mise en réseau inoubliable, avec des acteurs du changement venus de plus de 15 pays africains et d'ailleurs, pour partager les expériences et coconstruire une feuille de route des échanges de jeunes aux niveaux régional et mondial. L'énergie et les idées échangées ont été particulièrement stimulantes.",
    ],
  },

  "master-class-world-heritage-day": {
    title: "Masterclass pour la Journée mondiale du patrimoine",
    excerpt:
      "Une conférence de haut niveau avec des experts culturels sur la conservation du patrimoine, sa protection en zone de crise et les effets du changement climatique, en présence d'étudiants de l'Université de Bamenda.",
    body: [
      "Une conférence de haut niveau clôturant les activités de célébration de la Journée mondiale du patrimoine et de la Journée internationale des monuments et des sites. Ce fut une expérience remarquable, portée par un panel d'experts culturels de premier plan, sur des sujets tels que la conservation du patrimoine, sa protection en zone de crise et les effets du changement climatique sur le patrimoine et les sites patrimoniaux.",
      "Notre Directeur, Tamfu Kilem, est intervenu sur la liste du patrimoine de l'UNESCO et les sites camerounais. La conférence a mobilisé les acteurs du secteur et des étudiants de l'Université de Bamenda.",
    ],
  },

  "advocacy-training-session": {
    title: "Session de formation au plaidoyer",
    excerpt:
      "Une table ronde destinée à encourager les élèves à raviver la culture de la lecture, organisée avec la Délégation régionale des Arts et de la Culture et des partenaires de Bamenda.",
    body: [
      "La culture de la lecture ne cesse de reculer face à l'essor rapide d'autres technologies, de plus en plus de jeunes n'y voyant qu'une exigence pour réussir aux examens, sans utilité ensuite. Comme le résume M. Ngam, professeur d'anglais au Progressive Comprehensive College de Bamenda : « la culture de la lecture est morte et nous lui cherchons une sépulture digne de ce nom. »",
      "En réponse, un consortium réunissant Direct Action for Rights Equity and Development, la Délégation régionale des Arts et de la Culture et l'Alliance Franco a organisé une table ronde destinée à encourager les élèves à entretenir la culture de la lecture. Un panel divers en a rappelé les bénéfices : la lecture est un moyen de se détendre, elle renforce la confiance en soi, fait découvrir d'autres cultures, enrichit la langue et développe le raisonnement analytique et logique.",
      "L'événement a réuni de jeunes auteurs, des élèves et des bibliothécaires de Bamenda. Dans le cadre des activités commémoratives, notre Directeur Tamfu Kilem s'est rendu, aux côtés de Madame Maurine Munoh (chef du service du Livre et de la Lecture à la Délégation régionale des Arts et de la Culture du Nord-Ouest), à la Bibliothèque régionale de Bamenda pour en évaluer l'état.",
    ],
  },

  "engaging-local-craftsmen": {
    title: "À la rencontre des artisans locaux",
    excerpt:
      "Des tables rondes de renforcement des capacités avec les artisanes et artisans de la Région du Nord-Ouest, pour soutenir la substitution aux importations, renforcer les économies locales et développer le secteur créatif.",
    body: [
      "Aller à la rencontre des artisanes et artisans de la Région du Nord-Ouest comme levier de renforcement des capacités, à travers des tables rondes visant à identifier les axes d'intervention et de soutien aux secteurs créatifs et culturels.",
      "En appui à la substitution aux importations, qui s'inscrit dans l'effort gouvernemental de développement des économies locales, l'initiative a mobilisé PME, GIC et sociétés coopératives afin de nouer des partenariats et de collaborer, en bâtissant des relations durables capables de développer le secteur, d'améliorer la rentabilité et de stimuler le développement local.",
    ],
  },
};

/** Translation for a slug, or undefined when it has not been translated. */
export function eventFr(slug: string): EventFr | undefined {
  return eventsFr[slug];
}
