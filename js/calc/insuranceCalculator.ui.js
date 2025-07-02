// 보험료 계산기 UI 및 이벤트 (확장 가능 구조)
import { calculateInsurance } from './insuranceCalculator.js';

export function renderInsuranceCalculator(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.innerHTML = `
    <form id="insuranceCalcForm" class="insurance-calc-form">
      <label>나이 <input type="number" name="age" min="0" max="120" required></label>
      <label>보험 유형
        <select name="type" required>
          <option value="health">건강보험</option>
          <option value="car">자동차보험</option>
          <option value="travel">여행보험</option>
          <option value="home">주택보험</option>
        </select>
      </label>
      <label>가족 수 <input type="number" name="familyCount" min="1" max="10"></label>
      <label>지병 여부 <input type="checkbox" name="hasDisease"></label>
      <label>차종(SUV) <input type="checkbox" name="carType" value="suv"></label>
      <label>여행일수 <input type="number" name="days" min="1" max="365"></label>
      <button type="submit">보험료 계산</button>
    </form>
    <div id="insuranceCalcResult" class="insurance-calc-result"></div>
  `;

  const form = target.querySelector('#insuranceCalcForm');
  const resultDiv = target.querySelector('#insuranceCalcResult');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const age = Number(data.get('age'));
    const type = data.get('type');
    const options = {
      familyCount: Number(data.get('familyCount')) || 0,
      hasDisease: !!data.get('hasDisease'),
      carType: data.get('carType') === 'suv' ? 'suv' : '',
      days: Number(data.get('days')) || 0
    };
    const price = calculateInsurance({ age, type, options });
    resultDiv.innerHTML = `<strong>예상 보험료: </strong> <span style='color:#1e88e5;font-size:1.2em;'>${price.toLocaleString()}원</span>`;
  });
} 