class Character {
  constructor() {
    this._coins = parseInt(localStorage.getItem('coins')) || 100;
    this._logs = parseInt(localStorage.getItem('logs')) ||0;
    this._stone = parseInt(localStorage.getItem('stone')) || 0;
    this._woodCuttingLevel = parseInt(localStorage.getItem('woodCuttingLevel')) || 1;
    this._miningLevel = parseInt(localStorage.getItem('miningLevel')) || 1;
    this._woodCuttingXp = parseInt(localStorage.getItem('woodCuttingXp')) || 0;
    this._woodCuttingXpNeeded = Math.floor((this._woodCuttingLevel * 10) * (100 + (this._woodCuttingLevel * 10) * Math.sqrt(this._woodCuttingLevel)));
    this.clicks = 0;
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
    this.updateLevel();
    this.updateStorage();
    document.getElementById('coins').innerHTML = this._coins;
    document.getElementById('logs').innerHTML = this._logs;
  }

  updateStorage() {
    localStorage.setItem('coins', this._coins);
    localStorage.setItem('logs', this._logs);
    localStorage.setItem('stone', this._stone);
    localStorage.setItem('woodCuttingLevel', this._woodCuttingLevel);
    localStorage.setItem('miningLevel', this._miningLevel);
    localStorage.setItem('woodCuttingXp', this._woodCuttingXp);
  //  localStorage.setItem('woodCuttingXpNeeded', this._woodCuttingXpNeeded);
  }

  updateLevel() {
    if(this._woodCuttingXp >= this._woodCuttingXpNeeded && this._woodCuttingLevel < 10) {
      this._woodCuttingLevel++;
      this._woodCuttingXpNeeded = Math.floor((this._woodCuttingLevel * 10) * (100 + (this._woodCuttingLevel * 10) * Math.sqrt(this._woodCuttingLevel)));
      alert(`You leveled up to level ${this._woodCuttingLevel} woodcutting! You need ${this._woodCuttingXpNeeded} xp to level up again.`);
    }
  }

  reset() {
    localStorage.clear();
    window.location.reload (false);
  }

  sellItem(item, amount, pricePer) {
    this.clicks++;
    switch (item) {
      case 'logs':
        if(this._logs >= amount && this.clicks >= 1) {
          document.getElementById('sell1').innerHTML = 'Confirm';
          if(this.clicks === 2) {
            this._logs -= amount;
            this._coins += amount * pricePer;
            this.clicks = 0;
            document.getElementById('sell1').innerHTML = 'Sell';
            this.update();
          }
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


class ResourceGather extends Character {
  constructor() {
    super();
      this._currentlyGathering = false;
  }

  cutLog() {
    if (!(this._currentlyGathering)) {
      this._currentlyGathering = true;
      document.getElementById('cuttingWood').innerHTML = 'Chopping...';
      setTimeout(() =>  { //arrow syntax removes the scope inside of the timeout function
        this._logs += this._woodCuttingLevel; //one log per level
        this._woodCuttingXp += this._woodCuttingLevel * 10; //10 xp per log
        this._currentlyGathering = false;
        document.getElementById('cuttingWood').innerHTML = 'Cut some wood.';
        this.update();
      }, 1000);
    } else {
      alert('Already gathering.');
    }
  }
}

var player = new Character();
var resource = new ResourceGather();

player.update();
