import { Button, Container, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import IconButton from "./IconButton";
import JSConfetti from "js-confetti";
import Fuse from "fuse.js";

const App = () => {
  const shops = [
    { id: 1, name: "bajaj" },
    { id: 2, name: "motopit" },
    { id: 3, name: "kalyoncu" }
  ];

  const categories = [
    { id: 1, name: "motor" },
    { id: 2, name: "sensör" },
    { id: 3, name: "aksesuar" }
  ];

  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [shopsSelect, setShopsSelect] = useState("");
  const [categoriesSelect, setCategoriesSelect] = useState("");

  const [filteredStatus, setFilteredStatus] = useState("reset");
  const [filteredShopId, setFilteredShopId] = useState("");
  const [filteredCategoryId, setFilteredCategoryId] = useState("");
  const [filteredName, setFilteredName] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    const newProduct = {
      id: nanoid(),
      name: inputValue,
      shops: parseInt(shopsSelect),
      categories: parseInt(categoriesSelect),
      isBought: false,
    };

    setProducts([...products, newProduct]);

    setInputValue("");
    setCategoriesSelect("");
    setShopsSelect("");
  };

  const clickBuy = (productId) => {
    const currentProduct = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          isBought: true,
        };
      }
      return product;
    });

    if (currentProduct.every((cP) => Boolean(cP.isBought))) {
      alert("Alışveriş tamamlandı");
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    }

    setProducts(currentProduct);
  };

  const deleteShop = (productId) => {
    const filteredProduct = products.filter((product) => product.id !== productId);
    setProducts(filteredProduct);
  };

  const filteredProducts = products.filter((product) => {
    let result = true;

    if (filteredName !== "") {
      const fuse = new Fuse(products, { keys: ["name"] });
      const asd = fuse.search(filteredName);
      if (!asd.find((a) => a.item.id === product.id)) {
        result = false;
      }
    }

    if (filteredCategoryId !== "" && product.categories !== parseInt(filteredCategoryId)) {
      result = false;
    }

    if (filteredShopId !== "" && product.shops !== parseInt(filteredShopId)) {
      result = false;
    }

    if (filteredStatus !== "reset") {
      if (filteredStatus === "bought" && !product.isBought) {
        result = false;
      }
      if (filteredStatus === "notBought" && product.isBought) {
        result = false;
      }
    }

    return result;
  });

  return (
    <Container>
      <form onSubmit={submitForm} className="d-flex gap-3 align-items-center">
        <Form.Label htmlFor="hedef">HEDEF</Form.Label>
        <Form.Control
          type="text"
          id="hedef"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Form.Select
          className="shops"
          aria-label="Default select example"
          value={shopsSelect}
          onChange={(e) => setShopsSelect(e.target.value)}
        >
          <option value="">Mağaza Seç</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          className="categories"
          aria-label="Default select example"
          value={categoriesSelect}
          onChange={(e) => setCategoriesSelect(e.target.value)}
        >
          <option value="">Kategori Seç</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>

        <Button variant="primary" type="submit">
          GÖNDER
        </Button>
      </form>

      <form className="d-flex mt-5 gap-3">
        <Form.Label htmlFor="filterName">HEDEF</Form.Label>
        <Form.Control
          type="text"
          id="filterName"
          value={filteredName}
          onChange={(e) => setFilteredName(e.target.value)}
        />

        <Form.Select
          className="shops"
          aria-label="Default select example"
          value={filteredShopId}
          onChange={(e) => setFilteredShopId(e.target.value)}
        >
          <option value="">Mağaza Seç</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          className="categories"
          aria-label="Default select example"
          value={filteredCategoryId}
          onChange={(e) => setFilteredCategoryId(e.target.value)}
        >
          <option value="">Kategori Seç</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>

        <Form.Check
          type="radio"
          id="1"
          label="Tümü"
          value="reset"
          checked={filteredStatus === "reset"}
          onChange={() => setFilteredStatus("reset")}
        />
        <Form.Check
          type="radio"
          id="2"
          label="Satın Alınanlar"
          value="bought"
          checked={filteredStatus === "bought"}
          onChange={() => setFilteredStatus("bought")}
        />
        <Form.Check
          type="radio"
          id="3"
          label="Satın Alınmayanlar"
          value="notBought"
          checked={filteredStatus === "notBought"}
          onChange={() => setFilteredStatus("notBought")}
        />
      </form>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>PARÇA ADI</th>
            <th>MARKA</th>
            <th>KATEGORİ</th>
            <th>SATIN ALINDI MI?</th>
            <th>SİL</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr
              key={product.id}
              style={{ textDecoration: product.isBought ? "line-through" : "none" }}
            >
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{shops.find((shop) => shop.id === product.shops)?.name}</td>
              <td>{categories.find((category) => category.id === product.categories)?.name}</td>
              <td>
                <Button variant="success" onClick={() => clickBuy(product.id)}>
                  Satın Al
                </Button>
              </td>
              <td>
                <IconButton onClick={() => deleteShop(product.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
