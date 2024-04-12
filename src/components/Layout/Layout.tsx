import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
