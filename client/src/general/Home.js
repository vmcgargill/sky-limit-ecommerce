import React from "react";

function Home() {
  // var message;
  fetch("/api/test").then(res => res.json()).then(response => (console.log(response.message)))

  return (
    <div class="row">
      <h1>Welcome to the home page</h1>
      {/* <h2>Meesage: {message}</h2> */}
</div>
  );
}

export default Home;