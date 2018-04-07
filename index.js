class Character {
  constructor() {

    // INVENTORY
    this._coins = parseInt(localStorage.getItem('coins')) || 0;
    this._logs = parseInt(localStorage.getItem('logs')) ||0;
    this._fish = parseInt(localStorage.getItem('fish')) || 0;
    this._bait = parseInt(localStorage.getItem('bait')) || 0;
    this._hasFishingRod = localStorage.getItem('fishingRod') || 'false';

    // WOODCUTTING
    this._woodCuttingLevel = parseInt(localStorage.getItem('woodCuttingLevel')) || 1;
    this._woodCuttingXp = parseInt(localStorage.getItem('woodCuttingXp')) || 0;
    this._woodCuttingXpNeeded = Math.floor((this._woodCuttingLevel * 10) * (100 + (this._woodCuttingLevel * 10) * Math.sqrt(this._woodCuttingLevel)));
    this._totalLogsChopped = parseInt(localStorage.getItem('totalLogsChopped')) || 0;

    // FISHING
    this._fishingLevel = parseInt(localStorage.getItem('fishingLevel')) || 1;
    this._fishingXp = parseInt(localStorage.getItem('fishingXp')) || 0;
    this._fishingXpNeeded = Math.floor((this._fishingLevel * 10) * (100 + (this._fishingLevel * 10) * Math.sqrt(this._fishingLevel)));
    this._totalFishCaught = parseInt(localStorage.getItem('totalFishCaught')) || 0;

    // COMBAT
    this._attackLevel = parseInt(localStorage.getItem('attackLevel')) || 1;
    this._attackXp = parseInt(localStorage.getItem('attackXp')) || 0;

    // OTHER
    this._totalCoinsGained = parseInt(localStorage.getItem('totalCoinsGained')) || 0;
  }

  get logs () {
    return this._logs;
  }

  get fish () {
    return this._fish;
  }

  get coins () {
    return this._coins;
  }

  update() {
    this.updateLevel();
    this.updateStorage();
    document.getElementById('coins').innerHTML = this._coins;
    document.getElementById('logs').innerHTML = this._logs;
    document.getElementById('fish').innerHTML = this._fish;
    document.getElementById('bait').innerHTML = this._bait;
  }

  updateStorage() {
    localStorage.setItem('coins', this._coins);
    localStorage.setItem('logs', this._logs);
    localStorage.setItem('fish', this._fish);
    localStorage.setItem('bait', this._bait);
    localStorage.setItem('woodCuttingLevel', this._woodCuttingLevel);
    localStorage.setItem('fishingLevel', this._fishingLevel);
    localStorage.setItem('fishingXp', this._fishingXp);
    localStorage.setItem('woodCuttingXp', this._woodCuttingXp);
    localStorage.setItem('totalCoinsGained', this._totalCoinsGained);
    localStorage.setItem('totalLogsChopped', this._totalLogsChopped);
    localStorage.setItem('totalFishCaught', this._totalFishCaught);
    localStorage.setItem('fishingRod', this._hasFishingRod);
    localStorage.setItem('attackLevel', this._attackLevel);
    localStorage.setItem('attackXp', this._attackXp);
  }

  updateLevel() {
    if(this._woodCuttingXp >= this._woodCuttingXpNeeded && this._woodCuttingLevel < 10) {
      this._woodCuttingLevel++;
      this._woodCuttingXpNeeded = Math.floor((this._woodCuttingLevel * 10) * (100 + (this._woodCuttingLevel * 10) * Math.sqrt(this._woodCuttingLevel)));
      alert(`You leveled up to level ${this._woodCuttingLevel} woodcutting! You need ${this._woodCuttingXpNeeded - this._woodCuttingXp} xp to level up again.`);
    }
    if(this._fishingXp >= this._fishingXpNeeded && this._fishingLevel < 10) {
      this._fishingLevel++;
      this._fishingXpNeeded = Math.floor((this._fishingLevel * 10) * (100 + (this._fishingLevel * 10) * Math.sqrt(this._fishingLevel)));
      alert(`You leveled up to level ${this._fishingLevel} fishing! You need ${this._fishingXpNeeded - this._fishingXp} xp to level up again.`);
    }
  }

  reset() {
    if(confirm('Are you sure? This is not reversable.')) {
      localStorage.clear();
      window.location.reload (false);
    }
  }
}

class Market extends Character {
  constructor() {
    super();
    this._quantity = 10;
    this.clicks = 0;
  }

  get quantity() {
    return this._quantity;
  }

  updateQuantity() {
    document.getElementById('quantity1').innerHTML = ` ${this._quantity} `;
    document.getElementById('quantity2').innerHTML = ` ${this._quantity} `;
  }

  sellItem(item, pricePer) {
    this.clicks++;
    switch (item) {
      case 'logs':
        if(this._logs >= this._quantity && this.clicks >= 1) {
          if(this._quantity % 10 === 0) {
            document.getElementById('sell1').innerHTML = 'Confirm';
            if(this.clicks === 2) {
              this._logs -= this._quantity;
              this._coins += this._quantity * pricePer;
              this._totalCoinsGained += this._quantity * pricePer;
              this.clicks = 0;
              document.getElementById('sell1').innerHTML = 'Sell';
              this.update();
            }
          } else {
            alert('Logs can only be sold in bundles of 10');
          }
        } else {
          alert('Trade declined');
        }
        break;
      case 'fish':
        if(this._fish >= this._quantity && this.clicks >= 1) {
          document.getElementById('sell2').innerHTML = 'Confirm';
          if(this.clicks === 2) {
            this._fish -= this._quantity;
            this._coins += this._quantity * pricePer;
            this._totalCoinsGained += this._quantity * pricePer;
            this.clicks = 0;
            document.getElementById('sell2').innerHTML = 'Sell';
            this.update();
          }
        } else {
          alert('Trade declined');
        }
        break;
    }
  }

  buyItem(item, amount, pricePer) {
    this.clicks++;
    switch(item) {
      case 'bait':
        if(this._coins >= pricePer * amount && this.clicks >= 1) {
          document.getElementById('buy1').innerHTML = 'Confirm';
          if(this.clicks === 2) {
            this._bait += amount;
            this._coins -= amount * pricePer;
            this.clicks = 0;
            document.getElementById('buy1').innerHTML = 'Buy';
            this.update();
          }
        } else {
          alert('Trade declined');
        }
        break;
      case 'fishingRod':
        if(this._coins >= pricePer * amount && this.clicks >= 1 && this._hasFishingRod === 'false') {
          document.getElementById('buy2').innerHTML = 'Confirm';
          if(this.clicks === 2) {
            this._hasFishingRod = 'true';
            this._coins -= amount * pricePer;
            this.clicks = 0;
            document.getElementById('buy2').innerHTML = 'Buy';
            console.log(this._hasFishingRod);
            this.update();
          }
        } else {
          alert('Trade declined');
        }
        break;
    }
  }

  changeQuantity(quantity) {
    if (!(isNaN(quantity)) && quantity !== null) {
      this._quantity = parseInt(quantity);
      console.log(this._quantity);
      this.updateQuantity();
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
        this._totalLogsChopped += this._woodCuttingLevel;
        this._woodCuttingXp += this._woodCuttingLevel * 10; //10 xp per log
        this._currentlyGathering = false;
        document.getElementById('cuttingWood').innerHTML = 'Cut some wood.';
        this.update();
      }, 1000);
    } else {
      alert('Already gathering.');
    }
  }

  goFish() {
    if(!(this._currentlyGathering)) {
      if(this._hasFishingRod === 'true') {
        if(this._bait >= 1) {
          this._currentlyGathering = true;
          document.getElementById('goFishing').innerHTML = 'Fishing...';
          var baitLostNumber = Math.floor(Math.random()*100 + 1);
          var baitLostChance = 22 - (this._fishingLevel * 2);
          setTimeout(() => {
            if(baitLostNumber > baitLostChance) {
              this._bait--;
              this._fish++;
              this._totalFishCaught++;
              this._fishingXp += 100;
            } else {
              this._bait--;
              alert('The fish took your bait');
            }
            this.update();
            this._currentlyGathering = false;
            document.getElementById('goFishing').innerHTML = 'Go fishing.';
          }, 7600 - this._fishingLevel * 100);
        } else {
          alert('You have no bait.');
        }
      } else {
        alert('You need a fishing rod.');
      }
    } else {
      alert('Already gathering.');
    }
  }
}

class Arena extends Character {
  constructor() {
    super();
    this.player = {
      maxHit: this._attackLevel + 2, //base of 3 max hit max of 12
      chanceToHit: 75 + 1 + (this._attackLevel * 2), //75% base hit chance + double attackLevel
      maxHP: 10,
      currentHP: 10
    }
    this.enemy = {
      maxHit: parseInt(localStorage.getItem('enemyMaxHit')) || 0,
      maxHP: parseInt(localStorage.getItem('enemyMaxHP')) || 0,
      currentHP: parseInt(localStorage.getItem('enemyCurrentHP')) || 0,
      hasEnemy: localStorage.getItem('hasEnemy') || false
    }
  }

  updateCombatDisplay() {
    this.updateEnemyStorage();
    document.getElementById('playerHP').innerHTML = this.player.currentHP;
    document.getElementById('enemyHP').innerHTML = this.enemy.currentHP;
  }

  updateEnemyStorage() {
    localStorage.setItem('enemyMaxHit', this.enemy.maxHit);
    localStorage.setItem('enemyMaxHP', this.enemy.maxHP);
    localStorage.setItem('enemyCurrentHP', this.enemy.currentHP);
    localStorage.setItem('hasEnemy', this.enemy.hasEnemy);
  }

  newEnemy() {
    if(!this.enemy.hasEnemy || this.enemy.hasEnemy === 'false') {
      this.enemy.maxHit = this._attackLevel + Math.floor(Math.random() * 3 + 1);
      this.enemy.maxHP = Math.floor(Math.random() * 10 + 10 + this._attackLevel);
      this.enemy.currentHP = this.enemy.maxHP;
      this.enemy.hasEnemy = true;
      console.log(this.enemy.maxHP);
      this.updateCombatDisplay();
    } else {
      alert('You already have an enemy!');
    }
  }

  attack() {
    if (this.player.currentHP > 0 && this.enemy.hasEnemy) {
      var hitRoll = Math.floor(Math.random() * 100 + 1);
      var damage = Math.floor(Math.random() * this.player.maxHit + 1);
      if (hitRoll < this.player.chanceToHit) {
      this.enemy.currentHP -= damage;
        var hitOrMiss = 'hit';
        if (this.enemy.currentHP <= 0) {
          this.enemy.currentHP = 0;
          this.enemy.hasEnemy = false;
          this._coins += 100;
          this.update();
        }
      } else {
        var hitOrMiss = 'missed';
        var damage = 0;
      }
      this.updateCombatDisplay();
      document.getElementById('playerCombatDescription').innerHTML = `You ${hitOrMiss} and did ${damage} damage to the enemy.`;
      this.enemyAttack();
    }
  }

  rest() {
    var regainedHP = Math.floor(Math.random() * 10);
    if (this.player.currentHP >= 0 && this.player.currentHP <= this.player.maxHP) {
      this.player.currentHP += regainedHP;
      if (this.player.currentHP > this.player.maxHP) {
        this.player.currentHP = this.player.maxHP;
      }
      this.updateCombatDisplay();
              document.getElementById('playerCombatDescription').innerHTML = 'You regained some health.'
      if (this.enemy.hasEnemy) {
        this.enemyAttack();
    }
  }
  }

  enemyAttack() {
    var hitRoll = Math.floor(Math.random() * 100 + 1);
    var damage = Math.floor(Math.random() * this.enemy.maxHit + 1);
    if (hitRoll < this.player.chanceToHit) {
      this.player.currentHP -= damage;
      var hitOrMiss = 'hit';
      if(this.player.currentHP <= 0) {
        this.player.currentHP = this.player.maxHP;
        this._coins = 0;
        this.enemy.hasEnemy = false;
        this.newEnemy();
        this.update();
        alert('You died and lost all your coins.');
      }
    } else {
      var hitOrMiss = 'missed';
      var damage = 0;
    }
    this.updateCombatDisplay();
    document.getElementById('enemyCombatDescription').innerHTML =  `The enemy ${hitOrMiss} and did ${damage} damage to you.`;
  }

}

class PlayerStats extends Character {
  constructor() {
    super();
  }

  updateStats() {
    document.getElementById('totalCoinsGained').innerHTML = this._totalCoinsGained;
    document.getElementById('totalLogsChopped').innerHTML = this._totalLogsChopped;
    document.getElementById('totalFishCaught').innerHTML = this._totalFishCaught;
    document.getElementById('woodCuttingLevel').innerHTML = this._woodCuttingLevel;
    document.getElementById('woodCuttingXp').innerHTML = this._woodCuttingXp;
    document.getElementById('woodCuttingXpNeeded').innerHTML = this._woodCuttingXpNeeded;
    document.getElementById('fishingLevel').innerHTML = this._fishingLevel;
    document.getElementById('fishingXp').innerHTML = this._fishingXp;
    document.getElementById('fishingXpNeeded').innerHTML = this._fishingXpNeeded;
  }
}

var player = new Character();
var market = new Market();
var resource = new ResourceGather();
var playerStats = new PlayerStats();
var combat = new Arena();

player.update();
