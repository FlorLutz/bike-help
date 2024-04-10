import React from "react";

export default function Header() {
  return (
    <h1 className="bg-lime-200 flex place-content-between text-2xl">
      <div>
        <i className="fa-solid fa-bicycle mr-4"></i> Bike Help
      </div>
      <i className="fa-solid fa-bars mr-4"></i>
    </h1>
  );
}
