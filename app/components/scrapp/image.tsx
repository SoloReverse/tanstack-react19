"use client";

import {useTheme} from "@solorev/react-themes";
import {useDeferredValue, useEffect, useState} from "react";

export default function Image() {
  const {theme} = useTheme();

  return theme == "light" ? (
    <img src={"/images/logos/pay-mini-color.png"} className="w-20" />
  ) : (
    <img src={"/images/logos/pay-mini-black.png"} className="w-20" />
  );
}
