import React, { useState, useEffect, useRef } from "react";
import "./TVLink.css";
import TvIcon from "@mui/icons-material/Tv";
import tvImg from "../../../../../public/tv.png";

function TVLink({ year }) {
  const yearLinkMap = {
    1950: "https://50s.myretrotvs.com/#aOo7x76Ec9w",
    1951: "https://50s.myretrotvs.com/#FOqBXP2Nmqo",
    1952: "https://50s.myretrotvs.com/#hhlqYJb_eos",
    1953: "https://50s.myretrotvs.com/#u78cAg041Cg",
    1954: "https://50s.myretrotvs.com/#KLlsekEN0XA",
    1955: "https://50s.myretrotvs.com/#K8u_2OgrGlA",
    1956: "https://50s.myretrotvs.com/#t_a4whuy1Lc",
    1957: "https://50s.myretrotvs.com/#dK-jT8kgcYo",
    1958: "https://50s.myretrotvs.com/#x6dA7iOGhIk",
    1959: "https://50s.myretrotvs.com/#MGx8qf8byEQ",
    1960: "https://60s.myretrotvs.com/#51e8RlduO20",
    1961: "https://60s.myretrotvs.com/#8GOAj25IhAw",
    1962: "https://60s.myretrotvs.com/#3LlmjZVomMw",
    1963: "https://60s.myretrotvs.com/#9nrLhJOcWVY",
    1964: "https://60s.myretrotvs.com/#QiUkyAS-fSs",
    1965: "https://60s.myretrotvs.com/#PuNnrK48RaU",
    1966: "https://60s.myretrotvs.com/#4KXu489ycrM",
    1967: "https://60s.myretrotvs.com/#lvsEptB2DfE",
    1968: "https://60s.myretrotvs.com/#tproauLhlJc",
    1969: "https://60s.myretrotvs.com/#81SUTJfUY_Y",
    1970: "https://70s.myretrotvs.com/#rm3qYOu1cjY",
    1971: "https://70s.myretrotvs.com/#DZh5IZ12tZo",
    1972: "https://70s.myretrotvs.com/#2t8G5cPqNAc",
    1973: "https://70s.myretrotvs.com/#BkIyWdZoZh4",
    1974: "https://70s.myretrotvs.com/#AiyUDxSBIhA",
    1975: "https://70s.myretrotvs.com/#MWEkr_V1qIc",
    1976: "https://70s.myretrotvs.com/#9RXe9_SHMZU",
    1977: "https://70s.myretrotvs.com/#GPig13sukbY",
    1978: "https://70s.myretrotvs.com/#CxH5SuaK6r8",
    1979: "https://70s.myretrotvs.com/#f2lEYQFOPt8",
    1980: "https://80s.myretrotvs.com/#EhDmNRQgKLM",
    1981: "https://80s.myretrotvs.com/#4Fe2tulqGsQ",
    1982: "https://80s.myretrotvs.com/#591c4_VjyFM",
    1983: "https://80s.myretrotvs.com/#9QZILLqhVtQ",
    1984: "https://80s.myretrotvs.com/#hu2M9IdQKs0",
    1985: "https://80s.myretrotvs.com/#_oQu5n_E3Mg",
    1986: "https://80s.myretrotvs.com/#SQqzCy_ec6Q",
    1987: "https://80s.myretrotvs.com/#uQOTcBbZQU4",
    1988: "https://80s.myretrotvs.com/#mAxNpRm1tH0",
    1989: "https://80s.myretrotvs.com/#PULnav9kkvE",
    1990: "https://90s.myretrotvs.com/#us7AUvzgf_4",
    1991: "https://90s.myretrotvs.com/#WOICYaqVG90",
    1992: "https://90s.myretrotvs.com/#7DXUFfclWDE",
    1993: "https://90s.myretrotvs.com/#TohG7F8M3Ls",
    1994: "https://90s.myretrotvs.com/#LRioyPXGMdE",
    1995: "https://90s.myretrotvs.com/#DXQT2_ewSM8",
    1996: "https://90s.myretrotvs.com/#aBhMBa4zhbs",
    1997: "https://90s.myretrotvs.com/#Y-9dSSjOfW8",
    1998: "https://90s.myretrotvs.com/#QOFqlAyh9lE",
    1999: "https://90s.myretrotvs.com/#ePbvDy_587s",
    2000: "https://00s.myretrotvs.com/#L1EVgfLDsEM",
    2001: "https://00s.myretrotvs.com/#cUBlDHKE4Ng",
    2002: "https://00s.myretrotvs.com/#T-nv6ADAET4",
    2003: "https://00s.myretrotvs.com/#U1Z9b54XoRM",
    2004: "https://00s.myretrotvs.com/#ypgW73jxzlE",
    2005: "https://00s.myretrotvs.com/#leCJLGdE7UA",
    2006: "https://00s.myretrotvs.com/#-2D1-la87cg",
    2007: "https://00s.myretrotvs.com/#vKITQfMn51U",
    2008: "https://00s.myretrotvs.com/#p-kDvQKNyWA",
    2009: "https://00s.myretrotvs.com/#XdVKkK1rxZg",
  };

  const link = yearLinkMap[year];

  return link ? (
    <a
      href={link}
      className="tv-link-container"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={tvImg} />
      <div className="tv-link-text">Watch tv from the year {year}!</div>
    </a>
  ) : null;
}

export default TVLink;
