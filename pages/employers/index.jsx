import React from 'react'
import Employers from '../../components/Employers'
import axios from 'axios'
function Page({users,options}) {
  return (
    <Employers users={users} options={options}/>
  )
}

export default Page

export const getServerSideProps = async () => {
  const res2 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statics`);
  const options = res2.data[0].crews.concat(res2.data[0].talents).concat(res2.data[0].providers);
  const res1 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
  return {
    props: {
      users: res1.data,
      options: options
    },
  };
}