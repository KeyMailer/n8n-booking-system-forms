export function getDisabledDays(newsletterType: string) {
  const today = new Date();

  const TUESDAY = 2;
  const WEDNESDAY = 3;
  const THURSDAY = 4;

  let disabledDays: number[] = [0, 6]; // weekends

  if (newsletterType === "Influencer") {
    disabledDays = [...disabledDays, TUESDAY, WEDNESDAY, THURSDAY];
  } else if (newsletterType === "Press") {
    disabledDays = [...disabledDays, TUESDAY, THURSDAY];
  } else if (newsletterType === "Both") {
    disabledDays = [...disabledDays, TUESDAY, WEDNESDAY, THURSDAY];
  }

  return [{ before: today }, { dayOfWeek: disabledDays }];
}
