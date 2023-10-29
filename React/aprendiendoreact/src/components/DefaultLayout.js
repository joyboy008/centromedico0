import React, { Children } from "react";
import Header from "./Header";
import Sidebarc from "./Sidebarc";
import Slider from "./Slider";
import Footer from "./Footer";

function DefaultLayout({
  children,
  title,
  size = "slider-small",
  showSidebar,
}) {
  return (
    <>
      <Header />
      <Slider title={title} size={size} />
      <div className="center">
        {children}
        {showSidebar ? <Sidebarc blog="true" /> : null}
      </div>
    </>
  );
}

export default DefaultLayout;
