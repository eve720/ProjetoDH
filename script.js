const digitalElement = document.querySelector('.digital');
const sElement = document.querySelector('.p_s');
const mElement = document.querySelector('.p_m');
const hElement = document.querySelector('.p_h');
const mensagemElement = document.querySelector('.mensagem');

async function carregarFraseDoDia() {
    const mensagemElement = document.querySelector('.mensagem');
    
    try {

        const urlAPI = 'https://zenquotes.io/api/today';
        const resposta = await fetch(`https://corsproxy.io/?${encodeURIComponent(urlAPI)}`);
        
        if (!resposta.ok) throw new Error('Erro na rede');

        const dados = await resposta.json();
        
        const fraseOriginal = dados[0].q;
        const autor = dados[0].a;
        
        mensagemElement.innerHTML = `
    <blockquote class="citacao">
        <p>"${fraseOriginal}"</p>
        <cite>— ${autor}</cite>
    </blockquote>`;

    } catch (erro) {

        mensagemElement.innerHTML = '"Faça do dia de hoje um momento único!"';
    }
}

function updateClock() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;

    const sDeg = second * 6; 
    const mDeg = minute * 6 + second * 0.1;
    const hDeg = hour * 30 + minute * 0.5; 

    sElement.style.transform = `rotate(${sDeg}deg)`;
    mElement.style.transform = `rotate(${mDeg}deg)`;
    hElement.style.transform = `rotate(${hDeg}deg)`;

    if (hour >= 6 && hour < 12) {
        document.body.className = "dia";
    } else if (hour >= 12 && hour < 18) {
        document.body.className = "tarde";
    } else {
        document.body.className = "noite";
    }
}

function fixZero(time) {
    return time < 10 ? `0${time}` : time;
}

carregarFraseDoDia(); 
setInterval(updateClock, 1000);
updateClock();