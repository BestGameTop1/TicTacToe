let message = document.getElementById('message')
let cell = document.getElementsByClassName('cell')
let currentPlayer = document.getElementById('curPlyr')
let modalTitle = document.getElementById('exampleModalLabel')
let player = "X"
let stat = {
    'X': 0,
    'O': 0,
    'D': 0
}
let winIndex = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', cellClick, false)
}
function cellClick() {

    let data = []

    if (!this.innerHTML) {
        this.innerHTML = player
    } else {
        modalTitle.textContent = 'Ячейка занята'
        message.textContent = 'Ячейка занята'
        showModal()
        return
    }

    for (let i in cell) {
        if (cell[i].innerHTML == player) {
            data.push(parseInt(cell[i].getAttribute('pos')))
        }
    }

    if (checkWin(data)) {
        stat[player] += 1
        modalTitle.textContent = 'Выграл: ' + player
        message.textContent = 'Выграл: ' + player
        restart()
    } else {
        let draw = true
        for (let i in cell) {
            if (cell[i].innerHTML == '') draw = false
        }
        if (draw) {
            stat.d += 1
            modalTitle.textContent = 'Ничья!'
            message.textContent = 'Ничья!'
            restart()
        }
    }

    player = player == "X" ? "O" : "X"
    currentPlayer.innerHTML = player.toUpperCase()
}
function checkWin(data) {
    for (let i in winIndex) {
        let win = true
        for (let j in winIndex[i]) {
            let id = winIndex[i][j]
            let ind = data.indexOf(id)

            if (ind == -1) {
                win = false
            }
        }

        if (win) return true
    }
    return false
}
function showModal() {
    $("#exampleModal").modal('show')
}
function restart(text) {

    showModal(text)
    for (let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = ''
    }
    updateStat()
}
function updateStat() {
    document.getElementById('sX').innerHTML = stat.X
    document.getElementById('sO').innerHTML = stat.O
    document.getElementById('sD').innerHTML = stat.D
}