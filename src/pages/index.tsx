import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "../utils/api";
import Layout from "../components/Layout";
import Hero from "../components/landingpage/Hero";
import Team from "../components/landingpage/Team";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <Layout>
      <Hero/>
      <Team/>
    </Layout>
  );
};

export default Home;
