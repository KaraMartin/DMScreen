let dice = []

function update() {
    let parent = document.getElementById('dice')
    parent.innerHTML = ''
    for(let die of dice){
        die.update()
    }
}

class Die {
    constructor(size) {
        this.size = size
        this.value = 0
        this.index = index++
    }

    roll() {
        this.value = Math.floor(Math.random() * this.size) + 1
        update()
    }

    changeValue() {
        let input = document.getElementById(this.index)
        let value = input.value
        console.log(value)

        if(value[0] === 'd') {
            value = value.slice(1)
        }
        console.log(value)
        value = parseInt(value)
        console.log(value)
        this.size = value
    }

    toHtml() {
        let ret = document.createElement('div')
        ret.setAttribute('class', 'input-group mb-3')

        let val = document.createElement('p')
        val.innerHTML = this.value
        ret.appendChild(val)
        

        let input = document.createElement('input')
        input.value = 'd' + this.size
        input.setAttribute('id', this.index)
        input.setAttribute('class', 'input-group mb-3')
        ret.appendChild(input)

        let change = document.createElement('button')
        change.innerHTML = 'Change Size'
        change.setAttribute('onclick', 'dice[' + this.index + '].changeValue()')
        ret.appendChild(change)

        let roll = document.createElement('button')
        roll.innerHTML = 'Roll'
        roll.setAttribute('onclick', 'dice[' + this.index + '].roll()')
        ret.appendChild(roll)

        return ret
    }

    update() {
        let parent = document.getElementById('dice')
        parent.appendChild(this.toHtml())

    }


}

let index = 0

function newDie() {
    dice.push(new Die(20))
    console.log(dice)

    update()
}


