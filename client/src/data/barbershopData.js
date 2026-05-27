export const products = [
  {
    id: 1,
    name: "Matte Pomade",
    category: "Styling",
    price: 18,
    originalPrice: 24,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd0546?q=80&w=1288",
    description: "Strong hold, natural finish. Water-based, washes out easy."
  },
  {
    id: 2,
    name: "Beard Oil - Cedar",
    category: "Grooming",
    price: 15,
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=1470",
    description: "Softens beard, prevents itch. Cedar + jojoba blend."
  },
  {
    id: 3,
    name: "Charcoal Shampoo",
    category: "Hair Care",
    price: 22,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1287",
    description: "Deep cleanse for scalp buildup. Tea tree & mint."
  },
  {
    id: 4,
    name: "Edge Control",
    category: "Styling",
    price: 12,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1335",
    description: "24hr hold, no flakes. For edges & baby hairs."
  }
];

export const services = [
    {
      id: 1,
      name: "Classic Fade",
      category: "Haircuts",
      price: 25,
      duration: 45,
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1470",
      description: "Precision fade with razor line-up. Includes wash & style.",
      barbers: [1, 2, 3]
    },
    {
      id: 2,
      name: "Beard Sculpting",
      category: "Grooming",
      price: 18,
      duration: 30,
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1470",
      description: "Shape, trim & oil treatment. Hot towel finish.",
      barbers: [1, 3]
    },
    {
      id: 3,
      name: "Braids & Twists",
      category: "Styling",
      price: 60,
      duration: 120,
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1470",
      description: "Box braids, cornrows, or two-strand twists. Wash included.",
      barbers: [2, 4]
    },
    {
      id: 4,
      name: "Kids Cut",
      category: "Haircuts",
      price: 20,
      duration: 30,
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1470",
      description: "Patient, fun cuts for ages 12 & under. Lollipop included.",
      barbers: [1, 2, 3]
    },
    {
      id: 5,
      name: "Hair Color",
      category: "Color",
      price: 80,
      duration: 90,
      image: "https://images.unsplash.com/photo-1560869713-7d0b294308d4?q=80&w=1470",
      description: "Full color, highlights, or grey blending. Consultation first.",
      barbers: [4]
    },
    {
      id: 6,
      name: "Facial & Blackhead Removal",
      category: "Skincare",
      price: 35,
      duration: 40,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1470",
      description: "Deep cleanse, steam, extraction & moisturize.",
      barbers: [3, 4]
    }
  ];
  
  export const barbers = [
    {
      id: 1,
      name: "Marcus 'The Blade' Johnson",
      role: "Master Barber",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374",
      rating: 4.9,
      reviews: 312,
      specialties: ["Fades", "Line-ups", "Kids Cuts"],
      bio: "15 years cutting. If you want it crispy, book Marcus.",
      instagram: "@marcusfades"
    },
    {
      id: 2,
      name: "Aisha Kente",
      role: "Braids Specialist",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1374",
      rating: 5.0,
      reviews: 198,
      specialties: ["Braids", "Twists", "Natural Hair"],
      bio: "Protective styles that last. Book 2 weeks ahead.",
      instagram: "@aishabraids"
    },
    {
      id: 3,
      name: "Dre Williams",
      role: "Grooming Artist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374",
      rating: 4.8,
      reviews: 245,
      specialties: ["Beards", "Facials", "Hot Towel Shaves"],
      bio: "Your beard will thank you. Skincare certified.",
      instagram: "@dregrooms"
    },
    {
      id: 4,
      name: "Sasha Cole",
      role: "Color & Style Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470",
      rating: 4.9,
      reviews: 167,
      specialties: ["Color", "Braids", "Treatments"],
      bio: "Transformations are my thing. Consultation required for color.",
      instagram: "@sashacolors"
    }
  ];
  
  export const gallery = [
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1474",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1469",
    "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?q=80&w=1470",
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1474",
    "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1374",
    "https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=1469"
  ];
  
  export const timeSlots = [
    "09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM", "12:00 PM",
    "12:45 PM", "02:00 PM", "02:45 PM", "03:30 PM", "04:15 PM",
    "05:00 PM", "05:45 PM", "06:30 PM"
  ];