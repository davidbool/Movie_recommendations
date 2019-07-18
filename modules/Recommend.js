const RecommendList = function (list1, list2) { // list1: api movies || list2: DB movies
    if (list2[0] == undefined) {
        list1.forEach(movie => movie.score = movie.vote_average)
        return list1
    }
    let newlist = []
    let scorelist = []
    for (let m of list2) {
        let count = 0
        for (let i of list1) {
            i.score = i.vote_average

            if (m.title == i.title) {
                list1.splice(count, 1)
                m.score++
            }
            count++
        }
    }
    newlist = list1.concat(list2)
    newlist.forEach(movie => { scorelist.push(movie.score) })
    scorelist.sort(function (a, b) { return a - b }).reverse()
    let finlst = []
    let k = 0
    while (k < scorelist.length) {
        for (let film of newlist) {
            if (film.score == scorelist[k]) {
                finlst.push(film)
                k++
            }
        }
    }
    return finlst
}



module.exports = RecommendList
