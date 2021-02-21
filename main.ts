let inndata = 0
let elec = 0
let stddev = 0
OLED.init(128, 64)
OLED.writeStringNewLine("Legg fingrene på sensoren")
basic.pause(2000)
let std = Math.sqrt(stddev / 30)
let liste: number[] = []
basic.pause(1000)
for (let index = 0; index < 30; index++) {
    liste.push(pins.analogReadPin(AnalogPin.P1))
    elec += pins.analogReadPin(AnalogPin.P1)
}
let gjennomsnitt = Math.idiv(elec, 30)
for (let verdi3 of liste) {
    stddev += (verdi3 - gjennomsnitt) * (verdi3 - gjennomsnitt)
}
OLED.writeStringNewLine("gjennomsnitt er")
OLED.writeNumNewLine(Math.sqrt(stddev / 30))
basic.forever(function () {
    inndata = 0
    for (let index = 0; index < 5; index++) {
        inndata += pins.analogReadPin(AnalogPin.P1)
        basic.pause(500)
    }
    if (Math.idiv(inndata, 5) >= gjennomsnitt + std) {
        OLED.writeStringNewLine("inndata over nivå")
        OLED.writeNumNewLine(Math.idiv(inndata, 5))
        basic.showIcon(IconNames.No)
        basic.pause(1000)
        basic.clearScreen()
    } else {
        OLED.writeNumNewLine(Math.idiv(inndata, 5))
        basic.showIcon(IconNames.Yes)
        basic.pause(1000)
        basic.clearScreen()
    }
})
