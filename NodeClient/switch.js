var rpio = require('rpio');
var isOn = false;
rpio.open(16, rpio.INPUT, rpio.PULL_DOWN);

function pollcb(pin)
{
        var state = rpio.read(pin) ? 'pressed': 'released';
        console.log('Button event on P%d', pin);
        this.isOn = !this.isOn;
        if(this.isOn)
        {
                rpio.open(15, rpio.OUTPUT, rpio.LOW);
        } else
        {
                rpio.open(15, rpio.OUTPUT, rpio.HIGH);
        }
}
//rpio.open(3, rpio.OUTPUT, rpio.LOW);
rpio.poll(16, pollcb);
