// Afghan Solar Hijri (Shamsi) Calendar Engine & Authentic Afghan National Events

export function toPersianDigits(num) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/[0-9]/g, (w) => farsiDigits[+w]);
}

export const AFGHAN_WEEKDAYS = [
  { key: 'sh', en: 'Sh', fa: 'شنبه', longEn: 'Shanbeh' },
  { key: 'yak', en: 'Yak', fa: 'یکشنبه', longEn: 'Yakshanbeh' },
  { key: 'do', en: 'Do', fa: 'دوشنبه', longEn: 'Doshanbeh' },
  { key: 'seh', en: 'Seh', fa: 'سه‌شنبه', longEn: 'Sehshanbeh' },
  { key: 'ch', en: 'Ch', fa: 'چهارشنبه', longEn: 'Chaharshanbeh' },
  { key: 'panj', en: 'Panj', fa: 'پنج‌شنبه', longEn: 'Panjshanbeh' },
  { key: 'jom', en: 'Jom', fa: 'جمعه', longEn: 'Jom\'eh', isFriday: true },
];

export const AFGHAN_SOLAR_MONTHS = [
  {
    index: 1,
    nameEn: 'Hamal',
    nameFa: 'حمل',
    namePs: 'وری',
    zodiac: 'Aries',
    zodiacFa: 'برج حمل',
    daysCount: 31,
    season: 'بهار • Spring',
    seasonIcon: '🌸',
    seasonNote: 'Nowruz & Flora Blooming Season',
    events: [
      {
        day: 1,
        title: 'Nowruz & Afghan Farmer\'s Day',
        titleFa: 'نوروز و روز دهقان',
        type: 'National Holiday',
        badge: 'National Holiday',
        description: 'New Year celebration, Gul-e-Surkh Festival in Mazar-i-Sharif, and nationwide agricultural fairs.',
      },
      {
        day: 2,
        title: 'Education & Knowledge Day',
        titleFa: 'روز معارف و تعلیم',
        type: 'National',
        badge: 'Cultural',
        description: 'Official opening bell of the new school and university academic year across Afghanistan.',
      },
      {
        day: 18,
        title: 'World Health Day Observance',
        titleFa: 'روز جهانی صحت',
        type: 'Observance',
        badge: 'Public Health',
        description: 'Public health seminars and maternal wellness campaigns in Kabul and regional centers.',
      },
    ],
  },
  {
    index: 2,
    nameEn: 'Saur',
    nameFa: 'ثور',
    namePs: 'غوییز',
    zodiac: 'Taurus',
    zodiacFa: 'برج ثور',
    daysCount: 31,
    season: 'بهار • Spring',
    seasonIcon: '🌱',
    seasonNote: 'High Mountain Snowmelt & Planting',
    events: [
      {
        day: 8,
        title: 'Mujahideen Victory Day',
        titleFa: 'روز پیروزی جهاد مردم افغانستان',
        type: 'National Holiday',
        badge: 'National Holiday',
        description: 'Commemoration of the historic 1992 victory of Afghan freedom resistance.',
      },
      {
        day: 14,
        title: 'World Press Freedom Day',
        titleFa: 'روز جهانی آزادی مطبوعات',
        type: 'Observance',
        badge: 'Media & Culture',
        description: 'Panels recognizing investigative journalists and free media across Afghan provinces.',
      },
      {
        day: 28,
        title: 'International Museum Day',
        titleFa: 'روز جهانی موزیم‌ها',
        type: 'Cultural',
        badge: 'Heritage',
        description: 'Special exhibits at the National Museum of Afghanistan in Kabul and Herat Citadel.',
      },
    ],
  },
  {
    index: 3,
    nameEn: 'Jauza',
    nameFa: 'جوزا',
    namePs: 'غبرګولی',
    zodiac: 'Gemini',
    zodiacFa: 'برج جوزا',
    daysCount: 31,
    season: 'بهار • Spring',
    seasonIcon: '🌿',
    seasonNote: 'Early Summer Wheat Harvest',
    events: [
      {
        day: 11,
        title: 'International Children\'s Day',
        titleFa: 'روز جهانی کودک',
        type: 'Observance',
        badge: 'Community',
        description: 'Child welfare programs and educational arts festivals in provincial capitals.',
      },
      {
        day: 15,
        title: 'World Environment Day',
        titleFa: 'روز جهانی محیط زیست',
        type: 'Observance',
        badge: 'Ecology',
        description: 'Tree planting and water preservation awareness across the Panjshir and Harirod basins.',
      },
      {
        day: 24,
        title: 'Afghan Mother\'s Day',
        titleFa: 'روز مادر در افغانستان',
        type: 'National Cultural',
        badge: 'Cultural',
        description: 'Honoring Afghan mothers and matriarchs with family gatherings and tributes.',
      },
    ],
  },
  {
    index: 4,
    nameEn: 'Saratan',
    nameFa: 'سرطان',
    namePs: 'چنګاښ',
    zodiac: 'Cancer',
    zodiacFa: 'برج سرطان',
    daysCount: 31,
    season: 'تابستان • Summer',
    seasonIcon: '☀️',
    seasonNote: 'Midsummer Peak Sunshine',
    events: [
      {
        day: 1,
        title: 'Summer Solstice (Cheleh-ye Tamooz)',
        titleFa: 'آغاز تابستان و چله تموز',
        type: 'Astronomical',
        badge: 'Solar Event',
        description: 'Longest day of the solar year and beginning of the midsummer farming season.',
      },
      {
        day: 26,
        title: 'Establishment of the Republic of Afghanistan',
        titleFa: 'اعلام جمهوریت توسط محمد داوود خان',
        type: 'Historical',
        badge: 'Historical',
        description: 'Commemoration of Sardar Mohammad Daoud Khan\'s 1352 declaration of the republic.',
      },
    ],
  },
  {
    index: 5,
    nameEn: 'Asad',
    nameFa: 'اسد',
    namePs: 'زمری',
    zodiac: 'Leo',
    zodiacFa: 'برج اسد',
    daysCount: 31,
    season: 'تابستان • Summer',
    seasonIcon: '🌾',
    seasonNote: 'Melon & Fruit Abundance Season',
    events: [
      {
        day: 24,
        title: 'Victory Day (End of Foreign Occupation)',
        titleFa: 'روز پیروزی و خروج نیروهای خارجی',
        type: 'National Holiday',
        badge: 'National Holiday',
        description: 'Official national holiday commemorating the liberation and end of foreign military presence.',
      },
      {
        day: 28,
        title: 'Afghan Independence Day (1298 SH / 1919)',
        titleFa: 'استرداد استقلال کشور توسط شاه امان‌الله خان',
        type: 'National Holiday',
        badge: 'Independence Day',
        description: 'Glorious celebration of Afghanistan\'s restoration of full sovereignty under King Amanullah Khan.',
      },
    ],
  },
  {
    index: 6,
    nameEn: 'Sunbula',
    nameFa: 'سنبله',
    namePs: 'وږی',
    zodiac: 'Virgo',
    zodiacFa: 'برج سنبله',
    daysCount: 31,
    season: 'تابستان • Summer',
    seasonIcon: '🍇',
    seasonNote: 'Shomali Grape & Raisin Harvest',
    events: [
      {
        day: 9,
        title: 'National Flag Day',
        titleFa: 'روز ملی بیرق',
        type: 'National',
        badge: 'Patriotic',
        description: 'Celebrating the historical emblem, national colors, and pride of Afghanistan.',
      },
      {
        day: 18,
        title: 'National Martyrs Week',
        titleFa: 'آغاز هفته شهید',
        type: 'National',
        badge: 'Remembrance',
        description: 'Honoring all national heroes and martyrs who defended Afghanistan\'s land and faith.',
      },
      {
        day: 30,
        title: 'International Day of Peace',
        titleFa: 'روز جهانی صلح',
        type: 'Observance',
        badge: 'Peace & Unity',
        description: 'Community prayer gatherings and youth peace dialogues in Balkh, Bamyan, and Nangarhar.',
      },
    ],
  },
  {
    index: 7,
    nameEn: 'Mizan',
    nameFa: 'میزان',
    namePs: 'تله',
    zodiac: 'Libra',
    zodiacFa: 'برج میزان',
    daysCount: 30,
    season: 'پاییز • Autumn',
    seasonIcon: '🍂',
    seasonNote: 'Autumnal Equinox & Harvest Transition',
    events: [
      {
        day: 1,
        title: 'Autumnal Equinox (اعتدال خزان)',
        titleFa: 'آغاز فصل خزان و اعتدال پاییزی',
        type: 'Astronomical',
        badge: 'Solar Equinox',
        description: 'Equal day and night across the Hindu Kush and transition into the cool harvesting season.',
      },
      {
        day: 8,
        title: 'World Tourism Day in Bamyan',
        titleFa: 'روز جهانی گردشگری در بامیان',
        type: 'Cultural',
        badge: 'Heritage',
        description: 'Cultural symposiums celebrating Band-e-Amir National Park and Silk Road heritage.',
      },
      {
        day: 13,
        title: 'World Teachers\' Day (روز معلم)',
        titleFa: 'روز ملی معلم و تجلیل از اساتید',
        type: 'National',
        badge: 'Education',
        description: 'Nationwide tributes and student gifts honoring Afghan educators and Ustad masters.',
      },
    ],
  },
  {
    index: 8,
    nameEn: 'Aqrab',
    nameFa: 'عقرب',
    namePs: 'لړم',
    zodiac: 'Scorpio',
    zodiacFa: 'برج عقرب',
    daysCount: 30,
    season: 'پاییز • Autumn',
    seasonIcon: '🍁',
    seasonNote: 'Aquifer Season & Orchard Winterization',
    events: [
      {
        day: 3,
        title: 'UN Day in Afghanistan',
        titleFa: 'روز ملل متحد در افغانستان',
        type: 'Observance',
        badge: 'Diplomatic',
        description: 'Youth development roundtables and regional humanitarian dialogues in Kabul.',
      },
      {
        day: 7,
        title: 'Pomegranate Harvest Festival',
        titleFa: 'جشن انار قندهار و تاشقرغان',
        type: 'Cultural',
        badge: 'Agro-Expo',
        description: 'Cultural fruit festivals showcasing world-famous Kandahari and Tashqurghan pomegranates.',
      },
      {
        day: 20,
        title: 'Eastern Literature & Iqbal Day',
        titleFa: 'روز ادبیات شرق و علامه اقبال لاهوری',
        type: 'Cultural',
        badge: 'Literature',
        description: 'Poetic recitations and philosophical seminars across Kabul, Balkh, and Herat academies.',
      },
    ],
  },
  {
    index: 9,
    nameEn: 'Qaws',
    nameFa: 'قوس',
    namePs: 'لیندۍ',
    zodiac: 'Sagittarius',
    zodiacFa: 'برج قوس',
    daysCount: 30,
    season: 'پاییز • Autumn',
    seasonIcon: '🌾',
    seasonNote: 'Late Autumn Chills & Mountain Frost',
    events: [
      {
        day: 10,
        title: 'World Human Rights Day',
        titleFa: 'روز جهانی حقوق بشر',
        type: 'Observance',
        badge: 'Humanitarian',
        description: 'Discussions on dignity, civil welfare, and traditional Afghan Jirga dispute resolutions.',
      },
      {
        day: 30,
        title: 'Shab-e Yalda (Winter Solstice)',
        titleFa: 'شب یلدا / چله بزرگ',
        type: 'Cultural Festival',
        badge: 'Cultural Festival',
        description: 'Ancient night celebration with watermelons, pomegranates, dried fruits, and Divan-e-Hafez reading.',
      },
    ],
  },
  {
    index: 10,
    nameEn: 'Jadi',
    nameFa: 'جدی',
    namePs: 'مرغومی',
    zodiac: 'Capricorn',
    zodiacFa: 'برج جدی',
    daysCount: 30,
    season: 'زمستان • Winter',
    seasonIcon: '❄️',
    seasonNote: 'First Snows of Kabul & Salang Pass',
    events: [
      {
        day: 1,
        title: 'Winter Solstice / Khorram Rooz',
        titleFa: 'خرم روز و آغاز زمستان',
        type: 'Astronomical',
        badge: 'Winter Solstice',
        description: 'Beginning of the 40-day great winter chill (Cheleh-ye Bozorg) across Central Asian highlands.',
      },
      {
        day: 6,
        title: 'Soviet Military Invasion Day (1358 SH)',
        titleFa: 'تجاوز قشون سرخ شوروی به افغانستان',
        type: 'Historical',
        badge: 'Historical',
        description: 'Somatic reflection on the 1979 Soviet intervention and resilient popular defense.',
      },
    ],
  },
  {
    index: 11,
    nameEn: 'Dalwa',
    nameFa: 'دلو',
    namePs: 'سلواغه',
    zodiac: 'Aquarius',
    zodiacFa: 'برج دلو',
    daysCount: 30,
    season: 'زمستان • Winter',
    seasonIcon: '🌨️',
    seasonNote: 'Deep Winter & Pamir Glacial Freeze',
    events: [
      {
        day: 26,
        title: 'Soviet Troops Withdrawal Day (1367 SH)',
        titleFa: 'روز شکست و خروج قشون شوروی از افغانستان',
        type: 'National Holiday',
        badge: 'National Holiday',
        description: 'Major national holiday celebrating the final withdrawal of Soviet troops over the Hairatan bridge in 1989.',
      },
    ],
  },
  {
    index: 12,
    nameEn: 'Hoot',
    nameFa: 'حوت',
    namePs: 'کب',
    zodiac: 'Pisces',
    zodiacFa: 'برج حوت',
    daysCount: 29, // 30 in leap years
    season: 'زمستان • Winter',
    seasonIcon: '🌱',
    seasonNote: 'Late Winter Thaw & Saplings Awakening',
    events: [
      {
        day: 2,
        title: 'International Mother Language Day',
        titleFa: 'روز جهانی زبان مادری (پشتو و دری)',
        type: 'Cultural',
        badge: 'Linguistics',
        description: 'Promoting Afghan linguistic richness in Pashto, Dari, Uzbeki, Turkmen, and Pashai.',
      },
      {
        day: 15,
        title: 'National Greenery & Tree Planting Day',
        titleFa: 'روز ملی نهال‌شانی و سرسبزی وطن',
        type: 'National Campaign',
        badge: 'Ecological',
        description: 'Public nationwide movement planting saplings in orchards, parks, and mosque grounds.',
      },
      {
        day: 24,
        title: 'Historical Herat Uprising (24 Hoot 1357)',
        titleFa: 'قیام تاریخی مردم هرات',
        type: 'Historical',
        badge: 'Uprising',
        description: 'Honoring the courage and martyrdom of thousands of Herati citizens who stood for liberty.',
      },
    ],
  },
];

const WEEKDAY_MAP = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function getShamsiDate(date = new Date(), timeZone) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  if (timeZone) {
    options.timeZone = timeZone;
  }
  const parts = new Intl.DateTimeFormat('en-u-ca-persian', options).formatToParts(date);

  let jy = 1405;
  let jm = 8;
  let jd = 4;

  for (const p of parts) {
    if (p.type === 'year') jy = parseInt(p.value, 10);
    if (p.type === 'month') jm = parseInt(p.value, 10);
    if (p.type === 'day') jd = parseInt(p.value, 10);
  }

  // Weekday in Afghan week: Saturday = 0, Sunday = 1, ... Friday = 6
  let gDay = date.getDay();
  if (timeZone) {
    try {
      const shortDay = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone }).format(date);
      if (shortDay in WEEKDAY_MAP) {
        gDay = WEEKDAY_MAP[shortDay];
      }
    } catch {
      // Fallback to local getDay() if timezone invalid
    }
  }
  const afghanWeekdayIndex = (gDay + 1) % 7;
  const weekdayInfo = AFGHAN_WEEKDAYS[afghanWeekdayIndex] || AFGHAN_WEEKDAYS[0];
  const monthInfo = AFGHAN_SOLAR_MONTHS[jm - 1] || AFGHAN_SOLAR_MONTHS[7];

  return {
    jy,
    jm,
    jd,
    weekdayIndex: afghanWeekdayIndex,
    weekdayEn: weekdayInfo.longEn,
    weekdayFa: weekdayInfo.fa,
    monthInfo,
    gregorianDate: date,
  };
}

export function getIslamicDateParts(date = new Date(), timeZone) {
  try {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    if (timeZone) {
      options.timeZone = timeZone;
    }
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', options).formatToParts(date);

    let hy = 1448;
    let hm = 'Jumada I';
    let hd = 15;

    for (const p of parts) {
      if (p.type === 'year') hy = p.value;
      if (p.type === 'month') hm = p.value;
      if (p.type === 'day') hd = p.value;
    }

    return { hy, hm, hd, formatted: `${hd} ${hm} ${hy} AH` };
  } catch {
    return { hy: '1448', hm: 'Rabi\' al-Thani', hd: '13', formatted: '13 Rabi\' al-Thani 1448 AH' };
  }
}

export function findFirstDayOfShamsiMonth(jy, jm) {
  const approxGYear = jy + 621;
  const estDate = new Date(approxGYear, 2, 20);
  estDate.setDate(estDate.getDate() + Math.round((jm - 1) * 30.5));

  let current = new Date(estDate);
  let sh = getShamsiDate(current);

  while (sh.jy < jy || (sh.jy === jy && sh.jm < jm)) {
    current.setDate(current.getDate() + 1);
    sh = getShamsiDate(current);
  }
  while (sh.jy > jy || (sh.jy === jy && sh.jm > jm)) {
    current.setDate(current.getDate() - 1);
    sh = getShamsiDate(current);
  }
  while (sh.jd > 1) {
    current.setDate(current.getDate() - 1);
    sh = getShamsiDate(current);
  }

  return current;
}

export function generateShamsiMonthGrid(jy, jm, todayShamsi) {
  const monthInfo = AFGHAN_SOLAR_MONTHS[jm - 1] || AFGHAN_SOLAR_MONTHS[7];
  const firstDayGregorian = findFirstDayOfShamsiMonth(jy, jm);

  // Afghan week starts on Saturday (Shanbeh): 0=Saturday, 1=Sunday, ... 6=Friday
  const startWeekday = (firstDayGregorian.getDay() + 1) % 7;

  // Days in previous Shamsi month
  const prevMonthIndex = jm === 1 ? 12 : jm - 1;
  const prevMonthInfo = AFGHAN_SOLAR_MONTHS[prevMonthIndex - 1];
  const prevMonthTotalDays = prevMonthInfo.daysCount;

  // Previous month trailing spacer cells
  const prevSpacers = [];
  for (let i = startWeekday - 1; i >= 0; i--) {
    const spacerDay = prevMonthTotalDays - i;
    const spacerDate = new Date(firstDayGregorian);
    spacerDate.setDate(spacerDate.getDate() - (i + 1));
    const isl = getIslamicDateParts(spacerDate);

    prevSpacers.push({
      shamsiDay: spacerDay,
      shamsiDayFa: toPersianDigits(spacerDay),
      gregorianDay: spacerDate.getDate(),
      hijriDay: isl.hd,
      isCurrentMonth: false,
    });
  }

  // Days for current month
  const currentMonthDays = [];
  for (let d = 1; d <= monthInfo.daysCount; d++) {
    const curDate = new Date(firstDayGregorian);
    curDate.setDate(curDate.getDate() + (d - 1));
    const isl = getIslamicDateParts(curDate);
    const afghanWeekday = (curDate.getDay() + 1) % 7;
    const isToday = !!(todayShamsi && todayShamsi.jy === jy && todayShamsi.jm === jm && todayShamsi.jd === d);
    const isFriday = afghanWeekday === 6;

    currentMonthDays.push({
      shamsiDay: d,
      shamsiDayFa: toPersianDigits(d),
      gregorianDay: curDate.getDate(),
      gregorianMonthName: curDate.toLocaleDateString('en-US', { month: 'short' }),
      hijriDay: isl.hd,
      hijriMonthName: isl.hm,
      isToday,
      isFriday,
      afghanWeekday,
      gregorianDate: curDate,
      isoDate: curDate.toISOString().split('T')[0],
    });
  }

  // Next month leading spacer cells to round out the 7-column grid
  const totalCellsSoFar = prevSpacers.length + currentMonthDays.length;
  const totalRows = Math.ceil(totalCellsSoFar / 7);
  const totalCellsNeeded = totalRows * 7;
  const nextSpacersCount = totalCellsNeeded - totalCellsSoFar;

  const nextSpacers = [];
  for (let i = 1; i <= nextSpacersCount; i++) {
    const spacerDate = new Date(firstDayGregorian);
    spacerDate.setDate(spacerDate.getDate() + monthInfo.daysCount + (i - 1));
    const isl = getIslamicDateParts(spacerDate);

    nextSpacers.push({
      shamsiDay: i,
      shamsiDayFa: toPersianDigits(i),
      gregorianDay: spacerDate.getDate(),
      hijriDay: isl.hd,
      isCurrentMonth: false,
    });
  }

  return {
    monthInfo,
    startWeekday,
    prevSpacers,
    currentMonthDays,
    nextSpacers,
    firstDayGregorian,
  };
}

export const HIJRI_MONTHS = [
  { index: 1, nameEn: 'Muharram', nameAr: 'المحرّم', totalDays: 30 },
  { index: 2, nameEn: 'Safar', nameAr: 'صفر', totalDays: 29 },
  { index: 3, nameEn: "Rabi' al-Awwal", nameAr: 'ربيع الأوّل', totalDays: 30 },
  { index: 4, nameEn: "Rabi' al-Thani", nameAr: 'ربيع الثاني', totalDays: 29 },
  { index: 5, nameEn: 'Jumada al-Awwal', nameAr: 'جمادى الأولى', totalDays: 30 },
  { index: 6, nameEn: 'Jumada al-Thani', nameAr: 'جمادى الثانية', totalDays: 29 },
  { index: 7, nameEn: 'Rajab', nameAr: 'رجب', totalDays: 30 },
  { index: 8, nameEn: "Sha'ban", nameAr: 'شعبان', totalDays: 29 },
  { index: 9, nameEn: 'Ramadan', nameAr: 'رمضان', totalDays: 30 },
  { index: 10, nameEn: 'Shawwal', nameAr: 'شوّال', totalDays: 29 },
  { index: 11, nameEn: "Dhu al-Qi'dah", nameAr: 'ذو القعدة', totalDays: 30 },
  { index: 12, nameEn: 'Dhu al-Hijjah', nameAr: 'ذو الحجة', totalDays: 29 },
];

export function getHijriDateParts(date = new Date(), timeZone) {
  try {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    if (timeZone) {
      options.timeZone = timeZone;
    }
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', options).formatToParts(date);
    let hy = 1448, hm = 4, hd = 13;
    for (const p of parts) {
      if (p.type === 'year') hy = parseInt(p.value.replace(/[^0-9]/g, ''), 10);
      if (p.type === 'month') hm = parseInt(p.value.replace(/[^0-9]/g, ''), 10);
      if (p.type === 'day') hd = parseInt(p.value.replace(/[^0-9]/g, ''), 10);
    }
    const monthObj = HIJRI_MONTHS[hm - 1] || HIJRI_MONTHS[3];
    return {
      hy: isNaN(hy) ? 1448 : hy,
      hm: isNaN(hm) ? 4 : hm,
      hd: isNaN(hd) ? 13 : hd,
      monthName: monthObj.nameEn,
      monthNameAr: monthObj.nameAr,
      formatted: `${hd} ${monthObj.nameEn} ${hy} AH`,
    };
  } catch {
    return { hy: 1448, hm: 4, hd: 13, monthName: "Rabi' al-Thani", monthNameAr: 'ربيع الثاني', formatted: "13 Rabi' al-Thani 1448 AH" };
  }
}

export function hijriToGregorian(targetHy, targetHm, targetHd) {
  const baseGDate = new Date(Date.UTC(2026, 5, 15, 12, 0, 0));
  const daysFromBase = Math.round((targetHy - 1448) * 354.367 + (targetHm - 1) * 29.53 + (targetHd - 1));
  let cur = new Date(baseGDate.getTime() + daysFromBase * 86400000);
  for (let offset = 0; offset <= 25; offset++) {
    for (const dir of [0, 1, -1]) {
      const testDate = new Date(cur.getTime() + offset * dir * 86400000);
      const h = getHijriDateParts(testDate);
      if (h.hy === targetHy && h.hm === targetHm && h.hd === targetHd) {
        return testDate;
      }
    }
  }
  return cur;
}

export function getHijriMonthGrid(hy, hm) {
  const day1G = hijriToGregorian(hy, hm, 1);
  const firstWeekday = day1G.getDay();

  const test30G = new Date(day1G.getTime() + 29 * 86400000);
  const h30 = getHijriDateParts(test30G);
  const totalDays = (h30.hm === hm && h30.hd === 30) ? 30 : 29;

  const prevMonthIdx = hm === 1 ? 12 : hm - 1;
  const prevMonthYear = hm === 1 ? hy - 1 : hy;
  const prevDay1G = hijriToGregorian(prevMonthYear, prevMonthIdx, 1);
  const prevTest30G = new Date(prevDay1G.getTime() + 29 * 86400000);
  const prevH30 = getHijriDateParts(prevTest30G);
  const prevMonthTotalDays = (prevH30.hm === prevMonthIdx && prevH30.hd === 30) ? 30 : 29;

  const prevSpacers = [];
  for (let i = firstWeekday - 1; i >= 0; i--) {
    prevSpacers.push(prevMonthTotalDays - i);
  }

  const currentDays = [];
  for (let d = 1; d <= totalDays; d++) {
    currentDays.push(d);
  }

  const totalCells = prevSpacers.length + currentDays.length;
  const totalRows = Math.ceil(totalCells / 7);
  const nextSpacersCount = totalRows * 7 - totalCells;
  const nextSpacers = [];
  for (let i = 1; i <= nextSpacersCount; i++) {
    nextSpacers.push(i);
  }

  return { firstWeekday, totalDays, prevSpacers, currentDays, nextSpacers, day1G };
}

