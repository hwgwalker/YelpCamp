const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60c39b577660392ae4704608',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos aliquam, earum a voluptas adipisci nihil cumque dolor quo molestiae fugit consequatur fuga explicabo omnis ex nisi totam reiciendis quis eum.',
            price,
            geometry: {
                type: 'Point',
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/do5vzxvvq/image/upload/v1624638941/YelpCamp/bztj7hziuco8ln0vy2rm.jpg',
                    filename: 'YelpCamp/bztj7hziuco8ln0vy2rm'
                },
                {
                    url: 'https://res.cloudinary.com/do5vzxvvq/image/upload/v1624638941/YelpCamp/vm4pconeygr976cdfv0r.jpg',
                    filename: 'YelpCamp/vm4pconeygr976cdfv0r'
                }
            ],

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})