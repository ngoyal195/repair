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
document.getElementById("ticketInput").value = ticket


document.getElementById("repairForm").addEventListener("submit", function(e){

e.preventDefault()

emailjs.sendForm(
"service_chf6h93",
"template_dr655gw",
this
).then(function(){

alert("Repair ticket submitted successfully.\nTicket ID: " + ticket)

document.getElementById("repairForm").reset()

})

})
