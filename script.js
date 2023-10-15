window.addEventListener('load', function () {
  
  const diskfield = document.getElementById('diskCount')
  const diskbtn = document.getElementById('spawner')

  const delayfield = document.getElementById('delayCount')
  const delaybtn = document.getElementById('delay')

  let delayvalue = 100;
  diskbtn.addEventListener("click" , function () {
    spawnDisks();
  })

  delaybtn.addEventListener("click" , function () {
    delayvalue = delayfield.value;
  })

  const parentElement1 = document.getElementById('towerA');
  const parentElement2 = document.getElementById('towerB');
  const parentElement3 = document.getElementById('towerC');

  function spawnDisks () {

    //clean up previous disks
    while (parentElement1.firstChild) {
      parentElement1.removeChild(parentElement1.firstChild);
    }
    while (parentElement2.firstChild) {
      parentElement2.removeChild(parentElement2.firstChild);
    }
    while (parentElement3.firstChild) {
      parentElement3.removeChild(parentElement3.firstChild);
    }

    
    let count = parseInt(diskfield.value)
      for (let i=1; i<=count; i++) {
        let divElement = document.createElement('div');
        divElement.className = 'disk';
        parentElement1.appendChild(divElement);
        divElement.style.width =(40 + (count*40) - (i * 40) + 10) + 'px';
        divElement.style.bottom = ((i * 35) - 35 + 10) + 'px';
        divElement.id = i;
      }
    
  }

  





  const tower = document.getElementById('towerA');
  const disks = tower.getElementsByClassName('disk');
  let counter = 0;
  for (let i = disks.length-1; i >=0 ; i--) {
    const disk = disks[i];
    const bottom = counter * 35;
    counter++;
    const bottomPosition = bottom + 'px';
    disk.style.bottom = bottomPosition;
    console.log(bottomPosition + " " + disk.offsetWidth)
  }

  let stepcounter = 0;
  function delay() {
    return new Promise(resolve => setTimeout(resolve, delayvalue));
  }
  
  async function towerOfHanoi(diskCount, source, auxiliary, target) {
    if (diskCount == 0) 
      return;
      await towerOfHanoi(diskCount - 1, source, target, auxiliary);
      await delay();
      await moveDisk(source, target);
      await towerOfHanoi(diskCount - 1, auxiliary, source, target);
    
  }
  
  async function moveDisk(source, target) {
  let sourceTower = document.getElementById(source);
  let targetTower = document.getElementById(target);
  let disk1 = sourceTower.lastElementChild;
  let disk2 = targetTower.hasChildNodes()? targetTower.lastElementChild : 0;
  disk2 = disk2 !== null ? disk2 : 0;



  if (disk1) {
    console.log("source: " + disk1.id);
    console.log("target: " + disk2);
    let legal = (disk1.id) > (typeof disk2 === "object"? disk2.id : 0);
    console.log(legal);
    if (legal) {
      await delay();
      targetTower.appendChild(disk1);
      targetTower = document.getElementById(target);
      let towercount = targetTower.childElementCount;
      disk1.style.bottom = ((towercount * 35) - 35 + 10) + 'px';
      stepcounter++;
    }
    else {
      console.log("illegal move")
    }
  }
  }
  
  // Call the Tower of Hanoi function with initial parameters
  //;
  const btn = document.getElementById("solver");
  //btn.onclick = function() { towerOfHanoi(3, "towerA", "towerB", "towerC")};
  btn.addEventListener("click",async function() {
    var elements = document.getElementsByClassName('disk');
    await towerOfHanoi(elements.length, "towerA", "towerB", "towerC");
    console.log(stepcounter);
  });
  





})
