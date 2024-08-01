import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';

import {exerciseOptions,fetchData} from '../utils/fetchData'
import Detail from '../components/Detail';
import ExerciseVideo from '../components/ExerciseVideo';
import SimilarExercises from '../components/SimilarExercises';



const ExerciseDetail = () => {
  return (
    <Box>
      <Detail/>
      <ExerciseVideo/>
      <SimilarExercises/>
    </Box>
  )
}

export default ExerciseDetail
