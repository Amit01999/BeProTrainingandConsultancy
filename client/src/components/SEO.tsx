import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  titleKey: string;
  descriptionKey: string;
  namespace?: string;
}

/**
 * SEO component for bilingual meta tags
 * Automatically updates HTML lang attribute and meta tags based on current language
 */
export function SEO({ titleKey, descriptionKey, namespace = 'pages' }: SEOProps) {
  const { t, i18n } = useTranslation(namespace);

  const title = `${t(titleKey)} | BePro Training`;
  const description = t(descriptionKey);

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={i18n.language === 'bn' ? 'bn_BD' : 'en_US'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
