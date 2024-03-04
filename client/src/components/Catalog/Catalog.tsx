import { useEffect, useState } from "react";
import { Grid, Title, Select, Button, Container } from "@mantine/core";
import { ArticleCard } from "../BaseComponents/ArticleCards/ArticleCard";
import { dishes } from "../../ApiService";
import { getToken } from "../../constant";

const Catalog = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [products, setDishesData]: any = useState([]);
  const token = getToken();
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

  useEffect(() => {
    async function getDishes() {
      const response = await dishes();
      console.log({ response });
      setDishesData(response.data);
    }
    getDishes();
  }, [token]);

  const filteredProducts = products.filter(filterProducts);

  return (
    <>
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
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
            {filteredProducts.map((product: any) => (
              <ArticleCard
                key={product.id} // Ensure each card has a unique key
                product={product} // Pass the entire product object as a prop
              />
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Catalog;
