import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Quiz from '../components/Quiz';

export default function Home({ questions }) {
  return (
      <Quiz questions={questions} />
  );
}

export async function getStaticProps(context) {
  const questions = require('../../public/locales/en/common.json').questions;
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale)),
      questions,
    },
  };
}