const express = require('express');
const bodyParser = require('body-parser');

// loads express app
const app = express();


// decoded content body parsing
app.use(bodyParser.urlencoded({extended:false}));

// sets view template engine to pug
app.set('view engine','pug');
app.set('views','views');



// loads search engine
app.get('/',(req,res)=>{
    res.render('search');
})


// returns search results
app.post('/',(req,res)=>{
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('09a278aa18e84d3598cbea023827cfbc');

    // passes decoded body content of query from post req
    let query = req.body.query;
    
    
    newsapi.v2.everything({
    q: query,
    language: 'en',
  }).then(response => {
    let news=response;


    if (news.status === 'ok'){
        res.render('done',{news});
    
    }
    else{
        res.status(404).render('error');
    
    }

  });

})

// returning error page with status code 404
app.use((req,res)=>{
  res.status(404).render('error');
})




app.listen(3000);