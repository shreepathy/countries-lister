import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import { useState } from 'react'
import CountriesTable from '@/components/CountriesTable/CountriesTable'
const inter = Inter({ subsets: ['latin'] })


export default function Home({ countries }) {

  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword) 

  )

  const onInputChange = (e) => {
    setKeyword(e.target.value.toLowerCase());
  };
  console.log(keyword);

  return (
    <Layout>
      <div className={styles.counts}>
        Found  {filteredCountries.length} Countries
      </div>
      <SearchInput
        placeholder="Filter by Name, Region or SubRegion"
        onChange={onInputChange} >
      </SearchInput>
      <CountriesTable countries={filteredCountries} />
    </Layout>

  );
};

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
