const { useEffect, useMemo, useState } = React;

const STANDARDS_DATA = [
  {
    id: 1,
    title: "ผ่าตัดผิดข้าง ผิดคน ผิดตำแหน่ง ผิดหัตถการ",
    icon: "✂️",
    owner: "คุณวัลภา อมรวงศ์",
    role: "พยาบาลวิชาชีพ / หัวหน้าห้องผ่าตัด",
    guidelines: [
      {
        subtitle: "การทำเครื่องหมายระบุอวัยวะ (Marking Site)",
        details: "ทำการระบุตำแหน่งหรือข้างที่จะทำผ่าตัด/หัตถการอย่างชัดเจนร่วมกับผู้ป่วยก่อนเข้าห้องผ่าตัด โดยใช้เครื่องหมายที่เป็นมาตรฐานของโรงพยาบาล"
      },
      {
        subtitle: "การตรวจสอบระบุตัวผู้ป่วย (Pre-operative Verification)",
        details: "ตรวจสอบเอกสารสิทธิ์ ใบยินยอมผ่าตัด เวชระเบียน และป้ายข้อมือผู้ป่วยให้ถูกต้องตรงกันทุกจุด"
      },
      {
        subtitle: "มาตรการความปลอดภัยในห้องผ่าตัด",
        details: "ปฏิบัติตามแนวทางของ WHO Surgical Safety Checklist อย่างเคร่งครัด ได้แก่:\n• Sign In (ก่อนระงับความรู้สึก)\n• Time Out (ก่อนลงมีดผ่าตัด - ทีมร่วมหยุดยืนยันความถูกต้อง)\n• Sign Out (ก่อนผู้ป่วยออกจากห้องผ่าตัด)"
      }
    ],
    kpis: [
      "จำนวนอุบัติการณ์ผ่าตัดผิดคน ผิดข้าง ผิดตำแหน่ง (เป้าหมายเป็น 0)",
      "จำนวนอุบัติการณ์ผ่าตัดผิดพลาดที่มีความรุนแรงระดับ E ขึ้นไป (เป้าหมายเป็น 0)"
    ]
  },
  {
    id: 2,
    title: "การติดเชื้อสำคัญ (SSI, VAP, CAUTI, CLABSI)",
    icon: "🦠",
    owner: "คุณเอมิตา เกาะสมบัติ",
    role: "พยาบาลควบคุมการติดเชื้อ (ICN)",
    guidelines: [
      {
        subtitle: "การทำความสะอาดมือ (Hand Hygiene)",
        details: "ให้ถือปฏิบัติในทุกระดับ ทั้งบุคลากร ผู้ป่วย และญาติ แบ่งเป็น 3 ประเภท:\n• Normal Hand Washing: ฟอกสบู่ธรรมดาอย่างน้อย 10 วินาที สำหรับสุขอนามัยทั่วไป\n• Hygienic Hand Washing: ฟอกสบู่ผสมน้ำยาทำลายเชื้อ (เช่น 4% Chlorhexidine หรือ 7.5% Iodophor) อย่างน้อย 30 วินาที ก่อน/หลังเทคนิคปราศจากเชื้อ\n• Surgical Handwashing: ฟอกมือถึงข้อศอกด้วยน้ำยาทำลายเชื้อ 2-5 นาที และเช็ดด้วยผ้าปราศจากเชื้อ\n*หมายเหตุ: กรณีมือไม่เปื้อน ใช้ Alcohol Gel ~5 ml ถูจนแห้ง (มีอายุ 28 วันหลังเปิดใช้)"
      },
      {
        subtitle: "การป้องกันการติดเชื้อแผลผ่าตัด (SSI)",
        details: "• ใช้ Clipper โกนขนแทนใบมีดโกน (หากจำเป็น)\n• ลดระยะเวลาการโกนขนก่อนไปห้องผ่าตัดให้น้อยที่สุด\n• ให้ Antibiotic Prophylaxis ถูกต้องเหมาะสมตามประเภทแผลผ่าตัด (ศึกษาเพิ่มเติมจาก WI-IC-007)"
      },
      {
        subtitle: "การป้องกันปอดอักเสบจากการใช้เครื่องช่วยหายใจ (VAP)",
        details: "• Hand Hygiene ก่อนสัมผัส/ทำหัตถการ\n• ยกหัวเตียงสูง 30 องศา ตลอดการใช้เครื่องช่วยหายใจ\n• ตรวจวัดแรงดัน Cuff ท่อช่วยหายใจให้อยู่ที่ 20 - 30 cm. H2O ทุก 8 ชั่วโมง\n• ทำความสะอาดช่องปากด้วย Chlorhexidine Mouth Care\n• ใช้ Contact Precautions ร่วมกับ Standard Precautions"
      },
      {
        subtitle: "การป้องกันการติดเชื้อจากสายสวนปัสสาวะ (CAUTI)",
        details: "• สวนปัสสาวะด้วยเทคนิคปราศจากเชื้อ (Aseptic Technique)\n• ตรึงสาย Foley's Catheter อย่างถูกต้อง ดูแลให้อยู่ต่ำกว่ากระเพาะปัสสาวะและเป็นระบบปิดเสมอ\n• เทปัสสาวะเมื่อถึง 3/4 ถุง เช็ดข้อต่อด้วย 70% Alcohol ทั้งก่อนและหลังเท\n• ถอดสายออกโดยเร็วที่สุดเมื่อหมดข้อบ่งชี้"
      },
      {
        subtitle: "การป้องกันการติดเชื้อจากสายสวนหลอดเลือด (CLABSI)",
        details: "• ใช้ 2% Chlorhexidine Gluconate in 70% Alcohol ทาผิวหนังก่อนทำหัตถการและทำความสะอาดแผล\n• ใช้ Maximize Barrier เคร่งครัดขณะใส่สายสวนหลอดเลือดดำส่วนกลาง"
      }
    ],
    kpis: [
      "อัตราการติดเชื้อในโรงพยาบาล (Healthcare-associated infections) ต่อ 1,000 วันนอน",
      "อัตราการติดเชื้อ SSI ต่อ 100 operations",
      "อัตราการติดเชื้อ VAP ต่อ 1,000 Ventilator Days",
      "อัตราการติดเชื้อ CAUTI ต่อ 1,000 Catheter Days",
      "อัตราการติดเชื้อ CLABSI ต่อ 1,000 Catheter Days"
    ]
  },
  {
    id: 3,
    title: "บุคลากรติดเชื้อจากการปฏิบัติหน้าที่",
    icon: "💉",
    owner: "คุณวิชุดา หัสโน",
    role: "งานสร้างเสริมสุขภาพและชีวอนามัย",
    guidelines: [
      {
        subtitle: "การดูแลเมื่อเกิดอุบัติเหตุทางการแพทย์",
        details: "• ทำการปฐมพยาบาลเบื้องต้นทันที ณ จุดเกิดเหตุ (เช่น ล้างแผลด้วยน้ำสะอาดสะพรั่งกรณีถูกของแหลมทิ่มตำ หรือล้างตาด้วยน้ำเกลือกรณีสารคัดหลั่งกระเด็นใส่)\n• รายงานอุบัติการณ์และดำเนินการตามแผนภูมิการปฏิบัติเมื่อเกิดอุบัติเหตุทางการแพทย์ของโรงพยาบาลทันที"
      },
      {
        subtitle: "การให้ภูมิคุ้มกันโรคติดต่อเชิงรุก",
        details: "• บุคลากรที่สัมผัสโรคติดต่อจะได้รับการประเมินความเสี่ยง การรักษา และวัคซีนที่เหมาะสมโดยอายุรแพทย์\n• การป้องกันเชิงรุก: ให้วัคซีนตามแนวทางมาตรฐานแก่กลุ่มเสี่ยง เช่น วัคซีนไวรัสตับอักเสบ บี (Hepatitis B), MMR (Measles, Mumps, Rubella)"
      }
    ],
    kpis: ["จำนวนอุบัติการณ์เจ้าหน้าที่ติดเชื้อจากการทำงาน (เป้าหมายเป็น 0)"]
  },
  {
    id: 4,
    title: "การเกิด Medication Error & Adverse Drug Reactions",
    icon: "💊",
    owner: "ภญ.มนชยา อุดมกิตติ",
    role: "หัวหน้ากลุ่มงานเภสัชกรรม",
    guidelines: [
      {
        subtitle: "การใช้ยาที่ปลอดภัย (Medication Safety)",
        details: "• ตรวจสอบความถูกต้องของผู้ป่วยและโรคทุกครั้ง\n• สนับสนุนการใช้ระบบ Computerized Physician Order Entry (CPOE)\n• เขียนตัวอักษร ตัวเลขให้ชัดเจน ห้ามใช้ตัวย่อที่ไม่ได้กำหนดไว้ในโรงพยาบาล\n• ลงบันทึกเวลาและลงชื่อพยาบาลผู้บริหารยาในใบ MAR ทุกครั้ง"
      },
      {
        subtitle: "การจัดการยาความเสี่ยงสูง (High Alert Drugs - HAD)",
        details: "• ติดสติกเกอร์ 'วงกลมสีชมพูสด' ที่ช่องยา/หลอดยา\n• จัดเก็บกลุ่มยาเสพติดในตู้ที่ใส่กุญแจมิดชิด\n• ห้ามสั่งยาด้วยวาจา ยกเว้นกรณีฉุกเฉินวิกฤต ซึ่งต้องมีกระบวนการทวนสอบคำสั่ง (Read back) ทันที\n• พยาบาลตรวจสอบ 2 คน (Double Check) ก่อนบริหารยาทุกครั้ง เพื่อให้ถูกคน ถูกขนาด ถูกชนิดยา ถูกเวลา ถูกวิธี"
      },
      {
        subtitle: "ระบบป้องกันการแพ้ยาซ้ำ (Adverse Drug Reactions - ADR)",
        details: "• ซักประวัติการแพ้ยาทุกครั้งเมื่อรับผู้ป่วยใหม่หรือเริ่มยาใหม่\n• ติดสติกเกอร์ 'ADR สีแดง' ที่ IPD Chart และระบุในใบ MAR เสมอ\n• ทำ Medication Reconciliation เมื่อผู้ป่วยมารับการรักษา เปลี่ยนแผนก หรือจำหน่ายผู้ป่วย"
      }
    ],
    kpis: [
      "อัตราความคลาดเคลื่อนทางยา (Medication Error): Prescribing, Transcribing, Pre-dispensing, Dispensing, Administration",
      "จำนวนอุบัติการณ์การแพ้ยาซ้ำ (เป้าหมายเป็น 0)"
    ]
  },
  {
    id: 5,
    title: "การให้เลือดผิดคน ผิดหมู่ ผิดชนิด",
    icon: "🩸",
    owner: "คุณอ้อยใจ ลือฉาย",
    role: "หัวหน้ากลุ่มงานเทคนิคการแพทย์",
    guidelines: [
      {
        subtitle: "การตรวจสอบก่อนให้เลือด",
        details: "• ตรวจสอบ ชื่อ-นามสกุล, HN, AN, หมู่เลือดบนถุงเลือด และใบ Doctor's order sheet ให้ตรงกันทุกจุด\n• ก่อนบริหารเลือดเข้าตัวผู้ป่วย ต้องสอบถามข้อมูลตัวตนและหมู่เลือดโดยตรงจากผู้ป่วย (หากผู้ป่วยรู้สึกตัวดี)"
      },
      {
        subtitle: "ระบบตรวจสอบซ้ำ 2 บุคคล (2-Professional Check)",
        details: "• กำหนดให้ผู้ประกอบวิชาชีพทางการแพทย์ 2 คน ร่วมตรวจสอบความถูกต้องตรงกันของข้อมูลผู้ป่วยและถุงเลือดที่ข้างเตียงผู้ป่วย พร้อมลงชื่อกำกับในแบบบันทึกก่อนเริ่มให้เลือดทุกครั้ง"
      }
    ],
    kpis: ["จำนวนอุบัติการณ์การให้เลือดผิดคน ผิดหมู่ ผิดชนิด (เป้าหมายเป็น 0)"]
  },
  {
    id: 6,
    title: "การระบุตัวผู้ป่วยผิดพลาด",
    icon: "🏷️",
    owner: "คุณทัศนียา สายแวว",
    role: "พยาบาลวิชาชีพ / หัวหน้างานบริหารความเสี่ยง",
    guidelines: [
      {
        subtitle: "การใช้ 3 ตัวบ่งชี้ (3 Identifiers)",
        details: "• ใช้ตัวบ่งชี้อย่างน้อย 3 ตัวร่วมกันในการยืนยันตัวตน ได้แก่: ชื่อ-นามสกุล, วันเดือนปีเกิด, และ Hospital Number (HN)\n• ห้ามใช้หมายเลขห้องพัก หรือเลขเตียง เป็นตัวบ่งชี้ตัวตนผู้ป่วยเด็ดขาด"
      },
      {
        subtitle: "การใช้ป้ายข้อมือระบุตัวตน (Wristband)",
        details: "• ต้องใส่ป้ายข้อมือระบุข้อมูลที่ถูกต้อง โดยเฉพาะในผู้ป่วยเด็ก, ผู้ป่วยวิกฤต/หมดสติ (Coma) หรือผู้ป่วยที่มีอาการสับสน"
      }
    ],
    kpis: ["จำนวนอุบัติการณ์ระบุตัวผู้ป่วยผิดพลาด (เป้าหมายเป็น 0)"]
  },
  {
    id: 7,
    title: "ความคลาดเคลื่อนในการวินิจฉัยโรค",
    icon: "🔍",
    owner: "นพ.สถาพร มณี",
    role: "นายแพทย์เชี่ยวชาญ / รองผู้อำนวยการฝ่ายการแพทย์",
    guidelines: [
      {
        subtitle: "กระบวนการเรียนรู้และทบทวนความผิดพลาด",
        details: "• นำข้อผิดพลาดด้านการวินิจฉัย (Diagnosis Error) มาศึกษาและทบทวนร่วมกันผ่านกิจกรรมวิชาการ ได้แก่ Grand Rounds, Morbidity & Mortality (MM) Conference\n• ใช้ Trigger Tools ในการค้นหาและทบทวนเวชระเบียนเชิงรุก เพื่อหาโอกาสพัฒนา"
      }
    ],
    kpis: ["จำนวนอุบัติการณ์การวินิจฉัยคลาดเคลื่อน (Diagnosis Error: Misdiagnosis / Delay Diagnosis) ที่มีความรุนแรงระดับ E ขึ้นไป"]
  },
  {
    id: 8,
    title: "การรายงานผล Lab / Patho คลาดเคลื่อน",
    icon: "🔬",
    owner: "คุณอ้อยใจ ลือฉาย",
    role: "หัวหน้ากลุ่มงานเทคนิคการแพทย์",
    guidelines: [
      {
        subtitle: "การเก็บสิ่งส่งตรวจที่ถูกต้องแม่นยำ",
        details: "• ระบุตัวผู้ป่วยอย่างถูกต้องขณะเก็บสิ่งส่งตรวจ (ยึดหลัก 3 Identifiers)\n• เตรียมตัวผู้ป่วยให้ถูกต้องตามเทส และใช้ชนิด/สัดส่วนสารกันเลือดแข็งอย่างเหมาะสมกับปริมาณเลือด\n• ห้ามเก็บสิ่งส่งตรวจจากสายน้ำเกลือหรือตำแหน่งที่อาจเกิดการเจือจาง"
      },
      {
        subtitle: "การระบุและการจัดการสิ่งส่งตรวจต่อหน้าผู้ป่วย",
        details: "• ติดฉลาก (Label) บนหลอดเก็บสิ่งส่งตรวจต่อหน้าผู้ป่วยทันที เขียนข้อมูลชัดเจนอ่านง่าย\n• ควบคุมอุณหภูมิ ระยะเวลา และสิ่งรบกวน (เช่น แสงสว่าง, ออกซิเจน) ระหว่างการขนส่งอย่างเคร่งครัด เพื่อป้องกันการเสื่อมสภาพของสิ่งส่งตรวจ"
      },
      {
        subtitle: "ความถูกต้องในกระบวนการรายงานผล",
        details: "• ยืนยันข้อมูลสิ่งส่งตรวจให้ตรงกับระบบรายงานและตัวผู้ป่วยในขณะวิเคราะห์\n• มีระบบสอบกลับสิ่งส่งตรวจย่อย (Aliquot) ไปยัง primary sample ได้อย่างแม่นยำ"
      }
    ],
    kpis: ["จำนวนอุบัติการณ์การรายงานผลแล็บหรือพยาธิวิทยาคลาดเคลื่อน (ล่าช้า, ผิดหลอด, ผิดวิธี, ผลสลับกัน) ระดับ E ขึ้นไป"]
  },
  {
    id: 9,
    title: "การคัดกรองที่ห้องฉุกเฉินคลาดเคลื่อน",
    icon: "🚑",
    owner: "คุณรุ่งเจริญ ภะวัง",
    role: "หัวหน้างานอุบัติเหตุและฉุกเฉิน (ER)",
    guidelines: [
      {
        subtitle: "มาตรฐานการคัดแยก MOPH Triage",
        details: "• ใช้เกณฑ์การคัดแยกและจัดลำดับการบริบาลตามมาตรฐานของสถาบันการแพทย์ฉุกเฉินแห่งชาติอย่างเคร่งครัด\n• แบ่งผู้ป่วยเป็น 5 ระดับสี: แดง (วิกฤต), ชมพู (ฉุกเฉิน), เหลือง (ด่วน), เขียว (ไม่รุนแรง), ขาว (ทั่วไป)"
      },
      {
        subtitle: "การประเมินและการพัฒนาบุคลากร",
        details: "• บุคลากรผู้ทำหน้าที่คัดแยกที่จุด Triage ต้องได้รับการฝึกอบรมเฉพาะทางและประเมินสมรรถนะสม่ำเสมอ\n• ผู้ป่วยวิกฤตสีแดง (Critical) ต้องได้รับการประเมินคัดแยกและเข้าห้องช่วยชีวิตภายใน 4 นาที"
      },
      {
        subtitle: "เกณฑ์การเฝ้าระวังคุณภาพการคัดแยก",
        details: "• ควบคุมอัตราการประเมินเกินจริง (Over-triage) ให้ไม่เกิน 15%\n• ควบคุมอัตราการประเมินต่ำกว่าจริง (Under-triage) ซึ่งเป็นอันตรายต่อผู้ป่วย ให้ไม่เกิน 5%"
      }
    ],
    kpis: ["จำนวนอุบัติการณ์คัดแยกห้องฉุกเฉินคลาดเคลื่อน (Under Triage / Over Triage) ที่มีความรุนแรงระดับ E ขึ้นไป"]
  }
];

const tabs = [
  { id: "dashboard", label: "📊 หน้าหลัก & ค้นหา" },
  { id: "standards", label: "📋 มาตรฐาน 9 ข้อ" },
  { id: "handwash-tool", label: "🧼 ฝึกหัดล้างมือ 7 ขั้นตอน" },
  { id: "rca-helper", label: "⚠️ เครื่องมือช่วยวิเคราะห์ RCA" }
];

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedStandard, setSelectedStandard] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [washStep, setWashStep] = useState(0);
  const [washTimer, setWashTimer] = useState(30);
  const [isWashing, setIsWashing] = useState(false);
  const [rcaLevel, setRcaLevel] = useState("A");
  const [rcaDepartment, setRcaDepartment] = useState("");
  const [rcaIncident, setRcaIncident] = useState("");
  const [rcaWhy1, setRcaWhy1] = useState("");
  const [rcaWhy2, setRcaWhy2] = useState("");
  const [rcaWhy3, setRcaWhy3] = useState("");
  const [rcaSolution, setRcaSolution] = useState("");
  const [rcaReportGenerated, setRcaReportGenerated] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const filteredStandards = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return STANDARDS_DATA;
    return STANDARDS_DATA.filter((std) =>
      std.title.toLowerCase().includes(query) ||
      std.owner.toLowerCase().includes(query) ||
      std.guidelines.some((guide) =>
        guide.subtitle.toLowerCase().includes(query) ||
        guide.details.toLowerCase().includes(query)
      )
    );
  }, [searchQuery]);

  useEffect(() => {
    if (!isWashing) return undefined;
    if (washTimer > 0) {
      const interval = setInterval(() => setWashTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
    setIsWashing(false);
    if (washStep < 7) {
      setWashStep((prev) => prev + 1);
      setWashTimer(30);
      setIsWashing(true);
    } else {
      setWashStep(8);
    }
    return undefined;
  }, [isWashing, washTimer, washStep]);

  const startWashing = () => {
    setWashStep(1);
    setWashTimer(30);
    setIsWashing(true);
  };

  const resetWashing = () => {
    setWashStep(0);
    setWashTimer(30);
    setIsWashing(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("คัดลอกข้อมูลรายงานแล้ว!");
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      alert("คัดลอกข้อมูลรายงานแล้ว!");
    }
  };

  const openStandard = (id) => {
    setActiveTab("standards");
    setSelectedStandard(id);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      <Header logoError={logoError} setLogoError={setLogoError} />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} resetWashing={resetWashing} setSelectedStandard={setSelectedStandard} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === "dashboard" && (
          <Dashboard
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredStandards={filteredStandards}
            openStandard={openStandard}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "standards" && (
          <Standards selectedStandard={selectedStandard} setSelectedStandard={setSelectedStandard} />
        )}
        {activeTab === "handwash-tool" && (
          <Handwash
            washStep={washStep}
            washTimer={washTimer}
            startWashing={startWashing}
            resetWashing={resetWashing}
            setWashStep={setWashStep}
            setWashTimer={setWashTimer}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "rca-helper" && (
          <RcaHelper
            rcaLevel={rcaLevel}
            setRcaLevel={setRcaLevel}
            rcaDepartment={rcaDepartment}
            setRcaDepartment={setRcaDepartment}
            rcaIncident={rcaIncident}
            setRcaIncident={setRcaIncident}
            rcaWhy1={rcaWhy1}
            setRcaWhy1={setRcaWhy1}
            rcaWhy2={rcaWhy2}
            setRcaWhy2={setRcaWhy2}
            rcaWhy3={rcaWhy3}
            setRcaWhy3={setRcaWhy3}
            rcaSolution={rcaSolution}
            setRcaSolution={setRcaSolution}
            rcaReportGenerated={rcaReportGenerated}
            setRcaReportGenerated={setRcaReportGenerated}
            copyToClipboard={copyToClipboard}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

function Header({ logoError, setLogoError }) {
  return (
    <header className="bg-teal-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-full w-14 h-14 flex items-center justify-center shadow-inner overflow-hidden">
            {!logoError ? (
              <img
                src="https://drive.google.com/thumbnail?id=1qmRRD4m9rCOFtL4pAeGIc8vuds6nvxQx&sz=w200"
                alt="โลโก้โรงพยาบาลวารินชำราบ"
                className="h-10 w-10 object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-800" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11H9v3H6v2h3v3h2v-3h3v-2h-3V7z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Warin 9 Essential Standards</h1>
            <p className="text-teal-100 text-sm">แนวปฏิบัติตามมาตรฐานสำคัญจำเป็นต่อความปลอดภัย 9 ข้อ • โรงพยาบาลวารินชำราบ</p>
          </div>
        </div>
        <div className="text-right text-xs text-teal-100 bg-teal-900 bg-opacity-40 p-3 rounded-lg border border-teal-700">
          <p>ประกาศ ณ วันที่ 6 กันยายน 2566</p>
          <p className="font-semibold text-white">โดยผู้อำนวยการโรงพยาบาล</p>
        </div>
      </div>
    </header>
  );
}

function Navigation({ activeTab, setActiveTab, resetWashing, setSelectedStandard }) {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 py-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === "handwash-tool") resetWashing();
                if (tab.id === "standards") setSelectedStandard(1);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                activeTab === tab.id ? "bg-teal-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Dashboard({ searchQuery, setSearchQuery, filteredStandards, openStandard, setActiveTab }) {
  return (
    <div className="space-y-6">
      <section className="bg-gradient-to-r from-teal-800 to-cyan-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-teal-500 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">นโยบายความปลอดภัยสูงสุด</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">มาตรฐานสำคัญจำเป็นต่อความปลอดภัย 9 ข้อ</h2>
          <p className="mt-2 text-teal-100 max-w-2xl text-sm sm:text-base">
            เมื่อเกิดเหตุการณ์ไม่พึงประสงค์ที่มีผลกระทบถึงตัวผู้ป่วย (ระดับ E ขึ้นไป) โรงพยาบาลกำหนดให้ทีมวิเคราะห์หาสาเหตุราก (RCA) และจัดทำแผนควบคุมป้องกันความเสี่ยงอย่างเป็นระบบทันที
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => setActiveTab("rca-helper")} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-4 py-2 rounded-lg text-sm transition-all">
              🚨 เริ่มบันทึก RCA ด่วน (ระดับ E+)
            </button>
            <button onClick={() => openStandard(2)} className="bg-white hover:bg-teal-50 text-teal-900 font-semibold px-4 py-2 rounded-lg text-sm transition-all">
              🔍 ดูแนวทางลดการติดเชื้อ (SSI/VAP)
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-2">🔍 ค้นหาด่วนแนวปฏิบัติเพื่อความปลอดภัย</h3>
        <p className="text-slate-500 text-sm mb-4">ระบุคำค้นหาเพื่อดึงข้อมูลมาตรฐาน ข้อปฏิบัติ หรือผู้รับผิดชอบจากระบบคลังความรู้</p>
        <div className="relative">
          <input
            type="text"
            placeholder="ตัวอย่างเช่น: 'ล้างมือ', 'VAP', 'ตรวจเลือด', 'ADR', 'ผู้รับผิดชอบ'..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-base"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {searchQuery && (
          <div className="mt-4 bg-teal-50 bg-opacity-50 p-4 rounded-xl border border-teal-100">
            <p className="text-xs font-semibold text-teal-800 mb-2">ผลลัพธ์การค้นหา ({filteredStandards.length} รายการ):</p>
            <div className="divide-y divide-teal-100">
              {filteredStandards.map((std) => (
                <div key={std.id} className="py-2 flex justify-between items-center gap-3">
                  <span className="text-sm text-slate-700 font-medium">{std.id}. {std.title}</span>
                  <button onClick={() => openStandard(std.id)} className="text-xs font-semibold text-teal-600 hover:text-teal-800 whitespace-nowrap">
                    เปิดดูรายละเอียด →
                  </button>
                </div>
              ))}
              {filteredStandards.length === 0 && <p className="text-sm text-slate-500 py-2">ไม่พบแนวทางปฏิบัติที่ตรงกับคำค้นหาของคุณ</p>}
            </div>
          </div>
        )}
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">📌 มาตรฐานสำคัญจำเป็น 9 ข้อ (9 Essential Standard for Safety)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STANDARDS_DATA.map((std) => (
            <div key={std.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-3xl">{std.icon}</span>
                  <span className="bg-teal-50 text-teal-800 font-bold text-xs px-2.5 py-1 rounded-full border border-teal-100">ข้อที่ {std.id}</span>
                </div>
                <h4 className="font-bold text-slate-800 leading-snug mb-2">{std.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4">แนวทางความปลอดภัย: {std.guidelines[0]?.details}</p>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">ผู้รับผิดชอบหลัก</span>
                  <span className="text-xs font-semibold text-slate-700">{std.owner}</span>
                </div>
                <button onClick={() => openStandard(std.id)} className="bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                  เรียนรู้แนวทาง
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">📚 เอกสารเพิ่มเติมและแนวทางอ้างอิง</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResourceCard
            label="QR ยา/เลือด"
            title="คู่มือการเพิ่มความปลอดภัยในการใช้ยาและเลือด"
            text="จัดทำโดย แพทยสภา เพื่อป้องกันอุบัติการณ์คลาดเคลื่อนร้ายแรงในการให้เลือดและบริหารยาในหอผู้ป่วย"
            link="https://tmc.or.th/download/inside_36_p.pdf"
            linkText="เข้าสู่เว็บไซต์แพทยสภา →"
          />
          <ResourceCard
            label="QR IC Manual"
            title="แนวปฏิบัติเพื่อป้องกันและควบคุมการติดเชื้อใน รพ."
            text="จัดทำโดย สถาบันบำราศนราดูร กรมควบคุมโรค กระทรวงสาธารณสุข สำหรับควบคุม SSI, VAP, CAUTI, CLABSI"
            link="https://ddc.moph.go.th/uploads/ckeditor2//files/IPC%20Guidelines%20for%20Thailand%202024.pdf"
            linkText="เว็บไซต์กรมควบคุมโรค →"
          />
        </div>
      </section>
    </div>
  );
}

function ResourceCard({ label, title, text, link, linkText }) {
  return (
    <div className="flex items-start gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
      <div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0">
        <div className="w-20 h-20 bg-slate-200 flex items-center justify-center relative">
          <div className="absolute inset-1 border border-slate-400 grid grid-cols-3 grid-rows-3 p-1 gap-1">
            {[0, 2, 4, 6, 8].map((cell) => <div key={cell} className="bg-black"></div>)}
          </div>
          <span className="text-[8px] bg-white px-1 z-10 text-center font-bold">{label}</span>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-sm text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500 mt-1">{text}</p>
        <a href={link} target="_blank" rel="noreferrer" className="text-xs text-teal-600 hover:underline font-semibold mt-2 inline-block">{linkText}</a>
      </div>
    </div>
  );
}

function Standards({ selectedStandard, setSelectedStandard }) {
  const std = STANDARDS_DATA.find((item) => item.id === selectedStandard);
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside className="w-full lg:w-1/3 space-y-2">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">เลือกมาตรฐานความปลอดภัย</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
          {STANDARDS_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedStandard(item.id)}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                selectedStandard === item.id ? "bg-teal-600 border-teal-600 text-white shadow-md" : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <span className="text-xs font-semibold line-clamp-2">ข้อที่ {item.id}: {item.title}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="w-full lg:w-2/3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-2 bg-slate-50 rounded-xl">{std.icon}</span>
            <div>
              <span className="text-xs font-bold text-teal-600 tracking-wider uppercase">มาตรฐานโรงพยาบาลข้อที่ {std.id}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">{std.title}</h2>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2"><span className="w-1 h-5 bg-teal-500 rounded-full inline-block"></span>มาตรฐานและแนวทางปฏิบัติของโรงพยาบาลวารินชำราบ</h3>
            <div className="space-y-4">
              {std.guidelines.map((guide) => (
                <div key={guide.subtitle} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-sm text-teal-800 mb-1.5 flex items-center gap-1.5">🌀 {guide.subtitle}</h4>
                  <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">{guide.details}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2"><span className="w-1 h-5 bg-teal-500 rounded-full inline-block"></span>ตัวชี้วัดคุณภาพระดับโรงพยาบาล (KPIs)</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {std.kpis.map((kpi) => (
                <li key={kpi} className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-rose-900 text-xs flex items-start gap-2">
                  <span className="text-rose-500">🎯</span>
                  <span className="font-semibold leading-relaxed">{kpi}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-slate-200 pt-6">
            <div className="bg-teal-50 border border-teal-100 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white text-lg font-bold">{std.owner.replace("คุณ", "").replace("นพ.", "").substring(0, 2)}</div>
                <div>
                  <p className="text-xs text-slate-500">ผู้รับผิดชอบมาตรฐานนี้ (Owner)</p>
                  <h4 className="font-bold text-slate-800 text-sm">{std.owner}</h4>
                  <p className="text-xs text-slate-500">{std.role}</p>
                </div>
              </div>
              <span className="text-xs bg-white text-teal-800 border border-teal-200 px-3 py-1.5 rounded-lg font-bold self-start sm:self-auto">ติดต่อประสานงาน</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Handwash({ washStep, washTimer, startWashing, resetWashing, setWashStep, setWashTimer, setActiveTab }) {
  const stepContent = {
    1: ["🙌", "ฟอกฝ่ามือด้านข้าง", "ถูฝ่ามือด้วยฝ่ามือสลับข้างกัน"],
    2: ["🖐️", "ฟอกง่ามนิ้วมือด้านหน้า", "ถูฝ่ามือประสานนิ้วมือเพื่อเข้าซอก"],
    3: ["🤚", "ฟอกหลังมือและง่ามนิ้วมือด้านหลัง", "ใช้ฝ่ามือถูหลังมือสลับกันสองข้าง"],
    4: ["👊", "ฟอกนิ้วและข้อนิ้วมือด้านหลัง", "กำหมัดขัดถูหลังนิ้วมือกับฝ่ามือฝั่งตรงข้าม"],
    5: ["👍", "ฟอกนิ้วหัวแม่มือ", "ใช้ฝ่ามือกำรอบนิ้วโป้งแล้วหมุนถูสลับข้าง"],
    6: ["💅", "ฟอกปลายนิ้วและเล็บ", "ใช้ปลายนิ้วถูขวางฝ่ามือฝั่งตรงข้าม"],
    7: ["⌚", "ฟอกรอบข้อมือ", "ฟอกบริเวณรอบๆ ข้อมือให้ทั่วสลับซ้ายขวา"]
  };
  const current = stepContent[washStep];

  return (
    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-4xl">🧼</span>
        <h2 className="text-2xl font-bold text-slate-800 mt-2">โปรแกรมฝึกหัดล้างมือ 7 ขั้นตอน (Hand Hygiene Practice)</h2>
        <p className="text-slate-500 text-xs mt-1">ใช้สำหรับการซักซ้อมบุคลากร พยาบาล นักศึกษาฝึกงาน เพื่อควบคุมอุบัติการณ์ SSI, VAP, CAUTI</p>
      </div>
      {washStep === 0 && (
        <div className="text-center py-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
          <p className="text-slate-600 text-sm mb-4">พร้อมสำหรับการฝึกปฏิบัติล้างมือเพื่อสุขอนามัยในโรงพยาบาลแล้วหรือยัง?</p>
          <button onClick={startWashing} className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-xl text-base shadow-md transition-all">🚀 เริ่มต้นการล้างมือ (ขั้นตอนละ 30 วินาที)</button>
        </div>
      )}
      {washStep >= 1 && washStep <= 7 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-teal-50 p-3 rounded-xl border border-teal-100">
            <span className="font-bold text-sm text-teal-800">ขั้นตอนที่ {washStep} / 7</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <span key={step} className={`w-3 h-3 rounded-full ${step === washStep ? "bg-teal-600 animate-ping" : step < washStep ? "bg-teal-500" : "bg-slate-300"}`}></span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-teal-100 rounded-2xl p-6 flex items-center justify-center min-h-48 border border-teal-200">
              <div className="text-center">
                <span className="text-6xl">{current[0]}</span>
                <p className="font-bold text-slate-800 mt-2 text-base">{current[1]}</p>
                <p className="text-xs text-slate-500 mt-1">{current[2]}</p>
              </div>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-block bg-teal-50 px-4 py-2 rounded-2xl border border-teal-100">
                <p className="text-xs text-teal-800 font-bold uppercase tracking-wider">เวลากิจกรรมคงเหลือ</p>
                <h3 className="text-4xl font-extrabold text-teal-600">{washTimer} วินาที</h3>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">ข้อสังเกตความปลอดภัยเพิ่มเติม:</h4>
                <p className="text-xs text-slate-500 mt-1">• ฟอกมือสลับกันทั้ง 2 ข้าง ทุกขั้นตอนอย่างต่อเนื่อง</p>
                <p className="text-xs text-slate-500 mt-1">• อัลกอฮอล์เจลหลังเปิดใช้ต้องระบุวันหมดอายุสั้นลงไม่เกิน 28 วัน</p>
              </div>
              <div className="flex justify-center md:justify-start gap-2">
                <button
                  onClick={() => {
                    if (washStep < 7) {
                      setWashStep((prev) => prev + 1);
                      setWashTimer(30);
                    } else {
                      setWashStep(8);
                    }
                  }}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  ข้ามขั้นตอนนี้
                </button>
                <button onClick={resetWashing} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-semibold">ยกเลิกการล้างมือ</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {washStep === 8 && (
        <div className="text-center py-8 bg-teal-50 rounded-2xl border border-teal-100">
          <span className="text-6xl">🎉🌟</span>
          <h3 className="text-xl font-bold text-teal-800 mt-4">ล้างมือครบ 7 ขั้นตอนตามมาตรฐานแล้ว!</h3>
          <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">ขอบคุณที่ช่วยลดอัตราการแพร่กระจายเชื้อดื้อยา และร่วมปกป้องผู้ป่วยจาก SSI, VAP, CAUTI, CLABSI ในสถาบันของเรา</p>
          <div className="mt-6 flex justify-center gap-2">
            <button onClick={startWashing} className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2 rounded-xl text-xs">เริ่มฝึกอีกครั้ง</button>
            <button onClick={() => setActiveTab("dashboard")} className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-2 rounded-xl text-xs font-semibold">กลับหน้าหลัก</button>
          </div>
        </div>
      )}
    </section>
  );
}

function RcaHelper(props) {
  const {
    rcaLevel, setRcaLevel, rcaDepartment, setRcaDepartment, rcaIncident, setRcaIncident,
    rcaWhy1, setRcaWhy1, rcaWhy2, setRcaWhy2, rcaWhy3, setRcaWhy3,
    rcaSolution, setRcaSolution, rcaReportGenerated, setRcaReportGenerated, copyToClipboard
  } = props;
  const urgent = ["E", "F", "G", "H", "I"].includes(rcaLevel);
  const reportText = `รายงานการวิเคราะห์หาสาเหตุราก (RCA) - รพ.วารินชำราบ\nระดับความรุนแรง: ระดับ ${rcaLevel}\nหน่วยงาน: ${rcaDepartment}\nอุบัติการณ์: ${rcaIncident}\nเหตุผลทำไม 1-3: ${rcaWhy1} -> ${rcaWhy2} -> ${rcaWhy3}\nแนวทางป้องกัน: ${rcaSolution}`;

  return (
    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
      <div className="flex items-start gap-3 border-b border-slate-100 pb-4 mb-6">
        <span className="text-4xl">⚠️</span>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">เครื่องมือช่วยบันทึกวิเคราะห์ RCA</h2>
          <p className="text-slate-500 text-xs mt-0.5">ช่วยจัดทำแนวทางการทบทวนวิเคราะห์หาสาเหตุราก (Root Cause Analysis) เมื่อพบอุบัติการณ์ในโรงพยาบาล</p>
        </div>
      </div>
      <div className="mb-6 p-4 rounded-xl border border-amber-100 bg-amber-50">
        <h4 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">🚨 นโยบายความปลอดภัยของโรงพยาบาลวารินชำราบ:</h4>
        <p className="text-xs text-amber-800 mt-1 leading-relaxed">กรณีเกิดอุบัติการณ์ไม่พึงประสงค์ที่มีผลกระทบถึงตัวผู้ป่วยตั้งแต่ <strong>ความรุนแรงระดับ E ขึ้นไป</strong> กำหนดให้เจ้าหน้าที่/ทีมประสานงาน ดำเนินการจัดตั้งทีมทบทวน RCA และทำแผนป้องกันทันที</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <FormField label="ความรุนแรงของอุบัติการณ์">
            <select value={rcaLevel} onChange={(event) => setRcaLevel(event.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold">
              {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((level) => (
                <option key={level} value={level}>ระดับ {level}{["E", "F", "G", "H", "I"].includes(level) ? " (บังคับทำ RCA)" : ""}</option>
              ))}
            </select>
          </FormField>
          <FormField label="แผนก / หน่วยงานที่เกี่ยวข้อง">
            <input type="text" placeholder="เช่น: ห้องอุบัติเหตุและฉุกเฉิน (ER), ตึกผู้ป่วยในชาย..." value={rcaDepartment} onChange={(event) => setRcaDepartment(event.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs" />
          </FormField>
          <FormField label="รายละเอียดอุบัติการณ์ (เกิดอะไรขึ้น)">
            <textarea rows={2} placeholder="รายละเอียดสั้นๆ ของสิ่งที่เกิดขึ้น..." value={rcaIncident} onChange={(event) => setRcaIncident(event.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs" />
          </FormField>
          <FormField label="วิเคราะห์สาเหตุเชิงลึก (หลักการ 5-Whys)">
            <div className="space-y-2">
              <input type="text" placeholder="ทำไมที่ 1: เหตุใดจึงเกิดเหตุการณ์นี้ขึ้น..." value={rcaWhy1} onChange={(event) => setRcaWhy1(event.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs" />
              <input type="text" placeholder="ทำไมที่ 2: อะไรคือปัจจัยที่หนุนให้เกิดทำไมที่ 1..." value={rcaWhy2} onChange={(event) => setRcaWhy2(event.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs" />
              <input type="text" placeholder="ทำไมที่ 3: สาเหตุมุมมองระบบหรือโครงสร้างเบื้องหลัง..." value={rcaWhy3} onChange={(event) => setRcaWhy3(event.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs" />
            </div>
          </FormField>
          <FormField label="แนวทางแก้ไขและแผนป้องกันความเสี่ยงในอนาคต">
            <textarea rows={2} placeholder="มาตรการใหม่หรือระบบการสกัดกั้นเพื่อป้องกันการเกิดซ้ำ..." value={rcaSolution} onChange={(event) => setRcaSolution(event.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs" />
          </FormField>
          <button onClick={() => setRcaReportGenerated(true)} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-lg text-xs transition-colors">📝 สร้างโครงร่างรายงาน RCA</button>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <h4 className="font-bold text-slate-800 text-sm mb-3">📋 ตัวอย่างโครงร่างรายงาน RCA</h4>
          {rcaReportGenerated ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-[11px] leading-relaxed text-slate-700 font-mono select-all">
                <p className="font-bold text-center border-b pb-2 mb-2 text-xs">บันทึกวิเคราะห์ RCA - รพ.วารินชำราบ</p>
                <p><strong>[ระดับความรุนแรง]</strong> ระดับ {rcaLevel} {urgent ? "🔴 ต้องทำแผนวิเคราะห์หาสาเหตุราก (RCA) ด่วน!" : "🟢 ระดับความรุนแรงปกติ"}</p>
                <p><strong>[หน่วยงาน]</strong> {rcaDepartment || "ไม่ได้ระบุ"}</p>
                <p><strong>[อุบัติการณ์]</strong> {rcaIncident || "ไม่ได้ระบุ"}</p>
                <p><strong>[การวิเคราะห์สาเหตุด้วยหลักการ Why-Why]</strong></p>
                <p className="pl-3">- ทำไมที่ 1: {rcaWhy1 || "-"}</p>
                <p className="pl-3">- ทำไมที่ 2: {rcaWhy2 || "-"}</p>
                <p className="pl-3">- ทำไมที่ 3: {rcaWhy3 || "-"}</p>
                <p><strong>[แนวทางการแก้ไขป้องกันความเสี่ยง]</strong> {rcaSolution || "ไม่ได้ระบุ"}</p>
                <p className="mt-4 border-t pt-2 text-[9px] text-slate-400 text-center">พิมพ์หรือบันทึกข้อมูลเพื่อส่งต่อผู้ดูแลระบบหรือกรอกในระบบความเสี่ยง</p>
              </div>
              <button onClick={() => copyToClipboard(reportText)} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 rounded-lg text-xs">📋 คัดลอกข้อมูลรายงาน</button>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center text-center py-10 text-slate-400">
              <span className="text-4xl mb-2">🖊️</span>
              <p className="text-xs">กรอกข้อมูลทางด้านซ้ายแล้วกดปุ่มเพื่อดูโครงร่างรายงานที่นี่</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-slate-600 mb-1">{label}</span>
      {children}
    </label>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 text-center text-xs space-y-1 text-slate-400">
        <p className="font-bold text-slate-300">ศูนย์พัฒนาคุณภาพ โรงพยาบาลวารินชำราบ</p>
        <p>© 2026 Warinchamrab Hospital Quality Improvement Center. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
