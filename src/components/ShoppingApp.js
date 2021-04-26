import { useState, useEffect } from "react"
import ShoppingList from "./ShoppingList"
import AddProductForm from "./AddProductForm"
import AddPopularProduct from "./AddPopularProduct"

const ShoppingApp = () => {
  const getInitialShopping = () => JSON.parse(window.localStorage.getItem("my-shopping-list")) || []
  const [shopping, setShopping] = useState(getInitialShopping)
  const [filter, setFilter] = useState("")
  const addToShoppingList = (product) => {
    setShopping([...shopping, product])
    setFilter("")
  }

  const removeFromShoppingList = (product) => {
    setShopping(shopping.filter((el) => el !== product))
  }

  useEffect(() => {
    document.title =
      shopping.length === 0
        ? `Préparez vos courses`
        : `${shopping.length} produit(s) sur votre liste des courses`
  }, [shopping])

  useEffect(() => {
    window.localStorage.setItem("my-shopping-list", JSON.stringify(shopping))
  }, [shopping])

  return (
    <main className="row">
      <section className="col-lg-8">
        <ShoppingList
          shopping={shopping}
          removeFromShoppingList={removeFromShoppingList}
          filter={filter}
          setFilter={setFilter}
        />
      </section>
      <section className="col-lg-4">
        <div className="bg-light border p-4">
          <h2 className="mb-3 h4">Ajouter un produit :</h2>
          <AddProductForm
            shopping={shopping}
            addToShoppingList={addToShoppingList}
          />
          <AddPopularProduct
            shopping={shopping}
            addToShoppingList={addToShoppingList}
          />
        </div>
      </section>
    </main>
  )
}

export default ShoppingApp
