import React, { useState } from "react";
import { Grid, Title, Select, Button, Group } from "@mantine/core";
import { ArticleCard } from "../BaseComponents/ArticleCards/ArticleCard";

const Catalog = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");

  const handleTypeChange = (value: any) => {
    setSelectedType(value);
  };

  const handleSubCategoryChange = (value: any) => {
    setSelectedSubCategory(value);
  };

  const filterProducts = (product: any) => {
    if (selectedType === "All" && selectedSubCategory === "All") {
      return true;
    }
    if (
      (selectedType === "All" || product.type === selectedType) &&
      (selectedSubCategory === "All" ||
        product.subCategory === selectedSubCategory)
    ) {
      return true;
    }
    return false;
  };

  // Assuming you have an array of product data stored in a variable named 'products'
  const products = [
    {
      _id: {
        $oid: "65e4816fd65f6e96b65bc202",
      },
      name: "Spaghetti Carbonara",
      price: 14,
      cuisine: "Italian",
      type: "Non-Veg",
      subCategory: "Main Course",
      description:
        "Classic pizza with tomato sauce, mozzarella cheese, and basil.",
      image:
        "https://images.pexels.com/photos/22420/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      createdAt: {
        $date: "2024-03-03T13:55:58.930Z",
      },
      updatedAt: {
        $date: "2024-03-03T13:55:58.930Z",
      },
    },
    {
      _id: {
        $oid: "65e49faa01df68bd2e5d8deb",
      },
      name: "Chicken",
      price: 14,
      cuisine: "Italian",
      type: "Non-Veg",
      subCategory: "Main Course",
      description:
        "Classic pizza with tomato sauce, mozzarella cheese, and basil.",
      image:
        "https://images.pexels.com/photos/7783361/pexels-photo-7783361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      createdAt: {
        $date: "2024-03-03T16:04:57.053Z",
      },
      updatedAt: {
        $date: "2024-03-03T16:04:57.053Z",
      },
    },
  ];

  const filteredProducts = products.filter(filterProducts);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            margin: 10,
          }}
        >
          <Select
            style={{ marginRight: 10 }}
            data={[
              { value: "All", label: "All" },
              { value: "Veg", label: "Veg" },
              { value: "Non-Veg", label: "Non-Veg" },
            ]}
            label="Type"
            value={selectedType}
            onChange={handleTypeChange}
          />
          <Select
            style={{ marginRight: 10 }}
            data={[
              { value: "All", label: "All" },
              { value: "Starter", label: "Starter" },
              { value: "Main Course", label: "Main Course" },
              { value: "Dessert", label: "Dessert" },
            ]}
            label="Subcategory"
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
          />
          <Button
            style={{ width: 200 }}
            onClick={() => {
              setSelectedType("All");
              setSelectedSubCategory("All");
            }}
          >
            Clear Filters
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Title>DISHES</Title>
        </div>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Grid>
            {filteredProducts.map((product) => (
              <ArticleCard
                key={product._id.$oid} // Ensure each card has a unique key
                product={product} // Pass the entire product object as a prop
              />
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Catalog;
