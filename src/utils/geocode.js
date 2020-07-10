const request=require('request')

// const geocode = (address, callback) => {
//         const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiaGRzaW5naGFyb3JhOTkiLCJhIjoiY2tjY2E0d2s4MDJveTJ4cDIxank0MTZmbyJ9.IBJPQmsiqyu1iLK8hLrAOw&limit=1';
//         request({
//                 url: url,
//                 json: true
//             }, (error, response) => {
//                 if (error) {
//                     callback('Unable to connect to location services!', undefined)
//                 } else if (response.body.features.length === 0) {
//                     callback('Unable to find location.Try another search')
//                 } else {
//                     callback(undefined, {
//                             latitude: response.body.features[0].center[1],
//                             longitude: response.body.features[0].center[0],
//                             location: response.body.features[0].place_name
//                         })
//                     }
//                 })
// }

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiaGRzaW5naGFyb3JhOTkiLCJhIjoiY2tjY2E0d2s4MDJveTJ4cDIxank0MTZmbyJ9.IBJPQmsiqyu1iLK8hLrAOw&limit=1';
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.Try another search')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

// geocode('Delhi', (error, data) => {
//     console.log('Error:', error)
//     console.log('Data:', data)
// })

module.exports=geocode