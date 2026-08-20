(function () {
    const STORAGE_KEY = 'leo-site-language';
    const translations = {
        en: {
            'nav.home': 'Home',
            'nav.services': 'Services',
            'nav.portfolio': 'Portfolio',
            'nav.about': 'About',
            'nav.contact': 'Contact',
            'nav.cta': 'Get a Quote',
            'menu.video': 'Video',
            'menu.events': 'Events',
            'glass.reset': 'Reset layout',
            'hero.eyebrow': 'UAE · Guangzhou · Commercial Visuals',
            'hero.title': 'Abu Dhabi Photographer / Videographer',
            'hero.copy': 'Professional photography, video and travel support for Abu Dhabi portraits, attractions, events and commercial projects.',
            'hero.primary': 'Get a Quote',
            'hero.secondary': 'View Portfolio',
            'hero.proof1': 'Brand Video',
            'hero.proof2': 'Event Coverage',
            'hero.proof3': 'Product / Store',
            'hero.proof4': 'Portrait Campaign',
            'hero.cardEyebrow': 'Commercial Visuals',
            'hero.cardTitle': 'UAE / Guangzhou',
            'hero.stat1Title': 'Video',
            'hero.stat1Text': 'Ads & reels',
            'hero.stat2Title': 'Photo',
            'hero.stat2Text': 'Campaigns',
            'hero.stat3Title': 'Event',
            'hero.stat3Text': 'Coverage',
            'hero.cardNote': 'Chinese / English inquiries welcome',
            'services.eyebrow': 'Services',
            'services.title': 'Commercial visuals built for brand growth',
            'services.copy': 'Video and photography for advertising, social media, websites, launches, exhibitions, stores and premium portraits.',
            'services.videoTitle': 'Commercial Video Production',
            'services.videoText': 'Brand films, ads, store introductions, product videos and event reels for Instagram, TikTok, websites and paid campaigns.',
            'services.videoLink': 'View video work',
            'services.eventTitle': 'Event & Exhibition Coverage',
            'services.eventText': 'Coverage for UAE and Guangzhou exhibitions, launches, corporate events, store openings and brand activations.',
            'services.eventLink': 'View event work',
            'services.photoTitle': 'Advertising Photography',
            'services.photoText': 'Product, store, hotel, restaurant, space, team and personal brand photography for ads, menus, websites and social media.',
            'services.photoLink': 'View commercial work',
            'markets.eyebrow': 'Markets',
            'markets.title': 'UAE and Guangzhou service for international clients',
            'markets.copy': 'Leo works with Chinese brands, overseas founders, local businesses and international teams that need professional content ready for commercial use.',
            'markets.uae': 'Exhibitions, hospitality, destination campaigns, tourism portraits, luxury spaces and social media content.',
            'markets.chinaLabel': 'China',
            'markets.gzTitle': 'Guangzhou',
            'markets.gz': 'Brand videos, product launches, store content, corporate events, commercial portraits and advertising assets.',
            'markets.langLabel': 'Bilingual',
            'markets.langTitle': 'Chinese / English',
            'markets.lang': 'Clear communication for Chinese clients, UAE local businesses and international production teams.',
            'work.eyebrow': 'Selected Work',
            'work.title': 'Commercial case studies',
            'work.viewAll': 'View all',
            'trust.eyebrow': 'Proof',
            'trust.title': 'Built for commercial delivery',
            'trust.item1Title': 'Commercial usage',
            'trust.item1Text': 'Images and videos prepared for ads, websites, PR, menus, social media and client presentations.',
            'trust.item2Title': 'Bilingual communication',
            'trust.item2Text': 'Chinese and English project communication for cross-border teams and UAE local clients.',
            'trust.item3Title': 'Fast social delivery',
            'trust.item3Text': 'Deliverables can be planned for launch windows, event recaps and short-form content calendars.',
            'trust.item4Title': 'UAE + Guangzhou',
            'trust.item4Text': 'Flexible production for Abu Dhabi, Dubai, Guangzhou and nearby commercial locations.',
            'workflow.eyebrow': 'Workflow',
            'workflow.title': 'A clear process for business projects',
            'workflow.step1Title': 'Brief & Objective',
            'workflow.step1Text': 'Confirm business goal, target platform, location, visual reference, language needs and delivery format.',
            'workflow.step2Title': 'Shot Plan',
            'workflow.step2Text': 'Plan scenes, schedule, route and key frames based on advertising use, event flow or portrait concept.',
            'workflow.step3Title': 'Production & Delivery',
            'workflow.step3Text': 'Shoot, select, color grade, edit and retouch assets ready for ads, websites and social media.',
            'about.eyebrow': 'About Leo',
            'about.title': 'Commercial perspective with real human texture',
            'about.lead': 'Leo provides commercial video and photography services across the UAE and Guangzhou, focused on brand image, advertising content, events, stores, products and destination portraits.',
            'about.bio': 'Projects are planned around business use: where the assets will be published, what the audience needs to understand and how the final visuals support conversion.',
            'faq.eyebrow': 'FAQ',
            'faq.title': 'Before you request a quote',
            'faq.q1': 'Do you shoot in Dubai and Abu Dhabi?',
            'faq.a1': 'Yes. Projects can be arranged in Abu Dhabi, Dubai, Guangzhou and nearby commercial locations.',
            'faq.q2': 'Can you communicate in English?',
            'faq.a2': 'Yes. Chinese and English inquiries are supported for briefs, shot plans and delivery notes.',
            'faq.q3': 'Can you deliver short videos?',
            'faq.a3': 'Yes. Short reels, brand clips, store introductions, event recaps and social-first edits can be planned.',
            'faq.q4': 'What affects the price?',
            'faq.a4': 'Location, shoot time, crew needs, number of deliverables, editing depth, usage and delivery timeline.',
            'contact.eyebrow': 'Booking',
            'contact.shortTitle': 'Contact Leo',
            'contact.title': 'Tell me about your campaign, event or brand story',
            'contact.copy': 'Please include the city, project type, shooting date, target platform, expected deliverables and budget range.',
            'contact.item1': 'City and shooting date',
            'contact.item2': 'Project type and usage platform',
            'contact.item3': 'Expected video length or photo quantity',
            'contact.item4': 'Budget range and delivery deadline',
            'contact.whatsapp': 'WhatsApp for quotation',
            'contact.email': 'Email for quotation',
            'contact.portfolio': 'View portfolio first',
            'contact.wechat': 'WeChat: <strong>LI920520414</strong>',
            'contact.xhs': 'Xiaohongshu: <strong>阿布扎比摄影师-Leo</strong>',
            'footer.copy': '© 2026 Leo Photography. Commercial Video & Portrait Photography.'
        },
        zh: {
            'nav.home': '首页',
            'nav.services': '服务',
            'nav.portfolio': '作品',
            'nav.about': '关于 Leo',
            'nav.contact': '联系',
            'nav.cta': '获取报价',
            'menu.video': '录像',
            'menu.events': '活动',
            'glass.reset': '重置布局',
            'hero.eyebrow': '阿联酋 · 广州 · 商业影像',
            'hero.title': '阿布扎比专业摄影师/录像师',
            'hero.copy': '熟悉阿布扎比景点、人像旅拍、商业活动和录像拍摄，也可协助路线、司机、导游、购票和迪拉姆兑换等本地服务。',
            'hero.primary': '获取报价',
            'hero.secondary': '查看作品',
            'hero.proof1': '品牌视频',
            'hero.proof2': '活动记录',
            'hero.proof3': '产品 / 门店',
            'hero.proof4': '商业肖像',
            'hero.cardEyebrow': '商业影像服务',
            'hero.cardTitle': '阿联酋 / 广州',
            'hero.stat1Title': '录像',
            'hero.stat1Text': '广告与短视频',
            'hero.stat2Title': '摄影',
            'hero.stat2Text': '广告与品牌图',
            'hero.stat3Title': '活动',
            'hero.stat3Text': '展会与发布会',
            'hero.cardNote': '支持中文 / English 项目沟通',
            'services.eyebrow': '服务',
            'services.title': '面向品牌增长的商业影像服务',
            'services.copy': '为广告投放、社交媒体、官网、发布会、展会、门店和高端肖像提供视频与摄影内容。',
            'services.videoTitle': '商业录像制作',
            'services.videoText': '品牌宣传片、广告短片、门店介绍、产品视频和活动花絮，适合 Instagram、TikTok、小红书、官网和广告投放。',
            'services.videoLink': '查看视频作品',
            'services.eventTitle': '活动与展会拍摄',
            'services.eventText': '服务阿联酋和广州展会、发布会、企业活动、门店开业与品牌活动，输出可用于 PR、社媒和客户汇报的素材。',
            'services.eventLink': '查看活动作品',
            'services.photoTitle': '广告摄影',
            'services.photoText': '产品、门店、酒店、餐饮、空间、团队形象和个人品牌肖像，制作适合广告、菜单、官网和社媒的视觉资产。',
            'services.photoLink': '查看商业作品',
            'markets.eyebrow': '市场',
            'markets.title': '服务阿联酋与广州，也服务国际客户',
            'markets.copy': 'Leo 服务中国品牌、海外创业者、本地商家和国际团队，交付可直接用于商业传播的专业影像内容。',
            'markets.uae': '展会、酒店、目的地推广、旅游人像、高端空间和社交媒体内容。',
            'markets.chinaLabel': '中国',
            'markets.gzTitle': '广州',
            'markets.gz': '品牌视频、产品发布、门店内容、企业活动、商业肖像和广告素材。',
            'markets.langLabel': '双语服务',
            'markets.langTitle': '中文 / English',
            'markets.lang': '为中国客户、阿联酋本地商家和国际制作团队提供清晰沟通。',
            'work.eyebrow': '精选作品',
            'work.title': '商业案例',
            'work.viewAll': '查看全部',
            'trust.eyebrow': '信任背书',
            'trust.title': '为商业交付而设计',
            'trust.item1Title': '商业使用场景',
            'trust.item1Text': '照片和视频可用于广告、官网、PR、菜单、社交媒体和客户汇报。',
            'trust.item2Title': '双语沟通',
            'trust.item2Text': '支持中文和英文沟通，适合跨境团队、阿联酋本地客户和中国品牌。',
            'trust.item3Title': '社媒快速交付',
            'trust.item3Text': '可围绕发布窗口、活动回顾和短视频内容日历规划交付。',
            'trust.item4Title': '阿联酋 + 广州',
            'trust.item4Text': '支持阿布扎比、迪拜、广州及周边商业地点拍摄。',
            'workflow.eyebrow': '流程',
            'workflow.title': '适合商业项目的清晰流程',
            'workflow.step1Title': '需求与目标',
            'workflow.step1Text': '确认商业目标、发布平台、拍摄地点、参考风格、语言需求和交付格式。',
            'workflow.step2Title': '拍摄规划',
            'workflow.step2Text': '根据广告用途、活动流程或人像概念，规划场景、时间、路线和关键画面。',
            'workflow.step3Title': '拍摄与交付',
            'workflow.step3Text': '完成拍摄、筛选、调色、剪辑与精修，交付可直接用于广告、官网和社媒发布的素材。',
            'about.eyebrow': '关于 Leo',
            'about.title': '专业商业视角，也保留真实人物质感',
            'about.lead': 'Leo 提供阿联酋与广州商业录像和摄影服务，专注品牌形象、广告内容、活动记录、门店、产品和目的地人像。',
            'about.bio': '项目会围绕商业使用场景规划：素材发布在哪里、目标受众需要理解什么，以及最终视觉如何帮助转化。',
            'faq.eyebrow': '常见问题',
            'faq.title': '询价前你可能想知道',
            'faq.q1': '可以在迪拜和阿布扎比拍摄吗？',
            'faq.a1': '可以。项目可安排在阿布扎比、迪拜、广州及周边商业地点。',
            'faq.q2': '可以用英文沟通吗？',
            'faq.a2': '可以。需求沟通、拍摄计划和交付说明都支持中文和英文。',
            'faq.q3': '可以交付短视频吗？',
            'faq.a3': '可以。可规划短视频、品牌片、门店介绍、活动回顾和适合社媒发布的剪辑。',
            'faq.q4': '价格主要由什么决定？',
            'faq.a4': '拍摄地点、拍摄时长、团队需求、交付数量、后期深度、使用范围和交付时间都会影响报价。',
            'contact.eyebrow': '预约',
            'contact.shortTitle': '联系 Leo',
            'contact.title': '告诉我你的广告、活动或品牌故事',
            'contact.copy': '请发送城市、项目类型、拍摄日期、使用平台、期望交付内容和预算范围。',
            'contact.item1': '城市和拍摄日期',
            'contact.item2': '项目类型和使用平台',
            'contact.item3': '期望视频时长或照片数量',
            'contact.item4': '预算范围和交付时间',
            'contact.whatsapp': 'WhatsApp 询价',
            'contact.email': '邮件询价',
            'contact.portfolio': '先查看作品',
            'contact.wechat': '微信：<strong>LI920520414</strong>',
            'contact.xhs': '小红书：<strong>阿布扎比摄影师-Leo</strong>',
            'footer.copy': '© 2026 Leo Photography. 商业录像与人像摄影。'
        }
    };

    function detectLanguage() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'zh' || saved === 'en') return saved;
        const languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
        return languages.some(language => String(language).toLowerCase().startsWith('zh')) ? 'zh' : 'en';
    }

    function applyLanguage(language) {
        const dict = translations[language] || translations.en;
        document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (!Object.prototype.hasOwnProperty.call(dict, key)) return;
            if (dict[key].includes('<')) {
                element.innerHTML = dict[key];
            } else {
                element.textContent = dict[key];
            }
        });
        document.querySelectorAll('[data-lang]').forEach(button => {
            button.classList.toggle('active', button.getAttribute('data-lang') === language);
        });
        window.dispatchEvent(new CustomEvent('leo:languagechange', { detail: { language } }));
    }

    function setLanguage(language) {
        localStorage.setItem(STORAGE_KEY, language);
        applyLanguage(language);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const language = detectLanguage();
        applyLanguage(language);
        document.querySelectorAll('[data-lang]').forEach(button => {
            button.addEventListener('click', () => setLanguage(button.getAttribute('data-lang')));
        });
    });

    window.LeoI18n = {
        getLanguage: detectLanguage,
        setLanguage,
        translate(key, language = detectLanguage()) {
            return (translations[language] && translations[language][key]) || translations.en[key] || key;
        }
    };
}());
