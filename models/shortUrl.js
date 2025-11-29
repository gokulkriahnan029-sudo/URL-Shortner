import mongoose from 'mongoose'


const shorturlSchema = new mongoose.Schema({
    shortcode: String,
    fullurl: String 
})
const shorturlmoongoose = mongoose.model('shortUrl', shorturlSchema)
export default shorturlmoongoose;