export type Article = {
  slug: string;
  title: string;
  kicker: string;
  intro: string;
  image: string;
  minutes: number;
  products: string[];
  ingredients?: string[];
  steps?: string[];
  sections: { title: string; body: string }[];
  sources?: { label: string; url: string }[];
};
export const articles: Article[] = [
  {
    slug: "amlou-maison",
    title: "Amlou maison, le goût du partage",
    kicker: "À cuisiner",
    intro:
      "Des amandes, une huile d’argan alimentaire et du miel : une recette à ajuster à votre goût, pour une table toute simple.",
    image: "atelier",
    minutes: 5,
    products: ["amlou-agadir", "argan-culinaire-agadir", "miel-1"],
    ingredients: [
      "200 g d’amandes",
      "3 à 5 cuillères à soupe d’huile d’argan alimentaire",
      "1 à 2 cuillères à soupe de miel",
    ],
    steps: [
      "Faire légèrement dorer les amandes au four à 160 °C, en les surveillant. Les laisser refroidir complètement.",
      "Mixer les amandes par petites séquences, jusqu’à obtenir une pâte. Faire des pauses pour ménager le moteur.",
      "Ajouter progressivement l’huile d’argan alimentaire, puis le miel. Ajuster la texture avec une petite quantité d’huile.",
      "Servir sur du pain. Transférer le reste dans un récipient propre et fermé, au réfrigérateur, et préparer de petites quantités.",
    ],
    sections: [
      {
        title: "Une recette, plusieurs textures",
        body: "Plus ou moins lisse, plus ou moins sucré : l’amlou maison laisse de la place aux préférences de chacun. Les quantités ci-dessus sont une proposition de cuisine, pas la composition d’un produit de la boutique.",
      },
      {
        title: "Avant de partager",
        body: "Cette recette contient des amandes. Signalez-les aux personnes avec qui vous partagez le plat et vérifiez les autres ingrédients en cas d’allergie. Utilisez uniquement une huile identifiée comme alimentaire ; une huile cosmétique ne convient pas.",
      },
    ],
  },
  {
    slug: "salade-pois-chiches",
    title: "Salade de pois chiches, fraîche et généreuse",
    kicker: "À cuisiner",
    intro:
      "Une salade de placard qui devient un vrai repas de table, avec du citron, des herbes et un filet d’huile d’olive.",
    image: "verger",
    minutes: 4,
    products: ["olive-beni-mellal"],
    ingredients: [
      "400 g de pois chiches cuits et égouttés",
      "1 concombre et 2 tomates",
      "Le jus d’un demi-citron",
      "2 cuillères à soupe d’huile d’olive",
      "Persil, poivre et sel selon votre goût",
    ],
    steps: [
      "Rincer et égoutter les pois chiches. Laver les légumes et les herbes.",
      "Couper le concombre et les tomates en petits morceaux. Ciseler le persil.",
      "Mélanger le citron et l’huile d’olive. Ajouter les légumes et les pois chiches, puis assaisonner.",
      "Servir aussitôt ou garder au réfrigérateur jusqu’au repas.",
    ],
    sections: [
      {
        title: "Adapter au fil du marché",
        body: "Quelques radis, un oignon doux ou des olives peuvent rejoindre le saladier. Ajoutez-les selon la saison et ce que vous avez sous la main. Goûtez avant de saler si vous utilisez des olives.",
      },
      {
        title: "Une finition à table",
        body: "Versez un dernier filet d’huile au moment de servir si vous le souhaitez. Cette recette n’impose ni origine ni certification particulière : choisissez une huile alimentaire dont vous appréciez le goût.",
      },
    ],
  },
  {
    slug: "poires-au-miel",
    title: "Poires au miel, un dessert tout doux",
    kicker: "À cuisiner",
    intro:
      "Quelques poires, un peu de miel et un passage au four : un dessert simple, à servir tiède.",
    image: "rituel",
    minutes: 4,
    products: ["miel-1", "miel-4"],
    ingredients: [
      "4 poires mûres mais fermes",
      "2 cuillères à soupe de miel",
      "2 cuillères à soupe d’eau",
      "Cannelle, facultative",
    ],
    steps: [
      "Préchauffer le four à 180 °C. Laver les poires, les couper en deux et retirer le cœur.",
      "Déposer les fruits dans un plat. Ajouter l’eau, répartir le miel et saupoudrer de cannelle si souhaité.",
      "Cuire environ 20 à 30 minutes, jusqu’à ce que les poires soient tendres. La durée dépend de leur maturité.",
      "Laisser tiédir puis servir avec le jus de cuisson.",
    ],
    sections: [
      {
        title: "Choisir son miel",
        body: "Un miel doux laisse davantage de place au goût du fruit. Un miel plus marqué change l’équilibre du dessert. Commencez avec une petite quantité et ajustez selon vos préférences.",
      },
      {
        title: "À préparer au dernier moment",
        body: "La recette est prévue pour quatre portions. Elle peut être divisée facilement. Les variétés citées dans la boutique restent provisoires : leurs profils de goût ne sont pas garantis ici.",
      },
    ],
  },
  {
    slug: "argan-culinaire-mode-emploi",
    title: "L’argan culinaire, de la bouteille à l’assiette",
    kicker: "Le guide",
    intro:
      "Commencer par lire l’étiquette, puis trouver une place pour l’huile d’argan alimentaire dans les gestes de tous les jours.",
    image: "recolte",
    minutes: 5,
    products: ["argan-culinaire-agadir", "argan-culinaire-essaouira"],
    sections: [
      {
        title: "Alimentaire ou cosmétique ?",
        body: "Le nom « argan » ne suffit pas à décider de l’usage d’un produit. Pour une recette, choisissez une bouteille explicitement destinée à l’alimentation. N’utilisez pas une huile cosmétique en cuisine, même si elle porte le même nom.",
      },
      {
        title: "Commencer en finition",
        body: "Essayez une petite quantité sur une salade, du pain ou des légumes déjà cuits. Goûtez avant d’en ajouter. C’est une proposition culinaire, et non une promesse sur les propriétés d’une huile donnée.",
      },
      {
        title: "Et pour la cuisson ?",
        body: "Les caractéristiques et les recommandations varient selon le produit. Suivez l’étiquette et demandez au fournisseur si son huile convient à la cuisson envisagée. Aucun point de fumée ou résistance thermique n’est garanti par ce guide.",
      },
      {
        title: "Conserver avec attention",
        body: "Refermez la bouteille après usage et respectez les conditions de conservation et la date indiquées par le fabricant. Avant de commercialiser les références Organik, ces informations devront être confirmées et ajoutées aux fiches.",
      },
    ],
  },
  {
    slug: "bienfaits-usages-quotidiens",
    title: "À table au quotidien : le goût avant les promesses",
    kicker: "Au quotidien",
    intro:
      "Miel, huile d’olive, argan et amlou peuvent inspirer des recettes. Leur place dans l’alimentation demande surtout des informations fiables et une approche mesurée.",
    image: "atelier",
    minutes: 5,
    products: ["miel-1", "olive-agadir", "amlou-essaouira"],
    sections: [
      {
        title: "Parler des bienfaits avec prudence",
        body: "Cette reconstruction ne dispose pas d’analyses nutritionnelles ni de compositions confirmées pour les produits. Elle ne leur attribue donc pas de bénéfices de santé particuliers. Aucun de ces produits n’est présenté comme un traitement.",
      },
      {
        title: "Des idées pour varier les usages",
        body: "Une petite touche de miel dans une vinaigrette, de l’huile d’olive sur des légumes ou une tartine d’amlou : ces idées concernent le goût et la cuisine. Adaptez les quantités à votre recette et à vos besoins.",
      },
      {
        title: "Lire avant de choisir",
        body: "Vérifiez la liste des ingrédients, les informations nutritionnelles et les allergènes du produit réellement acheté. Une recette d’amlou peut contenir des fruits à coque ; seule l’étiquette du fabricant permettra de connaître sa composition exacte.",
      },
      {
        title: "Pour aller plus loin",
        body: "Les conseils généraux de santé doivent venir de sources compétentes et rester distincts des messages commerciaux. La fiche « Alimentation saine » de l’OMS est une piste documentaire à consulter. Son texte n’a pas pu être vérifié depuis cet environnement ; aucune allégation chiffrée n’en est reproduite.",
      },
    ],
    sources: [
      {
        label: "OMS — Alimentation saine (référence à consulter)",
        url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
      },
    ],
  },
  {
    slug: "argan-cosmetique-rituel",
    title: "Argan cosmétique : un rituel, avec précaution",
    kicker: "Le soin",
    intro:
      "Une huile de soin se choisit avec les indications du fabricant, sans la confondre avec une huile destinée à la cuisine.",
    image: "rituel",
    minutes: 4,
    products: ["argan-cosmétique-agadir", "argan-cosmétique-essaouira"],
    sections: [
      {
        title: "Un usage distinct",
        body: "Les références cosmétiques de la boutique sont réservées au soin. Ne les ingérez pas. Les formulations, les consignes et les usages autorisés devront être confirmés par le fournisseur avant la vente.",
      },
      {
        title: "Suivre le produit, pas une promesse",
        body: "Respectez la notice, les précautions et les zones d’application indiquées. Cette page ne promet pas d’effet contre l’acné, l’eczéma ou une autre affection et ne remplace pas un avis médical.",
      },
      {
        title: "En cas de réaction",
        body: "Si le produit provoque une gêne ou une réaction, interrompez son utilisation et demandez conseil à un professionnel de santé. Pour une peau sensible ou une affection déjà connue, demandez un avis adapté avant d’ajouter un nouveau produit.",
      },
      {
        title: "Ce qu’il reste à documenter",
        body: "Composition, conservation et recommandations précises manquent encore. Une source générale de dermatologie est proposée ci-dessous pour approfondir, mais elle n’a pas pu être consultée dans cet environnement. Aucune efficacité spécifique de l’argan n’est affirmée.",
      },
    ],
    sources: [
      {
        label:
          "American Academy of Dermatology — soins hydratants (référence à consulter)",
        url: "https://www.aad.org/public/everyday-care/skin-care-basics/dry/moisturizers",
      },
    ],
  },
];
