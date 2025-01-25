let isSpinning = false;

const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const start = document.getElementById('start');

let point = document.querySelector('.point');

let point1 = 100;

function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

function updateSlot(slot, duration) {
    let counter = 0;
    const interval = setInterval(() => {
        slot.textContent = getRandomNumber();
        counter++;
        
        if (counter >= duration) {
            clearInterval(interval);
        }
    }, 50);
    
    return interval;
}

function spin() {
    if (isSpinning) return;

    point1 -= 10;
    point.innerHTML = `${point1}`;
    
    isSpinning = true;
    start.disabled = true;
    
    // 각 슬롯마다 다른 지속 시간을 설정하여 순차적으로 멈추도록 함
    const slot1Interval = updateSlot(slot1, 10);
    const slot2Interval = updateSlot(slot2, 20);
    const slot3Interval = updateSlot(slot3, 30);
    
    // 마지막 슬롯이 멈춘 후 버튼 활성화
    setTimeout(() => {
        clearInterval(slot1Interval);
        clearInterval(slot2Interval);
        clearInterval(slot3Interval);
        
        isSpinning = false;
        start.disabled = false;
        
        // 결과 확인
        checkResult();
    }, 1510);
}

function checkResult() {
    const num1 = parseInt(slot1.textContent);
    const num2 = parseInt(slot2.textContent);
    const num3 = parseInt(slot3.textContent);
    
    if (num1 == num2 && num2 == num3) 
    {
        alert('축하합니다! 잭팟입니다!\n500원 획득!');
        point1 += 500;
    } 
    else if (num1 == num2 || num2 == num3 || num1 == num3) 
    {
        alert('축하합니다! 2개 숫자가 일치했습니다!\n50원 획득!');
        point1 += 50;
    }
    else{
        alert('아쉽게도 꽝입니다!\n획득 없음');
    }

    point.innerHTML = `${point1}`;
    
    if(point1 < 0){
        alert('파산!!!!\n(F5를 눌러 다시 시도하세요)')
    }
    else if(point1 == 1000){
        alert('성공!!!!\n(F5를 눌러 다시 시도하세요)')
    }
    
}

start.addEventListener('click', spin);
