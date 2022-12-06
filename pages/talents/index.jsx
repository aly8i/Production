import React from 'react'
import Talents from '../../components/Talents'
import axios from 'axios'
function Page({users}) {
  return (
    <Talents users={users} usertype="employeer"/>
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