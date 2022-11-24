//sk_test_51M6FegCaNncNRc2fEN2nzc9N0cpo14Km4dXPHR0mSv2Qin0HAhrrqZh0sAhL77nx9FcXzjb5IeAs1TIRSM7TlzEj00GAj7WpsG

//coffee: price_1M6FmBCaNncNRc2fXg3dE5By
//sunglass: price_1M6FnGCaNncNRc2fxo0DWVMB
//camera= price_1M6FoDCaNncNRc2fHwipe1jg
const express = require('express');
var cors = require('cors');
//const { default: Stripe } = require('stripe');
const stripe = require ('stripe')('sk_test_51M6FegCaNncNRc2fEN2nzc9N0cpo14Km4dXPHR0mSv2Qin0HAhrrqZh0sAhL77nx9FcXzjb5IeAs1TIRSM7TlzEj00GAj7WpsG');

const app= express();
app.use(cors());
app.use(express.static("public"))
app.use(express.json());

app.post('/checkout', async(req,res)=>{
     
    const items = req.body.items;
        let lineItems =[];
        items.forEach((item)=>{
            lineItems.push(
                {
                    price: item.id,
                    quantity: item.quantity
                }
            )
        });

        const session = await stripe.checkout.sessions.create({
            line_items:lineItems,
            mode:'payment',
            success_url:"http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });
        res.send(JSON.stringify({
            url:session.url
        }))


});
app.listen(4000, ()=> console.log('listening ...'));