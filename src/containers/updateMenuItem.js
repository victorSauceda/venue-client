import React from "react";

export default function updateMenuItem(id) {
  const currItem = id.location.pathname.split("/")[3];
  return <h1>{currItem}</h1>;
}
