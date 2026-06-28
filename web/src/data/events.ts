export type EventCategory =
  | "Environment"
  | "Heritage"
  | "Youth"
  | "Arts"
  | "Advocacy";

/** A structured content block for longer write-ups (heading + text + bullets). */
export type EventSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type DaredEvent = {
  slug: string;
  title: string;
  category: EventCategory;
  /** Hero / card image */
  image: string;
  /** Short summary shown on the card */
  excerpt: string;
  /** Full article as plain paragraphs (simple events) */
  body?: string[];
  /** Structured article (headings + bullets) for longer write-ups */
  sections?: EventSection[];
  /** Additional photos for this event */
  gallery: string[];
  featured?: boolean;
};

// All content ported from the legacy site (legacy/Page1-8.html + index.html).
export const events: DaredEvent[] = [
  {
    slug: "undp-field-visit",
    title: "UNDP Field Visit & Recovery Project Review",
    category: "Advocacy",
    image: "/images/undp-field-visit.jpg",
    excerpt:
      "DARED joined the UNDP Resident Representative on a field visit to the Northwest Region to review recovery-project impact, including a 2% rise in agricultural production, new market sheds in Bafmen, and a youth football programme for peace and social cohesion.",
    sections: [
      {
        paragraphs: [
          "DARED's Director joined the UNDP Resident Representative, Mr. Mathues, on a field visit and consultation meeting in Cameroon's North West Region to assess the impact of an ongoing recovery project. The mission brought together the Regional Delegate for Agriculture, the Mayor of Zhoa Council, representatives of Bamenda I Council, and partners from government institutions, local councils, and civil society organizations.",
        ],
      },
      {
        heading: "Project impact so far",
        bullets: [
          "A 2% increase in agricultural production across the North West Region through input distribution.",
          "16 market sheds completed in Bafmen, out of 37 requested.",
          "A Football Holiday Programme promoting youth peace and social cohesion.",
        ],
      },
      {
        heading: "Looking ahead",
        paragraphs: [
          "During the visit, UNDP introduced its 2027 to 2031 strategic priorities, centred on human capital development, economic resilience, and peacebuilding.",
        ],
      },
      {
        heading: "Strategic focus areas",
        bullets: [
          "Human capital and social cohesion.",
          "Economic resilience and private sector development (blue and green economy).",
          "Climate action and gender equality.",
        ],
      },
      {
        paragraphs: [
          "The consultation strengthened collaboration between DARED, government bodies, local councils, and civil society toward inclusive recovery and lasting peace in the region.",
        ],
      },
    ],
    gallery: [
      "/images/undp-field-visit-1.jpg",
      "/images/undp-field-visit-2.jpg",
    ],
    featured: true,
  },
  {
    slug: "football-for-social-cohesion",
    title: "Football for Social Cohesion and Community Development",
    category: "Advocacy",
    image: "/images/football-social-cohesion.jpg",
    excerpt:
      "A year-one report on our Football for Social Cohesion and Community Development Project in Bamenda, which reached 865 participants (54% women and girls) and engaged over 1,000 youths in clean-up campaigns to build peace between communities.",
    sections: [
      {
        paragraphs: [
          "In partnership with Development for Humanity (DEH), DARED completed the first year of the Football for Social Cohesion and Community Development Project in Bamenda, in Cameroon's North West Region. The project uses sport and community service to strengthen peaceful coexistence in a region affected by conflict.",
        ],
      },
      {
        heading: "About the project",
        paragraphs: [
          "The project set out to strengthen social cohesion between the Grassfield majority and Fulani minority communities, promote environmental responsibility, and foster the inclusion of women and persons with disabilities in community life.",
        ],
      },
      {
        heading: "Year-one results",
        bullets: [
          "865 direct participants engaged in football, peacebuilding, and community activities.",
          "54% female participation across women and girls.",
          "Over 1,000 youths mobilised for community clean-up campaigns.",
          "Inclusion of male participants living with disabilities.",
        ],
      },
      {
        heading: "Activities",
        bullets: [
          "Male and female football matches.",
          "Peace-building engagements between communities.",
          "Community service and environmental sanitation across streets, markets, and public spaces.",
        ],
      },
      {
        heading: "Challenges and learning",
        paragraphs: [
          "Despite targeted outreach, the team was unable to identify eligible female amputee participants this year. Deepening the inclusion of persons with disabilities remains a priority for the next phase of the project.",
        ],
      },
      {
        paragraphs: [
          "Together, these efforts contributed to greater social cohesion, a cleaner environment, and stronger inclusion, advancing peaceful coexistence across the region.",
        ],
      },
    ],
    gallery: [
      "/images/football-social-cohesion-1.jpg",
      "/images/football-social-cohesion-2.jpg",
      "/images/football-social-cohesion-3.jpg",
      "/images/football-social-cohesion-4.jpg",
      "/images/football-social-cohesion-5.jpg",
      "/images/football-social-cohesion-6.jpg",
      "/images/football-social-cohesion-7.jpg",
    ],
    featured: true,
  },
  {
    slug: "project-management-grant-writing-workshop",
    title: "Project Management & Grant Writing Workshop",
    category: "Advocacy",
    image: "/images/grant-writing-workshop.jpg",
    excerpt:
      "A three-day intensive training in Bamenda, funded by the French Development Agency through Alliance Française Bamenda, equipping 30 participants from 20+ organizations with project design and fundraising skills.",
    body: [
      "Direct Action for Rights Equity and Development (DARED) organized a three-day Project Management and Grant Writing Workshop in Bamenda, in Cameroon's North West Region. The intensive training brought together 30 participants from over 20 organizations, including artists, community-based organizations, and representatives of persons with disabilities. It was made possible with funding from the French Development Agency (AFD), through Alliance Française Bamenda.",
      "Day one, led by Dr. Forgwie Gideon, covered the fundamentals of project design, from problem identification to setting clear, SMART objectives.",
      "On day two, DARED's Director, Tamfu Kilem Bongwa, guided participants through the Logical Framework Approach and the essentials of budget development.",
      "The final day focused on grant writing itself, proposal development, structuring competitive applications, and understanding donor requirements.",
      "By the close of the workshop, participants were equipped with essential skills in project design and fundraising, strengthening organizational capacity and fostering cross-sector collaboration across the region.",
    ],
    gallery: [
      "/images/grant-writing-workshop-1.jpg",
      "/images/grant-writing-workshop-2.jpg",
      "/images/grant-writing-workshop-3.jpg",
    ],
    featured: true,
  },
  {
    slug: "tree-planting-bafut-palace",
    title: "Tree Planting at the Bafut Royal Palace",
    category: "Environment",
    image: "/images/tree-planting-bafut-palace.jpg",
    excerpt:
      "With support from the North West Regional Assembly and the UNESCO Heritage Volunteer Program, DARED planted 500 palm trees to restore the ecological and cultural heritage of the Bafut Kingdom.",
    body: [
      "In a significant move to safeguard both natural and cultural heritage, Direct Action for Rights Equity and Development (DARED) led a large-scale tree-planting initiative at the historic Bafut Royal Palace. This vital project was made possible with funding support from the North West Regional Assembly and through a collaborative partnership with the Bafut Council and the UNESCO Heritage Volunteer Program 2025.",
      "The core objective of the activity was to restore the ecological balance of the palace environment by planting a total of 500 palm trees across the grounds. This effort directly addresses the urgent challenge of deforestation, which threatens the region's biodiversity, degrades soil quality, and erodes the traditional landscapes that are integral to the palace's identity.",
      "Beyond its environmental impact, the initiative is deeply rooted in promoting economic and cultural sustainability. The planting of palm trees aims to revitalize the long-standing practice of palm wine tapping, a culturally significant and economically valuable activity for Bafut communities. By investing in these trees, the project supports future livelihoods while preserving an essential part of local tradition and identity.",
      "This powerful collaboration between community institutions, government bodies, and cultural heritage partners marks an important step forward. It demonstrates a shared commitment to protecting the Bafut Kingdom's invaluable assets for generations to come, ensuring that both the natural environment and cherished traditions can continue to thrive.",
    ],
    gallery: [
      "/images/tree-planting-bafut-1.jpg",
      "/images/tree-planting-bafut-palace.jpg",
      "/images/tree-planting-bafut-2.jpg",
      "/images/tree-planting-bafut-3.jpg",
      "/images/tree-planting-bafut-4.jpg",
    ],
    featured: true,
  },
  {
    slug: "heritage-engagement-bamendankwen",
    title: "Cultural Engagement at Bamendankwen Palace",
    category: "Heritage",
    image: "/images/bamendankwen-engagement.jpg",
    excerpt:
      "In partnership with the Regional Delegation of Arts and Culture, DARED led University of Bamenda students through the Bamendankwen Palace and Museum to deepen youth involvement in cultural preservation.",
    body: [
      "In a vibrant effort to connect youth with their roots, Direct Actions for Rights Equity and Development (DARED) organized a cultural heritage engagement activity. This initiative, held in partnership with the Regional Delegation of Arts and Culture and the Bamendankwen Traditional Council, brought together students from the Faculty of Cultural Heritage and International Relations of the University of Bamenda to foster a deeper connection with local heritage.",
      "The day commenced with an inspiring welcome address from the Regional Delegate for Arts and Culture, who emphasized the critical role students must play in preserving Cameroon's rich cultural identity. The Queen Mother of Bamendankwen warmly received the participants, expressing her gratitude for the visit and underscoring the palace's historical significance.",
      "Participants were then treated to an immersive guided tour of the Bamendankwen Palace, led by the Queen Mother and the Palace Secretary. Students explored the architectural layout, cultural symbols, and administrative structures of the fondom, gaining invaluable practical insight that beautifully complemented their academic studies. The tour continued at the Bamendankwen Museum, where historical artifacts brought the community's evolution to life.",
      "A key component of the program was hands-on engagement. Students actively participated in a cleaning exercise at the museum, joining palace custodians in the vital work of maintenance and preservation. Following this, DARED's Director, Tamfu Kilem Bongwa, delivered a powerful talk on volunteerism as a cornerstone of heritage protection, encouraging students to become proactive custodians in their own communities.",
      "The event culminated in a shared meal and a dynamic question-and-answer session with the Fon of Bamendankwen and the Head of the Traditional Council. This open dialogue provided a unique opportunity for students to engage directly with traditional leaders, deepening their understanding of the challenges and opportunities in cultural preservation.",
    ],
    gallery: [
      "/images/bamendankwen-1.jpg",
      "/images/bamendankwen-2.jpg",
      "/images/bamendankwen-3.jpg",
      "/images/bamendankwen-4.jpg",
    ],
    featured: true,
  },
  {
    slug: "visit-bafut-palace",
    title: "A Visit to the Bafut Palace",
    category: "Heritage",
    image: "/images/bafut-palace-visit.jpg",
    excerpt:
      "A meeting with local producers of the Atogho at the Bafut Palace, a UNESCO Tentative List heritage site, to discuss boosting the region's embroidery and creative sector.",
    body: [
      "A visit to the Bafut Palace, one of only two sites within the Northwest Region on UNESCO's Tentative List of World Heritage Sites. A meeting was held with local producers of the Atogho, a significant part of the fashion and design heritage of the region.",
      "In this meeting, chaired by the Fon of Bafut, we talked about ways to boost the embroidery sector through support of local fashion designers, the setting up of SMEs, and creating linkages to leverage investment within the creative and cultural sectors. We also discussed alternative markets for local artisans who have been greatly affected by the ongoing crisis, which has disrupted tourism in Bafut Village.",
    ],
    gallery: [
      "/images/bafut-palace-1.jpg",
      "/images/bafut-palace-2.jpg",
      "/images/bafut-palace-3.jpg",
      "/images/bafut-palace-4.jpg",
      "/images/bafut-palace-5.jpg",
    ],
    featured: true,
  },
  {
    slug: "childrens-holiday-bootcamp",
    title: "Children's Holiday Bootcamp",
    category: "Youth",
    image: "/images/childrens-bootcamp.jpg",
    excerpt:
      "A hands-on bootcamp for 50 children in arts & crafts, painting, computer programming, web development, and music, building creativity, digital skills, and confidence.",
    body: [
      "The Bootcamp sought to foster creativity through Arts & Crafts, Painting, and Drawing; build digital skills through Computer Programming and Web Development; develop musical talent and appreciation through Music Training; and provide a safe platform for teamwork, confidence-building, and innovation.",
      "Participants took part in engaging, hands-on workshops across five main areas: Arts & Crafts (design thinking, creativity, and problem-solving); Painting & Drawing (sketching, coloring, and shading); Computer Programming (basic coding concepts, logical thinking, and digital literacy); Web Development (building simple web pages and content creation); and Music Training (basic music theory, rhythm, and vocal training).",
      "Beyond technical abilities, participants strengthened soft skills such as teamwork and collaboration, public speaking and presentation, and confidence and self-discipline.",
      "The Bootcamp brought together 50 children and teens, who participated enthusiastically and produced impressive results across the various sessions. It concluded with a memorable closing ceremony, bringing together parents, facilitators, and stakeholders, where Certificates of Participation were awarded to all 50 children, alongside exhibitions of artworks, tech projects, and musical presentations.",
    ],
    gallery: [
      "/images/childrens-bootcamp-1.jpg",
      "/images/childrens-bootcamp-2.jpg",
      "/images/childrens-bootcamp-3.jpg",
      "/images/childrens-bootcamp-4.jpg",
      "/images/childrens-bootcamp-5.jpg",
      "/images/childrens-bootcamp-6.jpg",
      "/images/childrens-bootcamp-7.jpg",
      "/images/childrens-bootcamp-8.jpg",
      "/images/childrens-bootcamp-9.jpg",
      "/images/childrens-bootcamp-10.jpg",
      "/images/childrens-bootcamp-11.jpg",
      "/images/childrens-bootcamp-12.jpg",
      "/images/childrens-bootcamp-certificates.jpg",
    ],
    featured: true,
  },
  {
    slug: "film-for-advocacy-workshop",
    title: "Film for Advocacy Workshop",
    category: "Arts",
    image: "/images/film-for-advocacy.jpg",
    excerpt:
      "Young filmmakers from across Cameroon gained skills in advocacy filmmaking at the U.S. Embassy Yaoundé, through the Mandela Washington Fellowship Reciprocal Exchange Program.",
    body: [
      "DARED was proud to be part of the Film for Advocacy workshop held from April 2nd to 12th, 2024. Organized by Noble Arts Entertainment Company (NAEC) in partnership with Israel Scott Family Creatives at the U.S. Embassy in Yaoundé, the event brought together young and aspiring filmmakers from all over Cameroon to gain skills in filmmaking, with a special focus on creating films for advocacy.",
      "This impactful workshop was made possible through the Mandela Washington Fellowship Reciprocal Exchange Program of the United States Department of State, funded by the US Government and administered by IREX. This support underscores the importance of empowering creative voices to drive social change.",
      "Participants were drilled in interactive sessions by seasoned specialists and veterans in the field of filmmaking. The esteemed trainers included Dr. Peter Fada (Producer and Director, Lahira TV, UK), Dr. Victor Okhai (Producer, Director, and consultant, Nigeria), Mr. Israel Scott (Producer, Actor, and Acting Coach, USA), Mr. Mekemndi Randy (Award-winning Filmmaker and Host), and Mme. Rose Mbolle Epie (Veteran Journalist and TV Host).",
      "The event was a fantastic avenue for learning through a hands-on training workshop. It also created a valuable platform for networking amongst young creative filmmakers in Cameroon, as participants were divided into groups and coached to produce short advocacy films on diverse topics that reflect our local communities.",
    ],
    gallery: [
      "/images/film-for-advocacy-1.jpg",
      "/images/film-for-advocacy-2.jpg",
      "/images/film-for-advocacy-3.jpg",
      "/images/film-for-advocacy-4.jpg",
      "/images/film-for-advocacy-5.jpg",
    ],
    featured: true,
  },
  {
    slug: "commemorating-world-heritage-day",
    title: "Commemorating World Heritage Day",
    category: "Heritage",
    image: "/images/world-heritage-day.jpg",
    excerpt:
      "A day of commemorative activities including a CRTV radio engagement and guided tours of heritage sites, the German fort and Menteh Waterfall, with University of Bamenda students.",
    body: [
      "An amazing experience on the first day of community activities for the celebration of the International Day for Monuments and Sites. Commemorative activities began at 9:00 a.m. with a visit to the CRTV radio regional station for the program “Yours and Mine.” On this program, we spoke about the historical significance of World Heritage Day, its history and conception, and the cultural significance of this day within our local context. We highlighted the heritage sites within the Northwest Region of Cameroon and the importance of protecting them.",
      "Next on our program was a visit to a series of heritage sites within the region with students from the University of Bamenda's Faculty of History and Archaeology. We started at the German fort, where we showed students buildings over 112 years old, as well as the graveyard on the fort where German and British soldiers were buried in Cameroon. Next was a visit to Menteh village, which holds one of the most prestigious heritage sites in the region: the Menteh Waterfall.",
      "Upon arrival at the village, we were taken to the house of the sub-chief, also known as “MOOH.” He welcomed the entourage, giving a brief history about the village, its festivals, and historical practices. In a question-and-answer session, students learned about the cultural significance of the Menteh waterfall and practices tied to local values, such as the annual festivals where water is carried from the falls to the Fon of the village for the year. The visit concluded at the site itself, led by the MOOH and some elders of Menteh village.",
    ],
    gallery: [
      "/images/world-heritage-day-1.jpg",
      "/images/world-heritage-day-radio.jpg",
      "/images/world-heritage-day-menteh.jpg",
      "/images/heritage-volunteers.jpg",
    ],
    featured: true,
  },
  {
    slug: "world-heritage-volunteers",
    title: "World Heritage Volunteers",
    category: "Heritage",
    image: "/images/world-heritage-volunteers.jpg",
    excerpt:
      "Partnering with the Regional Delegation of Arts and Culture for the UNESCO World Heritage Volunteer Fund project at the Bafut Royal Palace, using volunteerism as a tool for heritage restoration.",
    body: [
      "With the world becoming a global village, a cultural battle ensues as each culture tries to influence and dominate others. It is therefore our duty to preserve our culture, cultural heritage, and identity for this generation and the next.",
      "It is with great pride that Direct Action for Rights Equity and Development (DARED) is partnering with the Regional Delegation of Arts and Culture North West Region for the implementation of the UNESCO World Heritage Volunteer Fund project under the regional service of cultural heritage. This project, carried out at the Bafut Royal Palace, aims at using volunteerism as a tool for heritage restoration and preservation.",
      "The project, which involves both awareness-raising and hands-on activities, also seeks to create a sense of inclusion and participation for the young volunteers. Through partnerships with key stakeholders, we are working to restore this key heritage, the Bafut Royal Palace, a site on UNESCO's tentative list of world heritage sites. We are also proud that our very own director, Tamfu Kilem, serves as the program coordinator for this project.",
    ],
    gallery: ["/images/world-heritage-volunteers-1.jpg", "/images/heritage-volunteers.jpg", "/images/world-heritage-volunteers-2.jpg", "/images/world-heritage-event.jpg"],
  },
  {
    slug: "youth-empowerment-workshop",
    title: "Youth Empowerment Workshop",
    category: "Youth",
    image: "/images/youth-empowerment.jpg",
    excerpt:
      "Hands-on training in digital literacy, entrepreneurship, financial management, and leadership, bridging the gap between education and employment for young people.",
    body: [
      "Skill development, especially amongst youths, is an integral part of building a more resilient future and one of the most sustainable ways of building local economies.",
      "At DARED, we believe that empowering the next generation with practical, in-demand skills is crucial. This workshop was designed to bridge the gap between education and employment, providing young attendees with hands-on training in areas such as digital literacy, entrepreneurship, financial management, and leadership.",
      "By investing in our youth, we are directly investing in the strength and prosperity of our communities. This event marks another step in our commitment to creating sustainable opportunities and fostering a culture of self-reliance and innovation. We are proud to partner with local leaders and experts to deliver impactful and relevant content.",
    ],
    gallery: ["/images/youth-empowerment-1.jpg", "/images/youth-empowerment-2.jpg", "/images/youth-empowerment-3.jpg", "/images/youth-empowerment-4.jpg"],
  },
  {
    slug: "world-theatre-day",
    title: "World Theatre Day 2024",
    category: "Arts",
    image: "/images/world-theatre-day.jpg",
    excerpt:
      "Bringing together young and aspiring actors to celebrate theatre as a culture of peace, exploring the challenges and opportunities within the theatre arts sector.",
    body: [
      "As part of the activities to celebrate World Theatre Day 2024, Direct Action for Rights Equity and Development (DARED), in partnership with the Regional Delegation of Arts and Culture Northwest and Noble Arts Entertainment, organized an event that brought together youths and aspiring actors from the Region.",
      "The celebration centered on the theme: “The Artist and Cultural Structurisation Movement of Cameroon and Peace Consolidation; the Opportunity and Challenges of the Theatre Arts.” This theme sparked important conversations about the role of the arts in building a peaceful and culturally rich society.",
      "Understanding that theatre is a culture of peace and a mirror to our society, stakeholders and veterans in the field encouraged the young artists not to waiver in their determination. The session also outlined the significant challenges and opportunities that exist within the sector, providing valuable insights for the next generation of performers.",
      "The event concluded with a series of inspiring performances from local theatre troupes in attendance, showcasing the vibrant talent within our community.",
    ],
    gallery: ["/images/world-theatre-day-1.jpg"],
  },
  {
    slug: "ivy-africa-madex-workshop",
    title: "I.V.Y Africa MadEx Workshop (Madagascar)",
    category: "Heritage",
    image: "/images/madex-madagascar.jpg",
    excerpt:
      "DARED joined youth leaders from 15+ countries in Antananarivo to tackle heritage preservation and climate action through volunteering, hosted by the Malagasy National Commission for UNESCO.",
    body: [
      "DARED had the incredible opportunity to participate in the I.V.Y. Africa MadEx workshop in Antananarivo, Madagascar, hosted by the Malagasy National Commission for UNESCO (COMMAT). This transformative event brought together youth leaders and organizations from across Africa and beyond, including delegates from China, Thailand, Germany, and Romania, to tackle heritage preservation and climate action through volunteering.",
      "Key takeaways included exploring the intersection of climate change and heritage conservation, and learning how to design impactful volunteer projects. Participants engaged in participatory action research at the stunning Royal Hill of Ambohimanga, a UNESCO World Heritage site, discussing challenges with local communities and authorities, and gained tools for strategic planning, fundraising, and advocacy to amplify youth-led initiatives.",
      "The workshop was also an unforgettable networking experience, connecting with inspiring changemakers from 15+ African countries and beyond to share experiences and co-create a Road Map for regional and global youth exchanges. The energy and ideas exchanged were truly empowering.",
    ],
    gallery: [
      "/images/madex-madagascar-1.jpg",
      "/images/madex-madagascar-2.jpg",
      "/images/madex-madagascar-3.jpg",
      "/images/madex-madagascar-4.jpg",
    ],
  },
  {
    slug: "master-class-world-heritage-day",
    title: "Master Class to Mark World Heritage Day",
    category: "Heritage",
    image: "/images/master-class.jpg",
    excerpt:
      "A master conference with cultural experts on heritage conservation, protecting heritage in crisis zones, and the effects of climate change, engaging students from the University of Bamenda.",
    body: [
      "A Master Conference to mark the end of activities celebrating World Heritage Day and the International Day for Sites and Monuments. It was an amazing experience drawing from a cream of expert cultural stakeholders on topics such as heritage conservation, protecting heritage in crisis zones, and the effects of climate change on heritage and heritage sites.",
      "Our Director, Tamfu Kilem, spoke on the UNESCO heritage list and sites in Cameroon. The conference engaged stakeholders and students from the University of Bamenda.",
    ],
    gallery: ["/images/library-reading.jpg", "/images/master-class-1.jpg"],
  },
  {
    slug: "advocacy-training-session",
    title: "Advocacy Training Session",
    category: "Advocacy",
    image: "/images/advocacy-training.jpg",
    excerpt:
      "A roundtable conference inspiring students to revive the reading culture, organized with the Regional Delegation of Arts and Culture and partners across Bamenda.",
    body: [
      "The reading culture continues to dwindle due to the rapid advancement of other technologies, with more young people seeing reading as a requirement for passing exams and obsolete thereafter. As Mr Ngam, an English teacher at Progressive Comprehensive College, Bamenda, put it: “the reading culture is dead and we are looking for a befitting burial site for the burial.”",
      "In response, a consortium, Direct Action for Rights Equity and Development, the Regional Delegation of Arts and Culture, and Alliance Franco, organized a roundtable conference aimed at inspiring students to keep up the reading culture. A diverse panel shared key advantages of reading: it is a means of relaxation, builds self-confidence, teaches you about different cultures, builds your language power, and increases your analytical and logical reasoning.",
      "The event was attended by young writers, students, and librarians from within Bamenda. As part of the commemorative activities, our Director Tamfu Kilem, alongside Madam Maurine Munoh (Service Head for Books and Reading at the Regional Delegation of Arts and Culture, North West Region), visited the Bamenda Regional Library to assess its state.",
    ],
    gallery: ["/images/library-reading.jpg"],
  },
  {
    slug: "engaging-local-craftsmen",
    title: "Engaging Local Craftsmen",
    category: "Advocacy",
    image: "/images/engaging-craftsmen.jpg",
    excerpt:
      "Capacity-building roundtables with craftsmen and women in the North West Region to support import substitution, strengthen local economies, and grow the creative sector.",
    body: [
      "Engaging craftsmen and women in the Northwest Region as a tool for capacity building, through roundtable discussions to identify key areas for intervention and support to the creative and cultural sectors.",
      "As a means of supporting import substitution, part of government efforts to build local economies, the initiative engaged SMEs, CIGs, and cooperative societies to partner, network, and collaborate, building lasting partnerships that can help grow the sector, increase ROI, and drive local development.",
    ],
    gallery: ["/images/engaging-craftsmen-1.jpg"],
  },
];

export const featuredEvents = events.filter((e) => e.featured);
