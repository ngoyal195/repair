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

const files = document.getElementById("photos").files

let photoLinks = []

for(let file of files){

const formData = new FormData()
formData.append("file", file)
formData.append("upload_preset", "YOUR_UPLOAD_PRESET")

const response = await fetch(
"https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
{
method:"POST",
body:formData
})

const data = await response.json()

photoLinks.push(data.secure_url)

}

const params = {

ticket_id: ticket,
name: document.getElementById("name").value,
phone: document.getElementById("phone").value,
email: document.getElementById("email").value,
bag_type: document.getElementById("bag_type").value,
warranty: document.getElementById("warranty").value,
balance: document.getElementById("balance").value,
issue: document.getElementById("issue").value,
photos: photoLinks.join("\n")

}

emailjs.send(
"service_chf6h93",
"template_dr655gw",
params
)

.then(function(){

alert("Repair ticket submitted successfully.\nTicket ID: " + ticket)

document.getElementById("repairForm").reset()

})

})
