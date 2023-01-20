import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";
import { useState } from 'react'
import styles from './gpt.module.css'
import Link from "next/link";

const orderBy = (countries, value, direction) => {
    if (direction === "asc") {
        return [...countries].sort((a, b) => (a[value] || 0) > (b[value] || 0) ? 1 : -1);
    } else if (direction === "desc") {
        return [...countries].sort((a, b) => (a[value] || 0) < (b[value] || 0) ? 1 : -1);
    }
    return countries;
};


const SortArrow = ({ direction }) => {
    if (!direction) {
        <></>
    } else if (direction === "desc") {
        return (
            <div className={styles.heading__arrow}>
                <KeyboardArrowDownRounded color="inherit" />
            </div>
        )
    } else {
        return (
            <div className={styles.heading__arrow}>
                <KeyboardArrowUpRounded color="inherit" />
            </div>
        )
    }

}

const CountriesTable = ({ countries }) => {

    const [direction, setDirection] = useState();
    const [value, setValue] = useState();
    const orderedCountries = orderBy(countries, value, direction);

    const switchDirection = () => {

        if (!direction) {
            setDirection("desc")
        } else if (direction === "desc") {
            setDirection("asc")
        } else {
            setDirection(null)
        }

    };

    const setValueandDirection = (value) => {

        switchDirection();
        setValue(value);

    };

    return (
        <div>
            <div className={styles.heading}>
                <div className={styles.heading__flag}></div>
                <button
                    className={styles.heading__name}
                    onClick={() => setValueandDirection("name")}
                >
                    <div>Name</div>
                    {value === "name" && <SortArrow direction={direction} />}
                </button>
                <button
                    className={styles.heading__population}
                    onClick={() => setValueandDirection("population")}
                >
                    <div>Population</div>
                    {value === "population" && <SortArrow direction={direction} />}
                </button>
                <button
                    className={styles.heading__area}
                    onClick={() => setValueandDirection("area")}
                >
                    <div>Area(km <sup style={{ fontsize: "0.5rem" }}>2</sup>)</div>
                    {value === "area" && <SortArrow direction={direction} />}
                </button>
                <button
                    className={styles.heading__gini}
                    onClick={() => setValueandDirection("gini")}
                >
                    <div>Gini</div>
                    {value === "gini" && <SortArrow direction={direction} />}
                </button>
            </div>
            {orderedCountries?.map((country, index) => {
                return (
                    <Link href="/country" key={index}>
                        <div className={styles.row}>
                            <div className={styles.flag}>
                                <img src={country.flag} alt={country.name} />
                            </div>
                            <div className={styles.name}>{country.name}</div>
                            <div className={styles.population}>{country.population}</div>
                            <div className={styles.area}>{country.area || null}</div>
                            <div className={styles.gini}>{country.gini || null}</div>
                        </div>

                    </Link>
                )
            })
            }
        </div>
    )
}

export default CountriesTable