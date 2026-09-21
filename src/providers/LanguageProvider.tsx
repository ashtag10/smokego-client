'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type LanguageCode =
  | 'EN'
  | 'PT'
  | 'DE'
  | 'ES'
  | 'FR'
  | 'IT'
  | 'JA'
  | 'NL'
  | 'PL'
  | 'EL'
  | 'RO'
  | 'BG'
  | 'CS'
  | 'KO'
  | 'RU'
  | 'AR'

export interface Language {
  code: LanguageCode
  name: string
  flag: string
}

export const languages: Language[] = [
  { code: 'EN', name: 'English', flag: '/flags/gb.svg' },
  { code: 'PT', name: 'Português', flag: '/flags/pt.svg' },
  { code: 'DE', name: 'Deutsch', flag: '/flags/de.svg' },
  { code: 'ES', name: 'Español', flag: '/flags/es.svg' },
  { code: 'FR', name: 'Français', flag: '/flags/fr.svg' },
  { code: 'IT', name: 'Italiano', flag: '/flags/it.svg' },
  { code: 'JA', name: '日本語', flag: '/flags/jp.svg' },
  { code: 'NL', name: 'Nederlands', flag: '/flags/nl.svg' },
  { code: 'PL', name: 'Polski', flag: '/flags/pl.svg' },
  { code: 'EL', name: 'Ελληνικά', flag: '/flags/gr.svg' },
  { code: 'RO', name: 'Română', flag: '/flags/ro.svg' },
  { code: 'BG', name: 'Български', flag: '/flags/bg.svg' },
  { code: 'CS', name: 'Čeština', flag: '/flags/cz.svg' },
  { code: 'KO', name: '한국어', flag: '/flags/kr.svg' },
  { code: 'RU', name: 'Русский', flag: '/flags/ru.svg' },
  { code: 'AR', name: 'العربية', flag: '/flags/sa.svg' },
]

type TranslationKey =
  | 'nav.home'
  | 'nav.shop'
  | 'nav.about'
  | 'nav.contact'
  | 'common.search'
  | 'common.cart'
  | 'common.login'
  | 'common.account'
  | 'common.loading'
  | 'product.addToCart'
  | 'product.outOfStock'
  | 'product.reviews'
  | 'product.noImage'

type TranslationDictionary = Record<
  LanguageCode,
  Record<TranslationKey, string>
>

const translations: TranslationDictionary = {
  FR: {
    'nav.home': 'Accueil',
    'nav.shop': 'Boutique',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'common.search': 'Rechercher',
    'common.cart': 'Panier',
    'common.login': 'Connexion',
    'common.account': 'Mon compte',
    'common.loading': 'Chargement...',
    'product.addToCart': 'Ajouter au panier',
    'product.outOfStock': 'Rupture de stock',
    'product.reviews': 'avis',
    'product.noImage': "Pas d'image",
  },

  EN: {
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'common.search': 'Search',
    'common.cart': 'Cart',
    'common.login': 'Login',
    'common.account': 'My account',
    'common.loading': 'Loading...',
    'product.addToCart': 'Add to cart',
    'product.outOfStock': 'Out of stock',
    'product.reviews': 'reviews',
    'product.noImage': 'No image',
  },

  PT: {
    'nav.home': 'Início',
    'nav.shop': 'Loja',
    'nav.about': 'Sobre',
    'nav.contact': 'Contacto',
    'common.search': 'Pesquisar',
    'common.cart': 'Carrinho',
    'common.login': 'Entrar',
    'common.account': 'Minha conta',
    'common.loading': 'Carregando...',
    'product.addToCart': 'Adicionar ao carrinho',
    'product.outOfStock': 'Esgotado',
    'product.reviews': 'avaliações',
    'product.noImage': 'Sem imagem',
  },

  DE: {
    'nav.home': 'Startseite',
    'nav.shop': 'Shop',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'common.search': 'Suchen',
    'common.cart': 'Warenkorb',
    'common.login': 'Anmelden',
    'common.account': 'Mein Konto',
    'common.loading': 'Laden...',
    'product.addToCart': 'In den Warenkorb',
    'product.outOfStock': 'Nicht auf Lager',
    'product.reviews': 'Bewertungen',
    'product.noImage': 'Kein Bild',
  },

  ES: {
    'nav.home': 'Inicio',
    'nav.shop': 'Tienda',
    'nav.about': 'Sobre nosotros',
    'nav.contact': 'Contacto',
    'common.search': 'Buscar',
    'common.cart': 'Carrito',
    'common.login': 'Iniciar sesión',
    'common.account': 'Mi cuenta',
    'common.loading': 'Cargando...',
    'product.addToCart': 'Añadir al carrito',
    'product.outOfStock': 'Agotado',
    'product.reviews': 'reseñas',
    'product.noImage': 'Sin imagen',
  },

  IT: {
    'nav.home': 'Home',
    'nav.shop': 'Negozio',
    'nav.about': 'Chi siamo',
    'nav.contact': 'Contatti',
    'common.search': 'Cerca',
    'common.cart': 'Carrello',
    'common.login': 'Accedi',
    'common.account': 'Il mio account',
    'common.loading': 'Caricamento...',
    'product.addToCart': 'Aggiungi al carrello',
    'product.outOfStock': 'Esaurito',
    'product.reviews': 'recensioni',
    'product.noImage': 'Nessuna immagine',
  },

  JA: {
    'nav.home': 'ホーム',
    'nav.shop': 'ショップ',
    'nav.about': '私たちについて',
    'nav.contact': 'お問い合わせ',
    'common.search': '検索',
    'common.cart': 'カート',
    'common.login': 'ログイン',
    'common.account': 'マイアカウント',
    'common.loading': '読み込み中...',
    'product.addToCart': 'カートに追加',
    'product.outOfStock': '在庫切れ',
    'product.reviews': 'レビュー',
    'product.noImage': '画像なし',
  },

  NL: {
    'nav.home': 'Home',
    'nav.shop': 'Winkel',
    'nav.about': 'Over ons',
    'nav.contact': 'Contact',
    'common.search': 'Zoeken',
    'common.cart': 'Winkelwagen',
    'common.login': 'Inloggen',
    'common.account': 'Mijn account',
    'common.loading': 'Laden...',
    'product.addToCart': 'Toevoegen aan winkelwagen',
    'product.outOfStock': 'Niet op voorraad',
    'product.reviews': 'beoordelingen',
    'product.noImage': 'Geen afbeelding',
  },

  PL: {
    'nav.home': 'Strona główna',
    'nav.shop': 'Sklep',
    'nav.about': 'O nas',
    'nav.contact': 'Kontakt',
    'common.search': 'Szukaj',
    'common.cart': 'Koszyk',
    'common.login': 'Zaloguj się',
    'common.account': 'Moje konto',
    'common.loading': 'Ładowanie...',
    'product.addToCart': 'Dodaj do koszyka',
    'product.outOfStock': 'Brak w magazynie',
    'product.reviews': 'opinie',
    'product.noImage': 'Brak zdjęcia',
  },

  EL: {
    'nav.home': 'Αρχική',
    'nav.shop': 'Κατάστημα',
    'nav.about': 'Σχετικά',
    'nav.contact': 'Επικοινωνία',
    'common.search': 'Αναζήτηση',
    'common.cart': 'Καλάθι',
    'common.login': 'Σύνδεση',
    'common.account': 'Ο λογαριασμός μου',
    'common.loading': 'Φόρτωση...',
    'product.addToCart': 'Προσθήκη στο καλάθι',
    'product.outOfStock': 'Εξαντλήθηκε',
    'product.reviews': 'κριτικές',
    'product.noImage': 'Χωρίς εικόνα',
  },

  RO: {
    'nav.home': 'Acasă',
    'nav.shop': 'Magazin',
    'nav.about': 'Despre noi',
    'nav.contact': 'Contact',
    'common.search': 'Caută',
    'common.cart': 'Coș',
    'common.login': 'Autentificare',
    'common.account': 'Contul meu',
    'common.loading': 'Se încarcă...',
    'product.addToCart': 'Adaugă în coș',
    'product.outOfStock': 'Stoc epuizat',
    'product.reviews': 'recenzii',
    'product.noImage': 'Fără imagine',
  },

  BG: {
    'nav.home': 'Начало',
    'nav.shop': 'Магазин',
    'nav.about': 'За нас',
    'nav.contact': 'Контакти',
    'common.search': 'Търсене',
    'common.cart': 'Количка',
    'common.login': 'Вход',
    'common.account': 'Моят профил',
    'common.loading': 'Зареждане...',
    'product.addToCart': 'Добави в количката',
    'product.outOfStock': 'Изчерпано',
    'product.reviews': 'отзиви',
    'product.noImage': 'Няма изображение',
  },

  CS: {
    'nav.home': 'Domů',
    'nav.shop': 'Obchod',
    'nav.about': 'O nás',
    'nav.contact': 'Kontakt',
    'common.search': 'Hledat',
    'common.cart': 'Košík',
    'common.login': 'Přihlásit se',
    'common.account': 'Můj účet',
    'common.loading': 'Načítání...',
    'product.addToCart': 'Přidat do košíku',
    'product.outOfStock': 'Vyprodáno',
    'product.reviews': 'recenzí',
    'product.noImage': 'Bez obrázku',
  },

  KO: {
    'nav.home': '홈',
    'nav.shop': '쇼핑',
    'nav.about': '소개',
    'nav.contact': '문의',
    'common.search': '검색',
    'common.cart': '장바구니',
    'common.login': '로그인',
    'common.account': '내 계정',
    'common.loading': '로드 중...',
    'product.addToCart': '장바구니에 추가',
    'product.outOfStock': '품절',
    'product.reviews': '리뷰',
    'product.noImage': '이미지 없음',
  },

  RU: {
    'nav.home': 'Главная',
    'nav.shop': 'Магазин',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
    'common.search': 'Поиск',
    'common.cart': 'Корзина',
    'common.login': 'Войти',
    'common.account': 'Мой аккаунт',
    'common.loading': 'Загрузка...',
    'product.addToCart': 'Добавить в корзину',
    'product.outOfStock': 'Нет в наличии',
    'product.reviews': 'отзывов',
    'product.noImage': 'Нет изображения',
  },

  AR: {
    'nav.home': 'الرئيسية',
    'nav.shop': 'المتجر',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'common.search': 'بحث',
    'common.cart': 'السلة',
    'common.login': 'تسجيل الدخول',
    'common.account': 'حسابي',
    'common.loading': 'جار التحميل...',
    'product.addToCart': 'أضف إلى السلة',
    'product.outOfStock': 'غير متوفر',
    'product.reviews': 'تقييمات',
    'product.noImage': 'لا توجد صورة',
  },
}

interface LanguageContextValue {
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void
  currentLanguage: Language
  t: (key: TranslationKey) => string
}

const LanguageContext =
  createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
  children,
}: {
  children: ReactNode
}) {
  const [language, setLanguageState] =
    useState<LanguageCode>('FR')

  useEffect(() => {
    const saved = localStorage.getItem(
      'ousmane-chicha-language',
    ) as LanguageCode | null

    if (
      saved &&
      languages.some(
        (item) => item.code === saved,
      )
    ) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (
    value: LanguageCode,
  ) => {
    setLanguageState(value)

    localStorage.setItem(
      'ousmane-chicha-language',
      value,
    )

    document.documentElement.lang =
      value.toLowerCase()

    if (value === 'AR') {
      document.documentElement.dir = 'rtl'
    } else {
      document.documentElement.dir = 'ltr'
    }
  }

  const currentLanguage = useMemo(
    () =>
      languages.find(
        (item) => item.code === language,
      ) ?? languages[4],
    [language],
  )

  const t = (key: TranslationKey) => {
    return (
      translations[language]?.[key] ??
      translations.FR[key] ??
      key
    )
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context =
    useContext(LanguageContext)

  if (!context) {
    throw new Error(
      'useLanguage doit être utilisé à l’intérieur de LanguageProvider',
    )
  }

  return context
}