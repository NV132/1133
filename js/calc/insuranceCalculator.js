// 보험료 계산기 로직 (확장 가능 구조)

export function calculateInsurance({ age, type, options = {} }) {
  // type: 'health' | 'car' | 'travel' | 'home' 등
  // options: { familyCount, hasDisease, carType, ... }
  let base = 0;
  switch (type) {
    case 'health':
      base = 20000;
      if (age > 60) base += 10000;
      if (options.hasDisease) base += 15000;
      break;
    case 'car':
      base = 30000;
      if (options.carType === 'suv') base += 5000;
      if (age < 25) base += 20000;
      break;
    case 'travel':
      base = 10000;
      if (options.days) base += options.days * 500;
      break;
    case 'home':
      base = 25000;
      if (options.familyCount) base += options.familyCount * 3000;
      break;
    default:
      base = 15000;
  }
  return base;
} 