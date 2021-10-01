import axios from 'axios'

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  // Creating Elements

  const cardDiv = document.createElement('div');
  const headlineDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const imgDiv = document.createElement('div');
  const img = document.createElement('img');
  const authorSpan = document.createElement('span');

  // Adding Classes

  cardDiv.classList.add('card');
  headlineDiv.classList.add('headline');
  authorDiv.classList.add('author');
  imgDiv.classList.add('img-container');

  // Injecting Content

  headlineDiv.textContent = article.headline;
  img.src = article.authorPhoto;
  authorSpan.textContent = `By ${article.authorName}`;

  // Appending Children

  cardDiv.appendChild(headlineDiv);
  cardDiv.appendChild(authorDiv);
  authorDiv.appendChild(imgDiv);
  authorDiv.appendChild(authorSpan);
  imgDiv.appendChild(img);

  // Returning Component

  return cardDiv;

}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  axios.get(`http://localhost:5000/api/articles`)
  .then(resp => {

    const selectorElem = document.querySelector(selector)
    
    const javaScriptArray = resp.data.articles.javascript
    javaScriptArray.forEach( article => {
      selectorElem.appendChild(Card(article))
    })

    const bootstrapArray = resp.data.articles.bootstrap
    bootstrapArray.forEach( article => {
      selectorElem.appendChild(Card(article))
    }) 

    const technologyArray = resp.data.articles.technology
    technologyArray.forEach( article => {
      selectorElem.appendChild(Card(article))
    })

    const jqueryArray = resp.data.articles.jquery
    jqueryArray.forEach( article => {
      selectorElem.appendChild(Card(article))
    })

    const nodeArray = resp.data.articles.node
    nodeArray.forEach( article => {
      selectorElem.appendChild(Card(article))
    })


  })
  .catch( err => {
    const errorText = document.createElement('h1')
    errorText.textContent = 'ERROR'
    errorText.style.color = 'red'
    document.querySelector('body').appendChild(errorText)
  })

}

export { Card, cardAppender }
