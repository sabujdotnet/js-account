export function calculateWorkAmount(
  days?: number,
  hoursPerDay?: number,
  hourlyRate?: number,
  quantity?: number,
  unitPrice?: number
): number {

  // Priority 1: Work hour formula
  if (days && hoursPerDay && hourlyRate) {
    return days * hoursPerDay * hourlyRate;
  }

  // Priority 2: Quantity price formula
  if (quantity && unitPrice) {
    return quantity * unitPrice;
  }

  return 0;
}

const total = calculateWorkAmount(
  days,
  hoursPerDay,
  hourlyRate,
  quantity,
  unitPrice
);
export function workFormulaText(
  days?: number,
  hoursPerDay?: number,
  hourlyRate?: number
): string {
  if (!days || !hoursPerDay || !hourlyRate) return "";
  return `${days}×${hoursPerDay}×${hourlyRate}`;
  formula: workFormulaText(days, hoursPerDay, hourlyRate)
}

