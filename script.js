function generateTicket(){

const now = new Date()

const year = now.getFullYear()
const month = String(now.getMonth()+1).padStart(2,'0')
const day = String(now.getDate()).padStart(2,'0')

const hour = String(now.getHours()).padStart(2,'0')
const min = String(now.getMinutes()).padStart(2,'0')
const sec = String(now.getSeconds()).padStart(2,'0')

const random = Math.floor(Math.random()*900)+100

return `GMN-${year}${month}${day}-${hour}${min}${sec}-${random}`

}

const ticket = generateTicket()
document.getElementById("ticket").innerText = ticket


document.getElementById("repairForm").addEventListener("submit", async function(e){

e.preventDefault()

const submitBtn = document.querySelector("button[type='submit']")
submitBtn.innerText = "Uploading Photos..."
submitBtn.disabled = true

const files = document.getElementById("photos").files

let uploadedImages = []

try{

for(let file of files){

const formData = new FormData()

formData.append("file", file)
formData.append("upload_preset", "repair_uploads")

const response = await fetch(
"https://api.cloudinary.com/v1_1/dipiqms7v/image/upload",
{
method: "POST",
body: formData
})

const data = await response.json()

uploadedImages.push(data.secure_url)

}


// placeholder to avoid broken email images
const placeholder = "https://via.placeholder.com/1"


const params = {

ticket_id: ticket,

name: document.getElementById("name").value,
phone: document.getElementById("phone").value,
email: document.getElementById("email").value,

bag_type: document.getElementById("bag_type").value,
warranty: document.getElementById("warranty").value,

balance: document.getElementById("balance").value,
issue: document.getElementById("issue").value,

photo1: uploadedImages[0] || placeholder,
photo2: uploadedImages[1] || placeholder,
photo3: uploadedImages[2] || placeholder

}


submitBtn.innerText = "Sending Email..."

await emailjs.send(
"service_chf6h93",
"template_dr655gw",
params
)
await fetch("https://script.google.com/macros/s/AKfycby0RMZJJK3BCiRVvAx48gcIQppC4dZZxzt6MfJWQiiPn1ct0VKa1yNR93OwyvGh_aQl/exec", {

method: "POST",

mode: "no-cors",

headers: {
"Content-Type": "application/x-www-form-urlencoded"
},

body: new URLSearchParams({
action: "add",
  
ticket_id: params.ticket_id,
name: params.name,
phone: params.phone,
email: params.email,
bag_type: params.bag_type,
warranty: params.warranty,
balance: params.balance,
issue: params.issue,
photo1: params.photo1,
photo2: params.photo2,
photo3: params.photo3
})

})

alert("Repair ticket submitted successfully.\nTicket ID: " + ticket)

document.getElementById("repairForm").reset()

submitBtn.innerText = "Submit Repair Request"
submitBtn.disabled = false


}catch(error){

console.error(error)

alert("Something went wrong while submitting the repair request.")

submitBtn.innerText = "Submit Repair Request"
submitBtn.disabled = false

}

})
