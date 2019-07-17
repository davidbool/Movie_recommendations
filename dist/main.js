const movieManager = new MovieManager
const renderer = new Renderer
let x=-1
const loadPage = async function () {
    x++
    await movieManager.getTrending()
    const r = movieManager.trendingMovies

    await renderer.renderTrending(r.slice(0, 6))

}

loadPage()

$('.search').on('click', async function () {

    let m = movieManager.movieData
    m.splice(0, 1)
    const movie = $('.movieName').val()
    await movieManager.getMovie(movie)
    await renderer.renderTrending(m)
    console.log(m)

})

$('.login').on('click', function () {
    const login = $('.user').val()
    const pass = $('.password').val()
    movieManager.saveUser(login)
})

$('body').on('click', '.like', async function () {
    let movieName = $(this).siblings('.name').text()
    let movieImg = $(this).siblings('.image').prop('src')
    let login = $('.user').val()
    let year = $(this).siblings('.middle').children('.dateOfRelease').text()
    let description = $(this).siblings('.middle').children('.description').text()
    let like = true
    const id = $(this).siblings('.movieId').text()
    let l = await movieManager.saveMovie({name: movieName, id: id,img: movieImg, like: like, year: year, description: description} ,login)
    console.log(l)
    l = movieManager.cutMovies(l)
    console.log(l)
    console.log("main")
    renderer.renderSuggestion(l.slice(0, 3))
    loadPage()
})

$('body').on('click', '.dislike', async function () {
    let movieName = $(this).siblings('.name').text()
    let movieImg = $(this).siblings('.image').prop('src')
    let year = $(this).siblings('.middle').children('.dateOfRelease').text()
    let description = $(this).siblings('.middle').children('.description').text()
    let login = $('.user').val()
    let like = false
    const id = $(this).siblings('.movieId').text()
    movieManager.saveMovie({name: movieName, id: id,img: movieImg, like: like, year: year, description: description} ,login)
})

$('body').on('click','.list',async function(){
    $('.searchMovie').empty()
    movieManager.favoraitemovies.splice(0,movieManager.favoraitemovies.length)
    const login = $('.user').val()
   let m=await movieManager.showlikedmovies(login)
    renderer.renderSuggestion(movieManager.favoraitemovies)
})
