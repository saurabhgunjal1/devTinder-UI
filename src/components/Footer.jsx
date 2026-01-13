import React from "react";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-2">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} – All rights reserved by
          DevTinder Ltd
        </p>
      </aside>
    </footer>
  );
}
