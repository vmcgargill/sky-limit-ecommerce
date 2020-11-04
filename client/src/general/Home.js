import React from "react";

function Home() {
  fetch("/api/test").then(function(response) {
    alert(response)
  })
  return (
    <div class="row">
      <h1>Welcome to the home page</h1>
</div>
  );
}

export default Home;