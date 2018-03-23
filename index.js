class Character {
  constructor() {
    this._logs = 10;
    this._stone = 0;
    this._coins = 0;
  }

  get logs () {
    return this._logs;
  }

  get stone () {
    return this._stone;
  }

  get coins () {
    return this._coins;
  }

  update() {
    document.getElementById('coins').innerHTML = this._coins;
    document.getElementById('logs').innerHTML = this._logs;
  }

  sellItem(item, amount, pricePer) {
    switch (item) {
      case 'logs':
        if(this._logs >= amount && confirm('Are you sure?')) {
          this._logs -= amount;
          this._coins += amount * pricePer;
          this.update();
        } else {
          alert('Trade declined');
        }
        break;
      default:
        console.log('how did this even happen');
        break;
    }
  }
}

var player = new Character();
