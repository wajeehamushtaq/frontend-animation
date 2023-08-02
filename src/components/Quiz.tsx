import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from '../styles/Quiz.module.scss';

const Quiz: React.FC<{ questions: Array<{ question: string; options: string[]; correctIndex: number }> }> = ({ questions }) => {
  const { t } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const optionsKey = currentQuestionIndex + showOptions.toString();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedOption(null);
      setShowOptions(true);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [selectedOption]);

  useEffect(() => {
    if (showOptions) {
      setTimeout(() => {
        setShowOptions(false);
        setSelectedOption(questions[currentQuestionIndex].correctIndex);
        setTimeout(() => {
          setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
        }, 500);
      }, questions[currentQuestionIndex].options.length - 1);
    }
  }, [showOptions, currentQuestionIndex, questions]);

  useEffect(() => {
    setSelectedOption(null);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const options = currentQuestion.options;

  return (
    <div className={styles['quiz-container']}>
      <h2 className={styles.question}>{currentQuestion.question}</h2>
      <div key={optionsKey} className={`options ${showOptions ? 'slide-up-enter-active' : ''}`}>
        {options.map((option, index) => (
          <label
            key={index}
            className={`${styles.option} ${showOptions ? 'slide-up-enter-to' : ''}`}
            style={{
              animationDelay: `${index * 1}s`,
            }}
          >
            <input
              type="radio"
              name="quiz-option"
              value={index}
              checked={selectedOption === index}
              onChange={() => handleOptionSelect(index)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Quiz;