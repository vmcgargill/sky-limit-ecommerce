const ProductNav = () => {
  return (
    <nav className="navbar justify-content-center bottomNav">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/"}} >Home</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/holiday-gifts"}} >Holiday Gifts</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/clothing-accessories"}} >Clothing & Accessories</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/electronics"}} >Electronics</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/computers"}} >Computers & Laptops</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/entertainment"}} >Entertainment</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/tvmovies"}} >Movies & TV Shows</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/videogames"}} >Video Games</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/toys"}} >Toys</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/smartphones"}} >Smart Phones</button>
      </div>
    </nav>
  )
}

export default ProductNav;