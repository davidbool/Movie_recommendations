const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = express.Router()
const request = require('request')
const User = require('./modules/User')
const sort = require('./modules/Recommend')

const key = 'f879f4132d8f332d5be23dee1d085d9f'
const namekey = 'b6c343c7'


//מקבל סרטים מה-api
router.get('/movies', function (req, res) {
    request(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`, function (err, r, body) {
        const data = JSON.parse(body)
        res.send(data)
    })
})


//take name from imdb and convert it to the actual movie name
router.get('/movies/:moviename', function (req, res) {
    let name = req.params.moviename
    request(`http://www.omdbapi.com/?apikey=${namekey}&t=${name}`, function (err, r, Body) {
        const imdb = JSON.parse(Body)

        request(`https://api.themoviedb.org/3/find/${imdb.imdbID}?api_key=${key}&language=en-US&external_source=imdb_id`, function (err, r, body) {
            const data = JSON.parse(body)
            res.send(data)
        })
    })
})


//save user into the db
router.post('/user/:username', function (req, res) {
    const data = req.body
    let user = req.params.username
    User.findOne({ name: user }, function (err, d) {
        if (d == null) {
            new User(data).save()
            res.end('saved')
        }
        else {
            res.end('not saved')

        }

    })

})

//in the user db,we push the arryrs of 'LIKE' movies 
router.put('/user/:username', function (req, res) {
    const user = req.params.username
    const moviedata = req.body
    User.findOne({ name: user }, function (err, x) {
        if (x.movies[0] == undefined) {
            x.movies.push(moviedata)
            x.save()
        }
        else {
            let checkin = true
            for (movie of x.movies) {
                if (movie.name == moviedata.name) {
                    checkin = false
                    break
                }
            }
            if (checkin) {
                x.movies.push(moviedata)
                x.save()
            }

        }
    })
    request(`https://api.themoviedb.org/3/movie/${moviedata.id}/similar?api_key=${key}&language=en-US&page=1`, function (err, r, body) {
        const movies = JSON.parse(body).results
        User.findOne({ name: user }, function (err, d) {
            let list = sort(movies, d.recommendedMovies)
                let i = 0
                while (i < list.length) {
                    for (let m of d.movies) {
                        if (m.name == list[i].title) {
                            list.splice(i, 1)
                        }
                    }
                    i++
                }
                
                d.recommendedMovies = list
                d.markModified(`recommendedMovies`)
                d.save(function (err) {
                    // console.log(err)
                })
            
            res.send(list)
        })
        //             }
    })
})

// })

//fillter only liked movie
router.get('/user/:username', function (req, res) {
    let name = req.params.username
    User.findOne({ name: name }, function (err, x) {
        let arr = x.movies.filter(m => m.like === "true")
        res.send(arr)
    })
})

router.get('/topmovies', function (req, res) {
    request(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`, function (err, r, body) {
        const data = JSON.parse(body)
        res.send(data.results)
    })
})

module.exports = router
