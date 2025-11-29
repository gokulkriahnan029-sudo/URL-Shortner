import express from 'express'
import connectdb from './lib/db.js'
import shorturlmoongoose from './models/shortUrl.js'
import shortid from 'shortid'


const app = express()
const PORT = 5000;

connectdb();
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.get('/',(req,res) => {
    res.render("view.ejs",{shorturl:null})
})

app.post('/shorturl', async(req,res) => {
    const fullurl = req.body.fullurl;
    const shortcode = shortid.generate();
    const shorturl = `https://url-shortner-7k9d.onrender.com/${shortcode}`

    const newurl = new shorturlmoongoose ({shortcode,fullurl})
    await newurl.save();

    res.render("view.ejs",{shorturl})
})

app.get('/:shortcode', async(req,res) => {
    const shortcode = req.params.shortcode
    const urlrecord = await shorturlmoongoose.findOne({ shortcode })
    if(urlrecord) res.redirect(urlrecord.fullurl)
    else res.status(404).send("url not found")
})


app.listen(PORT, (req,res) => {
    console.log('server is running on ' + PORT)
} )