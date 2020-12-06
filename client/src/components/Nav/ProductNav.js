const ProductNav = () => {
  return (
    <nav className="navbar justify-content-center bottomNav">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/"}} >Home</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/"}} >Holiday Gifts</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/"}} >Clothing & Accessories</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/"}} >Electronics</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/"}} >Computers & Laptops</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/"}} >Entertainment</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/"}} >Movies & TV Shows</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/"}} >Video Games</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/"}} >Toys</button>
        <button type="button" className="btn btn-dark" onClick={() => {window.location.href = "/"}} >Smart Phones</button>
      </div>
    </nav>
  )
}

export default ProductNav;