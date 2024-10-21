import React, { useRef, useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BodyPart = ({ item, bodyPart, setBodyPart }) => (
  <Box
    onClick={() => setBodyPart(item)}
    sx={{
      borderTop: item === bodyPart ? "4px solid #FF2625" : "",
      background: "#fff",
      borderBottomLeftRadius: "20px",
      width: "270px",
      height: "282px",
      cursor: "pointer",
      gap: "47px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography
      fontSize="24px"
      fontWeight="bold"
      fontFamily="Alegreya"
      color="#3A1212"
      textTransform="capitalize"
      sx={{ textAlign: "center", mt: 2 }}
    >
      {item}
    </Typography>
  </Box>
);

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollLeft);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%", p: 2 }}>
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          padding: "20px 0", // Add padding to give space around items
        }}
      >
        {data.map((item) => (
          <Box key={item.id || item} sx={{ mx: 1 }}>
            <BodyPart
              item={item}
              setBodyPart={setBodyPart}
              bodyPart={bodyPart}
            />
          </Box>
        ))}
      </Box>
      <IconButton
        onClick={() => scroll(-300)}
        sx={{
          position: "absolute",
          left: "0",
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "background.paper",
          "&:hover": { bgcolor: "background.paper" },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={() => scroll(300)}
        sx={{
          position: "absolute",
          right: "0",
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "background.paper",
          "&:hover": { bgcolor: "background.paper" },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default HorizontalScrollbar;
