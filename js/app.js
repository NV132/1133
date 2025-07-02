import { renderStepCalculator } from './calc/stepCalculator.ui.js';

const products = {
  'health-basic': {
    title: '기본 건강보험',
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: '경제적인 보험료로 필수 의료비를 보장하는 건강보험.',
    coverage: ['입원비 최대 2천만원 보장', '수술비 지원', '24시간 상담 서비스'],
    conditions: '만 18세 이상 60세 이하, 건강검진 불필요.',
    benefits: ['가입 시 건강관리 앱 무료 제공']
  },
  'health-premium': {
    title: '프리미엄 건강보험',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: '포괄적인 보장과 웰니스 혜택을 제공하는 고급 건강보험.',
    coverage: ['입원 및 수술비 최대 5천만원', '중대질병 진단비', '연 1회 무료 건강검진', '해외 의료비 지원'],
    conditions: '만 18세 이상 65세 이하, 건강 상태 상담 필요.',
    benefits: ['웰니스 프로그램 무료', '가족 할인 10%']
  },
  'health-family': {
    title: '가족 건강보험',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: '가족 모두를 위한 맞춤형 건강보험 플랜.',
    coverage: ['가족별 입원비 최대 3천만원', '아동 질병 추가 보장', '가족 건강검진 지원'],
    conditions: '최소 2인 이상 가입, 연령 제한 없음.',
    benefits: ['가족 단위 15% 할인', '무료 상담 연 2회']
  },
  'car-basic': {
    title: '기본 자동차보험',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: '필수 보장으로 경제적인 운전을 지원하는 자동차보험.',
    coverage: ['대인/대물 배상', '사고 시 긴급 출동', '수리비 최대 1천만원'],
    conditions: '만 21세 이상, 유효한 운전면허.',
    benefits: ['무사고 1년 10% 할인']
  },
  'car-comprehensive': {
    title: '종합 자동차보험',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: '사고 및 차량 손해를 전면 보장하는 자동차보험.',
    coverage: ['대인/대물 배상 무제한', '차량 전손 보장', '대차 서비스 7일', '긴급 출동 24시간'],
    conditions: '만 21세 이상, 차량 등록 필수.',
    benefits: ['주유비 5만원 지원', '무사고 할인 최대 20%']
  },
  'travel-short': {
    title: '단기 여행보험',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: '짧은 여행을 위한 필수 보장 여행보험.',
    coverage: ['해외 의료비 최대 5천만원', '여행 취소 보상', '수하물 분실 보상'],
    conditions: '여행 출발 전 가입, 1~30일.',
    benefits: ['응급 키트 증정']
  },
  'travel-long': {
    title: '장기 여행보험',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: '장기 여행자를 위한 포괄적 보장 여행보험.',
    coverage: ['해외 의료비 최대 1억원', '여행 지연/취소 보상', '수하물 및 개인물품 보장', '항공기 납치 보장'],
    conditions: '여행 출발 전 가입, 30일 이상.',
    benefits: ['다중 여행 할인', '여행자 가이드북 제공']
  },
  'home-basic': {
    title: '기본 주택보험',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: '화재와 도난을 보장하는 경제적인 주택보험.',
    coverage: ['화재 손실 최대 1억원', '도난 보장', '주거 손실 지원'],
    conditions: '주택 소유자 또는 임차인, 연령 제한 없음.',
    benefits: ['가입 시 보안 키트 제공']
  },
  'home-comprehensive': {
    title: '종합 주택보험',
    image: 'https://images.unsplash.com/photo-1600585154084-4e5e1c7c0a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: '자연재해와 가구 손실까지 포괄하는 주택보험.',
    coverage: ['자연재해 보장', '임시 주거비 지원', '가구 손실 최대 5천만원', '화재 및 도난 무제한'],
    conditions: '주택 소유자, 상담 필요.',
    benefits: ['가족 할인 10%', '무료 주택 점검']
  }
};

const faqData = [
  { question: '보험 가입 절차는 어떻게 되나요?', answer: '온라인 또는 전화 상담 예약 후, 김현대 설계사가 맞춤형 상품을 안내드립니다. 서류 제출 후 가입 완료까지 약 3일 소요됩니다.', keywords: ['가입', '절차'] },
  { question: '보험료 납부 방법은 어떤 것들이 있나요?', answer: '은행 계좌이체, 신용카드, 모바일 결제(카카오페이 등)를 지원합니다. 매월 자동 납부 설정을 추천드립니다.', keywords: ['납부', '보험료'] },
  { question: '보험 해지는 어떻게 하나요?', answer: '김현대 설계사(010-1234-5678) 또는 이메일(kim@hyundai-ins.com)로 연락 주시면 해지 절차를 안내드립니다.', keywords: ['해지'] },
  { question: '건강보험의 보장 범위는 어디까지인가요?', answer: '입원, 수술, 중대질병 진단비, 건강검진 등을 포함합니다. 상세 보장은 상품 페이지에서 확인 가능합니다.', keywords: ['건강보험', '보장'] },
  { question: '자동차보험 사고 처리 시간은 얼마나 걸리나요?', answer: '사고 접수 후 24시간 내 출동하며, 처리 완료까지 평균 3~7일 소요됩니다.', keywords: ['자동차보험', '사고'] },
  { question: '여행보험은 언제 가입해야 하나요?', answer: '여행 출발 전 가입이 필수입니다. 출발 당일 가입 시 일부 보장이 제한될 수 있습니다.', keywords: ['여행보험', '가입'] },
  { question: '주택보험은 어떤 손해를 보장하나요?', answer: '화재, 도난, 자연재해, 가구 손실 등을 보장합니다. 상세 보장은 상품 페이지에서 확인하세요.', keywords: ['주택보험', '보장'] },
  { question: '보험료는 어떻게 산정되나요?', answer: '나이, 건강 상태, 운전 경력, 주거 환경 등에 따라 산정됩니다. 상담 시 정확한 견적을 제공드립니다.', keywords: ['보험료', '산정'] },
  { question: '가족 보험 할인 혜택이 있나요?', answer: '건강보험 및 주택보험 가족 동시 가입 시 10% 할인, 자동차보험 다차량 가입 시 추가 혜택 제공.', keywords: ['가족', '할인'] },
  { question: '보험금 청구는 어떻게 하나요?', answer: '사고 또는 손해 발생 후 김현대 설계사에게 연락 주시면 필요 서류를 안내드립니다. 평균 5일 내 지급됩니다.', keywords: ['보험금', '청구'] }
];

// Modal Functions
function openModal(productId) {
  const product = products[productId];
  const modal = document.getElementById('productModal');
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <h2>${product.title}</h2>
    <p>${product.description}</p>
    <h3>주요 보장 내용</h3>
    <ul>${product.coverage.map(item => `<li><i class=\"fas fa-check-circle\"></i>${item}</li>`).join('')}</ul>
    <h3>가입 조건</h3>
    <p>${product.conditions}</p>
    <h3>추가 혜택</h3>
    <ul>${product.benefits.map(item => `<li><i class=\"fas fa-gift\"></i>${item}</li>`).join('')}</ul>
    <hr style='margin:2rem 0 1rem 0;border:0;border-top:1.5px solid #e3f2fd;'>
    <h3 style='color:#1e88e5;margin-bottom:1rem;'>보험료 계산하기</h3>
    <div id='stepCalculatorContainer'></div>
  `;
  modal.style.display = 'flex';
  // 보험료 계산기 스텝폼 렌더링
  const stepCalcContainer = document.getElementById('stepCalculatorContainer');
  if (stepCalcContainer) {
    stepCalcContainer.innerHTML = '';
    renderStepCalculator('#stepCalculatorContainer');
  }
}

function closeModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.style.display = 'none';
}

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .faq-item').forEach(item => observer.observe(item));

// Form Submission
const form = document.querySelector('.appointment-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('상담 예약이 완료되었습니다! 곧 연락드리겠습니다.');
    form.reset();
  });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(item => {
  item.addEventListener('click', () => {
    const answer = item.nextElementSibling;
    const isActive = answer.classList.contains('active');
    document.querySelectorAll('.faq-answer').forEach(ans => {
      ans.classList.remove('active');
      ans.previousElementSibling.classList.remove('active');
    });
    if (!isActive) {
      answer.classList.add('active');
      item.classList.add('active');
    }
  });
});

// FAQ Search
function searchFAQ() {
  const input = document.getElementById('faqSearch');
  if (!input) return;
  const query = input.value.toLowerCase();
  const faqList = document.getElementById('faqList');
  const items = faqList.getElementsByClassName('faq-item');

  Array.from(items).forEach(item => {
    const question = item.querySelector('.faq-question').textContent.toLowerCase();
    const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
    item.style.display = question.includes(query) || answer.includes(query) ? '' : 'none';
  });
}

const faqSearchInput = document.getElementById('faqSearch');
if (faqSearchInput) faqSearchInput.addEventListener('input', searchFAQ);

// Chatbot Functions
function toggleChatbot() {
  const chatbot = document.querySelector('.chatbot-container');
  chatbot.classList.toggle('active');
}

function handleChatbotSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chatbotInput');
  const message = input.value.trim();
  if (!message) return;

  const chatbotBody = document.getElementById('chatbotBody');
  const userMessage = document.createElement('div');
  userMessage.className = 'chatbot-message user';
  userMessage.textContent = message;
  chatbotBody.appendChild(userMessage);

  const lowerMessage = message.toLowerCase();
  const matchedFaq = faqData.find(faq => 
    faq.keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))
  );

  const botMessage = document.createElement('div');
  botMessage.className = 'chatbot-message bot';
  botMessage.innerHTML = matchedFaq 
    ? `${matchedFaq.answer}<br><br>더 자세한 상담이 필요하시면 <a href="appointment.html">상담 예약</a> 또는 <a href="https://kakao.com/channel" target="_blank">카카오톡</a>으로 문의해 주세요!`
    : '죄송합니다, 질문에 대한 답변을 찾지 못했습니다.<br>더 자세한 상담을 원하시면 <a href="appointment.html">상담 예약</a> 또는 <a href="https://kakao.com/channel" target="_blank">카카오톡</a>으로 문의해 주세요!';
  chatbotBody.appendChild(botMessage);

  chatbotBody.scrollTop = chatbotBody.scrollHeight;
  input.value = '';
}

// Close Modal on Outside Click
const modal = document.getElementById('productModal');
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
}

// Product Filtering
const filterTabs = document.querySelectorAll('.filter-tabs .filter-tab');
if (filterTabs) {
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      const categories = document.querySelectorAll('.product-category');
      const cards = document.querySelectorAll('.product-card');

      if (category === 'all') {
        categories.forEach(cat => cat.style.display = '');
        cards.forEach(card => card.style.display = '');
      } else {
        categories.forEach(cat => {
          cat.style.display = cat.getAttribute('data-category') === category ? '' : 'none';
        });
        cards.forEach(card => {
          card.style.display = card.getAttribute('data-type') === category ? '' : 'none';
        });
      }
    });
  });
}

// Particle Effect
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 500;
  const posArray = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x1e88e5,
    transparent: true,
    opacity: 0.6
  });

  const particlesMesh = new THREE.Points(particlesGeometry, material);
  scene.add(particlesMesh);

  camera.position.z = 30;

  function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

window.openModal = openModal;
window.closeModal = closeModal;