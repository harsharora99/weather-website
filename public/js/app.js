console.log("Client side javascript file is loaded which runs in the browser")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//              console.log(data.error)     
//         }
//         else {
//             console.log(data.location,data.forecast)   
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  //prevents from reloading the page which is default behaviour of submit form
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent=""
    //console.log(location)

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})