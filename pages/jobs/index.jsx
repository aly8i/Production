import React from 'react'
import Jobs from '../../components/Jobs'
import axios from 'axios'
function Page({jobs}) {
  return (
    <Jobs jobs={jobs} />
  )
}

export default Page

export const getServerSideProps = async () => {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`);
  return {
    props: {
      jobs: res1.data
    },
  };
}