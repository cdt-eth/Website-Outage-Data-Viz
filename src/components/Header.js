import React from "react";

export default function Header() {
  return (
    <div className="header" style={{ margin: 20 }}>
      <a href="https://tulip.co/" target="_blank" rel="noreferrer">
        <img
          src="https://tulip.co/wp-content/uploads/tulip-dark.svg"
          style={{ width: "150px", height: "auto" }}
          alt="tulip logo"
        />
      </a>
    </div>
  );
}
