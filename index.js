let appleImg = "url(images/apple.png)"
let cherryImg = "url(images/cherry.png)"
let pearImg = "url(images/pear.png)"
let watermelonImg = "url(images/watermelon.png)"
let sevenImg = "url(images/seven.png)"

let unlocked = "url(images/unlocked.png)"
let locked = "url(images/locked.png)"

let currentBet = 1

let totalMoney = 15
document.getElementById("total-money").innerHTML = totalMoney

let lockedAnyLastRound = true

let locked1LastRound = false
let locked2LastRound = false
let locked3LastRound = false
let locked4LastRound = false

let slot1Locked = false
let slot2Locked = false
let slot3Locked = false
let slot4Locked = false

let slot1Random = 0
let slot2Random = 0
let slot3Random = 0
let slot4Random = 0

function changeBetTo1() {
    currentBet = 1
    document.getElementById("current-bet").innerHTML = currentBet
}

function changeBetTo2() {
    currentBet = 2
    document.getElementById("current-bet").innerHTML = currentBet
}

function changeBetTo3() {
    currentBet = 3
    document.getElementById("current-bet").innerHTML = currentBet
}

function lock(slotNumber) {

    if (lockedAnyLastRound) {
        return
    }

    if (slotNumber == 1) {
        if (! slot1Locked) {
            slot1Locked = true
            locked1LastRound = true
            document.getElementById(`slot-${slotNumber}-lock`).style.backgroundImage = locked
        } else {
            slot1Locked = false
            locked1LastRound = false
            document.getElementById(`slot-${slotNumber}-lock`).style.backgroundImage = unlocked
        }
    }

    if (slotNumber == 2) {
        if (! slot2Locked) {
            slot2Locked = true
            locked2LastRound = true
            document.getElementById(`slot-${slotNumber}-lock`).style.backgroundImage = locked
        } else {
            slot2Locked = false
            locked2LastRound = false
            document.getElementById(`slot-${slotNumber}-lock`).style.backgroundImage = unlocked
        }
    }

    if (slotNumber == 3) {
        if (! slot3Locked) {
            slot3Locked = true
            locked3LastRound = true
            document.getElementById(`slot-${slotNumber}-lock`).style.backgroundImage = locked
        } else {
            slot3Locked = false
            locked3LastRound = false
            document.getElementById(`slot-${slotNumber}-lock`).style.backgroundImage = unlocked
        }
    }

    if (slotNumber == 4) {
        if (! slot4Locked) {
            slot4Locked = true
            locked4LastRound = true
            document.getElementById(`slot-${slotNumber}-lock`).style.backgroundImage = locked
        } else {
            slot4Locked = false
            locked4LastRound = false
            document.getElementById(`slot-${slotNumber}-lock`).style.backgroundImage = unlocked
        }
    }
}

function changeSlot(slotNumber, image) {
    if (image == 0) {
        document.getElementById(`slot-${slotNumber}`).style.backgroundImage = appleImg
    }
    
    if (image == 1) {
        document.getElementById(`slot-${slotNumber}`).style.backgroundImage = pearImg
    }

    if (image == 2) {
        document.getElementById(`slot-${slotNumber}`).style.backgroundImage = cherryImg
    }

    if (image == 3) {
        document.getElementById(`slot-${slotNumber}`).style.backgroundImage = watermelonImg
    }

    if (image == 4) {
        document.getElementById(`slot-${slotNumber}`).style.backgroundImage = sevenImg
    }
}

function unlockAll() {
    lockedAnyLastRound = false

    slot1Locked = false
    slot2Locked = false
    slot3Locked = false
    slot4Locked = false

    locked1LastRound = false
    locked2LastRound = false
    locked3LastRound = false
    locked4LastRound = false

    document.getElementById("slot-1-lock").style.backgroundImage = unlocked
    document.getElementById("slot-2-lock").style.backgroundImage = unlocked
    document.getElementById("slot-3-lock").style.backgroundImage = unlocked
    document.getElementById("slot-4-lock").style.backgroundImage = unlocked
}

function play() {

    if (totalMoney < currentBet) {
        return;
    }

    totalMoney -= currentBet

    if (locked1LastRound || locked2LastRound || locked3LastRound || locked4LastRound) {
        locked1LastRound = false
        locked2LastRound = false
        locked3LastRound = false
        locked4LastRound = false
        lockedAnyLastRound = true
    } else {
        unlockAll()
    }

    if (! slot1Locked) {
        slot1Random = Math.round(Math.random() * 4)
        changeSlot(1, slot1Random)
    }

    if (! slot2Locked) {
        slot2Random = Math.round(Math.random() * 4)
        changeSlot(2, slot2Random)
    }

    if (! slot3Locked) {
        slot3Random = Math.round(Math.random() * 4)
        changeSlot(3, slot3Random)
    }

    if (! slot4Locked) {
        slot4Random = Math.round(Math.random() * 4)
        changeSlot(4, slot4Random)
    }



    calculateWinnings(slot1Random, slot2Random, slot3Random, slot4Random)
    displayMoney()
}

function calculateWinnings(slot1, slot2, slot3, slot4) {
    // 0 = apple, 1 = pear, 2 = cherry, 3 = watermelon, 4 = 7

    const slots = [slot1, slot2, slot3, slot4]
    const counts = {};

    for (const num of slots) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    if (counts[0] == 4) {
        totalMoney += currentBet * 6
    }
    
    if (counts[1] == 4) {
        totalMoney += currentBet * 4
    }

    if (counts[2] == 4) {
        totalMoney += currentBet * 3
    }

    if (counts[3] == 4) {
        totalMoney += currentBet * 5
    }

    if (counts[4] == 4) {
        totalMoney += currentBet * 10
    }

    else if (counts[4] == 3) {
        totalMoney += currentBet * 5
    }

}

function displayMoney() {
    document.getElementById("total-money").innerHTML = totalMoney
}