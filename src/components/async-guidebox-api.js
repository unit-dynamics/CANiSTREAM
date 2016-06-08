/*eslint-disable */

class Search {

  // Makes a fuzzy query to the API to get the show info
  queryGuideBoxFuzzy (search, type) {
    return new Promise((resolve, reject) => {
      let API_URL = 'https://api-public.guidebox.com/v1.43/US/rK979pm8g8rhU4cr8RRzyKONa4caOaWb/'
      let title = search.replace(/\s/ig, '%252520')
      let searchType = type === 'show' ? 'title' : 'movie/title' // Change the url for TV Show or Movie
      let url = API_URL + 'search/' + searchType + '/' + title + '/fuzzy'
      let xhr = new XMLHttpRequest()

      // Example API Calls:
      // TV Show = https://api-public.guidebox.com/v1.43/US/rK979pm8g8rhU4cr8RRzyKONa4caOaWb/search/title/Arrested%252520Development/fuzzy
      // Movie = https://api-public.guidebox.com/v1.43/US/rK979pm8g8rhU4cr8RRzyKONa4caOaWb/search/movie/title/Stranger%252520Than%252520Fiction/fuzzy
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText)) // Resolve the Promise
        }
      }

      console.log(url) // Log the URL that will be quried
      xhr.open('GET', url)
      xhr.send(null)
    })
    
  }

  // Makes a ID query to the API to get the show info
  queryGuideBoxId (obj) {
    return new Promise((resolve, reject) => {
      let API_URL = 'https://api-public.guidebox.com/v1.43/US/rK979pm8g8rhU4cr8RRzyKONa4caOaWb/'
      let showPostfix = obj[0].type === 'show' ? '/available_content' : '' // Postfix to get show info
      let showArray = []
      let xhr = []
      let xhrIsFinished = []

      // Example API Calls:
      // TV Show = https://api-public.guidebox.com/v1.43/US/rK979pm8g8rhU4cr8RRzyKONa4caOaWb/show/2098/available_content
      // Movie = https://api-public.guidebox.com/v1.43/US/rK979pm8g8rhU4cr8RRzyKONa4caOaWb/movie/50362
      obj.forEach((item, index, array) => {
        let url = API_URL + item.type + '/' + item.id + showPostfix
        xhr[index] = new XMLHttpRequest()

        xhr[index].onreadystatechange = () => {
          if(xhr[index].readyState === 4 && xhr[index].status === 200) {
            item.rawInfo = (JSON.parse(xhr[index].responseText))
            xhrIsFinished.push(true) // Tracking if finished in order to return the Promise
            showArray.push(item) // Creating the new Array to pass on to the filter
            if (xhrIsFinished.length === array.length) {
              resolve(showArray) // Resolve the Promise
            } 
          }
        }
        console.log(url) // Log the URL that will be quried 
        xhr[index].open('GET', url)
        xhr[index].send(null)
      })
    })
    
  }

  providerFilter (obj) {
    console.log('providerFilter inital obj =', obj)
    let regProviders = /(netflix|hulu_plus|amazon_prime|hbo_now|hulu_free)/
    let objSourcePath = obj[0].type === 'show' ? 'rawInfo.results.web.episodes.all_sources' : 'rawInfo.subscription_web_sources'

    if (obj[0].type === 'show') { //Filter Shows
      console.log('show filter')
      obj.forEach((item) => {
        item.rawInfo.results.web.episodes.all_sources.forEach((x) => {
          if (x.source.match(regProviders)) {
            item.providers.push(x.source)
          }
        })
      })
    }else{ //Filter Movies
      console.log('movie filter', obj)
      obj.forEach((item) => {
        console.log(item.title)
        item.rawInfo.subscription_web_sources.forEach((x) => {
          console.log(x.source)
          if (x.source.match(regProviders)) {
            console.log('source found', x.source)
            item.providers.push(x.source)
          }
        })
      })
    }

    let streamableVideos = obj.filter((item) => {
      return item.providers.length > 0
    })
    console.log('providerFilter streamableVideos = ', streamableVideos)
    return streamableVideos
  }

  createIdArray (obj, type) {
    console.log('From Array Fucntion', obj, type)
    let ids = []

    obj.results.forEach((item) => {
      let x = {}
      x.id = item.id
      x.title = item.title
      x.type = type
      x.img = type === 'show' ? item.artwork_448x252 : item.poster_400x570
      x.providers = []
      x.rawInfo = {}
      ids.push(x)
    })
    ids.splice(5) // Limit results to only 5
    console.log('idArray =' , ids)
    return ids
  }
}
// export default search
export default new Search()


// Request
// Create Array
// Get video info from id
// pass to filter to filter shows

// --- Issues ---
// 1. ID query is out of order and returning before all that data is returned
// x2. providerFiler is retruning an empty array
// x3. make sure regex is working with match in the filter
// 4. return object of movies to view after processing