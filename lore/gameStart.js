class Lore {
	constructor() {
		this.page = 1;
		this.pageContent = [
			'Page0',
			'While hunting in the Fepan Forest, you find a scroll buried underneath a large fir tree. The scroll is sealed with a wax press that depicts a roaring lion.',
			"Curious, you break the seal and unravel the paper. <br><br> It reads:<br> 'Hail King Artemosa, may he reign forever in Gertas and Erde! <br> His majesty hath met with his advisors and after much discussion, conferred the fief of Ultim upon Lord Gregric. <br> Lord Gregric gratefully accepted this honor and will soon depart to visit his new village.<br> His majesty is truly a noble king! May his blood always sit upon the throne of gold!' <br><br>The scroll stops there. <br> You decide to pocket the scroll for further investigation when you get back to town.",
			"After catching nothing, you head back to your cottage in Sertol Village to get a better look at the mysterious scroll you found."
		];
	}

	displayContent() {
	  document.getElementById('loreText').innerHTML = this.pageContent[this.page];
	  if (this.page === 3) {
	    document.getElementById('continueLink').innerHTML = "Continue";
	    document.getElementById('continueLink').href = "../gameHome.html";
	  }
	}

	next() {
		if (this.page < this.pageContent.length - 1) {
			this.page += 1;
			this.displayContent();
		}
	}

	back() {
		if (this.page > 1) {
			this.page -= 1;
			this.displayContent();
		}
	}
}

var lore = new Lore();
