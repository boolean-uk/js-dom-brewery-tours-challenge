
export async function postBreweryToVisitList(brewery) {
  console.log(brewery);
  const payload = {
    name: brewery.name,
    brewery_type: brewery.brewery_type,
    street: brewery.street,
    city: brewery.city,
    state: brewery.state,
    postal_code: brewery.postal_code,
    phone: brewery.phone,
    website_url: brewery.website_url,
  };
  try {
    const response = await fetch("http://localhost:3000/visits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);
      return "Success";
    } else {
      console.error("Error:", response.status);
      return "Error";
    }
  } catch (error) {
    console.error("Error:", error);
    return "Error";
  }
}

export async function getBreweriesToVisit() {
    return await fetch("http://localhost:3000/visits", {
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
    return data;
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

export async function deleteBrewery(id) {
  try {
    const response = await fetch(`http://localhost:3000/visits/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);
      return "Success";
    } else {
      console.error("Error:", response.status);
      return "Error";
    }
  } catch (error) {
    console.error("Error:", error);
    return "Error";
  }
}
