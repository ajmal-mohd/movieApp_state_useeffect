import React, { useState, useEffect } from "react";
import "./App.css";
import SearchIcons from "./search.svg";
import "./components/MovieCard";
import MovieCard from "./components/MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=db162307";

function App() {
    const [movie,setMovie] = useState([]);
    const [search, Setsearch] = useState("");

    const SearchMovieFetch = async (title) => {
        const responce = await fetch(`${API_URL}&s=${title}`);
        const data = await responce.json();

        setMovie(data.Search);
    };

    useEffect(() => {
        SearchMovieFetch("spiderman");
    }, []);

    // searchFunction
    const handleSearch = (event) => {
        const SearchValue = event.target.value;
        Setsearch(SearchValue);
    };
    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input placeholder="search for movies" onChange={handleSearch} value={search}></input>
                <img src={SearchIcons} alt="search" onClick={() => SearchMovieFetch(search)} />
            </div>
            {movie?.length > 0 ? (
                <div className="container">
                    {movie.map((movie, index) => {
                        return <MovieCard movie={movie} key={index} />;
                    })}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies founded</h2>
                </div>
            )}
        </div>
    );
}

export default App;
