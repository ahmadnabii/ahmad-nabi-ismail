(function () {
	const LANGUAGE_KEY = 'site_lang';
	const DEFAULT_LANG = 'en';
	const SUPPORTED = ['en', 'ar', 'ckb'];

	// Embedded fallbacks to work offline (when opening index.html directly)
	const EMBEDDED = {
		en: { "site": { "title": "Candidate Name" }, "nav": { "home": "Home", "gallery": "Gallery", "contact": "Contact" }, "hero": { "heading": "A Vision for Progress", "subheading": "Together, we build a brighter future.", "cta": "Read Policies" }, "about": { "title": "About the Candidate", "body": "Candidate Name is committed to transparency, economic growth, and inclusive services for all." }, "policies": { "title": "Key Policies", "item1": "Jobs and Economic Development", "item2": "Quality Education for Every Child", "item3": "Accessible Healthcare" }, "gallery": { "title": "Campaign Gallery", "subtitle": "Moments from our journey together", "candidate_name": "Ahmad Nabi Ismail", "time_1": "2 hours ago", "time_2": "1 day ago", "time_3": "3 days ago", "time_4": "1 week ago", "post1_text": "Meeting with community leaders to discuss our vision for a better future. Together, we can build stronger communities.", "post2_text": "Watch my speech at the recent town hall meeting where I outlined our key policies for economic development.", "post3_text": "Campaign events and community outreach activities across the region. Thank you for your support!", "quote": "\"A leader is one who knows the way, goes the way, and shows the way.\" - John Maxwell", "like": "Like", "comment": "Comment", "share": "Share", "video_fallback": "Your browser doesn't support video playback." }, "contact": { "title": "Get Involved", "name": "Name", "email": "Email", "message": "Message", "namePlaceholder": "Your name", "emailPlaceholder": "email@example.com", "messagePlaceholder": "Your message", "submit": "Send", "thankYouTitle": "Thank You!", "thankYouText": "Your message has been sent successfully. We'll get back to you soon!", "close": "Close" }, "footer": { "copyright": "© 2025 Campaign. All rights reserved." } },
		ar: { "site": { "title": "اسم المرشح" }, "nav": { "home": "الرئيسية", "gallery": "المعرض", "contact": "اتصل بنا" }, "hero": { "heading": "رؤية للتقدم", "subheading": "معًا نبني مستقبلًا أكثر إشراقًا", "cta": "قراءة السياسات" }, "about": { "title": "نبذة عن المرشح", "body": "يسعى اسم المرشح إلى الشفافية والنمو الاقتصادي وخدمات شاملة للجميع." }, "policies": { "title": "السياسات الرئيسية", "item1": "الوظائف والتنمية الاقتصادية", "item2": "تعليم عالي الجودة لكل طفل", "item3": "رعاية صحية ميسورة" }, "gallery": { "title": "معرض الحملة", "subtitle": "لحظات من رحلتنا معًا", "candidate_name": "أحمد نبي إسماعيل", "time_1": "منذ ساعتين", "time_2": "منذ يوم", "time_3": "منذ 3 أيام", "time_4": "منذ أسبوع", "post1_text": "لقاء مع قادة المجتمع لمناقشة رؤيتنا لمستقبل أفضل. معًا يمكننا بناء مجتمعات أقوى.", "post2_text": "شاهد خطابي في اجتماع البلدية الأخير حيث أوضحت سياساتنا الرئيسية للتنمية الاقتصادية.", "post3_text": "أحداث الحملة وأنشطة التوعية المجتمعية في جميع أنحاء المنطقة. شكرًا لكم على دعمكم!", "quote": "\"القائد هو من يعرف الطريق، ويسير في الطريق، ويُظهر الطريق.\" - جون ماكسويل", "like": "إعجاب", "comment": "تعليق", "share": "مشاركة", "video_fallback": "متصفحك لا يدعم تشغيل الفيديو." }, "contact": { "title": "شارك معنا", "name": "الاسم", "email": "البريد الإلكتروني", "message": "الرسالة", "namePlaceholder": "اكتب اسمك", "emailPlaceholder": "example@البريد.كوم", "messagePlaceholder": "اكتب رسالتك", "submit": "إرسال", "thankYouTitle": "شكراً لك!", "thankYouText": "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!", "close": "إغلاق" }, "footer": { "copyright": "© 2025 الحملة. جميع الحقوق محفوظة." } },
		ckb: { "site": { "title": "ناوی بەربژێر" }, "nav": { "home": "سەرەکی", "gallery": "گالەری", "contact": "پەیوەندی" }, "hero": { "heading": "دیاربڕینی بۆ پێشکەوتن", "subheading": "لەگەڵ یەکتر، داهاتووی رونتر دروست دەکەین.", "cta": "خوێندنەوەی سیاسەتەکان" }, "about": { "title": "دەربارەی بەربژێر", "body": "ناوی بەربژێر بەردەوامە لە ڕوونبوونەوە، گەشەپێدانی ئابووری، و خزمەتگوزارییانی گشتگیر." }, "policies": { "title": "سیاسەتە گرینگەکان", "item1": "کاریگەری و گەشەپێدانی ئابووری", "item2": "خوێندنی باش بۆ هەموو منداڵێک", "item3": "تێچووی تندرستی گەیشتنی" }, "gallery": { "title": "گالەری کمپەین", "subtitle": "ساتیەکان لە گەشتنامەکەماندا", "candidate_name": "ئەحمەد نەبی ئیسماعیل", "time_1": "٢ کاتژمێر پێش", "time_2": "١ ڕۆژ پێش", "time_3": "٣ ڕۆژ پێش", "time_4": "١ هەفتە پێش", "post1_text": "چاوپێکەوتن لەگەڵ سەرکردەکانی کۆمەڵگا بۆ گفتوگۆکردن لەسەر دیاربڕینەکەمان بۆ داهاتووی باشتر. لەگەڵ یەکتر، دەتوانین کۆمەڵگای بەهێزتر دروست بکەین.", "post2_text": "سەیری قسەکردنەکەم بکە لە کۆبوونەوەی شارەوانی دوایی کە سیاسەتە سەرەکییەکانم بۆ گەشەپێدانی ئابووری ڕوونکردمەوە.", "post3_text": "ڕووداوەکانی کمپەین و چالاکییەکانی گەیشتن بە کۆمەڵگا لە هەموو ناوچەکە. سوپاس بۆ پشتگیریەکەتان!", "quote": "\"سەرکردە کەسێکە کە ڕێگاکە دەزانێت، دەچێتە ڕێگاکە، و ڕێگاکە پیشان دەدات.\" - جۆن ماکسوێل", "like": "حەز", "comment": "لێدوان", "share": "هاوبەشکردن", "video_fallback": "وێبگەڕەکەت پشتگیری لە پەخشکردنی ڤیدیۆ ناکات." }, "contact": { "title": "بەژداری بکە", "name": "ناو", "email": "ئیمەیڵ", "message": "پەیام", "namePlaceholder": "ناوی تۆ", "emailPlaceholder": "email@example.com", "messagePlaceholder": "پەیامی تۆ", "submit": "ناردن", "thankYouTitle": "سوپاس!", "thankYouText": "پەیامەکەت بە سەرکەوتوویی نێردرا. بەزووی پەیوەندیت پێوە دەکەین!", "close": "داخستن" }, "footer": { "copyright": "© 2025 کمپەین. هەموو مافەکان پارێزراون." } }
	};

	const state = {
		lang: DEFAULT_LANG,
		messages: {},
	};

	function detectInitialLanguage() {
		try {
			const saved = localStorage.getItem(LANGUAGE_KEY);
			if (saved && SUPPORTED.includes(saved)) return saved;
		} catch {}
		const nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
		const lower = (nav || '').toLowerCase();
		if (lower.startsWith('ar')) return 'ar';
		if (lower.startsWith('ckb') || lower.startsWith('ku')) return 'ckb';
		return DEFAULT_LANG;
	}

	async function tryFetchMessages(lang) {
		// Use relative path to work on any base path
		const url = `locales/${lang}.json`;
		try {
			const res = await fetch(url, { cache: 'no-cache' });
			if (!res.ok) throw new Error('not ok');
			return await res.json();
		} catch {
			return null;
		}
	}

	async function loadMessages(lang) {
		const fetched = await tryFetchMessages(lang);
		if (fetched) return fetched;
		return EMBEDDED[lang] || EMBEDDED[DEFAULT_LANG];
	}

	function setDocumentDirection(lang) {
		const isRTL = lang === 'ar' || lang === 'ckb';
		document.documentElement.setAttribute('lang', lang);
		document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
	}

	function translateInPlace() {
		const elements = document.querySelectorAll('[data-i18n]');
		elements.forEach((el) => {
			const key = el.getAttribute('data-i18n');
			const text = getMessage(key);
			if (text) el.textContent = text;
		});

		const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
		placeholders.forEach((el) => {
			const key = el.getAttribute('data-i18n-placeholder');
			const text = getMessage(key);
			if (text) el.setAttribute('placeholder', text);
		});
	}

	function getMessage(key) {
		return key.split('.').reduce((acc, part) => (acc && acc[part] != null ? acc[part] : undefined), state.messages);
	}

	function highlightActiveLang(lang) {
		const dropdownBtn = document.querySelector('.lang-dropdown-btn');
		const dropdownMenu = document.querySelector('.lang-dropdown-menu');
		const activeOption = document.querySelector(`[data-lang="${lang}"]`);
		
		if (activeOption) {
			const flagSrc = activeOption.getAttribute('data-flag');
			const text = activeOption.getAttribute('data-text');
			
			dropdownBtn.querySelector('.lang-flag-img').src = flagSrc;
			dropdownBtn.querySelector('.lang-text').textContent = text;
		}
		
		// Close dropdown
		dropdownBtn.setAttribute('aria-expanded', 'false');
		dropdownMenu.classList.remove('show');
	}

	async function setLanguage(lang) {
		if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
		state.lang = lang;
		try { localStorage.setItem(LANGUAGE_KEY, lang); } catch {}
		setDocumentDirection(lang);
		state.messages = await loadMessages(lang);
		translateInPlace();
		highlightActiveLang(lang);
		document.title = getMessage('site.title') || document.title;
	}

	function attachLanguageSwitcher() {
		const dropdownBtn = document.querySelector('.lang-dropdown-btn');
		const dropdownMenu = document.querySelector('.lang-dropdown-menu');
		const langOptions = document.querySelectorAll('.lang-option');
		
		// Toggle dropdown
		dropdownBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
			dropdownBtn.setAttribute('aria-expanded', String(!isExpanded));
			dropdownMenu.classList.toggle('show', !isExpanded);
		});
		
		// Handle language selection
		langOptions.forEach((option) => {
			option.addEventListener('click', (e) => {
				e.stopPropagation();
				const lang = option.getAttribute('data-lang');
				setLanguage(lang);
			});
		});
		
		// Close dropdown when clicking outside
		document.addEventListener('click', (e) => {
			if (!e.target.closest('.lang-dropdown')) {
				dropdownBtn.setAttribute('aria-expanded', 'false');
				dropdownMenu.classList.remove('show');
			}
		});
	}

	// Contact form handling
	function attachContactForm() {
		const form = document.getElementById('contactForm');
		if (form) {
			form.addEventListener('submit', (e) => {
				e.preventDefault();
				showThankYouMessage();
			});
		}
	}

	function showThankYouMessage() {
		const message = document.getElementById('thankYouMessage');
		if (message) {
			message.style.display = 'flex';
			// Translate the thank you message
			translateInPlace();
		}
	}

	// Make functions globally available
	window.hideThankYouMessage = function() {
		const message = document.getElementById('thankYouMessage');
		if (message) {
			message.style.display = 'none';
		}
	};

	// Init
	window.addEventListener('DOMContentLoaded', async () => {
		attachLanguageSwitcher();
		attachContactForm();
		const initial = detectInitialLanguage();
		await setLanguage(initial);
	});
})();


