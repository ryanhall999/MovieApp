import React from "react";
import { sortById, formatDate } from "./util";

export default function({ movies, UserRating, updateRating, destroyMovie }) {
	movies = sortById(movies);
	return (
		<div>
			<h1>Movie List</h1>
			{movies.map(movie => {
				let date = formatDate(movie.datewatched);
				return (
					<li
						className="film"
						key={movie.id}
						style={{
							backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.background})`
						}}
					>
						<img src={movie.poster} />
						<div className="filmInfo">
							Title: {movie.title}
							<br></br>
							Date Released: {movie.year}
							<br></br>
							Description: {movie.overview}
							<br></br>
							Date Watched: {date}
						</div>
						<div className="ratingInfo">
							IMBD User Rating: {movie.voteavg}
							<br></br>
							<UserRating movie={movie} updateRating={updateRating} />
							<br></br>
						</div>
						<button onClick={() => destroyMovie(movie)}>x</button>
					</li>
				);
			})}
		</div>
	);
}
