import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, TextField, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");

  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      setBodyParts(["all", ...bodyPartData]);
    };
    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=1327",
        exerciseOptions
      );
      const searchedExercises = exercisesData.filter(
        (item) =>
          item.name.toLocaleLowerCase().includes(search) ||
          item.target.toLocaleLowerCase().includes(search) ||
          item.equipment.toLocaleLowerCase().includes(search) ||
          item.bodyPart.toLocaleLowerCase().includes(search)
      );
      window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });

      setSearch("");
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign={"center"}
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position={"relative"} mb="72px">
        <TextField
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "800px", xs: "350px" },
            bgcolor: "white",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyParts={bodyPart}
          setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
