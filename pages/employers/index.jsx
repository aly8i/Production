import React from 'react'
import Employers from '../../components/Employers'
import axios from 'axios'
function Page({users}) {
  return (
    <Employers users={users} usertype="employeer"/>
  )
}

export default Page

export const getServerSideProps = async () => {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
  return {
    props: {
      users: res1.data
    },
  };
}