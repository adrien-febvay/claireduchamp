const projects = {
  villaGrandvaux2023: {
    pathname: '/villa-grandvaux-2023',
    title: 'Jeu de séquences',
    caption: 'Villa Grandvaux',
    description: "Transformation d'une villa existante avec annexe",
    year: '2023',
    surface: '404m²',
    info: null,
    pictures: {
      basename: 'villa-grandvaux-2023',
      copyrights: { 0: '©JulieMasson' },
      count: 30,
    },
  },
  chardonneApartment2024: {
    pathname: '/appartement-chardonne-2024',
    title: 'Le nid',
    caption: 'Appt. Chardonne',
    description: "Transformation d'un appartement",
    year: '2024',
    surface: '85m²',
    info: null,
    pictures: {
      basename: 'appartement-chardonne-2024',
      copyrights: { 0: '©JulieMasson' },
      count: 42,
    },
  },
  alpineLamp: {
    pathname: '/lampe-alpine',
    title: 'Lampe alpine',
    caption: 'Design de luminaire',
    description: 'Bronze et verre soufflé',
    year: null,
    surface: null,
    info: 'En collaboration avec Ludivine Loursel, artiste - artisane, souffleuse de verre et bronzière',
    pictures: {
      basename: 'lampe-alpine',
      copyrights: {
        0: '©JulieMasson',
        4: '©ClaireDuchamp',
        9: '©ClaireDuchamp',
        10: '©ClaireDuchamp',
        15: '©ClaireDuchamp',
      },
      count: 15,
    },
  },
  villaChexbres2024: {
    pathname: null,
    title: null,
    caption: 'Villa Chexbres',
    description: null,
    year: null,
    surface: null,
    info: null,
    pictures: {
      basename: 'villa-chexbres-2024',
      copyrights: { 0: '©ClaireDuchamp' },
    },
  },
  contactUs: {
    pathname: null,
    title: 'Votre projet',
    caption: 'Ecrivez-nous',
    description: null,
    year: null,
    surface: null,
    info: null,
    pictures: {
      basename: 'nous-contacter',
      copyrights: { 0: null },
    },
  },
} as const;

export default projects;
