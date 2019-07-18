class MovieManager {
    constructor() {
        this.trendingMovies = []
        this.movieData = []
        this.favoraitemovies=[]
        this.topmovies=[]

    }

    async getTrending() {

        let mv = this.trendingMovies



        let response = await $.get('http://localhost:3000/movies', function (req, res) {
            return res
        })
        const res2 = response.results
        for (let a of res2) {
            mv.push({ name: a.title, img: `https://image.tmdb.org/t/p/w300${a.poster_path}`, id: a.id , description: a.overview, year: a.release_date})

        }

        console.log(mv.slice(0, 3))

    }



    async getMovie(movie) {
        let Data = this.movieData
        let data = await $.get(`http://localhost:3000/movies/${movie}`, function (req, res) {
            return res
        })
        let res = data.movie_results[0]


        Data.push({ name: res.title, img: `https://image.tmdb.org/t/p/w300${res.poster_path}`, id: res.id , description: res.overview, year: res.release_date})
    }

    saveUser(user) {
        $.post(`/user/${user}`, { name: user, movies: [] }, function (data, status) {

        })
    }


    async saveMovie(movieinfo, user) {
        //  this.likeData.push(movies)
        let lst = await $.ajax({
            method: "PUT",
            url: `http://localhost:3000/user/${user}`,
            data: movieinfo,
            success: function (data) {
                return data
            }

        })
        return lst
    }
    // adjust the movies array to the render
    cutMovies(movies) {
        let newMovies = []
        for (let movie of movies) {
            newMovies.push({
                id: movie.id,
                img: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
                name: movie.title,
                year: movie.release_date,
                description: movie.overview
        })
        }
        return newMovies
    }


  async  showlikedmovies(user){
     let a=await  $.get(`http://localhost:3000/user/${user}`,function(res){  
           
        return res
        })
       a.forEach(x =>  this.favoraitemovies.push(x))
        
    }
    async TopMovies(){
        let a=await $.get('http://localhost:3000/topmovies',function(res){
            return res
        })
        a.forEach(x => this.topmovies.push({ name: x.title, img: `https://image.tmdb.org/t/p/w300${x.poster_path}`, id: x.id , description: x.overview, year: x.release_date}))
    }


}

/* 
         ,     .
        /(     )\               A
   .--.( `.___.' ).--.         /_\
   `._ `%_&%#%$_ ' _.'     /| <___> |\
      `|(@\*%%/@)|'       / (  |L|  ) \
       |  |%%#|  |       J d8bo|=|od8b L
        \ \$#%/ /        | 8888|=|8888 |
        |\|%%#|/|        J Y8P"|=|"Y8P F
        | (.".)%|         \ (  |L|  ) /
    ___.'  `-'  `.___      \|  |L|  |/
  .'#*#`-       -'$#*`.       / )|
 /#%^#%*_ *%^%_  #  %$%\    .J (__)
 #&  . %%%#% ###%*.   *%\.-'&# (__)
 %*  J %.%#_|_#$.\J* \ %'#%*^  (__)
 *#% J %$%%#|#$#$ J\%   *   .--|(_)
 |%  J\ `%%#|#%%' / `.   _.'   |L|
 |#$%||` %%%$### '|   `-'      |L|
 (#%%||` #$#$%%% '|            |L|
 | ##||  $%%.%$%  |            |L|
 |$%^||   $%#$%   |  VK/cf     |L|
 |&^ ||  #%#$%#%  |            |L|
 |#$*|| #$%$$#%%$ |\           |L|
 ||||||  %%(@)$#  |\\          |L|
 `|||||  #$$|%#%  | L|         |L|
      |  #$%|$%%  | ||l        |L|
      |  ##$H$%%  | |\\        |L|
      |  #%%H%##  | |\\|       |L|
      |  ##% $%#  | Y|||       |L|
      J $$#* *%#% L  |E/
      (__ $F J$ __)  F/
      J#%$ | |%%#%L
      |$$%#& & %%#|
      J##$ J % %%$F
       %$# * * %#&
       %#$ | |%#$%
       *#$%| | #$*
      /$#' ) ( `%%\
     /#$# /   \ %$%\
    ooooO'     `Ooooo */