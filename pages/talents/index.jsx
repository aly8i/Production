import React from 'react'
import Talents from '../../components/Talents'
import axios from 'axios'
function Page({users,options}) {
  return (
    <Talents users={users} options={options}/>
  )
}

export default Page

export const getServerSideProps = async () => {
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
  const res2 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statics`);
  const options = res2.data[0].crews.concat(res2.data[0].talents).concat(res2.data[0].providers);
  return {
    props: {
      users: res1.data,
      options: options
    },
  };
}