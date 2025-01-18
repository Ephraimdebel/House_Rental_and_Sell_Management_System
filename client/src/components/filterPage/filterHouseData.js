import im1 from "../../assets/ListingImages/ListingForSaleImg/Forsale1.jpg"
import im2 from "../../assets/ListingImages/ListingForSaleImg/Forsale2.jpg";
import im3 from "../../assets/ListingImages/ListingForSaleImg/Forsale3.jpg";
import im4 from "../../assets/ListingImages/ListingForSaleImg/Forsale4.jpg";
import im5 from "../../assets/ListingImages/ListingForSaleImg/Forsale5.jpg";
import im6 from "../../assets/ListingImages/ListingForSaleImg/Forsale6.jpg";
import im7 from "../../assets/ListingImages/ListingForSaleImg/Forsale7.jpg";
import im8 from "../../assets/ListingImages/ListingForSaleImg/Forsale8.jpg";
import im9 from "../../assets/ListingImages/ListingForSaleImg/Forsale9.jpg";
import im10 from "../../assets/ListingImages/ListingForSaleImg/Forsale10.jpg";


const filterHouseData = [
  {
    id: 1,
    title: "Duplex for Sale in Whitby",
    location: "Los Angeles, Monterey Park, CA, United States, 5",
    price: 120000,
    description:
      "The interior of the house is focused around a large central hallway serving as the main avenue of traffic and entrance area to the adjacent rooms.",
    specs: [
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon1.png",
        label: "230 m²",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon2.png",
        label: "7 Bedrooms",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon3.png",
        label: "3 Bathrooms",
      },
    ],
    image: im1,
  },
  {
    id: 2,
    title: "Modern House in Toronto",
    location: "Toronto, Ontario, Canada",
    price: 250000,
    description:
      "This modern house offers an open-concept living area with floor-to-ceiling windows and a breathtaking view of the city skyline.",
    specs: [
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon1.png",
        label: "300 m²",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon2.png",
        label: "5 Bedrooms",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon3.png",
        label: "4 Bathrooms",
      },
    ],
    image: im2,
  },
  {
    id: 3,
    title: "Luxury Villa in Beverly Hills",
    location: "Beverly Hills, California, USA",
    price: 850000,
    description:
      "A stunning luxury villa located in the heart of Beverly Hills, featuring a private pool, home theater, and breathtaking views.",
    specs: [
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon1.png",
        label: "450 m²",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon2.png",
        label: "6 Bedrooms",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon3.png",
        label: "5 Bathrooms",
      },
    ],
    image: im3,
  },
  {
    id: 4,
    title: "Cozy Bungalow in Houston",
    location: "Houston, Texas, USA",
    price: 95000,
    description:
      "A charming bungalow in a quiet neighborhood, featuring a large backyard, hardwood floors, and a cozy fireplace.",
    specs: [
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon1.png",
        label: "120 m²",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon2.png",
        label: "3 Bedrooms",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon3.png",
        label: "2 Bathrooms",
      },
    ],
    image: im4,
  },
  {
    id: 5,
    title: "Beachfront Condo in Miami",
    location: "Miami, Florida, USA",
    price: 300000,
    description:
      "A beautiful beachfront condo with modern amenities, ocean views, and direct access to the beach.",
    specs: [
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon1.png",
        label: "100 m²",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon2.png",
        label: "2 Bedrooms",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon3.png",
        label: "2 Bathrooms",
      },
    ],
    image: im10,
  },
  {
    id: 6,
    title: "Family Home in Chicago",
    location: "Chicago, Illinois, USA",
    price: 180000,
    description:
      "A spacious family home located in a friendly neighborhood, featuring a two-car garage and a large backyard.",
    specs: [
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon1.png",
        label: "200 m²",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon2.png",
        label: "4 Bedrooms",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon3.png",
        label: "3 Bathrooms",
      },
    ],
    image: im5,
  },
  {
    id: 7,
    title: "Penthouse in New York",
    location: "New York City, New York, USA",
    price: 1200000,
    description:
      "A luxurious penthouse with a private rooftop, panoramic city views, and high-end finishes throughout.",
    specs: [
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon1.png",
        label: "500 m²",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon2.png",
        label: "5 Bedrooms",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon3.png",
        label: "6 Bathrooms",
      },
    ],
    image: im6,
  },
  {
    id: 8,
    title: "Rustic Cabin in Colorado",
    location: "Aspen, Colorado, USA",
    price: 220000,
    description:
      "A charming rustic cabin located in the mountains, perfect for a peaceful getaway with beautiful surroundings.",
    specs: [
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon1.png",
        label: "150 m²",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon2.png",
        label: "3 Bedrooms",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon3.png",
        label: "2 Bathrooms",
      },
    ],
    image: im7,
  },
  {
    id: 9,
    title: "Urban Apartment in Seattle",
    location: "Seattle, Washington, USA",
    price: 160000,
    description:
      "A sleek urban apartment in downtown Seattle, offering modern interiors and access to the city's best attractions.",
    specs: [
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon1.png",
        label: "90 m²",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon2.png",
        label: "2 Bedrooms",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon3.png",
        label: "1 Bathroom",
      },
    ],
    image: im8,
  },
  {
    id: 10,
    title: "Farmhouse in Vermont",
    location: "Burlington, Vermont, USA",
    price: 400000,
    description:
      "A cozy farmhouse with expansive land, a large barn, and a serene country setting.",
    specs: [
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon1.png",
        label: "350 m²",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon2.png",
        label: "4 Bedrooms",
      },
      {
        icon: "https://urbanpoint.modeltheme.com/wp-content/themes/urbanpointwp/images/theme_urbanpoint_icon3.png",
        label: "3 Bathrooms",
      },
    ],
    image: im9,
  },
];

export default filterHouseData;
