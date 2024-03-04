import { useEffect, useState } from "react";
import { Grid, Title, Select, Button, Container, Badge } from "@mantine/core"; // Added Badge for showing count
import { ArticleCard } from "../BaseComponents/ArticleCards/ArticleCard";
import { dishes, fetchCartData, getUserData } from "../../ApiService";
import { getToken } from "../../constant";

const Catalog = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [products, setDishesData]: any = useState([]);
  const [cart, setCart] = useState([]); // Corrected variable name from setcart to setCart
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

  // useEffect(() => {
  //   async function getDishes() {
  //     const response = await dishes();
  //     const user = await getUserData();
  //     const cartData = await fetchCarthData(user.data.id); // Corrected function name from fetchCarthData to fetchCartData
  //     console.log({ response, cartData });
  //     setDishesData(response.data);
  //     setCart(cartData); // Set the cart data received from the API
  //   }
  //   getDishes();
  // }, [token]);

  useEffect(() => {
    async function fetchData() {
      const response = await dishes();
      const user = await getUserData();
      const cartData = await fetchCartData(user.data.id);
      const updatedDishesData = response.data.map((dish: any) => {
        const cartItem = cartData.items.find(
          (item: any) => item.dishId === dish.id
        );
        if (cartItem) {
          return { ...dish, quantityInCart: cartItem.quantity };
        } else {
          return { ...dish, quantityInCart: 0 };
        }
      });
      console.log({ updatedDishesData });
      setDishesData(updatedDishesData);
      setCart(cartData);
    }

    fetchData();
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
              <ArticleCard key={product.id} product={product}></ArticleCard>
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Catalog;
