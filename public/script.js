const nameInput = document.getElementById('accName')
const balInput = document.getElementById('accDep')
const mainContainer = document.getElementById('accounts-main')
const submitBtn = document.getElementById('submit')
const backendUrl = "http://localhost:3000/api/accounts"

function createCard(data){
    const newBox = document.createElement("div")
    newBox.innerHTML = `
        <h3>Account Holder: ${data.name}</h3>
        <h3>Balance: <span class="balance-display">${data.balance}</span></h3>
        <div class="inputArea">
            <input type="number" class="userAmt">
            <button class="withdraw-btn">withdraw</button>
            <button class="deposit-btn">deposit</button>
        </div>
        <button class="delete-btn">Delete Account</button>
    `
    const balanceDisplay = newBox.querySelector('.balance-display')
    const amtInput = newBox.querySelector(".userAmt")
    const withdrawBtn = newBox.querySelector(".withdraw-btn")
    const depositBtn = newBox.querySelector(".deposit-btn")
    withdrawBtn.addEventListener("click", async function(){
        const amount = Number(amtInput.value)
        if (amtInput.value.trim() === "" || Number.isNaN(amount) || amount <= 0) {
            alert("Please enter a valid positive number.")
            return
        }
        try{
            const response = await fetch(`${backendUrl}/withdraw/${data.id}`,
                { 
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ withdraw: amount})
                }
            )
            if(response.ok){
                const updatedData = await response.json()
                console.log(updatedData)
                balanceDisplay.textContent = updatedData.balance
                amtInput.value = ""
            }
            else{
                const errorMsg = await response.json()
                console.log(errorMsg)
                alert("Withdrawn amt more than balance")
            }
        } catch(error){
            console.log("Error withdrawing: ", error)
        }
    })
    depositBtn.addEventListener("click", async function(){
        const amount = Number(amtInput.value)
        if (amtInput.value.trim() === "" || Number.isNaN(amount) || amount <= 0) {
            alert("Please enter a valid positive number.")
            return
        }
        try{
            const response = await fetch(`${backendUrl}/deposit/${data.id}`,
                { 
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ deposit: amount})
                }
            )
            if(response.ok){
                const updatedData = await response.json()
                balanceDisplay.textContent = updatedData.balance
                amtInput.value = ""
            }
        } catch(error){
            console.log("Error depositing: ", error)
        }
    })
    const deleteBtn = newBox.querySelector(".delete-btn")
    deleteBtn.addEventListener("click", async function() {
        try {
            const response = await fetch(`${backendUrl}/${data.id}`, {
                method: "DELETE"
            })

            if (response.ok) {
                newBox.remove()
            } else {
                alert("Server error: Could not delete the item")
            }
        } catch (error) {
                console.error("Network connection failed:", error)
        }
    })

    return newBox

}

async function loadListings() {
    try {
        const response = await fetch(backendUrl);
        if (response.ok) {
            const text = await response.text(); 
            mainContainer.innerHTML = "";
            try {
                const accounts = JSON.parse(text);
                if (Array.isArray(accounts) && accounts.length > 0) {
                    accounts.forEach(item => {
                        const card = createCard(item);
                        mainContainer.appendChild(card);
                    });
                } else {
                    mainContainer.innerHTML = "<p>No accounts found.</p>";
                }
            } catch {
                
            }
        }
    } catch (error) {
        console.error("Failed to load items:", error);
    }
}
window.addEventListener("DOMContentLoaded", loadListings)

submitBtn.addEventListener("click", async function() {
    const accName = nameInput.value
    if (accName.trim() === "") {
        alert("Please enter account holder's name")
        return
    }
    const balance = Number(balInput.value)
    if (balance === "" || Number.isNaN(balance) || balance < 0) {
        alert("Please enter a positive number.")
        return
    }
    try {
        const response = await fetch(backendUrl, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: accName,
                deposit: balance 
            })
        })
        const data = await response.json()

        if (response.ok) {
            const card = createCard(data)
            mainContainer.appendChild(card)
            nameInput.value = ""
            balInput.value = ""
        } else {
            alert("Server error: Could not save the item")
        }
    }catch (error) {
        console.error("Network connection failed:", error)
    }
})