const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;


//middlewere
app.use(cors());
app.use(express());

//database connected

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qe1gc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();
        const database = client.db('niche_products');
        const productsCollection = database.collection('products');
        const catelogsCollection = database.collection('catelogs');
        const moreProductsCollection = database.collection('moreProducts');
        const ordersCollection = database.collection('orders');

        //get products
        app.get('/products',async(req,res)=>{
            const result = await productsCollection.find({}).toArray();
            res.send(result);
        })
        //get moreProducts
        app.get('/moreProducts',async(req,res)=>{
            const result = await moreProductsCollection.find({}).toArray();
            res.send(result);
        })
        //get catelog products
        app.get('/catelogs',async(req,res)=>{
            const result = await catelogsCollection.find({}).toArray();
            res.send(result);
        })
        //get productDetails
        app.get('/productDetails/:id',async(req,res)=>{
            const id = req.params.id;
            const result = await productsCollection.findOne({_id:ObjectId(id)});
            res.send(result);
        })
        //get productDetails
        app.get('/productDetails/:id',async(req,res)=>{
            const id = req.params.id;
            const result = await moreProductsCollection.findOne({_id:ObjectId(id)});
            res.send(result);
        })

        //addOrder
        app.post("/addOrders", async (req, res) => {
            const result = await ordersCollection.insertOne(req.body);
            res.send(result);
          });
    }
    finally{
        // await client.close();
    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello kluke baby care!')
})

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`)
})