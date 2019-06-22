import React from "react";
import "./App.css";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export const GET_PRODUCTS = gql`
  query products {
    products {
      id
      price
      color
      categories {
        id
        name
      }
      name
    }
  }
`;

export const GET_CATEGORY = gql`
  query category($category_id: ID) {
    category(category_id: $category_id) {
      id
      name
      products {
        id
        price
        color
        name
      }
    }
  }
`;

function App() {
  return (
    <div className="App">
      <h2>GET All products</h2>
      <Query query={GET_PRODUCTS}>
        {({ data, loading, error }) => {
          if (loading) {
            return "Loading...";
          } else if (error) {
            return `error: ${JSON.stringify(error, null, 2)}`;
          }
          return <Products products={data.products} />;
        }}
      </Query>
      <hr />
      <h2>Products by Category</h2>
      <Query query={GET_CATEGORY} variables={{ category_id: 1 }}>
        {({ data, loading, error }) => {
          if (loading) {
            return "Loading...";
          } else if (error) {
            return `error: ${JSON.stringify(error, null, 2)}`;
          }
          //return <div>{JSON.stringify(data, null, 4)}</div>;

          return (
            <div>
              <h3>{data.category.name}</h3>
              <Products products={data.category.products} />
            </div>
          );
        }}
      </Query>
    </div>
  );
}

const Products = ({ products }) => (
  <ul style={{ listStyle: "none" }}>
    {products.map(product => (
      <li style={{ padding: "10px" }} key={product.id}>
        <span>{product.name}</span>
        <span> {product.price}</span>
        <span style={{ color: product.color }}> {product.color}</span>
      </li>
    ))}
  </ul>
);
export default App;
