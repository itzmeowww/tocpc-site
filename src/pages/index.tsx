import { GetStaticProps } from 'next'
import { THACO } from 'components/main/THACO'
import { Reward } from 'components/main/Reward'
import { Overview } from 'components/main/Overview'
import { Schedule } from 'components/main/Schedule'
import { Question } from 'components/main/Question'
import { MetaData } from 'components/Meta'

import db from 'lib/firebase-admin'

const Home = ({ registerSize }: { registerSize: number }) => {
  return (
    <>
      <MetaData />
      <THACO />
      <Overview />
      <Reward />
      <Schedule registerSize={registerSize} />
      {/* <Donation /> */}
      <Question />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const registerSize = await db()
    .collection('users')
    .get()
    .then((snap) => snap.size)
  return {
    props: {
      registerSize,
    },
    revalidate: 60 * 60,
  }
}

export default Home
