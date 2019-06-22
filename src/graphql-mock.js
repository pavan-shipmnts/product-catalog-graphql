export const typeDefs = `
  type Query {
    products: [Product]!
    category(category_id: ID): Category!
  }

  type Mutation {
    addReview(review: AddReview): Review!
  }

  input AddReview {
    reviewText: String
    ratings: Float!
    productID: ID
  }

  type Product {
    id:  ID!
    price: Float!
    name: String!
    categories: [Category!]!
    color:  Color
    images:  [Image]
    reviews: [Review]
    inStock: Boolean!
  } 
  
  type Review {
    id:  ID!
    reviewText: String
    ratings: Float!
    user: User! 
    postedAt: Int! #epoc
    #product: Product!
  } 

  type User {
    id:  ID!
    name: String!
    email:  String! #Email type
    avatar: String!
  } 

  enum Color {
    RED
    BLUE
    WHITE
    GREY
  } 
  
  type Category {
    id:  ID!
    name: String!
    desc: String!
    products: [Product]!
   } 
  
   type Image {
    id:  ID!
    name: String!
    altText: String!
    mobileURL: String!
    fullURL:  String!
   } 
   
`;

const data = {
  Color: {
    RED: "red",
    BLUE: "blue",
    WHITE: "white",
    GREY: "grey"
  },
  products: [
    {
      id: 1,
      price: 10000.0,
      color: "BLUE",
      inStock: true,
      categories: [1],
      name: "LED TV"
    },
    {
      id: 2,
      price: 250.0,
      color: "WHITE",
      inStock: true,
      categories: [1],
      name: "HeadPhones"
    },
    {
      id: 3,
      price: 1850.0,
      color: "GREY",
      inStock: false,
      categories: [1],
      name: "Bluetooth Speakers"
    },
    {
      id: 4,
      price: 1450,
      color: "BLUE",
      inStock: true,
      categories: [2],
      name: "Denim Jeans"
    },
    {
      id: 5,
      price: 800,
      color: "WHITE",
      inStock: true,
      categories: [2],
      name: "Casual Shirt"
    }
  ],
  categories: [
    {
      id: 1,
      name: "Electronics",
      desc: ""
    },
    {
      id: 2,
      name: "Apparels",
      desc: ""
    }
  ],
  reviews: [],
  users: [
    {
      id: 1,
      name: "Anon",
      email: "anon@dispostable.com",
      avatar: ""
    }
  ]
};
export const resolvers = {
  Query: {
    products: (parent, args) => {
      return data.products.map(p => {
        const categories = p.categories.map(cid => {
          return data.categories.find(dc => {
            return dc.id === cid;
          });
        });
        return { ...p, categories };
      });
    },
    category: (parent, { category_id }) => {
      category_id = +category_id;
      console.log({ category_id });
      const categoryObj = data.categories.find(dc => {
        return dc.id === category_id;
      });
      categoryObj.products = data.products
        .filter(dp => {
          console.log(dp.categories);
          console.log(category_id);
          return dp.categories.indexOf(category_id) !== -1;
        })
        .map(dp => {
          const { categories, ...rest } = dp;
          return rest;
        });
      return categoryObj;
    }
  }
};
