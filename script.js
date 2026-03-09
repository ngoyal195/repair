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

document.getElementById("repairForm").addEventListener("submit", function(e){

e.preventDefault()

const params = {

ticket_id: ticket,
name: document.getElementById("name").value,
phone: document.getElementById("phone").value,
email: document.getElementById("email").value,
bag_type: document.getElementById("bagType").value,
warranty: document.getElementById("warranty").value,
balance: document.getElementById("balance").value,
issue: document.getElementById("issue").value

}

emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",params)
.then(function(){

alert("Repair ticket submitted successfully.\nTicket ID: " + ticket)

})

})
