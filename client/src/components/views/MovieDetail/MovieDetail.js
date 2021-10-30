import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../Commons/MainImage";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail(props) {
    const [Movie, setMovie] = useState([]);

    let movieId = props.match.params.movieId;

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;

        Axios.get(endpointInfo).then((response) => {
            setMovie(response.data);
        });
    }, []);

    return (
        <div>
            {/* Header */}
            <MainImage
                title={Movie.original_title}
                desc={Movie.overview}
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            />

            {/* body */}
            <div style={{ width: "85%", margin: "1rem auto" }}>
                {/* Movie Info */}
                <MovieInfo movie={Movie} />
                <br />
                {/* Actors Grid */}

                <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
                    <button>Toggle Actor View</button>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
