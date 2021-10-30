import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import { Row } from "antd";
import MainImage from "../Commons/MainImage";
import GridCards from "../Commons/GridCards";
import Axios from "axios";

function LandingPage() {
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [PageNum, setPageNum] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        getMovies(endpoint);
    }, []);

    const getMovies = (endpoint) => {
        Axios.get(endpoint).then((response) => {
            if (!MainMovieImage) setMainMovieImage(response.data.results[0]);
            setMovies([...Movies, ...response.data.results]);
            setPageNum(response.data.page);
        });
    };

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
            PageNum + 1
        }`;
        getMovies(endpoint);
    };

    return (
        <div style={{ width: "100%", margin: "0" }}>
            {/* Main Image */}
            {MainMovieImage && (
                <MainImage
                    title={MainMovieImage.original_title}
                    desc={MainMovieImage.overview}
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                />
            )}
            <div style={{ width: "85%", margin: "1rem auto" }}>
                <h2>Movies by latest</h2>
                <hr />
                {/* Movie Grid Cards */}
                <Row gutter={[10, 10]}>
                    {Movies &&
                        Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    landingPage
                                    image={
                                        movie.poster_path
                                            ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                                            : null
                                    }
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            </React.Fragment>
                        ))}
                </Row>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    );
}

export default LandingPage;
