/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Building2, 
  Target, 
  ClipboardCheck, 
  TrendingUp, 
  Users, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Award,
  FileText,
  HardHat,
  Globe,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

// Color Palette
const COLORS = {
  navy: '#002B49',
  gold: '#C5A059',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
};

const SECTIONS = [
  { id: 'hero', title: 'البداية' },
  { id: 'context', title: 'التشكيل وإنطلاق الأعمال' },
  { id: 'members', title: 'الهيكل التنظيمي' },
  { id: 'event', title: 'الاجتماعات والفعاليات' },
  { id: 'reports', title: 'التقارير' },
  { id: 'methodology', title: 'منهجية التميز الصناعي' }
];

const MAKKAH_LOGO = "https://lh3.googleusercontent.com/d/1TS8j3CgRt1kUdIayUeJsL3l9PsbM6f2x";

// مصفوفة التقارير
const REPORTS = [
  { 
    title: 'تقرير لقاء اللجنة الصناعية مع القطاع الصناعي وجولة المصانع', 
    link: 'https://docs.google.com/presentation/d/1lqiGiUxnvwLaAuusFaZtJvQ7Vq2ey0dNY57DfQhSTdY/edit?usp=sharing',
    images: [
      'https://drive.google.com/file/d/1S0LYYijjcSNzm8kkZ0NzDvoQrOu26UnW/view?usp=sharing',
      'https://drive.google.com/file/d/1iNud5GFEgjsrgyqP_CAV4jgrqMTFXZND/view?usp=sharing','https://drive.google.com/file/d/1sZznXI0UFnjBnQT6K6_CIlDAFuD9fQwP/view?usp=sharing','https://drive.google.com/file/d/1IdaYifAuHTRY7re4r5H2_yo1U-7KTgdn/view?usp=sharing','https://drive.google.com/file/d/1KBQAExmf8e74SQm52YInLaaVKr1VLWdL/view?usp=sharing','https://drive.google.com/file/d/1dO4l8F2U17XC2HqKGnVvc-fwkaew3SuL/view?usp=sharing','https://drive.google.com/file/d/1PQxw4vSrbozIMShZavSAK7xuJHGM1nRC/view?usp=sharing'
    ]
  },
  { 
    title: 'تقرير معرض الصناعات الوطنية والاستهلاكية', 
    link: 'https://docs.google.com/presentation/d/1uepCIF2agnuZA4J9Ef2Z2tEgVrsmE-xNXe-rlArJ8BQ/edit?usp=drive_link',
    images: [
      'https://drive.google.com/file/d/1S77nYidGwJwM13mKrq-qot9nKHzvmD2X/view?usp=sharing',
      'https://drive.google.com/file/d/1vIdkUaHcKGmDrYQ1YTAQMp-eRoYfodzv/view?usp=sharing',
      'https://drive.google.com/file/d/16v2gnO5fMJNdd3UV6ICXXfI5MB1PkiQ5/view?usp=sharing',
    ]
  },
  { 
    title: 'تحدي تصاريح دخول العمالة غير المسلمة للمدن الصناعية الواقعة خارج حد الحرم', 
    link: 'https://drive.google.com/file/d/1RXcWRdu7a_8S_Bz2ySFG7o6pupwVEgnu/view?usp=sharing',
    images: [
      'https://drive.google.com/file/d/1LoMViSnRNxonccEOqOR4QAO9FPX2oqK-/view?usp=drive_link','https://drive.google.com/file/d/1RXcWRdu7a_8S_Bz2ySFG7o6pupwVEgnu/view?usp=sharing'
    ]
  }
];

// مصفوفة جميع أعضاء اللجنة
const ALL_MEMBERS = [
  { name: 'الأستاذ/ نائف بن مشعل الزايدي', role: 'رئيس اللجنة', image: 'https://drive.google.com/file/d/1gewg9D1POL8bY-WQ7GfksGYAsFUP0jr-/view?usp=sharing' },
  { name: 'المهندس/ حامد بن فؤاد سرحان', role: 'نائب الرئيس', image: 'https://drive.google.com/file/d/1HzEWS8Eo2DJ8FGeJ_B2SlrKS7i3kp78j/view?usp=sharing' },
  { name: 'الدكتور/ أحمد بن فايز القثامي', role: 'عضو اللجنة', image: 'https://drive.google.com/file/d/1-NSDXaGOK-2j_QeSkxRxszwhHDRQFHYu/view?usp=sharing' },
  { name: 'المهندس/ أمين بن عرفان عتيق', role: 'عضو اللجنة', image: 'https://drive.google.com/file/d/1K_gPXOXXvhS7rMPTQOSKmWarXCk51Wtv/view?usp=sharing' },
  { name: 'الأستاذة/ أنوار بنت عامر القرشي', role: 'عضو اللجنة', image: 'https://drive.google.com/file/d/1aiOc3HTNUcsvOjwHA5ewLL3C1nl2tS-8/view?usp=sharing' },
  { name: 'المهندس/ ايهاب بن عدنان مساوي', role: 'عضو اللجنة', image: 'https://drive.google.com/file/d/1EiCwPeytwB5eTmoL1ekeU8CJiJsMSXaU/view?usp=sharing' },
  { name: 'المهندس/ بدر بن عبدالمحسن الحربي', role: 'عضو مشارك', image: 'https://drive.google.com/file/d/1NXxGU_NZuooIoE2VYloKm1mn9cf09smu/view?usp=sharing' },
  { name: 'الأستاذ/ عبدالعزيز بن حمد المهباش', role: 'عضو مشارك', image: 'https://drive.google.com/file/d/1DOW9opIBzQCCMfHAPbl6Ju4IInnuvKs0/view?usp=sharing' },
  { name: 'المهندس/ علي بن محمد المصموم', role: 'عضو اللجنة', image: 'https://drive.google.com/file/d/1C9HmJiz9ek70AfEQc96zqIHOOSwMRzYu/view?usp=sharing' },
  { name: 'الأستاذ/ ماجد بن عادل الربوعي', role: 'عضو اللجنة', image: 'https://drive.google.com/file/d/1atOvfyi61-6GmlpqUq4fNbz_Jg6JRT19/view?usp=sharing' },
  { name: 'المهندس/ ماجد بن فايز الشهري', role: 'عضو اللجنة', image: 'https://drive.google.com/file/d/1fM4-5SJocBgKdSjErFO9Yna60qspxgfP/view?usp=sharing' },
  { name: 'المهندس/ محمد بن يوسف هارون', role: 'عضو اللجنة', image: 'https://drive.google.com/file/d/1tVhjRP268pskZGvZvTuLme7Bp2q_c-h-/view?usp=sharing' },
  { name: 'الأستاذة/ نوف بنت نواف القرشي', role: 'عضو اللجنة', image: 'https://drive.google.com/file/d/1aiOc3HTNUcsvOjwHA5ewLL3C1nl2tS-8/view?usp=sharing' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1, duration: 0.5, ease: "easeOut" }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 } }
};

// دالة محسنة لتحويل روابط جوجل درايف للرابط المباشر الخاص بالصور
const getDirectImageUrl = (url: string) => {
  if (!url) return '';
  // استخراج ID الصورة من أي صيغة رابط لجوجل درايف
  const match = url.match(/\/(?:file\/d|d)\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return (match && match[1]) ? `https://lh3.googleusercontent.com/d/${match[1]}` : url;
};

// Component لبطاقة العضو بالهوية الجديدة موحدة الحجم
const MemberCard = ({ member }: { member: { name: string, role: string, image: string } }) => {
  const cleanName = member.name.replace(/^(الأستاذ|المهندس|الدكتور|الأستاذة)ة?\/\s*/, '');
  const titleMatch = member.name.match(/^(.*?\/\s*)/);
  const title = titleMatch ? titleMatch[1].replace('/', '') : '';
  
  // صورة افتراضية في حال عدم وجود رابط
  const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=F8F9FA&color=002B49&size=200&font-size=0.35&bold=true`;
  const imageSrc = getDirectImageUrl(member.image) || defaultImage;

  return (
    <motion.div variants={itemVariants} className="flex flex-col justify-between bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-default h-full w-full">
      <div className="w-full relative overflow-hidden bg-gray-50 border-b-[5px] border-[#C5A059] flex-shrink-0" style={{ aspectRatio: '4 / 5' }}>
        <img 
          src={imageSrc} 
          alt={cleanName} 
          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer" 
        />
      </div>
      <div className="text-center p-4 md:p-5 flex flex-col flex-grow justify-center items-center w-full bg-white min-h-[90px]">
        {title && <div className="text-[10px] md:text-xs text-[#C5A059] font-bold mb-1">{title}</div>}
        <h4 className="font-bold text-[#002B49] text-sm md:text-base leading-tight mb-1">{cleanName}</h4>
        <div className="text-[10px] md:text-xs font-bold text-gray-500 mt-0.5">{member.role}</div>
      </div>
    </motion.div>
  );
};

// مكون بطاقة التقرير مع معرض الصور (Slider)
const ReportCard = ({ report }: { report: any }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const nextImg = (e: any) => {
    e.preventDefault(); 
    setCurrentImg((prev) => (prev + 1) % report.images.length);
  };

  const prevImg = (e: any) => {
    e.preventDefault();
    setCurrentImg((prev) => (prev === 0 ? report.images.length - 1 : prev - 1));
  };

  return (
    <motion.a 
      variants={itemVariants}
      href={report.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group h-full"
    >
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        
        {/* قسم الصور */}
        <div className="relative w-full h-48 sm:h-56 bg-[#002B49]/5 overflow-hidden">
          {report.images && report.images.length > 0 ? (
            <>
              <img 
                src={getDirectImageUrl(report.images[currentImg])} 
                alt={report.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                referrerPolicy="no-referrer"
              />
              
              {/* أزرار التنقل تظهر عند تمرير الماوس إذا كان فيه أكثر من صورة */}
              {report.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={prevImg} className="p-1.5 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-[#C5A059] transition-colors">
                    <ChevronRight size={20}/>
                  </button>
                  <button onClick={nextImg} className="p-1.5 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-[#C5A059] transition-colors">
                    <ChevronLeft size={20}/>
                  </button>
                </div>
              )}
              
              {/* نقاط المؤشر السفلية */}
              {report.images.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                  {report.images.map((_: any, idx: number) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImg ? 'w-4 bg-[#C5A059]' : 'w-1.5 bg-white/70'}`} 
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#C5A059]/40 group-hover:text-[#C5A059] transition-colors">
              <FileText size={48} />
            </div>
          )}
        </div>

        {/* قسم النصوص */}
        <div className="p-6 md:p-8 flex flex-col flex-grow justify-between bg-gray-50 group-hover:bg-[#002B49] transition-colors duration-300">
          <h3 className="font-bold text-lg text-[#002B49] group-hover:text-white mb-6 leading-relaxed transition-colors">
            {report.title}
          </h3>
          <div className="flex items-center gap-2 text-[#C5A059] font-bold text-sm group-hover:text-[#C5A059] transition-colors">
            <span>عرض التقرير</span>
            <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id));
      const current = sectionElements.find(el => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top >= -100 && rect.top <= 300;
      });
      if (current) setActiveSection(current.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== "https://www.makkahcci.org.sa/web/image/1086733/شعارغرفة%20مكة.png?access_token=d1935897-51eb-4975-a406-3f6de74f0d5b") {
      target.src = "https://www.makkahcci.org.sa/web/image/1086733/شعارغرفة%20مكة.png?access_token=d1935897-51eb-4975-a406-3f6de74f0d5b";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#002B49] selection:bg-[#C5A059] selection:text-white" dir="rtl">
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#C5A059] z-[100] origin-left print:hidden shadow-[0_2px_10px_rgba(197,160,89,0.3)]"
        style={{ scaleX }}
      />

      {/* Section Navigation Dots (Floating Left) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[61] flex flex-col gap-4 print:hidden">
        {SECTIONS.map((section) => (
          <div 
            key={section.id} 
            className="group relative flex items-center"
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <button
              onClick={() => scrollTo(section.id)}
              className="relative flex items-center justify-center"
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                activeSection === section.id 
                  ? 'bg-[#C5A059] scale-150 shadow-[0_0_10px_rgba(197,160,89,0.8)]' 
                  : 'bg-gray-300 group-hover:bg-[#C5A059] group-hover:scale-125'
              }`} />
              
              {activeSection === section.id && (
                <motion.div 
                  layoutId="active-ring"
                  className="absolute -inset-2 border border-[#C5A059] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {(hoveredSection === section.id || activeSection === section.id) && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.8 }}
                  animate={{ opacity: 1, x: 12, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.8 }}
                  className={`absolute left-0 ml-6 px-3 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap shadow-xl border backdrop-blur-md flex items-center gap-2 transition-colors ${
                    activeSection === section.id 
                      ? 'bg-[#002B49] text-white border-[#C5A059]/40' 
                      : 'bg-white text-[#002B49] border-gray-100'
                  }`}
                >
                  <div className={`w-1 h-1 rounded-full ${activeSection === section.id ? 'bg-[#C5A059] animate-pulse' : 'bg-gray-300'}`} />
                  {section.title}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 print:hidden ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden bg-white shadow-sm`}>
              <img 
                src={MAKKAH_LOGO} 
                alt="غرفة مكة المكرمة" 
                className="w-full h-full object-contain p-1"
                referrerPolicy="no-referrer"
                onError={handleLogoError}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-bold text-lg leading-tight ${scrolled ? 'text-[#002B49]' : 'text-white'}`}>غرفة مكة المكرمة</h1>
              <p className={`text-sm font-medium ${scrolled ? 'text-[#C5A059]' : 'text-[#C5A059]'}`}>اللجنة الصناعية</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <div className={`w-px h-6 ${scrolled ? 'bg-gray-200' : 'bg-white/20'}`} />
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`text-sm font-medium transition-colors hover:text-[#C5A059] ${
                  activeSection === section.id 
                    ? 'text-[#C5A059] border-b-2 border-[#C5A059]' 
                    : scrolled ? 'text-[#002B49]' : 'text-white'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-2 rounded-md print:hidden ${scrolled ? 'text-[#002B49]' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-40 bg-[#002B49] text-white flex flex-col p-8 pt-24"
          >
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="text-2xl font-bold py-4 border-b border-white/10 text-right hover:text-[#C5A059] transition-colors"
              >
                {section.title}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#002B49]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/seed/construction/1920/1080')] bg-cover bg-center mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#002B49]/80 to-[#002B49]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-block px-4 py-1 bg-[#C5A059] text-white text-sm font-bold rounded-full mb-6 tracking-widest uppercase"
            >
              التقرير الختامي لأعمال ومنجزات اللجنة الصناعية للدورة الـ 21 الفترة الـ 2
            </motion.span>
            <motion.h1 
              variants={itemVariants}
              className="text-[50px] leading-[90px] font-black text-white mb-6"
            >
              ترحب غرفة مكة المكرمة بأصحاب السعادة <br />
              <span className="text-[#C5A059]">رئيس ونائب وأعضاء اللجنة الصناعية</span> <br />
              <span className="text-2xl md:text-3xl block mt-2 text-white/90">في اجتماعهم الدوري الرابع (4)</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/80 mb-10 max-w-4xl mx-auto font-light leading-relaxed"
            >
              الاثنين  29 يونيو 2026م
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <a 
                href="https://drive.google.com/file/d/1v-3M3mcVqfC7J4pwAZlyMVNIS6qFenYk/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#C5A059] text-white font-bold rounded-lg shadow-lg hover:bg-[#A6864A] transition-all transform hover:-translate-y-1 flex items-center gap-2"
              >
                تشكيل اللجنة <FileText size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 cursor-pointer"
          onClick={() => scrollTo('context')}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Strategic Context Section */}
      <section id="context" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-[#C5A059]" />
                <span className="text-[#C5A059] font-bold uppercase tracking-wider">تشكيل اللجنة واستراتيجيات عملها</span>
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-8 leading-tight text-[#002B49]">
                صدر بيان اللجنة التنفيذية بغرفة مكة المكرمة<span className="text-[#C5A059]"> بأسماء أعضاء اللجنة الصناعية</span> للفترة الثانية - للدورة الـ 21
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 leading-relaxed">
                تُمثل اللجنة الصناعية الذراع الاستراتيجي لغرفة مكة المكرمة في دعم وتطوير القطاع الصناعي بالعاصمة المقدسة، حيث تعمل كحلقة وصل حيوية ومباشرة بين القطاع الخاص والجهات الحكومية والتشريعية. تهدف اللجنة إلى تهيئة بيئة أعمال جاذبة ومحفزة للنمو الصناعي، بما يتوافق مع مستهدفات رؤية المملكة 2030.
              </motion.p>
              <motion.div variants={containerVariants} className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: <Target className="text-[#C5A059]" />, title: 'الأصالة والاستدامة', desc: 'صناعة تبني المستقبل وتحترم المكان' },
                  { icon: <Users className="text-[#C5A059]" />, title: 'الابتكار التقني', desc: 'عقول مبدعة وأدوات ذكية' },
                  { icon: <TrendingUp className="text-[#C5A059]" />, title: 'تعزيز المحتوى المحلي', desc: 'كل قطعة منتج هي خطوة في مسيرة التنمية' },
                  { icon: <Globe className="text-[#C5A059]" />, title: 'سلاسة الإجراءات', desc: 'مقترحات تسبق التحديات وتدعم الاستثمار' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, backgroundColor: '#ffffff', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                    className="flex gap-4 p-4 rounded-xl bg-gray-50 border-r-4 border-[#C5A059] transition-all cursor-default"
                  >
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-[#002B49]">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50 relative">
                <img 
                  src="https://lh3.googleusercontent.com/d/1YTwZ6BEForzsORKgfDEipO8oRlm07kkj" 
                  alt="اللجنة الصناعية" 
                  className="w-full h-full object-cover hover:scale-150 transition-transform duration-600"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/20 to-transparent pointer-events-none" />
              </div>
              <div className="w-full bg-[#002B49] p-6 md:p-8 rounded-3xl shadow-xl text-white border-b-4 border-[#C5A059] flex items-start gap-4">
                <TrendingUp className="text-[#C5A059] shrink-0 mt-1" size={32} />
                <p className="text-base md:text-lg font-bold leading-relaxed">تتمحور ركيزتنا حول تعظيم القيمة المضافة للمنتجات المحلية، لتحقيق الاكتفاء الذاتي في سلاسل الإمداد</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Members Section (الهيكل التنظيمي) */}
      <section id="members" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#C5A059]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="w-20 h-20 bg-[#002B49] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 text-[#C5A059]">
              <Users size={40} />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4 text-[#002B49]">الهيكل التنظيمي</motion.h2>
            <motion.p variants={itemVariants} className="text-gray-500 max-w-2xl mx-auto">نخبة من الكفاءات الوطنية تقود التحول الصناعي في العاصمة المقدسة</motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="bg-white p-6 md:p-10 lg:p-12 rounded-[2rem] shadow-xl border border-gray-100 max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 items-stretch">
              {ALL_MEMBERS.map((member, i) => (
                <MemberCard key={i} member={member} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Info Section */}
      <section id="event" className="py-24 bg-[#002B49] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-center mb-16">
              <motion.div variants={itemVariants} className="w-20 h-20 bg-[#C5A059] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg rotate-3">
                <Building2 size={40} className="text-[#002B49]" />
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4">الاجتماعات والفعاليات</motion.h2>
              <motion.p variants={itemVariants} className="text-white/60 max-w-2xl mx-auto">توثيق البيانات المؤسسية لضمان مرجعية التقرير ومتابعة الأثر الاستراتيجي</motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { label: '27 سبتمبر 2025م', value: 'الاجتماع الأول "التأسيسي"', icon: <Award className="text-[#C5A059]" /> },
                { label: '27 أكتوبر 2025م', value: 'الاجتماع الدوري الثاني', icon: <Award className="text-[#C5A059]" /> },
                { label: '23 نوفمبر 2025م', value: 'لقاء اللجنة الوطنية الصناعية مع القطاع الصناعي وجولة على مصانع مكة المكرمة', icon: <Users className="text-[#C5A059]" /> },
              ].map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="mb-4">{item.icon}</div>
                  <h4 className="text-[#C5A059] text-sm font-bold mb-2 uppercase tracking-wider">{item.label}</h4>
                  <p className="text-xl font-bold">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="bg-white text-[#002B49] p-10 rounded-[3rem] shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 text-center">شركاء النجاح "صناع الأثر"</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  'المهندس/ بدر بن عبدالمحسن الحربي',
                  'الأستاذ/ عبدالعزيز بن حمد المهباش',
                  'الأستاذ/ إبراهيم بن محمد آل شيخ',
                  'معالي المهندس/ خليل بن إبراهيم بن سلمه',
                ].map((sector, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border-r-4 border-[#C5A059]">
                    <CheckCircle2 className="text-[#C5A059]" size={20} />
                    <span className="font-bold text-sm">{sector}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 bg-[#002B49]/5 rounded-2xl border border-[#002B49]/10">
                <p className="text-gray-600 leading-relaxed text-center italic">
                  "جهودكم المخلصة ودعمكم النوعي الذي كان ركيزةً جوهرية في دفع عجلة التطوير الصناعي. إن بصماتكم الاستراتيجية وإسهاماتكم القيّمة لم تكن مجرد مشاركة، بل كانت شريكاً حقيقياً في صياغة ملامح النجاح وتحقيق مستهدفات اللجنة الطموحة في العاصمة المقدسة"
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Reports Section (التقارير) */}
      <section id="reports" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="w-20 h-20 bg-[#002B49]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm rotate-3 text-[#C5A059]">
              <FileText size={40} />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4 text-[#002B49]">التقارير والمخرجات</motion.h2>
            <motion.p variants={itemVariants} className="text-gray-500 max-w-2xl mx-auto">توثيق شامل لمخرجات أعمال اللجنة والدراسات والمبادرات</motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {REPORTS.map((report, i) => (
              <ReportCard key={i} report={report} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#C5A059]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#002B49]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-4 py-2 bg-[#C5A059]/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-[#C5A059] rounded-full animate-pulse" />
              <span className="text-[#C5A059] font-bold text-sm uppercase tracking-widest">منهجية التميز الصناعي</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-[#002B49] mb-6">
              إدارة المشاريع الاحترافية
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              اعتمدت اللجنة منهجية <span className="text-[#C5A059] font-bold">"التكمال الاستراتيجي"</span> إيماناً بأن الصناعة ليست مجرد خطوط إنتاج، بل هي منظومة متكاملة تبدأ من الرؤية وتنتهي بالقيمة المضافة.
            </motion.p>
          </motion.div>

          {/* Process Flow Grid */}
          <div className="grid lg:grid-cols-4 gap-6 mb-20">
            {[
              { 
                step: '01',
                title: 'مرحلة التخطيط والجدوى', 
                icon: <Lightbulb size={24} />, 
                items: ['دراسة الاحتياج', 'التشخيص الصناعي', 'هندسة الحلول', 'مواءمة الموارد الزمنية'],
                color: 'bg-[#C5A059]',
                delay: 0
              },
              { 
                step: '02',
                title: 'مرحلة التمكين والتشغيل', 
                icon: <HardHat size={24} />, 
                items: ['تطوير البنية التحتية', 'دعم سلاسل الامداد', 'رفع كفاءة الكوادر الوطنية', 'الأتمتة التقنية'],
                color: 'bg-[#002B49]',
                delay: 0.1
              },
              { 
                step: '03',
                title: 'مرحلة المراقبة والتحسين', 
                icon: <TrendingUp size={24} />, 
                items: ['قياس مؤشرات الأداء', 'التقارير الدورية', 'إدارة المخاطر', 'التدقيق الصناعي'],
                color: 'bg-[#002B49]',
                delay: 0.2
              },
              { 
                step: '04',
                title: 'مرحلة التوسع والاستدامة', 
                icon: <ClipboardCheck size={24} />, 
                items: ['تعظيم القيمة المضافة', 'تطوير الصادرات', 'نقل المعرفة'],
                color: 'bg-[#C5A059]',
                delay: 0.3
              },
            ].map((phase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: phase.delay }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
              >
                <div className={`absolute top-0 right-8 -translate-y-1/2 w-12 h-12 ${phase.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {phase.icon}
                </div>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-black text-gray-50 opacity-10 absolute top-8 left-8 group-hover:opacity-20 transition-opacity">
                    {phase.step}
                  </span>
                  <h3 className="text-xl font-bold text-[#002B49] group-hover:text-[#C5A059] transition-colors">
                    {phase.title}
                  </h3>
                </div>
                <ul className="space-y-4 flex-grow">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 group/item">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C5A059] group-hover/item:scale-150 transition-transform" />
                      <span className="text-gray-600 text-sm leading-tight group-hover/item:text-gray-900 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-gray-50">
                  <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1, delay: phase.delay + 0.5 }}
                      className={`h-full ${phase.color}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Changed Video Section to Image Section */}
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-[#C5A059]/10 rounded-[3rem] blur-2xl" />
                <div className="relative aspect-[9/16] max-w-[320px] mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white bg-gray-50 group">
                  <img
                    src={getDirectImageUrl('https://drive.google.com/file/d/1b7wF-yXlGRORE-iYZbcnHdlF8lBUY5N2/view?usp=sharing')}
                    alt="صورة المبادرة"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#C5A059] rounded-3xl -z-10 animate-bounce-slow" />
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#002B49] rounded-2xl -z-10 animate-pulse" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-block px-4 py-1 bg-[#002B49] text-white text-xs font-bold rounded-full mb-2">
                الاستراتيجية
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#002B49] leading-tight">
                اللجنة الصناعية: <br />
                <span className="text-[#C5A059]">نموذج مكة للصناعة المستدامة</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-white rounded-2xl shadow-sm border-r-4 border-[#C5A059]">
                  <h4 className="font-bold text-[#002B49] mb-2">الاستباقية</h4>
                  <p className="text-sm text-gray-500">منهجية لا تنتظر المشكلة، بل تحللها وتضع لها خططاً بديلة (Risk-based approach)</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border-r-4 border-[#002B49]">
                  <h4 className="font-bold text-[#002B49] mb-2">الاحترافية</h4>
                  <p className="text-sm text-gray-500">تعتمد على مقاييس أداء (KPIs) واضحة</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border-r-4 border-[#002B49]">
                  <h4 className="font-bold text-[#002B49] mb-2">التكامل</h4>
                  <p className="text-sm text-gray-500">لا تنتهي العملية بتشغيل المصنع، بل تستمر لضمان نموه (Scale) واستدامته في سوق تنافسي</p>
                </div>
               <div className="p-6 bg-white rounded-2xl shadow-sm border-r-4 border-[#C5A059]">
                  <h4 className="font-bold text-[#002B49] mb-2">القيمة الاستثمارية</h4>
                  <p className="text-sm text-gray-500">تهيئة الممكنات التي تجعل من بيئة الأعمال في مكة المكرمة الخيار الأول للصناعيين</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002B49] py-24 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="w-32 h-32 mx-auto mb-8 bg-white rounded-2xl p-4 flex items-center justify-center shadow-lg">
              <img 
                src={MAKKAH_LOGO} 
                alt="غرفة مكة المكرمة" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={handleLogoError}
              />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-6xl font-black mb-8 text-[#C5A059]">شكراً لكم</motion.h2>
            <motion.div variants={itemVariants} className="text-xl text-white/60 mb-12 space-y-2">
              <p>اللجنة الصناعية - غرفة مكة المكرمة</p>
              <p>إعداد أخصائي اللجنة/ خلف شعبان</p>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 left-8 p-4 bg-[#C5A059] text-white rounded-full shadow-2xl transition-all duration-500 print:hidden ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      >
        <ArrowRight className="rotate-90" />
      </button>
    </div>
  );
}