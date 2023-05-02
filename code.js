const root = ReactDOM.createRoot(document.getElementById("root"));
fetch("/api/v1/restaurants")
  .then((res) => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then((data) => sussy(data.restaurants));
function sussy(data) {
  const listItems = data.map((json, index) =>
    React.createElement(
      "div",
      {
        style: {
          backgroundColor: "blue",
          width: "49vw",
          overflowWrap: "break-word",
          marginLeft: ".5vw",
        },
        id: "component",
      },
      [
        React.createElement("h1", {}, json.Title),
        React.createElement("h2", {}, json.Description),
        React.createElement("h2", {}, [
          "Link: ",
          React.createElement("a", { href: `${json.Link}` }, json.Link),
        ]),
        React.createElement("div", {}, [
          React.createElement(
            "h3",
            { style: { display: "inline-block" } },
            `Type: ${json.Type}`
          ),
          React.createElement(
            "h3",
            { style: { display: "inline-block" } },
            `Posted on: ${json.Date}`
          ),
        ]),
        React.createElement(
          "button",
          {
            onClick: () => {
              fetch(`/api/v1/restaurants/like?id=${json.id_}`);
              rerender();
            },
          },
          `${json.likes}`
        ),
      ]
    )
  );
  root.render(React.createElement("div", { style: {} }, listItems));
}

function handleChange(id) {
  if (document.getElementById(id).checked == true && id != "alltypes") {
    document.getElementById("alltypes").checked = false;
  } else if (document.getElementById(id).checked == true && id == "alltypes") {
    document.getElementById("audio").checked = false;
    document.getElementById("video").checked = false;
    document.getElementById("video").checked = false;
    document.getElementById("article/document").checked = false;
    document.getElementById("textbook/book").checked = false;
    document.getElementById("download").checked = false;
  }
  rerender();
}
function handleChangePrices(id) {
  if (document.getElementById(id).checked == true && id != "allcost") {
    document.getElementById("allcost").checked = false;
    if (id == "paid") {
      document.getElementById("free").checked = false;
    } else {
      document.getElementById("paid").checked = false;
    }
  } else if (document.getElementById(id).checked == true && id == "allcost") {
    document.getElementById("free").checked = false;
    document.getElementById("paid").checked = false;
  }
  rerender();
}
function rerender() {
  let ending = "?type=";
  let elements = [
    "audio",
    "video",
    "image",
    "article/document",
    "textbook/book",
    "download",
  ];
  for (let i = 0; i < elements.length; i++) {
    if (document.getElementById(elements[i]).checked == true) {
      ending += "," + elements[i];
    }
  }
  ending += "&";
  if (document.getElementById("free").checked) {
    ending += "free=0";
  } else if (document.getElementById("paid").checked) {
    ending += "paid=0";
  }
  fetch("/api/v1/restaurants" + ending)
    .then((res) => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then((data) => sussy(data.restaurants));
}
