import React from 'react'
import AddJob from '../../components/AddJob'
import { createTheme,ThemeProvider } from "@mui/material";
import axios from 'axios';
const add = ({crews,talents,providers}) => {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });
  return (

    <ThemeProvider theme={darkTheme}>
      <AddJob crews={crews} talents={talents} providers={providers}/>
    </ThemeProvider>
  )
}
export default add

export const getServerSideProps = async() => {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statics`);
  return {
    props: {
      crews: res1.data[0].crews,
      talents: res1.data[0].talents,
      providers: res1.data[0].providers
    },
  }
}