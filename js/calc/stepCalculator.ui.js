// 동적 확장형 보험료 계산기 UI/이벤트/애니메이션
import { steps, getStepIndex } from './stepCalculator.js';

export function renderStepCalculator(containerSelector, onComplete) {
  const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
  if (!container) return;
  container.innerHTML = '';

  // 진행바
  const progressBar = document.createElement('div');
  progressBar.className = 'step-progress-bar';
  container.appendChild(progressBar);

  const jobOptions = [
    { value: 'office', label: '사무직', icon: 'fa-user-tie' },
    { value: 'worker', label: '생산직', icon: 'fa-hard-hat' },
    { value: 'self', label: '자영업', icon: 'fa-store' },
    { value: 'medical', label: '의료', icon: 'fa-user-nurse' },
    { value: 'education', label: '교육', icon: 'fa-chalkboard-teacher' },
    { value: 'it', label: 'IT', icon: 'fa-laptop-code' },
    { value: 'student', label: '학생', icon: 'fa-user-graduate' },
    { value: 'unemployed', label: '무직', icon: 'fa-user-slash' },
    { value: 'other', label: '기타', icon: 'fa-ellipsis-h' }
  ];

  // 스텝 정의
  const steps = [
    {
      label: '생년월일',
      icon: 'fa-cake-candles',
      input: (stepIdx, onNext) => {
        const wrap = document.createElement('div');
        wrap.className = 'step-calc-card active';
        wrap.innerHTML = `
          <div class='step-calc-header'><i class='fas fa-cake-candles'></i> 생년월일</div>
          <div class='step-calc-body'>
            <div class='input-icon-wrap'>
              <i class='fas fa-calendar-alt input-icon'></i>
              <input type='text' class='step-input' maxlength='8' pattern='\\d{8}' placeholder='예: 19990101' autofocus style='font-size:1.2em;text-align:center;letter-spacing:2px;'>
            </div>
            <div class='input-hint'>8자리 숫자(YYYYMMDD)로 입력<br><span class='birth-valid-msg'></span></div>
          </div>
        `;
        const input = wrap.querySelector('input');
        const validMsg = wrap.querySelector('.birth-valid-msg');
        input.addEventListener('input', e => {
          input.value = input.value.replace(/[^0-9]/g, '').slice(0,8);
          if (input.value.length === 8) {
            // 간단한 유효성(1900~2025년)
            const year = +input.value.slice(0,4);
            const month = +input.value.slice(4,6);
            const day = +input.value.slice(6,8);
            if (year < 1900 || year > 2025 || month < 1 || month > 12 || day < 1 || day > 31) {
              validMsg.textContent = '올바른 생년월일을 입력하세요';
              input.classList.add('input-error');
              return;
            } else {
              validMsg.textContent = '';
              input.classList.remove('input-error');
            }
            wrap.classList.add('step-animate-out');
            setTimeout(() => onNext(input.value), 350);
          } else {
            validMsg.textContent = '';
            input.classList.remove('input-error');
          }
        });
        return wrap;
      }
    },
    {
      label: '성별',
      icon: 'fa-venus-mars',
      input: (stepIdx, onNext) => {
        const wrap = document.createElement('div');
        wrap.className = 'step-calc-card active';
        wrap.innerHTML = `
          <div class='step-calc-header'><i class='fas fa-venus-mars'></i> 성별</div>
          <div class='step-calc-body single-row'>
            <button class='step-btn' data-value='male'>남성</button>
            <button class='step-btn' data-value='female'>여성</button>
          </div>
        `;
        wrap.querySelectorAll('.step-btn').forEach(btn => {
          btn.onclick = () => {
            wrap.querySelectorAll('.step-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            setTimeout(() => {
              wrap.classList.add('step-animate-out');
              setTimeout(() => onNext(btn.dataset.value), 350);
            }, 100);
          };
        });
        return wrap;
      }
    },
    {
      label: '직업',
      icon: 'fa-briefcase',
      input: (stepIdx, onNext) => {
        const wrap = document.createElement('div');
        wrap.className = 'step-calc-card active';
        wrap.innerHTML = `
          <div class='step-calc-header'><i class='fas fa-briefcase'></i> 직업</div>
          <div class='step-calc-body job-scroll'>
            ${jobOptions.map(opt => `<button class='step-btn' data-value='${opt.value}'>${opt.label}</button>`).join('')}
          </div>
        `;
        wrap.querySelectorAll('.step-btn').forEach(btn => {
          btn.onclick = () => {
            wrap.querySelectorAll('.step-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            setTimeout(() => {
              wrap.classList.add('step-animate-out');
              setTimeout(() => onNext(btn.dataset.value), 350);
            }, 100);
          };
        });
        return wrap;
      }
    },
    {
      label: '흡연 여부',
      icon: 'fa-smoking',
      input: (stepIdx, onNext) => {
        const wrap = document.createElement('div');
        wrap.className = 'step-calc-card active';
        wrap.innerHTML = `
          <div class='step-calc-header'><i class='fas fa-smoking'></i> 흡연 여부</div>
          <div class='step-calc-body single-row'>
            <button class='step-btn' data-value='no'>비흡연</button>
            <button class='step-btn' data-value='yes'>흡연</button>
          </div>
        `;
        wrap.querySelectorAll('.step-btn').forEach(btn => {
          btn.onclick = () => {
            wrap.querySelectorAll('.step-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            setTimeout(() => {
              wrap.classList.add('step-animate-out');
              setTimeout(() => onNext(btn.dataset.value), 350);
            }, 100);
          };
        });
        return wrap;
      }
    }
  ];

  let currentStep = 0;
  const values = [];

  function updateProgressBar() {
    progressBar.innerHTML = '';
    for (let i = 0; i < steps.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'step-dot' + (i <= currentStep ? ' active' : '');
      progressBar.appendChild(dot);
    }
  }

  function showStep(idx) {
    container.querySelectorAll('.step-calc-card').forEach(card => card.remove());
    updateProgressBar();
    const step = steps[idx];
    const el = step.input(idx, val => {
      values[idx] = val;
      if (idx < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      } else {
        showResult();
      }
    });
    container.appendChild(el);
    setTimeout(() => el.classList.add('step-animate-in'), 10);
  }

  function showResult() {
    container.querySelectorAll('.step-calc-card').forEach(card => card.remove());
    progressBar.innerHTML = '';
    // 보험료 계산 로직(예시)
    const base = 20000;
    let price = base + (values[0].slice(0,4) < 1980 ? 20000 : 0) + (values[1]==='male'?5000:0) + (values[2]==='worker'?7000:0) + (values[3]==='yes'?8000:0);
    // 결과 카드
    const resultCard = document.createElement('div');
    resultCard.className = 'step-calc-card active';
    resultCard.innerHTML = `
      <div class='step-calc-header'><i class='fas fa-chart-pie'></i> 예상 보험료 결과</div>
      <div class='step-calc-body' style='padding-bottom:0;'>
        <div class='premium-amount' style='font-size:2.2em;font-weight:900;margin:0.5em 0 0.5em 0;letter-spacing:1px;'></div>
        <canvas id='premiumChart' width='220' height='120' style='margin-bottom:1em;'></canvas>
        <div class='premium-desc'>입력하신 정보 기준 예상 월 보험료입니다.</div>
        <button class='step-btn step-retry' style='margin-top:1.5em;'>다시 계산하기</button>
        <a href='appointment.html' class='cta-button' style='margin-top:1em;display:inline-block;'>상담 예약하기</a>
      </div>
    `;
    container.appendChild(resultCard);
    // 카운트업 애니메이션
    const amountEl = resultCard.querySelector('.premium-amount');
    let cur = 0;
    const duration = 900;
    const frame = 18;
    const totalFrames = Math.ceil(duration / frame);
    const increment = price / totalFrames;
    let count = 0;
    function countUp() {
      cur += increment;
      count++;
      if (count >= totalFrames) {
        cur = price;
        amountEl.textContent = Math.round(cur).toLocaleString() + '원';
      } else {
        amountEl.textContent = Math.round(cur).toLocaleString() + '원';
        setTimeout(countUp, frame);
      }
    }
    countUp();
    // Chart.js 차트
    function drawChart() {
      const canvas = document.getElementById('premiumChart');
      if (!canvas) {
        requestAnimationFrame(drawChart);
        return;
      }
      const ctx = canvas.getContext('2d');
      new window.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['예상 보험료', '평균 보험료'],
          datasets: [{
            data: [price, 35000],
            backgroundColor: ['#1e88e5', '#e3e8ef'],
            borderWidth: 0
          }]
        },
        options: {
          cutout: '70%',
          plugins: { legend: { display: false } },
          responsive: false
        }
      });
    }
    drawChart();
    // 다시 계산하기
    resultCard.querySelector('.step-retry').onclick = () => {
      currentStep = 0;
      values.length = 0;
      showStep(0);
    };
    if (onComplete) onComplete(price);
  }

  // 시작
  showStep(0);
} 