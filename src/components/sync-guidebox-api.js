/*eslint-disable */

// Main function that is called to perform the searching
function search (search, type) {
  let idArray = createIdArray(queryGuideBox(search, type))
  let streamableVideos = searchVideos(idArray, type)
  return streamableVideos
}

// Makes the query to the API to get the show info
function queryGuideBox (search, type, provider) {

  let API_URL = 'https://api-public.guidebox.com/v1.43/US/rK979pm8g8rhU4cr8RRzyKONa4caOaWb/'
  provider = provider === undefined ? '' : '/episodes/all/0/0/' + provider + '/all' // Handles checking each provider to see if it has the show
  let title = ''
  let url = API_URL + type + '/' + search + provider
  let xhr = new XMLHttpRequest()

  // Settings to do an initial fuzzy search to get video IDs
  if (typeof search === 'string') {
    title = search.replace(/\s/ig, '%252520')
    type = type === 'show' ? 'title' : 'movie/title' // Change the url for TV Show or Movie
    url = API_URL + 'search/' + type + '/' + title + '/fuzzy'
  }

  console.log(url)
  xhr.open('GET', url, false)

  xhr.send(null)
  return JSON.parse(xhr.responseText)
}

// Calls the function to query the API 
function searchVideos(idArray, type) {
  idArray.splice(5) // Limit results to only 5
  // Loops through the video IDs returned
  idArray.forEach((item) => {
    item.providers = [] // Adds a providers array to each Video obj
    // Get Video Info for each search result
    item = type === 'movie' ? getMovies(item, type) : getTvShows(item, type)
  })

  // Filer out shows that are not on one of the providers
  let streamableVideos = idArray.filter((item) => {
      return item.providers.length > 0
  })

  return streamableVideos
}

function getTvShows (obj, type) {
  let providers = ['netflix', 'hulu_plus', 'Amazon_prime', 'hbo_now']
  // Loops though providers and checks each one to see if it has the show
  providers.forEach((provider) => {
    let showInfo = queryGuideBox(obj.id, type, provider)
    if (showInfo.total_results > 0)
      obj.providers.push(provider)
  })

  return obj
}

function getMovies (obj, type) {
  console.log(obj, 'from inside getMovies')
  let movieInfo = queryGuideBox(obj.id, type)
  obj.img = movieInfo.poster_400x570
  // Get Streaming Srouces
  movieInfo.subscription_web_sources.forEach((source) => {
    obj.providers.push(source.source)
  })

  return obj
}

function createIdArray (obj) {
  let ids = []

  obj.results.forEach((item) => {
    let x = {}
    x.id = item.id
    x.title = item.title
    x.img = item.artwork_448x252
    ids.push(x)
  })

  return ids
}

export default search