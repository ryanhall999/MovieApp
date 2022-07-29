const pg = require("pg");

const client = new pg.Client(
	process.env.DATABASE_URL || "postgres://localhost/movie_db"
);

client.connect();

const sync = async () => {
	const SQL = `
  DROP TABLE IF EXISTS movies;

  CREATE TABLE movies(
    id SERIAL,
    Title VARCHAR(255) NOT NULL UNIQUE, 
    Year VARCHAR(255),
    Poster VARCHAR(65535),
    Overview VARCHAR(65535),
    UserRating FLOAT,
    VoteAVG FLOAT,
		Background VARCHAR(65535),
		DateWatched DATE
  );
  INSERT INTO movies (Title, Year, Poster, Overview, UserRating, VoteAvg, Background, DateWatched) VALUES ('Parasite', '2019-11-8',
   'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg
  ', '"All unemployed, Ki-taeks family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident."', '9', '8.6', '/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg', '2020-03-08');`;
	client.query(SQL);
};

const readMovies = async () => {
	const SQL = "SELECT * from movies";
	return (await client.query(SQL)).rows;
};

const addMovie = async movie => {
	const SQL =
		"INSERT INTO movies(Title, Year, Poster, Overview, VoteAVG, Background, DateWatched) values($1, $2, $3, $4, $5, $6, $7) returning *";
	return (
		await client.query(SQL, [
			movie.original_title,
			movie.release_date,
			movie.poster,
			movie.overview,
			movie.vote_average,
			movie.backdrop_path,
			movie.dateWatched
		])
	).rows[0];
};

const delMovie = async id => {
	const SQL = "DELETE FROM movies where id= $1";
	await client.query(SQL, [id]);
};

const upMovie = async (id, rating) => {
	const SQL = "UPDATE movies SET UserRating = $1 WHERE id = $2 returning *;";
	return (await client.query(SQL, [rating, id])).rows[0];
};

module.exports = {
	sync,
	readMovies,
	addMovie,
	delMovie,
	upMovie
};
