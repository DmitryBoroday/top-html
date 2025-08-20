//   Hot Deals
const projectId = '2rmudr1y' // Replace with your Sanity Project ID
const dataset = 'production' // Replace with your Sanity Dataset name
const groqQuery = encodeURIComponent(
  '*[_type == "topOffers"]{topAgencyName, countryTitle,mobileImage}'
) // GROQ query to fetch posts with title and body

const apiUrl = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}?query=${groqQuery}`

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => {
    const contentDiv = document.getElementById('content')
    if (data.result && data.result.length > 0) {
      let htmlContent = '<ul>'
      data.result.forEach((post) => {
        htmlContent += `<li><h3>${post.topAgencyName}</h3><p>${post.countryTitle}</p></li>`
      })
      htmlContent += '</ul>'
      contentDiv.innerHTML = htmlContent
    } else {
      contentDiv.innerHTML = '<p>No posts found.</p>'
    }
  })
  .catch((error) => {
    console.error('Error fetching data:', error)
    document.getElementById(
      'content'
    ).innerHTML = `<p>Error loading content: ${error.message}</p>`
  })
