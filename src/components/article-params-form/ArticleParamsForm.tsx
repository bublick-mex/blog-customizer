import clsx from 'clsx';
import { useEffect, useState, useRef, type FormEvent } from 'react';
import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  defaultArticleState,
  type ArticleStateType,
  type OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleCLickOutside = (event: MouseEvent): void => {
      if (formRef.current && !formRef.current.contains(event?.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleCLickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleCLickOutside);
    };
  }, [isOpen]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    onApply(formState);
  };

  const handleReset = (e: FormEvent): void => {
    e.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => toggleOpen()} />
      <aside
        className={clsx(styles.container, isOpen && styles.container_open)}
        ref={formRef}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            selected={formState.fontFamilyOption}
            onChange={(option: OptionType): void => {
              setFormState({ ...formState, fontFamilyOption: option });
            }}
            options={fontFamilyOptions}
            title="Шрифт"
          />
          <RadioGroup
            selected={formState.fontSizeOption}
            name="radio"
            onChange={(option: OptionType): void => {
              setFormState({ ...formState, fontSizeOption: option });
            }}
            options={fontSizeOptions}
            title="Размер шрифта"
          />
          <Select
            selected={formState.fontColor}
            onChange={(option: OptionType): void => {
              setFormState({ ...formState, fontColor: option });
            }}
            options={fontColors}
            title="Цвет шрифта"
          />
          <Separator />
          <Select
            selected={formState.backgroundColor}
            onChange={(option: OptionType): void => {
              setFormState({ ...formState, backgroundColor: option });
            }}
            options={backgroundColors}
            title="Цвет фона"
          />
          <Select
            selected={formState.contentWidth}
            onChange={(option: OptionType): void => {
              setFormState({ ...formState, contentWidth: option });
            }}
            options={contentWidthArr}
            title="Ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
