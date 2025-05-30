import { saltAndHashPassword } from "../seed/seedAuthActions";
import { Role, } from "@prisma/client";

export const vansData = [
  {
    name: "Explorer XL",
    price: 158,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Netus euismod penatibus praesent cursus erat efficitur pulvinar penatibus? Aliquam condimentum est dictumst turpis sagittis. Sit pharetra sagittis vitae consectetur; cubilia eget pulvinar. Porttitor adipiscing hac sapien sed fringilla habitasse sodales. Sodales lacinia commodo vulputate pulvinar pellentesque dui. Habitant vestibulum sodales penatibus at mollis. Pellentesque praesent congue dis dolor rhoncus.",
    images: [
      "https://images.pexels.com/photos/2832251/pexels-photo-2832251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2533088/pexels-photo-2533088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2533090/pexels-photo-2533090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    type: "Luxury",
    available: true,
    city: "Winnipeg",
    country: "Canada",
    rating: 3.6,
    features: {
      seats: 6,
      sleepingCapacity: 4,
      hasKitchen: true,
      hasToilet: false,
      hasAC: true,
      hasHeating: true,
      petFriendly: false,
    },
    fuelType: "Electric",
    mileage: 95086,
    insuranceIncluded: true,
    userId: "65a0d1e2b3c4f5a6d7e8f9a1",
  },
  {
    name: "Nomad Cruiser",
    price: 131,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Nisi mauris euismod tellus enim nisl urna. Auctor porttitor dui suspendisse tellus nostra pharetra curae dis a. Taciti rhoncus metus nunc elementum diam, hendrerit ultrices habitant. Imperdiet sagittis scelerisque mattis nec netus purus laoreet. Etiam eu diam nunc pellentesque nisl penatibus nec quam arcu. Litora mauris tempus donec senectus elementum dolor leo ante. Feugiat ultricies adipiscing parturient commodo torquent conubia.",
    images: [
      "https://images.pexels.com/photos/5273708/pexels-photo-5273708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    type: "Simple",
    available: false,
    city: "Calgary",
    country: "Canada",
    rating: 4.2,
    features: {
      seats: 6,
      sleepingCapacity: 4,
      hasKitchen: true,
      hasToilet: true,
      hasAC: true,
      hasHeating: true,
      petFriendly: true,
    },
    fuelType: "Gasoline",
    mileage: 113051,
    insuranceIncluded: false,
    userId: "65a0d1e2b3c4f5a6d7e8f9a2",
  },
  {
    name: "Wild Trekker",
    price: 81,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. At massa mi imperdiet lacinia ac? Cursus feugiat massa ut commodo mauris conubia, praesent feugiat? Eleifend aptent libero bibendum lectus dictum. Pretium class mus ut senectus class. Integer pretium malesuada nostra efficitur amet diam ridiculus ultrices habitasse. Dapibus sapien congue sollicitudin nisi; venenatis enim conubia magna. Vitae duis fringilla consectetur ad commodo.",
    images: [
      "https://images.pexels.com/photos/2303781/pexels-photo-2303781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/14799120/pexels-photo-14799120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    type: "Simple",
    available: true,
    city: "Tokyo",
    country: "Japan",
    rating: 4.0,
    features: {
      seats: 4,
      sleepingCapacity: 2,
      hasKitchen: true,
      hasToilet: true,
      hasAC: false,
      hasHeating: true,
      petFriendly: true,
    },
    fuelType: "Electric",
    mileage: 31887,
    insuranceIncluded: true,
    userId: "65a0d1e2b3c4f5a6d7e8f9a3",
  },
  {
    name: "Urban Camper",
    price: 82,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Dictumst primis sed accumsan enim orci primis elit lacus. Vitae nibh dolor congue malesuada condimentum dictum ipsum penatibus. Dictum arcu placerat erat fringilla pharetra faucibus primis accumsan. Sapien netus ullamcorper augue arcu cras imperdiet nulla dictum. Cubilia hac massa diam egestas lacinia praesent. Nibh nullam congue neque commodo ligula turpis consectetur ridiculus. Nostra integer facilisi aptent neque odio diam inceptos. Duis facilisis fames per feugiat velit finibus fermentum. Molestie magnis elit; ultricies laoreet ultricies ante volutpat ad.",
    images: [
      "https://images.unsplash.com/photo-1597131527856-13cdb8dc050e?q=80&w=909&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1583797227225-4233106c5a2a?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1626827521786-1909df055fa8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Simple",
    available: false,
    city: "Ottawa",
    country: "Canada",
    rating: 4.8,
    features: {
      seats: 5,
      sleepingCapacity: 4,
      hasKitchen: false,
      hasToilet: true,
      hasAC: false,
      hasHeating: true,
      petFriendly: true,
    },
    fuelType: "Electric",
    mileage: 97810,
    insuranceIncluded: false,
    userId: "65a0d1e2b3c4f5a6d7e8f9a4",
  },
  {
    name: "Road Master",
    price: 179,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Rutrum magnis laoreet torquent mattis ornare feugiat conubia auctor. Fames nulla vestibulum ligula felis aliquam laoreet orci diam. Dolor conubia neque accumsan placerat; efficitur dictumst in curabitur. Facilisi nascetur dolor tempor turpis duis ridiculus dis auctor. Parturient ante leo nibh pulvinar gravida nulla.",
    images: [
      "https://images.unsplash.com/photo-1601285462028-111ed137177e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1605530967244-1f03ed27f61e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
      "https://images.unsplash.com/photo-1619677394722-6397960e590b?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Rugged",
    available: true,
    city: "Vancouver",
    country: "Canada",
    rating: 3.7,
    features: {
      seats: 5,
      sleepingCapacity: 2,
      hasKitchen: true,
      hasToilet: false,
      hasAC: true,
      hasHeating: true,
      petFriendly: false,
    },
    fuelType: "Gasoline",
    mileage: 128938,
    insuranceIncluded: true,
    userId: "65a0d1e2b3c4f5a6d7e8f9a5",
  },
  {
    name: "Freedom Voyager",
    price: 69,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. In mollis mi a duis nullam. Ridiculus congue aenean taciti in; ornare venenatis condimentum. Enim potenti iaculis viverra lectus; porttitor vel. Facilisi duis enim augue sapien habitasse tincidunt taciti placerat finibus. Mattis etiam ullamcorper vel enim orci. Potenti sollicitudin vestibulum elementum ante erat eget inceptos. Nascetur adipiscing ac augue cubilia, fames himenaeos neque. Consectetur maximus netus maximus dictum auctor blandit class maecenas est. Venenatis phasellus natoque proin taciti eleifend blandit vivamus nulla.",
    images: [
      "https://images.unsplash.com/photo-1613750590555-5ad35bd95a99?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Simple",
    available: true,
    city: "Seattle",
    country: "USA",
    rating: 4.6,
    features: {
      seats: 3,
      sleepingCapacity: 3,
      hasKitchen: false,
      hasToilet: true,
      hasAC: true,
      hasHeating: true,
      petFriendly: true,
    },
    fuelType: "Diesel",
    mileage: 132696,
    insuranceIncluded: false,
    userId: "65a0d1e2b3c4f5a6d7e8f9a6",
  },
  {
    name: "Adventure King",
    price: 64,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Eu amet lacinia cursus himenaeos fermentum sapien sodales natoque lacus. Hendrerit ante bibendum purus condimentum bibendum pretium per. Blandit tellus nibh senectus libero rhoncus est fames ex. Platea nibh risus etiam id, nam diam pulvinar. Sem neque tempor dis ac suscipit blandit porttitor. Imperdiet porta a platea placerat, fusce habitasse felis.",
    images: [
      "https://images.unsplash.com/photo-1515876305430-f06edab8282a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1594495894542-a46cc73e081a?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1613210424090-65392c7aa009?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Simple",
    available: false,
    city: "Seattle",
    country: "USA",
    rating: 4.0,
    features: {
      seats: 4,
      sleepingCapacity: 2,
      hasKitchen: false,
      hasToilet: true,
      hasAC: true,
      hasHeating: false,
      petFriendly: false,
    },
    fuelType: "Diesel",
    mileage: 62604,
    insuranceIncluded: true,
    userId: "65a0d1e2b3c4f5a6d7e8f9a7",
  },
  {
    name: "Eco Nomad",
    price: 179,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Finibus nulla aptent diam eros; ridiculus suscipit. Aptent nam faucibus ullamcorper sodales sit praesent placerat. Ac pulvinar urna quis; vehicula dapibus lectus pharetra. Massa ex tempor elit praesent taciti scelerisque ullamcorper. Porta ultricies curae mi sodales hendrerit; auctor nam. Massa hendrerit nascetur vel himenaeos ante luctus, nibh metus vestibulum. Molestie himenaeos sagittis vitae porttitor per. Nisl dictumst molestie facilisi curabitur penatibus sollicitudin etiam mus himenaeos.",
    images: [
      "https://images.unsplash.com/photo-1533745894801-062ca8abd594?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Simple",
    available: true,
    city: "Edmonton",
    country: "Canada",
    rating: 3.6,
    features: {
      seats: 3,
      sleepingCapacity: 3,
      hasKitchen: true,
      hasToilet: false,
      hasAC: false,
      hasHeating: true,
      petFriendly: true,
    },
    fuelType: "Gasoline",
    mileage: 67184,
    insuranceIncluded: false,
    userId: "65a0d1e2b3c4f5a6d7e8f9a8",
  },
  {
    name: "Luxury Retreat",
    price: 115,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Vestibulum feugiat purus ornare nunc nulla. Facilisi conubia cursus facilisi arcu semper fringilla; consequat accumsan. Velit amet dignissim sit eros ut velit orci montes. Lobortis facilisis vestibulum leo, dignissim sociosqu suscipit laoreet. Metus maecenas non nullam, viverra morbi bibendum. Turpis morbi inceptos sodales blandit, himenaeos felis eu nullam.",
    images: [
      "https://images.unsplash.com/photo-1619389136796-ebf6a39d507c?q=80&w=982&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1572830093421-377d162ca866?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Luxury",
    available: false,
    city: "Tokyo",
    country: "Japan",
    rating: 3.5,
    features: {
      seats: 6,
      sleepingCapacity: 2,
      hasKitchen: true,
      hasToilet: false,
      hasAC: false,
      hasHeating: false,
      petFriendly: true,
    },
    fuelType: "Diesel",
    mileage: 93702,
    insuranceIncluded: true,
    userId: "65a0d1e2b3c4f5a6d7e8f9a9",
  },
  {
    name: "Summit Seeker",
    price: 163,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. At mus neque tincidunt lectus inceptos. Proin facilisis suscipit fusce orci nisi himenaeos efficitur nibh iaculis. Nibh tempor vel molestie lacinia vulputate duis et. Pulvinar rutrum eget dapibus erat enim. Nam feugiat malesuada ornare vulputate dui lacus aliquet libero.",
    images: [
      "https://images.unsplash.com/photo-1598620511155-61f1d104095a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1598620511928-1a6ee1584c1b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1598620511098-86ea26bf29ec?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Simple",
    available: false,
    city: "Paris",
    country: "France",
    rating: 4.8,
    features: {
      seats: 6,
      sleepingCapacity: 2,
      hasKitchen: false,
      hasToilet: false,
      hasAC: true,
      hasHeating: true,
      petFriendly: true,
    },
    fuelType: "Diesel",
    mileage: 145717,
    insuranceIncluded: false,
    userId: "65a0d1e2b3c4f5a6d7e8f9aa",
  },
  {
    name: "Coastal Drifter",
    price: 139,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Tincidunt fames molestie aliquam diam habitant ex diam etiam! Vivamus vivamus taciti viverra himenaeos per amet turpis. Fringilla ultrices eros consequat; efficitur varius curae scelerisque. Inceptos potenti gravida torquent fusce felis congue. Porta ultricies faucibus et fames efficitur elit adipiscing aliquam? Per mattis elementum odio dignissim penatibus. Tristique leo vestibulum nisi ex posuere elementum ultrices.",
    images: [
      "https://images.unsplash.com/photo-1583552188815-a6ac02ab3469?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Luxury",
    available: false,
    city: "Toronto",
    country: "Canada",
    rating: 4.1,
    features: {
      seats: 4,
      sleepingCapacity: 2,
      hasKitchen: false,
      hasToilet: true,
      hasAC: true,
      hasHeating: true,
      petFriendly: false,
    },
    fuelType: "Gasoline",
    mileage: 46068,
    insuranceIncluded: true,
    userId: "65a0d1e2b3c4f5a6d7e8f9ab",
  },
  {
    name: "Wilderness Roamer",
    price: 112,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Magna nunc eleifend aptent erat venenatis scelerisque. Porta aenean taciti neque; aliquam in in elit. Apulvinar per blandit elit vulputate lectus dolor. Lacus lobortis inceptos elementum aliquam leo, ac integer torquent. Fames platea mus ac dolor, taciti magnis quis montes. Nisl viverra ad sociosqu sapien porttitor euismod sem. Porttitor nostra etiam massa risus, class laoreet amet metus suscipit.",
    images: [
      "https://images.unsplash.com/photo-1571528122690-867d9c04f385?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1571528122012-eff3e9a3f49b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Rugged",
    available: true,
    city: "Montreal",
    country: "Canada",
    rating: 4.3,
    features: {
      seats: 5,
      sleepingCapacity: 4,
      hasKitchen: false,
      hasToilet: true,
      hasAC: true,
      hasHeating: true,
      petFriendly: true,
    },
    fuelType: "Diesel",
    mileage: 103139,
    insuranceIncluded: false,
    userId: "65a0d1e2b3c4f5a6d7e8f9ac",
  },
  {
    name: "Globetrotter Van",
    price: 167,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Condimentum inceptos hac dolor torquent penatibus. Natoque nec eros a ac iaculis maximus neque magna. Lectus porttitor nunc nullam semper nostra tempor ad. Risus nunc curae odio urna urna orci habitasse at. Mi himenaeos elementum felis scelerisque; cras magnis potenti penatibus. Phasellus lacinia vel iaculis porta mus. Curabitur rutrum inceptos nascetur sociosqu primis ligula mi. Tellus dis rhoncus tempus; suspendisse nibh efficitur sit elementum.",
    images: [
      "https://images.unsplash.com/photo-1607867086119-b6fe028fa3a1?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Simple",
    available: true,
    city: "Sydney",
    country: "Australia",
    rating: 4.4,
    features: {
      seats: 5,
      sleepingCapacity: 2,
      hasKitchen: false,
      hasToilet: true,
      hasAC: true,
      hasHeating: true,
      petFriendly: false,
    },
    fuelType: "Diesel",
    mileage: 104318,
    insuranceIncluded: true,
    userId: "65a0d1e2b3c4f5a6d7e8f9ad",
  },
  {
    name: "Peak Explorer",
    price: 142,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Arcu cursus nec bibendum vulputate, ultricies cursus habitasse. Augue nullam feugiat quis nisl arcu sodales volutpat eget. Aliquam eros a etiam auctor pellentesque elit per molestie. Convallis nunc himenaeos habitasse habitasse ultrices sem. Dui congue mauris odio; urna parturient ultrices sem. Cras luctus sociosqu senectus quis pretium blandit ridiculus.",
    images: [
      "https://images.unsplash.com/photo-1609859419289-61fdcac37cc5?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1532015804402-87817ed02d2a?q=80&w=897&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Rugged",
    available: false,
    city: "Victoria",
    country: "Canada",
    rating: 4.5,
    features: {
      seats: 4,
      sleepingCapacity: 2,
      hasKitchen: false,
      hasToilet: true,
      hasAC: false,
      hasHeating: true,
      petFriendly: true,
    },
    fuelType: "Diesel",
    mileage: 108619,
    insuranceIncluded: false,
    userId: "65a0d1e2b3c4f5a6d7e8f9ae",
  },
  {
    name: "Skyline Camper",
    price: 104,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Habitant metus nisl felis finibus lacinia rutrum. Massa curae placerat tellus tortor facilisi lacinia. Blandit commodo himenaeos pretium imperdiet non. Orci pretium vulputate suspendisse, quisque taciti proin himenaeos. Ultrices mi dictum porttitor interdum etiam consectetur felis. Scelerisque consectetur tellus eros augue at enim sociosqu ad. Nostra sollicitudin et magna risus mauris semper metus imperdiet. Lacinia tortor suscipit vulputate amet imperdiet.",
    images: [
      "https://images.unsplash.com/photo-1601231091320-5ee5140fcd09?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Simple",
    available: true,
    city: "Paris",
    country: "France",
    rating: 4.2,
    features: {
      seats: 2,
      sleepingCapacity: 2,
      hasKitchen: false,
      hasToilet: true,
      hasAC: true,
      hasHeating: true,
      petFriendly: false,
    },
    fuelType: "Gasoline",
    mileage: 112784,
    insuranceIncluded: false,
    userId: "65a0d1e2b3c4f5a6d7e8f9af",
  },
  {
    name: "Terra Cruiser",
    price: 117,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Ridiculus commodo himenaeos tellus ridiculus lacus nostra conubia. Amet nunc cras nisl litora justo velit dictum nullam. Duis sodales eleifend eros; magna lacinia ut cras. Eu mus libero quisque convallis urna neque. Neque purus dictum eleifend netus taciti. Erat quis habitasse accumsan pharetra convallis erat adipiscing penatibus. Porttitor arcu sit vitae himenaeos maecenas lacus. Magna iaculis posuere arcu tristique interdum lacinia eget porta torquent.",
    images: [
      "https://images.unsplash.com/photo-1578063890843-f4d6e5995d58?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Simple",
    available: false,
    city: "Ottawa",
    country: "Canada",
    rating: 4.1,
    features: {
      seats: 6,
      sleepingCapacity: 4,
      hasKitchen: false,
      hasToilet: true,
      hasAC: true,
      hasHeating: false,
      petFriendly: false,
    },
    fuelType: "Diesel",
    mileage: 36194,
    insuranceIncluded: false,
    userId: "65a0d1e2b3c4f5a6d7e8f9b0",
  },
  {
    name: "Backcountry Wanderer",
    price: 73,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Gravida ullamcorper torquent dolor dis porta. Eu commodo mauris; sodales conubia suscipit pretium lobortis. Lacinia nunc luctus enim eros velit. Mollis dui leo pretium dis quis ac, dictum augue penatibus. Tortor posuere lobortis sodales velit egestas hendrerit nunc elementum. Eu interdum maecenas etiam massa elementum morbi primis a donec.",
    images: [
      "https://images.unsplash.com/photo-1622392804244-b5d100326500?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Luxury",
    available: false,
    city: "Calgary",
    country: "Canada",
    rating: 4.3,
    features: {
      seats: 2,
      sleepingCapacity: 3,
      hasKitchen: true,
      hasToilet: true,
      hasAC: false,
      hasHeating: false,
      petFriendly: true,
    },
    fuelType: "Electric",
    mileage: 149370,
    insuranceIncluded: false,
    userId: "65a0d1e2b3c4f5a6d7e8f9b1",
  },
  {
    name: "Seaside Escape",
    price: 115,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Rutrum libero etiam duis diam dictum eleifend primis orci pellentesque? Sodales malesuada porta efficitur a quis hac quisque hac. Purus donec ut morbi inceptos nascetur hac. Cras fusce donec condimentum odio, cras sed eleifend sapien. Sit efficitur id facilisis vitae nisl placerat. Diam egestas elementum platea sed habitant ex malesuada gravida.",
    images: [
      "https://images.unsplash.com/photo-1546562057-10a39076932a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Luxury",
    available: false,
    city: "Winnipeg",
    country: "Canada",
    rating: 3.9,
    features: {
      seats: 6,
      sleepingCapacity: 4,
      hasKitchen: false,
      hasToilet: true,
      hasAC: false,
      hasHeating: false,
      petFriendly: false,
    },
    fuelType: "Diesel",
    mileage: 146545,
    insuranceIncluded: true,
    userId: "65a0d1e2b3c4f5a6d7e8f9b2",
  },
  {
    name: "Metro Rover",
    price: 84,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Egestas justo felis proin blandit ultrices nam mollis. Potenti ipsum convallis luctus pharetra; felis ipsum? Adipiscing dignissim lacus cras quisque rhoncus maecenas; tristique nunc. Suscipit id lacinia mus vestibulum finibus curabitur. Ante odio sagittis fusce praesent leo montes feugiat ut commodo. Urna urna laoreet praesent volutpat quam dictum ut sed. Velit rutrum accumsan risus, inceptos massa pulvinar. Cursus primis lobortis ex malesuada varius fermentum inceptos lacus.",
    images: [
      "https://images.unsplash.com/photo-1584222407621-1f4bc839d4e8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Luxury",
    available: false,
    city: "Seattle",
    country: "USA",
    rating: 3.6,
    features: {
      seats: 6,
      sleepingCapacity: 3,
      hasKitchen: true,
      hasToilet: true,
      hasAC: true,
      hasHeating: false,
      petFriendly: true,
    },
    fuelType: "Gasoline",
    mileage: 35436,
    insuranceIncluded: true,
    userId: "65a0d1e2b3c4f5a6d7e8f9g19",
  },
  {
    name: "Nomadic Spirit",
    price: 144,
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Ultricies felis imperdiet phasellus vulputate natoque faucibus arcu. Condimentum posuere pharetra nec et suspendisse ridiculus vulputate nunc. Ante dis montes non porta natoque lobortis bibendum. Per fermentum nisi scelerisque curabitur diam. Feugiat nascetur accumsan nam tempor tellus. Fames ultricies proin risus praesent himenaeos class vulputate fringilla. Eros sem justo dapibus orci conubia himenaeos. Dis vestibulum justo vulputate rutrum malesuada tempus duis. Varius donec volutpat eu nostra sed; ultricies magnis.",
    images: [
      "https://images.unsplash.com/photo-1557853970-ff4e552a48b5?q=80&w=981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    type: "Luxury",
    available: true,
    city: "Edmonton",
    country: "Canada",
    rating: 4.1,
    features: {
      seats: 6,
      sleepingCapacity: 4,
      hasKitchen: false,
      hasToilet: false,
      hasAC: false,
      hasHeating: true,
      petFriendly: true,
    },
    fuelType: "Gasoline",
    mileage: 55345,
    insuranceIncluded: true,
    userId: "65a0d1e2b3c4f5a6d7e8f9g19",
  },
];

export const reviewComments = [
  "Great van, had everything we needed for our trip!",
  "Clean, well-maintained, and comfortable. Would rent again.",
  "The company was helpful and the van was perfect for our weekend getaway.",
  "Exactly as described. A bit older than expected but ran well.",
  "The van was spacious and perfect for our family trip.",
  "Had some minor issues but the company was responsive and helpful.",
  "Amazing experience! The van had all the amenities we needed.",
  "Really enjoyed our trip with this van. Highly recommend!",
  "Decent van for the price. Could use some upgrades but overall good.",
  "Very clean and well maintained. The company was a pleasure to work with.",
  "The van exceeded our expectations. Will definitely rent again!",
  "Good value for money. Everything worked as expected.",
  "Had a wonderful experience. The van was perfect for camping.",
  "The photos don't do it justice, even better in person!",
  "A bit cramped for our family of 4, but it did the job.",
];

export const notificationTemplates = {
  Booking: [
    {
      title: "New booking request",
      message: "You have received a new booking request for your van.",
    },
    {
      title: "Booking confirmed",
      message: "Your booking has been confirmed. Get ready for your trip!",
    },
    {
      title: "Booking reminder",
      message:
        "Your upcoming booking starts in 3 days. Prepare for your adventure!",
    },
  ],
  Payment: [
    {
      title: "Payment received",
      message: "We've received your payment for booking #BOOKINGID.",
    },
    {
      title: "Payment confirmation",
      message: "Your payment has been processed successfully.",
    },
    {
      title: "Payment reminder",
      message: "Your payment for booking #BOOKINGID is due soon.",
    },
  ],
  Message: [
    {
      title: "New message",
      message: "You have received a new message from USERNAME.",
    },
    {
      title: "Question about your van",
      message: "A user has a question about your van listing.",
    },
    {
      title: "Message reply",
      message: "USERNAME has replied to your message.",
    },
  ],
  Alert: [
    {
      title: "Account security",
      message: "Your password was recently changed.",
    },
    { title: "Login alert", message: "New login detected from LOCATION." },
    {
      title: "Profile update",
      message: "Your profile information has been updated.",
    },
  ],
  System: [
    {
      title: "Welcome to Van Life",
      message: "Thank you for joining our community!",
    },
    {
      title: "New feature available",
      message: "Check out our new booking features.",
    },
    {
      title: "System maintenance",
      message: "The system will be unavailable for maintenance on DATE.",
    },
  ],
};



async function getHashedPassword() {
  return await saltAndHashPassword("123456");
}

export const userData = async () => {
  const hashedPassword = await getHashedPassword();
  return [
    {
      firstName: "Admin",
      lastName: "User",
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "Admin" as Role,
      phone: "555-123-4567",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },

    {
      firstName: "John",
      lastName: "Doe",
      name: "John Doe",
      email: "john@example.com",
      password: hashedPassword,
      role: "Renter" as Role,
      phone: "555-123-4568",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      firstName: "Michael",
      lastName: "Johnson",
      name: "Michael Johnson",
      email: "michael@example.com",
      password: hashedPassword,
      role: "Renter" as Role,
      phone: "555-345-6789",
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      firstName: "Robert",
      lastName: "Brown",
      name: "Robert Brown",
      email: "robert@example.com",
      password: hashedPassword,
      role: "Renter" as Role,
      phone: "555-567-8901",
      image: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      firstName: "William",
      lastName: "Garcia",
      name: "William Garcia",
      email: "william@example.com",
      password: hashedPassword,
      role: "Renter" as Role,
      phone: "555-789-0123",
      image: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      firstName: "David",
      lastName: "Davis",
      name: "David Davis",
      email: "david@example.com",
      password: hashedPassword,
      role: "Renter" as Role,
      phone: "555-901-2345",
      image: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    // Six renters
    {
      firstName: "Jane",
      lastName: "Smith",
      name: "Jane Smith",
      email: "jane@example.com",
      password: hashedPassword,
      role: "Renter" as Role,
      phone: "555-234-5678",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      firstName: "Emily",
      lastName: "Williams",
      name: "Emily Williams",
      email: "emily@example.com",
      password: hashedPassword,
      role: "Renter" as Role,
      phone: "555-456-7890",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      firstName: "Jessica",
      lastName: "Miller",
      name: "Jessica Miller",
      email: "jessica@example.com",
      password: hashedPassword,
      role: "Renter" as Role,
      phone: "555-890-1234",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      firstName: "Sarah",
      lastName: "Rodriguez",
      name: "Sarah Rodriguez",
      email: "sarah@example.com",
      password: hashedPassword,
      role: "Renter" as Role,
      phone: "555-012-3456",
      image: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      firstName: "Lisa",
      lastName: "Martinez",
      name: "Lisa Martinez",
      email: "lisa@example.com",
      password: hashedPassword,
      role: "Renter" as Role,
      phone: "555-234-5679",
      image: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      firstName: "Patricia",
      lastName: "Taylor",
      name: "Patricia Taylor",
      email: "patricia@example.com",
      password: hashedPassword,
      role: "Renter" as Role,
      phone: "555-456-7891",
      image: "https://randomuser.me/api/portraits/women/6.jpg"
    }
  ];
   
};
// export const userData = [
//       // One admin
//       {
//         firstName: "Admin",
//         lastName: "User",
//         name: "Admin User",
//         email: "admin@example.com",
//         password: hashedPassword,
//         role: "Admin" as Role,
//         phone: "555-123-4567",
//         image: "https://randomuser.me/api/portraits/men/1.jpg"
//       },

//       {
//         firstName: "John",
//         lastName: "Doe",
//         name: "John Doe",
//         email: "john@example.com",
//         password: hashedPassword,
//         role: "Renter" as Role,
//         phone: "555-123-4568",
//         image: "https://randomuser.me/api/portraits/men/2.jpg"
//       },
//       {
//         firstName: "Michael",
//         lastName: "Johnson",
//         name: "Michael Johnson",
//         email: "michael@example.com",
//         password: hashedPassword,
//         role: "Renter" as Role,
//         phone: "555-345-6789",
//         image: "https://randomuser.me/api/portraits/men/3.jpg"
//       },
//       {
//         firstName: "Robert",
//         lastName: "Brown",
//         name: "Robert Brown",
//         email: "robert@example.com",
//         password: hashedPassword,
//         role: "Renter" as Role,
//         phone: "555-567-8901",
//         image: "https://randomuser.me/api/portraits/men/4.jpg"
//       },
//       {
//         firstName: "William",
//         lastName: "Garcia",
//         name: "William Garcia",
//         email: "william@example.com",
//         password: hashedPassword,
//         role: "Renter" as Role,
//         phone: "555-789-0123",
//         image: "https://randomuser.me/api/portraits/men/5.jpg"
//       },
//       {
//         firstName: "David",
//         lastName: "Davis",
//         name: "David Davis",
//         email: "david@example.com",
//         password: hashedPassword,
//         role: "Renter" as Role,
//         phone: "555-901-2345",
//         image: "https://randomuser.me/api/portraits/men/6.jpg"
//       },
//       // Six renters
//       {
//         firstName: "Jane",
//         lastName: "Smith",
//         name: "Jane Smith",
//         email: "jane@example.com",
//         password: hashedPassword,
//         role: "Renter" as Role,
//         phone: "555-234-5678",
//         image: "https://randomuser.me/api/portraits/women/1.jpg"
//       },
//       {
//         firstName: "Emily",
//         lastName: "Williams",
//         name: "Emily Williams",
//         email: "emily@example.com",
//         password: hashedPassword,
//         role: "Renter" as Role,
//         phone: "555-456-7890",
//         image: "https://randomuser.me/api/portraits/women/2.jpg"
//       },
//       {
//         firstName: "Jessica",
//         lastName: "Miller",
//         name: "Jessica Miller",
//         email: "jessica@example.com",
//         password: hashedPassword,
//         role: "Renter" as Role,
//         phone: "555-890-1234",
//         image: "https://randomuser.me/api/portraits/women/3.jpg"
//       },
//       {
//         firstName: "Sarah",
//         lastName: "Rodriguez",
//         name: "Sarah Rodriguez",
//         email: "sarah@example.com",
//         password: hashedPassword,
//         role: "Renter" as Role,
//         phone: "555-012-3456",
//         image: "https://randomuser.me/api/portraits/women/4.jpg"
//       },
//       {
//         firstName: "Lisa",
//         lastName: "Martinez",
//         name: "Lisa Martinez",
//         email: "lisa@example.com",
//         password: hashedPassword,
//         role: "Renter" as Role,
//         phone: "555-234-5679",
//         image: "https://randomuser.me/api/portraits/women/5.jpg"
//       },
//       {
//         firstName: "Patricia",
//         lastName: "Taylor",
//         name: "Patricia Taylor",
//         email: "patricia@example.com",
//         password: hashedPassword,
//         role: "Renter" as Role,
//         phone: "555-456-7891",
//         image: "https://randomuser.me/api/portraits/women/6.jpg"
//       }
//     ];